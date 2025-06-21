import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/claude-business-dashboard/',
  build: {
    outDir: 'dist',
  },
})