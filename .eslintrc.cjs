/* eslint-disable max-lines */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable unicorn/string-content */
/* eslint object-curly-newline: ["error", { "multiline": true, "consistent": true, "minProperties": 1 }] */
/* eslint object-property-newline: ["error", { "allowAllPropertiesOnSameLine": false }] */

/**
 * This file is my personal eslint config.
 *
 * * Use * to mark recommended rules.
 * ! Use ! to mark conflicting rules.
 */

const restrictedGlobals = require('confusing-browser-globals');

// eslint-disable-next-line init-declarations
let prettierConfig;
try {
  // load prettier config
  prettierConfig = require('./.prettierrc.cjs');
} catch {
  // use default config if prettier config doesn't exist
  prettierConfig = {
    printWidth: 80,
    tabWidth: 2,
    useTabs: false,
    semi: true,
    singleQuote: true,
    quoteProps: 'consistent',
    jsxSingleQuote: true,
    trailingComma: 'all',
    bracketSpacing: true,
    bracketSameLine: true,
    arrowParens: 'always',
    requirePragma: false,
    insertPragma: false,
    htmlWhitespaceSensitivity: 'css',
    vueIndentScriptAndStyle: true,
    embeddedLanguageFormatting: 'auto',
  };
}

// #region Rules Section

/** @type {Object.<string, Array>} */
const defaultRules = {
  /**
   * Enforces getter/setter pairs in objects and classes.
   * https://eslint.org/docs/rules/accessor-pairs
   */
  'accessor-pairs': ['off'],

  /**
   * Enforces line breaks after opening and before closing array brackets.
   * https://eslint.org/docs/rules/array-bracket-newline
   */
  'array-bracket-newline': [
    'error',
    {
      multiline: true,
      minItems: 5,
    },
  ],

  /**
   * Disallow or enforce spaces inside of brackets.
   * https://eslint.org/docs/rules/array-bracket-spacing
   */
  'array-bracket-spacing': [
    'error',
    'never',
    {
      singleValue: false,
      arraysInArrays: false,
      objectsInArrays: false,
    },
  ],

  /**
   * Enforces return statements in callbacks of array's methods.
   * https://eslint.org/docs/rules/array-callback-return
   */
  'array-callback-return': [
    'error',
    {
      allowImplicit: true,
      checkForEach: true,
    },
  ],

  /**
   * Enforce line breaks between array elements.
   * https://eslint.org/docs/rules/array-element-newline
   */
  'array-element-newline': [
    'error',
    {
      multiline: true,
      minItems: 5,
    },
  ],

  /**
   * Require braces in arrow function body.
   * https://eslint.org/docs/rules/arrow-body-style
   */
  'arrow-body-style': [
    'error',
    'as-needed',
    {
      requireReturnForObjectLiteral: false,
    },
  ],

  /**
   * Require parens in arrow function arguments.
   * https://eslint.org/docs/rules/arrow-parens
   */
  'arrow-parens': ['error', 'always'],

  /**
   * Require space before/after arrow function's arrow.
   * https://eslint.org/docs/rules/arrow-spacing
   */
  'arrow-spacing': [
    'error',
    {
      before: true,
      after: true,
    },
  ],

  /**
   * Treat var as Block Scoped.
   * https://eslint.org/docs/rules/block-scoped-var
   */
  'block-scoped-var': ['error'],

  /**
   * Disallow or enforce spaces inside of blocks after opening block and before closing block.
   * https://eslint.org/docs/rules/block-spacing
   */
  'block-spacing': ['error', 'always'],

  /**
   * Require Brace Style.
   * https://eslint.org/docs/rules/brace-style
   */
  'brace-style': [
    'error',
    '1tbs',
    {
      allowSingleLine: true,
    },
  ],

  /**
   * Require CamelCase.
   * https://eslint.org/docs/rules/camelcase
   */
  'camelcase': [
    'error',
    {
      properties: 'always',
      ignoreImports: false,
      ignoreGlobals: false,
      ignoreDestructuring: false,
    },
  ],

  /**
   * Enforce or disallow capitalization of the first letter of a comment.
   * https://eslint.org/docs/rules/capitalized-comments
   */
  'capitalized-comments': ['off'],

  /**
   * Enforce that class methods utilize this.
   * https://eslint.org/docs/rules/class-methods-use-this
   */
  'class-methods-use-this': [
    'error',
    {
      enforceForClassFields: true,
    },
  ],

  /**
   * Require or disallow trailing commas.
   * https://eslint.org/docs/rules/comma-dangle
   */
  'comma-dangle': ['error', 'always-multiline'],

  /**
   * Enforces spacing around commas.
   * https://eslint.org/docs/rules/comma-spacing
   */
  'comma-spacing': [
    'error',
    {
      before: false,
      after: true,
    },
  ],

  /**
   * Comma style.
   * https://eslint.org/docs/rules/comma-style
   */
  'comma-style': ['error', 'last'],

  /**
   * Limit Cyclomatic Complexity.
   * https://eslint.org/docs/rules/complexity
   */
  'complexity': [
    'error',
    {
      max: 10,
    },
  ],

  /**
   * Disallow or enforce spaces inside of computed properties.
   * https://eslint.org/docs/rules/computed-property-spacing
   */
  'computed-property-spacing': [
    'error',
    'never',
    {
      enforceForClassMembers: true,
    },
  ],

  /**
   * Require return statements to either always or never specify values.
   * https://eslint.org/docs/rules/consistent-return
   */
  'consistent-return': [
    'error',
    {
      treatUndefinedAsUnspecified: false,
    },
  ],

  /**
   * ! See rule '@typescript-eslint/no-this-alias'
   * Require Consistent This.
   * https://eslint.org/docs/rules/consistent-this
   */
  'consistent-this': ['error', 'self'],

  /**
   * * Recommended Rule
   * Verify calls of super() in constructors.
   * https://eslint.org/docs/rules/constructor-super
   */
  'constructor-super': ['error'],

  /**
   * Require Following Curly Brace Conventions.
   * https://eslint.org/docs/rules/curly
   */
  'curly': ['error', 'multi-line'],

  /**
   * Require Default Case in Switch Statements.
   * https://eslint.org/docs/rules/default-case
   */
  'default-case': [
    'error',
    {
      commentPattern: '^skip\\sdefault',
    },
  ],

  /**
   * Enforce default clauses in switch statements to be last.
   * https://eslint.org/docs/rules/default-case-last
   */
  'default-case-last': ['error'],

  /**
   * Enforce default parameters to be last.
   * https://eslint.org/docs/rules/default-param-last
   */
  'default-param-last': ['error'],

  /**
   * Enforce newline before and after dot.
   * https://eslint.org/docs/rules/dot-location
   */
  'dot-location': ['error', 'property'],

  /**
   * Require Dot Notation.
   * https://eslint.org/docs/rules/dot-notation
   */
  'dot-notation': [
    'error',
    {
      allowKeywords: true,
    },
  ],

  /**
   * Require or disallow newline at the end of files.
   * https://eslint.org/docs/rules/eol-last
   */
  'eol-last': ['error', 'always'],

  /**
   * Require === and !==.
   * https://eslint.org/docs/rules/eqeqeq
   */
  'eqeqeq': ['error', 'always'],

  /**
   * * Recommended Rule
   * Enforce "for" loop update clause moving the counter in the right direction.
   * https://eslint.org/docs/rules/for-directions
   */
  'for-direction': ['error'],

  /**
   * Require or disallow spacing between function identifiers and their invocations.
   * https://eslint.org/docs/rules/func-call-spacing
   */
  'func-call-spacing': ['error', 'never'],

  /**
   * Require function names to match the name of the variable or property to which they are assigned.
   * https://eslint.org/docs/rules/func-name-matching
   */
  'func-name-matching': [
    'error',
    'always',
    {
      considerPropertyDescriptor: true,
      includeCommonJSModuleExports: false,
    },
  ],

  /**
   * Require or disallow named function expressions.
   * https://eslint.org/docs/rules/func-names
   */
  'func-names': [
    'error',
    'always',
    {
      generators: 'always',
    },
  ],

  /**
   * Enforce the consistent use of either function declarations or expressions.
   * https://eslint.org/docs/rules/func-style
   */
  'func-style': [
    'error',
    'declaration',
    {
      allowArrowFunctions: true,
    },
  ],

  /**
   * Enforce line breaks between arguments of a function call.
   * https://eslint.org/docs/rules/function-call-argument-newline
   */
  'function-call-argument-newline': ['error', 'consistent'],

  /**
   * Enforce consistent line breaks inside function parentheses.
   * https://eslint.org/docs/rules/function-paren-newline
   */
  'function-paren-newline': ['error', 'multiline'],

  /**
   * Enforce spacing around the * in generator functions.
   * https://eslint.org/docs/rules/generator-star-spacing
   */
  'generator-star-spacing': ['error', 'after'],

  /**
   * * Recommended Rule
   * Enforces that a return statement is present in property getters.
   * https://eslint.org/docs/rules/getter-return
   */
  'getter-return': [
    'error',
    {
      allowImplicit: false,
    },
  ],

  /**
   * Require grouped accessor pairs in object literals and classes.
   * https://eslint.org/docs/rules/grouped-accessor-pairs
   */
  'grouped-accessor-pairs': ['off'],

  /**
   * Require Guarding for-in.
   * https://eslint.org/docs/rules/guard-for-in
   */
  'guard-for-in': ['error'],

  /**
   * Disallow specified identifiers.
   * https://eslint.org/docs/rules/id-denylist
   */
  'id-denylist': ['off'],

  /**
   * Enforce minimum and maximum identifier lengths.
   * https://eslint.org/docs/rules/id-length
   */
  'id-length': [
    'error',
    {
      min: 2,
      properties: 'always',
      exceptions: ['_', 'e', 'i', 'j'],
    },
  ],

  /**
   * Require identifiers to match a specified regular expression.
   * https://eslint.org/docs/rules/id-match
   */
  'id-match': ['off'],

  /**
   * Enforce the location of arrow function bodies with implicit returns.
   * https://eslint.org/docs/rules/implicit-arrow-linebreak
   */
  'implicit-arrow-linebreak': ['error', 'beside'],

  /**
   * Enforce consistent indentation.
   * https://eslint.org/docs/rules/indent
   */
  'indent': [
    'error',
    2,
    {
      SwitchCase: 1,
      VariableDeclarator: 1,
      outerIIFEBody: 1,
      MemberExpression: 1,
      ArrayExpression: 1,
      ObjectExpression: 1,
      ImportDeclaration: 1,
      flatTernaryExpressions: false,
      offsetTernaryExpressions: false,
      ignoreComments: false,
      FunctionDeclaration: {
        parameters: 1,
        body: 1,
      },
      FunctionExpression: {
        parameters: 1,
        body: 1,
      },
      StaticBlock: {
        body: 1,
      },
      CallExpression: {
        arguments: 1,
      },
    },
  ],

  /**
   * Require or disallow initialization in variable declarations.
   * https://eslint.org/docs/rules/init-declarations
   */
  'init-declarations': ['error', 'always'],

  /**
   * Enforce the consistent use of either double or single quotes in JSX attributes.
   * https://eslint.org/docs/rules/jsx-quotes
   */
  'jsx-quotes': ['off'],

  /**
   * Enforce consistent spacing between keys and values in object literal properties.
   * https://eslint.org/docs/rules/key-spacing
   */
  'key-spacing': [
    'error',
    {
      beforeColon: false,
      afterColon: true,
      mode: 'strict',
    },
  ],

  /**
   * Enforce consistent spacing before and after keywords.
   * https://eslint.org/docs/rules/keyword-spacing
   */
  'keyword-spacing': [
    'error',
    {
      before: true,
      after: true,
    },
  ],

  /**
   * Enforce position of line comments.
   * https://eslint.org/docs/rules/line-comment-position
   */
  'line-comment-position': [
    'error',
    {
      position: 'above',
    },
  ],

  /**
   * Enforce consistent linebreak style.
   * https://eslint.org/docs/rules/linebreak-style
   */
  'linebreak-style': ['off'],

  /**
   * Require empty lines around comments.
   * https://eslint.org/docs/rules/lines-around-comment
   */
  'lines-around-comment': [
    'error',
    {
      beforeBlockComment: true,
      afterBlockComment: false,
      beforeLineComment: false,
      afterLineComment: false,
      allowBlockStart: true,
      allowBlockEnd: true,
      allowObjectStart: true,
      allowObjectEnd: true,
      allowArrayStart: true,
      allowArrayEnd: true,
      allowClassStart: true,
      allowClassEnd: true,
    },
  ],

  /**
   * Require or disallow an empty line between class members.
   * https://eslint.org/docs/rules/lines-between-class-members
   */
  'lines-between-class-members': [
    'error',
    'always',
    {
      exceptAfterSingleLine: true,
    },
  ],

  /**
   * Enforce a maximum number of classes per file.
   * https://eslint.org/docs/rules/max-classes-per-file
   */
  'max-classes-per-file': [
    'error',
    {
      max: 1,
      ignoreExpressions: true,
    },
  ],

  /**
   * Enforce a maximum depth that blocks can be nested.
   * https://eslint.org/docs/rules/max-depth
   */
  'max-depth': [
    'error',
    {
      max: 4,
    },
  ],

  /**
   * Enforce a maximum line length.
   * https://eslint.org/docs/rules/max-len
   */
  'max-len': [
    'error',
    {
      code: 80,
      tabWidth: 2,
      ignoreComments: true,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true,
    },
  ],

  /**
   * Enforce a maximum file length.
   * https://eslint.org/docs/rules/max-lines
   */
  'max-lines': [
    'error',
    {
      max: 300,
      skipBlankLines: false,
      skipComments: false,
    },
  ],

  /**
   * Enforce a maximum function length.
   * https://eslint.org/docs/rules/max-lines-per-function
   */
  'max-lines-per-function': [
    'error',
    {
      max: 50,
      skipBlankLines: false,
      skipComments: true,
      IIFEs: true,
    },
  ],

  /**
   * Enforce a maximum depth that callbacks can be nested.
   * https://eslint.org/docs/rules/max-nested-callbacks
   */
  'max-nested-callbacks': [
    'off',
    {
      max: 10,
    },
  ],

  /**
   * Enforce a maximum number of parameters in function definitions.
   * https://eslint.org/docs/rules/max-params
   */
  'max-params': [
    'error',
    {
      max: 5,
    },
  ],

  /**
   * Enforce a maximum number of statements allowed in function blocks.
   * https://eslint.org/docs/rules/max-statements
   */
  'max-statements': [
    'error',
    {
      max: 20,
    },
    {
      ignoreTopLevelFunctions: false,
    },
  ],

  /**
   * Enforce a maximum number of statements allowed per line.
   * https://eslint.org/docs/rules/max-statements-per-line
   */
  'max-statements-per-line': [
    'error',
    {
      max: 1,
    },
  ],

  /**
   * Enforce a particular style for multiline comments.
   * https://eslint.org/docs/rules/multiline-comment-style
   */
  'multiline-comment-style': ['off', 'starred-block'],

  /**
   * Enforce or disallow newlines between operands of ternary expressions.
   * https://eslint.org/docs/rules/multiline-ternary
   */
  'multiline-ternary': ['error', 'never'],

  /**
   * Require constructor names to begin with a capital letter.
   * https://eslint.org/docs/rules/new-cap
   */
  'new-cap': [
    'error',
    {
      newIsCap: true,
      capIsNew: true,
      properties: true,
    },
  ],

  /**
   * Require parentheses when invoking a constructor with no arguments.
   * https://eslint.org/docs/rules/new-parens
   */
  'new-parens': ['error', 'always'],

  /**
   * Require a newline after each call in a method chain.
   * https://eslint.org/docs/rules/newline-per-chained-call
   */
  'newline-per-chained-call': [
    'error',
    {
      ignoreChainWithDepth: 2,
    },
  ],

  /**
   * Disallow Use of Alert.
   * https://eslint.org/docs/rules/no-alert
   */
  'no-alert': ['error'],

  /**
   * Disallow Array constructors.
   * https://eslint.org/docs/rules/no-array-constructor
   */
  'no-array-constructor': ['error'],

  /**
   * * Recommended Rule
   * Disallow using an async function as a Promise executor.
   * https://eslint.org/docs/rules/no-async-promise-executor
   */
  'no-async-promise-executor': ['error'],

  /**
   * Disallow await inside of loops.
   * https://eslint.org/docs/rules/no-await-in-loop
   */
  'no-await-in-loop': ['error'],

  /**
   * Disallow bitwise operators.
   * https://eslint.org/docs/rules/no-bitwise
   */
  'no-bitwise': [
    'error',
    {
      int32Hint: false,
    },
  ],

  /**
   * Disallow Use of caller/callee.
   * https://eslint.org/docs/rules/no-caller
   */
  'no-caller': ['error'],

  /**
   * * Recommended Rule
   * Disallow lexical declarations in case/default clauses.
   * https://eslint.org/docs/rules/no-case-declarations
   */
  'no-case-declarations': ['error'],

  /**
   * * Recommended Rule
   * Disallow modifying variables of class declarations.
   * https://eslint.org/docs/rules/no-class-assign
   */
  'no-class-assign': ['error'],

  /**
   * * Recommended Rule
   * Disallow comparing against -0.
   * https://eslint.org/docs/rules/no-compare-neg-zero
   */
  'no-compare-neg-zero': ['error'],

  /**
   * * Recommended Rule
   * Disallow assignment operators in conditional statements.
   * https://eslint.org/docs/rules/no-cond-assign
   */
  'no-cond-assign': ['error', 'except-parens'],

  /**
   * Disallow arrow functions where they could be confused with comparisons.
   * https://eslint.org/docs/rules/no-confusing-arrow
   */
  'no-confusing-arrow': [
    'error',
    {
      allowParens: true,
    },
  ],

  /**
   * Disallow the use of console.
   * https://eslint.org/docs/rules/no-console
   */
  'no-console': ['warn'],

  /**
   * * Recommended Rule
   * Disallow modifying variables that are declared using const.
   * https://eslint.org/docs/rules/no-const-assign
   */
  'no-const-assign': ['error'],

  /**
   * * Recommended Rule
   * Disallow constant expressions in conditions.
   * https://eslint.org/docs/rules/no-constant-condition
   */
  'no-constant-condition': [
    'error',
    {
      checkLoops: true,
    },
  ],

  /**
   * Disallow returning value in constructor.
   * https://eslint.org/docs/rules/no-constructor-return
   */
  'no-constructor-return': ['error'],

  /**
   * Disallow continue statements.
   * https://eslint.org/docs/rules/no-continue
   */
  'no-continue': ['error'],

  /**
   * * Recommended Rule
   * Disallow control characters in regular expressions.
   * https://eslint.org/docs/rules/no-control-regex
   */
  'no-control-regex': ['error'],

  /**
   * * Recommended Rule
   * Disallow the use of debugger.
   * https://eslint.org/docs/rules/no-debugger
   */
  'no-debugger': ['error'],

  /**
   * * Recommended Rule
   * Disallow deleting variables.
   * https://eslint.org/docs/rules/no-delete-var
   */
  'no-delete-var': ['error'],

  /**
   * Disallow Regular Expressions That Look Like Division
   * https://eslint.org/docs/rules/no-div-regex
   */
  'no-div-regex': ['error'],

  /**
   * * Recommended Rule
   * Disallow duplicate arguments in function definitions.
   * https://eslint.org/docs/rules/no-dupe-args
   */
  'no-dupe-args': ['off'],

  /**
   * * Recommended Rule
   * Disallow duplicate name in class members
   * https://eslint.org/docs/rules/no-dupe-class-members
   */
  'no-dupe-class-members': ['error'],

  /**
   * * Recommended Rule
   * Disallow duplicate conditions in if-else-if chains
   * https://eslint.org/docs/rules/no-dupe-else-if
   */
  'no-dupe-else-if': ['error'],

  /**
   * * Recommended Rule
   * Disallow duplicate keys in object literals.
   * https://eslint.org/docs/rules/no-dupe-keys
   */
  'no-dupe-keys': ['error'],

  /**
   * * Recommended Rule
   * Rule to disallow a duplicate case label.
   * https://eslint.org/docs/rules/no-duplicate-case
   */
  'no-duplicate-case': ['error'],

  /**
   * Disallow duplicate imports.
   * https://eslint.org/docs/rules/no-duplicate-imports
   */
  'no-duplicate-imports': [
    'error',
    {
      includeExports: true,
    },
  ],

  /**
   * Disallow return before else.
   * https://eslint.org/docs/rules/no-else-return
   */
  'no-else-return': [
    'error',
    {
      allowElseIf: true,
    },
  ],

  /**
   * * Recommended Rule
   * Disallow empty block statements.
   * https://eslint.org/docs/rules/no-empty
   */
  'no-empty': [
    'error',
    {
      allowEmptyCatch: false,
    },
  ],

  /**
   * * Recommended Rule
   * Disallow empty character classes in regular expressions.
   * https://eslint.org/docs/rules/no-empty-character-class
   */
  'no-empty-character-class': ['error'],

  /**
   * Disallow empty functions.
   * https://eslint.org/docs/rules/no-empty-function
   */
  'no-empty-function': ['error'],

  /**
   * * Recommended Rule
   * Disallow empty destructuring patterns.
   * https://eslint.org/docs/rules/no-empty-pattern
   */
  'no-empty-pattern': ['error'],

  /**
   * * Rule is disabled in favor of 'eqeqeq'
   * Disallow Null Comparisons.
   * https://eslint.org/docs/rules/no-eq-null
   */
  'no-eq-null': ['off'],

  /**
   * Disallow eval().
   * https://eslint.org/docs/rules/no-eval
   */
  'no-eval': [
    'error',
    {
      allowIndirect: false,
    },
  ],

  /**
   * * Recommended Rule
   * Disallow reassigning exceptions in catch clauses.
   * https://eslint.org/docs/rules/no-ex-assign
   */
  'no-ex-assign': ['error'],

  /**
   * Disallow Extending of Native Objects.
   * https://eslint.org/docs/rules/no-extend-native
   */
  'no-extend-native': ['error'],

  /**
   * Disallow unnecessary function binding.
   * https://eslint.org/docs/rules/no-extra-bind
   */
  'no-extra-bind': ['error'],

  /**
   * * Recommended Rule
   * Disallow unnecessary boolean casts.
   * https://eslint.org/docs/rules/no-extra-boolean-cast
   */
  'no-extra-boolean-cast': [
    'error',
    {
      enforceForLogicalOperands: true,
    },
  ],

  /**
   * Disallow Unnecessary Labels.
   * https://eslint.org/docs/rules/no-extra-label
   */
  'no-extra-label': ['error'],

  /**
   * Disallow unnecessary parentheses.
   * https://eslint.org/docs/rules/no-extra-parens
   */
  'no-extra-parens': ['error', 'functions'],

  /**
   * * Recommended Rule
   * Disallow unnecessary semicolons.
   * https://eslint.org/docs/rules/no-extra-semi
   */
  'no-extra-semi': ['error'],

  /**
   * * Recommended Rule
   * Disallow Case Statement Fallthrough.
   * https://eslint.org/docs/rules/no-fallthrough
   */
  'no-fallthrough': [
    'error',
    {
      commentPattern: 'break[\\s\\w]*omitted',
    },
  ],

  /**
   * Disallow Floating Decimals.
   * https://eslint.org/docs/rules/no-floating-decimal
   */
  'no-floating-decimal': ['error'],

  /**
   * * Recommended Rule
   * Disallow reassigning function declarations.
   * https://eslint.org/docs/rules/no-func-assign
   */
  'no-func-assign': ['error'],

  /**
   * * Recommended Rule
   * Disallow assignment to native objects or read-only global variables.
   * https://eslint.org/docs/rules/no-global-assign
   */
  'no-global-assign': ['error'],

  /**
   * Disallow the type conversion with shorter notations.
   * https://eslint.org/docs/rules/no-implicit-coercion
   */
  'no-implicit-coercion': [
    'error',
    {
      disallowTemplateShorthand: false,
    },
  ],

  /**
   * Disallow declarations in the global scope.
   * https://eslint.org/docs/rules/no-implicit-globals
   */
  'no-implicit-globals': ['error'],

  /**
   * Disallow Implied eval().
   * https://eslint.org/docs/rules/no-implied-eval
   */
  'no-implied-eval': ['error'],

  /**
   * * Recommended Rule
   * Disallow assigning to imported bindings.
   * https://eslint.org/docs/rules/no-import-assign
   */
  'no-import-assign': ['error'],

  /**
   * Disallow inline comments after code.
   * https://eslint.org/docs/rules/no-inline-comments
   */
  'no-inline-comments': ['error'],

  /**
   * * Recommended Rule
   * Disallow variable or function declarations in nested blocks.
   * https://eslint.org/docs/rules/no-inner-declarations
   */
  'no-inner-declarations': ['error', 'both'],

  /**
   * * Recommended Rule
   * Disallow invalid regular expression strings in RegExp constructors.
   * https://eslint.org/docs/rules/no-invalid-regexp
   */
  'no-invalid-regexp': ['error'],

  /**
   * Disallow this keywords outside of classes or class-like objects.
   * https://eslint.org/docs/rules/no-invalid-this
   */
  'no-invalid-this': [
    'error',
    {
      capIsConstructor: false,
    },
  ],

  /**
   * * Recommended Rule
   * Disallow irregular whitespace.
   * https://eslint.org/docs/rules/no-irregular-whitespace
   */
  'no-irregular-whitespace': [
    'error',
    {
      skipStrings: true,
      skipRegExps: false,
      skipTemplates: false,
      skipComments: false,
    },
  ],

  /**
   * Disallow Iterator.
   * https://eslint.org/docs/rules/no-iterator
   */
  'no-iterator': ['error'],

  /**
   * Disallow Labels That Are Variables Names.
   * https://eslint.org/docs/rules/no-label-var
   */
  'no-label-var': ['error'],

  /**
   * Disallow Labeled Statements.
   * https://eslint.org/docs/rules/no-labels
   */
  'no-labels': ['off'],

  /**
   * Disallow Unnecessary Nested Blocks.
   * https://eslint.org/docs/rules/no-lone-blocks
   */
  'no-lone-blocks': ['error'],

  /**
   * Disallow if statements as the only statement in else blocks.
   * https://eslint.org/docs/rules/no-lonely-if
   */
  'no-lonely-if': ['error'],

  /**
   * Disallow Functions in Loops.
   * https://eslint.org/docs/rules/no-loop-func
   */
  'no-loop-func': ['error'],

  /**
   * * Recommended Rule
   * Disallow Number Literals That Lose Precision.
   * https://eslint.org/docs/rules/no-loss-of-precision
   */
  'no-loss-of-precision': ['error'],

  /**
   * Disallow Magic Numbers.
   * https://eslint.org/docs/rules/no-magic-numbers
   */
  'no-magic-numbers': [
    'off',
    {
      enforceConst: true,
      detectObjects: true,
      ignoreArrayIndexes: true,
      ignoreDefaultValues: false,
      ignore: [0, 1, -1],
    },
  ],

  /**
   * * Recommended Rule
   * Disallow characters which are made with multiple code points in character class syntax.
   * https://eslint.org/docs/rules/no-misleading-character-class
   */
  'no-misleading-character-class': ['error'],

  /**
   * Disallow mixes of different operators.
   * https://eslint.org/docs/rules/no-mixed-operators
   */
  'no-mixed-operators': ['error'],

  /**
   * Disallow mixed spaces and tabs for indentation.
   * https://eslint.org/docs/rules/no-mixed-spaces-and-tabs
   */
  'no-mixed-spaces-and-tabs': ['error'],

  /**
   * Disallow Use of Chained Assignment Expressions.
   * https://eslint.org/docs/rules/no-multi-assign
   */
  'no-multi-assign': [
    'error',
    {
      ignoreNonDeclaration: false,
    },
  ],

  /**
   * Disallow multiple spaces.
   * https://eslint.org/docs/rules/no-multi-spaces
   */
  'no-multi-spaces': [
    'error',
    {
      ignoreEOLComments: false,
      exceptions: {
        Property: false,
        BinaryExpression: false,
        VariableDeclarator: false,
        ImportDeclaration: false,
      },
    },
  ],

  /**
   * Disallow Multiline Strings.
   * https://eslint.org/docs/rules/no-multi-str
   */
  'no-multi-str': ['error'],

  /**
   * Disallow multiple empty lines.
   * https://eslint.org/docs/rules/no-multiple-empty-lines
   */
  'no-multiple-empty-lines': [
    'error',
    {
      max: 1,
      maxBOF: 0,
      maxEOF: 0,
    },
  ],

  /**
   * Disallow negated conditions.
   * https://eslint.org/docs/rules/no-negated-condition
   */
  'no-negated-condition': ['error'],

  /**
   * Disallow nested ternary expressions.
   * https://eslint.org/docs/rules/no-nested-ternary
   */
  'no-nested-ternary': ['error'],

  /**
   * Disallow new For Side Effects.
   * https://eslint.org/docs/rules/no-new
   */
  'no-new': ['error'],

  /**
   * Disallow Function Constructor.
   * https://eslint.org/docs/rules/no-new-func
   */
  'no-new-func': ['error'],

  /**
   * Disallow Object Constructors.
   * https://eslint.org/docs/rules/no-new-object
   */
  'no-new-object': ['error'],

  /**
   * * Recommended Rule
   * Disallow Symbol Constructor.
   * https://eslint.org/docs/rules/no-new-symbol
   */
  'no-new-symbol': ['error'],

  /**
   * Disallow Primitive Wrapper Instances.
   * https://eslint.org/docs/rules/no-new-wrappers
   */
  'no-new-wrappers': ['error'],

  /**
   * * Recommended Rule
   * Disallow \8 and \9 escape sequences in string literals.
   * https://eslint.org/docs/rules/no-nonoctal-decimal-escape
   */
  'no-nonoctal-decimal-escape': ['error'],

  /**
   * * Recommended Rule
   * Disallow calling global object properties as functions.
   * https://eslint.org/docs/rules/no-obj-calls
   */
  'no-obj-calls': ['error'],

  /**
   * * Recommended Rule
   * Disallow octal literals.
   * https://eslint.org/docs/rules/no-octal
   */
  'no-octal': ['error'],

  /**
   * Disallow octal escape sequences in string literals.
   * https://eslint.org/docs/rules/no-octal-escape
   */
  'no-octal-escape': ['error'],

  /**
   * Disallow Reassignment of Function Parameters.
   * https://eslint.org/docs/rules/no-param-reassign
   */
  'no-param-reassign': [
    'error',
    {
      props: true,
    },
  ],

  /**
   * Disallow the unary operators ++ and --.
   * https://eslint.org/docs/rules/no-plusplus
   */
  'no-plusplus': [
    'error',
    {
      allowForLoopAfterthoughts: false,
    },
  ],

  /**
   * Disallow returning values from Promise executor functions.
   * https://eslint.org/docs/rules/no-promise-executor-return
   */
  'no-promise-executor-return': ['error'],

  /**
   * Disallow Use of __proto__.
   * https://eslint.org/docs/rules/no-proto
   */
  'no-proto': ['error'],

  /**
   * * Recommended Rule
   * Disallow use of Object.prototypes builtins directly.
   * https://eslint.org/docs/rules/no-prototype-builtins
   */
  'no-prototype-builtins': ['error'],

  /**
   * * Recommended Rule
   * Disallow variable redeclaration.
   * https://eslint.org/docs/rules/no-redeclare
   */
  'no-redeclare': [
    'error',
    {
      builtinGlobals: true,
    },
  ],

  /**
   * * Recommended Rule
   * Disallow multiple spaces in regular expression literals.
   * https://eslint.org/docs/rules/no-regex-spaces
   */
  'no-regex-spaces': ['error'],

  /**
   * Disallow specified names in exports.
   * https://eslint.org/docs/rules/no-restricted-exports
   */
  'no-restricted-exports': ['off'],

  /**
   * Disallow specific global variables.
   * https://eslint.org/docs/rules/no-restricted-globals
   */
  'no-restricted-globals': ['error', 'isFinite', 'isNaN', ...restrictedGlobals],

  /**
   * Disallow specific imports.
   * https://eslint.org/docs/rules/no-restricted-imports
   */
  'no-restricted-imports': ['off'],

  /**
   * Disallow certain object properties.
   * https://eslint.org/docs/rules/no-restricted-properties
   */
  'no-restricted-properties': ['off'],

  /**
   * Disallow specified syntax.
   * https://eslint.org/docs/rules/no-restricted-syntax
   */
  'no-restricted-syntax': ['off'],

  /**
   * Disallow Assignment in return Statement.
   * https://eslint.org/docs/rules/no-return-assign
   */
  'no-return-assign': ['error', 'always'],

  /**
   * Disallows unnecessary return await.
   * https://eslint.org/docs/rules/no-return-await
   */
  'no-return-await': ['error'],

  /**
   * Disallow Script URLs.
   * https://eslint.org/docs/rules/no-script-url
   */
  'no-script-url': ['error'],

  /**
   * * Recommended Rule
   * Disallow Self Assignment.
   * https://eslint.org/docs/rules/no-self-assign
   */
  'no-self-assign': [
    'error',
    {
      props: true,
    },
  ],

  /**
   * Disallow Self Compare.
   * https://eslint.org/docs/rules/no-self-compare
   */
  'no-self-compare': ['error'],

  /**
   * Disallow Use of the Comma Operator.
   * https://eslint.org/docs/rules/no-sequences
   */
  'no-sequences': [
    'error',
    {
      allowInParentheses: false,
    },
  ],

  /**
   * * Recommended Rule
   * Disallow returning values from setters.
   * https://eslint.org/docs/rules/no-setter-return
   */
  'no-setter-return': ['error'],

  /**
   * Disallow variable declarations from shadowing variables declared in the outer scope.
   * https://eslint.org/docs/rules/no-shadow
   */
  'no-shadow': [
    'error',
    {
      hoist: 'all',
      builtinGlobals: true,
    },
  ],

  /**
   * * Recommended Rule
   * Disallow Shadowing of Restricted Names.
   * https://eslint.org/docs/rules/no-shadow-restricted-names
   */
  'no-shadow-restricted-names': ['error'],

  /**
   * * Recommended Rule
   * Disallow sparse arrays.
   * https://eslint.org/docs/rules/no-sparse-arrays
   */
  'no-sparse-arrays': ['error'],

  /**
   * Disallow all tabs.
   * https://eslint.org/docs/rules/no-tabs
   */
  'no-tabs': [
    'error',
    {
      allowIndentationTabs: false,
    },
  ],

  /**
   * Disallow template literal placeholder syntax in regular strings.
   * https://eslint.org/docs/rules/no-template-curly-in-string
   */
  'no-template-curly-in-string': ['warn'],

  /**
   * Disallow ternary operators.
   * https://eslint.org/docs/rules/no-ternary
   */
  'no-ternary': ['off'],

  /**
   * * Recommended Rule
   * Disallow use of this/super before calling super() in constructors.
   * https://eslint.org/docs/rules/no-this-before-super
   */
  'no-this-before-super': ['error'],

  /**
   * Restrict what can be thrown as an exception.
   * https://eslint.org/docs/rules/no-throw-literal
   */
  'no-throw-literal': ['error'],

  /**
   * Disallow trailing whitespace at the end of lines.
   * https://eslint.org/docs/rules/no-trailing-spaces
   */
  'no-trailing-spaces': [
    'error',
    {
      skipBlankLines: false,
      ignoreComments: false,
    },
  ],

  /**
   * * Recommended Rule
   * Disallow Undeclared Variables.
   * https://eslint.org/docs/rules/no-undef
   */
  'no-undef': [
    'error',
    {
      typeof: true,
    },
  ],

  /**
   * Disallow Initializing to undefined.
   * https://eslint.org/docs/rules/no-undef-init
   */
  'no-undef-init': ['error'],

  /**
   * Disallow Use of undefined Variable
   * https://eslint.org/docs/rules/no-undefined
   */
  'no-undefined': ['off'],

  /**
   * Disallow dangling underscores in identifiers.
   * https://eslint.org/docs/rules/no-underscore-dangle
   */
  'no-underscore-dangle': [
    'error',
    {
      allowAfterThis: false,
      allowAfterSuper: false,
      allowAfterThisConstructor: false,
      allowFunctionParams: false,
      enforceInMethodNames: true,
    },
  ],

  /**
   * * Recommended Rule
   * Disallow confusing multiline expressions.
   * https://eslint.org/docs/rules/no-unexpected-multiline
   */
  'no-unexpected-multiline': ['error'],

  /**
   * Disallow unmodified conditions of loops.
   * https://eslint.org/docs/rules/no-unmodified-loop-condition
   */
  'no-unmodified-loop-condition': ['error'],

  /**
   * Disallow ternary operators when simpler alternatives exist.
   * https://eslint.org/docs/rules/no-unneeded-ternary
   */
  'no-unneeded-ternary': [
    'error',
    {
      defaultAssignment: true,
    },
  ],

  /**
   * * Recommended Rule
   * Disallow unreachable code after return, throw, continue, and break statements.
   * https://eslint.org/docs/rules/no-unreachable
   */
  'no-unreachable': ['error'],

  /**
   * Disallow loops with a body that allows only one iteration.
   * https://eslint.org/docs/rules/no-unreachable-loop
   */
  'no-unreachable-loop': ['error'],

  /**
   * * Recommended Rule
   * Disallow control flow statements in finally blocks.
   * https://eslint.org/docs/rules/no-unsafe-finally
   */
  'no-unsafe-finally': ['error'],

  /**
   * * Recommended Rule
   * Disallow negating the left operand of relational operators.
   * https://eslint.org/docs/rules/no-unsafe-negation
   */
  'no-unsafe-negation': [
    'error',
    {
      enforceForOrderingRelations: true,
    },
  ],

  /**
   * * Recommended Rule
   * Disallow use of optional chaining in contexts where the undefined value is not allowed.
   * https://eslint.org/docs/rules/no-unsafe-optional-chaining
   */
  'no-unsafe-optional-chaining': [
    'error',
    {
      disallowArithmeticOperators: true,
    },
  ],

  /**
   * Disallow Unused Expressions.
   * https://eslint.org/docs/rules/no-unused-expressions
   */
  'no-unused-expressions': [
    'error',
    {
      allowShortCircuit: false,
      allowTernary: false,
      allowTaggedTemplates: false,
      enforceForJSX: false,
    },
  ],

  /**
   * * Recommended Rule
   * Disallow Unused Labels.
   * https://eslint.org/docs/rules/no-unused-labels
   */
  'no-unused-labels': ['error'],

  /**
   * Disallow Unused Private Class Members.
   * https://eslint.org/docs/rules/no-unused-private-class-members
   */
  'no-unused-private-class-members': ['error'],

  /**
   * * Recommended Rule
   * Disallow Unused Variables.
   * https://eslint.org/docs/rules/no-unused-vars
   */
  'no-unused-vars': [
    'error',
    {
      vars: 'all',
      args: 'after-used',
      caughtErrors: 'all',
      ignoreRestSiblings: true,
    },
  ],

  /**
   * Disallow Early Use.
   * https://eslint.org/docs/rules/no-use-before-define
   */
  'no-use-before-define': [
    'error',
    {
      classes: true,
      functions: true,
      variables: true,
    },
  ],

  /**
   * * Recommended Rule
   * Disallow useless backreferences in regular expressions.
   * https://eslint.org/docs/rules/no-useless-backreference
   */
  'no-useless-backreference': ['error'],

  /**
   * Disallow unnecessary .call() and .apply().
   * https://eslint.org/docs/rules/no-useless-call
   */
  'no-useless-call': ['error'],

  /**
   * * Recommended Rule
   * Disallow unnecessary catch clauses.
   * https://eslint.org/docs/rules/no-useless-catch
   */
  'no-useless-catch': ['error'],

  /**
   * Disallow unnecessary computed property keys in objects and classes.
   * https://eslint.org/docs/rules/no-useless-computed-key
   */
  'no-useless-computed-key': [
    'error',
    {
      enforceForClassMembers: true,
    },
  ],

  /**
   * Disallow unnecessary concatenation of strings.
   * https://eslint.org/docs/rules/no-useless-concat
   */
  'no-useless-concat': ['error'],

  /**
   * Disallow unnecessary constructor.
   * https://eslint.org/docs/rules/no-useless-constructor
   */
  'no-useless-constructor': ['error'],

  /**
   * * Recommended Rule
   * Disallow unnecessary escape usage.
   * https://eslint.org/docs/rules/no-useless-escape
   */
  'no-useless-escape': ['error'],

  /**
   * Disallow renaming import, export, and destructured assignments to the same name.
   * https://eslint.org/docs/rules/no-useless-rename
   */
  'no-useless-rename': [
    'error',
    {
      ignoreImport: false,
      ignoreExport: false,
      ignoreDestructuring: false,
    },
  ],

  /**
   * Disallow redundant return statements.
   * https://eslint.org/docs/rules/no-useless-return
   */
  'no-useless-return': ['error'],

  /**
   * Require let or const instead of var.
   * https://eslint.org/docs/rules/no-var
   */
  'no-var': ['error'],

  /**
   * Disallow use of the void operator.
   * https://eslint.org/docs/rules/no-void
   */
  'no-void': [
    'error',
    {
      allowAsStatement: false,
    },
  ],

  /**
   * Disallow Warning Comments.
   * https://eslint.org/docs/rules/no-warning-comments
   */
  'no-warning-comments': ['warn'],

  /**
   * Disallow whitespace before properties.
   * https://eslint.org/docs/rules/no-whitespace-before-property
   */
  'no-whitespace-before-property': ['error'],

  /**
   * * Recommended Rule
   * Disallow with statements.
   * https://eslint.org/docs/rules/no-with
   */
  'no-with': ['error'],

  /**
   * Enforce the location of single-line statements.
   * https://eslint.org/docs/rules/nonblock-statement-body-position
   */
  'nonblock-statement-body-position': ['error', 'beside'],

  /**
   * Enforce consistent line breaks after opening and before closing braces.
   * https://eslint.org/docs/rules/object-curly-newline
   */
  'object-curly-newline': [
    'error',
    {
      multiline: true,
      consistent: true,
      minProperties: 4,
    },
  ],

  /**
   * Enforce consistent spacing inside braces.
   * https://eslint.org/docs/rules/object-curly-spacing
   */
  'object-curly-spacing': ['error', 'always'],

  /**
   * Enforce placing object properties on separate lines.
   * https://eslint.org/docs/rules/object-property-newline
   */
  'object-property-newline': [
    'error',
    {
      allowAllPropertiesOnSameLine: true,
    },
  ],

  /**
   * Require Object Literal Shorthand Syntax.
   * https://eslint.org/docs/rules/object-shorthand
   */
  'object-shorthand': ['error', 'always'],

  /**
   * Enforce variables to be declared either together or separately in functions.
   * https://eslint.org/docs/rules/one-var
   */
  'one-var': ['error', 'never'],

  /**
   * Require or disallow newlines around variable declarations.
   * https://eslint.org/docs/rules/one-var-declaration-per-line
   */
  'one-var-declaration-per-line': ['error', 'always'],

  /**
   * Require or disallow assignment operator shorthand where possible.
   * https://eslint.org/docs/rules/operator-assignment
   */
  'operator-assignment': ['error', 'always'],

  /**
   * Enforce consistent linebreak style for operators.
   * https://eslint.org/docs/rules/operator-linebreak
   */
  'operator-linebreak': ['error', 'before'],

  /**
   * Require or disallow padding within blocks.
   * https://eslint.org/docs/rules/padded-blocks
   */
  'padded-blocks': [
    'error',
    {
      blocks: 'never',
      classes: 'never',
      switches: 'never',
    },
    {
      allowSingleLineBlocks: true,
    },
  ],

  /**
   * Require or disallow padding lines between statements.
   * https://eslint.org/docs/rules/padding-line-between-statements
   */
  'padding-line-between-statements': ['off'],

  /**
   * Require using arrow functions for callbacks.
   * https://eslint.org/docs/rules/prefer-arrow-callback
   */
  'prefer-arrow-callback': [
    'error',
    {
      allowNamedFunctions: true,
      allowUnboundThis: true,
    },
  ],

  /**
   * Suggest using const.
   * https://eslint.org/docs/rules/prefer-const
   */
  'prefer-const': [
    'error',
    {
      destructuring: 'all',
      ignoreReadBeforeAssign: false,
    },
  ],

  /**
   * Prefer destructuring from arrays and objects.
   * https://eslint.org/docs/rules/prefer-destructuring
   */
  'prefer-destructuring': [
    'error',
    {
      array: true,
      object: true,
    },
    {
      enforceForRenamedProperties: false,
    },
  ],

  /**
   * Disallow the use of Math.pow in favor of the ** operator.
   * https://eslint.org/docs/rules/prefer-exponentiation-operator
   */
  'prefer-exponentiation-operator': ['error'],

  /**
   * Suggest using named capture group in regular expression.
   * https://eslint.org/docs/rules/prefer-named-capture-group
   */
  'prefer-named-capture-group': ['error'],

  /**
   * Disallow parseInt() and Number.parseInt() in favor of binary, octal, and hexadecimal literals.
   * https://eslint.org/docs/rules/prefer-numeric-literals
   */
  'prefer-numeric-literals': ['error'],

  /**
   * Prefer Object.hasOwn() over Object.prototype.hasOwnProperty.call().
   * https://eslint.org/docs/rules/prefer-object-has-own
   */
  'prefer-object-has-own': ['error'],

  /**
   * Prefer use of an object spread over Object.assign.
   * https://eslint.org/docs/rules/prefer-object-spread
   */
  'prefer-object-spread': ['error'],

  /**
   * Require using Error objects as Promise rejection reasons.
   * https://eslint.org/docs/rules/prefer-promise-reject-errors
   */
  'prefer-promise-reject-errors': [
    'error',
    {
      allowEmptyReject: false,
    },
  ],

  /**
   * Disallow use of the RegExp constructor in favor of regular expression literals.
   * https://eslint.org/docs/rules/prefer-regex-literals
   */
  'prefer-regex-literals': [
    'error',
    {
      disallowRedundantWrapping: true,
    },
  ],

  /**
   * Suggest using the rest parameters instead of arguments.
   * https://eslint.org/docs/rules/prefer-rest-params
   */
  'prefer-rest-params': ['error'],

  /**
   * Suggest using spread syntax instead of .apply().
   * https://eslint.org/docs/rules/prefer-spread
   */
  'prefer-spread': ['error'],

  /**
   * Suggest using template literals instead of string concatenation.
   * https://eslint.org/docs/rules/prefer-template
   */
  'prefer-template': ['error'],

  /**
   * Require quotes around object literal property names.
   * https://eslint.org/docs/rules/quote-props
   */
  'quote-props': [
    'error',
    'consistent-as-needed',
    {
      keywords: false,
    },
  ],

  /**
   * Enforce the consistent use of either backticks, double, or single quotes.
   * https://eslint.org/docs/rules/quotes
   */
  'quotes': [
    'error',
    'single',
    {
      avoidEscape: true,
      allowTemplateLiterals: false,
    },
  ],

  /**
   * Require Radix Parameter.
   * https://eslint.org/docs/rules/radix
   */
  'radix': ['error', 'always'],

  /**
   * Disallow assignments that can lead to race conditions due to usage of await or yield.
   * https://eslint.org/docs/rules/require-atomic-updates
   */
  'require-atomic-updates': [
    'error',
    {
      allowProperties: false,
    },
  ],

  /**
   * Disallow async functions which have no await expression.
   * https://eslint.org/docs/rules/require-await
   */
  'require-await': ['error'],

  /**
   * Enforce the use of u flag on RegExp.
   * https://eslint.org/docs/rules/require-unicode-regexp
   */
  'require-unicode-regexp': ['error'],

  /**
   * * Recommended Rule
   * Disallow generator functions that do not have yield.
   * https://eslint.org/docs/rules/require-yield
   */
  'require-yield': ['error'],

  /**
   * Enforce spacing between rest and spread operators and their expressions.
   * https://eslint.org/docs/rules/rest-spread-spacing
   */
  'rest-spread-spacing': ['error', 'never'],

  /**
   * Require or disallow semicolons instead of ASI.
   * https://eslint.org/docs/rules/semi
   */
  'semi': [
    'error',
    'always',
    {
      omitLastInOneLineBlock: false,
    },
  ],

  /**
   * Enforce spacing before and after semicolons.
   * https://eslint.org/docs/rules/semi-spacing
   */
  'semi-spacing': [
    'error',
    {
      before: false,
      after: true,
    },
  ],

  /**
   * Enforce location of semicolons.
   * https://eslint.org/docs/rules/semi-style
   */
  'semi-style': ['error', 'last'],

  /**
   * Import Sorting.
   * https://eslint.org/docs/rules/sort-imports
   */
  // TODO: Generate import rule
  'sort-imports': ['off'],

  /**
   * Require object keys to be sorted.
   * https://eslint.org/docs/rules/sort-keys
   */
  'sort-keys': ['off'],

  /**
   * Variable Sorting.
   * https://eslint.org/docs/rules/sort-vars
   */
  'sort-vars': ['off'],

  /**
   * Require Or Disallow Space Before Blocks.
   * https://eslint.org/docs/rules/space-before-blocks
   */
  'space-before-blocks': [
    'error',
    {
      functions: 'always',
      keywords: 'always',
      classes: 'always',
    },
  ],

  /**
   * Require or disallow a space before function parenthesis.
   * https://eslint.org/docs/rules/space-before-function-paren
   */
  'space-before-function-paren': [
    'error',
    {
      named: 'never',
      anonymous: 'always',
      asyncArrow: 'always',
    },
  ],

  /**
   * Disallow or enforce spaces inside of parentheses.
   * https://eslint.org/docs/rules/space-in-parens
   */
  'space-in-parens': ['error', 'never'],

  /**
   * Require spacing around infix operators.
   * https://eslint.org/docs/rules/space-infix-ops
   */
  'space-infix-ops': [
    'error',
    {
      int32Hint: false,
    },
  ],

  /**
   * Require or disallow spaces before/after unary operators.
   * https://eslint.org/docs/rules/space-unary-ops
   */
  'space-unary-ops': [
    'error',
    {
      words: true,
      nonwords: true,
    },
  ],

  /**
   * Requires or disallows a whitespace (space or tab) beginning a comment.
   * https://eslint.org/docs/rules/spaced-comment
   */
  'spaced-comment': ['error', 'always'],

  /**
   * Require or disallow strict mode directives.
   * https://eslint.org/docs/rules/strict
   */
  'strict': ['error', 'safe'],

  /**
   * Enforce spacing around colons of switch statements.
   * https://eslint.org/docs/rules/switch-colon-spacing
   */
  'switch-colon-spacing': [
    'error',
    {
      before: false,
      after: true,
    },
  ],

  /**
   * Require symbol description.
   * https://eslint.org/docs/rules/symbol-description
   */
  'symbol-description': ['error'],

  /**
   * Enforce Usage of Spacing in Template Strings.
   * https://eslint.org/docs/rules/template-curly-spacing
   */
  'template-curly-spacing': ['error', 'never'],

  /**
   * Require or disallow spacing between template tags and their literals.
   * https://eslint.org/docs/rules/template-tag-spacing
   */
  'template-tag-spacing': ['error', 'never'],

  /**
   * Require or disallow the Unicode Byte Order Mark (BOM).
   * https://eslint.org/docs/rules/unicode-bom
   */
  'unicode-bom': ['error', 'never'],

  /**
   * * Recommended Rule
   * Require calls to isNaN() when checking for NaN.
   * https://eslint.org/docs/rules/use-isnan
   */
  'use-isnan': [
    'error',
    {
      enforceForSwitchCase: true,
      enforceForIndexOf: true,
    },
  ],

  /**
   * * Recommended Rule
   * Enforce comparing typeof expressions against valid strings.
   * https://eslint.org/docs/rules/valid-typeof
   */
  'valid-typeof': [
    'error',
    {
      requireStringLiterals: true,
    },
  ],

  /**
   * Require Variable Declarations to be at the top of their scope.
   * https://eslint.org/docs/rules/vars-on-top
   */
  'vars-on-top': ['error'],

  /**
   * Require IIFEs to be Wrapped.
   * https://eslint.org/docs/rules/wrap-iife
   */
  'wrap-iife': ['error', 'inside'],

  /**
   * Require Regex Literals to be Wrapped.
   * https://eslint.org/docs/rules/wrap-regex
   */
  'wrap-regex': ['off'],

  /**
   * Enforce spacing around the * in yield* expressions.
   * https://eslint.org/docs/rules/yield-star-spacing
   */
  'yield-star-spacing': ['error', 'after'],

  /**
   * Require or disallow Yoda Conditions.
   * https://eslint.org/docs/rules/yoda
   */
  'yoda': [
    'error',
    'never',
    {
      exceptRange: false,
      onlyEquality: false,
    },
  ],
};

/** @type {Object.<string, Array>} */
const typescriptRules = {
  /**
   * * Recommended Rule
   * Require that member overloads be consecutive (adjacent-overload-signatures).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/adjacent-overload-signatures.md
   */
  '@typescript-eslint/adjacent-overload-signatures': ['error'],

  /**
   * Requires using either T[] or Array<T> for arrays (array-type).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/array-type.md
   */
  '@typescript-eslint/array-type': [
    'error',
    {
      default: 'array',
      readonly: 'array',
    },
  ],

  /**
   * * Recommended Rule
   * Disallows awaiting a value that is not a Thenable (await-thenable).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/await-thenable.md
   */
  '@typescript-eslint/await-thenable': ['error'],

  /**
   * * Recommended Rule
   * Bans @ts-<directive> comments from being used or requires descriptions after directive (ban-ts-comment).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/ban-ts-comment.md
   */
  '@typescript-eslint/ban-ts-comment': [
    'error',
    {
      'minimumDescriptionLength': 3,
      'ts-expect-error': 'allow-with-description',
      'ts-ignore': true,
      'ts-nocheck': true,
      'ts-check': false,
    },
  ],

  /**
   * Bans // tslint:<rule-flag> comments from being used (ban-tslint-comment).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/ban-tslint-comment.md
   */
  '@typescript-eslint/ban-tslint-comment': ['error'],

  /**
   * * Recommended Rule
   * Bans specific types from being used (ban-types).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/ban-types.md
   */
  '@typescript-eslint/ban-types': [
    'error',
    {
      types: {
        'String': {
          message: 'Use string instead',
          fixWith: 'string',
        },
        'Boolean': {
          message: 'Use boolean instead',
          fixWith: 'boolean',
        },
        'Number': {
          message: 'Use number instead',
          fixWith: 'number',
        },
        'Symbol': {
          message: 'Use symbol instead',
          fixWith: 'symbol',
        },
        'Function': {
          message: [
            'The `Function` type accepts any function-like value.',
            'It provides no type safety when calling the function, which can be a common source of bugs.',
            'It also accepts things like class declarations, which will throw at runtime as they will not be called with `new`.',
            'If you are expecting the function to accept certain arguments, you should explicitly define the function shape.',
          ].join('\n'),
        },
        'Object': {
          message: [
            'The `Object` type actually means "any non-nullish value", so it is marginally better than `unknown`.',
            '- If you want a type meaning "any object", you probably want `Record<string, unknown>` instead.',
            '- If you want a type meaning "any value", you probably want `unknown` instead.',
          ].join('\n'),
        },
        '{}': {
          message: [
            '`{}` actually means "any non-nullish value".',
            '- If you want a type meaning "any object", you probably want `Record<string, unknown>` instead.',
            '- If you want a type meaning "any value", you probably want `unknown` instead.',
          ].join('\n'),
        },
      },
      extendDefaults: true,
    },
  ],

  /**
   * ! conflicts with 'brace-style'
   * Enforce consistent brace style for blocks (brace-style).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/brace-style.md
   */
  'brace-style': ['off'],
  '@typescript-eslint/brace-style': [
    'error',
    '1tbs',
    {
      allowSingleLine: true,
    },
  ],

  /**
   * Ensures that literals on classes are exposed in a consistent style (class-literal-property-style).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/class-literal-property-style.md
   */
  '@typescript-eslint/class-literal-property-style': ['error', 'fields'],

  /**
   * ! conflicts with 'comma-dangle'
   * Require or disallow trailing comma (comma-dangle).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/comma-dangle.md
   */
  'comma-dangle': ['off'],
  '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],

  /**
   * ! conflicts with 'comma-spacing'
   * Enforces consistent spacing before and after commas (comma-spacing).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/comma-spacing.md
   */
  'comma-spacing': ['off'],
  '@typescript-eslint/comma-spacing': [
    'error',
    {
      before: false,
      after: true,
    },
  ],

  /**
   * Enforce or disallow the use of the record type (consistent-indexed-object-style).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/consistent-indexed-object-style.md
   */
  '@typescript-eslint/consistent-indexed-object-style': [
    'error',
    'index-signature',
  ],

  /**
   * Enforces consistent usage of type assertions (consistent-type-assertions).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/consistent-type-assertions.md
   */
  '@typescript-eslint/consistent-type-assertions': [
    'error',
    {
      assertionStyle: 'as',
      objectLiteralTypeAssertions: 'allow-as-parameter',
    },
  ],

  /**
   * Consistent with type definition either interface or type (consistent-type-definitions).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/consistent-type-definitions.md
   */
  '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],

  /**
   * Enforces consistent usage of type exports (consistent-type-exports).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/consistent-type-exports.md
   */
  '@typescript-eslint/consistent-type-exports': [
    'error',
    {
      fixMixedExportsWithInlineTypeSpecifier: false,
    },
  ],

  /**
   * Enforces consistent usage of type imports (consistent-type-imports).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/consistent-type-imports.md
   */
  '@typescript-eslint/consistent-type-imports': [
    'error',
    {
      prefer: 'type-imports',
      disallowTypeAnnotations: true,
    },
  ],

  /**
   * ! conflicts with 'default-param-last'
   * Enforce default parameters to be last (default-param-last).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/default-param-last.md
   */
  'default-param-last': ['off'],
  '@typescript-eslint/default-param-last': ['error'],

  /**
   * ! conflicts with 'dot-notation'
   * Enforce dot notation whenever possible (dot-notation).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/dot-notation.md
   */
  'dot-notation': ['off'],
  '@typescript-eslint/dot-notation': [
    'error',
    {
      allowKeywords: false,
      allowPrivateClassPropertyAccess: false,
      allowProtectedClassPropertyAccess: false,
      allowIndexSignaturePropertyAccess: false,
    },
  ],

  /**
   * Require explicit return types on functions and class methods (explicit-function-return-type).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/explicit-function-return-type.md
   */
  '@typescript-eslint/explicit-function-return-type': [
    'error',
    {
      allowExpressions: false,
      allowTypedFunctionExpressions: true,
      allowHigherOrderFunctions: true,
      allowDirectConstAssertionInArrowFunctions: true,
      allowConciseArrowFunctionExpressionsStartingWithVoid: false,
    },
  ],

  /**
   * Require explicit accessibility modifiers on class properties and methods (explicit-member-accessibility).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/explicit-member-accessibility.md
   */
  '@typescript-eslint/explicit-member-accessibility': [
    'error',
    {
      accessibility: 'explicit',
      overrides: {
        accessors: 'explicit',
        constructors: 'no-public',
        methods: 'explicit',
        properties: 'explicit',
        parameterProperties: 'explicit',
      },
    },
  ],

  /**
   * Require explicit return and argument types on exported functions' and classes' public class methods (explicit-module-boundary-types).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/explicit-module-boundary-types.md
   */
  '@typescript-eslint/explicit-module-boundary-types': [
    'error',
    {
      allowedNames: [],
      allowHigherOrderFunctions: false,
      allowTypedFunctionExpressions: true,
      allowArgumentsExplicitlyTypedAsAny: false,
      allowDirectConstAssertionInArrowFunctions: true,
    },
  ],

  /**
   * ! conflicts with 'func-call-spacing'
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/func-call-spacing.md
   */
  'func-call-spacing': ['off'],
  '@typescript-eslint/func-call-spacing': ['error', 'never'],

  /**
   * ! conflicts with 'indent'
   * Enforce consistent indentation (indent).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/indent.md
   */
  'indent': ['off'],
  '@typescript-eslint/indent': [
    'error',
    2,
    {
      SwitchCase: 1,
      VariableDeclarator: 1,
      outerIIFEBody: 1,
      MemberExpression: 1,
      ArrayExpression: 1,
      ObjectExpression: 1,
      ImportDeclaration: 1,
      flatTernaryExpressions: false,
      offsetTernaryExpressions: false,
      ignoreComments: false,
      FunctionDeclaration: {
        parameters: 1,
        body: 1,
      },
      FunctionExpression: {
        parameters: 1,
        body: 1,
      },
      StaticBlock: {
        body: 1,
      },
      CallExpression: {
        arguments: 1,
      },
    },
  ],

  /**
   * ! conflicts with 'init-declarations'
   * Require or disallow initialization in variable declarations (init-declarations).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/init-declarations.md
   */
  'init-declarations': ['off'],
  '@typescript-eslint/init-declarations': ['error', 'always'],

  /**
   * ! conflicts with 'keyword-spacing'
   * Enforce consistent spacing before and after keywords (keyword-spacing).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/keyword-spacing.md
   */
  'keyword-spacing': ['off'],
  '@typescript-eslint/keyword-spacing': [
    'error',
    {
      before: true,
      after: true,
    },
  ],

  /**
   * ! conflicts with 'lines-between-class-members'
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/lines-between-class-members.md
   */
  'lines-between-class-members': ['off'],
  '@typescript-eslint/lines-between-class-members': [
    'error',
    'always',
    {
      exceptAfterSingleLine: true,
      exceptAfterOverload: true,
    },
  ],

  /**
   * Require a specific member delimiter style for interfaces and type literals (member-delimiter-style).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/member-delimiter-style.md
   */
  '@typescript-eslint/member-delimiter-style': [
    'error',
    {
      multiline: {
        delimiter: 'semi',
        requireLast: true,
      },
      singleline: {
        delimiter: 'semi',
        requireLast: false,
      },
      multilineDetection: 'brackets',
    },
  ],

  /**
   * Require a consistent member declaration order (member-ordering).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/member-ordering.md
   */
  '@typescript-eslint/member-ordering': [
    'error',
    {
      default: ['signature', 'field', 'constructor', 'method'],
    },
  ],

  /**
   * Enforces using a particular method signature syntax. (method-signature-style).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/method-signature-style.md
   */
  '@typescript-eslint/method-signature-style': ['error', 'property'],

  /**
   * Enforces naming conventions for everything across a codebase (naming-convention).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/naming-convention.md
   */
  // TODO: Create rule
  '@typescript-eslint/naming-convention': ['off'],

  /**
   * * Recommended Rule
   * Disallow generic Array constructors (no-array-constructor).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-array-constructor.md
   */
  '@typescript-eslint/no-array-constructor': ['error'],

  /**
   * Requires that .toString() is only called on objects which provide useful information when stringified (no-base-to-string).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-base-to-string.md
   */
  '@typescript-eslint/no-base-to-string': ['error'],

  /**
   * Disallow non-null assertion in locations that may be confusing (no-confusing-non-null-assertion).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-confusing-non-null-assertion.md
   */
  '@typescript-eslint/no-confusing-non-null-assertion': ['error'],

  /**
   * Requires expressions of type void to appear in statement position (no-confusing-void-expression).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-confusing-void-expression.md
   */
  '@typescript-eslint/no-confusing-void-expression': [
    'error',
    {
      ignoreArrowShorthand: false,
      ignoreVoidOperator: false,
    },
  ],

  /**
   * ! conflicts with 'no-dupe-class-members'
   * Disallow duplicate class members (no-dupe-class-members).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-dupe-class-members.md
   */
  'no-dupe-class-members': ['off'],
  '@typescript-eslint/no-dupe-class-members': ['error'],

  /**
   * ! conflicts with 'no-duplicate-imports'
   * Disallow duplicate imports (no-duplicate-imports).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-duplicate-imports.md
   */
  'no-duplicate-imports': ['off'],
  '@typescript-eslint/no-duplicate-imports': [
    'error',
    {
      includeExports: true,
    },
  ],

  /**
   * Disallow the delete operator with computed key expressions (no-dynamic-delete).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-dynamic-delete.md
   */
  '@typescript-eslint/no-dynamic-delete': ['error'],

  /**
   * * Recommended Rule
   * ! conflicts with 'no-empty-function'
   * Disallow empty functions (no-empty-function).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-empty-function.md
   */
  'no-empty-function': ['off'],
  '@typescript-eslint/no-empty-function': [
    'error',
    {
      allow: [
        'private-constructors',
        'protected-constructors',
        'decoratedFunctions',
      ],
    },
  ],

  /**
   * * Recommended Rule
   * Disallow the declaration of empty interfaces (no-empty-interface).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-empty-interface.md
   */
  '@typescript-eslint/no-empty-interface': [
    'error',
    {
      allowSingleExtends: true,
    },
  ],

  /**
   * * Recommended Rule
   * Disallow usage of the any type (no-explicit-any).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-explicit-any.md
   */
  '@typescript-eslint/no-explicit-any': [
    'error',
    {
      fixToUnknown: false,
      ignoreRestArgs: false,
    },
  ],

  /**
   * * Recommended Rule
   * Disallow extra non-null assertion (no-extra-non-null-assertion).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-extra-non-null-assertion.md.
   */
  '@typescript-eslint/no-extra-non-null-assertion': ['error'],

  /**
   * ! conflicts with 'no-extra-parens'
   * Disallow unnecessary parentheses (no-extra-parens).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-extra-parens.md
   */
  'no-extra-parens': ['off'],
  '@typescript-eslint/no-extra-parens': ['error', 'functions'],

  /**
   * * Recommended Rule
   * ! conflicts with 'no-extra-semi'
   * Disallow unnecessary semicolons (no-extra-semi).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-extra-semi.md
   */
  'no-extra-semi': ['off'],
  '@typescript-eslint/no-extra-semi': ['error'],

  /**
   * Forbids the use of classes as namespaces (no-extraneous-class).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-extraneous-class.md
   */
  '@typescript-eslint/no-extraneous-class': [
    'error',
    {
      allowConstructorOnly: false,
      allowEmpty: false,
      allowStaticOnly: false,
      allowWithDecorator: false,
    },
  ],

  /**
   * * Recommended Rule
   * Requires Promise-like values to be handled appropriately (no-floating-promises).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-floating-promises.md
   */
  '@typescript-eslint/no-floating-promises': [
    'error',
    {
      ignoreVoid: false,
      ignoreIIFE: false,
    },
  ],

  /**
   * * Recommended Rule
   * Disallow iterating over an array with a for-in loop (no-for-in-array).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-for-in-array.md
   */
  '@typescript-eslint/no-for-in-array': ['error'],

  /**
   * Disallow usage of the implicit any type in catch clauses (no-implicit-any-catch).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-implicit-any-catch.md
   */
  '@typescript-eslint/no-implicit-any-catch': [
    'error',
    {
      allowExplicitAny: false,
    },
  ],

  /**
   * * Recommended Rule
   * ! conflicts with 'no-implied-eval'
   * Disallow the use of eval()-like methods (no-implied-eval).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-implied-eval.md
   */
  'no-implied-eval': ['off'],
  '@typescript-eslint/no-implied-eval': ['error'],

  /**
   * * Recommended Rule
   * Disallows explicit type declarations for variables or parameters initialized to a number, string, or boolean (no-inferrable-types).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-inferrable-types.md
   */
  '@typescript-eslint/no-inferrable-types': [
    'error',
    {
      ignoreParameters: false,
      ignoreProperties: false,
    },
  ],

  /**
   * ! conflicts with 'no-invalid-this'
   * Disallow this keywords outside of classes or class-like objects (no-invalid-this).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-invalid-this.md
   */
  'no-invalid-this': ['off'],
  '@typescript-eslint/no-invalid-this': [
    'error',
    {
      capIsConstructor: false,
    },
  ],

  /**
   * Disallows usage of void type outside of generic or return types (no-invalid-void-type).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-invalid-void-type.md
   */
  '@typescript-eslint/no-invalid-void-type': [
    'error',
    {
      allowInGenericTypeArguments: true,
      allowAsThisParameter: false,
    },
  ],

  /**
   * ! conflicts with 'no-loop-func'
   * Disallow function declarations that contain unsafe references inside loop statements (no-loop-func).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-loop-func.md
   */
  'no-loop-func': ['off'],
  '@typescript-eslint/no-loop-func': ['error'],

  /**
   * * Recommended Rule
   * ! conflicts with 'no-loss-of-precision'
   * Disallow literal numbers that lose precision (no-loss-of-precision).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-loss-of-precision.md
   */
  'no-loss-of-precision': ['off'],
  '@typescript-eslint/no-loss-of-precision': ['error'],

  /**
   * ! conflicts with 'no-magic-numbers'
   * Disallow magic numbers (no-magic-numbers).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-magic-numbers.md
   */
  'no-magic-numbers': ['off'],
  '@typescript-eslint/no-magic-numbers': [
    'off',
    {
      ignore: [0, 1, -1],
      enforceConst: true,
      detectObjects: true,
      ignoreArrayIndexes: true,
      ignoreDefaultValues: false,
      ignoreEnums: false,
      ignoreNumericLiteralTypes: false,
      ignoreReadonlyClassProperties: false,
    },
  ],

  /**
   * Disallow the void operator except when used to discard a value (no-meaningless-void-operator).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-meaningless-void-operator.md
   */
  '@typescript-eslint/no-meaningless-void-operator': [
    'error',
    {
      checkNever: true,
    },
  ],

  /**
   * * Recommended Rule
   * Enforce valid definition of new and constructor (no-misused-new).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-misused-new.md
   */
  '@typescript-eslint/no-misused-new': ['error'],

  /**
   * * Recommended Rule
   * Avoid using promises in places not designed to handle them (no-misused-promises).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-misused-promises.md
   */
  '@typescript-eslint/no-misused-promises': [
    'error',
    {
      checksConditionals: true,
      checksVoidReturn: true,
    },
  ],

  /**
   * * Recommended Rule
   * Disallow the use of custom TypeScript modules and namespaces (no-namespace).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-namespace.md
   */
  '@typescript-eslint/no-namespace': [
    'error',
    {
      allowDeclarations: false,
      allowDefinitionFiles: true,
    },
  ],

  /**
   * Disallows using a non-null assertion in the left operand of the nullish coalescing operator (no-non-null-asserted-nullish-coalescing).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-non-null-asserted-nullish-coalescing.md
   */
  '@typescript-eslint/no-non-null-asserted-nullish-coalescing': ['error'],

  /**
   * * Recommended Rule
   * Disallows using a non-null assertion after an optional chain expression (no-non-null-asserted-optional-chain).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-non-null-asserted-optional-chain.md
   */
  '@typescript-eslint/no-non-null-asserted-optional-chain': ['error'],

  /**
   * * Recommended Rule
   * Disallows non-null assertions using the ! postfix operator (no-non-null-assertion).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-non-null-assertion.md
   */
  '@typescript-eslint/no-non-null-assertion': ['error'],

  /**
   * Disallow the use of parameter properties in class constructors (no-parameter-properties).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-parameter-properties.md
   */
  '@typescript-eslint/no-parameter-properties': ['off'],

  /**
   * Disallow variable redeclaration (no-redeclare).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-redeclare.md
   */
  'no-redeclare': ['off'],
  '@typescript-eslint/no-redeclare': [
    'error',
    {
      builtinGlobals: true,
      ignoreDeclarationMerge: false,
    },
  ],

  /**
   * Disallows invocation of require() (no-require-imports).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-require-imports.md
   */
  '@typescript-eslint/no-require-imports': ['error'],

  /**
   * Disallow specified modules when loaded by import (no-restricted-imports).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-restricted-imports.md
   */
  'no-restricted-imports': ['off'],
  '@typescript-eslint/no-restricted-imports': ['off'],

  /**
   * Disallow variable declarations from shadowing variables declared in the outer scope (no-shadow).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-shadow.md
   */
  'no-shadow': ['off'],
  '@typescript-eslint/no-shadow': [
    'error',
    {
      hoist: 'all',
      builtinGlobals: true,
      ignoreTypeValueShadow: false,
      ignoreFunctionTypeParameterNameValueShadow: false,
    },
  ],

  /**
   * * Recommended Rule
   * ! See rule 'consistent-this'
   * Disallow aliasing this (no-this-alias).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-this-alias.md
   */
  '@typescript-eslint/no-this-alias': [
    'error',
    {
      allowDestructuring: true,
    },
  ],

  /**
   * ! conflicts with 'no-throw-literal'
   * Disallow throwing literals as exceptions (no-throw-literal).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-throw-literal.md
   */
  'no-throw-literal': ['off'],
  '@typescript-eslint/no-throw-literal': [
    'error',
    {
      allowThrowingAny: true,
      allowThrowingUnknown: true,
    },
  ],

  /**
   * Disallow the use of type aliases (no-type-alias).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-type-alias.md
   */
  '@typescript-eslint/no-type-alias': [
    'error',
    {
      allowAliases: 'never',
      allowCallbacks: 'always',
      allowConditionalTypes: 'never',
      allowConstructors: 'never',
      allowLiterals: 'never',
      allowMappedTypes: 'never',
      allowTupleTypes: 'always',
      allowGenerics: 'never',
    },
  ],

  /**
   * Flags unnecessary equality comparisons against boolean literals (no-unnecessary-boolean-literal-compare).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unnecessary-boolean-literal-compare.md
   */
  '@typescript-eslint/no-unnecessary-boolean-literal-compare': [
    'error',
    {
      allowComparingNullableBooleansToTrue: true,
      allowComparingNullableBooleansToFalse: true,
    },
  ],

  /**
   * Prevents conditionals where the type is always truthy or always falsy (no-unnecessary-condition).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unnecessary-condition.md
   */
  '@typescript-eslint/no-unnecessary-condition': [
    'error',
    {
      allowConstantLoopConditions: false,
      allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: false,
    },
  ],

  /**
   * Warns when a namespace qualifier is unnecessary (no-unnecessary-qualifier).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unnecessary-qualifier.md
   */
  '@typescript-eslint/no-unnecessary-qualifier': ['error'],

  /**
   * Enforces that type arguments will not be used if not required (no-unnecessary-type-arguments).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unnecessary-type-arguments.md
   */
  '@typescript-eslint/no-unnecessary-type-arguments': ['error'],

  /**
   * * Recommended Rule
   * Warns if a type assertion does not change the type of an expression (no-unnecessary-type-assertion).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unnecessary-type-assertion.md
   */
  '@typescript-eslint/no-unnecessary-type-assertion': ['error'],

  /**
   * * Recommended Rule
   * Disallows unnecessary constraints on generic types (no-unnecessary-type-constraint).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unnecessary-type-constraint.md
   */
  '@typescript-eslint/no-unnecessary-type-constraint': ['error'],

  /**
   * * Recommended Rule
   * Disallows calling a function with an any type value (no-unsafe-argument).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unsafe-argument.md
   */
  '@typescript-eslint/no-unsafe-argument': ['error'],

  /**
   * * Recommended Rule
   * Disallows assigning any to variables and properties (no-unsafe-assignment).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unsafe-assignment.md
   */
  '@typescript-eslint/no-unsafe-assignment': ['error'],

  /**
   * * Recommended Rule
   * Disallows calling an any type value (no-unsafe-call).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unsafe-call.md
   */
  '@typescript-eslint/no-unsafe-call': ['error'],

  /**
   * * Recommended Rule
   * Disallows member access on any typed variables (no-unsafe-member-access).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unsafe-member-access.md
   */
  '@typescript-eslint/no-unsafe-member-access': ['error'],

  /**
   * * Recommended Rule
   * Disallows returning any from a function (no-unsafe-return).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unsafe-return.md
   */
  '@typescript-eslint/no-unsafe-return': ['error'],

  /**
   * ! conflicts with 'no-unused-expressions'
   * Disallow unused expressions (no-unused-expressions).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unused-expressions.md
   */
  'no-unused-expressions': ['off'],
  '@typescript-eslint/no-unused-expressions': [
    'error',
    {
      allowShortCircuit: false,
      allowTernary: false,
      allowTaggedTemplates: false,
      enforceForJSX: false,
    },
  ],

  /**
   * * Recommended Rule
   * ! conflicts with 'no-unused-vars'
   * Disallow unused variables (no-unused-vars).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unused-vars.md
   */
  'no-unused-vars': ['off'],
  '@typescript-eslint/no-unused-vars': [
    'error',
    {
      vars: 'all',
      args: 'after-used',
      caughtErrors: 'all',
      ignoreRestSiblings: true,
    },
  ],

  /**
   * ! conflicts with 'no-use-before-define'
   * Disallow the use of variables before they are defined (no-use-before-define).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-use-before-define.md
   */
  'no-use-before-define': ['off'],
  '@typescript-eslint/no-use-before-define': [
    'error',
    {
      classes: true,
      functions: true,
      variables: true,
      enums: true,
      typedefs: true,
      ignoreTypeReferences: false,
    },
  ],

  /**
   * ! conflicts with 'no-useless-constructor'
   * Disallow unnecessary constructors (no-useless-constructor).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-useless-constructor.md
   */
  'no-useless-constructor': ['off'],
  '@typescript-eslint/no-useless-constructor': ['error'],

  /**
   * * Recommended Rule
   * Disallows the use of require statements except in import statements (no-var-requires).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-var-requires.md
   */
  '@typescript-eslint/no-var-requires': ['error'],

  /**
   * Prefers a non-null assertion over explicit type cast when possible (non-nullable-type-assertion-style).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/non-nullable-type-assertion-style.md
   */
  '@typescript-eslint/non-nullable-type-assertion-style': ['off'],

  /**
   * ! conflicts with 'object-curly-spacing'
   * Enforce consistent spacing inside braces (object-curly-spacing).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/object-curly-spacing.md
   */
  'object-curly-spacing': ['off'],
  '@typescript-eslint/object-curly-spacing': ['error', 'always'],

  /**
   * Require or disallow padding lines between statements (padding-line-between-statements).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/padding-line-between-statements.md
   */
  '@typescript-eslint/padding-line-between-statements': ['off'],

  /**
   * * Recommended Rule
   * Prefer usage of as const over literal type (prefer-as-const).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-as-const.md
   */
  '@typescript-eslint/prefer-as-const': ['error'],

  /**
   * Prefer initializing each enums member value (prefer-enum-initializers).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-enum-initializers.md
   */
  '@typescript-eslint/prefer-enum-initializers': ['error'],

  /**
   * Prefer a ‘for-of’ loop over a standard ‘for’ loop if the index is only used to access the array being iterated (prefer-for-of).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-for-of.md
   */
  '@typescript-eslint/prefer-for-of': ['error'],

  /**
   * Use function types instead of interfaces with call signatures (prefer-function-type).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-function-type.md
   */
  '@typescript-eslint/prefer-function-type': ['error'],

  /**
   * Enforce includes method over indexOf method (prefer-includes).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-includes.md
   */
  '@typescript-eslint/prefer-includes': ['error'],

  /**
   * Require that all enum members be literal values to prevent unintended enum member name shadow issues (prefer-literal-enum-member).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-literal-enum-member.md
   */
  '@typescript-eslint/prefer-literal-enum-member': [
    'error',
    {
      allowBitwiseExpressions: false,
    },
  ],

  /**
   * * Recommended Rule
   * Require the use of the namespace keyword instead of the module keyword to declare custom TypeScript modules (prefer-namespace-keyword).
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-namespace-keyword.md
   */
  '@typescript-eslint/prefer-namespace-keyword': ['error'],

  /**
   * Enforce the usage of the nullish coalescing operator instead of logical chaining.
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-nullish-coalescing.md
   */
  '@typescript-eslint/prefer-nullish-coalescing': [
    'error',
    {
      ignoreConditionalTests: true,
      ignoreMixedLogicalExpressions: true,
    },
  ],

  /**
   * Prefer using concise optional chain expressions instead of chained logical ands.
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-optional-chain.md
   */
  '@typescript-eslint/prefer-optional-chain': ['error'],

  /**
   * Requires that private members are marked as readonly if they're never modified outside of the constructor.
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-readonly.md
   */
  '@typescript-eslint/prefer-readonly': [
    'error',
    {
      onlyInlineLambdas: false,
    },
  ],

  /**
   * Requires that function parameters are typed as readonly to prevent accidental mutation of inputs.
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-readonly-parameter-types.md
   */
  '@typescript-eslint/prefer-readonly-parameter-types': [
    'error',
    {
      checkParameterProperties: true,
      ignoreInferredTypes: false,
      treatMethodsAsReadonly: false,
    },
  ],

  /**
   * Prefer using type parameter when calling Array#reduce instead of casting.
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-reduce-type-parameter.md
   */
  '@typescript-eslint/prefer-reduce-type-parameter': ['error'],

  /**
   * Enforce that RegExp#exec is used instead of String#match if no global flag is provided.
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-regexp-exec.md
   */
  '@typescript-eslint/prefer-regexp-exec': ['error'],

  /**
   * Enforce that this is used when only this type is returned.
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-return-this-type.md
   */
  '@typescript-eslint/prefer-return-this-type': ['error'],

  /**
   * Enforce the use of String#startsWith and String#endsWith instead of other equivalent methods of checking substrings.
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-string-starts-ends-with.md
   */
  '@typescript-eslint/prefer-string-starts-ends-with': ['error'],

  /**
   * Recommends using @ts-expect-error over @ts-ignore.
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-ts-expect-error.md
   */
  '@typescript-eslint/prefer-ts-expect-error': ['error'],

  /**
   * Requires any function or method that returns a Promise to be marked async.
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/promise-function-async.md
   */
  '@typescript-eslint/promise-function-async': [
    'error',
    {
      allowedPromiseNames: ['Thenable'],
      checkArrowFunctions: true,
      checkFunctionDeclarations: true,
      checkFunctionExpressions: true,
      checkMethodDeclarations: true,
    },
  ],

  /**
   * ! conflicts with 'quotes'
   * Enforce the consistent use of either backticks, double, or single quotes.
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/quotes.md
   */
  'quotes': ['off'],
  '@typescript-eslint/quotes': [
    'error',
    'single',
    {
      avoidEscape: true,
      allowTemplateLiterals: false,
    },
  ],

  /**
   * Requires Array#sort calls to always provide a compareFunction.
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/require-array-sort-compare.md
   */
  '@typescript-eslint/require-array-sort-compare': [
    'error',
    {
      ignoreStringArrays: false,
    },
  ],

  /**
   * * Recommended Rule
   * ! conflicts with 'require-await'
   * Disallow async functions which have no await expression.
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/require-await.md
   */
  'require-await': ['off'],
  '@typescript-eslint/require-await': ['off'],

  /**
   * * Recommended Rule
   * When adding two variables, operands must both be of type number or of type string.
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/restrict-plus-operands.md
   */
  '@typescript-eslint/restrict-plus-operands': [
    'error',
    {
      allowAny: false,
      checkCompoundAssignments: true,
    },
  ],

  /**
   * * Recommended Rule
   * Enforce template literal expressions to be of string type.
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/restrict-template-expressions.md
   */
  '@typescript-eslint/restrict-template-expressions': [
    'error',
    {
      allowNumber: true,
      allowBoolean: true,
      allowAny: false,
      allowNullish: false,
      allowRegExp: false,
    },
  ],

  /**
   * ! conflicts with 'return-await'
   * Enforces consistent returning of awaited values.
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/return-await.md
   */
  'no-return-await': ['off'],
  '@typescript-eslint/return-await': ['error', 'in-try-catch'],

  /**
   * ! conflicts with 'semi'
   * Require or disallow semicolons instead of ASI.
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/semi.md
   */
  'semi': ['off'],
  '@typescript-eslint/semi': [
    'error',
    'always',
    {
      omitLastInOneLineBlock: false,
    },
  ],

  /**
   * Enforces that members of a type union/intersection are sorted alphabetically.
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/sort-type-union-intersection-members.md
   */
  '@typescript-eslint/sort-type-union-intersection-members': [
    'error',
    {
      checkIntersections: true,
      checkUnions: true,
      groupOrder: [
        'named',
        'keyword',
        'operator',
        'literal',
        'function',
        'import',
        'conditional',
        'object',
        'tuple',
        'intersection',
        'union',
        'nullish',
      ],
    },
  ],

  /**
   * ! conflicts with 'space-before-function-paren'
   * Enforces consistent spacing before function parenthesis.
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/space-before-function-paren.md
   */
  'space-before-function-paren': ['off'],
  '@typescript-eslint/space-before-function-paren': [
    'error',
    {
      named: 'never',
      anonymous: 'always',
      asyncArrow: 'always',
    },
  ],

  /**
   * ! conflicts with 'space-infix-ops'
   * This rule is aimed at ensuring there are spaces around infix operators.
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/space-infix-ops.md
   */
  'space-infix-ops': ['off'],
  '@typescript-eslint/space-infix-ops': [
    'error',
    {
      int32Hint: false,
    },
  ],

  /**
   * Restricts the types allowed in boolean expressions.
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/strict-boolean-expressions.md
   */
  '@typescript-eslint/strict-boolean-expressions': [
    'error',
    {
      allowString: true,
      allowNumber: true,
      allowNullableObject: true,
      allowNullableBoolean: false,
      allowNullableString: false,
      allowNullableNumber: false,
      allowAny: false,
      allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: false,
    },
  ],

  /**
   * Exhaustiveness checking in switch with union type.
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/switch-exhaustiveness-check.md
   */
  '@typescript-eslint/switch-exhaustiveness-check': ['error'],

  /**
   * * Recommended Rule
   * Sets preference level for triple slash directives versus ES6-style import declarations.
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/triple-slash-reference.md
   */
  '@typescript-eslint/triple-slash-reference': ['error'],

  /**
   * Require consistent spacing around type annotations.
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/type-annotation-spacing.md
   */
  '@typescript-eslint/type-annotation-spacing': [
    'error',
    {
      overrides: {
        colon: {
          before: false,
          after: true,
        },
        arrow: {
          before: true,
          after: true,
        },
      },
    },
  ],

  /**
   * Requires type annotations to exist.
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/typedef.md
   */
  '@typescript-eslint/typedef': [
    'error',
    {
      arrayDestructuring: false,
      arrowParameter: false,
      memberVariableDeclaration: false,
      objectDestructuring: false,
      parameter: false,
      propertyDeclaration: false,
      variableDeclaration: false,
      variableDeclarationIgnoreFunction: false,
    },
  ],

  /**
   * * Recommended Rule
   * Enforces unbound methods are called with their expected scope.
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/unbound-method.md
   */
  '@typescript-eslint/unbound-method': [
    'error',
    {
      ignoreStatic: false,
    },
  ],

  /**
   * Warns for any two overloads that could be unified into one by using a union or an optional/rest parameter.
   * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/unified-signatures.md
   */
  '@typescript-eslint/unified-signatures': ['error'],
};

/** @type {Object.<string, Array>} */
const unicornRules = {
  /**
   * * Recommended Rule
   * Improve regexes by making them shorter, consistent, and safer.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/better-regex.md
   */
  'unicorn/better-regex': [
    'error',
    {
      sortCharacterClasses: true,
    },
  ],

  /**
   * * Recommended Rule
   * Enforce a specific parameter name in catch clauses.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/catch-error-name.md
   */
  'unicorn/catch-error-name': [
    'error',
    {
      name: 'error',
      ignore: ['^e$'],
    },
  ],

  /**
   * * Recommended Rule
   * Use destructured variables over properties.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/consistent-destructuring.md
   */
  'unicorn/consistent-destructuring': ['error'],

  /**
   * * Recommended Rule
   * Move function definitions to the highest possible scope.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/consistent-function-scoping.md
   */
  'unicorn/consistent-function-scoping': [
    'error',
    {
      checkArrowFunctions: true,
    },
  ],

  /**
   * Enforce correct Error subclassing.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/custom-error-definition.md
   */
  'unicorn/custom-error-definition': ['error'],

  /**
   * * Recommended Rule
   * Enforce no spaces between braces.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/empty-brace-spaces.md
   */
  'unicorn/empty-brace-spaces': ['error'],

  /**
   * * Recommended Rule
   * Enforce passing a message value when creating a built-in error.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/error-message.md
   */
  'unicorn/error-message': ['error'],

  /**
   * * Recommended Rule
   * Require escape sequences to use uppercase values.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/escape-case.md
   */
  'unicorn/escape-case': ['error'],

  /**
   * * Recommended Rule
   * Add expiration conditions to TODO comments.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/expiring-todo-comments.md
   */
  'unicorn/expiring-todo-comments': [
    'error',
    {
      allowWarningComments: true,
      ignoreDatesOnPullRequests: true,
    },
  ],

  /**
   * * Recommended Rule
   * Enforce explicitly comparing the length or size property of a value.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/explicit-length-check.md
   */
  'unicorn/explicit-length-check': [
    'error',
    {
      'non-zero': 'not-equal',
    },
  ],

  /**
   * * Recommended Rule
   * Enforce a case style for filenames.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/filename-case.md
   */
  'unicorn/filename-case': [
    'error',
    {
      cases: {
        camelCase: true,
        kebabCase: true,
        snakeCase: false,
        pascalCase: false,
      },
    },
  ],

  /**
   * Enforce importing index files with '.'.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/import-index.md
   */
  'unicorn/import-index': ['error'],

  /**
   * * Recommended Rule
   * Enforce specific import styles per module.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/import-style.md
   */
  'unicorn/import-style': [
    'off',
    {
      checkImport: true,
      checkDynamicImport: true,
      checkExportFrom: false,
      checkRequire: true,
      extendDefaultStyles: true,
      styles: {},
    },
  ],

  /**
   * * Recommended Rule
   * Enforce the use of new for all builtins, except String, Number, Boolean, Symbol and BigInt.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/new-for-builtins.md
   */
  'unicorn/new-for-builtins': ['error'],

  /**
   * * Recommended Rule
   * Enforce specifying rules to disable in eslint-disable comments.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-abusive-eslint-disable.md
   */
  'unicorn/no-abusive-eslint-disable': ['error'],

  /**
   * * Recommended Rule
   * Prevent passing a function reference directly to iterator methods.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-callback-reference.md
   */
  'unicorn/no-array-callback-reference': ['error'],

  /**
   * * Recommended Rule
   * Prefer for…of over Array#forEach(…).
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-for-each.md
   */
  'unicorn/no-array-for-each': ['off'],

  /**
   * * Recommended Rule
   * Disallow using the this argument in array methods.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-method-this-argument.md
   */
  'unicorn/no-array-method-this-argument': ['error'],

  /**
   * * Recommended Rule
   * Enforce combining multiple Array#push() into one call.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-push-push.md
   */
  'unicorn/no-array-push-push': ['error'],

  /**
   * * Recommended Rule
   * Disallow Array#reduce() and Array#reduceRight().
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-reduce.md
   */
  'unicorn/no-array-reduce': [
    'error',
    {
      allowSimpleOperations: true,
    },
  ],

  /**
   * * Recommended Rule
   * Forbid member access from await expression.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-await-expression-member.md
   */
  'unicorn/no-await-expression-member': ['error'],

  /**
   * * Recommended Rule
   * Do not use leading/trailing space between console.log parameters.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-console-spaces.md
   */
  'unicorn/no-console-spaces': ['error'],

  /**
   * * Recommended Rule
   * Do not use document.cookie directly.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-document-cookie.md
   */
  'unicorn/no-document-cookie': ['error'],

  /**
   * * Recommended Rule
   * Disallow empty files.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-empty-file.md
   */
  'unicorn/no-empty-file': ['error'],

  /**
   * * Recommended Rule
   * Do not use a for loop that can be replaced with a for-of loop.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-for-loop.md
   */
  'unicorn/no-for-loop': ['error'],

  /**
   * * Recommended Rule
   * Enforce the use of Unicode escapes instead of hexadecimal escapes.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-hex-escape.md
   */
  'unicorn/no-hex-escape': ['error'],

  /**
   * * Recommended Rule
   * Require Array.isArray() instead of instanceof Array.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-instanceof-array.md
   */
  'unicorn/no-instanceof-array': ['error'],

  /**
   * * Recommended Rule
   * Prevent calling EventTarget#removeEventListener() with the result of an expression.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-invalid-remove-event-listener.md
   */
  'unicorn/no-invalid-remove-event-listener': ['error'],

  /**
   * Disallow identifiers starting with new or class.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-keyword-prefix.md
   */
  'unicorn/no-keyword-prefix': [
    'off',
    {
      onlyCamelCase: false,
      checkProperties: true,
    },
  ],

  /**
   * * Recommended Rule
   * Disallow if statements as the only statement in if blocks without else.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-lonely-if.md
   */
  'unicorn/no-lonely-if': ['error'],

  /**
   * * Recommended Rule
   * ! conflicts with 'no-nested-ternary'
   * Disallow nested ternary expressions.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-nested-ternary.md
   */
  'no-nested-ternary': ['off'],
  'unicorn/no-nested-ternary': ['error'],

  /**
   * * Recommended Rule
   * Disallow new Array().
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-new-array.md
   */
  'unicorn/no-new-array': ['error'],

  /**
   * * Recommended Rule
   * Enforce the use of Buffer.from() and Buffer.alloc() instead of the deprecated new Buffer().
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-new-buffer.md
   */
  'unicorn/no-new-buffer': ['error'],

  /**
   * * Recommended Rule
   * Disallow the use of the null literal.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-null.md
   */
  'unicorn/no-null': [
    'error',
    {
      checkStrictEquality: false,
    },
  ],

  /**
   * * Recommended Rule
   * Disallow the use of objects as default parameters.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-object-as-default-parameter.md
   */
  'unicorn/no-object-as-default-parameter': ['error'],

  /**
   * * Recommended Rule
   * Disallow process.exit().
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-process-exit.md
   */
  'unicorn/no-process-exit': ['error'],

  /**
   * * Recommended Rule
   * Forbid classes that only have static members.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-static-only-class.md
   */
  'unicorn/no-static-only-class': ['error'],

  /**
   * * Recommended Rule
   * Disallow then property.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-thenable.md
   */
  'unicorn/no-thenable': ['error'],

  /**
   * * Recommended Rule
   * Disallow assigning this to a variable.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-this-assignment.md
   */
  'unicorn/no-this-assignment': ['error'],

  /**
   * * Recommended Rule
   * Disallow unreadable array destructuring.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unreadable-array-destructuring.md
   */
  'unicorn/no-unreadable-array-destructuring': ['off'],

  /**
   * Disallow unsafe regular expressions.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unsafe-regex.md
   */
  'unicorn/no-unsafe-regex': ['error'],

  /**
   * Disallow unused object properties.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unused-properties.md
   */
  'unicorn/no-unused-properties': ['error'],

  /**
   * * Recommended Rule
   * Forbid useless fallback when spreading in object literals.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-fallback-in-spread.md
   */
  'unicorn/no-useless-fallback-in-spread': ['error'],

  /**
   * * Recommended Rule
   * Disallow useless array length check.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-length-check.md
   */
  'unicorn/no-useless-length-check': ['error'],

  /**
   * * Recommended Rule
   * Disallow returning/yielding Promise.resolve/reject() in async functions or promise callbacks.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-promise-resolve-reject.md
   */
  'unicorn/no-useless-promise-resolve-reject': ['error'],

  /**
   * * Recommended Rule
   * Disallow unnecessary spread.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-spread.md
   */
  'unicorn/no-useless-spread': ['error'],

  /**
   * * Recommended Rule
   * Disallow useless undefined.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-undefined.md
   */
  'unicorn/no-useless-undefined': [
    'error',
    {
      checkArguments: true,
    },
  ],

  /**
   * * Recommended Rule
   * Disallow number literals with zero fractions or dangling dots.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-zero-fractions.md
   */
  'unicorn/no-zero-fractions': ['error'],

  /**
   * * Recommended Rule
   * Enforce proper case for numeric literals.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/number-literal-case.md
   */
  'unicorn/number-literal-case': ['error'],

  /**
   * * Recommended Rule
   * Enforce the style of numeric separators by correctly grouping digits.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/numeric-separators-style.md
   */
  'unicorn/numeric-separators-style': [
    'error',
    {
      onlyIfContainsSeparator: false,
      hexadecimal: {
        minimumDigits: 0,
        groupLength: 2,
      },
      binary: {
        minimumDigits: 0,
        groupLength: 4,
      },
      octal: {
        minimumDigits: 0,
        groupLength: 4,
      },
      number: {
        minimumDigits: 5,
        groupLength: 3,
      },
    },
  ],

  /**
   * * Recommended Rule
   * Prefer .addEventListener() and .removeEventListener() over on-functions.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-add-event-listener.md
   */
  'unicorn/prefer-add-event-listener': ['error'],

  /**
   * * Recommended Rule
   * Prefer .find(…) over the first element from .filter(…).
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-find.md
   */
  'unicorn/prefer-array-find': ['error'],

  /**
   * * Recommended Rule
   * Prefer Array#flat() over legacy techniques to flatten arrays.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-flat.md
   */
  'unicorn/prefer-array-flat': ['error'],

  /**
   * * Recommended Rule
   * Prefer .flatMap(…) over .map(…).flat().
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-flat-map.md
   */
  'unicorn/prefer-array-flat-map': ['error'],

  /**
   * * Recommended Rule
   * Prefer Array#indexOf() over Array#findIndex() when looking for the index of an item.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-index-of.md
   */
  'unicorn/prefer-array-index-of': ['error'],

  /**
   * * Recommended Rule
   * Prefer .some(…) over .filter(…).length check and .find(…).
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-some.md
   */
  'unicorn/prefer-array-some': ['error'],

  /**
   * Prefer .at() method for index access and String#charAt().
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-at.md
   */
  'unicorn/prefer-at': [
    'error',
    {
      checkAllIndexAccess: true,
    },
  ],

  /**
   * * Recommended Rule
   * Prefer String#codePointAt(…) over String#charCodeAt(…) and String.fromCodePoint(…) over String.fromCharCode(…).
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-code-point.md
   */
  'unicorn/prefer-code-point': ['error'],

  /**
   * * Recommended Rule
   * Prefer Date.now() to get the number of milliseconds since the Unix Epoch.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-date-now.md
   */
  'unicorn/prefer-date-now': ['error'],

  /**
   * * Recommended Rule
   * Prefer default parameters over reassignment.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-default-parameters.md
   */
  'unicorn/prefer-default-parameters': ['error'],

  /**
   * * Recommended Rule
   * Prefer Node#append() over Node#appendChild().
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-dom-node-append.md
   */
  'unicorn/prefer-dom-node-append': ['error'],

  /**
   * * Recommended Rule
   * Prefer using .dataset on DOM elements over calling attribute methods.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-dom-node-dataset.md
   */
  'unicorn/prefer-dom-node-dataset': ['error'],

  /**
   * * Recommended Rule
   * Prefer childNode.remove() over parentNode.removeChild(childNode).
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-dom-node-remove.md
   */
  'unicorn/prefer-dom-node-remove': ['error'],

  /**
   * * Recommended Rule
   * Prefer .textContent over .innerText.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-dom-node-text-content.md
   */
  'unicorn/prefer-dom-node-text-content': ['error'],

  /**
   * * Recommended Rule
   * Prefer export…from when re-exporting.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-export-from.md
   */
  'unicorn/prefer-export-from': [
    'error',
    {
      ignoreUsedVariables: false,
    },
  ],

  /**
   * * Recommended Rule
   * Prefer .includes() over .indexOf() and Array#some() when checking for existence or non-existence.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-includes.md
   */
  'unicorn/prefer-includes': ['error'],

  /**
   * * Recommended Rule
   * Prefer reading a JSON file as a buffer.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-json-parse-buffer.md
   */
  'unicorn/prefer-json-parse-buffer': ['error'],

  /**
   * * Recommended Rule
   * Prefer KeyboardEvent#key over KeyboardEvent#keyCode.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-keyboard-event-key.md
   */
  'unicorn/prefer-keyboard-event-key': ['error'],

  /**
   * * Recommended Rule
   * Enforce the use of Math.trunc instead of bitwise operators.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-math-trunc.md
   */
  'unicorn/prefer-math-trunc': ['error'],

  /**
   * * Recommended Rule
   * Prefer .before() over .insertBefore(), .replaceWith() over .replaceChild(), prefer one of .before(), .after(), .append() or .prepend() over insertAdjacentText() and insertAdjacentElement().
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-modern-dom-apis.md
   */
  'unicorn/prefer-modern-dom-apis': ['error'],

  /**
   * * Recommended Rule
   * Prefer JavaScript modules (ESM) over CommonJS.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-module.md
   */
  'unicorn/prefer-module': ['error'],

  /**
   * * Recommended Rule
   * Prefer negative index over .length - index for {String,Array,TypedArray}#slice(), Array#splice() and Array#at().
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-negative-index.md
   */
  'unicorn/prefer-negative-index': ['error'],

  /**
   * * Recommended Rule
   * Prefer using the node: protocol when importing Node.js builtin modules.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-node-protocol.md
   */
  'unicorn/prefer-node-protocol': [
    'error',
    {
      checkRequire: true,
    },
  ],

  /**
   * * Recommended Rule
   * Prefer Number static properties over global ones.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-number-properties.md
   */
  'unicorn/prefer-number-properties': [
    'error',
    {
      checkInfinity: true,
    },
  ],

  /**
   * * Recommended Rule
   * Prefer using Object.fromEntries(…) to transform a list of key-value pairs into an object.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-object-from-entries.md
   */
  'unicorn/prefer-object-from-entries': ['error'],

  /**
   * * Recommended Rule
   * Prefer omitting the catch binding parameter.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-optional-catch-binding.md
   */
  'unicorn/prefer-optional-catch-binding': ['error'],

  /**
   * * Recommended Rule
   * Prefer borrowing methods from the prototype instead of the instance.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-prototype-methods.md
   */
  'unicorn/prefer-prototype-methods': ['error'],

  /**
   * * Recommended Rule
   * Prefer .querySelector() over .getElementById(), .querySelectorAll() over .getElementsByClassName() and .getElementsByTagName().
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-query-selector.md
   */
  'unicorn/prefer-query-selector': ['error'],

  /**
   * * Recommended Rule
   * Prefer Reflect.apply() over Function#apply().
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-reflect-apply.md
   */
  'unicorn/prefer-reflect-apply': ['error'],

  /**
   * * Recommended Rule
   * Prefer RegExp#test() over String#match() and RegExp#exec().
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-regexp-test.md
   */
  'unicorn/prefer-regexp-test': ['error'],

  /**
   * * Recommended Rule
   * Prefer Set#has() over Array#includes() when checking for existence or non-existence.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-set-has.md
   */
  'unicorn/prefer-set-has': ['error'],

  /**
   * * Recommended Rule
   * Prefer the spread operator over Array.from(…), Array#concat(…), Array#slice() and String#split('').
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-spread.md
   */
  'unicorn/prefer-spread': ['error'],

  /**
   * Prefer String#replaceAll() over regex searches with the global flag.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-string-replace-all.md
   */
  'unicorn/prefer-string-replace-all': ['error'],

  /**
   * * Recommended Rule
   * Prefer String#slice() over String#substr() and String#substring().
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-string-slice.md
   */
  'unicorn/prefer-string-slice': ['error'],

  /**
   * * Recommended Rule
   * Prefer String#startsWith() & String#endsWith() over RegExp#test().
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-string-starts-ends-with.md
   */
  'unicorn/prefer-string-starts-ends-with': ['error'],

  /**
   * * Recommended Rule
   * Prefer String#trimStart() / String#trimEnd() over String#trimLeft() / String#trimRight().
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-string-trim-start-end.md
   */
  'unicorn/prefer-string-trim-start-end': ['error'],

  /**
   * * Recommended Rule
   * Prefer switch over multiple else-if.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-switch.md
   */
  'unicorn/prefer-switch': [
    'error',
    {
      minimumCases: 3,
      emptyDefaultCase: 'no-default-comment',
    },
  ],

  /**
   * * Recommended Rule
   * Prefer ternary expressions over simple if-else statements.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-ternary.md
   */
  'unicorn/prefer-ternary': ['error', 'always'],

  /**
   * Prefer top-level await over top-level promises and async function calls.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-top-level-await.md
   */
  'unicorn/prefer-top-level-await': ['error'],

  /**
   * * Recommended Rule
   * Enforce throwing TypeError in type checking conditions.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-type-error.md
   */
  'unicorn/prefer-type-error': ['error'],

  /**
   * * Recommended Rule
   * Prevent abbreviations.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prevent-abbreviations.md
   */
  'unicorn/prevent-abbreviations': [
    'error',
    {
      checkVariables: true,
      checkProperties: true,
      checkFilenames: true,
      checkShorthandProperties: false,
      checkShorthandImports: true,
      checkDefaultAndNamespaceImports: true,
      extendDefaultAllowList: true,
      extendDefaultReplacements: true,
      allowList: {},
      replacements: {
        e: false,
        i: false,
        j: false,
        db: false,
        env: false,
        args: false,
      },
    },
  ],

  /**
   * * Recommended Rule
   * Enforce consistent relative URL style.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/relative-url-style.md
   */
  'unicorn/relative-url-style': ['error', 'never'],

  /**
   * * Recommended Rule
   * Enforce using the separator argument with Array#join().
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/require-array-join-separator.md
   */
  'unicorn/require-array-join-separator': ['error'],

  /**
   * * Recommended Rule
   * Enforce using the digits argument with Number#toFixed().
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/require-number-to-fixed-digits-argument.md
   */
  'unicorn/require-number-to-fixed-digits-argument': ['error'],

  /**
   * * Recommended Rule
   * Enforce using the targetOrigin argument with window.postMessage().
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/require-post-message-target-origin.md
   */
  'unicorn/require-post-message-target-origin': ['error'],

  /**
   * Enforce better string content.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/string-content.md
   */
  'unicorn/string-content': [
    'error',
    {
      patterns: {
        '\\.\\.\\.': '…',
      },
    },
  ],

  /**
   * * Recommended Rule
   * Fix whitespace-insensitive template indentation.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/template-indent.md
   */
  'unicorn/template-indent': ['warn'],

  /**
   * * Recommended Rule
   * Require new when throwing an error.
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/throw-new-error.md
   */
  'unicorn/throw-new-error': ['error'],
};

/** @type {Object.<string, Array>} */
const prettierRules = {
  // ! disabling conflicting rules
  'array-bracket-newline': ['off'],
  'array-bracket-spacing': ['off'],
  'array-element-newline': ['off'],
  'arrow-parens': ['off'],
  'arrow-spacing': ['off'],
  'block-spacing': ['off'],
  'brace-style': ['off'],
  'comma-dangle': ['off'],
  'comma-spacing': ['off'],
  'comma-style': ['off'],
  'computed-property-spacing': ['off'],
  'dot-location': ['off'],
  'eol-last': ['off'],
  'func-call-spacing': ['off'],
  'function-call-argument-newline': ['off'],
  'function-paren-newline': ['off'],
  'generator-star': ['off'],
  'generator-star-spacing': ['off'],
  'implicit-arrow-linebreak': ['off'],
  'indent': ['off'],
  'jsx-quotes': ['off'],
  'key-spacing': ['off'],
  'keyword-spacing': ['off'],
  'linebreak-style': ['off'],
  'multiline-ternary': ['off'],
  'newline-per-chained-call': ['off'],
  'new-parens': ['off'],
  'no-arrow-condition': ['off'],
  'no-comma-dangle': ['off'],
  'no-extra-parens': ['off'],
  'no-extra-semi': ['off'],
  'no-floating-decimal': ['off'],
  'no-mixed-spaces-and-tabs': ['off'],
  'no-multi-spaces': ['off'],
  'no-multiple-empty-lines': ['off'],
  'no-reserved-keys': ['off'],
  'no-space-before-semi': ['off'],
  'no-trailing-spaces': ['off'],
  'no-whitespace-before-property': ['off'],
  'no-wrap-func': ['off'],
  'nonblock-statement-body-position': ['off'],
  'object-curly-newline': ['off'],
  'object-curly-spacing': ['off'],
  'object-property-newline': ['off'],
  'one-var-declaration-per-line': ['off'],
  'operator-linebreak': ['off'],
  'padded-blocks': ['off'],
  'quote-props': ['off'],
  'rest-spread-spacing': ['off'],
  'semi': ['off'],
  'semi-spacing': ['off'],
  'semi-style': ['off'],
  'space-after-function-name': ['off'],
  'space-after-keywords': ['off'],
  'space-before-blocks': ['off'],
  'space-before-function-paren': ['off'],
  'space-before-function-parentheses': ['off'],
  'space-before-keywords': ['off'],
  'space-in-brackets': ['off'],
  'space-in-parens': ['off'],
  'space-infix-ops': ['off'],
  'space-return-throw-case': ['off'],
  'space-unary-ops': ['off'],
  'space-unary-word-ops': ['off'],
  'switch-colon-spacing': ['off'],
  'template-curly-spacing': ['off'],
  'template-tag-spacing': ['off'],
  'unicode-bom': ['off'],
  'wrap-iife': ['off'],
  'wrap-regex': ['off'],
  'yield-star-spacing': ['off'],
  '@babel/object-curly-spacing': ['off'],
  '@babel/semi': ['off'],
  '@typescript-eslint/brace-style': ['off'],
  '@typescript-eslint/comma-dangle': ['off'],
  '@typescript-eslint/comma-spacing': ['off'],
  '@typescript-eslint/func-call-spacing': ['off'],
  '@typescript-eslint/indent': ['off'],
  '@typescript-eslint/keyword-spacing': ['off'],
  '@typescript-eslint/member-delimiter-style': ['off'],
  '@typescript-eslint/no-extra-parens': ['off'],
  '@typescript-eslint/no-extra-semi': ['off'],
  '@typescript-eslint/object-curly-spacing': ['off'],
  '@typescript-eslint/semi': ['off'],
  '@typescript-eslint/space-before-function-paren': ['off'],
  '@typescript-eslint/space-infix-ops': ['off'],
  '@typescript-eslint/type-annotation-spacing': ['off'],
  'babel/object-curly-spacing': ['off'],
  'babel/semi': ['off'],
  'flowtype/boolean-style': ['off'],
  'flowtype/delimiter-dangle': ['off'],
  'flowtype/generic-spacing': ['off'],
  'flowtype/object-type-curly-spacing': ['off'],
  'flowtype/object-type-delimiter': ['off'],
  'flowtype/quotes': ['off'],
  'flowtype/semi': ['off'],
  'flowtype/space-after-type-colon': ['off'],
  'flowtype/space-before-generic-bracket': ['off'],
  'flowtype/space-before-type-colon': ['off'],
  'flowtype/union-intersection-spacing': ['off'],
  'react/jsx-child-element-spacing': ['off'],
  'react/jsx-closing-bracket-location': ['off'],
  'react/jsx-closing-tag-location': ['off'],
  'react/jsx-curly-newline': ['off'],
  'react/jsx-curly-spacing': ['off'],
  'react/jsx-equals-spacing': ['off'],
  'react/jsx-first-prop-new-line': ['off'],
  'react/jsx-indent': ['off'],
  'react/jsx-indent-props': ['off'],
  'react/jsx-max-props-per-line': ['off'],
  'react/jsx-newline': ['off'],
  'react/jsx-one-expression-per-line': ['off'],
  'react/jsx-props-no-multi-spaces': ['off'],
  'react/jsx-tag-spacing': ['off'],
  'react/jsx-wrap-multilines': ['off'],
  'standard/array-bracket-even-spacing': ['off'],
  'standard/computed-property-even-spacing': ['off'],
  'standard/object-curly-even-spacing': ['off'],
  'unicorn/empty-brace-spaces': ['off'],
  'unicorn/no-nested-ternary': ['off'],
  'unicorn/number-literal-case': ['off'],
  'vue/array-bracket-newline': ['off'],
  'vue/array-bracket-spacing': ['off'],
  'vue/arrow-spacing': ['off'],
  'vue/block-spacing': ['off'],
  'vue/block-tag-newline': ['off'],
  'vue/brace-style': ['off'],
  'vue/comma-dangle': ['off'],
  'vue/comma-spacing': ['off'],
  'vue/comma-style': ['off'],
  'vue/dot-location': ['off'],
  'vue/func-call-spacing': ['off'],
  'vue/html-closing-bracket-newline': ['off'],
  'vue/html-closing-bracket-spacing': ['off'],
  'vue/html-end-tags': ['off'],
  'vue/html-indent': ['off'],
  'vue/html-quotes': ['off'],
  'vue/key-spacing': ['off'],
  'vue/keyword-spacing': ['off'],
  'vue/max-attributes-per-line': ['off'],
  'vue/multiline-html-element-content-newline': ['off'],
  'vue/mustache-interpolation-spacing': ['off'],
  'vue/no-extra-parens': ['off'],
  'vue/no-multi-spaces': ['off'],
  'vue/no-spaces-around-equal-signs-in-attribute': ['off'],
  'vue/object-curly-newline': ['off'],
  'vue/object-curly-spacing': ['off'],
  'vue/object-property-newline': ['off'],
  'vue/operator-linebreak': ['off'],
  'vue/script-indent': ['off'],
  'vue/singleline-html-element-content-newline': ['off'],
  'vue/space-in-parens': ['off'],
  'vue/space-infix-ops': ['off'],
  'vue/space-unary-ops': ['off'],
  'vue/template-curly-spacing': ['off'],

  // the following rules can be carefully enabled
  'curly': 0,
  // 'lines-around-comment': 0,
  'max-len': 0,
  'no-confusing-arrow': 0,
  'no-mixed-operators': 0,
  'no-tabs': 0,
  'no-unexpected-multiline': 0,
  // 'quotes': 0,
  '@typescript-eslint/quotes': 0,
  'babel/quotes': 0,
  'vue/html-self-closing': 0,
  'vue/max-len': 0,

  // * enable prettier rule
  'prettier/prettier': ['error', prettierConfig],
};

// #endregion Rules Section

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  plugins: [
    // ! No plugins here
  ],
  extends: [
    // ! No extends here
  ],
  rules: {
    // ! No rules here
  },
  settings: {},
  overrides: [
    {
      // JavaScript
      files: ['*.js', '*.cjs', '*.mjs'],
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: false,
          globalReturn: true,
          impliedStrict: true,
        },
      },
      env: {
        node: true,
        browser: true,
        es2021: true,
      },
      plugins: ['unicorn', 'prettier'],
      extends: [],
      rules: {
        // include the default eslint rules
        ...defaultRules,
        // include unicorn rules
        ...unicornRules,
        // include prettier rules (needs to be last)
        ...prettierRules,
      },
    },
    {
      // TypeScript
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: false,
          globalReturn: true,
          impliedStrict: true,
        },
        project: ['./tsconfig.json'],
      },
      env: {
        node: true,
        browser: true,
      },
      plugins: ['@typescript-eslint', 'unicorn', 'prettier'],
      extends: [],
      rules: {
        // include the default eslint rules
        ...defaultRules,
        // include typescript rules
        ...typescriptRules,
        // include unicorn rules
        ...unicornRules,
        // include prettier rules (needs to be last)
        ...prettierRules,
      },
    },
  ],
};
