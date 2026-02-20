import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: '/parchment/',
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
  },
});
