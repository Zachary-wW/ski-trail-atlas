import { expect, test } from "@playwright/test";

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
