// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 纯静态输出（output: 'static'）→ Cloudflare Pages / Vercel / GitHub Pages 通用，无需任何 adapter
// 上线前把下面 site 改成你的正式域名（影响 RSS / sitemap 的绝对链接）
export default defineConfig({
  site: 'https://your-domain.example.com',
  integrations: [sitemap()],
});
