# Ski Trail Atlas / 滑雪雪道图鉴

[English](README.md) | **简体中文**

以富龙为首个样板的雪场信息整合平台：先交付地图优先的网页 MVP，逐步加入
逐道文字、视频、路线规划和按来源审核的每日资讯；未来可评估微信小程序。

## 实际完成到哪里

GitHub Pages 根路径现在展示富龙结构版 MVP：包含全图线稿、分区查看、雪道
选择、交通设施和有条件的路线演示。逐道文字、审核后视频和正式富龙路线图
仍未完成。

长期产品愿景、客户端边界和内容采集规则见
[平台愿景](docs/platform-vision.md) 与 [资讯采集契约](docs/content-ingestion.md)。

本地 `/?prototype=fulong-trace` 额外提供基于高清 WEBP 的原图/叠加校准；
生产页和本地工作台共用同一批候选分段，但只有本地工作台加载私有高清原图。
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

开发环境仍保留旧详情页：`http://127.0.0.1:4173/`。

将用户提供的高清 WEBP 放入 `artifacts/reference/fulong-highres.webp`，然后：

```bash
npm run dev:trace
```

样板地址：`http://127.0.0.1:4173/?prototype=fulong-trace`。
旧地址 `?prototype=east-trace` 仍可用于东侧对照。
若开发服务器已经启动，直接打开该地址即可。

高清图存放于 Git 忽略目录，仅由开发服务器提供。生产构建只发布原创线稿，
不包含高清原图。详见[原图与校准说明](docs/research/fulong-reference-calibration.md)。

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
- `src/map/prototype/`：当前共用的富龙地图实现；原图校准控件仅开发环境启用。
- `docs/mvp-rebuild.md`：当前 MVP 范围与人工验收关口。
- `docs/mvp-roadmap.md`：描摹基线之后的分阶段交付计划。
- `docs/trace-pilot-review.md`：用户修正与回归证据。
- `docs/adr/`：长期决策，含取代关系。
- `docs/research/`：来源登记、校准和库存边界说明。
- `prototypes/design-directions/`：保留的旧视觉探索，不再复制到发布目录。

推送 `main` 会触发 GitHub Pages 部署；根路径发布富龙结构版 MVP，旧详情
直链仍保留作回归兼容。生产目录现存 JPG 属于旧版本遗留资产，使用政策与
新线稿分开处理；新高清图的提供不被自动视为公开发布许可。
