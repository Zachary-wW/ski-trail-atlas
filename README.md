# 富龙雪道图鉴

一个以证据为先的富龙滑雪场雪道查询网站。首个版本帮助雪友按雪道查看坡度、长度、宽度、海拔、难度、视频与来源；全景图会在后续阶段基于公开或官方雪道图进行结构化原创重绘，而不是直接复制原图。

## 当前状态

Ticket 01 已完成首条真实雪道的纵向切片：A1「蓝调」从版本化 JSON 经过 Zod 校验和 Claim 编译，进入 React 详情页。页面展示可用参数、明确的缺失值、适用雪季、核验状态和来源快照。

目前不是完整雪道目录，也不提供实时开放状态、GPS 导航、安全判断或个性化推荐。

## 本地运行

需要 Node.js 24（仓库包含 `.nvmrc`）。

```bash
nvm use
npm install
npm run dev
```

开发服务器默认位于 `http://127.0.0.1:4173`，A1 详情可直接通过 `/trails/fulong-a1` 打开。

## 验证命令

```bash
npm run typecheck
npm test
npm run test:e2e
npm run build
```

端到端测试使用本机 Google Chrome。内容测试会阻止以下数据进入发布层：

- 重复的 Source Snapshot、Trail 或 Claim 标识符；
- 指向不存在 Trail 或 Source Snapshot 的 Claim；
- 同一雪道字段存在尚未解决的多条 Claim；
- 不符合版本化 schema 的日期、枚举或字段。

## 证据边界

`src/data/fulong-v1.json` 保存研究输入：Trail、不可变 Source Snapshot 和字段级 Claim。`compilePublication` 在构建时生成页面可消费的 Published Field，并保留每个字段的来源和核验状态。

当前 A1 参数来自公开页面「崇礼富龙滑雪场雪道参数及雪道总览图」，许可边界记录为 `reference_only`。网站只发布文字参数和外链，不打包或重新发布该站雪道图。最大坡度没有可靠来源，因此显示“暂无数据”，不会自行推算。
