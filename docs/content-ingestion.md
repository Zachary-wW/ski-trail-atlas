# 资讯采集、审核与发布契约

更新：2026-09-28。

这份文档定义未来“小红书 / 微信公众号 / 官方渠道资讯整合”的边界。
它不是当前 Pages MVP 的实现要求，也不授权绕过平台规则、登录限制或版权
限制。

## 内容生命周期

```text
Source Channel
  → Collection Run
  → Candidate Information Item
  → Deduplicate / Scope / Rights checks
  → Editorial Review
  → Published Resort Feed
  → Stale / Retracted
```

采集只产生候选内容。任何自动抓取结果都必须经过来源、雪场归属、季节、
发布时间和使用边界检查，才能进入用户可见的 Resort Feed。

## 统一内容记录

每条 `Information Item` 至少应包含：

- `id`：稳定 ID；
- `resortId`：归属雪场；
- `title`：原始标题或编辑标题；
- `summary`：短摘要，必须可追溯到来源；
- `sourceChannel`：official_site、official_wechat、xiaohongshu、
  government、commercial、community 等；
- `publisher`：账号、机构或网站；
- `sourceUrl`：原始链接；
- `publishedAt` / `observedAt`：来源时间和采集时间；
- `season`：适用雪季；
- `topic`：operations、trail、lift、event、lesson、price、weather、
  transport、community 或 other；
- `editorialState`：candidate、needs_review、published、rejected、
  stale、retracted；
- `verificationState`：verified、unverified、stale、conflicting、
  link_only 或 missing；
- `permittedUse`：reference_only、link_only、excerpt_allowed、
  permission_granted 或 open_license；
- `contentHash`：用于去重，不代表内容真实性；
- `reviewNotes`：审核和冲突说明。

## 展示规则

- `reference_only`：可展示标题、来源、日期和原文链接；不复制正文和媒体；
- `link_only`：只提供外链和来源说明；
- `excerpt_allowed`：只展示在许可范围内的短摘录；
- `permission_granted` / `open_license`：仍需保留来源和原始链接；
- 缺少来源或发布时间的内容不得伪装成当日资讯；
- 用户报告和社区内容必须显式标为社区/用户来源；
- 过期内容进入历史或 stale 状态，不应继续显示为“今日”；
- 冲突内容并列保留，直到编辑者作出发布决定。

## 采集策略

第一阶段优先级：

1. 官方雪场网站、公告和官方公众号；
2. 政府、文旅机构和交通公告；
3. 商业地图和专业雪场目录，用于交叉核对；
4. 小红书、社区文章和视频，用作线索或现场语境。

小红书与微信公众号不应默认作为稳定、无限制的后台抓取源。若平台没有
明确授权或可用接口，产品应优先保存人工提供的公开链接和最小元数据，再由
编辑者决定是否纳入。不得为了自动化而绕过验证码、登录限制、访问控制或
平台技术措施。

## Collection Run 最小记录

每次运行至少记录：

- `runId`、开始/结束时间；
- 目标 Source Channels；
- 运行器版本和规则版本；
- 发现、去重、拒绝、待审核和发布数量；
- 失败原因和需要人工处理的链接；
- 本次运行是否改变用户可见发布快照。

采集失败不应清空已有 Resort Feed。发布采用新快照替换或增量更新，并
保留可回滚版本。

## 与地图和路线的关系

资讯不能直接改写 `Trail Catalog`、`TrailLocation` 或路线图：

- “某条雪道开放”先生成 Operating Snapshot；
- “某条线在原图上存在”需要地图证据和几何审核；
- “某条线适合某水平”需要独立字段来源；
- 社交媒体中的路线描述只能作为候选 Claim，不能自动变成有向边。

## 必须补上的测试

- 同一 URL、同一内容和跨平台转述的去重；
- 来源缺失、发布时间缺失和跨雪季内容；
- reference_only 内容不会把正文或媒体打包进生产构建；
- stale / retracted 内容不会显示为今日资讯；
- 采集失败不会覆盖上一版发布快照；
- 冲突内容保留来源并显示冲突状态；
- Web 与未来小程序读取同一发布数据，而不是各自抓取。
