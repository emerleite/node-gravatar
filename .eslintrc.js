module.exports = {
  extends: 'semistandard',
  rules: {
    'prefer-const': 'error',
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'never'
    }]
  }
};
