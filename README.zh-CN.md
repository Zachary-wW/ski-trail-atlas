# Ski Trail Atlas / 滑雪雪道图鉴

[English](README.md) | **简体中文**

以富龙为首个样板的雪场网页 MVP：完整、忠于参考图结构的雪道图，
逐道文字与视频，以及在同一张图上的路线规划。

## 实际完成到哪里

目前 `/` 页面仍是**旧原型，不是完整 MVP**：有 33 条来源参数记录、搜索、
参数详情、双语界面和示意路线；逐道文字、审核后视频和正式富龙路线图
仍未完成。

`/?prototype=fulong-trace` 是开发环境专用的富龙全图描摹工作台：使用用户
提供的 3631 × 2560 WEBP 原始坐标，支持原图、叠加校准和独立线稿复核，
绘图与交互共用候选分段。用户已确认当前雪道整体结构可进入内容 MVP 阶段；
方向、证据和发布状态仍需显式管理，候选几何尚不等于生产路线图。

[当前范围与验收门槛](docs/mvp-rebuild.md) 是执行入口；[未来交付路线图](docs/mvp-roadmap.md)
记录后续阶段；[描摹验收记录](docs/trace-pilot-review.md) 记录用户修正和回归证据。

## 本地运行

使用 Node.js 24（见 `.nvmrc`）：

```bash
nvm use
npm ci
npm run dev
```

旧原型地址：`http://127.0.0.1:4173/`。

将用户提供的高清 WEBP 放入 `artifacts/reference/fulong-highres.webp`，然后：

```bash
npm run dev:trace
```

样板地址：`http://127.0.0.1:4173/?prototype=fulong-trace`。
旧地址 `?prototype=east-trace` 仍可用于东侧对照。
若开发服务器已经启动，直接打开该地址即可。

高清图存放于 Git 忽略目录，仅由开发服务器提供。新的高清图和样板代码
均不进入生产构建。详见[原图与校准说明](docs/research/fulong-reference-calibration.md)。

## 验证

```bash
npm run typecheck
npm test
npm run test:e2e
npm run build
```

现有测试保护旧功能，**不代表雪道结构已与原图一致，也不代表实际可通行**。

## 目录

- `src/`：旧原型应用。
- `src/map/prototype/`：开发环境专用描摹样板。
- `docs/mvp-rebuild.md`：当前 MVP 范围与人工验收关口。
- `docs/mvp-roadmap.md`：描摹基线之后的分阶段交付计划。
- `docs/trace-pilot-review.md`：用户修正与回归证据。
- `docs/adr/`：长期决策，含取代关系。
- `docs/research/`：来源登记、校准和库存边界说明。
- `prototypes/design-directions/`：保留的旧视觉探索，不再复制到发布目录。

推送 `main` 会触发 GitHub Pages 部署；本地样板未更新线上网站。
生产目录现存 JPG 属于旧版本遗留资产，下一次地图发布前仍需统一其使用
政策；新高清图的提供不被自动视为公开发布许可。
