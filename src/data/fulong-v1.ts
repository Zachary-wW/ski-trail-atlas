const PARAMETER_SOURCE_ID = "chonglihuaxue-167-2026-09-22";
const TOPOLOGY_SOURCE_ID = "chonglihuaxue-map-2026-09-23";

const verificationState = "unverified" as const;

type Difficulty =
  | "beginner"
  | "beginner_intermediate"
  | "park"
  | "intermediate"
  | "intermediate_advanced"
  | "advanced";

type TrailRow = {
  code: string;
  name: string;
  difficulty: Difficulty;
  lengthM?: number;
  averageWidthM?: number;
  summitElevationM: number;
  averageSlopeDegrees?: number;
};

type NodeRow = {
  id: string;
  kind: "lift_station" | "junction" | "base" | "zone_anchor";
  x: number;
  y: number;
  label?: string;
};

type TopologyRow = {
  fromNodeId: string;
  toNodeId: string;
  bendX?: number;
  bendY?: number;
  labelDx?: number;
  labelDy?: number;
};

const trailRows: TrailRow[] = [
  { code: "A1", name: "蓝调", difficulty: "beginner", lengthM: 173, averageWidthM: 20, summitElevationM: 1309, averageSlopeDegrees: 7 },
  { code: "A2", name: "管弦", difficulty: "beginner", lengthM: 173, averageWidthM: 20, summitElevationM: 1309, averageSlopeDegrees: 7 },
  { code: "A3", name: "民谣", difficulty: "beginner", lengthM: 188, averageWidthM: 50, summitElevationM: 1313, averageSlopeDegrees: 8 },
  { code: "A5", name: "灵魂", difficulty: "beginner", lengthM: 188, averageWidthM: 50, summitElevationM: 1313, averageSlopeDegrees: 8 },
  { code: "A6", name: "新世纪", difficulty: "beginner", lengthM: 180, averageWidthM: 30, summitElevationM: 1313, averageSlopeDegrees: 8 },
  { code: "C3", name: "流行", difficulty: "beginner", lengthM: 1230, averageWidthM: 30, summitElevationM: 1498, averageSlopeDegrees: 14 },
  { code: "D1", name: "咏叹", difficulty: "beginner", summitElevationM: 1416 },
  { code: "D2", name: "自赏", difficulty: "beginner", summitElevationM: 1416 },
  { code: "B2", name: "交响", difficulty: "beginner_intermediate", lengthM: 1830, averageWidthM: 18, summitElevationM: 1500, averageSlopeDegrees: 19 },
  { code: "A9", name: "嘻哈", difficulty: "park", lengthM: 640, averageWidthM: 70, summitElevationM: 1416, averageSlopeDegrees: 18 },
  { code: "A10", name: "古典", difficulty: "park", lengthM: 710, averageWidthM: 50, summitElevationM: 1416, averageSlopeDegrees: 9 },
  { code: "A7", name: "节奏布鲁斯", difficulty: "intermediate", lengthM: 579, averageWidthM: 30, summitElevationM: 1416, averageSlopeDegrees: 19 },
  { code: "A8", name: "浩室", difficulty: "intermediate", lengthM: 422, averageWidthM: 30, summitElevationM: 1401, averageSlopeDegrees: 20 },
  { code: "B9", name: "摇摆", difficulty: "intermediate", lengthM: 1437, averageWidthM: 45, summitElevationM: 1490, averageSlopeDegrees: 16 },
  { code: "B10", name: "阿卡贝拉", difficulty: "intermediate", lengthM: 1692, averageWidthM: 30, summitElevationM: 1565, averageSlopeDegrees: 9 },
  { code: "B11", name: "萨尔萨", difficulty: "intermediate", lengthM: 740, averageWidthM: 30, summitElevationM: 1490, averageSlopeDegrees: 11 },
  { code: "C8", name: "约德尔", difficulty: "intermediate", lengthM: 192, averageWidthM: 30, summitElevationM: 1550, averageSlopeDegrees: 22 },
  { code: "B6", name: "乡村", difficulty: "intermediate_advanced", lengthM: 1084, averageWidthM: 30, summitElevationM: 1565, averageSlopeDegrees: 20 },
  { code: "B8", name: "放克", difficulty: "intermediate_advanced", lengthM: 1458, averageWidthM: 35, summitElevationM: 1565, averageSlopeDegrees: 28 },
  { code: "C1", name: "朋克", difficulty: "intermediate_advanced", lengthM: 608, averageWidthM: 34, summitElevationM: 1753, averageSlopeDegrees: 28 },
  { code: "C2", name: "爵士", difficulty: "intermediate_advanced", lengthM: 466, averageWidthM: 38, summitElevationM: 1670, averageSlopeDegrees: 23 },
  { code: "C7", name: "拉丁", difficulty: "intermediate_advanced", lengthM: 971, averageWidthM: 30, summitElevationM: 1540, averageSlopeDegrees: 25 },
  { code: "C9", name: "波普", difficulty: "intermediate_advanced", lengthM: 831, averageWidthM: 30, summitElevationM: 1550, averageSlopeDegrees: 25 },
  { code: "C10", name: "都市", difficulty: "intermediate_advanced", lengthM: 867, averageWidthM: 30, summitElevationM: 1548, averageSlopeDegrees: 23 },
  { code: "B1", name: "摇滚", difficulty: "advanced", lengthM: 1557, averageWidthM: 30, summitElevationM: 1565, averageSlopeDegrees: 22 },
  { code: "B3", name: "丛林", difficulty: "advanced", lengthM: 1457, averageWidthM: 40, summitElevationM: 1565, averageSlopeDegrees: 23 },
  { code: "B5", name: "说唱", difficulty: "advanced", lengthM: 1226, averageWidthM: 30, summitElevationM: 1463, averageSlopeDegrees: 28 },
  { code: "B7", name: "电子", difficulty: "advanced", lengthM: 1355, averageWidthM: 30, summitElevationM: 1479, averageSlopeDegrees: 26 },
  { code: "B12", name: "伦巴", difficulty: "advanced", lengthM: 966, averageWidthM: 30, summitElevationM: 1545, averageSlopeDegrees: 21 },
  { code: "B13", name: "打击乐", difficulty: "advanced", lengthM: 938, averageWidthM: 30, summitElevationM: 1545, averageSlopeDegrees: 30 },
  { code: "B15", name: "金属", difficulty: "advanced", lengthM: 125, averageWidthM: 30, summitElevationM: 1545, averageSlopeDegrees: 23 },
  { code: "C5", name: "雷鬼", difficulty: "advanced", lengthM: 553, averageWidthM: 30, summitElevationM: 1654, averageSlopeDegrees: 29 },
  { code: "C6", name: "迪斯科", difficulty: "advanced", lengthM: 577, averageWidthM: 30, summitElevationM: 1644, averageSlopeDegrees: 28 },
];

const nodeRows: NodeRow[] = [
  { id: "summit-main", kind: "zone_anchor", x: 525, y: 58, label: "SUMMIT" },
  { id: "ridge-west-high", kind: "lift_station", x: 392, y: 128 },
  { id: "ridge-west-mid", kind: "junction", x: 318, y: 205 },
  { id: "west-upper", kind: "junction", x: 252, y: 302 },
  { id: "west-base", kind: "base", x: 108, y: 565, label: "WEST BASE" },
  { id: "center-high", kind: "junction", x: 535, y: 150 },
  { id: "center-upper", kind: "junction", x: 520, y: 228 },
  { id: "center-mid", kind: "junction", x: 525, y: 332 },
  { id: "center-low", kind: "junction", x: 548, y: 445 },
  { id: "l2-top", kind: "lift_station", x: 430, y: 355, label: "PARK" },
  { id: "fulong-base", kind: "base", x: 600, y: 590, label: "FULONG BASE" },
  { id: "east-high", kind: "lift_station", x: 665, y: 152 },
  { id: "east-upper", kind: "junction", x: 705, y: 235 },
  { id: "east-mid", kind: "junction", x: 730, y: 342 },
  { id: "beginner-top", kind: "junction", x: 825, y: 455 },
  { id: "far-east-high", kind: "lift_station", x: 830, y: 185 },
  { id: "l7-base", kind: "lift_station", x: 960, y: 300, label: "L7 EAST" },
];

const topologyByCode: Record<string, TopologyRow> = {
  A1: { fromNodeId: "beginner-top", toNodeId: "fulong-base", bendX: 88, labelDx: 42, labelDy: 10 },
  A2: { fromNodeId: "beginner-top", toNodeId: "fulong-base", bendX: 126, labelDx: 96, labelDy: 38 },
  A3: { fromNodeId: "center-low", toNodeId: "fulong-base", bendX: 26, labelDx: 28, labelDy: -8 },
  A5: { fromNodeId: "center-low", toNodeId: "fulong-base", bendX: -12, labelDx: -12, labelDy: 12 },
  A6: { fromNodeId: "center-low", toNodeId: "fulong-base", bendX: -42, labelDx: -60, labelDy: 45 },
  C3: { fromNodeId: "ridge-west-high", toNodeId: "fulong-base", bendX: -100, bendY: 35, labelDx: -56, labelDy: 18 },
  D1: { fromNodeId: "west-upper", toNodeId: "west-base", bendX: -24, labelDx: -18, labelDy: 18 },
  D2: { fromNodeId: "west-upper", toNodeId: "west-base", bendX: 18, labelDx: 22, labelDy: -18 },
  B2: { fromNodeId: "far-east-high", toNodeId: "beginner-top", bendX: 50, labelDx: 42, labelDy: -5 },
  A9: { fromNodeId: "l2-top", toNodeId: "fulong-base", bendX: -74, labelDx: -54, labelDy: 5 },
  A10: { fromNodeId: "l2-top", toNodeId: "fulong-base", bendX: -112, labelDx: -86, labelDy: 32 },
  A7: { fromNodeId: "center-mid", toNodeId: "fulong-base", bendX: 10, labelDx: 18, labelDy: 4 },
  A8: { fromNodeId: "center-mid", toNodeId: "fulong-base", bendX: 46, labelDx: 96, labelDy: 56 },
  B9: { fromNodeId: "center-high", toNodeId: "east-mid", bendX: 36, labelDx: -72, labelDy: -14 },
  B10: { fromNodeId: "center-high", toNodeId: "east-mid", bendX: -12, labelDx: -6, labelDy: -36 },
  B11: { fromNodeId: "center-mid", toNodeId: "center-low", bendX: 28, labelDx: 32, labelDy: -2 },
  C8: { fromNodeId: "ridge-west-high", toNodeId: "ridge-west-mid", bendX: 24, labelDx: 25, labelDy: -12 },
  B6: { fromNodeId: "east-high", toNodeId: "fulong-base", bendX: 95, labelDx: 76, labelDy: 8 },
  B8: { fromNodeId: "east-high", toNodeId: "east-mid", bendX: -22, labelDx: 38, labelDy: 16 },
  C1: { fromNodeId: "summit-main", toNodeId: "center-upper", bendX: 28, labelDx: 28, labelDy: -6 },
  C2: { fromNodeId: "summit-main", toNodeId: "east-upper", bendX: 42, labelDx: 55, labelDy: 4 },
  C7: { fromNodeId: "ridge-west-high", toNodeId: "ridge-west-mid", bendX: -26, labelDx: -28, labelDy: 8 },
  C9: { fromNodeId: "ridge-west-mid", toNodeId: "west-upper", bendX: 14, labelDx: 18, labelDy: -8 },
  C10: { fromNodeId: "ridge-west-mid", toNodeId: "west-base", bendX: -42, labelDx: -45, labelDy: -2 },
  B1: { fromNodeId: "far-east-high", toNodeId: "fulong-base", bendX: 105, labelDx: 82, labelDy: -22 },
  B3: { fromNodeId: "far-east-high", toNodeId: "fulong-base", bendX: 146, labelDx: 112, labelDy: 12 },
  B5: { fromNodeId: "east-mid", toNodeId: "fulong-base", bendX: 90, labelDx: 74, labelDy: 8 },
  B7: { fromNodeId: "east-upper", toNodeId: "fulong-base", bendX: 58, labelDx: 55, labelDy: 8 },
  B12: { fromNodeId: "center-upper", toNodeId: "center-mid", bendX: 30, labelDx: 32, labelDy: 4 },
  B13: { fromNodeId: "center-upper", toNodeId: "center-mid", bendX: -14, labelDx: -13, labelDy: -10 },
  B15: { fromNodeId: "center-upper", toNodeId: "center-mid", bendX: -45, labelDx: -48, labelDy: 16 },
  C5: { fromNodeId: "summit-main", toNodeId: "center-high", bendX: -12, labelDx: -12, labelDy: 2 },
  C6: { fromNodeId: "summit-main", toNodeId: "ridge-west-high", bendX: -34, labelDx: -36, labelDy: -2 },
};

const nodeById = new Map(nodeRows.map((node) => [node.id, node]));

function trailId(code: string) {
  return `fulong-${code.toLowerCase()}`;
}

function pathBetween(topology: TopologyRow) {
  const from = nodeById.get(topology.fromNodeId);
  const to = nodeById.get(topology.toNodeId);
  if (!from || !to) throw new Error(`Unknown topology node for ${topology.fromNodeId} -> ${topology.toNodeId}`);

  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const bendX = topology.bendX ?? 0;
  const bendY = topology.bendY ?? 0;
  const c1x = Math.round(from.x + dx / 3 + bendX);
  const c1y = Math.round(from.y + dy / 3 + bendY);
  const c2x = Math.round(from.x + (dx * 2) / 3 + bendX);
  const c2y = Math.round(from.y + (dy * 2) / 3 + bendY);
  return `M ${from.x} ${from.y} C ${c1x} ${c1y} ${c2x} ${c2y} ${to.x} ${to.y}`;
}

function labelFor(topology: TopologyRow) {
  const from = nodeById.get(topology.fromNodeId)!;
  const to = nodeById.get(topology.toNodeId)!;
  return {
    x: Math.round((from.x + to.x) / 2 + (topology.labelDx ?? 0)),
    y: Math.round((from.y + to.y) / 2 + (topology.labelDy ?? 0)),
  };
}

function claimsFor(row: TrailRow) {
  const common = {
    trailId: trailId(row.code),
    sourceSnapshotId: PARAMETER_SOURCE_ID,
    verificationState,
  };
  const claims: Array<Record<string, unknown>> = [
    { id: `${trailId(row.code)}-difficulty`, ...common, field: "difficulty", value: row.difficulty },
  ];

  if (row.lengthM !== undefined) claims.push({ id: `${trailId(row.code)}-length`, ...common, field: "lengthM", value: row.lengthM, unit: "m" });
  if (row.averageWidthM !== undefined) claims.push({ id: `${trailId(row.code)}-average-width`, ...common, field: "averageWidthM", value: row.averageWidthM, unit: "m" });
  claims.push({ id: `${trailId(row.code)}-summit-elevation`, ...common, field: "summitElevationM", value: row.summitElevationM, unit: "m" });
  if (row.averageSlopeDegrees !== undefined) claims.push({ id: `${trailId(row.code)}-average-slope`, ...common, field: "averageSlopeDegrees", value: row.averageSlopeDegrees, unit: "degree" });

  return claims;
}

const liftRows = [
  { code: "L3", fromNodeId: "west-base", toNodeId: "ridge-west-high", bendX: -8, label: { x: 230, y: 390 } },
  { code: "L2", fromNodeId: "fulong-base", toNodeId: "l2-top", bendX: -18, label: { x: 518, y: 524 } },
  { code: "L5", fromNodeId: "fulong-base", toNodeId: "summit-main", bendX: 0, label: { x: 558, y: 325 } },
  { code: "L1", fromNodeId: "fulong-base", toNodeId: "east-high", bendX: 24, label: { x: 650, y: 360 } },
  { code: "L7", fromNodeId: "l7-base", toNodeId: "far-east-high", bendX: 20, label: { x: 905, y: 225 } },
] as const;

export default {
  schemaVersion: "1.0.0" as const,
  resort: { id: "fulong", name: "富龙滑雪场" },
  season: "2025-2026",
  lastVerifiedAt: "2026-09-23",
  sourceSnapshots: [
    {
      id: PARAMETER_SOURCE_ID,
      title: "崇礼富龙滑雪场雪道参数及雪道总览图",
      url: "https://www.chonglihuaxue.cn/info.asp?id=167",
      publisher: "张家口帝和旅游有限公司",
      publishedAt: "2026-06-11",
      retrievedAt: "2026-09-22",
      season: "2025-2026",
      sourceClass: "secondary_commercial" as const,
      permittedUse: "reference_only" as const,
    },
    {
      id: TOPOLOGY_SOURCE_ID,
      title: "富龙滑雪场全景雪道图（结构复核快照）",
      url: "https://www.chonglihuaxue.cn/info.asp?id=167",
      publisher: "张家口帝和旅游有限公司",
      publishedAt: "2026-06-11",
      retrievedAt: "2026-09-23",
      season: "2025-2026",
      sourceClass: "secondary_commercial" as const,
      permittedUse: "reference_only" as const,
    },
  ],
  trails: trailRows.map((row) => ({ id: trailId(row.code), code: row.code, name: row.name })),
  mapNodes: nodeRows.map((node) => ({
    ...node,
    sourceSnapshotId: TOPOLOGY_SOURCE_ID,
    verificationState,
  })),
  lifts: liftRows.map((lift) => ({
    id: `fulong-${lift.code.toLowerCase()}`,
    code: lift.code,
    fromNodeId: lift.fromNodeId,
    toNodeId: lift.toNodeId,
    path: pathBetween(lift),
    label: lift.label,
    sourceSnapshotId: TOPOLOGY_SOURCE_ID,
    verificationState,
  })),
  trailLocations: trailRows.map((row) => {
    const topology = topologyByCode[row.code];
    if (!topology) throw new Error(`Missing topology for ${row.code}`);
    return {
      trailId: trailId(row.code),
      fromNodeId: topology.fromNodeId,
      toNodeId: topology.toNodeId,
      sourceSnapshotId: TOPOLOGY_SOURCE_ID,
      verificationState,
      path: pathBetween(topology),
      label: labelFor(topology),
    };
  }),
  claims: trailRows.flatMap(claimsFor),
};
