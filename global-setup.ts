import { chromium, type FullConfig } from '@playwright/test';

// Every generated spec names its fixture data with a trailing millisecond
// timestamp (Date.now()), e.g. "Test habit 1790137152295" -- see any
// tests/*.spec.ts. Nothing a real user creates by hand is expected to end
// in a bare 13-digit number, so this doubles as a safe fingerprint for
// "record this automation created" without touching anything else that
// happens to live in the same shared, persistent backend (see the comment
// on `fullyParallel`/`workers` in playwright.config.ts -- there is no
// per-test reset, so leftover fixture data otherwise accumulates forever
// across every CI run).
const TEST_FIXTURE_NAME_RE = /\d{13}/;

// Safety ceiling, not a target -- guards against an infinite loop if a
// delete silently fails to remove its row. One-time backlog cleanup may
// approach this on the first run after adding this script; every run after
// that only has one run's worth of leftovers to clear.
const MAX_DELETE_ATTEMPTS = 1000;

export default async function globalSetup(_config: FullConfig) {
  const baseURL = process.env.PLAYWRIGHT_BASE_URL;
  if (!baseURL) return;

  const browser = await chromium.launch();
  const context = await browser.newContext({
    baseURL,
    storageState: process.env.PLAYWRIGHT_STORAGE_STATE || undefined,
  });
  const page = await context.newPage();
  page.on('dialog', (dialog) => dialog.accept());

  try {
    await page.goto('/');

    const showArchived = page.getByLabel('Show archived');
    if (await showArchived.count()) {
      await showArchived.check();
    }

    const fixtureItems = page.getByRole('listitem').filter({ hasText: TEST_FIXTURE_NAME_RE });

    for (let attempt = 0; attempt < MAX_DELETE_ATTEMPTS; attempt++) {
      const count = await fixtureItems.count();
      if (count === 0) break;

      const target = fixtureItems.first();
      await target.getByRole('button', { name: /^Delete / }).click();
      await target.waitFor({ state: 'detached' }).catch(() => {});
    }
  } finally {
    await context.close();
    await browser.close();
  }
}
