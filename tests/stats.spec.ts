import { test, expect } from '@playwright/test';

test.describe('Stats', () => {
  test.setTimeout(60000);

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 1: Stats page load
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC01: Stats - page loads and renders unconditional elements
   */
  test('TC01 - Stats - page loads and renders unconditional elements', async ({ page }) => {
    await page.goto('/stats');
    await expect(page.getByRole('heading', { name: 'Your stats' })).toBeVisible();
    await expect(page.getByText('How your habits are tracking overall.')).toBeVisible();
    await expect(page.getByRole('link', { name: '← Back to habits' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Habits by priority' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Habits by category' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Weekly completion' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Your stats' })).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 2: Stats
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC02: StatsSummary - page loads and renders unconditional elements
   */
  test('TC02 - StatsSummary - page loads and renders unconditional elements', async ({ page }) => {
    await page.goto('/stats');
    await expect(page.getByRole('heading', { name: 'Stats' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Weekly completion' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Habits by category' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Habits by priority' })).toBeVisible();
    await expect(page.getByText('Pinned')).toBeVisible();
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
    const description = page.getByText('How your habits are tracking overall.');
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
    await expect(page).toHaveURL('/');
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
   * TC07: StatsSummary - renders all stat cards with correct labels and values
   */
  test('TC07 - StatsSummary - renders all stat cards with correct labels and values', async ({ page }) => {
    await page.goto('/stats');
    await expect(page.locator('h2', { hasText: 'Weekly completion' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Habits by category', exact: true })).toBeVisible();
    await expect(page.getByText('Habits', { exact: true })).toBeVisible();
    await expect(page.getByText('Done today')).toBeVisible();
    await expect(page.getByText('Active streaks')).toBeVisible();
    await expect(page.getByText('Best streak')).toBeVisible();
    await expect(page.getByText('Total completions')).toBeVisible();
    await expect(page.getByText('This week')).toBeVisible();
  });

  /**
   * TC08: StatsSummary - renders empty state message when no habits tracked
   */
  test('TC08 - StatsSummary - renders empty state message when no habits tracked', async ({ page }) => {
    await page.goto('/stats');
    await expect(page.getByText('No habits tracked yet — add one on the home page and your stats will show up here.')).toBeVisible();
  });

  /**
   * TC09: StatsSummary - displays weekly completion progress bar with correct percentage
   */
  test('TC09 - StatsSummary - displays weekly completion progress bar with correct percentage', async ({ page }) => {
    await page.goto('/stats');
    const weeklyCompletionLocator = page.locator('h2', { hasText: 'Weekly completion' }).locator('xpath=following-sibling::span[contains(@class, "text-zinc-500")]');
    await expect(weeklyCompletionLocator).toHaveText(/\d+%/);
    const progressBar = page.locator('div > div > div.h-full.rounded-full.bg-emerald-500');
    await expect(progressBar).toBeVisible();
  });

  /**
   * TC10: StatsSummary - displays habits by category with bars proportional to counts
   */
  test('TC10 - StatsSummary - displays habits by category with bars proportional to counts', async ({ page }) => {
    await page.goto('/stats');
    const categoryItems = page.locator('ul > li.flex.items-center.gap-3.text-sm');
    await expect(categoryItems.first()).toBeVisible();
    const firstCategoryName = await categoryItems.nth(0).locator('span.w-20').textContent();
    await expect(firstCategoryName).not.toBeNull();
    const firstCategoryBar = categoryItems.nth(0).locator('div > div.h-full.rounded-full.transition-all.duration-300');
    await expect(firstCategoryBar).toBeVisible();
  });

  /**
   * TC11: Stats - page loads and displays header and controls
   */
  test('TC11 - Stats - page loads and displays header and controls', async ({ page }) => {
    await page.goto('/stats');
    await expect(page.getByRole('heading', { name: 'Your stats' })).toBeVisible();
    await expect(page.getByText('How your habits are tracking overall.')).toBeVisible();
    await expect(page.getByRole('link', { name: 'History' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Switch to dark mode' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
    await expect(page.getByRole('link', { name: '← Back to habits' })).toBeVisible();
  });

  /**
   * TC12: Stats - shows loading label while loading
   */
  test('TC12 - Stats - shows loading label while loading', async ({ page }) => {
    await page.goto('/stats');
    await expect(page.getByText('Crunching your stats…')).toBeVisible();
  });

});
