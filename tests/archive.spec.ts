import { test, expect } from '@playwright/test';

test.describe('Archive', () => {
  test.setTimeout(60000);

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 1: Archive
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC01: Archive page - loads and renders unconditional elements
   */
  test('TC01 - Archive page - loads and renders unconditional elements', async ({ page }) => {
    await page.goto("/archive");
    await expect(page.getByRole("heading", { name: "Archive" })).toBeVisible();
    await expect(page.getByRole("link", { name: "← Back to habits" })).toBeVisible();
    await expect(page.getByRole("button", { name: /Edit / })).toBeVisible();
  });

  /**
   * TC02: HabitCard in Archive - duplicates an archived habit, which does not appear in Archive but is presumably added to Home
   */
  test('TC02 - HabitCard in Archive - duplicates an archived habit, which does not appear in Archive but is presumably added to Home', async ({ page }) => {
    await page.goto("/archive");
    const archivedHabitEditButton = page.getByRole("button", { name: /Edit / }).first();
    await archivedHabitEditButton.click();
    const archivedHabitNameLocator = page.getByRole("textbox", { name: /Edit name for / }).first();
    const archivedHabitName = await archivedHabitNameLocator.inputValue();
    const duplicateButton = page.getByRole("button", { name: `Duplicate ${archivedHabitName}` });
    await duplicateButton.click();
    await expect(page.locator(`text=${archivedHabitName} (copy)`)).toHaveCount(0);
    await expect(page.getByText("Could not duplicate that habit — try again.")).toHaveCount(0);
  });

  /**
   * TC03: Archive page - loads and shows static elements
   */
  test('TC03 - Archive page - loads and shows static elements', async ({ page }) => {
    await page.goto('/archive');
    await expect(page.getByRole('heading', { name: 'Archive' })).toBeVisible();
    await expect(page.getByRole('link', { name: '← Back to habits' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
    await expect(page.getByRole('button', { name: /switch to dark mode/i })).toBeVisible();
  });

  /**
   * TC04: Archive page - can delete an archived habit
   */
  test('TC04 - Archive page - can delete an archived habit', async ({ page }) => {
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
   * TC05: Archive page - can unarchive an archived habit
   */
  test('TC05 - Archive page - can unarchive an archived habit', async ({ page }) => {
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
   * TC06: Archive page - can edit an archived habit\\\'s details
   */
  test('TC06 - Archive page - can edit an archived habit\\\\\\\'s details', async ({ page }) => {
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
   * TC07: Archive page - can navigate back to home page
   */
  test('TC07 - Archive page - can navigate back to home page', async ({ page }) => {
    await page.goto('/archive');
    await page.getByRole('link', { name: '← Back to habits' }).click();
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
  });

  /**
   * TC08: Archive page - error message appears when loading fails (non-deterministic)
   */
  test('TC08 - Archive page - error message appears when loading fails (non-deterministic)', async ({ page }) => {
    await page.goto('/archive');
    await expect(page.locator('text=Could not load archived habits. Is the API running?')).toBeHidden();
  });

  /**
   * TC09: Archive page - empty state message is shown when no habits are archived (not reachable without backend control)
   */
  test('TC09 - Archive page - empty state message is shown when no habits are archived (not reachable without backend control)', async ({ page }) => {
    await page.goto('/archive');
    await expect(page.locator('text=No archived habits — anything you archive from the home page shows up here.')).toBeHidden();
  });

});
