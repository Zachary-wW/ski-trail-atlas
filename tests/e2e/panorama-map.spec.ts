import { expect, test } from "@playwright/test";

test("selects and highlights Trails through the Panorama Map", async ({ page }) => {
  await page.goto("/");

  const map = page.getByRole("region", { name: "Fulong Panorama Map" });
  await expect(map).toBeVisible();
  await expect(map.getByRole("link", { name: "A1 · 蓝调" })).toHaveAttribute("aria-current", "page");

  await map.getByRole("link", { name: "B1 · 摇滚" }).click();

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

  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width / 2 + 80, box.y + box.height / 2, { steps: 5 });
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

test("renders the evidence-backed major lift skeleton and topology anchors", async ({ page }) => {
  await page.goto("/");

  const map = page.getByRole("region", { name: "Fulong Panorama Map" });
  for (const code of ["L3", "L2", "L5", "L1"]) {
    await expect(map.locator(`[data-lift-code="${code}"]`)).toBeVisible();
  }

  await expect(map.locator('[data-topology-node="fulong-summit"]')).toBeVisible();
  await expect(map.locator('[data-topology-node="fulong-base"]')).toBeVisible();
  await expect(map.locator('[data-lift-code="L3"]')).toHaveAttribute(
    "data-topology-source",
    "chonglihuaxue-map-2026-09-23",
  );
});

test("keeps compact search above a dominant map and Trail details below it", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto("/");

  const search = page.getByRole("searchbox", { name: "Search trails" });
  const map = page.getByRole("region", { name: "Fulong Panorama Map" });
  const detail = page.locator(".trail-inspector");
  const searchBox = await search.boundingBox();
  const mapBox = await map.boundingBox();
  const detailBox = await detail.boundingBox();

  expect(searchBox).not.toBeNull();
  expect(mapBox).not.toBeNull();
  expect(detailBox).not.toBeNull();
  expect(searchBox!.width).toBeLessThanOrEqual(440);
  expect(mapBox!.width).toBeGreaterThan(1100);
  expect(detailBox!.y).toBeGreaterThanOrEqual(mapBox!.y + mapBox!.height - 2);

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
