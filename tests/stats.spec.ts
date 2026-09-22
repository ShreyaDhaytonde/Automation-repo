import { test, expect } from '@playwright/test';

test.describe('Stats', () => {
  test.setTimeout(60000);

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 1: Stats page load
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC01: Stats - page loads and displays header and controls
   */
  test('TC01 - Stats - page loads and displays header and controls', async ({ page }) => {
    await page.goto('/stats');
    await expect(page.getByRole('heading', { name: 'Your stats' })).toBeVisible();
    await expect(page.getByText('How your habits are tracking overall.')).toBeVisible();
    await expect(page.getByRole('link', { name: 'History' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Switch to dark mode' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
    await expect(page.getByRole('link', { name: '← Back to habits' })).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 2: Stats
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC02: Stats - navigates back to home page from back link
   */
  test('TC02 - Stats - navigates back to home page from back link', async ({ page }) => {
    await page.goto('/stats');
    await page.getByRole('link', { name: '← Back to habits' }).click();
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
  });

  /**
   * TC03: Stats - displays heading and description
   */
  test('TC03 - Stats - displays heading and description', async ({ page }) => {
    await page.goto('/stats');
    const heading = page.getByRole('heading', { name: 'Your stats' });
    await expect(heading).toBeVisible();
    const description = page.getByText('How your habits are tracking overall.');
    await expect(description).toBeVisible();
  });

  /**
   * TC04: Stats - has navigation link back to home page
   */
  test('TC04 - Stats - has navigation link back to home page', async ({ page }) => {
    await page.goto('/stats');
    const backLink = page.getByRole('link', { name: 'Back to habits' });
    await expect(backLink).toBeVisible();
    await backLink.click();
    await expect(page).toHaveURL('/');
  });

  /**
   * TC05: Stats page - initial render shows heading, description, back link, theme toggle, and logout button
   */
  test('TC05 - Stats page - initial render shows heading, description, back link, theme toggle, and logout button', async ({ page }) => {
    await page.goto('/stats');
    await expect(page.getByRole('heading', { name: 'Your stats' })).toBeVisible();
    await expect(page.getByText('How your habits are tracking overall.')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Back to habits' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
  });

  /**
   * TC06: Stats page - renders with heading and controls
   */
  test('TC06 - Stats page - renders with heading and controls', async ({ page }) => {
    await page.goto('/stats');
    await expect(page.getByRole('heading', { name: 'Your stats' })).toBeVisible();
    await expect(page.getByText('How your habits are tracking overall.')).toBeVisible();
    await expect(page.getByRole('link', { name: 'History' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Switch to dark mode' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 3: Loading state
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC07: Stats - shows loading label while loading
   */
  test('TC07 - Stats - shows loading label while loading', async ({ page }) => {
    await page.goto('/stats');
    await expect(page.getByText('Crunching your stats…')).toBeVisible();
  });

});
