import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Doc: https://vitest.dev/config/ -> https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    coverage: {
      provider: 'istanbul',
    },
    environment: 'happy-dom',
    alias: {
      '~': path.resolve(__dirname, '/'),
    },
  },
})
