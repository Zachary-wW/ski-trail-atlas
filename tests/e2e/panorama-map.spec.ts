import { expect, test } from "@playwright/test";

test("selects and highlights Trails through the Panorama Map", async ({ page }) => {
  await page.goto("/");

  const map = page.getByRole("region", { name: "Fulong Panorama Map" });
  await expect(map).toBeVisible();
  await expect(map.getByRole("link", { name: "A1 · 蓝调" })).toHaveAttribute("aria-current", "page");

  await map.getByRole("link", { name: "B1 · 摇滚" }).locator(".trail-label").click();

  await expect(page).toHaveURL(/\/trails\/fulong-b1$/);
  await expect(page.getByRole("heading", { name: "B1 · 摇滚" })).toBeVisible();
  await expect(
    page.getByRole("region", { name: "Fulong Panorama Map" }).getByRole("link", { name: "B1 · 摇滚" }),
  ).toHaveAttribute("aria-current", "page");
  await expect(page.locator(".panorama-viewport svg")).not.toHaveAttribute("viewBox", "0 0 1000 650");
});

test("supports keyboard zoom and pan plus pointer panning", async ({ page }) => {
  await page.goto("/");

  const map = page.getByRole("region", { name: "Fulong Panorama Map" });
  const viewport = map.locator(".panorama-viewport");
  const svg = viewport.locator("svg");

  await expect(svg).toHaveAttribute("viewBox", "0 0 1000 650");

  await viewport.focus();
  await page.keyboard.press("+");
  const zoomedView = await svg.getAttribute("viewBox");
  expect(zoomedView).not.toBe("0 0 1000 650");

  await page.keyboard.press("ArrowRight");
  const keyboardPannedView = await svg.getAttribute("viewBox");
  expect(keyboardPannedView).not.toBe(zoomedView);

  await map.getByRole("button", { name: "Reset map" }).click();
  await expect(svg).toHaveAttribute("viewBox", "0 0 1000 650");

  await map.getByRole("button", { name: "Zoom in" }).click();
  const beforeDrag = await svg.getAttribute("viewBox");
  const box = await svg.boundingBox();
  if (!box) throw new Error("Map SVG has no bounding box");

  const dragX = box.x + box.width * 0.08;
  const dragY = box.y + box.height * 0.12;
  await page.mouse.move(dragX, dragY);
  await page.mouse.down();
  await page.mouse.move(dragX + 80, dragY, { steps: 5 });
  await page.mouse.up();

  expect(await svg.getAttribute("viewBox")).not.toBe(beforeDrag);
});

test("shows season, verification date, evidence, and a non-navigation disclaimer", async ({ page }) => {
  await page.goto("/");

  const map = page.getByRole("region", { name: "Fulong Panorama Map" });
  await expect(map.getByText("2025–2026", { exact: true })).toBeVisible();
  await expect(map.getByText("2026-09-23", { exact: true })).toBeVisible();
  await expect(map.getByText("Location evidence unverified", { exact: true })).toBeVisible();
  await expect(
    map.getByText("Schematic relative topology only · Not for on-mountain navigation", { exact: true }),
  ).toBeVisible();
  await expect(map.getByRole("link", { name: /Topology evidence/ })).toHaveAttribute(
    "href",
    "https://www.chonglihuaxue.cn/info.asp?id=167",
  );
});

test("renders the evidence-backed major Uphill Transport skeleton and topology anchors", async ({ page }) => {
  await page.goto("/");

  const map = page.getByRole("region", { name: "Fulong Panorama Map" });
  for (const code of ["L3", "L2", "L5", "L1", "L7"]) {
    await expect(map.locator(`[data-uphill-transport-code="${code}"]`)).toBeVisible();
  }

  await expect(map.locator('[data-topology-node="summit-main"]')).toBeVisible();
  await expect(map.locator('[data-topology-node="fulong-base"]')).toBeVisible();
  await expect(map.locator('[data-uphill-transport-code="L3"]')).toHaveAttribute(
    "data-topology-source",
    "chonglihuaxue-map-2026-09-23",
  );
  await expect(map.locator("[data-trail-id]")).toHaveCount(33);
  for (const plannedCode of ["C11", "C12", "E1"]) {
    await expect(map.getByRole("link", { name: new RegExp(`^${plannedCode} ·`) })).toHaveCount(0);
  }
});

test("keeps the C8 plus L3 tracer slice reference-calibrated and interactive", async ({ page }) => {
  await page.goto("/");

  const map = page.getByRole("region", { name: "Fulong Panorama Map" });
  const c8 = map.getByRole("link", { name: "C8 · 约德尔" });
  const l3 = map.locator('[data-uphill-transport-code="L3"]');

  await expect(c8).toHaveAttribute("data-layout-fidelity", "reference-calibrated");
  await expect(l3).toHaveAttribute("data-layout-fidelity", "reference-calibrated");

  await c8.locator(".trail-label").click();
  await expect(page).toHaveURL(/\/trails\/fulong-c8$/);
  await expect(c8).toHaveAttribute("aria-current", "page");
  await expect(page.locator(".panorama-viewport svg")).not.toHaveAttribute("viewBox", "0 0 1000 650");
});


test("uses the reference layout for every published Trail and major Uphill Transport while keeping map-only lines inert", async ({ page }) => {
  await page.goto("/");

  const map = page.getByRole("region", { name: "Fulong Panorama Map" });
  await expect(map.locator('[data-trail-id][data-layout-fidelity="reference-calibrated"]')).toHaveCount(33);
  await expect(map.locator('[data-uphill-transport-code][data-layout-fidelity="reference-calibrated"]')).toHaveCount(5);
  await expect(map.locator('[data-uphill-transport-code="L5"]')).toHaveAttribute("data-transport-type", "gondola");
  await expect(map.locator('[data-uphill-transport-code="L2"]')).toHaveAttribute("data-transport-type", "chairlift");
  await expect(map.locator('[data-layout-fidelity="legacy-schematic"]')).toHaveCount(0);

  for (const code of ["C11", "C12", "C13", "E1"]) {
    await expect(map.locator(`[data-reference-feature="${code}"]`)).toBeVisible();
    await expect(map.getByRole("link", { name: new RegExp(`^${code} ·`) })).toHaveCount(0);
  }
});

test("keeps reference-calibrated Trail and transport labels from materially overlapping", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto("/");

  const labels = page.getByRole("region", { name: "Fulong Panorama Map" }).locator(".trail-label, .lift-label");
  const boxes = await labels.evaluateAll((elements) => elements.map((element) => {
    const box = element.getBoundingClientRect();
    return { label: element.textContent?.trim() ?? "", x: box.x, y: box.y, width: box.width, height: box.height };
  }));

  const overlaps: string[] = [];
  for (let left = 0; left < boxes.length; left += 1) {
    for (let right = left + 1; right < boxes.length; right += 1) {
      const a = boxes[left];
      const b = boxes[right];
      const width = Math.max(0, Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x));
      const height = Math.max(0, Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y));
      if (width * height > 18) overlaps.push(`${a.label}/${b.label}`);
    }
  }

  expect(overlaps).toEqual([]);
});

test("keeps compact controls above a dominant map with a non-overlapping desktop right inspector", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto("/");

  const search = page.getByRole("searchbox", { name: "Search trails" });
  const map = page.getByRole("region", { name: "Fulong Panorama Map" });
  const inspector = page.locator(".atlas-inspector-column");
  const searchBox = await search.boundingBox();
  const mapBox = await map.boundingBox();
  const inspectorBox = await inspector.boundingBox();

  expect(searchBox).not.toBeNull();
  expect(mapBox).not.toBeNull();
  expect(inspectorBox).not.toBeNull();
  expect(searchBox!.width).toBeLessThanOrEqual(440);
  expect(mapBox!.width).toBeGreaterThan(inspectorBox!.width * 2);
  expect(inspectorBox!.x).toBeGreaterThanOrEqual(mapBox!.x + mapBox!.width - 2);
  expect(Math.abs(inspectorBox!.y - mapBox!.y)).toBeLessThanOrEqual(2);

  const searchFontSize = await search.evaluate((element) => Number.parseFloat(getComputedStyle(element).fontSize));
  expect(searchFontSize).toBeGreaterThanOrEqual(14);
});

test("keeps mobile query-first without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const search = page.getByRole("searchbox", { name: "Search trails" });
  const map = page.getByRole("region", { name: "Fulong Panorama Map" });
  const searchBox = await search.boundingBox();
  const mapBox = await map.boundingBox();

  expect(searchBox).not.toBeNull();
  expect(mapBox).not.toBeNull();
  expect(searchBox!.y).toBeLessThan(mapBox!.y);

  const dimensions = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
  }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.innerWidth);
});
