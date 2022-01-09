module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  extends: ["airbnb-base", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module"
  },
  plugins: ["@typescript-eslint", "prettier"],
  ignorePatterns: ["node_modules/*", ".out/*", "!.prettierrc.js", "public/*", "build/*"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        tabWidth: 2,
        useTabs: false,
        semi: true,
        singleQuote: false,
        jsxSingleQuote: false,
        bracketSpacing: true,
        jsxBracketSameLine: true,
        arrowParens: "avoid",
        trailingComma: "none",
        printWidth: 160,
        endOfLine: "crlf"
      }
    ],
    "linebreak-style": "off",
    "max-len": ["error", { code: 160, tabWidth: 2 }],
    "comma-dangle": "off",
    quotes: ["error", "double"],
    "operator-linebreak": "off",
    "import/prefer-default-export": "off",
    "import/no-unresolved": "off",
    "arrow-body-style": "off",
    "prefer-promise-reject-errors": "off",
    "arrow-parens": "off",
    "consistent-return": "error",
    "object-shorthand": "error",
    "import/extensions": "off",
    "global-require": "error",
    "implicit-arrow-linebreak": "off",
    "import/no-extraneous-dependencies": "error",
    "no-param-reassign": "error", // error
    "no-unused-vars": "error", // error
    "no-throw-literal": "error", // error
    "new-cap": "off",
    "no-await-in-loop": "off",
    "no-return-await": "off",
    "no-underscore-dangle": "off",
    "prefer-destructuring": "off",
    "import/first": "error",
    "import/order": "error",
    "import/newline-after-import": "off",
    "no-restricted-syntax": "error",
    "no-nested-ternary": "error",
    "space-before-function-paren": "error", // error
    "lines-between-class-members": "off",
    camelcase: "off",
    "object-curly-newline": "off",
    "no-continue": "error",
    "operator-assignment": "error",
    "guard-for-in": "off",
    "no-plusplus": "off",
    indent: "off", // error
    "no-unreachable": "error",
    "no-unused-expressions": "off",
    "no-new-object": "error", // Memory Leakage when using new. Simply use Object.assign or {}.
    "prefer-template": "error", // String concatination
    "no-useless-catch": "error",
    "spaced-comment": "error",
    "dot-notation": "off",
    "no-empty": "error",
    "no-shadow": "error",
    "no-buffer-constructor": "error", // error
    "class-methods-use-this": "error",
    "no-use-before-define": "error",
    "no-unneeded-ternary": "error", // Use fallback operator ||
    "no-tabs": "off",
    "no-return-assign": "error", // Assignment inside return ?
    "array-callback-return": "error",
    "max-classes-per-file": "off"
  }
};
