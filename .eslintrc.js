module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['@singularit/eslint-config-vue', 'plugin:storybook/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
}
