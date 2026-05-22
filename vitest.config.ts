import path from 'path'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

// Doc: https://vitest.dev/config/ -> https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '~': path.resolve(__dirname, './'),
    },
  },
  test: {
    globals: true,
    coverage: {
      provider: 'istanbul',
      include: ['composables/**', 'utils/**'],
    },
    environment: 'happy-dom',
  },
})
