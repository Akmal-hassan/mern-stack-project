import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    server: {
      port: 5173,
      open: false,
      proxy: {
        '/api': {
          target: env.BACKEND_URL || 'http://127.0.0.1:5000',
          changeOrigin: true,
          secure: false
        },
        '/uploads': {
          target: env.BACKEND_URL || 'http://127.0.0.1:5000',
          changeOrigin: true,
          secure: false
        }
      }
    }
  }
})
