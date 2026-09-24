import { expect, test } from "@playwright/test";
import { nodes, segments } from "../../src/map/prototype/fulong-trace-data";

test("traced runs do not cross away from an explicit shared junction", async ({ page }) => {
  await page.goto("/?prototype=fulong-trace");
  await expect(page.locator(".trace-line")).toHaveCount(segments.length);
  // Sample actual browser-rendered SVG curves, not guessed control-point bounds.
  // This excludes aerial transports and the historical planned E1 reference.
  const crossings = await page.evaluate(({ segments, nodes }) => {
    type Point = { x: number; y: number };
    const sub = (a: Point, b: Point) => ({ x: a.x - b.x, y: a.y - b.y });
    const cross = (a: Point, b: Point) => a.x * b.y - a.y * b.x;
    const paths = segments.filter(s => s.state !== "planned").map(segment => {
      const path = document.querySelector<SVGPathElement>(`[data-segment="${segment.id}"] .trace-line`)!;
      const length = path.getTotalLength();
      return {
        segment,
        points: Array.from({ length: Math.ceil(length / 3) + 1 }, (_, i) =>
          path.getPointAtLength(Math.min(i * 3, length))),
      };
    });
    const result: string[] = [];
    for (let i = 0; i < paths.length; i++) for (let j = i + 1; j < paths.length; j++) {
      const a = paths[i], b = paths[j];
      const shared = [a.segment.from, a.segment.to]
        .filter(id => id === b.segment.from || id === b.segment.to);
      let hit: Point | undefined;
      for (let x = 1; x < a.points.length && !hit; x++) for (let y = 1; y < b.points.length; y++) {
        const ap = a.points[x - 1], bp = b.points[y - 1];
        const r = sub(a.points[x], ap), s = sub(b.points[y], bp);
        const denominator = cross(r, s);
        if (Math.abs(denominator) < 1e-8) continue;
        const t = cross(sub(bp, ap), s) / denominator;
        const u = cross(sub(bp, ap), r) / denominator;
        if (t <= 0 || t >= 1 || u <= 0 || u >= 1) continue;
        const point = { x: ap.x + t * r.x, y: ap.y + t * r.y };
        // Three native-image pixels accommodate SVG flattening near endpoints.
        if (shared.some(id => Math.hypot(nodes[id].x - point.x, nodes[id].y - point.y) <= 3)) continue;
        hit = point;
        break;
      }
      if (hit) result.push(`${a.segment.id} × ${b.segment.id} @ ${Math.round(hit.x)},${Math.round(hit.y)}`);
    }
    return result;
  }, { segments, nodes });
  expect(crossings).toEqual([]);
});

test("shows user corrections without presenting them as live operating status", async ({ page }) => {
  await page.goto("/?prototype=fulong-trace");
  await page.getByRole("button", { name: "西侧 L3", exact: true }).click();
  await page.getByRole("button", { name: "C11", exact: true }).click();
  await expect(page.locator(".trace-feature-note")).toContainText("用户");
  await expect(page.locator('[data-segment="c11-main"]')).not.toHaveClass(/is-planned/);
  await expect(page.locator('[data-segment="c11-main"]')).toHaveAttribute("data-routing-state", "excluded");
  await expect(page.locator('[data-transport="F8"], [data-transport="F9"]')).toHaveCount(0);
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
});
