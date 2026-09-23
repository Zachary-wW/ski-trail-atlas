# Ski Trail Atlas / 滑雪雪道图鉴

[English](README.md) | **简体中文**

一个以证据为先的富龙滑雪场雪道查询网站。当前版本支持浏览和搜索一组有代表性的富龙雪道，通过稳定直链打开雪道详情，并查看来源报告的难度、坡度、长度、宽度、海拔、核验状态和证据来源。

产品长期设计并不限制在富龙。当前 Panorama Map 使用原创 SVG 和带证据来源的相对 Trail Location，而不是重新发布来源雪道图；现阶段 5 条代表雪道的几何位置仍明确标记为未验证、不可用于导航。

## 在线页面

GitHub Pages：<https://zachary-ww.github.io/ski-trail-atlas/>

网站默认使用英文展示，可在页面内切换为简体中文。来源中的雪道原名和来源标题保留原始语言，不擅自翻译证据数据。

## 当前状态

Ticket 01–03 已完成：

- 第一条真实雪道已完成从版本化 JSON、Zod 校验、Claim 编译到 React 页面展示的完整纵向切片；
- Trail Catalog 已包含 5 条不同难度和完整度状态的代表性富龙雪道；
- 支持按雪道名称和编号搜索；
- 每条已发布雪道拥有稳定直链，例如 `/trails/fulong-a1`；
- 缺失数据明确显示为空缺，不做推算或补全。
- 已加入交互式 SVG Panorama Map，与雪道选择同步，支持指针/键盘缩放和平移，并展示拓扑证据与非导航提示。

当前**不提供**实时开放状态、GPS 导航、安全判断或个性化推荐。

## 本地运行

需要 Node.js 24（仓库包含 `.nvmrc`）。

```bash
nvm use
npm install
npm run dev
```

开发服务器默认运行于 `http://127.0.0.1:4173`。

## 验证命令

```bash
npm run typecheck
npm test
npm run test:e2e
npm run build
```

内容校验会阻止重复的 Source Snapshot、Trail 或 Claim 标识符，指向不存在 Trail / Source Snapshot 的 Claim，同一字段尚未解决的多条 Claim，以及不符合版本化 schema 的值进入发布层。

## 证据边界

`src/data/fulong-v1.json` 保存研究输入：Trail、不可变 Source Snapshot 和字段级 Claim。`compilePublication` 在构建时生成浏览器可消费的 Published Field，同时保留来源和核验状态。

当前参数来自公开页面「崇礼富龙滑雪场雪道参数及雪道总览图」，许可边界记录为 `reference_only`。网站仅发布文字参数和外链，不打包或重新发布该来源的雪道图；没有可靠来源的值保持缺失，不自行推算。

## 部署

每次 push 到 `main` 后，`.github/workflows/deploy-pages.yml` 会将 Vite production build 自动部署到 GitHub Pages。production build 使用 `/ski-trail-atlas/` base path，并通过轻量 `404.html` fallback 保留 GitHub Pages 上的 SPA 雪道稳定直链。
