import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests',

  fullyParallel: true,
  workers: process.env.CI ? 2 : undefined,

  retries: process.env.CI ? 1 : 0,

  forbidOnly: !!process.env.CI,

  timeout: 60_000,
  expect: { timeout: 10_000 },

  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:3000',

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
