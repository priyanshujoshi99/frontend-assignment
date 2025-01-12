import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api':
        'https://tubular-trifle-d57961.netlify.app/.netlify/functions/proxy'
    },
    watch: {
      usePolling: true
    }
  }
});
