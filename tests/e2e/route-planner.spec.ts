import { expect, test } from "@playwright/test";

test("plans and highlights a schematic route across Trails and a Lift", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Plan route" }).click();
  const planner = page.getByRole("region", { name: "Route planner" });
  await planner.getByLabel("Start trail").selectOption("fulong-b1");
  await planner.getByLabel("Destination trail").selectOption("fulong-d1");
  await planner.getByRole("button", { name: "Build route" }).click();

  const plan = page.getByRole("region", { name: "Schematic route plan" });
  await expect(plan).toBeVisible();
  await expect(plan.getByText("B1 · 摇滚", { exact: true })).toBeVisible();
  await expect(plan.getByText("L5", { exact: true })).toBeVisible();
  await expect(plan.getByText("D1 · 咏叹", { exact: true })).toBeVisible();
  await expect(plan).toContainText("Schematic only");
  await expect(plan).toContainText("not live operating or safety guidance");
  await expect(plan).toContainText("Awaiting cross-check");

  const map = page.getByRole("region", { name: "Fulong Panorama Map" });
  await expect(map.locator('[data-trail-id="fulong-b1"]')).toHaveAttribute("data-route-active", "true");
  await expect(map.locator('[data-lift-code="L5"]')).toHaveAttribute("data-route-active", "true");
  await expect(map.locator('[data-trail-id="fulong-d1"]')).toHaveAttribute("data-route-active", "true");

  const mapBox = await map.boundingBox();
  const planBox = await plan.boundingBox();
  const inspectorBox = await page.locator(".atlas-inspector-column").boundingBox();
  expect(mapBox).not.toBeNull();
  expect(planBox).not.toBeNull();
  expect(inspectorBox).not.toBeNull();
  expect(planBox!.x).toBeGreaterThanOrEqual(mapBox!.x + mapBox!.width - 2);
  expect(planBox!.x).toBeGreaterThanOrEqual(inspectorBox!.x - 2);
  expect(planBox!.x + planBox!.width).toBeLessThanOrEqual(inspectorBox!.x + inspectorBox!.width + 2);
});


test("fails closed in the browser for a destination outside the published topology", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Plan route" }).click();
  const planner = page.getByRole("region", { name: "Route planner" });
  await planner.getByLabel("Start trail").selectOption("fulong-a1");
  const destination = planner.getByLabel("Destination trail");
  await destination.evaluate((select) => {
    const option = document.createElement("option");
    option.value = "fulong-not-published";
    option.textContent = "Unsupported test endpoint";
    select.append(option);
    (select as HTMLSelectElement).value = option.value;
    select.dispatchEvent(new Event("change", { bubbles: true }));
  });
  await planner.getByRole("button", { name: "Build route" }).click();

  await expect(page.getByText("No supported route in the published topology", { exact: true })).toBeVisible();
  await expect(page.getByRole("region", { name: "Schematic route plan" })).toHaveCount(0);
});

test("switches the Route Planner to Chinese with the rest of the interface", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "切换到中文" }).click();
  await page.getByRole("button", { name: "规划路线" }).click();

  const planner = page.getByRole("region", { name: "路线规划器" });
  await expect(planner.getByLabel("出发雪道")).toBeVisible();
  await expect(planner.getByLabel("目标雪道")).toBeVisible();
  await expect(planner.getByRole("button", { name: "生成路线" })).toBeVisible();
});

test("keeps the route controls usable at 390px without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Plan route" }).click();

  const planner = page.getByRole("region", { name: "Route planner" });
  await expect(planner.getByLabel("Start trail")).toBeVisible();
  await expect(planner.getByLabel("Destination trail")).toBeVisible();
  await planner.getByLabel("Start trail").selectOption("fulong-b1");
  await planner.getByLabel("Destination trail").selectOption("fulong-d1");
  await planner.getByRole("button", { name: "Build route" }).click();

  const mapBox = await page.getByRole("region", { name: "Fulong Panorama Map" }).boundingBox();
  const planBox = await page.getByRole("region", { name: "Schematic route plan" }).boundingBox();
  expect(mapBox).not.toBeNull();
  expect(planBox).not.toBeNull();
  expect(planBox!.y).toBeGreaterThanOrEqual(mapBox!.y + mapBox!.height - 2);

  const dimensions = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
  }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.innerWidth);
});
