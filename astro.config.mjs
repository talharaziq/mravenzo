import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://pawpawdecors.com',
  output: 'static',
  trailingSlash: 'always',
  compressHTML: true,
});
