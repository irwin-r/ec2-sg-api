const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
);

module.exports = {
  extends: ['airbnb-base', 'prettier', 'plugin:node/recommended'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },

  env: {
    commonjs: true,
    mocha: true,
    node: true,
  },

  rules: {
    'prettier/prettier': ['error', prettierOptions],
  },

  overrides: [{
    files: "**/*.test.js",
    rules: {
      "node/no-unpublished-require": 0,
      "node/no-missing-require": 0
    }
  }]
};
