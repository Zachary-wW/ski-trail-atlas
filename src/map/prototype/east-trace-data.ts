// Local fidelity experiment, not published trail/topology data.
// Coordinates refer to the user's 3631 × 2560 WEBP, never to the legacy JPG.
export const reference = {
  width: 3631,
  height: 2560,
  url: "/__reference/fulong-highres.webp",
  frame: { x: 1920, y: 350, width: 1210, height: 1030 },
};

export const nodes = {
  ridge: { x: 2440, y: 418, name: "东侧上部交叉口" },
  b1Fork: { x: 2598, y: 464, name: "B1 分岔口" },
  b3Fork: { x: 2828, y: 504, name: "B3 分岔口" },
  b3End: { x: 2773, y: 619, name: "B3 下端（连接待核验）" },
  eastMerge: { x: 2805, y: 676, name: "B1 / B5 交叉口" },
  eastLower: { x: 2814, y: 863, name: "东侧下部交叉口" },
  b5Fork: { x: 2561, y: 562, name: "B5 / B6 / B7 交叉口" },
  central: { x: 2031, y: 512, name: "B10 / B9 交叉口" },
  b8Merge: { x: 2256, y: 622, name: "B8 / B9 交叉口" },
  westMerge: { x: 2305, y: 759, name: "B7 / B8 交叉口" },
  westLower: { x: 2280, y: 917, name: "西侧下部交叉口" },
  teaching: { x: 2545, y: 1189, name: "教学区上方交叉口" },
};

export type NodeId = keyof typeof nodes;
export type Segment = {
  id: string;
  trail: string | null;
  from: NodeId;
  to: NodeId;
  bends: string;
  // Endpoints describe drawing order; this flag prevents assuming travel direction.
  direction?: "pending";
  note?: string;
};

// Lines hidden by labels are manually interpolated and explicitly need review.
// Unnumbered connectors keep their own identity, instead of extending a named trail.
export const segments: Segment[] = [
  { id: "b10-1", trail: "B10", from: "ridge", to: "central",
    bends: "C 2370 422 2340 442 2270 444 C 2180 443 2100 480 2043 506",
    note: "中央端点附近被文字与交叉口图标遮挡，需人工确认。" },
  { id: "b9-1", trail: "B9", from: "central", to: "b8Merge",
    bends: "C 2102 535 2185 584 2238 613" },
  { id: "b8-1", trail: "B8", from: "ridge", to: "b8Merge",
    bends: "C 2430 464 2398 492 2358 531 C 2322 565 2285 608 2267 618" },
  { id: "b8-2", trail: "B8", from: "b8Merge", to: "westMerge",
    bends: "C 2276 652 2318 694 2306 730 Q 2301 744 2304 753" },
  { id: "upper-entry-link", trail: null, from: "ridge", to: "b5Fork",
    bends: "C 2472 438 2510 475 2545 533 Q 2558 553 2560 560",
    direction: "pending",
    note: "B6 上方可见通道已补绘；所属雪道和通行方向待核验，暂不参与路线演示。" },
  { id: "b7-1", trail: "B7", from: "b5Fork", to: "westMerge",
    bends: "C 2551 610 2496 640 2447 671 C 2380 703 2327 729 2311 749" },
  { id: "b2-1", trail: "B2", from: "ridge", to: "b1Fork",
    bends: "C 2494 428 2546 444 2581 457" },
  { id: "b2-2", trail: "B2", from: "b1Fork", to: "b3Fork",
    bends: "C 2673 484 2765 494 2812 502",
    note: "原图绿色线路；与 B1/B3 的分岔位置需放大复核。" },
  { id: "b2-3", trail: "B2", from: "b3Fork", to: "eastLower",
    bends: "C 2915 506 2974 517 2999 557 C 3034 614 3036 676 3025 715 C 3007 785 2900 828 2835 853" },
  { id: "b1-1", trail: "B1", from: "b1Fork", to: "eastMerge",
    bends: "C 2667 518 2735 565 2772 622 Q 2794 654 2801 667" },
  { id: "b3-1", trail: "B3", from: "b3Fork", to: "b3End",
    bends: "C 2800 522 2775 542 2772 568 Q 2768 593 2772 610",
    note: "原图在 B3 下端没有清晰画出与 B1 的接点，保留断口，不自动接入 B1。" },
  { id: "b5-1", trail: "B5", from: "b5Fork", to: "eastMerge",
    bends: "C 2601 596 2663 650 2720 666 Q 2760 677 2791 677" },
  { id: "b6-1", trail: "B6", from: "b5Fork", to: "teaching",
    bends: "C 2594 615 2585 672 2567 729 C 2527 820 2522 900 2530 990 Q 2540 1092 2544 1168" },
  { id: "east-link-1", trail: null, from: "eastMerge", to: "eastLower",
    bends: "C 2837 724 2827 807 2817 850",
    note: "原图未在该段单独标号，保留为待核验连接，不归入 B1。" },
  { id: "east-link-2", trail: null, from: "eastLower", to: "teaching",
    bends: "C 2776 956 2698 1001 2636 1062 Q 2575 1120 2554 1170",
    note: "仅演示图示连接；不代表现场开放或适合通行。" },
  { id: "west-link-1", trail: null, from: "westMerge", to: "westLower",
    bends: "C 2298 790 2279 824 2282 858 Q 2284 889 2280 906" },
];

export const trails = [
  { code: "B1", label: { x: 2665, y: 534 } },
  { code: "B2", label: { x: 3010, y: 673 } },
  { code: "B3", label: { x: 2860, y: 578 } },
  { code: "B5", label: { x: 2670, y: 676 } },
  { code: "B6", label: { x: 2500, y: 960 } },
  { code: "B7", label: { x: 2415, y: 719 } },
  { code: "B8", label: { x: 2360, y: 567 } },
  { code: "B9", label: { x: 2137, y: 592 } },
  { code: "B10", label: { x: 2213, y: 460 } },
];

export const transports = [
  { code: "L1", path: "M 2372 1290 C 2404 1020 2430 775 2453 552 L 2465 417",
    bottom: { x: 2372, y: 1290 }, top: { x: 2465, y: 417 } },
  { code: "L7", path: "M 2465 407 C 2700 478 2910 523 3110 568",
    bottom: null, top: null }, // Corridor continues beyond this pilot crop.
];

export function segmentPath(segment: Segment) {
  const from = nodes[segment.from];
  const to = nodes[segment.to];
  return `M ${from.x} ${from.y} ${segment.bends} L ${to.x} ${to.y}`;
}

// Demonstrates ONLY the manually annotated, directed candidate graph in this pilot.
// This does not use or silently correct the legacy publication graph.
export function findPilotRoute(start: NodeId, end: NodeId): Segment[] | null {
  const queue: { node: NodeId; path: Segment[] }[] = [{ node: start, path: [] }];
  const visited = new Set<NodeId>([start]);
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
