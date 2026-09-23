export const MAP_WIDTH = 1000;
export const MAP_HEIGHT = 650;

export const REFERENCE_LAYOUT_BOUNDS = {
  x: 0,
  y: 75,
  width: 1000,
  height: 500,
} as const;

export const REFERENCE_SOURCE_CROP = {
  left: 80,
  top: 65,
  width: 3480,
  height: 1740,
} as const;

export type ReferencePixelPoint = { x: number; y: number };

export function referencePixelToMap(point: ReferencePixelPoint) {
  const normalizedX = (point.x - REFERENCE_SOURCE_CROP.left) / REFERENCE_SOURCE_CROP.width;
  const normalizedY = (point.y - REFERENCE_SOURCE_CROP.top) / REFERENCE_SOURCE_CROP.height;

  return {
    x: Math.round(REFERENCE_LAYOUT_BOUNDS.x + normalizedX * REFERENCE_LAYOUT_BOUNDS.width),
    y: Math.round(REFERENCE_LAYOUT_BOUNDS.y + normalizedY * REFERENCE_LAYOUT_BOUNDS.height),
  };
}

export const referenceCalibratedTrailIds = new Set(["fulong-c8"]);
export const referenceCalibratedLiftIds = new Set(["fulong-l3"]);
export const referenceControlNodeIds = new Set([
  "summit-main",
  "fulong-base",
  "west-base",
  "central-transport-base",
  "l7-east-sector",
  "ridge-west-high",
  "ridge-west-mid",
]);
