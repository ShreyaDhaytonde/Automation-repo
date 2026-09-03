import { test, expect } from '@playwright/test';

test.describe('Stats', () => {
  test.setTimeout(60000);

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 1: Stats page header and description
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

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 2: Stats page navigation
  // ──────────────────────────────────────────────────────────────────────────

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

});
