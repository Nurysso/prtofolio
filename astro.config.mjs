import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://dawood.page',
  integrations: [sitemap()],
  markdown: {
    // Monochrome code blocks: token colors come from --astro-code-* in global.css
    shikiConfig: { theme: 'css-variables' },
  },
  vite: {
    // Plain CSS, no PostCSS plugins. Inline config also stops Vite from picking up stray postcss.config files.
    css: { postcss: {} },
  },
});
