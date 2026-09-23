import { referencePixelToMap } from "../map/fulong-reference-frame";
import {
  labelFromReferencePoint,
  pathFromReferencePoints,
  referenceLiftGeometry,
  referenceTrailGeometry,
} from "../map/fulong-reference-geometry";

const PARAMETER_SOURCE_ID = "chonglihuaxue-167-2026-09-22";
const TOPOLOGY_SOURCE_ID = "chonglihuaxue-map-2026-09-23";
const TRANSPORT_TYPE_SOURCE_ID = "skiresort-fulong-lifts-2026-09-23";

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
  kind: "transport_station" | "junction" | "base" | "zone_anchor";
  x: number;
  y: number;
  label?: string;
};

type TopologyRow = {
  fromNodeId: string;
  toNodeId: string;
};

type TransportType = "chairlift" | "gondola" | "magic_carpet" | "unknown";

type UphillTransportRow = {
  code: string;
  bottomNodeId: string;
  topNodeId: string;
  transportType: TransportType;
  transportTypeSourceSnapshotId: string;
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
  l7EastSector: referencePixelToMap({ x: 3480, y: 575 }),
  westUpper: referencePixelToMap({ x: 1450, y: 760 }),
  centerHigh: referencePixelToMap({ x: 2030, y: 500 }),
  centerUpper: referencePixelToMap({ x: 1800, y: 600 }),
  centerMid: referencePixelToMap({ x: 1900, y: 700 }),
  centerLow: referencePixelToMap({ x: 2020, y: 800 }),
  l2Top: referencePixelToMap({ x: 1790, y: 760 }),
  eastHigh: referencePixelToMap({ x: 2360, y: 420 }),
  eastUpper: referencePixelToMap({ x: 2460, y: 560 }),
  eastMid: referencePixelToMap({ x: 2800, y: 675 }),
  beginnerTop: referencePixelToMap({ x: 2920, y: 990 }),
  farEastHigh: referencePixelToMap({ x: 3480, y: 575 }),
};

const nodeRows: NodeRow[] = [
  { id: "summit-main", kind: "zone_anchor", ...referenceControlPoints.summit, label: "SUMMIT" },
  { id: "ridge-west-high", kind: "transport_station", ...referenceControlPoints.l3Top },
  { id: "ridge-west-mid", kind: "junction", ...referenceControlPoints.c8Lower },
  { id: "west-upper", kind: "junction", ...referenceControlPoints.westUpper },
  { id: "west-base", kind: "base", ...referenceControlPoints.l3Base, label: "WEST BASE" },
  { id: "center-high", kind: "junction", ...referenceControlPoints.centerHigh },
  { id: "center-upper", kind: "junction", ...referenceControlPoints.centerUpper },
  { id: "center-mid", kind: "junction", ...referenceControlPoints.centerMid },
  { id: "center-low", kind: "junction", ...referenceControlPoints.centerLow },
  { id: "l2-top", kind: "transport_station", ...referenceControlPoints.l2Top, label: "PARK" },
  { id: "fulong-base", kind: "base", ...referenceControlPoints.fulongBase, label: "FULONG BASE" },
  { id: "central-transport-base", kind: "zone_anchor", ...referenceControlPoints.centralTransportBase, label: "L2 / L5 BASE" },
  { id: "east-high", kind: "transport_station", ...referenceControlPoints.eastHigh },
  { id: "east-upper", kind: "junction", ...referenceControlPoints.eastUpper },
  { id: "east-mid", kind: "junction", ...referenceControlPoints.eastMid },
  { id: "beginner-top", kind: "junction", ...referenceControlPoints.beginnerTop },
  { id: "far-east-high", kind: "transport_station", ...referenceControlPoints.farEastHigh },
  { id: "l7-base", kind: "transport_station", ...referenceControlPoints.eastHigh, label: "L7 EAST" },
  { id: "l7-east-sector", kind: "zone_anchor", ...referenceControlPoints.l7EastSector },
];

const topologyByCode: Record<string, TopologyRow> = {
  A1: { fromNodeId: "beginner-top", toNodeId: "fulong-base" },
  A2: { fromNodeId: "beginner-top", toNodeId: "fulong-base" },
  A3: { fromNodeId: "center-low", toNodeId: "fulong-base" },
  A5: { fromNodeId: "center-low", toNodeId: "fulong-base" },
  A6: { fromNodeId: "center-low", toNodeId: "fulong-base" },
  C3: { fromNodeId: "west-upper", toNodeId: "west-base" },
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
  C1: { fromNodeId: "summit-main", toNodeId: "center-high" },
  C2: { fromNodeId: "summit-main", toNodeId: "center-high" },
  C7: { fromNodeId: "summit-main", toNodeId: "ridge-west-high" },
  C9: { fromNodeId: "ridge-west-high", toNodeId: "west-upper" },
  C10: { fromNodeId: "ridge-west-mid", toNodeId: "west-base" },
  B1: { fromNodeId: "east-high", toNodeId: "fulong-base" },
  B3: { fromNodeId: "east-high", toNodeId: "fulong-base" },
  B5: { fromNodeId: "east-mid", toNodeId: "fulong-base" },
  B7: { fromNodeId: "east-upper", toNodeId: "fulong-base" },
  B12: { fromNodeId: "center-upper", toNodeId: "center-mid" },
  B13: { fromNodeId: "center-upper", toNodeId: "center-mid" },
  B15: { fromNodeId: "center-upper", toNodeId: "center-mid" },
  C5: { fromNodeId: "summit-main", toNodeId: "center-upper" },
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

const uphillTransportRows: UphillTransportRow[] = [
  { code: "L3", bottomNodeId: "west-base", topNodeId: "ridge-west-high", transportType: "gondola", transportTypeSourceSnapshotId: TRANSPORT_TYPE_SOURCE_ID },
  { code: "L2", bottomNodeId: "fulong-base", topNodeId: "l2-top", transportType: "chairlift", transportTypeSourceSnapshotId: TRANSPORT_TYPE_SOURCE_ID },
  { code: "L5", bottomNodeId: "fulong-base", topNodeId: "summit-main", transportType: "gondola", transportTypeSourceSnapshotId: TRANSPORT_TYPE_SOURCE_ID },
  { code: "L1", bottomNodeId: "fulong-base", topNodeId: "east-high", transportType: "unknown", transportTypeSourceSnapshotId: TRANSPORT_TYPE_SOURCE_ID },
  { code: "L7", bottomNodeId: "l7-base", topNodeId: "far-east-high", transportType: "unknown", transportTypeSourceSnapshotId: TOPOLOGY_SOURCE_ID },
];

function transportId(code: string) {
  return `fulong-${code.toLowerCase()}`;
}

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
    {
      id: TRANSPORT_TYPE_SOURCE_ID,
      title: "Ski lifts Fulong — current lift inventory",
      url: "https://www.skiresort.info/ski-resort/fulong/ski-lifts/",
      publisher: "Skiresort.info",
      publishedAt: null,
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
  transportStations: uphillTransportRows.flatMap((transport) => [
    {
      id: `${transportId(transport.code)}-bottom`,
      transportId: transportId(transport.code),
      nodeId: transport.bottomNodeId,
      role: "bottom" as const,
      name: `${transport.code} Bottom`,
      sourceSnapshotId: TOPOLOGY_SOURCE_ID,
      verificationState,
    },
    {
      id: `${transportId(transport.code)}-top`,
      transportId: transportId(transport.code),
      nodeId: transport.topNodeId,
      role: "top" as const,
      name: `${transport.code} Top`,
      sourceSnapshotId: TOPOLOGY_SOURCE_ID,
      verificationState,
    },
  ]),
  places: [
    { id: "fulong-base-place", name: "Fulong Base", nodeId: "fulong-base", kind: "base" as const, sourceSnapshotId: TOPOLOGY_SOURCE_ID, verificationState },
    { id: "fulong-summit-place", name: "Summit", nodeId: "summit-main", kind: "summit" as const, sourceSnapshotId: TOPOLOGY_SOURCE_ID, verificationState },
    { id: "fulong-west-base-place", name: "West Base", nodeId: "west-base", kind: "base" as const, sourceSnapshotId: TOPOLOGY_SOURCE_ID, verificationState },
  ],
  uphillTransports: uphillTransportRows.map((transport) => ({
    id: transportId(transport.code),
    code: transport.code,
    transportType: transport.transportType,
    bottomStationId: `${transportId(transport.code)}-bottom`,
    topStationId: `${transportId(transport.code)}-top`,
    transportTypeSourceSnapshotId: transport.transportTypeSourceSnapshotId,
    path: pathFromReferencePoints(referenceLiftGeometry[transport.code].points),
    label: labelFromReferencePoint(referenceLiftGeometry[transport.code].label),
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
