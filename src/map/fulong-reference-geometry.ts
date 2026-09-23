import { referencePixelToMap, type ReferencePixelPoint } from "./fulong-reference-frame";

type ReferencePath = {
  points: ReferencePixelPoint[];
  label: ReferencePixelPoint;
};

const p = (x: number, y: number): ReferencePixelPoint => ({ x, y });

export const referenceTrailGeometry: Record<string, ReferencePath> = {
  A1: { points: [p(2748, 1080), p(2755, 1145), p(2765, 1210), p(2775, 1295)], label: p(2768, 1218) },
  A2: { points: [p(2695, 990), p(2710, 1060), p(2728, 1130), p(2745, 1200)], label: p(2728, 1110) },
  A3: { points: [p(2200, 945), p(2190, 1120), p(2210, 1305)], label: p(2240, 1060) },
  A5: { points: [p(2070, 955), p(2060, 1125), p(2050, 1305)], label: p(2110, 1190) },
  A6: { points: [p(1970, 955), p(1950, 1120), p(1940, 1305)], label: p(1900, 1135) },
  C3: { points: [p(1690, 700), p(1580, 735), p(1450, 770), p(1320, 810), p(1180, 855), p(1040, 905), p(900, 960), p(760, 1025), p(620, 1095), p(510, 1170), p(431, 1266)], label: p(1515, 840) },
  D1: { points: [p(1690, 820), p(1580, 850), p(1450, 890), p(1320, 930), p(1180, 975), p(1040, 1020), p(900, 1070), p(760, 1120), p(620, 1175), p(510, 1225), p(431, 1266)], label: p(1250, 1000) },
  D2: { points: [p(1690, 760), p(1580, 800), p(1450, 840), p(1320, 885), p(1180, 930), p(1040, 980), p(900, 1035), p(760, 1090), p(620, 1150), p(510, 1210), p(431, 1266)], label: p(1320, 900) },
  B2: { points: [p(2360, 420), p(2510, 465), p(2680, 495), p(2840, 555), p(2950, 635), p(2990, 715), p(2960, 785), p(2870, 835), p(2800, 855)], label: p(2920, 680) },
  A9: { points: [p(1655, 845), p(1660, 1020), p(1650, 1295)], label: p(1725, 1100) },
  A10: { points: [p(1510, 845), p(1505, 1030), p(1545, 1295)], label: p(1470, 960) },
  A7: { points: [p(1970, 805), p(1985, 990), p(1980, 1295)], label: p(2015, 980) },
  A8: { points: [p(1840, 810), p(1815, 990), p(1800, 1295)], label: p(1825, 1010) },
  B9: { points: [p(2030, 500), p(2100, 535), p(2180, 575), p(2260, 620)], label: p(2185, 555) },
  B10: { points: [p(2360, 420), p(2260, 430), p(2160, 450), p(2080, 480), p(2030, 500)], label: p(2190, 455) },
  B11: { points: [p(1940, 690), p(1970, 740), p(2010, 790), p(2050, 840)], label: p(2000, 805) },
  C8: { points: [p(1455, 410), p(1540, 460), p(1620, 520), p(1691, 575)], label: p(1585, 505) },
  B6: { points: [p(2460, 560), p(2470, 675), p(2465, 805), p(2455, 940), p(2445, 1080), p(2440, 1180)], label: p(2445, 810) },
  B8: { points: [p(2360, 420), p(2310, 470), p(2250, 535), p(2210, 610), p(2190, 680)], label: p(2260, 540) },
  C1: { points: [p(1990, 200), p(2035, 270), p(2060, 340), p(2050, 420), p(2030, 500)], label: p(2065, 315) },
  C2: { points: [p(2050, 300), p(2070, 360), p(2060, 420), p(2030, 500)], label: p(2060, 395) },
  C7: { points: [p(1970, 180), p(1870, 235), p(1760, 290), p(1650, 345), p(1550, 390), p(1455, 410)], label: p(1720, 285) },
  C9: { points: [p(1455, 410), p(1450, 485), p(1445, 560), p(1435, 640), p(1420, 705), p(1450, 760)], label: p(1490, 610) },
  C10: { points: [p(1455, 410), p(1430, 500), p(1380, 585), p(1320, 660), p(1250, 735), p(1170, 815), p(1080, 895), p(980, 975), p(870, 1050), p(750, 1120), p(620, 1180), p(500, 1230), p(431, 1266)], label: p(1285, 690) },
  B1: { points: [p(2360, 420), p(2450, 465), p(2550, 525), p(2650, 585), p(2740, 640), p(2800, 675)], label: p(2580, 520) },
  B3: { points: [p(2650, 505), p(2710, 530), p(2760, 570), p(2790, 620), p(2800, 675)], label: p(2715, 555) },
  B5: { points: [p(2460, 560), p(2540, 605), p(2630, 645), p(2720, 670), p(2800, 675)], label: p(2580, 620) },
  B7: { points: [p(2360, 420), p(2350, 510), p(2335, 600), p(2320, 690), p(2300, 760)], label: p(2335, 645) },
  B12: { points: [p(1990, 610), p(2050, 690), p(2100, 775), p(2130, 835)], label: p(2110, 680) },
  B13: { points: [p(1920, 610), p(1900, 690), p(1930, 770), p(1980, 820)], label: p(1940, 665) },
  B15: { points: [p(1900, 585), p(1810, 630), p(1800, 700), p(1860, 760)], label: p(1775, 610) },
  C5: { points: [p(1970, 210), p(1910, 300), p(1860, 395), p(1815, 500), p(1780, 590)], label: p(1865, 390) },
  C6: { points: [p(1880, 265), p(1770, 350), p(1650, 445), p(1690, 560)], label: p(1750, 415) },
};

export const referenceLiftGeometry: Record<string, ReferencePath> = {
  L3: { points: [p(431, 1266), p(760, 1080), p(1080, 820), p(1455, 410)], label: p(520, 1215) },
  L2: { points: [p(1640, 1325), p(1660, 1120), p(1740, 920), p(1790, 760)], label: p(1655, 1260) },
  L5: { points: [p(1945, 1325), p(1950, 1050), p(1960, 720), p(1970, 180)], label: p(1945, 1245) },
  L1: { points: [p(2350, 1300), p(2355, 1080), p(2360, 850), p(2360, 620), p(2360, 420)], label: p(2335, 990) },
  L7: { points: [p(2360, 420), p(2650, 470), p(2950, 520), p(3250, 555), p(3480, 575)], label: p(3180, 535) }
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
