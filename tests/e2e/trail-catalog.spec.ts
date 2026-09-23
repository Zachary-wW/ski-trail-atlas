import { expect, test } from "@playwright/test";

test("searches the Fulong Trail Catalog by Trail name and code", async ({ page }) => {
  await page.goto("/");

  const search = page.getByRole("searchbox", { name: "搜索雪道" });
  await expect(search).toBeVisible();
  await expect(page.getByRole("link", { name: "A1 · 蓝调" })).toBeVisible();

  await search.fill("摇滚");
  await expect(page.getByRole("link", { name: "B1 · 摇滚" })).toBeVisible();
  await expect(page.getByRole("link", { name: "A1 · 蓝调" })).toHaveCount(0);

  await search.fill("B13");
  await expect(page.getByRole("link", { name: "B13 · 打击乐" })).toBeVisible();
});

test("opens the selected Trail on its stable direct URL", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "B1 · 摇滚" }).click();

  await expect(page).toHaveURL(/\/trails\/fulong-b1$/);
  await expect(page.getByRole("heading", { name: "B1 · 摇滚" })).toBeVisible();
  await expect(page.getByText("高级道", { exact: true })).toBeVisible();
  await expect(page.getByText("22°", { exact: true })).toBeVisible();
});

test("shows an explicit empty state for an unknown Trail query", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("searchbox", { name: "搜索雪道" }).fill("不存在的雪道");

  await expect(page.getByText("没有匹配的雪道", { exact: true })).toBeVisible();
});

test("restores an incomplete Trail from a direct URL without inventing missing values", async ({ page }) => {
  await page.goto("/trails/fulong-d1");

  await expect(page.getByRole("heading", { name: "D1 · 咏叹" })).toBeVisible();
  await expect(page.getByText("初级道", { exact: true })).toBeVisible();
  await expect(page.getByText("平均坡度").locator("..")).toContainText("暂无数据");
  await expect(page.getByText("雪道长度").locator("..")).toContainText("暂无数据");
});
