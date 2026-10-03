import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import netlifyPlugin from "@netlify/vite-plugin-react-router";
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [reactRouter(), tailwindcss(), netlifyPlugin()],
});