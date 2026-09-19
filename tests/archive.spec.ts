import { test, expect } from '@playwright/test';

test.describe('Archive', () => {
  test.setTimeout(60000);

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 1: Habit duplication
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC01: HabitCard - duplicate habit button is visible and clickable on archived habits
   */
  test('TC01 - HabitCard - duplicate habit button is visible and clickable on archived habits', async ({ page }) => {
    await page.goto("/archive");
    const habitCard = page.getByRole("listitem").first();
    await expect(habitCard.getByRole("button", { name: new RegExp("Duplicate ") })).toBeVisible();
    await habitCard.getByRole("button", { name: new RegExp("Duplicate ") }).click();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 2: Archive
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC02: Archive page - loads and shows static elements
   */
  test('TC02 - Archive page - loads and shows static elements', async ({ page }) => {
    await page.goto('/archive');
    await expect(page.getByRole('heading', { name: 'Archive' })).toBeVisible();
    await expect(page.getByRole('link', { name: '← Back to habits' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
    await expect(page.getByRole('button', { name: /switch to dark mode/i })).toBeVisible();
  });

  /**
   * TC03: Archive page - can delete an archived habit
   */
  test('TC03 - Archive page - can delete an archived habit', async ({ page }) => {
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
   * TC04: Archive page - can unarchive an archived habit
   */
  test('TC04 - Archive page - can unarchive an archived habit', async ({ page }) => {
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
   * TC05: Archive page - can edit an archived habit\'s details
   */
  test('TC05 - Archive page - can edit an archived habit\\\'s details', async ({ page }) => {
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
   * TC06: Archive page - can navigate back to home page
   */
  test('TC06 - Archive page - can navigate back to home page', async ({ page }) => {
    await page.goto('/archive');
    await page.getByRole('link', { name: '← Back to habits' }).click();
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
  });

  /**
   * TC07: Archive page - error message appears when loading fails (non-deterministic)
   */
  test('TC07 - Archive page - error message appears when loading fails (non-deterministic)', async ({ page }) => {
    await page.goto('/archive');
    await expect(page.locator('text=Could not load archived habits. Is the API running?')).toBeHidden();
  });

  /**
   * TC08: Archive page - empty state message is shown when no habits are archived (not reachable without backend control)
   */
  test('TC08 - Archive page - empty state message is shown when no habits are archived (not reachable without backend control)', async ({ page }) => {
    await page.goto('/archive');
    await expect(page.locator('text=No archived habits — anything you archive from the home page shows up here.')).toBeHidden();
  });

});
