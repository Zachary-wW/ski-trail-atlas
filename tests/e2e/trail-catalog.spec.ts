import { expect, test } from "@playwright/test";

test("defaults to English and can switch the interface to Chinese", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Find a trail" })).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");

  await page.getByRole("button", { name: "切换到中文" }).click();

  await expect(page.getByRole("heading", { name: "查找雪道" })).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
});

test("searches the Fulong Trail Catalog by Trail name and code", async ({ page }) => {
  await page.goto("/");

  const catalog = page.locator(".catalog-section");

  const search = page.getByRole("searchbox", { name: "Search trails" });
  await expect(search).toBeVisible();
  await expect(catalog.getByRole("link", { name: "A1 · 蓝调" })).toBeVisible();

  await search.fill("摇滚");
  await expect(catalog.getByRole("link", { name: "B1 · 摇滚" })).toBeVisible();
  await expect(catalog.getByRole("link", { name: "A1 · 蓝调" })).toHaveCount(0);

  await search.fill("B13");
  await expect(catalog.getByRole("link", { name: "B13 · 打击乐" })).toBeVisible();
});

test("opens the selected Trail on its stable direct URL", async ({ page }) => {
  await page.goto("/");

  await page.locator(".catalog-section").getByRole("link", { name: "B1 · 摇滚" }).click();

  await expect(page).toHaveURL(/\/trails\/fulong-b1$/);
  await expect(page.getByRole("heading", { name: "B1 · 摇滚" })).toBeVisible();
  await expect(page.getByText("Advanced", { exact: true })).toBeVisible();
  await expect(page.getByText("22°", { exact: true })).toBeVisible();
});

test("shows an explicit empty state for an unknown Trail query", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("searchbox", { name: "Search trails" }).fill("not-a-real-trail");

  await expect(page.getByText("No matching trails", { exact: true })).toBeVisible();
});

test("restores an incomplete Trail from a direct URL without inventing missing values", async ({ page }) => {
  await page.goto("/trails/fulong-d1");

  await expect(page.getByRole("heading", { name: "D1 · 咏叹" })).toBeVisible();
  await expect(page.getByText("Beginner", { exact: true })).toBeVisible();
  await expect(page.getByText("Average slope").locator("..")).toContainText("Unavailable");
  await expect(page.getByText("Length").locator("..")).toContainText("Unavailable");
});
