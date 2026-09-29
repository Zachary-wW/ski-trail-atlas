import { expect, test } from "@playwright/test";

test("development root enters Fulong through the Chongli portal", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1, name: "崇礼滑雪指南" })).toBeVisible();
  await expect(page.getByText("开板信息待核验", { exact: true })).toBeVisible();

  await page.getByRole("link", { name: "进入富龙雪道地图" }).click();
  await expect(page).toHaveURL(/\/resorts\/fulong\/map$/);
  await expect(page.getByRole("region", { name: "富龙全图结构地图" })).toBeVisible();
});
