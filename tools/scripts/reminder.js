#!/usr/bin/node

/* eslint-disable init-declarations */
/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */

import net from 'node:net';
import path from 'node:path';
import url from 'node:url';

import dotenv from 'dotenv';
import moment from 'moment-feiertage';
import nodemailer from 'nodemailer';
import pg from 'pg';
import ssh from 'ssh2';
import winston from 'winston';
import ejs from 'ejs';

const dirname = path.dirname(url.fileURLToPath(import.meta.url));
const env = dotenv.config({ path: `${dirname}/.env` }).parsed;

/**
 * Formats (error) objects to they can be logged.
 * This function is called by winston.
 * @param {any} label Category label
 * @param {Error|Buffer|any} info Log object
 * @returns any
 */
const jsonReplacer = (label, info) => {
  if (info instanceof Buffer) {
    return info.toString('base64');
  }

  if (info instanceof Error) {
    const error = {};

    Object.getOwnPropertyNames(info).forEach((key) => {
      error[key] = info[key];
    });

    return error;
  }

  return info;
};

/**
 * File logger format for log files.
 */
const loggerFileFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss ZZ' }),
  winston.format.json({ replacer: jsonReplacer }),
);

/**
 * Winston logger.
 */
const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: `${dirname}/logs/combined.log`,
      format: loggerFileFormat,
    }),
    new winston.transports.File({
      level: 'error',
      filename: `${dirname}/logs/error.log`,
      format: loggerFileFormat,
    }),
    new winston.transports.Console({
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss ZZ' }),
        winston.format.prettyPrint(),
      ),
    }),
  ],
});

/**
 * Handles any critical error in this script and ends the process.
 * @param {string} message Custom error message
 * @param {Error} error Error object
 */
function handleError(message, error) {
  logger.error(message, { error });
  process.exit(1);
}

// ################

/**
 * SMTP-Transporter for sending emails.
 */
const transporter = nodemailer.createTransport({
  secure: false,
  host: env.EMAIL_HOST,
  port: Number(env.EMAIL_PORT),
  auth: {
    user: env.EMAIL_USERNAME,
    pass: env.EMAIL_PASSWORD,
  },
  connectionTimeout: 5000,
});

/**
 * Database pool. Necessary if multiple connections need to run simultaneously.
 */
const dbPool = new pg.Pool({
  host: env.PROXY_HOST,
  port: env.PROXY_PORT,
  user: env.PG_USERNAME,
  password: env.PG_PASSWORD,
  database: env.PG_DATABASE,
  connectionTimeoutMillis: 5000,
});

function getNextWorkDay() {
  let nextWorkDay = moment();

  do {
    nextWorkDay = nextWorkDay.add(1, 'day');
  } while (nextWorkDay.isoWeekday() > 5 || nextWorkDay.isHoliday('BE'));

  return nextWorkDay.format('YYYY-MM-DD');
}

function getContext(dateOfRecovery) {
  // if date of recovery is in the future
  if (moment().diff(dateOfRecovery) < 0) {
    return {
      templatePath: `${dirname}/templates/reminder_1.html`,
      emailSubject: 'Erinnerung / Reminder',
    };
  }

  // if date of recovery is today
  if (moment().diff(dateOfRecovery) === 0) {
    return {
      templatePath: `${dirname}/templates/reminder_2.html`,
      emailSubject: 'Erinnerung / Reminder',
    };
  }

  // if date of recovery is in the past
  return {
    templatePath: `${dirname}/templates/reminder_3.html`,
    emailSubject: 'Mahnung / Reminder',
  };
}

/**
 * Returns all overdue entries from the database.
 * @returns {Promise<any[]>}
 */
async function getOverdueEntries() {
  /** @type {pg.PoolClient} */
  const dbClient = await dbPool
    .connect()
    .catch((error) => handleError('Database Connection Error', error));

  const sql = `
    SELECT
      fernleihe.id,
      fernleihe.titel             AS "title",
      fernleihe.autor             AS "author",
      fernleihe.anz_mahnung       AS "numberOfReminders",
      fernleihe.sollmahn_datum    AS "dateOfReminder",
      fernleihe.rueckforder_datum AS "dateOfRecovery",
      fernleihe.user_id           AS "userId",
      users.email,
      users.vorname               AS "firstName",
      users.name                  AS "lastName"
    FROM fernleihe
    JOIN users on users.id = fernleihe.user_id
    WHERE user_id <> $1::int
      AND fernleihe.sollmahn_datum <= NOW()`;

  const { rows } = await dbClient
    .query(sql, [env.SPECIAL_USER])
    .catch((error) => handleError('Database Query Error', error));

  dbClient.release();

  return rows;
}

/**
 * Sends a reminder email.
 * @param {ejs.Data} entry Overdue entry
 */
async function sendReminderEmail(entry) {
  const { templatePath, emailSubject } = getContext(entry.dateOfRecovery);

  const emailBody = await ejs
    .renderFile(templatePath, entry)
    .catch((error) => handleError('Template Error', error));

  const info = await transporter
    .sendMail({
      from: env.EMAIL_FROM,
      // to: `fernleihe@wzb.eu, ${entry.email}`,
      to: 'sebastian.berg.win@wzb.eu',
      subject: `Fernleihe - ${emailSubject}`,
      html: emailBody,
    })
    .catch((error) => handleError('E-Mail Error', error));

  logger.info(info);
}

async function updateReminderDate(entry) {
  const sql = `
    UPDATE fernleihe SET
      anz_mahnung = anz_mahnung + 1,
      sollmahn_datum = $1,
      bemerkung = bemerkung || '\n' || $2
    WHERE id = $3::int`;

  const nextWorkDay = getNextWorkDay();

  const dbClient = await dbPool
    .connect()
    .catch((error) => handleError('Database Connection Error', error));

  await dbClient
    .query(sql, [
      nextWorkDay,
      `${entry.numberOfReminders}. Erinnerung verschickt: ${moment().format(
        'YYYY-MM-DD',
      )}`,
      entry.id,
    ])
    .catch((error) => handleError('Database Update Error', error));

  dbClient.release();
}

const client = new ssh.Client();

const proxy = net.createServer((socket) => {
  client.forwardOut(
    socket.remoteAddress,
    socket.remotePort,
    env.PG_HOST,
    Number(env.PG_PORT),
    (error, stream) => {
      if (error) {
        handleError('Proxy Error', error);
      } else {
        socket.pipe(stream);
        stream.pipe(socket);
      }
    },
  );
});

try {
  client.connect({
    host: env.SSH_HOST,
    port: Number(env.SSH_PORT),
    username: env.SSH_USERNAME,
    password: env.SSH_PASSWORD,
  });
} catch (error) {
  handleError('SSH Error', error);
}

client.on('ready', async () => {
  const entries = await getOverdueEntries();

  await Promise.all(
    entries.map(async (entry) => {
      await sendReminderEmail({
        ...entry,
        dateOfRecovery: moment(entry.dateOfRecovery).format('YYYY-MM-DD'),
      });

      await updateReminderDate(entry);
    }),
  );

  await dbPool.end();
  client.destroy();
  proxy.close();
});

proxy.listen(env.PROXY_PORT, env.PROXY_HOST);
