import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // 👇 GANTI INI SESUAI NAMA REPO GITHUB KAMU
  base: '/project_valentine/', 
  plugins: [
    react(),
    tailwindcss(),
  ],
})