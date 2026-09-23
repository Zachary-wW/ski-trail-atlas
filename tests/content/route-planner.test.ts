import { describe, expect, it } from "vitest";

import { publication } from "../../src/data/publication";
import { planRoute, planTrailRoute } from "../../src/routing/plan-trail-route";

describe("planTrailRoute", () => {
  it("routes from L5 bottom station to L5 top station as exactly one gondola segment", () => {
    const plan = planRoute(
      publication,
      { kind: "transport_station", id: "fulong-l5-bottom" },
      { kind: "transport_station", id: "fulong-l5-top" },
    );

    expect(plan).not.toBeNull();
    expect(plan?.segments.map((segment) => `${segment.kind}:${segment.code}:${segment.transportType ?? "-"}`)).toEqual([
      "transport:L5:gondola",
    ]);
  });

  it("routes from a Place endpoint at Fulong Base to the Summit without fake endpoint segments", () => {
    const plan = planRoute(
      publication,
      { kind: "place", id: "fulong-base-place" },
      { kind: "place", id: "fulong-summit-place" },
    );
    expect(plan?.segments.map((segment) => `${segment.kind}:${segment.code}`)).toEqual(["transport:L5"]);
  });

  it("returns an empty movement plan when two supported endpoints resolve to the same node", () => {
    const plan = planRoute(
      publication,
      { kind: "place", id: "fulong-base-place" },
      { kind: "transport_station", id: "fulong-l5-bottom" },
    );
    expect(plan).not.toBeNull();
    expect(plan?.segments).toEqual([]);
  });

  it("fails closed for an unsupported Station or Place endpoint", () => {
    expect(planRoute(
      publication,
      { kind: "transport_station", id: "missing-station" },
      { kind: "place", id: "fulong-summit-place" },
    )).toBeNull();
  });

  it("builds a directed Trail + Uphill Transport route without inventing connections", () => {
    const plan = planTrailRoute(publication, "fulong-b1", "fulong-d1");

    expect(plan).not.toBeNull();
    expect(plan?.segments.map((segment) => `${segment.kind}:${segment.code}`)).toEqual([
      "trail:B1",
      "transport:L5",
      "trail:C6",
      "trail:C8",
      "trail:C9",
      "trail:D1",
    ]);
    expect(plan?.season).toBe("2025-2026");
    expect(plan?.verificationState).toBe("unverified");
  });

  it("fails closed for an endpoint that is not in the published Trail topology", () => {
    expect(planTrailRoute(publication, "fulong-a1", "fulong-not-published")).toBeNull();
  });

  it("uses the selected Trail itself when origin and destination are the same", () => {
    const plan = planTrailRoute(publication, "fulong-a7", "fulong-a7");
    expect(plan?.segments.map((segment) => segment.code)).toEqual(["A7"]);
  });
});
