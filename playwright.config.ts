import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests',

  // Every spec runs against one real, shared backend with real persisted
  // data -- no mocks, no per-test reset. Two concurrent workers can read/
  // write that same backend at the same instant, so which records exist on
  // a given test's page load becomes timing-dependent instead of determined
  // purely by file order. Serial execution removes that variable; it is not
  // a substitute for collision-proof selectors (exact matches, unique
  // fixture data), which still matter regardless of worker count.
  fullyParallel: true,
  workers: 1,

  retries: process.env.CI ? 1 : 0,

  forbidOnly: !!process.env.CI,

  timeout: 60_000,
  expect: { timeout: 10_000 },

  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL,

    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    storageState: process.env.PLAYWRIGHT_STORAGE_STATE || undefined,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
