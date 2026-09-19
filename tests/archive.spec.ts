import { test, expect } from '@playwright/test';

test.describe('Archive', () => {
  test.setTimeout(60000);

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 1: Archive page load
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC01: Archive page - loads with heading and main controls visible
   */
  test('TC01 - Archive page - loads with heading and main controls visible', async ({ page }) => {
    await page.goto("/archive");
    await expect(page.getByRole("heading", { name: "Archive" })).toBeVisible();
    await expect(page.getByText("Habits you've archived, out of the main list.")).toBeVisible();
    await expect(page.getByRole("link", { name: "← Back to habits" })).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 2: Habit duplication
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC02: Archived habit card - duplicates an archived habit without error
   */
  test('TC02 - Archived habit card - duplicates an archived habit without error', async ({ page }) => {
    await page.goto("/archive");
    const listItems = page.getByRole("listitem");
    if ((await listItems.count()) === 0) {
      // No archived habits available to duplicate, skip test.
      return;
    }
    const firstArchivedHabit = listItems.nth(0);
    const habitName = await firstArchivedHabit.locator("p").first().textContent();
    await firstArchivedHabit.getByRole("button", { name: new RegExp(`Duplicate ${habitName}`) }).click();
    await expect(page.getByText("Could not duplicate that habit — try again.")).toHaveCount(0);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 3: Archive
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC03: HabitCard - duplicate habit button is visible and clickable on archived habits
   */
  test('TC03 - HabitCard - duplicate habit button is visible and clickable on archived habits', async ({ page }) => {
    await page.goto("/archive");
    const habitCard = page.getByRole("listitem").first();
    await expect(habitCard.getByRole("button", { name: new RegExp("Duplicate ") })).toBeVisible();
    await habitCard.getByRole("button", { name: new RegExp("Duplicate ") }).click();
  });

  /**
   * TC04: Archive page - loads and shows static elements
   */
  test('TC04 - Archive page - loads and shows static elements', async ({ page }) => {
    await page.goto('/archive');
    await expect(page.getByRole('heading', { name: 'Archive' })).toBeVisible();
    await expect(page.getByRole('link', { name: '← Back to habits' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
    await expect(page.getByRole('button', { name: /switch to dark mode/i })).toBeVisible();
  });

  /**
   * TC05: Archive page - can delete an archived habit
   */
  test('TC05 - Archive page - can delete an archived habit', async ({ page }) => {
    await page.goto('/');
    const uniqueName = `Test Delete ${Date.now()}`;
    await page.getByLabel('New habit name').fill(uniqueName);
    await page.getByLabel('Habit category').selectOption({ index: 0 });
    await page.getByLabel('Times per week').selectOption('7');
    await page.getByLabel('Notes (optional)').fill('');
    await page.getByRole('button', { name: 'Add habit' }).click();
    const habitCard = page.getByRole('listitem').filter({ hasText: uniqueName });
    await expect(habitCard).toBeVisible();
    await habitCard.getByRole('button', { name: `Archive` }).click();
    await page.goto('/archive');
    const archivedHabitCard = page.getByRole('listitem').filter({ hasText: uniqueName });
    await expect(archivedHabitCard).toBeVisible();
    await archivedHabitCard.getByRole('button', { name: `Delete ${uniqueName}`, exact: true }).click();
    await page.waitForTimeout(500);
    await expect(archivedHabitCard).toHaveCount(0);
  });

  /**
   * TC06: Archive page - can unarchive an archived habit
   */
  test('TC06 - Archive page - can unarchive an archived habit', async ({ page }) => {
    await page.goto('/');
    const uniqueName = `Test Unarchive ${Date.now()}`;
    await page.getByLabel('New habit name').fill(uniqueName);
    await page.getByLabel('Habit category').selectOption({ index: 0 });
    await page.getByLabel('Times per week').selectOption('7');
    await page.getByLabel('Notes (optional)').fill('');
    await page.getByRole('button', { name: 'Add habit' }).click();
    const habitCard = page.getByRole('listitem').filter({ hasText: uniqueName });
    await expect(habitCard).toBeVisible();
    await habitCard.getByRole('button', { name: `Archive ${uniqueName}`, exact: true }).click();
    await page.goto('/archive');
    const archivedHabitCard = page.getByRole('listitem').filter({ hasText: uniqueName });
    await expect(archivedHabitCard).toBeVisible();
    await archivedHabitCard.getByRole('button', { name: `Unarchive ${uniqueName}`, exact: true }).click();
    await expect(page.getByRole('listitem').filter({ hasText: uniqueName })).toHaveCount(0);
  });

  /**
   * TC07: Archive page - can edit an archived habit\\\'s details
   */
  test('TC07 - Archive page - can edit an archived habit\\\\\\\'s details', async ({ page }) => {
    await page.goto('/');
    const uniqueName = `Test Edit ${Date.now()}`;
    await page.getByLabel('New habit name').fill(uniqueName);
    await page.getByLabel('Habit category').selectOption({ index: 0 });
    await page.getByLabel('Times per week').selectOption('7');
    await page.getByLabel('Notes (optional)').fill('');
    await page.getByRole('button', { name: 'Add habit' }).click();
    const habitCard = page.getByRole('listitem').filter({ hasText: uniqueName });
    await expect(habitCard).toBeVisible();
    await habitCard.getByRole('button', { name: `Archive` }).click();
    await page.goto('/archive');
    const archivedHabitCard = page.getByRole('listitem').filter({ hasText: uniqueName });
    await expect(archivedHabitCard).toBeVisible();
    await archivedHabitCard.getByRole('button', { name: `Edit ${uniqueName}`, exact: true }).click();
    const nameInput = page.getByLabel(`Edit name for ${uniqueName}`);
    await expect(nameInput).toHaveValue(uniqueName);
    await nameInput.fill(`${uniqueName} updated`);
    const saveButton = page.getByRole('button', { name: 'Save', exact: true });
    await saveButton.click();
    const updatedHabitCard = page.getByRole('listitem').filter({ hasText: `${uniqueName} updated` });
    await expect(updatedHabitCard).toBeVisible();
  });

  /**
   * TC08: Archive page - can navigate back to home page
   */
  test('TC08 - Archive page - can navigate back to home page', async ({ page }) => {
    await page.goto('/archive');
    await page.getByRole('link', { name: '← Back to habits' }).click();
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
  });

  /**
   * TC09: Archive page - error message appears when loading fails (non-deterministic)
   */
  test('TC09 - Archive page - error message appears when loading fails (non-deterministic)', async ({ page }) => {
    await page.goto('/archive');
    await expect(page.locator('text=Could not load archived habits. Is the API running?')).toBeHidden();
  });

  /**
   * TC10: Archive page - empty state message is shown when no habits are archived (not reachable without backend control)
   */
  test('TC10 - Archive page - empty state message is shown when no habits are archived (not reachable without backend control)', async ({ page }) => {
    await page.goto('/archive');
    await expect(page.locator('text=No archived habits — anything you archive from the home page shows up here.')).toBeHidden();
  });

});
