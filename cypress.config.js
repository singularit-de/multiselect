const { defineConfig } = require('cypress')

module.exports = defineConfig({
    projectId: "7fev1t",
    component: {
        devServer: {
            framework: 'vue',
            bundler: 'vite',
        },
    },
})
