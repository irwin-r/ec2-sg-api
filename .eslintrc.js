const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
);

module.exports = {
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  env: { mocha: true, node: true },

  rules: {
    'prettier/prettier': ['error', prettierOptions],
  }
};
