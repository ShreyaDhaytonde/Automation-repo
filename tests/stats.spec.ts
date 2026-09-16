import { test, expect } from '@playwright/test';

test.describe('Stats', () => {
  test.setTimeout(60000);

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 1: Stats page load
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC01: Stats page - loads and displays initial UI controls
   */
  test('TC01 - Stats page - loads and displays initial UI controls', async ({ page }) => {
    await page.goto('/stats');
    await expect(page.getByRole('heading', { name: 'Your stats' })).toBeVisible();
    await expect(page.getByRole('link', { name: '← Back to habits' })).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 2: Stats
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC02: Stats - page loads with heading and navigation link
   */
  test('TC02 - Stats - page loads with heading and navigation link', async ({ page }) => {
    await page.goto('/stats');
    await expect(page.getByRole('heading', { name: 'Your stats' })).toBeVisible();
    await expect(page.getByRole('link', { name: '← Back to habits' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Switch to dark mode' })).toBeVisible();
  });

  /**
   * TC03: Stats - navigates back to home page from back link
   */
  test('TC03 - Stats - navigates back to home page from back link', async ({ page }) => {
    await page.goto('/stats');
    await page.getByRole('link', { name: '← Back to habits' }).click();
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
  });

  /**
   * TC04: Stats - displays heading and description
   */
  test('TC04 - Stats - displays heading and description', async ({ page }) => {
    await page.goto("/stats");
    const heading = page.getByRole("heading", { name: "Your stats" });
    await expect(heading).toBeVisible();
    const description = page.getByText("How your habits are tracking overall.");
    await expect(description).toBeVisible();
  });

  /**
   * TC05: Stats - has navigation link back to home page
   */
  test('TC05 - Stats - has navigation link back to home page', async ({ page }) => {
    await page.goto("/stats");
    const backLink = page.getByRole("link", { name: "Back to habits" });
    await expect(backLink).toBeVisible();
    await backLink.click();
    await expect(page).toHaveURL("/");
  });

  /**
   * TC06: Stats page - initial render shows heading, description, back link, theme toggle, and logout button
   */
  test('TC06 - Stats page - initial render shows heading, description, back link, theme toggle, and logout button', async ({ page }) => {
    await page.goto('/stats');
    await expect(page.getByRole('heading', { name: 'Your stats' })).toBeVisible();
    await expect(page.getByText('How your habits are tracking overall.')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Back to habits' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
  });

  /**
   * TC07: Stats page - loads and displays heading and back link
   */
  test('TC07 - Stats page - loads and displays heading and back link', async ({ page }) => {
    await page.goto('/stats');
    await expect(page.getByRole('heading', { name: 'Your stats' })).toBeVisible();
    await expect(page.getByRole('link', { name: '← Back to habits' })).toBeVisible();
  });

});
