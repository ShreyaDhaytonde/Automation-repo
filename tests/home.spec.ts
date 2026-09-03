import { test, expect } from '@playwright/test';

test.describe('Home', () => {
  test.setTimeout(60000);

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 1: Home page header and description
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC01: Home - displays heading and description
   */
  test('TC01 - Home - displays heading and description', async ({ page }) => {
    await page.goto("/");
    const heading = page.getByRole("heading", { name: "Habit Tracker" });
    await expect(heading).toBeVisible();
    const description = page.getByText("Build small daily habits, one day at a time.");
    await expect(description).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 2: Category filter behavior
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC02: Home - filters habits by category and shows category-specific empty state
   */
  test('TC02 - Home - filters habits by category and shows category-specific empty state', async ({ page }) => {
    await page.goto("/");
    const categoryFilter = page.getByRole("combobox", { name: "Filter by category" });
    await categoryFilter.selectOption("Health");
    const emptyMessage = page.getByText('No habits in the "Health" category yet.');
    await expect(emptyMessage).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 3: Habit card completion and disabled state
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC03: Home - marks a habit as done today disables mark done button
   */
  test('TC03 - Home - marks a habit as done today disables mark done button', async ({ page }) => {
    await page.goto("/");
    const markDoneButtons = page.getByRole("button", { name: "Mark done" });
    const firstMarkDone = markDoneButtons.first();
    await firstMarkDone.click();
    const doneTodayButton = page.getByRole("button", { name: "Done today" });
    await expect(doneTodayButton).toBeVisible();
    await expect(doneTodayButton).toBeDisabled();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 4: Habit card deletion behavior
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC04: Home - deletes a habit after confirmation dialog
   */
  test('TC04 - Home - deletes a habit after confirmation dialog', async ({ page }) => {
    await page.goto("/");
    const removeButtons = page.getByRole("button", { name: /^Remove$/ });
    const firstRemoveButton = removeButtons.first();
    page.once('dialog', dialog => dialog.accept());
    await firstRemoveButton.click();
    await expect(firstRemoveButton).toBeHidden();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 5: Habit card streak display
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC05: Home - shows 'Start your streak today!' for habits with zero streak
   */
  test('TC05 - Home - shows \'Start your streak today!\' for habits with zero streak', async ({ page }) => {
    await page.goto("/");
    const streakMessages = page.getByText("Start your streak today!");
    await expect(streakMessages.first()).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 6: Habit card goal reached display
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC06: Home - shows '🎉 Weekly goal reached' when weekly goal is achieved
   */
  test('TC06 - Home - shows \'🎉 Weekly goal reached\' when weekly goal is achieved', async ({ page }) => {
    await page.goto("/");
    const goalReachedBadges = page.locator("span", { hasText: "🎉 Weekly goal reached" });
    await expect(goalReachedBadges.first()).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 7: Habit card completion button disabled state
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC07: Home - 'Mark done' button disabled when habit is completed today
   */
  test('TC07 - Home - \'Mark done\' button disabled when habit is completed today', async ({ page }) => {
    await page.goto("/");
    const doneTodayButton = page.getByRole("button", { name: "Done today" }).first();
    await expect(doneTodayButton).toBeDisabled();
  });

});
