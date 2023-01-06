module.exports = {
  env: {
    es2021: true,
    browser: true,
    commonjs: true
  },
  extends: ['airbnb', 'prettier', 'plugin:prettier/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    indent: 0,
    'no-var': 1,
    radix: 'off',
    'no-console': 1,
    'no-void': 'off',
    'no-else-return': 1,
    semi: [1, 'always'],
    'space-unary-ops': 2,
    'no-plusplus': 'off',
    'no-unused-vars': 'off',
    'no-cond-assign': 'off',
    'react/prop-types': 'off',
    'no-restricted-syntax': 'off',
    'import/no-unresolved': 'off',
    'no-extra-boolean-cast': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/prefer-default-export': 'off',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'no-empty': [
      'error',
      {
        allowEmptyCatch: true
      }
    ]
  }
};
