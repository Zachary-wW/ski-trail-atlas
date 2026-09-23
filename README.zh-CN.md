# Ski Trail Atlas / 滑雪雪道图鉴

[English](README.md) | **简体中文**

一个以证据为先的富龙滑雪场交互式雪道图鉴。当前版本覆盖现行参数来源列出的 33 条雪道，支持搜索与稳定直链，并展示来源报告的难度、坡度、长度、宽度、海拔、核验状态和证据来源。

产品长期设计并不限制在富龙。当前 Panorama Map 以公开来源全景图作为视觉布局基准，并叠加带证据来源的 SVG 点击、高亮与路线几何；交互几何仍明确标记为未验证、不可用于 GPS 或雪场导航。

## 在线页面

GitHub Pages：<https://zachary-ww.github.io/ski-trail-atlas/>

网站默认使用英文展示，可在页面内切换为简体中文。来源中的雪道原名和来源标题保留原始语言，不擅自翻译证据数据。

## 当前状态

当前 map-first 版本包括：

- 33 条来源参数表中的富龙雪道，并由版本化研究行生成字段级 Claim；
- 保留来源原始难度分类，包括初中级、雪地公园和中高级雪道；
- 支持按名称/编号搜索、稳定雪道直链，以及选择雪道后的地图自动聚焦；
- 一张与来源全景图布局对齐的 Panorama Map，在原图布局上叠加 33 条可交互 Trail Location 与主要 L1/L2/L3/L5/L7 Uphill Transport；
- Trail、Transport Station 与 Place endpoint 均经过 Map Node 与证据边界校验；
- Route Planner 基于有向下行 Trail edge 与带类型的 Uphill Transport edge；不支持的连接明确返回无路线而不是猜测；
- 缺失参数保持缺失，并持续展示雪季、证据状态和非导航提示。

Route Plan 仅是雪季范围内的结构示意，不是 GPS 导航，也不反映雪道/索道实时开放状态或安全条件。当前不提供基于个人能力的路线推荐。

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

`src/data/fulong-v1.ts` 保存版本化研究输入：33 条来源参数行、Trail、不可变 Source Snapshot、字段级 Claim 与证据支持的拓扑图。`compilePublication` 在构建时生成浏览器可消费的 Published Field，同时保留来源和核验状态。

当前参数与 Panorama 布局来自公开页面「崇礼富龙滑雪场雪道参数及雪道总览图」，许可边界仍记录为 `reference_only`。当前 fidelity 版本包含一层与来源全景图对齐的视觉参考底图，并在其上单独叠加 SVG 点击区域、选中高亮、路线高亮和证据状态；没有可靠来源的值保持缺失，不自行推算，交互几何也不声称达到 GPS 或测绘精度。

## 部署

每次 push 到 `main` 后，`.github/workflows/deploy-pages.yml` 会将 Vite production build 自动部署到 GitHub Pages。production build 使用 `/ski-trail-atlas/` base path，并通过轻量 `404.html` fallback 保留 GitHub Pages 上的 SPA 雪道稳定直链。
