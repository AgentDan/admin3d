import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      middlewareMode: "html", // Принудительно проверяет файлы
      '/api/': 'http://localhost:5000',
    }
  },
})
