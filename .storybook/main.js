module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  "framework": "@storybook/vue3",
  "core": {
    "builder": "@storybook/builder-vite"
  },
  "features": {
    "storyStoreV7": true
  },
  viteFinal: (config, { configType }) => {
    // some configs
    if (configType === 'PRODUCTION') {
      config.base = '/multiselect/';
    }
    return config
  },
  managerHead: (head, { configType }) => {
    if (configType === 'PRODUCTION') {
      return (`
        ${head}
        <base href="/multiselect/">
      `);
    }
  },
}