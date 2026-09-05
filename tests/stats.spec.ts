import { test, expect } from '@playwright/test';

test.describe('Stats', () => {
  test.setTimeout(60000);

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 1: Stats
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC01: Stats - displays heading and description
   */
  test('TC01 - Stats - displays heading and description', async ({ page }) => {
    await page.goto("/stats");
    const heading = page.getByRole("heading", { name: "Your stats" });
    await expect(heading).toBeVisible();
    const description = page.getByText("How your habits are tracking overall.");
    await expect(description).toBeVisible();
  });

  /**
   * TC02: Stats - has navigation link back to home page
   */
  test('TC02 - Stats - has navigation link back to home page', async ({ page }) => {
    await page.goto("/stats");
    const backLink = page.getByRole("link", { name: "Back to habits" });
    await expect(backLink).toBeVisible();
    await backLink.click();
    await expect(page).toHaveURL("/");
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 2: Stats page initial render
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC03: Stats page - initial render shows heading, description, back link, theme toggle, and logout button
   */
  test('TC03 - Stats page - initial render shows heading, description, back link, theme toggle, and logout button', async ({ page }) => {
    await page.goto('/stats');
    await expect(page.getByRole('heading', { name: 'Your stats' })).toBeVisible();
    await expect(page.getByText('How your habits are tracking overall.')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Back to habits' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
  });

});
