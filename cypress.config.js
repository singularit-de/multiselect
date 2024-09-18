import {defineConfig} from 'cypress'

export default defineConfig({
  projectId: '7fev1t',
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
  },
})
