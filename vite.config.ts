import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/.netlify/functions/proxy': {
        target: 'https://raw.githubusercontent.com', // GitHub's base URL
        changeOrigin: true,
        secure: false,
        rewrite: (path) => {
          // Remove the '/.netlify/functions/proxy' prefix and rewrite the path
          return path.replace(/^\/\.netlify\/functions\/proxy/, '');
        }
      }
    },
    watch: {
      usePolling: true
    }
  }
});
