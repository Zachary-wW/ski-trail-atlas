import { describe, expect, it } from "vitest";
import { nodes, segments, trails, referenceFeatures, transports, findPilotRoute } from "../../src/map/prototype/fulong-trace-data";

describe("user-corrected tracing topology (not operational routing)", () => {
  it("joins D1, D2, A9 and A10 at the L2 upper station", () => {
    for (const code of ["D1", "D2", "A9", "A10"]) {
      expect(segments.find(s => s.trail === code)?.from).toBe("centralHub");
    }
    expect(transports.find(t => t.code === "L2")?.top).toMatchObject({
      x: nodes.centralHub.x, y: nodes.centralHub.y,
    });
  });

  it("records C11/C12 as user-reported existing trails, not old planned features", () => {
    for (const code of ["C11", "C12"]) {
      expect(trails.find(t => t.code === code)?.note).toContain("用户");
      expect(referenceFeatures.some(t => t.code === code)).toBe(false);
      expect(segments.filter(s => s.trail === code).length).toBeGreaterThan(0);
    }
  });

  it("removes F8/F9 from displayed transports and connects their neighboring run to teaching", () => {
    expect(transports.some(t => ["F8", "F9"].includes(t.code))).toBe(false);
    expect(segments.find(s => s.id === "central-lower-link")?.to).toBe("teaching");
  });

  it("joins both ends of B15 and the bottom of B13 to explicit shared junctions", () => {
    for (const run of segments.filter(s => s.trail === "B15" || s.trail === "B13")) {
      for (const node of [run.from, run.to]) {
        expect(segments.filter(s => s.from === node || s.to === node).length).toBeGreaterThan(1);
      }
    }
  });

  it("keeps segment identity and endpoints consistent", () => {
    expect(new Set(segments.map(s => s.id)).size).toBe(segments.length);
    for (const s of segments) {
      expect(nodes[s.from]).toBeDefined();
      expect(nodes[s.to]).toBeDefined();
      if (!s.trail && !s.featureCode) expect(s.note).toBeTruthy();
    }
  });

  it("keeps non-teaching trails in one undirected component without enabling reverse skiing", () => {
    const visited = new Set(["ridge"]);
    let changed = true;
    while (changed) {
      changed = false;
      for (const s of segments.filter(s => s.state !== "planned")) {
        if (visited.has(s.from) || visited.has(s.to)) {
          for (const id of [s.from, s.to]) if (!visited.has(id)) { visited.add(id); changed = true; }
        }
      }
    }
    const separateTeaching = new Set(["A1", "A2", "A3", "A5", "A6"]);
    expect(segments.filter(s => s.trail && !separateTeaching.has(s.trail))
      .filter(s => !visited.has(s.from) || !visited.has(s.to)).map(s => s.id)).toEqual([]);
    expect(findPilotRoute("teaching", "ridge")).toBeNull();
    expect(findPilotRoute("centralHub", "a9End")).toBeNull();
  });
});
