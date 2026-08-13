import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

server: {
  proxy: {
    '/login': 'http://localhost:3000',
    '/register': 'http://localhost:3000',
    '/session': 'http://localhost:3000',
    '/logout': 'http://localhost:3000',
    '/events': 'http://localhost:3000',
    '/tasks': 'http://localhost:3000',
    '/deadlines': 'http://localhost:3000',
    '/schedule': 'http://localhost:3000',
  },
}
})