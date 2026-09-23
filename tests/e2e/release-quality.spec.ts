import { expect, test } from "@playwright/test";

import { publication } from "../../src/data/publication";

test("all 33 published Trails are searchable and have stable direct routes", async ({ page }) => {
  await page.goto("/");
  const searchSurface = page.locator(".catalog-section");
  const search = page.getByRole("searchbox", { name: "Search trails" });

  for (const trail of publication.trails) {
    await search.fill(trail.code);
    await expect(
      searchSurface.getByRole("link", { name: `${trail.code} · ${trail.name}`, exact: true }),
      `${trail.code} should be searchable`,
    ).toBeVisible();
  }

  for (const trail of publication.trails) {
    await page.goto(`/trails/${trail.id}`);
    await expect(
      page.getByRole("heading", { name: `${trail.code} · ${trail.name}`, exact: true }),
      `${trail.code} direct route should render its Trail detail`,
    ).toBeVisible();
  }
});

test("provides a skip link, a single top-level heading, and readable core text", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto("/");

  const h1 = page.getByRole("heading", { level: 1 });
  await expect(h1).toHaveCount(1);
  await expect(h1).toHaveText("Fulong Trail Atlas");

  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to main content" });
  await expect(skip).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();

  const search = page.getByRole("searchbox", { name: "Search trails" });
  await search.fill("B1");
  const searchMetaSize = await page.locator(".trail-name small").first().evaluate((element) =>
    Number.parseFloat(getComputedStyle(element).fontSize),
  );
  expect(searchMetaSize).toBeGreaterThanOrEqual(12);

  const metricLabelSize = await page.locator(".inspector-metric dt").first().evaluate((element) =>
    Number.parseFloat(getComputedStyle(element).fontSize),
  );
  expect(metricLabelSize).toBeGreaterThanOrEqual(12);

  await page.getByRole("button", { name: "Plan route" }).click();
  const planner = page.getByRole("region", { name: "Route planner" });
  const plannerLabelSize = await planner.locator("label > span").first().evaluate((element) =>
    Number.parseFloat(getComputedStyle(element).fontSize),
  );
  expect(plannerLabelSize).toBeGreaterThanOrEqual(12);

  await planner.getByLabel("Start trail").selectOption("fulong-b1");
  await planner.getByLabel("Destination trail").selectOption("fulong-d1");
  await planner.getByRole("button", { name: "Build route" }).click();
  const routeStepMetaSize = await page.locator(".route-step-copy small").first().evaluate((element) =>
    Number.parseFloat(getComputedStyle(element).fontSize),
  );
  expect(routeStepMetaSize).toBeGreaterThanOrEqual(12);

  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute("content", "#eeece4");
});
