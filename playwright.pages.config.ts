import { defineConfig, devices } from "@playwright/test";

// Test the built bundle with the same subpath as GitHub Pages, not the dev server.
export default defineConfig({
  testDir: "./tests/pages",
  fullyParallel: true,
  retries: 0,
  use: {
    ...devices["Desktop Chrome"],
    channel: process.env.CI ? undefined : "chrome",
    baseURL: "http://127.0.0.1:4186",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run preview -- --host 127.0.0.1 --port 4186 --strictPort",
    url: "http://127.0.0.1:4186/ski-trail-atlas/",
    reuseExistingServer: false,
  },
});
