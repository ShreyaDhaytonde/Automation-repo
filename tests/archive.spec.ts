import { test, expect } from '@playwright/test';

test.describe('Archive', () => {
  test.setTimeout(60000);

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 1: Archive page load
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC01: Archive page - loads and renders base elements
   */
  test('TC01 - Archive page - loads and renders base elements', async ({ page }) => {
    await page.goto("/archive");
    await expect(page.getByRole("heading", { name: "Archive" })).toBeVisible();
    await expect(page.getByRole("button", { name: "← Back to habits" })).toBeVisible();
    await expect(page.getByLabel("Switch to dark mode")).toBeVisible();
    await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
    await expect(page.getByText("Habits you\'ve archived, out of the main list.")).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 2: Archive
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC02: Archive page - renders with heading and controls
   */
  test('TC02 - Archive page - renders with heading and controls', async ({ page }) => {
    await page.goto('/archive');
    await expect(page.getByRole('heading', { name: 'Archive' })).toBeVisible();
    await expect(page.getByText("Habits you've archived, out of the main list.")).toBeVisible();
    await expect(page.getByRole('link', { name: '← Back to habits' })).toBeVisible();
    await expect(page.getByText('No archived habits — anything you archive from the home page shows up here.')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Theme toggle' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Log out' })).toBeVisible();
  });

  /**
   * TC03: Archive page - create and unarchive a habit
   */
  test('TC03 - Archive page - create and unarchive a habit', async ({ page }) => {
    const newHabitName = `Unarchive Test ${Date.now()}`;
    await page.goto('/');
    await page.getByRole('textbox', { name: 'New habit name' }).fill(newHabitName);
    await page.locator('select[aria-label="Habit category"]').selectOption({ index: 1 });
    await page.getByLabel('Target per week').fill('1');
    await page.getByLabel('Notes').fill('Testing unarchive.');
    await page.getByRole('button', { name: 'Add habit' }).click();
    const habitCard = page.getByRole('listitem').filter({ hasText: newHabitName });
    await expect(habitCard).toBeVisible();
    await habitCard.getByRole('button', { name: `Archive ${newHabitName}` }).click();
    await expect(habitCard).toHaveCount(0);
    await page.goto('/archive');
    const archivedHabit = page.getByRole('listitem').filter({ hasText: newHabitName });
    await expect(archivedHabit).toBeVisible();
    await archivedHabit.getByRole('button', { name: `Unarchive ${newHabitName}` }).click();
    await expect(archivedHabit).toHaveCount(0);
  });

  /**
   * TC04: Archive page - edit an archived habit\'s name
   */
  test('TC04 - Archive page - edit an archived habit\\\'s name', async ({ page }) => {
    const habitName = `Edit Archived ${Date.now()}`;
    await page.goto('/');
    await page.getByLabel('Name').fill(habitName);
    await page.getByLabel('Category').selectOption({ index: 1 });
    await page.getByLabel('Target per week').fill('3');
    await page.getByLabel('Notes').fill('Editing archived habit test.');
    await page.getByRole('button', { name: 'Add habit' }).click();
    const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
    await expect(habitCard).toBeVisible();
    await habitCard.getByRole('button', { name: `Archive ${habitName}` }).click();
    await expect(habitCard).toHaveCount(0);
    await page.goto('/archive');
    const archivedHabit = page.getByRole('listitem').filter({ hasText: habitName });
    await expect(archivedHabit).toBeVisible();
    await archivedHabit.getByRole('button', { name: `Edit ${habitName}` }).click();
    const nameInput = page.getByLabel(`Edit name for ${habitName}`);
    await expect(nameInput).toBeVisible();
    const newName = `Edited Archived ${Date.now()}`;
    await nameInput.fill(newName);
    await archivedHabit.getByRole('button', { name: `Save ${habitName}` }).click();
    await expect(page.getByRole('listitem').filter({ hasText: newName })).toBeVisible();
  });

  /**
   * TC05: Archive page - delete an archived habit
   */
  test('TC05 - Archive page - delete an archived habit', async ({ page }) => {
    const habitName = `Delete Archived ${Date.now()}`;
    await page.goto('/');
    await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
    await page.locator('select[aria-label="Habit category"]').selectOption({ index: 1 });
    await page.getByLabel('Target per week').fill('2');
    await page.getByLabel('Notes').fill('Deleting archived habit test.');
    await page.getByRole('button', { name: 'Add habit' }).click();
    const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
    await expect(habitCard).toBeVisible();
    await habitCard.getByRole('button', { name: `Archive ${habitName}` }).click();
    await expect(habitCard).toHaveCount(0);
    await page.goto('/archive');
    const archivedHabit = page.getByRole('listitem').filter({ hasText: habitName });
    await expect(archivedHabit).toBeVisible();
    await archivedHabit.getByRole('button', { name: `Delete ${habitName}` }).click();
    await expect(page.getByRole('listitem').filter({ hasText: habitName })).toHaveCount(0);
  });

  /**
   * TC06: History page - renders with heading and controls
   */
  test('TC06 - History page - renders with heading and controls', async ({ page }) => {
    await page.goto('/history');
    await expect(page.getByRole('heading', { name: 'History' })).toBeVisible();
    await expect(page.getByText('Last 28 days for each habit.')).toBeVisible();
    await expect(page.getByRole('link', { name: '← Back to habits' })).toBeVisible();
    await expect(page.getByText('Done')).toBeVisible();
    await expect(page.getByText('Frozen')).toBeVisible();
    await expect(page.getByText('Missed')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Theme toggle' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Log out' })).toBeVisible();
  });

  /**
   * TC07: Home page - renders with heading and controls
   */
  test('TC07 - Home page - renders with heading and controls', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
    await expect(page.getByText('Build small daily habits, one day at a time.')).toBeVisible();
    await expect(page.getByRole('link', { name: 'History' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'View stats' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Archive' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Theme toggle' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Log out' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Name' })).toBeVisible();
    await expect(page.getByLabel('Category')).toBeVisible();
    await expect(page.getByLabel('Target per week')).toBeVisible();
    await expect(page.getByLabel('Notes')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add habit' })).toBeVisible();
  });

  /**
   * TC08: History page - habit strips render and show status dots
   */
  test('TC08 - History page - habit strips render and show status dots', async ({ page }) => {
    const habitName = `History Test ${Date.now()}`;
    await page.goto('/');
    await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
    await page.locator('select[aria-label="Habit category"]').selectOption({ index: 1 });
    await page.getByLabel('Target per week').fill('3');
    await page.getByLabel('Notes').fill('History strip rendering test.');
    await page.getByRole('button', { name: 'Add habit' }).click();
    await page.goto('/history');
    const habitStrip = page.getByRole('img', { name: `${habitName} activity for the last 28 days` });
    await expect(habitStrip).toBeVisible();
  });

});
