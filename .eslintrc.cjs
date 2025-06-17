
module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true, // ✅ Tells ESLint you're using Jest for testing
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 'off',
     'react/prop-types': 'off',
       'no-unused-vars': 'off',
    'no-extra-semi': 'off',
    'react/no-unescaped-entities': 'off',
  },
  settings: {
    react: {
      version: 'detect', // ✅ Tells plugin which React version to use
    },
  },
};

