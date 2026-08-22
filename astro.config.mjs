// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.otta.me',
  base: '/lp/senior-free',
  devToolbar: { enabled: false },
  vite: {
    plugins: [tailwindcss()],
  },
});
