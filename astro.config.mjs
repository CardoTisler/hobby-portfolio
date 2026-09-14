import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  redirects: {
    // Post was renamed; keep the old URL alive.
    '/woodworking/debate-cups': '/woodworking/debate-trophies',
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ['localhost', '.trycloudflare.com'],
    },
  },
});
