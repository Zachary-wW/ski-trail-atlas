import { expect, test } from "@playwright/test";

test("defaults to English and can switch the interface to Chinese", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("searchbox", { name: "Search trails" })).toHaveAttribute(
    "placeholder",
    "Search by name or code, e.g. B1",
  );
  await expect(page.locator("html")).toHaveAttribute("lang", "en");

  await page.getByRole("button", { name: "切换到中文" }).click();

  await expect(page.getByRole("searchbox", { name: "搜索雪道" })).toHaveAttribute(
    "placeholder",
    "输入名称或编号，例如 B1",
  );
  await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
});

test("searches the Fulong Trail Catalog by Trail name and code", async ({ page }) => {
  await page.goto("/");

  const searchSurface = page.locator(".catalog-section");
  const search = page.getByRole("searchbox", { name: "Search trails" });
  await expect(search).toBeVisible();
  await expect(searchSurface.getByRole("link")).toHaveCount(0);

  await search.fill("摇滚");
  await expect(searchSurface.getByRole("link", { name: "B1 · 摇滚" })).toBeVisible();
  await expect(searchSurface.getByRole("link", { name: "A1 · 蓝调" })).toHaveCount(0);

  await search.fill("B13");
  await expect(searchSurface.getByRole("link", { name: "B13 · 打击乐" })).toBeVisible();

  await search.clear();
  await expect(searchSurface.getByRole("link")).toHaveCount(0);
});

test("opens the selected Trail on its stable direct URL", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("searchbox", { name: "Search trails" }).fill("B1");
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
