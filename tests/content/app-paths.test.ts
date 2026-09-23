import { describe, expect, it } from "vitest";

import { appHref, routePathFromLocation } from "../../src/app-paths";

describe("GitHub Pages app paths", () => {
  it("builds links under the repository base path", () => {
    expect(appHref("/trails/fulong-b1", "/ski-trail-atlas/")).toBe(
      "/ski-trail-atlas/trails/fulong-b1",
    );
  });

  it("restores a trail route from a GitHub Pages pathname", () => {
    expect(
      routePathFromLocation(
        "/ski-trail-atlas/trails/fulong-b1",
        "",
        "/ski-trail-atlas/",
      ),
    ).toBe("/trails/fulong-b1");
  });

  it("accepts the 404 fallback route query", () => {
    expect(
      routePathFromLocation(
        "/ski-trail-atlas/",
        "?route=%2Ftrails%2Ffulong-b13",
        "/ski-trail-atlas/",
      ),
    ).toBe("/trails/fulong-b13");
  });
});
