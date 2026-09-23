import { describe, expect, it } from "vitest";

import { publication } from "../../src/data/publication";
import { REFERENCE_LAYOUT_BOUNDS, referencePixelToMap } from "../../src/map/fulong-reference-frame";
import {
  referenceCalibratedLiftIds,
  referenceCalibratedTrailIds,
  referenceTrailGeometry,
} from "../../src/map/fulong-reference-geometry";

const expectedReferenceAnchors = {
  "summit-main": { x: 0.543, y: 0.066 },
  "fulong-base": { x: 0.621, y: 0.739 },
  "west-base": { x: 0.101, y: 0.69 },
  "central-transport-base": { x: 0.519, y: 0.712 },
  "l7-east-sector": { x: 0.977, y: 0.293 },
  "ridge-west-high": { x: 0.395, y: 0.198 },
  "ridge-west-mid": { x: 0.463, y: 0.293 },
} as const;

function normalizedReferencePosition(node: { x: number; y: number }) {
  return {
    x: (node.x - REFERENCE_LAYOUT_BOUNDS.x) / REFERENCE_LAYOUT_BOUNDS.width,
    y: (node.y - REFERENCE_LAYOUT_BOUNDS.y) / REFERENCE_LAYOUT_BOUNDS.height,
  };
}

describe("Fulong reference-layout calibration", () => {
  it("keeps cross-mountain control anchors near their measured high-resolution reference positions", () => {
    const nodes = new Map(publication.mapNodes.map((node) => [node.id, node]));

    for (const [id, expected] of Object.entries(expectedReferenceAnchors)) {
      const node = nodes.get(id);
      expect(node, `missing calibration anchor ${id}`).toBeDefined();
      const normalized = normalizedReferencePosition(node!);
      expect(normalized.x, `${id}.x`).toBeCloseTo(expected.x, 2);
      expect(normalized.y, `${id}.y`).toBeCloseTo(expected.y, 2);
    }
  });

  it("calibrates every published Trail and supported major Uphill Transport to the reference frame", () => {
    expect(referenceCalibratedTrailIds.size).toBe(33);
    expect(referenceCalibratedLiftIds.size).toBe(5);

    for (const trail of publication.trails) {
      expect(referenceCalibratedTrailIds.has(trail.id)).toBe(true);
    }

    for (const transport of publication.uphillTransports) {
      expect(referenceCalibratedLiftIds.has(transport.id)).toBe(true);
    }
  });

  it("keeps the central and east control nodes on the measured source junctions", () => {
    const nodes = new Map(publication.mapNodes.map((node) => [node.id, node]));
    const expected = {
      "center-high": referencePixelToMap({ x: 2030, y: 500 }),
      "east-high": referencePixelToMap({ x: 2360, y: 420 }),
      "east-upper": referencePixelToMap({ x: 2460, y: 560 }),
      "east-mid": referencePixelToMap({ x: 2800, y: 675 }),
    } as const;

    for (const [id, point] of Object.entries(expected)) {
      expect(nodes.get(id)?.x, `${id}.x`).toBe(point.x);
      expect(nodes.get(id)?.y, `${id}.y`).toBe(point.y);
    }
  });

  it("connects the calibrated C8 tracer Trail to the calibrated L3 top station", () => {
    const c8 = publication.trailLocations.find((location) => location.trailId === "fulong-c8");
    const l3 = publication.uphillTransports.find((transport) => transport.code === "L3");

    expect(c8).toBeDefined();
    expect(l3).toBeDefined();
    expect(c8?.fromNodeId).toBe("ridge-west-high");
    expect(l3?.topStation.nodeId).toBe("ridge-west-high");
    expect(c8?.source.permittedUse).toBe("reference_only");
    expect(l3?.source.permittedUse).toBe("reference_only");
  });

  it("keeps the west-sector source geometry tied to the L3 reference stations", () => {
    const locations = new Map(publication.trailLocations.map((location) => [location.trailId, location]));

    expect(referenceTrailGeometry.C3.points.at(-1)).toEqual({ x: 431, y: 1266 });
    expect(referenceTrailGeometry.D1.points.at(-1)).toEqual({ x: 431, y: 1266 });
    expect(referenceTrailGeometry.D2.points.at(-1)).toEqual({ x: 431, y: 1266 });
    expect(referenceTrailGeometry.C7.points[0]).toEqual({ x: 1970, y: 180 });
    expect(referenceTrailGeometry.C7.points.at(-1)).toEqual({ x: 1455, y: 410 });

    expect(locations.get("fulong-c3")?.fromNodeId).toBe("west-upper");
    expect(locations.get("fulong-c3")?.toNodeId).toBe("west-base");
    expect(locations.get("fulong-c7")?.fromNodeId).toBe("summit-main");
    expect(locations.get("fulong-c7")?.toNodeId).toBe("ridge-west-high");
    expect(locations.get("fulong-c9")?.fromNodeId).toBe("ridge-west-high");
    expect(locations.get("fulong-c9")?.toNodeId).toBe("west-upper");
  });
});
