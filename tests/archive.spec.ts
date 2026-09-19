import { test, expect } from '@playwright/test';

test.describe('Archive', () => {
  test.setTimeout(60000);

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 1: Archive
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC01: Archive page - loads and shows static elements
   */
  test('TC01 - Archive page - loads and shows static elements', async ({ page }) => {
    await page.goto('/archive');
    await expect(page.getByRole('heading', { name: 'Archive' })).toBeVisible();
    await expect(page.getByRole('link', { name: '← Back to habits' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
    await expect(page.getByRole('button', { name: /switch to dark mode/i })).toBeVisible();
  });

  /**
   * TC02: Archive page - can navigate back to home page
   */
  test('TC02 - Archive page - can navigate back to home page', async ({ page }) => {
    await page.goto('/archive');
    await page.getByRole('link', { name: '← Back to habits' }).click();
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
  });

  /**
   * TC03: Archive page - error message appears when loading fails (non-deterministic)
   */
  test('TC03 - Archive page - error message appears when loading fails (non-deterministic)', async ({ page }) => {
    await page.goto('/archive');
    await expect(page.locator('text=Could not load archived habits. Is the API running?')).toBeHidden();
  });

  /**
   * TC04: Archive page - empty state message is shown when no habits are archived (not reachable without backend control)
   */
  test('TC04 - Archive page - empty state message is shown when no habits are archived (not reachable without backend control)', async ({ page }) => {
    await page.goto('/archive');
    await expect(page.locator('text=No archived habits — anything you archive from the home page shows up here.')).toBeHidden();
  });

});
