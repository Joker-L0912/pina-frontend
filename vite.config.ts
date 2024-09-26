import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    }
  },
  server: {
    port: 6678,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8099/',
        changeOrigin: true,
        rewrite: path => path.replace(new RegExp(`^/api`), ''),
      }
    }
  }
})
  