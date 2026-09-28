// Full-map visual review, NOT the production publication.
// Newly traced geometry uses native WEBP pixels, independently of the legacy map.
// User corrections may join gaps in the old illustration. Structural connectivity
// is undirected for inspection; it does not authorize reverse/downhill routing.
import {
  nodes as eastNodes,
  segments as eastSegments,
  trails as eastTrails,
  transports as eastTransports,
} from "./east-trace-data";

export type Frame = { x: number; y: number; width: number; height: number };
export const reference = {
  width: 3631, height: 2560,
  url: "/__reference/fulong-highres.webp",
  frame: { x: 80, y: 65, width: 3480, height: 1740 },
};
export const sectors = {
  all: { name: "全图", frame: reference.frame },
  summit: { name: "山顶", frame: { x: 1390, y: 150, width: 1150, height: 610 } },
  central: { name: "中央 / 公园", frame: { x: 1300, y: 500, width: 1150, height: 860 } },
  annotation: { name: "B10 / B11 局部", frame: { x: 1720, y: 380, width: 800, height: 610 } },
  west: { name: "西侧 L3", frame: { x: 340, y: 370, width: 1480, height: 1020 } },
  east: { name: "东侧 B 区", frame: { x: 1920, y: 350, width: 1210, height: 1030 } },
  beginner: { name: "初学区", frame: { x: 1900, y: 1020, width: 1050, height: 350 } },
} satisfies Record<string, { name: string; frame: Frame }>;
export type SectorId = keyof typeof sectors;
export type Point = { x: number; y: number };
export type NodeId = string;
export const nodes: Record<NodeId, Point & { name: string }> = {
  ...eastNodes,
  summit: { x: 1960, y: 205, name: "山顶（图示位置）" },
  ridge: { ...eastNodes.ridge, name: "岚山餐厅 / 东侧上部交叉口" },
  c1RestaurantFork: { x: 2084, y: 302, name: "C1 / 岚山餐厅连接道分岔" },
  c1c2Merge: { x: 2070, y: 353, name: "C1 / C2 图示汇合" },
  c3UpperEnd: { x: 1818, y: 590, name: "C3 / C5 / C13 图示交汇" },
  c5Upper: { x: 1758, y: 330, name: "C7 / C5 分岔" },
  ridgeWestFork: { x: 1696, y: 363, name: "西侧山脊分岔" },
  l3Top: { x: 1494, y: 455, name: "西侧 C7/C8/C9/C10/C12 交叉口（非 L3 终点）" },
  l5Mid: { x: 2005, y: 553, name: "L5 中途站 · 可下客" },
  c6c8Merge: { x: 1710, y: 552, name: "C6 / C8 图示汇合" },
  c6End: { x: 1732, y: 640, name: "C6 下端交叉口" },
  centralHub: { x: 1797, y: 728, name: "L2 上站 / D1·D2·A9·A10 汇合口" },
  c9End: { x: 1421, y: 766, name: "C9 下端 / 西侧绿道交叉口" },
  westUpperJunction: { x: 975, y: 944, name: "C10 下端 / 西侧交叉口" },
  westMidJunction: { x: 702, y: 1114, name: "西侧下部交叉口" },
  l3Base: { x: 469, y: 1246, name: "L3 下站附近" },
  d1End: { x: 535, y: 1283, name: "D1 下端（换乘待核验）" },
  westOuterFork: { x: 1140, y: 650, name: "C11 / C12 分岔" },
  b15Fork: { x: 1979, y: 611, name: "B15 / B13 分岔" },
  b15End: { x: 1843, y: 656, name: "B15 / B11 / L2 连接道汇合" },
  b13End: { x: 1977, y: 794, name: "B13 / B11 汇合" },
  b12Top: { x: 2030, y: 582, name: "B12 / B15 分岔" },
  b12End: { x: 2161, y: 853, name: "B12 下端 / B11 交汇" },
  b11Upper: { x: 2012, y: 819, name: "B11 弯道（与 A7/A8 房屋隔断）" },
  a7a8Fork: { x: 1918, y: 820, name: "L2 来路 / A7·A8 分岔（不接 B11）" },
  a7End: { x: 1963, y: 1248, name: "A7 下端" },
  a8End: { x: 1905, y: 1240, name: "A8 下端" },
  a9End: { x: 1672, y: 1268, name: "A9 公园出口" },
  a10End: { x: 1528, y: 1268, name: "A10 公园出口" },
  a6Top: { x: 2067, y: 1098, name: "A6 上端" },
  a6End: { x: 2026, y: 1260, name: "A6 下端" },
  a5Top: { x: 2112, y: 1098, name: "A5 上端" },
  a5End: { x: 2086, y: 1260, name: "A5 下端" },
  a3Top: { x: 2272, y: 1098, name: "A3 上端" },
  a3End: { x: 2257, y: 1260, name: "A3 下端" },
  a2Top: { x: 2727, y: 1114, name: "A2 上端" },
  a1a2Join: { x: 2764, y: 1222, name: "A1 / A2 图示相邻位置" },
  a1End: { x: 2771, y: 1260, name: "A1 下端" },
};

// User observations supersede historical illustration status in this local draft,
// not in the published resort data. "Last year" was reported on 2026-09-24;
// no exact opening day or operating season has been established.
export const userCorrections = {
  reportedAt: "2026-09-24",
  openedTrails: ["C11", "C12"],
  possiblyRemovedTransports: ["F8", "F9"],
  note: "用户补充：C11/C12 于 2025 年已开放（具体雪季待核验）；F8/F9 可能取消。非实时运营公告。",
};

export type Segment = {
  id: string;
  trail: string | null;
  from: NodeId;
  to: NodeId;
  bends: string;
  direction?: "pending";
  featureCode?: string;
  state?: "planned" | "map-only";
  note?: string;
};
const draft = (
  id: string, trail: string | null, from: NodeId, to: NodeId, bends: string, note?: string,
): Segment => ({ id, trail, from, to, bends, direction: "pending", note });

export const segments: Segment[] = [
  ...eastSegments.map((segment): Segment => {
    if (segment.id === "b8-2") return {
      ...segment, id: "b8-b7-link", trail: null, direction: "pending",
      note: "用户标注右侧灰色连接道：连接 B8/B9 与 B7 汇合口，不属于 B8。",
    };
    return {
      ...segment,
      note: segment.note ?? (segment.trail ? undefined : "原有东侧未编号连接，仅用于候选连接演示。"),
    };
  }),
  draft("c1-upper", "C1", "summit", "c1RestaurantFork",
    "C 1997 231 2076 260 2084 302",
    "用户确认左侧孤立短线不是雪道，已移除；保留 C1 至 C2 的主线。"),
  draft("c1-lower", "C1", "c1RestaurantFork", "c1c2Merge",
    "Q 2090 328 2074 348"),
  draft("c1-restaurant-link", null, "c1RestaurantFork", "ridge",
    "C 2182 325 2316 390 2431 415",
    "用户确认 E1 下方现有雪道连接 C1 与岚山餐厅；编号及通行方向待核验，不属于 E1 规划线。"),
  draft("c2-lower", "C2", "c1c2Merge", "central",
    "C 2051 398 2039 437 2034 476 Q 2030 491 2031 505"),
  draft("c3-summit", "C3", "summit", "c3UpperEnd",
    "C 1942 280 1955 339 1938 399 C 1921 471 1864 540 1828 578",
    "原图山顶与西侧绿道都标注 C3。此处保留两处图示，不推断为连续可滑行的一条路线。"),
  draft("c5-main", "C5", "c5Upper", "c3UpperEnd",
    "C 1770 389 1787 468 1797 517 Q 1808 557 1816 583",
    "用户确认 C5 与 C7 相接；起点与 C7 分段共享节点。"),
  draft("c7-upper", "C7", "summit", "c5Upper",
    "C 1897 246 1819 293 1758 330"),
  draft("c7-fork", "C7", "c5Upper", "ridgeWestFork",
    "Q 1723 347 1696 363"),
  draft("c7-lower", "C7", "ridgeWestFork", "l3Top",
    "C 1639 393 1556 430 1502 452"),
  draft("c6-upper", "C6", "ridgeWestFork", "c6c8Merge",
    "C 1687 418 1671 463 1694 514 Q 1700 531 1708 547"),
  draft("c6-lower", "C6", "c6c8Merge", "c6End",
    "C 1717 580 1728 611 1732 633"),
  draft("c8-main", "C8", "l3Top", "c6c8Merge",
    "C 1540 487 1640 515 1698 548"),
  draft("c9-main", "C9", "l3Top", "c9End",
    "C 1475 499 1488 541 1491 575 C 1505 634 1465 692 1436 739 Q 1425 754 1422 761"),
  draft("c10-main", "C10", "l3Top", "westUpperJunction",
    "C 1420 501 1380 552 1339 624 C 1282 730 1219 813 1113 881 Q 1037 924 986 940"),
  draft("c3-west-entry", "C3", "c3UpperEnd", "c6End",
    "C 1788 611 1755 628 1736 638",
    "C3 与 C6 的交叉处显式拆分为共享节点。"),
  draft("c3-west-upper", "C3", "c6End", "c9End",
    "C 1694 671 1652 692 1614 706 Q 1495 748 1430 764",
    "这里是原图绿色 C3，与山顶同编号图示的关系尚未核实。"),
  draft("c3-west-middle", "C3", "c9End", "westUpperJunction",
    "C 1299 822 1113 908 985 941"),
  draft("c3-west-lower", "C3", "westUpperJunction", "westMidJunction",
    "C 876 985 782 1055 711 1107"),
  draft("west-base-link", null, "westMidJunction", "l3Base",
    "C 626 1149 516 1212 477 1241",
    "西侧绿色连接保留为未编号通道，不直接合并进 C3。"),
  draft("d1-main", "D1", "centralHub", "d1End",
    "Q 1753 753 1715 780 C 1595 850 1420 933 1216 1037 C 1000 1145 716 1212 577 1260 Q 549 1271 538 1280",
    "用户确认 D1、D2、A9、A10 共用 L2 上站汇合口；修复原图标注断口。"),
  draft("d2-main", "D2", "centralHub", "westMidJunction",
    "Q 1750 741 1690 760 C 1550 831 1367 907 1190 975 C 1018 1043 829 1094 716 1112"),
  draft("c6-central-link", null, "c6End", "centralHub",
    "C 1764 663 1784 692 1795 720",
    "图示可见延续线，具体归属和通行方向待核验。"),
  draft("b15-entry", "B15", "b12Top", "b15Fork",
    "Q 2005 594 1984 608", "用户红线：B12 分出 B15，随后分出 B13。"),
  draft("b15-main", "B15", "b15Fork", "b15End",
    "C 1936 628 1897 638 1852 653"),
  draft("b13-main", "B13", "b15Fork", "b13End",
    "C 1944 654 1942 684 1956 713 Q 1970 750 1977 794"),
  draft("b12-entry", "B12", "central", "b12Top",
    "C 2015 524 2013 547 2024 568 Q 2029 575 2030 579",
    "用户红线：B10 下端接 B12 上段，不再作为未编号连接。"),
  draft("b12-main", "B12", "b12Top", "b12End",
    "C 2021 678 2059 744 2094 790 Q 2135 831 2154 848"),
  draft("b12-lower", "B12", "b12End", "westLower",
    "C 2204 890 2248 906 2271 914",
    "用户红线：B11 汇入后的黑道延续段；不属于 B11。"),
  draft("b11-l2-link", null, "b15End", "centralHub",
    "C 1817 659 1812 686 1805 710",
    "用户标注左侧灰色连接道：B11 回弯口连接 L2 上站。"),
  draft("l2-a8-link", null, "centralHub", "a7a8Fork",
    "Q 1828 744 1856 778 Q 1885 800 1918 820",
    "用户红线：从 L2 下方斜向右下接 A7/A8 共同起点；房屋隔断，不直接连接 B11。"),
  draft("b11-loop-entry", "B11", "central", "b15End",
    "C 1985 545 1843 603 1843 656",
    "用户绿线：B10 下端向左下绕行，在 B15 末端进入回弯。"),
  draft("b11-loop-middle", "B11", "b15End", "b13End",
    "C 1843 684 1926 760 1977 794",
    "用户绿线：左侧回弯后向右下延伸，接收 B13。"),
  draft("b11-loop-exit", "B11", "b13End", "b11Upper",
    "C 1989 802 2000 813 2012 819"),
  draft("b11-upper", "B11", "b11Upper", "b12End",
    "C 2036 831 2107 847 2161 853",
    "B11 在此汇入 B12；用户绿色标注在汇合口结束。"),
  draft("central-lower-link", null, "westLower", "teaching",
    "C 2334 968 2409 1041 2457 1093 Q 2510 1141 2545 1189",
    "用户确认原 F8/F9 旁通道通向初级教学区；接入现有教学区节点。"),
  draft("a7-main", "A7", "a7a8Fork", "a7End",
    "C 1975 847 2028 895 2033 959 C 2038 1012 2011 1075 1996 1137 Q 1979 1209 1963 1248",
    "按高清原图与用户红线校准：右支向右绕弯再下行，与上方 B11 隔断。"),
  draft("a8-main", "A8", "a7a8Fork", "a8End",
    "C 1923 861 1916 909 1918 957 C 1921 1050 1916 1160 1906 1230",
    "按高清原图与用户红线校准：左支基本直落；与 A7 共用独立起点，不接 B11。"),
  draft("a9-main", "A9", "centralHub", "a9End",
    "C 1791 763 1786 787 1770 804 C 1722 855 1679 874 1685 950 C 1692 1049 1687 1166 1674 1257"),
  draft("a10-main", "A10", "centralHub", "a10End",
    "C 1780 772 1740 805 1704 823 C 1580 885 1485 910 1472 981 C 1463 1061 1510 1185 1527 1258"),
  draft("a6-main", "A6", "a6Top", "a6End", "C 2052 1141 2034 1210 2028 1250"),
  draft("a5-main", "A5", "a5Top", "a5End", "C 2104 1147 2093 1212 2088 1250"),
  draft("a3-main", "A3", "a3Top", "a3End", "C 2265 1141 2258 1210 2257 1250"),
  draft("a2-main", "A2", "a2Top", "a1a2Join", "C 2744 1143 2754 1186 2761 1214"),
  draft("a1-main", "A1", "a1a2Join", "a1End", "Q 2767 1240 2770 1253"),
  draft("c11-main", "C11", "westOuterFork", "westMidJunction",
    "C 1022 731 873 838 789 936 Q 711 1030 702 1103", userCorrections.note),
  draft("c12-upper", "C12", "l3Top", "westOuterFork",
    "C 1388 487 1227 565 1148 642", userCorrections.note),
  draft("c12-lower", "C12", "westOuterFork", "l3Base",
    "C 1010 690 773 786 640 950 C 540 1071 492 1187 472 1237", userCorrections.note),
  { ...draft("c13-upper", null, "central", "c3UpperEnd",
    "C 1971 530 1886 571 1829 587"), featureCode: "C13", state: "map-only" },
  { ...draft("e1-planned", null, "summit", "ridge",
    "C 2076 272 2287 353 2427 413"), featureCode: "E1", state: "planned" },
];

export type MapMark = {
  code: string;
  label: Point | null;
  sector: SectorId;
  review: "accepted" | "pending";
  note?: string;
  state?: "planned" | "map-only" | "unlocated" | "open-reported";
};
const mark = (code: string, x: number, y: number, sector: SectorId, note?: string): MapMark =>
  ({ code, label: { x, y }, sector, review: "pending", note });
export const trails: MapMark[] = [
  ...eastTrails.map((trail): MapMark => ({ ...trail, sector: "east", review: "accepted" })),
  mark("C1", 2090, 291, "summit"),
  mark("C2", 2090, 412, "summit"),
  mark("C3", 1930, 317, "summit", "原图重复编号：山顶黑色线路与西侧绿色线路均标 C3。本组仅关联可见编号，不推断全程连通。"),
  mark("C5", 1770, 423, "summit"), mark("C6", 1675, 466, "summit"),
  mark("C7", 1685, 354, "summit"), mark("C8", 1601, 501, "summit"),
  mark("C9", 1470, 612, "west"), mark("C10", 1220, 664, "west"),
  { ...mark("C11", 844, 842, "west", userCorrections.note), state: "open-reported" },
  { ...mark("C12", 700, 795, "west", userCorrections.note), state: "open-reported" },
  mark("D1", 1140, 1070, "west"), mark("D2", 1200, 939, "west"),
  mark("B11", 2040, 815, "central", "按用户绿色标注：从 B10 下端左绕，经 B15、B13 汇合，至 B12 汇合口结束。"),
  mark("B12", 2074, 688, "central", "按用户红色黑道标注，包含 B11 汇入后的下段；通行方向仍待核验。"),
  mark("B13", 1922, 679, "central"), mark("B15", 1898, 632, "central"),
  mark("A7", 2033, 1020, "central"), mark("A8", 1914, 1020, "central"),
  mark("A9", 1685, 1017, "central"), mark("A10", 1465, 1017, "central"),
  mark("A6", 2045, 1175, "beginner"), mark("A5", 2095, 1175, "beginner"),
  mark("A3", 2265, 1175, "beginner"), mark("A2", 2732, 1150, "beginner"),
  mark("A1", 2780, 1260, "beginner"),
];
export const referenceFeatures: MapMark[] = [
  { ...mark("E1", 2253, 340, "summit"), state: "planned" },
  { ...mark("C13", 1895, 570, "central"), state: "map-only" },
  { code: "B16", label: null, sector: "all", review: "pending", state: "unlocated",
    note: "只在原图下方 MOGUL 图例中出现，未找到可确认的线路位置；不猜测位置或添加路线。" },
];
export const repeatedLabels = [{ code: "C3", label: { x: 1270, y: 829 }, sector: "west" as const }];

export type Transport = {
  code: string; path: string; bottom: Point | null; top: Point | null;
  label: Point; mode: "cable" | "magic_carpet"; note?: string;
  intermediateStations?: { nodeId: NodeId; name: string; alighting: boolean }[];
};
export const transports: Transport[] = [
  { ...eastTransports[0], label: { x: 2431, y: 815 }, mode: "cable" },
  { code: "L7", path: "M 3555 650 C 3210 588 2778 503 2465 407 L 1960 205",
    top: nodes.summit, bottom: null, label: { x: 2620, y: 445 }, mode: "cable",
    note: "用户确认 L7 与 L3/L5 汇合山顶；另一端延伸至原图边缘，不猜测下站位置。" },
  { code: "L3", path: "M 469 1246 L 1494 455 L 1960 205",
    bottom: { x: 469, y: 1246 }, top: nodes.summit,
    label: { x: 985, y: 843 }, mode: "cable" },
  { code: "L2", path: "M 1813 1298 L 1809 1025 L 1797 728",
    bottom: { x: 1813, y: 1298 }, top: nodes.centralHub,
    label: { x: 1810, y: 923 }, mode: "cable" },
  { code: "L5", path: "M 1981 1294 C 2010 1000 2005 740 2005 553 C 2005 390 2005 280 1960 205",
    bottom: { x: 1981, y: 1294 }, top: nodes.summit,
    label: { x: 2000, y: 422 }, mode: "cable",
    intermediateStations: [{ nodeId: "l5Mid", name: "L5 中途站 · 可下客", alighting: true }],
    note: "用户确认原图红圈为可下客中途站；未确认上客或与附近雪道的具体出口，不自动接入规划。" },
  { code: "F6", path: "M 2117 1237 L 2140 1103", bottom: null, top: null, label: { x: 2110, y: 1285 }, mode: "magic_carpet" },
  { code: "F5", path: "M 2185 1237 L 2197 1103", bottom: null, top: null, label: { x: 2185, y: 1245 }, mode: "magic_carpet" },
  { code: "F3", path: "M 2292 1237 L 2292 1103", bottom: null, top: null, label: { x: 2292, y: 1245 }, mode: "magic_carpet" },
  { code: "F1/F2", path: "M 2818 1237 L 2794 1103 M 2826 1237 L 2802 1103",
    bottom: null, top: null, label: { x: 2833, y: 1255 }, mode: "magic_carpet",
    note: "原图采用 F1/F2 合并标注，保留两条图示线，不猜测各自编号。" },
];

export function segmentPath(segment: Segment) {
  const from = nodes[segment.from];
  const to = nodes[segment.to];
  return `M ${from.x} ${from.y} ${segment.bends} L ${to.x} ${to.y}`;
}

// Same candidate graph algorithm as the pilot, with new full-map lines excluded.
export function findPilotRoute(start: NodeId, end: NodeId): Segment[] | null {
  if (!nodes[start] || !nodes[end]) return null;
  const queue: { node: NodeId; path: Segment[] }[] = [{ node: start, path: [] }];
  const visited = new Set([start]);
  for (let index = 0; index < queue.length; index++) {
    const current = queue[index];
    if (current.node === end) return current.path;
    for (const segment of segments.filter((item) => item.from === current.node && item.direction !== "pending")) {
      if (visited.has(segment.to)) continue;
      visited.add(segment.to);
      queue.push({ node: segment.to, path: [...current.path, segment] });
    }
  }
  return null;
}
