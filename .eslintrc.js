// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 2017
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: [
    'standard',
    'plugin:flowtype/recommended',
    'plugin:vue/recommended'
  ],
  // required to lint *.vue files
  plugins: [
    'html',
    'flowtype-errors',
    'flowtype'
  ],
  // add your custom rules here
  'rules': {
    'flowtype/define-flow-type': 1,
    // allow paren-less arrow functions
    'arrow-parens': 0,
    'semi': ["error", "always"],
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
