<!-- 版本：v1.2.0 ｜ 更新时间：2026-07-22 22:10 (UTC+8) ｜ 说明：Git 连接章节具体化到 wangan0214/Fan 仓库，补充 gh auth login 推送认证与 Cloudflare Pages 连接分步指引，强调上线前必须修改 astro.config.mjs 的 site 域名 -->

# 帆哥个人主页（Astro 静态站）

复刻 [zarazhang.com](https://zarazhang.com) 那种**衬线优雅的写作型个人站**，但用 Astro 自建：
零月费、数据完全自主、秒开、可一键部署到 Vercel / Cloudflare Pages / GitHub Pages。

> zarazhang.com 本身用的是 **WordPress.com 托管 + Ixion 主题 + Jetpack 字体**（见下方“技术对比”）。
> 这个仓库是它的**自建替代方案**：视觉一致，但站点归你自己。

## 技术栈

- [Astro](https://astro.build) v5（静态输出，无后端、无数据库）
- 字体：Vollkorn（标题）+ Gentium Book Basic（正文），Google Fonts 加载
- 内容：Markdown 文章放在 `src/content/blog/`，用 Astro Content Collections 管理
- RSS：`/rss.xml`；站点地图：`/sitemap-index.xml`

## 本地开发

```bash
npm install
npm run dev      # 本地预览 http://localhost:4321
npm run build    # 生成静态文件到 dist/
npm run preview  # 预览构建结果
```

## 换成你自己的内容

1. **改站点名 / 标语 / 介绍**：编辑 `src/layouts/BaseLayout.astro`（站点标题）和
   `src/pages/index.astro`（hero 标语、简介）、`src/pages/about.astro`（关于页）。
2. **写文章**：在 `src/content/blog/` 里新建 `.md` 文件，frontmatter 示例：

   ```markdown
   ---
   title: 文章标题
   date: 2026-07-21
   description: 一句话摘要（用于 SEO / RSS）
   tags: ["标签1", "标签2"]
   draft: false
   ---
   正文用 Markdown 写……
   ```

3. **改域名**：编辑 `astro.config.mjs` 里的 `site` 字段（影响 RSS / sitemap 绝对链接）。

## 部署（推荐：Cloudflare Pages，境外托管·免 ICP 备案）

Cloudflare Pages 服务器在**境外**，所以**不需要 ICP 备案**；自带全球 CDN，国内访问相对最稳。本站是纯静态输出（`output: 'static'`），**无需任何 Astro adapter**，直接部署即可。

### 方式一：Git 连接（推荐，本仓库已配好 remote）

> 前提：本仓库 git 已初始化，`origin` 已指向 `https://github.com/wangan0214/Fan.git`，首次提交在 `main` 分支。你只需做「登录 GitHub → 推送 → 连 Cloudflare → 绑域名」四步。

**第 1 步 · GitHub 推送认证（仅第一次，之后免密）**

本机已装 GitHub CLI（`gh`）。在终端运行：

```bash
gh auth login
```

按屏幕提示（第一次配置照选即可）：
- `What account do you want to log into?` → 选 **GitHub.com**
- `How would you like to authenticate?` → 选 **Login with a web browser**（弹 GitHub 网页点 Authorize）或 **Paste an authentication token**（粘 PAT）
- 若选 Token：去 GitHub → Settings → Developer settings → Personal access tokens 生成一个带 `repo` 权限的 token 粘过来。

登录后 `gh` 自动帮 git 配好凭据，以后 `git push` 不再输密码。

**第 2 步 · 推送代码**

```bash
cd /Users/fanshuai/Documents/搞钱集中营/personal-homepage
git push -u origin main
```

`-u` 仅第一次需要，之后直接 `git push`。成功后去 GitHub 看 `wangan0214/Fan` 已有代码。

**第 3 步 · 连 Cloudflare Pages（推送即自动部署）**

1. [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**。
2. 授权 Cloudflare 访问 GitHub，选中 `wangan0214/Fan` 仓库。
3. 构建配置（关键三项）：Framework preset 选 **Astro**；Build command `npm run build`；Build output directory `dist`。
4. **Save and Deploy**，约 1–2 分钟，得到 `*.pages.dev` 临时域名（先验证效果）。

**第 4 步 · 绑自己的域名（上线前必做）**

> ⚠️ 上线前必须把 `astro.config.mjs` 的 `site` 改成真实域名，否则 RSS / sitemap 绝对链接错误。改完 `git push` 即可自动重新部署（Cloudflare 监听到 push 会自动重建）。

1. Pages 项目 → **Custom domains** → 输入域名（如 `fanshuai.com`）。
2. 按提示把域名 DNS 托管到 Cloudflare（改 NS 为 Cloudflare 给的两条），或在现有 DNS 加 CNAME 指向 `xxx.pages.dev`。
3. DNS 生效后域名直接可访问，**免备案**（服务器在境外）。

### 方式二：Wrangler CLI 直接部署（不用 Git）

```bash
npm run build
npx wrangler pages deploy dist
```

首次运行会让你在浏览器里登录 Cloudflare 账号（需要你本人授权）。`wrangler.toml` 已配好项目名 `fanshuai-homepage` 与输出目录 `dist`。

> 无论哪种方式，正式上线前都要把 `astro.config.mjs` 的 `site` 设为你自己的域名。

### 其它平台（备选）

- **Vercel**：`npm i -g vercel` 后 `vercel`，或后台导入 Git 选 Astro preset。
- **GitHub Pages**：`npm run build` 把 `dist/` 推到 `gh-pages` 分支并开启 Pages；注意 `site` / `base` 匹配仓库路径。

## 技术对比：zarazhang.com vs 本仓库

| 维度 | zarazhang.com | 本仓库 |
|---|---|---|
| 托管 | WordPress.com（付费托管·需备案才能绑国内域） | Cloudflare Pages（境外·免备案·免费起步） |
| 程序 | WordPress | Astro（静态） |
| 主题 | Ixion（官方主题） | 自建衬线布局 |
| 字体 | Jetpack 自定义字体 | Google Fonts 同款衬线 |
| 数据归属 | 在 WP.com 平台 | 完全自主，纯文件 |
| 月费 | 约 ¥35/月起 | ¥0（流量超大才计费） |
| 扩展方式 | 装插件 / 换主题 | 改代码 / 加页面 |

想要“像 Zara 一样但属于自己”，这套就是答案。
