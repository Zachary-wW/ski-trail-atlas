import { describe, expect, it } from "vitest";
import { nodes, segments, trails, referenceFeatures, transports, findPilotRoute } from "../../src/map/prototype/fulong-trace-data";

describe("user-corrected tracing topology (not operational routing)", () => {
  it("branches C5 directly from a shared node on C7", () => {
    const start = segments.find(s => s.trail === "C5")!.from;
    expect(segments.filter(s => s.trail === "C7" && (s.from === start || s.to === start))).toHaveLength(2);
  });

  it("removes the non-trail short stub left of C1 without removing C2 below the merge", () => {
    expect(segments.some(s => s.id === "c2-branch")).toBe(false);
    expect(nodes.c2Upper).toBeUndefined();
    expect(segments.some(s => s.trail === "C2" && s.from === "c1c2Merge")).toBe(true);
  });

  it("branches A7 and A8 from exactly the same node", () => {
    expect(segments.find(s => s.trail === "A7")!.from).toBe(segments.find(s => s.trail === "A8")!.from);
    expect(segments.some(s => s.id === "a8-a7-link")).toBe(false);
  });
  it("keeps the A7/A8 fork on the L2 approach, separate from B11", () => {
    const fork = segments.find(s => s.trail === "A7")!.from;
    expect(segments.filter(s => s.trail === "B11").some(s => s.from === fork || s.to === fork)).toBe(false);
    expect(nodes[fork]).toMatchObject({ x: 1918, y: 820 });
    expect(segments.find(s => s.id === "l2-a8-link")?.to).toBe(fork);
  });
  it("connects C1 to the restaurant below E1 as a separate pending ground corridor", () => {
    const link = segments.find(s => s.id === "c1-restaurant-link");
    expect(link).toBeDefined();
    expect(link).toMatchObject({ to: "ridge", trail: null, direction: "pending" });
    expect(segments.filter(s => s.trail === "C1" && (s.from === link?.from || s.to === link?.from))).toHaveLength(2);
  });
  it("joins L3 L5 L7 at the same summit without moving the western trail junction", () => {
    for (const code of ["L3", "L5", "L7"]) {
      expect(transports.find(t => t.code === code)?.top).toBe(nodes.summit);
    }
    expect(nodes.l3Top).toMatchObject({ x: 1494, y: 455 });
  });
  it("starts C1 C3 C7 at the shared summit rather than a nearby detached point", () => {
    for (const id of ["c1-upper", "c3-summit", "c7-upper"]) {
      expect(segments.find(s => s.id === id)?.from).toBe("summit");
    }
    expect(nodes.c3Upper).toBeUndefined();
  });
  it("records the L5 intermediate alighting station independently of nearby trails", () => {
    const lift = transports.find(t => t.code === "L5");
    expect(lift).toHaveProperty("intermediateStations", [
      { nodeId: "l5Mid", name: "L5 中途站 · 可下客", alighting: true },
    ]);
    expect(nodes.l5Mid).toMatchObject({ x: 2005, y: 553 });
    expect(segments.some(s => s.from === "l5Mid" || s.to === "l5Mid")).toBe(false);
  });
  it("follows the annotated B11 loop instead of labeling the L2 shortcut or lower black run B11", () => {
    expect(segments.filter(s => s.trail === "B11").map(s => [s.from, s.to])).toEqual([
      ["central", "b15End"], ["b15End", "b13End"],
      ["b13End", "b11Upper"], ["b11Upper", "b12End"],
    ]);
    expect(segments.find(s => s.from === "b12End" && s.to === "westLower")?.trail).toBe("B12");
    expect(segments.find(s => s.from === "b8Merge" && s.to === "westMerge")?.trail).toBeNull();
    expect(segments.find(s => s.from === "b15End" && s.to === "centralHub")?.trail).toBeNull();
  });
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
