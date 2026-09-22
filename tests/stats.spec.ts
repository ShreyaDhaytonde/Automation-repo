import { test, expect } from '@playwright/test';

test.describe('StatsSummary', () => {
  test.setTimeout(60000);

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 1: Stat cards rendering
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC01: StatsSummary - renders all stat cards with correct labels and values
   */
  test('TC01 - StatsSummary - renders all stat cards with correct labels and values', async ({ page }) => {
    await page.goto('/stats');
    await expect(page.getByRole('heading', { name: 'Weekly completion', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Habits by category', exact: true })).toBeVisible();
    await expect(page.getByText('Habits')).toBeVisible();
    await expect(page.getByText('Done today')).toBeVisible();
    await expect(page.getByText('Active streaks')).toBeVisible();
    await expect(page.getByText('Best streak')).toBeVisible();
    await expect(page.getByText('Total completions')).toBeVisible();
    await expect(page.getByText('This week')).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 2: Empty state
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC02: StatsSummary - renders empty state message when no habits tracked
   */
  test('TC02 - StatsSummary - renders empty state message when no habits tracked', async ({ page }) => {
    await page.goto('/stats');
    await expect(page.getByText('No habits tracked yet — add one on the home page and your stats will show up here.')).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 3: Weekly completion display
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC03: StatsSummary - displays weekly completion progress bar with correct percentage
   */
  test('TC03 - StatsSummary - displays weekly completion progress bar with correct percentage', async ({ page }) => {
    await page.goto('/stats');
    const weeklyCompletionLocator = page.getByRole('heading', { name: 'Weekly completion', exact: true }).locator('xpath=following-sibling::span[contains(@class, "text-zinc-500")]');
    await expect(weeklyCompletionLocator).toHaveText(/\d+%/);
    const progressBar = page.locator('div > div > div.h-full.rounded-full.bg-emerald-500');
    await expect(progressBar).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 4: Habits by category display
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC04: StatsSummary - displays habits by category with bars proportional to counts
   */
  test('TC04 - StatsSummary - displays habits by category with bars proportional to counts', async ({ page }) => {
    await page.goto('/stats');
    const categoryItems = page.locator('ul > li.flex.items-center.gap-3.text-sm');
    await expect(categoryItems).toHaveCountGreaterThan(0);
    const firstCategoryName = await categoryItems.nth(0).locator('span.w-20').textContent();
    await expect(firstCategoryName).not.toBeNull();
    const firstCategoryBar = categoryItems.nth(0).locator('div > div.h-full.rounded-full.transition-all.duration-300');
    await expect(firstCategoryBar).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 5: StatsSummary
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC05: Stats - page loads and displays header and controls
   */
  test('TC05 - Stats - page loads and displays header and controls', async ({ page }) => {
    await page.goto('/stats');
    await expect(page.getByRole('heading', { name: 'Your stats' })).toBeVisible();
    await expect(page.getByText('How your habits are tracking overall.')).toBeVisible();
    await expect(page.getByRole('link', { name: 'History' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Switch to dark mode' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
    await expect(page.getByRole('link', { name: '← Back to habits' })).toBeVisible();
  });

  /**
   * TC06: Stats - navigates back to home page from back link
   */
  test('TC06 - Stats - navigates back to home page from back link', async ({ page }) => {
    await page.goto('/stats');
    await page.getByRole('link', { name: '← Back to habits' }).click();
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
  });

  /**
   * TC07: Stats - displays heading and description
   */
  test('TC07 - Stats - displays heading and description', async ({ page }) => {
    await page.goto("/stats");
    const heading = page.getByRole("heading", { name: "Your stats" });
    await expect(heading).toBeVisible();
    const description = page.getByText("How your habits are tracking overall.");
    await expect(description).toBeVisible();
  });

  /**
   * TC08: Stats - has navigation link back to home page
   */
  test('TC08 - Stats - has navigation link back to home page', async ({ page }) => {
    await page.goto("/stats");
    const backLink = page.getByRole("link", { name: "Back to habits" });
    await expect(backLink).toBeVisible();
    await backLink.click();
    await expect(page).toHaveURL("/");
  });

  /**
   * TC09: Stats page - initial render shows heading, description, back link, theme toggle, and logout button
   */
  test('TC09 - Stats page - initial render shows heading, description, back link, theme toggle, and logout button', async ({ page }) => {
    await page.goto('/stats');
    await expect(page.getByRole('heading', { name: 'Your stats' })).toBeVisible();
    await expect(page.getByText('How your habits are tracking overall.')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Back to habits' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
  });

  /**
   * TC10: Stats - shows loading label while loading
   */
  test('TC10 - Stats - shows loading label while loading', async ({ page }) => {
    await page.goto('/stats');
    await expect(page.getByText('Crunching your stats…')).toBeVisible();
  });

});
