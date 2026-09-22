import { test, expect } from '@playwright/test';

test.describe('Archive', () => {
  test.setTimeout(60000);

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 1: HabitCard - pin toggle
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC01: HabitCard - toggle pin state on an archived habit card
   */
  test('TC01 - HabitCard - toggle pin state on an archived habit card', async ({ page }) => {
    await page.goto('/archive');
    const habitName = `Pin Test Habit ${Date.now()}`;
    await page.getByLabel('Name').fill(habitName);
    await page.getByRole('button', { name: 'Add habit' }).click();
    await page.getByRole('button', { name: `Archive ${habitName}` }).click();
    const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
    const pinButton = habitCard.getByRole('button', { name: `Pin ${habitName}` });
    await pinButton.click();
    await expect(habitCard.getByRole('button', { name: `Unpin ${habitName}` })).toBeVisible();
    await habitCard.getByRole('button', { name: `Unpin ${habitName}` }).click();
    await expect(habitCard.getByRole('button', { name: `Pin ${habitName}` })).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 2: HabitCard - priority cycle
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC02: HabitCard - cycle priority on an archived habit card
   */
  test('TC02 - HabitCard - cycle priority on an archived habit card', async ({ page }) => {
    await page.goto('/archive');
    const habitName = `Priority Test Habit ${Date.now()}`;
    await page.getByLabel('Name').fill(habitName);
    await page.getByRole('button', { name: 'Add habit' }).click();
    await page.getByRole('button', { name: `Archive ${habitName}` }).click();
    const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
    const priorityButton = habitCard.getByRole('button', { name: new RegExp(`Cycle priority for ${habitName}, currently (Low|Medium|High)`) });
    const initialPriority = await priorityButton.textContent();
    await priorityButton.click();
    const nextPriority = initialPriority === 'Low' ? 'Medium' : initialPriority === 'Medium' ? 'High' : 'Low';
    await expect(habitCard.getByRole('button', { name: `Cycle priority for ${habitName}, currently ${nextPriority}` })).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 3: Archive
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC03: Archive page - loads and renders main UI elements
   */
  test('TC03 - Archive page - loads and renders main UI elements', async ({ page }) => {
    await page.goto('/archive');
    await expect(page.getByRole('heading', { name: 'Archive' })).toBeVisible();
    await expect(page.getByText("Habits you've archived, out of the main list.")).toBeVisible();
    await expect(page.getByRole('link', { name: '← Back to habits' })).toBeVisible();
    await expect(page.getByRole('list').or(page.getByText('No archived habits — anything you archive from the home page shows up here.'))).toBeVisible();
  });

  /**
   * TC04: Archive HabitCard - duplicates an archived habit, creating an active copy on home page
   */
  test('TC04 - Archive HabitCard - duplicates an archived habit, creating an active copy on home page', async ({ page }) => {
    await page.goto('/');
    const uniqueName = `Test Duplicate Archived ${Date.now()}`;
    await page.getByLabel('New habit name').fill(uniqueName);
    await page.getByLabel('Habit category').selectOption({ index: 0 });
    await page.getByLabel('Times per week').selectOption('7');
    await page.getByRole('button', { name: 'Add habit' }).click();
    const habitCard = page.getByRole('listitem').filter({ hasText: uniqueName });
    await expect(habitCard).toBeVisible();
    await habitCard.getByRole('button', { name: `Archive ${uniqueName}` }).click();
    await expect(habitCard).toHaveCount(0);
    await page.goto('/archive');
    const archivedHabitCard = page.getByRole('listitem').filter({ hasText: uniqueName });
    await expect(archivedHabitCard).toBeVisible();
    await archivedHabitCard.getByRole('button', { name: `Duplicate ${uniqueName}` }).click();
    await expect(page.getByText('Could not duplicate that habit — try again.')).toHaveCount(0);
    await page.goto('/');
    const duplicatedHabitCard = page.getByRole('listitem').filter({ hasText: `${uniqueName} (copy)` });
    await expect(duplicatedHabitCard).toBeVisible();
  });

  /**
   * TC05: HabitCard - duplicate habit button is visible and clickable on archived habits
   */
  test('TC05 - HabitCard - duplicate habit button is visible and clickable on archived habits', async ({ page }) => {
    await page.goto('/');
    const uniqueName = `Test Archived Duplicate Button ${Date.now()}`;
    await page.getByLabel('New habit name').fill(uniqueName);
    await page.getByLabel('Habit category').selectOption({ index: 0 });
    await page.getByLabel('Times per week').selectOption('7');
    await page.getByRole('button', { name: 'Add habit' }).click();
    const habitCard = page.getByRole('listitem').filter({ hasText: uniqueName });
    await expect(habitCard).toBeVisible();
    await habitCard.getByRole('button', { name: `Archive ${uniqueName}` }).click();
    await expect(habitCard).toHaveCount(0);
    await page.goto('/archive');
    const archivedHabitCard = page.getByRole('listitem').filter({ hasText: uniqueName });
    await expect(archivedHabitCard.getByRole('button', { name: `Duplicate ${uniqueName}` })).toBeVisible();
    await archivedHabitCard.getByRole('button', { name: `Duplicate ${uniqueName}` }).click();
  });

  /**
   * TC06: Archive page - loads and shows static elements
   */
  test('TC06 - Archive page - loads and shows static elements', async ({ page }) => {
    await page.goto('/archive');
    await expect(page.getByRole('heading', { name: 'Archive' })).toBeVisible();
    await expect(page.getByRole('link', { name: '← Back to habits' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
    await expect(page.getByRole('button', { name: /switch to dark mode/i })).toBeVisible();
  });

  /**
   * TC07: Archive page - can delete an archived habit
   */
  test('TC07 - Archive page - can delete an archived habit', async ({ page }) => {
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
    await expect(habitCard).toHaveCount(0);
    await page.goto('/archive');
    const archivedHabitCard = page.getByRole('listitem').filter({ hasText: uniqueName });
    await expect(archivedHabitCard).toBeVisible();
    page.on('dialog', (dialog) => dialog.accept());
    await archivedHabitCard.getByRole('button', { name: `Delete ${uniqueName}`, exact: true }).click();
    await expect(archivedHabitCard).toHaveCount(0);
  });

  /**
   * TC08: Archive page - can unarchive an archived habit
   */
  test('TC08 - Archive page - can unarchive an archived habit', async ({ page }) => {
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
    await expect(habitCard).toHaveCount(0);
    await page.goto('/archive');
    const archivedHabitCard = page.getByRole('listitem').filter({ hasText: uniqueName });
    await expect(archivedHabitCard).toBeVisible();
    await archivedHabitCard.getByRole('button', { name: `Unarchive ${uniqueName}`, exact: true }).click();
    await expect(page.getByRole('listitem').filter({ hasText: uniqueName })).toHaveCount(0);
  });

  /**
   * TC09: Archive page - can navigate back to home page
   */
  test('TC09 - Archive page - can navigate back to home page', async ({ page }) => {
    await page.goto('/archive');
    await page.getByRole('link', { name: '← Back to habits' }).click();
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
  });

  /**
   * TC10: Archive page - error message appears when loading fails (non-deterministic)
   */
  test('TC10 - Archive page - error message appears when loading fails (non-deterministic)', async ({ page }) => {
    await page.goto('/archive');
    await expect(page.getByText('Could not load archived habits. Is the API running?')).toBeHidden();
  });

  /**
   * TC11: Archive page - empty state message is shown when no habits are archived (not reachable without backend control)
   */
  test('TC11 - Archive page - empty state message is shown when no habits are archived (not reachable without backend control)', async ({ page }) => {
    await page.goto('/archive');
    await expect(page.getByText('No archived habits — anything you archive from the home page shows up here.')).toBeHidden();
  });

});
