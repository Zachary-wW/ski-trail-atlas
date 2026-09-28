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

test("fans out L2 trails and keeps the B11 bend tangent-continuous", async ({ page }) => {
  await page.goto("/?prototype=fulong-trace");
  await expect(page.locator(".trace-line")).toHaveCount(segments.length);
  const result = await page.evaluate(() => {
    const pathFor = (id: string) => document.querySelector<SVGPathElement>(`[data-segment="${id}"] .trace-line`)!;
    const atX = (id: string, x: number) => {
      const path = pathFor(id);
      const points = Array.from({ length: Math.ceil(path.getTotalLength()) + 1 }, (_, i) => path.getPointAtLength(i));
      return points.reduce((a, b) => Math.abs(a.x - x) < Math.abs(b.x - x) ? a : b).y;
    };
    const gaps = [1700, 1600].map(x => {
      const ys = ["d2-main", "d1-main", "a10-main"].map(id => atX(id, x));
      return [ys[1] - ys[0], ys[2] - ys[1]];
    });
    const ids = ["b11-loop-entry", "b11-loop-middle", "b11-loop-exit", "b11-upper"];
    const angles = ids.slice(1).map((id, i) => {
      const prev = pathFor(ids[i]), next = pathFor(id);
      const a = prev.getPointAtLength(prev.getTotalLength() - 2);
      const joint = prev.getPointAtLength(prev.getTotalLength());
      const b = next.getPointAtLength(2);
      const u = { x: joint.x - a.x, y: joint.y - a.y }, v = { x: b.x - joint.x, y: b.y - joint.y };
      return Math.acos(Math.max(-1, Math.min(1, (u.x * v.x + u.y * v.y) / (Math.hypot(u.x, u.y) * Math.hypot(v.x, v.y))))) * 180 / Math.PI;
    });
    const lift = document.querySelector<SVGPathElement>('[data-transport="L5"] .trace-transport-line')!;
    const points = Array.from({ length: Math.ceil(lift.getTotalLength()) + 1 }, (_, i) => lift.getPointAtLength(i));
    return { gaps, angles, liftNearTopX: points.reduce((a, b) => Math.abs(a.y - 230) < Math.abs(b.y - 230) ? a : b).x };
  });
  for (const gap of result.gaps.flat()) expect(gap).toBeGreaterThan(15);
  for (const angle of result.angles) expect(angle).toBeLessThan(15);
  expect(result.liftNearTopX).toBeLessThan(1985);
});

test("keeps the summit arrival visible above cables, with uniform transparent trail strokes", async ({ page }) => {
  await page.goto("/?prototype=fulong-trace");
  await page.getByRole("button", { name: "山顶", exact: true }).click();
  // A shared endpoint alone did not prevent later cable casing from hiding the station.
  const station = page.locator('[data-terminal="1960,205"]');
  await expect(station).toHaveCount(1);
  await expect(station.locator("title")).toContainText("L3 / L5 / L7");
  const arrival = page.locator('[data-transport="L5"] .trace-transport-line');
  await expect(arrival).toHaveAttribute("marker-end", "url(#trace-transport-arrival)");
  for (const code of ["L3", "L5", "L7"]) {
    const aligned = await page.locator(`[data-transport="${code}"] .trace-transport-line`).evaluate(el => {
      const path = el as SVGPathElement;
      const point = path.getPointAtLength(path.getTotalLength());
      const box = document.querySelector<SVGRectElement>('[data-terminal="1960,205"] rect')!;
      return Math.hypot(point.x - box.x.baseVal.value - box.width.baseVal.value / 2,
        point.y - box.y.baseVal.value - box.height.baseVal.value / 2) < 0.01;
    });
    expect(aligned).toBe(true);
  }
  expect(await station.evaluate(el => Array.from(document.querySelectorAll(".trace-transport-line"))
    .every(line => !!(line.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING)))).toBe(true);
  await expect(page.getByLabel("透视叠加", { exact: true })).toBeChecked();
  for (const mode of ["叠加校准", "独立线稿"]) {
    await page.getByRole("button", { name: mode, exact: true }).click();
    await page.getByRole("button", { name: "C1", exact: true }).click();
    const widths = await page.locator(".trace-line").evaluateAll(lines =>
      [...new Set(lines.map(line => getComputedStyle(line).strokeWidth))]);
    expect(widths).toEqual(["3px"]);
    await expect(arrival).toHaveCSS("stroke-opacity", "0.7");
    await expect(page.locator(".trace-transport-casing")).toHaveCount(0);
    await expect(page.locator('[data-select-trail="C1"] .trace-label rect')).toHaveCSS("fill-opacity", "0.6");
    await expect(page.locator('[data-select-trail="C1"] .trace-label text')).toHaveCSS("opacity", "1");
  }
  await page.getByLabel("透视叠加", { exact: true }).uncheck();
  await expect(arrival).toHaveCSS("stroke-opacity", "1");
  await expect(page.locator('[data-station="l5Mid"] circle')).toHaveCSS("fill-opacity", "1");
  await page.getByLabel("透视叠加", { exact: true }).check();
  await page.getByRole("button", { name: "放大地图", exact: true }).click();
  await expect(page.locator('[data-segment="c1-upper"] .trace-line')).toHaveCSS("stroke-width", "3px");
  await page.getByLabel("起点", { exact: true }).selectOption("ridge");
  await page.getByLabel("终点", { exact: true }).selectOption("teaching");
  await page.getByRole("button", { name: "在图上演示 ↗", exact: true }).click();
  expect(await page.locator(".is-route .trace-line").count()).toBeGreaterThan(0);
  expect(await page.locator(".is-route .trace-line").evaluateAll(lines =>
    [...new Set(lines.map(line => getComputedStyle(line).strokeWidth))])).toEqual(["3px"]);
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
});

test("calibrates A7/A8 around the building gap and marks the L5 alighting station", async ({ page }) => {
  await page.goto("/?prototype=fulong-trace");
  await page.getByRole("button", { name: "中央 / 公园", exact: true }).click();
  // Native reference corridor bands, independent of the model's control points:
  // A8 is the nearly straight left branch; A7 bows right before returning downhill.
  const positions = await page.evaluate(() => ["a7-main", "a8-main"].map(id => {
    const path = document.querySelector<SVGPathElement>(`[data-segment="${id}"] .trace-line`)!;
    const points = Array.from({ length: Math.ceil(path.getTotalLength()) + 1 }, (_, i) => path.getPointAtLength(i));
    return [950, 1100].map(y => points.reduce((a, b) => Math.abs(a.y - y) < Math.abs(b.y - y) ? a : b).x);
  }));
  expect(positions[0][0]).toBeGreaterThan(2015);
  expect(positions[0][0]).toBeLessThan(2045);
  expect(positions[0][1]).toBeGreaterThan(1990);
  expect(positions[0][1]).toBeLessThan(2020);
  for (const x of positions[1]) { expect(x).toBeGreaterThan(1905); expect(x).toBeLessThan(1930); }
  await expect(page.locator('[data-barrier="b11-a7-a8"]')).toContainText("不直接联通");
  const station = page.locator('[data-station="l5Mid"]');
  await expect(station.locator("text")).toHaveText("L5 中途站 · 可下客");
  await expect(station.locator("circle")).toHaveAttribute("cx", "2005");
  await expect(station.locator("circle")).toHaveAttribute("cy", "553");
  await expect(station.locator("circle")).toHaveCSS("fill-opacity", "0");
  const stationLabelInFrame = await station.locator("text").evaluate(el => {
    const label = (el as SVGGraphicsElement).getBBox();
    const frame = (el as SVGGraphicsElement).ownerSVGElement!.viewBox.baseVal;
    return label.y >= frame.y && label.y + label.height <= frame.y + frame.height;
  });
  expect(stationLabelInFrame).toBe(true);
  await page.getByRole("button", { name: "山顶", exact: true }).click();
  await expect(page.locator('[data-place="summit"]')).toContainText("L3 / L5 / L7");
  await expect(page.locator('[data-place="restaurant"]')).toContainText("岚山餐厅");
  await expect(page.locator('[data-segment="c1-restaurant-link"]')).toHaveAttribute("data-routing-state", "excluded");
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
});

test("keeps B11 identity with uniform trails and visually distinct transports", async ({ page }) => {
  await page.goto("/?prototype=fulong-trace");
  await page.getByRole("button", { name: "B10 / B11 局部", exact: true }).click();
  await expect(page.locator(".trace-canvas")).toHaveAttribute("viewBox", "1720 380 800 610");
  await page.getByRole("button", { name: "B11", exact: true }).click();
  await expect(page.locator(".trace-segment.is-selected")).toHaveCount(4);
  await expect(page.locator('[data-select-trail="B11"] .trace-hit')).toHaveCount(4);
  for (const id of ["b11-l2-link", "b8-b7-link"]) {
    await expect(page.locator(`[data-segment="${id}"]`)).toHaveClass(/is-connector/);
    await expect(page.locator(`[data-segment="${id}"]`)).not.toHaveClass(/is-selected/);
  }
  await expect(page.locator('[data-segment="b12-lower"]')).not.toHaveClass(/is-selected/);
  await expect(page.getByLabel("用户标注色", { exact: true })).toHaveCount(0);
  await expect(page.locator("[data-annotation]")).toHaveCount(0);
  await expect(page.locator('[data-segment="b11-loop-entry"] .trace-line')).toHaveCSS("stroke", "rgb(9, 107, 148)");
  await page.getByRole("button", { name: "中央 / 公园", exact: true }).click();
  for (const mode of ["叠加校准", "独立线稿"]) {
    await page.getByRole("button", { name: mode, exact: true }).click();
    for (const id of ["b10-1", "b12-lower", "b11-l2-link", "a7-main", "a8-main"]) {
      await expect(page.locator(`[data-segment="${id}"] .trace-line`)).toHaveCSS("stroke", "rgb(36, 91, 94)");
      await expect(page.locator(`[data-segment="${id}"] .trace-line`)).toHaveCSS("stroke-dasharray", "none");
    }
    const lift = page.locator('[data-transport="L2"]');
    await expect(lift.locator(".trace-transport-line")).toHaveCSS("stroke", "rgb(117, 67, 160)");
    await expect(lift.locator(".trace-transport-line")).toHaveCSS("stroke-dasharray", "10px, 6px");
    await expect(page.locator('[data-transports~="L2"] rect.trace-station')).toHaveCount(2);
    await expect(page.locator('[data-transport-label="L2"] text')).toContainText("L2 索道");
    await expect(page.getByLabel("地图图例")).toContainText("方形站点");
  }
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
});
