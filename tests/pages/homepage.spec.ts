import { expect, test } from "@playwright/test";
import { readFileSync, existsSync } from "node:fs";

const base = "/ski-trail-atlas/";

test("visitor enters and leaves the Fulong map through the Chongli portal", async ({ page }) => {
  await page.goto(base);

  await expect(page.getByRole("heading", { level: 1, name: "崇礼滑雪指南" })).toBeVisible();
  await expect(page.getByText("开板信息待核验", { exact: true })).toBeVisible();

  await page.getByRole("link", { name: "进入富龙雪道地图" }).click();
  await expect(page).toHaveURL(`${base}resorts/fulong/map`);
  await expect(page.getByRole("region", { name: "富龙全图结构地图" })).toBeVisible();

  await page.getByRole("link", { name: "返回崇礼门户" }).click();
  await expect(page).toHaveURL(base);
  await expect(page.getByRole("heading", { level: 1, name: "崇礼滑雪指南" })).toBeVisible();
});

test("published Fulong entrances serve the full map without private raster or calibration controls", async ({ page }) => {
  const requests: string[] = [];
  const errors: string[] = [];
  page.on("request", (request) => requests.push(request.url()));
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => {
    if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
  });

  for (const suffix of ["resorts/fulong/map", "?prototype=fulong-trace", "?prototype=east-trace"]) {
    await page.goto(`${base}${suffix}`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("整张图，找到你的下一条雪道。");
    await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
    await expect(page.getByRole("region", { name: "富龙全图结构地图" })).toBeVisible();
    await expect(page.locator("[data-segment]")).toHaveCount(65);
    await expect(page.locator('[data-routing-state="excluded"]')).toHaveCount(51);
    await expect(page.locator("[data-transport]")).toHaveCount(9);
    await expect(page.locator(".trace-brand")).toHaveAttribute("href", base);
    await expect(page.locator("svg image")).toHaveCount(0);
    await expect(page.getByRole("button", { name: "高清原图" })).toHaveCount(0);
    await expect(page.getByRole("button", { name: "按住看原图" })).toHaveCount(0);
    await expect(page.getByRole("slider")).toHaveCount(0);
    await expect(page.getByText("本地样板 · 未核验", { exact: true })).toHaveCount(0);
  }
  expect(requests.filter((url) => /__reference|fulong-reference\.jpg|\.webp/.test(url))).toEqual([]);
  expect(errors).toEqual([]);
  expect(existsSync("dist/artifacts/reference/fulong-highres.webp")).toBe(false);
});

test("public map retains selection, shared geometry, and qualified route demonstration", async ({ page }) => {
  await page.goto(`${base}resorts/fulong/map`);
  await page.getByRole("button", { name: "中央 / 公园", exact: true }).click();
  await page.locator(".trace-trail-picker").getByRole("button", { name: "B11", exact: true }).click();
  await expect(page.locator(".trace-selection-heading strong")).toHaveText("B11");
  await expect(page.locator(".trace-segment.is-selected")).toHaveCount(4);
  await expect(page.locator('[data-station="l5Mid"] circle')).toHaveCSS("fill-opacity", "0");
  await page.getByRole("button", { name: "在图上演示 ↗" }).click();
  await expect(page.locator(".trace-route-result li")).toHaveCount(4);
  await expect(page.locator(".trace-segment.is-route")).toHaveCount(4);
  await expect(page.locator('.is-route[data-routing-state="excluded"]')).toHaveCount(0);
  await page.getByLabel("起点", { exact: true }).selectOption("summit");
  await page.getByLabel("终点", { exact: true }).selectOption("l3Base");
  await page.getByRole("button", { name: "在图上演示 ↗" }).click();
  await expect(page.locator(".trace-route-result")).toContainText("没有足够的已标注有向连接");
  await expect(page.locator(".trace-segment.is-route")).toHaveCount(0);
});

test("Pages deep links and unknown routes resolve without falling back to Fulong", async ({ page }) => {
  // Vite preview has SPA fallback; substitute the actual shipped 404 document
  // to exercise Pages' deep-link flow instead of relying on that fallback.
  await page.route(`**${base}trails/**`, async (route) => {
    await route.fulfill({ status: 404, contentType: "text/html", body: readFileSync("dist/404.html", "utf8") });
  });
  await page.route(`**${base}resorts/**`, async (route) => {
    await route.fulfill({ status: 404, contentType: "text/html", body: readFileSync("dist/404.html", "utf8") });
  });

  await page.goto(`${base}resorts/fulong/map`);
  await expect(page.getByRole("region", { name: "富龙全图结构地图" })).toBeVisible();
  await expect(page).toHaveURL(new RegExp(`${base}resorts/fulong/map$`));

  await page.goto(`${base}trails/fulong-b1`);
  await expect(page.getByRole("heading", { name: "B1 · 摇滚" })).toBeVisible();
  await expect(page).toHaveURL(new RegExp(`${base}trails/fulong-b1$`));
  await page.goto(`${base}?route=%2Ftrails%2Ffulong-d1`);
  await expect(page.getByRole("heading", { name: "D1 · 咏叹" })).toBeVisible();
  await page.goto(`${base}trails/not-a-real-trail`);
  await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
  await page.goto(`${base}resorts/not-a-real-resort/map`);
  await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
  await expect(page.getByRole("region", { name: "富龙全图结构地图" })).toHaveCount(0);
  await page.locator(".home-link").click();
  await expect(page.getByRole("heading", { name: "A1 · 蓝调" })).toBeVisible();
  await page.goto(base);
  await expect(page.getByRole("heading", { name: "崇礼滑雪指南" })).toBeVisible();
});

test("portal and public map are usable at 390px with a keyboard", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);

  const entry = page.getByRole("link", { name: "进入富龙雪道地图" });
  const entryBox = await entry.boundingBox();
  expect(entryBox).not.toBeNull();
  expect(entryBox!.height).toBeGreaterThanOrEqual(44);
  await entry.focus();
  await expect(entry).toBeFocused();
  await page.keyboard.press("Enter");

  await expect(page.getByRole("region", { name: "富龙全图结构地图" })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole("button", { name: "东侧 B 区", exact: true }).click();
  const canvas = page.locator(".trace-canvas");
  const frame = await canvas.getAttribute("viewBox");
  await canvas.focus();
  await page.keyboard.press("+");
  await expect(canvas).not.toHaveAttribute("viewBox", frame!);
  await page.keyboard.press("Home");
  await expect(canvas).toHaveAttribute("viewBox", frame!);
  await page.locator(".trace-trail-picker").getByRole("button", { name: "B1", exact: true }).click();
  await expect(page.locator(".trace-selection-heading strong")).toHaveText("B1");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
