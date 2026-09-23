import { referencePixelToMap, type ReferencePixelPoint } from "./fulong-reference-frame";

type ReferencePath = {
  points: ReferencePixelPoint[];
  label: ReferencePixelPoint;
};

const p = (x: number, y: number): ReferencePixelPoint => ({ x, y });

export const referenceTrailGeometry: Record<string, ReferencePath> = {
  A1: { points: [p(3020, 1050), p(3010, 1190), p(3020, 1340)], label: p(3005, 1195) },
  A2: { points: [p(2910, 990), p(2930, 1130), p(2960, 1300)], label: p(2925, 1085) },
  A3: { points: [p(2200, 945), p(2190, 1120), p(2210, 1305)], label: p(2240, 1060) },
  A5: { points: [p(2070, 955), p(2060, 1125), p(2050, 1305)], label: p(2110, 1190) },
  A6: { points: [p(1970, 955), p(1950, 1120), p(1940, 1305)], label: p(1900, 1135) },
  C3: { points: [p(1870, 690), p(1580, 770), p(1260, 865), p(900, 1010), p(500, 1190)], label: p(1515, 840) },
  D1: { points: [p(1510, 850), p(1220, 955), p(890, 1055), p(520, 1210)], label: p(1250, 1000) },
  D2: { points: [p(1580, 790), p(1320, 865), p(1000, 955), p(540, 1130)], label: p(1320, 900) },
  B2: { points: [p(2470, 455), p(2740, 505), p(2960, 585), p(3060, 735), p(3030, 865), p(2860, 955), p(2700, 1010)], label: p(2990, 690) },
  A9: { points: [p(1655, 845), p(1660, 1020), p(1650, 1295)], label: p(1725, 1100) },
  A10: { points: [p(1510, 845), p(1505, 1030), p(1545, 1295)], label: p(1470, 960) },
  A7: { points: [p(1970, 805), p(1985, 990), p(1980, 1295)], label: p(2015, 980) },
  A8: { points: [p(1840, 810), p(1815, 990), p(1800, 1295)], label: p(1825, 1010) },
  B9: { points: [p(1995, 575), p(2160, 635), p(2320, 720), p(2420, 820)], label: p(2190, 525) },
  B10: { points: [p(2470, 450), p(2290, 485), p(2110, 525), p(2000, 570)], label: p(2360, 455) },
  B11: { points: [p(1900, 790), p(1960, 865), p(2050, 930), p(2140, 985)], label: p(1970, 880) },
  C8: { points: [p(1455, 410), p(1540, 460), p(1620, 520), p(1691, 575)], label: p(1585, 505) },
  B6: { points: [p(2620, 635), p(2620, 805), p(2600, 1000), p(2580, 1220)], label: p(2605, 900) },
  B8: { points: [p(2470, 455), p(2415, 550), p(2360, 650), p(2310, 760)], label: p(2385, 585) },
  C1: { points: [p(1970, 180), p(2050, 285), p(2060, 390), p(2010, 515)], label: p(2100, 315) },
  C2: { points: [p(2045, 285), p(2100, 390), p(2055, 515), p(2010, 575)], label: p(2070, 425) },
  C7: { points: [p(1970, 180), p(1805, 250), p(1630, 335), p(1455, 410)], label: p(1720, 285) },
  C9: { points: [p(1455, 410), p(1510, 520), p(1515, 655), p(1430, 760)], label: p(1490, 610) },
  C10: { points: [p(1510, 520), p(1430, 650), p(1320, 790), p(1190, 930)], label: p(1285, 715) },
  B1: { points: [p(2470, 455), p(2580, 540), p(2700, 650), p(2790, 770)], label: p(2635, 585) },
  B3: { points: [p(2710, 560), p(2800, 650), p(2830, 770), p(2810, 860)], label: p(2850, 600) },
  B5: { points: [p(2590, 575), p(2690, 675), p(2790, 790), p(2820, 870)], label: p(2670, 765) },
  B7: { points: [p(2440, 610), p(2410, 740), p(2360, 860), p(2290, 940)], label: p(2390, 760) },
  B12: { points: [p(1990, 610), p(2050, 690), p(2100, 775), p(2130, 835)], label: p(2110, 680) },
  B13: { points: [p(1920, 610), p(1900, 690), p(1930, 770), p(1980, 820)], label: p(1960, 775) },
  B15: { points: [p(1900, 585), p(1810, 630), p(1800, 700), p(1860, 760)], label: p(1775, 610) },
  C5: { points: [p(1970, 180), p(1915, 285), p(1880, 400), p(1860, 520)], label: p(1900, 295) },
  C6: { points: [p(1880, 265), p(1770, 350), p(1650, 445), p(1690, 560)], label: p(1750, 415) },
};

export const referenceLiftGeometry: Record<string, ReferencePath> = {
  L3: { points: [p(431, 1266), p(760, 1080), p(1080, 820), p(1455, 410)], label: p(520, 1215) },
  L2: { points: [p(1640, 1325), p(1660, 1120), p(1740, 920), p(1790, 760)], label: p(1655, 1260) },
  L5: { points: [p(1945, 1325), p(1950, 1050), p(1960, 720), p(1970, 180)], label: p(1945, 1245) },
  L1: { points: [p(2250, 1330), p(2300, 1090), p(2390, 780), p(2470, 455)], label: p(2260, 1240) },
  L7: { points: [p(2470, 455), p(2760, 500), p(3090, 570), p(3389, 590)], label: p(3140, 560) },
};

export const referenceFeatureGeometry = [
  { code: "C11", state: "planned", points: [p(1260, 620), p(1050, 760), p(820, 930), p(650, 1160)] },
  { code: "C12", state: "planned", points: [p(1340, 570), p(1080, 680), p(790, 820), p(520, 1080)] },
  { code: "C13", state: "map-only", points: [p(1980, 525), p(1900, 610), p(1820, 690)] },
  { code: "E1", state: "planned", points: [p(1990, 205), p(2200, 305), p(2460, 430)] },
] as const;

export const referenceCalibratedTrailIds = new Set(
  Object.keys(referenceTrailGeometry).map((code) => `fulong-${code.toLowerCase()}`),
);
export const referenceCalibratedLiftIds = new Set(
  Object.keys(referenceLiftGeometry).map((code) => `fulong-${code.toLowerCase()}`),
);

export function mapPoint(point: ReferencePixelPoint) {
  return referencePixelToMap(point);
}

export function pathFromReferencePoints(points: ReferencePixelPoint[]) {
  const mapped = points.map(referencePixelToMap);
  if (mapped.length === 0) return "";
  if (mapped.length === 1) return `M ${mapped[0].x} ${mapped[0].y}`;
  if (mapped.length === 2) return `M ${mapped[0].x} ${mapped[0].y} L ${mapped[1].x} ${mapped[1].y}`;

  let path = `M ${mapped[0].x} ${mapped[0].y}`;
  for (let index = 1; index < mapped.length - 1; index += 1) {
    const current = mapped[index];
    const next = mapped[index + 1];
    const midpoint = {
      x: Math.round((current.x + next.x) / 2),
      y: Math.round((current.y + next.y) / 2),
    };
    path += ` Q ${current.x} ${current.y} ${midpoint.x} ${midpoint.y}`;
  }
  const last = mapped[mapped.length - 1];
  return `${path} L ${last.x} ${last.y}`;
}

export function labelFromReferencePoint(point: ReferencePixelPoint) {
  return referencePixelToMap(point);
}
