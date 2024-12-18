import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {},
  },
  server: {
    proxy: {
      '/url': {
        target: 'https://0e82c1fb-ecf2-4ac8-82dc-7946dcb29424-00-32f1u9qhvz94.pike.replit.dev/',
        changeOrigin: true,
      },
    },
  }
})