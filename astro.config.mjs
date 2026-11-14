// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://rafaelmendesdeveloper.github.io',
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
  build: {
    // CSS pequeno vai inline no <head>: evita um request bloqueante.
    inlineStylesheets: 'always',
  },
});
