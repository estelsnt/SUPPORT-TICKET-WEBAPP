import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import config from '../config.json'

// https://vitejs.dev/config/
export default defineConfig({
  base: config.FRONTEND_BASE_URL,
  plugins: [react()],
})
