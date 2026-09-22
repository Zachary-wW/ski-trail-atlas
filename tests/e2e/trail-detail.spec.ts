import { expect, test } from "@playwright/test";

function parseRgb(color: string) {
  const channels = color.match(/\d+(?:\.\d+)?/g)?.slice(0, 3).map(Number);

  if (!channels || channels.length !== 3) {
    throw new Error(`Unsupported color: ${color}`);
  }

  return channels;
}

function luminance(channels: number[]) {
  const [red, green, blue] = channels.map((channel) => {
    const normalized = channel / 255;
    return normalized <= 0.04045
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function contrastRatio(foreground: string, background: string) {
  const lighter = Math.max(luminance(parseRgb(foreground)), luminance(parseRgb(background)));
  const darker = Math.min(luminance(parseRgb(foreground)), luminance(parseRgb(background)));
  return (lighter + 0.05) / (darker + 0.05);
}

test("opens the evidence-backed A1 Trail detail from a direct URL", async ({ page }) => {
  await page.goto("/trails/fulong-a1");

  await expect(page.getByRole("heading", { name: "A1 · 蓝调" })).toBeVisible();
  await expect(page.getByText("初级道", { exact: true })).toBeVisible();
  await expect(page.getByText("7°", { exact: true })).toBeVisible();
  await expect(page.getByText("最大坡度").locator("..")).toContainText("暂无数据");
  await expect(
    page.getByRole("banner").getByText("2025–2026 雪季", { exact: true }),
  ).toBeVisible();
  await expect(page.getByText("资料待交叉验证", { exact: true }).first()).toBeVisible();

  const source = page.getByRole("link", {
    name: "崇礼富龙滑雪场雪道参数及雪道总览图",
  });
  await expect(source).toHaveAttribute(
    "href",
    "https://www.chonglihuaxue.cn/info.asp?id=167",
  );
});

test("does not render A1 for an unknown Trail route", async ({ page }) => {
  await page.goto("/trails/not-a-real-trail");

  await expect(page.getByRole("heading", { name: "页面不存在" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "A1 · 蓝调" })).toHaveCount(0);
});

test("renders missing data with WCAG AA text contrast", async ({ page }) => {
  await page.goto("/trails/fulong-a1");

  const foreground = await page
    .getByText("暂无数据", { exact: true })
    .evaluate((element) => getComputedStyle(element).color);
  const background = await page
    .locator(".metrics-panel")
    .evaluate((element) => getComputedStyle(element).backgroundColor);

  expect(contrastRatio(foreground, background)).toBeGreaterThanOrEqual(4.5);
});

test("renders small secondary text with WCAG AA contrast", async ({ page }) => {
  await page.goto("/trails/fulong-a1");

  const selectors = [
    ".eyebrow.dark",
    ".data-note",
    ".metric dt",
    ".context-note",
    ".source-label",
    ".source-card > p",
    ".source-card dt",
    ".verification-line p",
    "footer",
  ];

  for (const selector of selectors) {
    const colors = await page.locator(selector).first().evaluate((element) => {
      let backgroundElement: Element | null = element;
      let background = "rgba(0, 0, 0, 0)";

      while (backgroundElement && background.endsWith(", 0)")) {
        background = getComputedStyle(backgroundElement).backgroundColor;
        backgroundElement = backgroundElement.parentElement;
      }

      return {
        foreground: getComputedStyle(element).color,
        background,
      };
    });

    expect(
      contrastRatio(colors.foreground, colors.background),
      `${selector} should have at least 4.5:1 contrast`,
    ).toBeGreaterThanOrEqual(4.5);
  }
});
