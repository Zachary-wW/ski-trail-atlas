import { describe, expect, it } from "vitest";

import { publication } from "../../src/data/publication";

const publishedCodes = [
  "A1", "A2", "A3", "A5", "A6", "C3", "D1", "D2", "B2", "A9", "A10",
  "A7", "A8", "B9", "B10", "B11", "C8", "B6", "B8", "C1", "C2", "C7",
  "C9", "C10", "B1", "B3", "B5", "B7", "B12", "B13", "B15", "C5", "C6",
];

describe("Fulong global publication", () => {
  it("publishes exactly the 33 source-listed Trails and excludes planning-only lines", () => {
    expect(publication.trails).toHaveLength(33);
    expect(publication.trails.map((trail) => trail.code)).toEqual(publishedCodes);
    expect(publication.trails.map((trail) => trail.code)).not.toEqual(expect.arrayContaining(["C11", "C12", "E1"]));
  });

  it("publishes one routable evidence-backed location for every Trail", () => {
    expect(publication.trailLocations).toHaveLength(33);
    const nodeIds = new Set(publication.mapNodes.map((node) => node.id));

    for (const location of publication.trailLocations) {
      expect(nodeIds.has(location.fromNodeId)).toBe(true);
      expect(nodeIds.has(location.toNodeId)).toBe(true);
      expect(location.source.id).toBe("chonglihuaxue-map-2026-09-23");
    }
  });

  it("keeps the five major visible lifts including L7", () => {
    expect(publication.lifts.map((lift) => lift.code)).toEqual(expect.arrayContaining(["L1", "L2", "L3", "L5", "L7"]));
  });

  it("preserves source-specific difficulty categories", () => {
    const byCode = new Map(publication.trails.map((trail) => [trail.code, trail]));
    expect(byCode.get("B2")?.publishedFields.difficulty?.value).toBe("beginner_intermediate");
    expect(byCode.get("A9")?.publishedFields.difficulty?.value).toBe("park");
    expect(byCode.get("B6")?.publishedFields.difficulty?.value).toBe("intermediate_advanced");
  });
});
