module.exports = {
  root: true,
  env: {
    es6: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  extends: ["airbnb"],
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
  },
  rules: {
    // No semicolons
    semi: ["error", "never"],
    'no-restricted-imports': ['error', 'never']
  },
};
