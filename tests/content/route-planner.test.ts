import { describe, expect, it } from "vitest";

import { publication } from "../../src/data/publication";
import { planTrailRoute } from "../../src/routing/plan-trail-route";

describe("planTrailRoute", () => {
  it("builds a directed Trail + Lift route without inventing connections", () => {
    const plan = planTrailRoute(publication, "fulong-b1", "fulong-d1");

    expect(plan).not.toBeNull();
    expect(plan?.segments.map((segment) => `${segment.kind}:${segment.code}`)).toEqual([
      "trail:B1",
      "lift:L5",
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
