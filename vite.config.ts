import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://raw.githubusercontent.com', // GitHub's base URL
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '') // Remove '/api' prefix when making requests
      }
    },
    watch: {
      usePolling: true
    }
  }
});
