import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://ohrkawk-ojs.github.io',
  outDir: './site-dist',
  integrations: [mdx()],
  markdown: {
    shikiConfig: { theme: 'github-dark' }
  }
});
