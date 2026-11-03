import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { EULIX_SITE } from './src/data/site.js';

export default defineConfig({
  site: 'https://nurysso.github.io',
  integrations: [sitemap()],
  redirects: {
    '/eulix': EULIX_SITE,
  },
  markdown: {
    // Monochrome code blocks: token colors come from --astro-code-* in global.css
    shikiConfig: { theme: 'css-variables' },
  },
  vite: {
    // Plain CSS, no PostCSS plugins. Inline config also stops Vite from picking up stray postcss.config files.
    css: { postcss: {} },
  },
});
