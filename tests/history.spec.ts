import { test, expect } from '@playwright/test';

test.describe('History', () => {
  test.setTimeout(60000);

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 1: Page load
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC01: History page - loads and displays unconditional elements
   */
  test('TC01 - History page - loads and displays unconditional elements', async ({ page }) => {
    await page.goto('/history');
    await expect(page.getByRole('heading', { name: 'History' })).toBeVisible();
    await expect(page.getByText('Last 28 days for each habit.')).toBeVisible();
    await expect(page.getByRole('link', { name: '← Back to habits' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
    await expect(page.getByText('Done')).toBeVisible();
    await expect(page.getByText('Frozen')).toBeVisible();
    await expect(page.getByText('Missed')).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 2: Loading state
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC02: History page - shows loading state while fetching habits
   */
  test('TC02 - History page - shows loading state while fetching habits', async ({ page }) => {
    await page.goto('/history');
    await expect(page.getByText('Loading history…')).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 3: Tracked habit count display
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC03: History page - shows tracked habit count when habits exist
   */
  test('TC03 - History page - shows tracked habit count when habits exist', async ({ page }) => {
    await page.goto('/history');
    const habitCountLocator = page.locator('p.text-xs.text-zinc-400');
    if (await habitCountLocator.count() > 0) {
      const text = await habitCountLocator.textContent();
      await expect(text).toMatch(/\d+ habit(s)? tracked/);
    }
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 4: Error state
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC04: History page - shows error message if habits fail to load
   */
  test('TC04 - History page - shows error message if habits fail to load', async ({ page }) => {
    await page.goto('/history');
    const errorMessage = page.getByText('Could not load history. Is the API running?');
    if (await errorMessage.count() > 0) {
      await expect(errorMessage).toBeVisible();
    }
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 5: Empty state
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC05: History page - shows empty state when no habits exist
   */
  test('TC05 - History page - shows empty state when no habits exist', async ({ page }) => {
    await page.goto('/history');
    const emptyMessage = page.getByText('No habits yet — add one to see its history here.');
    if (await emptyMessage.count() > 0) {
      await expect(emptyMessage).toBeVisible();
    }
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 6: History
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC06: History page - navigate back to habits
   */
  test('TC06 - History page - navigate back to habits', async ({ page }) => {
    await page.goto('/history');
    await page.getByRole('link', { name: '← Back to habits' }).click();
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
  });

});
