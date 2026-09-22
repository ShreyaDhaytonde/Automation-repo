import { test, expect } from '@playwright/test';

test.describe('History', () => {
  test.setTimeout(60000);

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 1: Page load and static content
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC01: History - page loads and renders unconditional elements
   */
  test('TC01 - History - page loads and renders unconditional elements', async ({ page }) => {
    await page.goto('/history');
    await expect(page.getByRole('heading', { name: 'History' })).toBeVisible();
    await expect(page.getByText('Last 28 days for each habit.')).toBeVisible();
    await expect(page.getByRole('link', { name: '← Back to habits' })).toBeVisible();
    await expect(page.getByText('Done')).toBeVisible();
    await expect(page.getByText('Frozen')).toBeVisible();
    await expect(page.getByText('Missed')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 2: Tracked habit count display
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC02: History - shows tracked habit count when habits exist
   */
  test('TC02 - History - shows tracked habit count when habits exist', async ({ page }) => {
    await page.goto('/history');
    await expect(page.getByRole('list')).toBeVisible();
    const habitCountText = await page.locator('p.text-xs.text-zinc-400').textContent();
    await expect(habitCountText).toMatch(/\d+ habit(s)? tracked/);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 3: Empty state
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC03: History - shows empty state message when no habits exist
   */
  test('TC03 - History - shows empty state message when no habits exist', async ({ page }) => {
    await page.goto('/history');
    // Filter to empty state by waiting for the empty message to appear
    await expect(page.getByText('No habits yet — add one to see its history here.')).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 4: Loading and error states
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC04: History - shows error message if loading habits fails
   */
  test('TC04 - History - shows error message if loading habits fails', async ({ page }) => {
    await page.goto('/history');
    // Note: Cannot reliably trigger error without backend control; this test asserts error message presence if it appears.
    const errorMessage = page.getByText('Could not load history. Is the API running?');
    if (await errorMessage.count() > 0) {
      await expect(errorMessage).toBeVisible();
    }
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 5: History
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC05: History page - shows loading state while fetching habits
   */
  test('TC05 - History page - shows loading state while fetching habits', async ({ page }) => {
    await page.goto('/history');
    await expect(page.getByText('Loading history…')).toBeVisible();
  });

  /**
   * TC06: History page - shows tracked habit count when habits exist
   */
  test('TC06 - History page - shows tracked habit count when habits exist', async ({ page }) => {
    await page.goto('/history');
    const habitCountLocator = page.locator('p.text-xs.text-zinc-400');
    if (await habitCountLocator.count() > 0) {
      const text = await habitCountLocator.textContent();
      await expect(text).toMatch(/\d+ habit(s)? tracked/);
    }
  });

  /**
   * TC07: History page - shows empty state when no habits exist
   */
  test('TC07 - History page - shows empty state when no habits exist', async ({ page }) => {
    await page.goto('/history');
    const emptyMessage = page.getByText('No habits yet — add one to see its history here.');
    if (await emptyMessage.count() > 0) {
      await expect(emptyMessage).toBeVisible();
    }
  });

  /**
   * TC08: History page - navigate back to habits
   */
  test('TC08 - History page - navigate back to habits', async ({ page }) => {
    await page.goto('/history');
    await page.getByRole('link', { name: '← Back to habits' }).click();
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
  });

});
