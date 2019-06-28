module.exports = {
  root: true,
  extends: 'semistandard',
  rules: {
    'prefer-const': 'error',
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'never'
    }]
  },
  overrides: [{
    files: ['**/*.ts'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended'
    ],
    rules: {
      '@typescript-eslint/indent': ['error', 2]
    }
  }]
};
