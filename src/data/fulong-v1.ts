import { referencePixelToMap } from "../map/fulong-reference-frame";
import {
  labelFromReferencePoint,
  pathFromReferencePoints,
  referenceLiftGeometry,
  referenceTrailGeometry,
} from "../map/fulong-reference-geometry";

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

const referenceControlPoints = {
  summit: referencePixelToMap({ x: 1970, y: 180 }),
  fulongBase: referencePixelToMap({ x: 2241, y: 1351 }),
  l3Base: referencePixelToMap({ x: 431, y: 1266 }),
  l3Top: referencePixelToMap({ x: 1455, y: 410 }),
  c8Lower: referencePixelToMap({ x: 1691, y: 575 }),
  centralTransportBase: referencePixelToMap({ x: 1886, y: 1304 }),
  l7EastSector: referencePixelToMap({ x: 3389, y: 590 }),
  westUpper: referencePixelToMap({ x: 1450, y: 760 }),
  centerHigh: referencePixelToMap({ x: 2020, y: 560 }),
  centerUpper: referencePixelToMap({ x: 1900, y: 650 }),
  centerMid: referencePixelToMap({ x: 1900, y: 780 }),
  centerLow: referencePixelToMap({ x: 2050, y: 950 }),
  l2Top: referencePixelToMap({ x: 1790, y: 760 }),
  eastHigh: referencePixelToMap({ x: 2470, y: 455 }),
  eastUpper: referencePixelToMap({ x: 2550, y: 600 }),
  eastMid: referencePixelToMap({ x: 2700, y: 800 }),
  beginnerTop: referencePixelToMap({ x: 2920, y: 990 }),
  farEastHigh: referencePixelToMap({ x: 3389, y: 590 }),
};

const nodeRows: NodeRow[] = [
  { id: "summit-main", kind: "zone_anchor", ...referenceControlPoints.summit, label: "SUMMIT" },
  { id: "ridge-west-high", kind: "lift_station", ...referenceControlPoints.l3Top },
  { id: "ridge-west-mid", kind: "junction", ...referenceControlPoints.c8Lower },
  { id: "west-upper", kind: "junction", ...referenceControlPoints.westUpper },
  { id: "west-base", kind: "base", ...referenceControlPoints.l3Base, label: "WEST BASE" },
  { id: "center-high", kind: "junction", ...referenceControlPoints.centerHigh },
  { id: "center-upper", kind: "junction", ...referenceControlPoints.centerUpper },
  { id: "center-mid", kind: "junction", ...referenceControlPoints.centerMid },
  { id: "center-low", kind: "junction", ...referenceControlPoints.centerLow },
  { id: "l2-top", kind: "lift_station", ...referenceControlPoints.l2Top, label: "PARK" },
  { id: "fulong-base", kind: "base", ...referenceControlPoints.fulongBase, label: "FULONG BASE" },
  { id: "central-transport-base", kind: "zone_anchor", ...referenceControlPoints.centralTransportBase, label: "L2 / L5 BASE" },
  { id: "east-high", kind: "lift_station", ...referenceControlPoints.eastHigh },
  { id: "east-upper", kind: "junction", ...referenceControlPoints.eastUpper },
  { id: "east-mid", kind: "junction", ...referenceControlPoints.eastMid },
  { id: "beginner-top", kind: "junction", ...referenceControlPoints.beginnerTop },
  { id: "far-east-high", kind: "lift_station", ...referenceControlPoints.farEastHigh },
  { id: "l7-base", kind: "lift_station", ...referenceControlPoints.eastHigh, label: "L7 EAST" },
  { id: "l7-east-sector", kind: "zone_anchor", ...referenceControlPoints.l7EastSector },
];

const topologyByCode: Record<string, TopologyRow> = {
  A1: { fromNodeId: "beginner-top", toNodeId: "fulong-base" },
  A2: { fromNodeId: "beginner-top", toNodeId: "fulong-base" },
  A3: { fromNodeId: "center-low", toNodeId: "fulong-base" },
  A5: { fromNodeId: "center-low", toNodeId: "fulong-base" },
  A6: { fromNodeId: "center-low", toNodeId: "fulong-base" },
  C3: { fromNodeId: "ridge-west-high", toNodeId: "fulong-base" },
  D1: { fromNodeId: "west-upper", toNodeId: "west-base" },
  D2: { fromNodeId: "west-upper", toNodeId: "west-base" },
  B2: { fromNodeId: "east-high", toNodeId: "beginner-top" },
  A9: { fromNodeId: "l2-top", toNodeId: "fulong-base" },
  A10: { fromNodeId: "l2-top", toNodeId: "fulong-base" },
  A7: { fromNodeId: "center-mid", toNodeId: "fulong-base" },
  A8: { fromNodeId: "center-mid", toNodeId: "fulong-base" },
  B9: { fromNodeId: "center-high", toNodeId: "east-mid" },
  B10: { fromNodeId: "center-high", toNodeId: "east-mid" },
  B11: { fromNodeId: "center-mid", toNodeId: "center-low" },
  C8: { fromNodeId: "ridge-west-high", toNodeId: "ridge-west-mid" },
  B6: { fromNodeId: "east-high", toNodeId: "fulong-base" },
  B8: { fromNodeId: "east-high", toNodeId: "east-mid" },
  C1: { fromNodeId: "summit-main", toNodeId: "center-upper" },
  C2: { fromNodeId: "summit-main", toNodeId: "east-upper" },
  C7: { fromNodeId: "ridge-west-high", toNodeId: "ridge-west-mid" },
  C9: { fromNodeId: "ridge-west-mid", toNodeId: "west-upper" },
  C10: { fromNodeId: "ridge-west-mid", toNodeId: "west-base" },
  B1: { fromNodeId: "east-high", toNodeId: "fulong-base" },
  B3: { fromNodeId: "east-high", toNodeId: "fulong-base" },
  B5: { fromNodeId: "east-mid", toNodeId: "fulong-base" },
  B7: { fromNodeId: "east-upper", toNodeId: "fulong-base" },
  B12: { fromNodeId: "center-upper", toNodeId: "center-mid" },
  B13: { fromNodeId: "center-upper", toNodeId: "center-mid" },
  B15: { fromNodeId: "center-upper", toNodeId: "center-mid" },
  C5: { fromNodeId: "summit-main", toNodeId: "center-high" },
  C6: { fromNodeId: "summit-main", toNodeId: "ridge-west-high" },
};

const nodeById = new Map(nodeRows.map((node) => [node.id, node]));

function trailId(code: string) {
  return `fulong-${code.toLowerCase()}`;
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
  {
    code: "L3",
    fromNodeId: "west-base",
    toNodeId: "ridge-west-high",
    path: "M 101 420 C 201 362 305 259 395 174",
    label: { x: 114, y: 410 },
  },
  { code: "L2", fromNodeId: "fulong-base", toNodeId: "l2-top", bendX: -18, label: { x: 518, y: 524 } },
  { code: "L5", fromNodeId: "fulong-base", toNodeId: "summit-main", bendX: 0, label: { x: 558, y: 325 } },
  { code: "L1", fromNodeId: "fulong-base", toNodeId: "east-high", bendX: 24, label: { x: 650, y: 360 } },
  { code: "L7", fromNodeId: "l7-base", toNodeId: "far-east-high" }
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
    path: pathFromReferencePoints(referenceLiftGeometry[lift.code].points),
    label: labelFromReferencePoint(referenceLiftGeometry[lift.code].label),
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
      path: pathFromReferencePoints(referenceTrailGeometry[row.code].points),
      label: labelFromReferencePoint(referenceTrailGeometry[row.code].label),
    };
  }),
  claims: trailRows.flatMap(claimsFor),
};
