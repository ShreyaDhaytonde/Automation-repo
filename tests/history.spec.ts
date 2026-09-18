import { test, expect } from '@playwright/test';

test.describe('History', () => {
  test.setTimeout(60000);

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 1: History page load
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC01: History page - loads and renders base elements
   */
  test('TC01 - History page - loads and renders base elements', async ({ page }) => {
    await page.goto("/history");
    await expect(page.getByRole("heading", { name: "History" })).toBeVisible();
    await expect(page.getByRole("link", { name: "← Back to habits", exact: true })).toBeVisible();
    await expect(page.getByLabel("Switch to dark mode")).toBeVisible();
    await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
    await expect(page.getByText("Last 28 days for each habit.")).toBeVisible();
    await expect(page.getByText("Done")).toBeVisible();
    await expect(page.getByText("Frozen")).toBeVisible();
    await expect(page.getByText("Missed")).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 2: History
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC02: History page - loads and displays unconditional elements
   */
  test('TC02 - History page - loads and displays unconditional elements', async ({ page }) => {
    await page.goto('/history');
    await expect(page.getByRole('heading', { name: 'History' })).toBeVisible();
    await expect(page.getByText('Last 28 days for each habit.')).toBeVisible();
    await expect(page.getByRole('link', { name: '← Back to habits' })).toBeVisible();
    await expect(page.getByText('Done')).toBeVisible();
    await expect(page.getByText('Frozen')).toBeVisible();
    await expect(page.getByText('Missed')).toBeVisible();
  });

  /**
   * TC03: History page - navigate back to habits
   */
  test('TC03 - History page - navigate back to habits', async ({ page }) => {
    await page.goto('/history');
    await page.getByRole('link', { name: '← Back to habits' }).click();
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
  });

});
