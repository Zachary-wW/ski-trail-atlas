# 富龙来源登记

更新：2026-09-28。

这份文档只记录当前仍会影响产品判断的来源层级和使用边界。具体坐标、
分段和用户修正见[校准契约](fulong-reference-calibration.md)与
[描摹验收记录](../trace-pilot-review.md)；不要在这里复制几何数据。

## 来源层级

| 层级 | 来源 | 可支持的判断 |
| --- | --- | --- |
| A | 富龙官方渠道、当季公告和运营通知 | 当季开放、关闭、设施变更和官方命名 |
| B | 政府/文旅机构材料 | 雪场身份、建设规模和有日期的升级信息 |
| C | 崇礼滑雪、Skiresort、Skimap 等专业或商业地图 | 名称、相对结构和索道交叉核对；不能单独证明当前运营 |
| D | OpenStreetMap/OpenSkiMap、用户照片和视频 | 地理 sanity check 与现场外观线索；必须保留对象/发布日期 |

当前候选描摹的主要结构参考是用户提供的高清全图。公开商业全景和索道
目录用于交叉检查，不替代用户确认或官方当季证据。

## 使用规则

- 把地图、参数表、开雪公告和视频视为不同季节/范围的 `SourceSnapshot`；
  不把 33 条参数记录、39 条建成雪道和某一日开放清单合并成一个数量。
- 每个用户可见字段都要保留来源、季节和验证状态；冲突、缺失和过期值要
  明确显示。
- 运营公告只更新 `OperatingSnapshot`，不能重写 `Trail Catalog`。
- 公开可访问不等于允许复制。高清原图和官方视觉资产仅作本地参考，除非
 另有明确授权，不进入生产构建或发布包。
- 用户修正可以作为候选结构变更记录，但“去年开放”“可能取消”等报告在
 取得独立当季来源前仍标为 user-reported。

## 现有参考链接

- [崇礼滑雪富龙参数与全景](https://www.chonglihuaxue.cn/info.asp?id=167)
- [Skiresort 富龙雪道图](https://www.skiresort.com/en/ski-resort/fulong/trail-map/)
- [Skiresort 富龙索道目录](https://www.skiresort.info/ski-resort/fulong/ski-lifts/)
- [Skimap 富龙历史档案](https://skimap.org/skiareas/view/13871)
- [OpenSkiMap 项目说明](https://wiki.openstreetmap.org/wiki/OpenSkiMap)

链接用于研究和交叉核对，不代表其内容已被当前雪季验证。
