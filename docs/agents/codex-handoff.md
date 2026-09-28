# 当前交接

更新：2026-09-28。

## 入口

先读 [当前 MVP 范围](../mvp-rebuild.md)。修改领域概念时再读
`CONTEXT.md` 和相关 ADR；修改描摹几何时读
[描摹验收记录](../trace-pilot-review.md)。

生产入口：

`/ski-trail-atlas/`

本地增强校准工作台：

`/?prototype=fulong-trace`

关键实现：

- `src/map/prototype/fulong-trace-data.ts`：富龙候选分段、节点和交通设施；
- `src/map/prototype/FulongTracePrototype.tsx`：共用地图交互；`published` 区分线稿首页与本地校准；
- `docs/research/fulong-reference-calibration.md`：原图身份与坐标契约；
- `docs/mvp-roadmap.md`：后续阶段和退出条件。

## 当前状态

用户已确认雪道整体结构可进入内容 MVP。Pages 根路径现在发布原创线稿版；
当前候选数据仍有 65 个分段，
其中 51 个不进入有向路线；这表示“候选结构可继续开发”，不表示生产地图
或通行方向已经核验。

下一项工作是冻结当前基线、定义发布数据契约，并为 B10/B11/B12/B13/B15
制作第一条详情内容纵切。不要恢复旧的本地 ticket 顺序，也不要把旧原型的
33 条记录当作新全图的边界。

## 验证

```bash
npm run typecheck
npm run test:content
npm run test:e2e
npm run build
```

开发原图放在 gitignored 的
`artifacts/reference/fulong-highres.webp`，不进入生产构建或发布资产。
