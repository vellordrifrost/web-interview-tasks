import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), tsconfigPaths(), svgr()],
    build: {
      sourcemap: true,
    },
    server: {
      port: 3000,
      proxy: {
        '/api-proxy': {
          target: 'https://superheroapi.com/api',
          rewrite: (path) => path.replace(/^\/api-proxy/, ''),
          changeOrigin: true,
          cookieDomainRewrite: '',
          followRedirects: true,
        },
      },
    },
    preview: {
      port: 3000,
    },
  };
});
