import { test, expect } from '@playwright/test';

test.describe('Home', () => {
  test.setTimeout(60000);

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 1: Habit creation
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC01: HabitForm - creates a new habit successfully
   */
  test('TC01 - HabitForm - creates a new habit successfully', async ({ page }) => {
    await page.goto('/');
    const habitName = `Test Habit ${Date.now()}`;
    await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
    await page.getByRole('combobox', { name: 'Habit category' }).selectOption('General');
    await page.getByRole('combobox', { name: 'Times per week' }).selectOption('3');
    await page.getByRole('textbox', { name: 'Notes (optional)' }).fill('Test notes');
    await page.getByRole('button', { name: 'Add habit' }).click();
    const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
    await expect(habitCard).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 2: Home page load
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC02: Home - page loads and displays header and controls
   */
  test('TC02 - Home - page loads and displays header and controls', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
    await expect(page.getByText('Build small daily habits, one day at a time.')).toBeVisible();
    await expect(page.locator('p.text-xs.text-zinc-400').first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'History' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'View stats' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Archive' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Switch to dark mode' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
    await expect(page.getByRole('searchbox', { name: 'Search habits by name' })).toBeVisible();
    await expect(page.getByRole('combobox', { name: 'Sort habits by' })).toBeVisible();
    await expect(page.getByRole('combobox', { name: 'Filter by category' })).toBeVisible();
    await expect(page.getByLabel('Show archived')).toBeVisible();
    await expect(page.getByRole('button', { name: /^Complete all for today/ })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Export JSON' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Export CSV' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add habit' })).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 3: Habit list actions
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC03: HabitList - deletes a habit after confirmation
   */
  test('TC03 - HabitList - deletes a habit after confirmation', async ({ page }) => {
    await page.goto('/');
    const habitName = `Delete Habit ${Date.now()}`;
    await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
    await page.getByRole('combobox', { name: 'Habit category' }).selectOption('General');
    await page.getByRole('combobox', { name: 'Times per week' }).selectOption('3');
    await page.getByRole('button', { name: 'Add habit' }).click();
    const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
    await expect(habitCard).toBeVisible();
    page.on('dialog', (dialog) => dialog.accept());
    await habitCard.getByRole('button', { name: `Delete ${habitName}` }).click();
    await expect(habitCard).toHaveCount(0);
  });

  /**
   * TC04: HabitList - edits a habit and verifies updated values
   */
  test('TC04 - HabitList - edits a habit and verifies updated values', async ({ page }) => {
    await page.goto('/');
    const habitName = `Edit Habit ${Date.now()}`;
    await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
    await page.getByRole('combobox', { name: 'Habit category' }).selectOption('General');
    await page.getByRole('combobox', { name: 'Times per week' }).selectOption('3');
    await page.getByRole('button', { name: 'Add habit' }).click();
    const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
    await expect(habitCard).toBeVisible();
    await habitCard.getByRole('button', { name: `Edit ${habitName}` }).click();
    const nameInput = page.getByLabel(`Edit name for ${habitName}`);
    await expect(nameInput).toHaveValue(habitName);
    const newName = `${habitName} Updated`;
    await nameInput.fill(newName);
    await habitCard.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByRole('listitem').filter({ hasText: newName })).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 4: Bulk actions
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC05: Home - completes all pending habits for today
   */
  test('TC05 - Home - completes all pending habits for today', async ({ page }) => {
    await page.goto('/');
    const completeAllButton = page.getByRole('button', { name: /^Complete all for today/ });
    await expect(completeAllButton).toBeEnabled();
    await completeAllButton.click();
    await expect(completeAllButton).toBeDisabled();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 5: Habit list actions
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC06: HabitList - skips and unskips a habit
   */
  test('TC06 - HabitList - skips and unskips a habit', async ({ page }) => {
    await page.goto('/');
    const habitName = `Skip Habit ${Date.now()}`;
    await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
    await page.getByRole('combobox', { name: 'Habit category' }).selectOption('General');
    await page.getByRole('combobox', { name: 'Times per week' }).selectOption('3');
    await page.getByRole('button', { name: 'Add habit' }).click();
    const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
    await expect(habitCard).toBeVisible();
    await habitCard.getByRole('button', { name: `Skip ${habitName}` }).click();
    await expect(habitCard.getByRole('button', { name: `Skipped ${habitName}` })).toBeVisible();
    await habitCard.getByRole('button', { name: `Unskip ${habitName}` }).click();
    await expect(habitCard.getByRole('button', { name: `Skip ${habitName}` })).toBeVisible();
  });

  /**
   * TC07: HabitList - toggles archive state of a habit
   */
  test('TC07 - HabitList - toggles archive state of a habit', async ({ page }) => {
    await page.goto('/');
    const habitName = `Archive Habit ${Date.now()}`;
    await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
    await page.getByRole('combobox', { name: 'Habit category' }).selectOption('General');
    await page.getByRole('combobox', { name: 'Times per week' }).selectOption('3');
    await page.getByRole('button', { name: 'Add habit' }).click();
    const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
    await expect(habitCard).toBeVisible();
    await habitCard.getByRole('checkbox', { name: `Archive ${habitName}` }).check();
    await expect(habitCard).toHaveCount(0);
    await page.getByLabel('Show archived').check();
    const archivedCard = page.getByRole('listitem').filter({ hasText: habitName });
    await expect(archivedCard).toBeVisible();
    await archivedCard.getByRole('checkbox', { name: `Unarchive ${habitName}` }).uncheck();
    await expect(page.getByRole('listitem').filter({ hasText: habitName })).toBeVisible();
  });

  /**
   * TC08: HabitList - duplicates a habit
   */
  test('TC08 - HabitList - duplicates a habit', async ({ page }) => {
    await page.goto('/');
    const habitName = `Duplicate Habit ${Date.now()}`;
    await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
    await page.getByRole('combobox', { name: 'Habit category' }).selectOption('General');
    await page.getByRole('combobox', { name: 'Times per week' }).selectOption('3');
    await page.getByRole('button', { name: 'Add habit' }).click();
    const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
    await expect(habitCard).toBeVisible();
    await habitCard.getByRole('button', { name: `Duplicate ${habitName}` }).click();
    const duplicateCard = page.getByRole('listitem').filter({ hasText: `${habitName} (copy)` });
    await expect(duplicateCard).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 6: Filter and search
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC09: Home - clears all filters and resets controls
   */
  test('TC09 - Home - clears all filters and resets controls', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('combobox', { name: 'Filter by category' }).selectOption('General');
    await page.getByLabel('Show archived').check();
    await page.getByRole('textbox', { name: 'Search habits by name' }).fill('test');
    await page.getByRole('combobox', { name: 'Sort habits by' }).selectOption('streak');
    await page.getByRole('button', { name: 'Clear filters' }).click();
    await expect(page.getByRole('combobox', { name: 'Filter by category' })).toHaveValue('');
    await expect(page.getByLabel('Show archived')).not.toBeChecked();
    await expect(page.getByRole('textbox', { name: 'Search habits by name' })).toHaveValue('');
    await expect(page.getByRole('combobox', { name: 'Sort habits by' })).toHaveValue('name');
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 7: Habit creation validation
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC10: HabitForm - shows validation error when name is empty
   */
  test('TC10 - HabitForm - shows validation error when name is empty', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel('Name').fill('');
    await page.getByRole('button', { name: 'Add habit' }).click();
    await expect(page.getByText('Name is required')).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 8: Home
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC11: Home - page loads with unconditional elements visible
   */
  test('TC11 - Home - page loads with unconditional elements visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'New habit name' })).toBeVisible();
    await expect(page.getByLabel('Habit category')).toBeVisible();
    await expect(page.getByLabel('Times per week')).toBeVisible();
    await expect(page.getByLabel('Notes (optional)')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add habit' })).toBeVisible();
    await expect(page.getByRole('searchbox', { name: 'Search habits by name' })).toBeVisible();
    await expect(page.getByRole('combobox', { name: 'Sort habits by' })).toBeVisible();
    await expect(page.getByRole('combobox', { name: 'Filter by category' })).toBeVisible();
    await expect(page.getByLabel('Show archived')).toBeVisible();
    await expect(page.getByRole('link', { name: 'View stats' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Complete all for today' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Export JSON' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Export CSV' })).toBeVisible();
  });

  /**
   * TC12: HabitForm - adds a new habit successfully
   */
  test('TC12 - HabitForm - adds a new habit successfully', async ({ page }) => {
    await page.goto('/');
    const uniqueName = `Habit ${Date.now()}`;
    await page.getByRole('textbox', { name: 'New habit name' }).fill(uniqueName);
    await page.getByLabel('Habit category').selectOption('General');
    await page.getByLabel('Times per week').selectOption('7');
    await page.getByRole('textbox', { name: 'Notes (optional)' }).fill('Test notes');
    await page.getByRole('button', { name: 'Add habit' }).click();
    const habitItem = page.getByRole('listitem').filter({ hasText: uniqueName });
    await expect(habitItem).toBeVisible();
  });

  /**
   * TC13: HabitCard - edits a habit\'s name, category, target per week, and notes successfully
   */
  test('TC13 - HabitCard - edits a habit\\\'s name, category, target per week, and notes successfully', async ({ page }) => {
    await page.goto('/');
    const originalName = `EditTest ${Date.now()}`;
    const newName = `${originalName} Updated`;
    await page.getByRole('textbox', { name: 'New habit name' }).fill(originalName);
    await page.getByRole('button', { name: 'Add habit' }).click();
    const habitItem = page.getByRole('listitem').filter({ hasText: originalName });
    await expect(habitItem).toBeVisible();
    await habitItem.getByRole('button', { name: `Edit ${originalName}` }).click();
    const nameInput = page.getByLabel(`Edit name for ${originalName}`);
    await expect(nameInput).toHaveValue(originalName);
    await nameInput.fill(newName);
    await page.getByLabel(`Edit category for ${originalName}`).selectOption('Health');
    await page.getByLabel(`Edit times per week for ${originalName}`).selectOption('5');
    await page.getByLabel(`Edit notes for ${originalName}`).fill('Updated notes');
    await habitItem.getByRole('button', { name: 'Save' }).click();
    const updatedHabitItem = page.getByRole('listitem').filter({ hasText: newName });
    await expect(updatedHabitItem).toBeVisible();
  });

  /**
   * TC14: HabitCard - marks a habit as done today button disables afterward
   */
  test('TC14 - HabitCard - marks a habit as done today button disables afterward', async ({ page }) => {
    await page.goto('/');
    const habitName = `CompleteTest ${Date.now()}`;
    await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
    await page.getByRole('button', { name: 'Add habit' }).click();
    const habitItem = page.getByRole('listitem').filter({ hasText: habitName });
    await expect(habitItem).toBeVisible();
    const markDoneButton = habitItem.getByRole('button', { name: 'Mark done' });
    await markDoneButton.click();
    await expect(habitItem.getByRole('button', { name: 'Done today' })).toBeVisible();
    await expect(habitItem.getByRole('button', { name: 'Done today' })).toBeDisabled();
  });

  /**
   * TC15: HabitCard - archives and unarchives a habit
   */
  test('TC15 - HabitCard - archives and unarchives a habit', async ({ page }) => {
    await page.goto('/');
    const habitName = `ArchiveTest ${Date.now()}`;
    await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
    await page.getByRole('button', { name: 'Add habit' }).click();
    const habitItem = page.getByRole('listitem').filter({ hasText: habitName });
    await expect(habitItem).toBeVisible();
    await habitItem.getByRole('button', { name: `Archive ${habitName}` }).click();
    await expect(habitItem).toHaveCount(0);
    await page.getByLabel('Show archived').check();
    const archivedHabitItem = page.getByRole('listitem').filter({ hasText: habitName });
    await expect(archivedHabitItem.getByRole('button', { name: `Unarchive ${habitName}` })).toBeVisible();
  });

  /**
   * TC16: HabitCard - removes a habit after confirm dialog
   */
  test('TC16 - HabitCard - removes a habit after confirm dialog', async ({ page }) => {
    await page.goto('/');
    const habitName = `DeleteTest ${Date.now()}`;
    await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
    await page.getByRole('button', { name: 'Add habit' }).click();
    const habitItem = page.getByRole('listitem').filter({ hasText: habitName });
    await expect(habitItem).toBeVisible();
    page.on('dialog', (dialog) => dialog.accept());
    await habitItem.getByRole('button', { name: `Delete ${habitName}` }).click();
    await expect(page.getByRole('listitem').filter({ hasText: habitName })).toHaveCount(0);
  });

  /**
   * TC17: Search box - filters habit list by matching name
   */
  test('TC17 - Search box - filters habit list by matching name', async ({ page }) => {
    await page.goto('/');
    const uniqueName = `SearchTest ${Date.now()}`;
    await page.getByRole('textbox', { name: 'New habit name' }).fill(uniqueName);
    await page.getByRole('button', { name: 'Add habit' }).click();
    await expect(page.getByRole('listitem').filter({ hasText: uniqueName })).toBeVisible();
    await page.getByRole('searchbox', { name: 'Search habits by name' }).fill(uniqueName);
    await expect(page.getByRole('listitem').filter({ hasText: uniqueName })).toBeVisible();
    await page.getByRole('searchbox', { name: 'Search habits by name' }).fill('nonexistentsearchterm' + Date.now());
    await expect(page.getByText(`No habits match "nonexistentsearchterm`)).toBeVisible();
  });

  /**
   * TC18: Category filter - filters habit list by category
   */
  test('TC18 - Category filter - filters habit list by category', async ({ page }) => {
    await page.goto('/');
    const uniqueName = `CategoryTest ${Date.now()}`;
    await page.getByRole('textbox', { name: 'New habit name' }).fill(uniqueName);
    await page.getByLabel('Habit category').selectOption('Health');
    await page.getByRole('button', { name: 'Add habit' }).click();
    await expect(page.getByRole('listitem').filter({ hasText: uniqueName })).toBeVisible();
    await page.getByLabel('Filter by category').selectOption('Health');
    await expect(page.getByRole('listitem').filter({ hasText: uniqueName })).toBeVisible();
  });

  /**
   * TC19: Sort by dropdown - sorts habit list by name ascending
   */
  test('TC19 - Sort by dropdown - sorts habit list by name ascending', async ({ page }) => {
    await page.goto('/');
    const uniqueNameA = `SortA ${Date.now()}`;
    const uniqueNameB = `SortB ${Date.now() + 1}`;
    await page.getByRole('textbox', { name: 'New habit name' }).fill(uniqueNameB);
    await page.getByRole('button', { name: 'Add habit' }).click();
    await expect(page.getByRole('listitem').filter({ hasText: uniqueNameB })).toBeVisible();
    await page.getByRole('textbox', { name: 'New habit name' }).fill(uniqueNameA);
    await page.getByRole('button', { name: 'Add habit' }).click();
    await expect(page.getByRole('listitem').filter({ hasText: uniqueNameA })).toBeVisible();
    await page.getByRole('combobox', { name: 'Sort habits by' }).selectOption('name');
    const items = await page.getByRole('listitem').all();
    const texts = await Promise.all(items.map((item) => item.textContent()));
    const sorted = texts.every((text, i, arr) => !i || (text?.localeCompare(arr[i-1]!) ?? -1) >= 0);
    expect(sorted).toBe(true);
  });

  /**
   * TC20: HabitForm - disables Add habit button when name is empty
   */
  test('TC20 - HabitForm - disables Add habit button when name is empty', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('textbox', { name: 'New habit name' }).fill('');
    await expect(page.getByRole('button', { name: 'Add habit' })).toBeDisabled();
  });

  /**
   * TC21: Home page - page loads and renders unconditional elements
   */
  test('TC21 - Home page - page loads and renders unconditional elements', async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Habit Tracker" })).toBeVisible();
    await expect(page.getByText("Build small daily habits, one day at a time.")).toBeVisible();
    await expect(page.getByLabel("Filter by category")).toBeVisible();
    await expect(page.getByLabel("Filter by category").locator("option").first()).toHaveText("All");
    for (const category of ["General", "Health", "Work", "Personal", "Learning"]) {
      await expect(page.getByLabel("Filter by category").locator("option").filter({ hasText: category })).toHaveCount(1);
    }
    await expect(page.getByRole("textbox", { name: "New habit name" })).toBeVisible();
    await expect(page.getByLabel("Habit category")).toBeVisible();
    for (const category of ["General", "Health", "Work", "Personal", "Learning"]) {
      await expect(page.getByLabel("Habit category").locator("option").filter({ hasText: category })).toHaveCount(1);
    }
    await expect(page.getByLabel("Times per week")).toBeVisible();
    for (const n of ["1x / week","2x / week","3x / week","4x / week","5x / week","6x / week","7x / week"]) {
      await expect(page.getByLabel("Times per week").locator("option").filter({ hasText: n })).toHaveCount(1);
    }
    await expect(page.getByRole("button", { name: "Add habit" })).toBeVisible();
  });

  /**
   * TC22: HabitCard - inline edit form displays when Edit button clicked and updates fields
   */
  test('TC22 - HabitCard - inline edit form displays when Edit button clicked and updates fields', async ({ page }) => {
    await page.goto("/");
    const habitName = `Edit habit ${Date.now()}`;
    await page.getByRole("textbox", { name: "New habit name" }).fill(habitName);
    await page.getByLabel("Habit category").selectOption("General");
    await page.getByLabel("Times per week").selectOption("3");
    await page.getByRole("button", { name: "Add habit" }).click();
    const habitCard = page.getByRole("listitem").filter({ hasText: habitName });
    await expect(habitCard).toBeVisible();
    const editButton = habitCard.getByRole("button", { name: `Edit ${habitName}` });
    await editButton.click();
    const editNameInput = page.getByLabel(`Edit name for ${habitName}`);
    const editCategorySelect = page.getByLabel(`Edit category for ${habitName}`);
    const editTimesSelect = page.getByLabel(`Edit times per week for ${habitName}`);
    await expect(editNameInput).toBeVisible();
    await expect(editNameInput).toHaveValue(habitName);
    await expect(editCategorySelect).toHaveValue("General");
    await expect(editTimesSelect).toHaveValue("3");
    const newName = `${habitName} updated`;
    await editNameInput.fill(newName);
    await editCategorySelect.selectOption("Health");
    await editTimesSelect.selectOption("5");
    await page.getByRole("button", { name: "Save", exact: true }).click();
    const updatedHabitCard = page.getByRole("listitem").filter({ hasText: newName });
    await expect(updatedHabitCard).toBeVisible();
  });

  /**
   * TC23: HabitForm - form validation disables Add habit button for empty name
   */
  test('TC23 - HabitForm - form validation disables Add habit button for empty name', async ({ page }) => {
    await page.goto("/");
    const input = page.getByRole("textbox", { name: "New habit name" });
    const addButton = page.getByRole("button", { name: "Add habit" });
    await input.fill("");
    await expect(addButton).toBeDisabled();
    await input.fill("   ");
    await expect(addButton).toBeDisabled();
  });

  /**
   * TC24: HabitCard - cancel edit closes inline form without saving changes
   */
  test('TC24 - HabitCard - cancel edit closes inline form without saving changes', async ({ page }) => {
    await page.goto("/");
    const habitName = `Cancel edit habit ${Date.now()}`;
    await page.getByRole("textbox", { name: "New habit name" }).fill(habitName);
    await page.getByLabel("Habit category").selectOption("General");
    await page.getByLabel("Times per week").selectOption("3");
    await page.getByRole("button", { name: "Add habit" }).click();
    const habitCard = page.getByRole("listitem").filter({ hasText: habitName });
    await expect(habitCard).toBeVisible();
    const editButton = habitCard.getByRole("button", { name: `Edit ${habitName}` });
    await editButton.click();
    const editNameInput = page.getByLabel(`Edit name for ${habitName}`);
    await editNameInput.fill("Changed name");
    await page.getByRole("button", { name: "Cancel", exact: true }).click();
    await expect(page.getByLabel(`Edit name for ${habitName}`)).toHaveCount(0);
    await expect(habitCard).toBeVisible();
  });

  /**
   * TC25: HabitCard - Save button disabled when name input is empty or blank
   */
  test('TC25 - HabitCard - Save button disabled when name input is empty or blank', async ({ page }) => {
    await page.goto("/");
    const habitName = `Edit validation habit ${Date.now()}`;
    await page.getByRole("textbox", { name: "New habit name" }).fill(habitName);
    await page.getByLabel("Habit category").selectOption("General");
    await page.getByLabel("Times per week").selectOption("3");
    await page.getByRole("button", { name: "Add habit" }).click();
    const habitCard = page.getByRole("listitem").filter({ hasText: habitName });
    await expect(habitCard).toBeVisible();
    const editButton = habitCard.getByRole("button", { name: `Edit ${habitName}` });
    await editButton.click();
    const saveButton = page.getByRole("button", { name: "Save", exact: true });
    const nameInput = page.getByLabel(`Edit name for ${habitName}`);
    await nameInput.fill("");
    await expect(saveButton).toBeDisabled();
    await nameInput.fill("   ");
    await expect(saveButton).toBeDisabled();
  });

  /**
   * TC26: Page heading and static elements render
   */
  test('TC26 - Page heading and static elements render', async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Habit Tracker" })).toBeVisible();
    await expect(page.getByText("Build small daily habits, one day at a time.")).toBeVisible();
    await expect(page.getByLabel("Filter by category")).toBeVisible();
    await expect(page.getByRole("combobox", { name: "Filter by category" })).toBeVisible();
    await expect(page.getByRole("textbox", { name: "New habit name" })).toBeVisible();
    await expect(page.getByRole("combobox", { name: "Habit category" })).toBeVisible();
    await expect(page.getByRole("combobox", { name: "Times per week" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Add habit" })).toBeVisible();
  });

  /**
   * TC27: HabitForm - allows creating a new habit
   */
  test('TC27 - HabitForm - allows creating a new habit', async ({ page }) => {
    await page.goto("/");
    const habitName = `Test habit create ${Date.now()}`;
    await page.getByRole("textbox", { name: "New habit name" }).fill(habitName);
    await page.getByRole("combobox", { name: "Habit category" }).selectOption("General");
    await page.getByRole("combobox", { name: "Times per week" }).selectOption("7");
    await page.getByRole("button", { name: "Add habit" }).click();
    const habitCard = page.getByRole("listitem").filter({ hasText: habitName });
    await expect(habitCard).toBeVisible();
  });

  /**
   * TC28: Category filter - allows filtering habits
   */
  test('TC28 - Category filter - allows filtering habits', async ({ page }) => {
    await page.goto("/");
    await page.getByRole("combobox", { name: "Filter by category" }).selectOption("Health");
    await expect(page.getByLabel("Filter by category")).toHaveValue("Health");
  });

  /**
   * TC29: HabitCard - marks habit done today disables button
   */
  test('TC29 - HabitCard - marks habit done today disables button', async ({ page }) => {
    await page.goto('/');
    const habitName = `Daily completion habit ${Date.now()}`;
    await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
    await page.getByRole('button', { name: 'Add habit' }).click();
    const card = page.getByRole('listitem').filter({ hasText: habitName });
    const markDoneButton = card.getByRole('button', { name: 'Mark done', exact: true });
    await markDoneButton.click();
    await expect(card.getByRole('button', { name: 'Done today', exact: true })).toBeVisible();
    await expect(card.getByRole('button', { name: 'Done today', exact: true })).toBeDisabled();
  });

  /**
   * TC30: HabitCard inline edit form - opens and cancels edit mode
   */
  test('TC30 - HabitCard inline edit form - opens and cancels edit mode', async ({ page }) => {
    await page.goto("/");
    const habitName = `Editable habit ${Date.now()}`;
    await page.getByRole("textbox", { name: "New habit name" }).fill(habitName);
    await page.getByRole("button", { name: "Add habit" }).click();
    const card = page.getByRole("listitem").filter({ hasText: habitName });
    await card.getByRole("button", { name: `Edit ${habitName}` }).click();
    const nameInput = page.getByLabel(`Edit name for ${habitName}`);
    await expect(nameInput).toBeVisible();
    await page.getByRole("button", { name: "Cancel", exact: true }).click();
    await expect(card.getByRole("button", { name: `Edit ${habitName}` })).toBeVisible();
  });

  /**
   * TC31: HabitCard inline edit form - saves edited habit and closes form
   */
  test('TC31 - HabitCard inline edit form - saves edited habit and closes form', async ({ page }) => {
    await page.goto("/");
    const habitName = `Editable habit save ${Date.now()}`;
    await page.getByRole("textbox", { name: "New habit name" }).fill(habitName);
    await page.getByRole("button", { name: "Add habit" }).click();
    const card = page.getByRole("listitem").filter({ hasText: habitName });
    await card.getByRole("button", { name: `Edit ${habitName}` }).click();
    const nameInput = page.getByLabel(`Edit name for ${habitName}`);
    await expect(nameInput).toHaveValue(habitName);
    const updatedName = `${habitName} updated`;
    await nameInput.fill(updatedName);
    const categorySelect = page.getByLabel(`Edit category for ${habitName}`);
    await categorySelect.selectOption("General");
    const timesSelect = page.getByLabel(`Edit times per week for ${habitName}`);
    await timesSelect.selectOption("3");
    await page.getByRole("button", { name: "Save", exact: true }).click();
    await expect(page.getByRole("listitem").filter({ hasText: updatedName })).toBeVisible();
    await expect(page.getByLabel(`Edit name for ${habitName}`)).toHaveCount(0);
  });

  /**
   * TC32: Home page - initial render shows main heading, filter, show archived checkbox, export buttons disabled, and navigation link
   */
  test('TC32 - Home page - initial render shows main heading, filter, show archived checkbox, export buttons disabled, and navigation link', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
    const categoryFilter = page.getByLabel('Filter by category');
    await expect(categoryFilter).toBeVisible();
    const allOption = categoryFilter.locator('option[value=""]');
    await expect(allOption).toHaveCount(1);
    await expect(categoryFilter).toHaveValue('');
    const showArchivedCheckbox = page.getByLabel('Show archived');
    await expect(showArchivedCheckbox).toBeVisible();
    await expect(showArchivedCheckbox).not.toBeChecked();
    const exportJsonButton = page.getByRole('button', { name: 'Export JSON' });
    await expect(exportJsonButton).toBeVisible();
    await expect(exportJsonButton).toBeDisabled();
    const exportCsvButton = page.getByRole('button', { name: 'Export CSV' });
    await expect(exportCsvButton).toBeVisible();
    await expect(exportCsvButton).toBeDisabled();
    const statsLink = page.getByRole('link', { name: 'View stats' });
    await expect(statsLink).toBeVisible();
  });

  /**
   * TC33: HabitForm - create a habit with notes successfully adds it to the list and enables export buttons
   */
  test('TC33 - HabitForm - create a habit with notes successfully adds it to the list and enables export buttons', async ({ page }) => {
    await page.goto('/');
    const habitName = `Test habit ${Date.now()}`;
    const habitNotes = 'Test note for habit';
    await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
    await page.getByRole('combobox', { name: 'Habit category' }).selectOption('Health');
    await page.getByRole('combobox', { name: 'Times per week' }).selectOption('3');
    await page.getByRole('textbox', { name: 'Notes (optional)' }).fill(habitNotes);
    await page.getByRole('button', { name: 'Add habit' }).click();
    const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
    await expect(habitCard).toBeVisible();
    await expect(habitCard.getByText(habitNotes)).toBeVisible();
    const exportJsonButton = page.getByRole('button', { name: 'Export JSON' });
    await expect(exportJsonButton).toBeEnabled();
    const exportCsvButton = page.getByRole('button', { name: 'Export CSV' });
    await expect(exportCsvButton).toBeEnabled();
  });

  /**
   * TC34: HabitCard - edit habit updates name, category, target per week, and notes
   */
  test('TC34 - HabitCard - edit habit updates name, category, target per week, and notes', async ({ page }) => {
    await page.goto('/');
    const originalName = `Edit habit ${Date.now()}`;
    const updatedName = `Updated habit ${Date.now()}`;
    const updatedNotes = 'Updated notes';
    await page.getByRole('textbox', { name: 'New habit name' }).fill(originalName);
    await page.getByRole('combobox', { name: 'Habit category' }).selectOption('Work');
    await page.getByRole('combobox', { name: 'Times per week' }).selectOption('2');
    await page.getByRole('textbox', { name: 'Notes (optional)' }).fill('Initial notes');
    await page.getByRole('button', { name: 'Add habit' }).click();
    const habitCard = page.getByRole('listitem').filter({ hasText: originalName });
    await expect(habitCard).toBeVisible();
    await habitCard.getByRole('button', { name: `Edit ${originalName}` }).click();
    const nameInput = page.getByLabel(`Edit name for ${originalName}`);
    await expect(nameInput).toHaveValue(originalName);
    const notesInput = page.getByLabel(`Edit notes for ${originalName}`);
    await expect(notesInput).toHaveValue('Initial notes');
    await nameInput.fill(updatedName);
    await page.getByLabel(`Edit category for ${originalName}`).selectOption('Personal');
    await page.getByLabel(`Edit times per week for ${originalName}`).selectOption('5');
    await notesInput.fill(updatedNotes);
    await page.getByRole('button', { name: 'Save', exact: true }).click();
    const updatedHabitCard = page.getByRole('listitem').filter({ hasText: updatedName });
    await expect(updatedHabitCard).toBeVisible();
    await expect(updatedHabitCard.getByText(updatedNotes)).toBeVisible();
  });

  /**
   * TC35: HabitCard - archive and unarchive a habit via its archive toggle button
   */
  test('TC35 - HabitCard - archive and unarchive a habit via its archive toggle button', async ({ page }) => {
    await page.goto('/');
    const habitName = `Archive habit ${Date.now()}`;
    await page.getByLabel('New habit name').fill(habitName);
    await page.getByRole('button', { name: 'Add habit' }).click();
    const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
    await expect(habitCard).toBeVisible();
    const archiveButton = habitCard.getByRole('button', { name: `Archive ${habitName}` });
    await archiveButton.click();
    await expect(page.getByRole('listitem').filter({ hasText: habitName })).toHaveCount(0);
    await page.getByLabel('Show archived').check();
    const archivedHabitCard = page.getByRole('listitem').filter({ hasText: habitName });
    await expect(archivedHabitCard).toBeVisible();
    const unarchiveButton = archivedHabitCard.getByRole('button', { name: `Unarchive ${habitName}` });
    await unarchiveButton.click();
    await expect(page.getByRole('listitem').filter({ hasText: habitName })).toHaveCount(1);
  });

  /**
   * TC36: HabitCard - mark habit as done disables mark done button
   */
  test('TC36 - HabitCard - mark habit as done disables mark done button', async ({ page }) => {
    await page.goto('/');
    const habitName = `Complete habit ${Date.now()}`;
    await page.getByLabel('New habit name').fill(habitName);
    await page.getByLabel('Habit category').selectOption('General');
    await page.getByLabel('Times per week').selectOption('7');
    await page.getByRole('button', { name: 'Add habit' }).click();
    const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
    const markDoneButton = habitCard.getByRole('button', { name: 'Mark done', exact: true });
    await markDoneButton.click();
    await expect(habitCard.getByRole('button', { name: 'Done today', exact: true })).toBeDisabled();
  });

  /**
   * TC37: Home - filter habits list by category changes displayed habits accordingly
   */
  test('TC37 - Home - filter habits list by category changes displayed habits accordingly', async ({ page }) => {
    await page.goto('/');
    const categoryFilter = page.getByLabel('Filter by category');
    await categoryFilter.selectOption('Health');
    await expect(categoryFilter).toHaveValue('Health');
  });

  /**
   * TC38: Home - toggling show archived checkbox updates displayed habits accordingly
   */
  test('TC38 - Home - toggling show archived checkbox updates displayed habits accordingly', async ({ page }) => {
    await page.goto('/');
    const showArchivedCheckbox = page.getByLabel('Show archived');
    await showArchivedCheckbox.check();
    await expect(showArchivedCheckbox).toBeChecked();
    await showArchivedCheckbox.uncheck();
    await expect(showArchivedCheckbox).not.toBeChecked();
  });

  /**
   * TC39: Home - Export JSON and Export CSV buttons are disabled when no habits exist and enabled after habits are created
   */
  test('TC39 - Home - Export JSON and Export CSV buttons are disabled when no habits exist and enabled after habits are created', async ({ page }) => {
    await page.goto('/');
    const exportJsonButton = page.getByRole('button', { name: 'Export JSON' });
    const exportCsvButton = page.getByRole('button', { name: 'Export CSV' });
    await expect(exportJsonButton).toBeDisabled();
    await expect(exportCsvButton).toBeDisabled();
    const habitName = `Habit for export ${Date.now()}`;
    await page.getByLabel('New habit name').fill(habitName);
    await page.getByRole('button', { name: 'Add habit' }).click();
    await expect(exportJsonButton).toBeEnabled();
    await expect(exportCsvButton).toBeEnabled();
  });

  /**
   * TC40: LogoutButton - logout button logs out and navigates to /login
   */
  test('TC40 - LogoutButton - logout button logs out and navigates to /login', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Logout' }).click();
    await expect(page).toHaveURL('/login');
  });

  /**
   * TC41: Home page - page loads and displays unconditional controls
   */
  test('TC41 - Home page - page loads and displays unconditional controls', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
    await expect(page.getByLabel('New habit name')).toBeVisible();
    await expect(page.getByLabel('Habit category')).toBeVisible();
    await expect(page.getByLabel('Times per week')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add habit' })).toBeVisible();
    await expect(page.getByLabel('Search habits by name')).toBeVisible();
    await expect(page.getByLabel('Sort habits by')).toBeVisible();
    await expect(page.getByLabel('Filter by category')).toBeVisible();
    await expect(page.getByRole('checkbox', { name: 'Show archived' })).toBeVisible();
    await expect(page.getByRole('button', { name: /^Complete all for today/ })).toBeVisible();
  });

  /**
   * TC42: HabitForm - add new habit successfully resets form
   */
  test('TC42 - HabitForm - add new habit successfully resets form', async ({ page }) => {
    await page.goto('/');
    const nameInput = page.getByLabel('New habit name');
    const categorySelect = page.getByLabel('Habit category');
    const timesSelect = page.getByLabel('Times per week');
    const notesInput = page.getByLabel('Notes (optional)');
    await nameInput.fill('Test habit ' + Date.now());
    await categorySelect.selectOption('Health');
    await timesSelect.selectOption('3');
    await notesInput.fill('Notes for testing');
    await page.getByRole('button', { name: 'Add habit' }).click();
    await expect(nameInput).toHaveValue('');
    await expect(notesInput).toHaveValue('');
  });

  /**
   * TC43: HabitCard - edit habit and save changes updates displayed name and disables save button when empty
   */
  test('TC43 - HabitCard - edit habit and save changes updates displayed name and disables save button when empty', async ({ page }) => {
    await page.goto('/');
    const habitName = `HabitEdit ${Date.now()}`;
    await page.getByLabel('New habit name').fill(habitName);
    await page.getByRole('button', { name: 'Add habit' }).click();
    const card = page.getByRole('listitem').filter({ hasText: habitName });
    const editButton = card.getByRole('button', { name: `Edit ${habitName}` });
    await editButton.click();
    const nameInput = page.getByLabel(`Edit name for ${habitName}`);
    await expect(nameInput).toHaveValue(habitName);
    const categorySelect = page.getByLabel(`Edit category for ${habitName}`);
    const timesSelect = page.getByLabel(`Edit times per week for ${habitName}`);
    const notesInput = page.getByLabel(`Edit notes for ${habitName}`);
    await nameInput.fill('Updated ' + habitName);
    await categorySelect.selectOption('Work');
    await timesSelect.selectOption('5');
    await notesInput.fill('Updated notes');
    const saveButton = page.getByRole('button', { name: 'Save', exact: true });
    await expect(saveButton).toBeEnabled();
    await saveButton.click();
    const updatedCard = page.getByRole('listitem').filter({ hasText: 'Updated ' + habitName });
    await expect(updatedCard).toBeVisible();
    const updatedEditButton = updatedCard.getByRole('button', { name: `Edit Updated ${habitName}` });
    await updatedEditButton.click();
    const updatedNameInput = page.getByLabel(`Edit name for Updated ${habitName}`);
    await updatedNameInput.fill('');
    await expect(page.getByRole('button', { name: 'Save', exact: true })).toBeDisabled();
    const cancelButton = page.getByRole('button', { name: 'Cancel', exact: true });
    await cancelButton.click();
    await expect(page.getByRole('listitem').filter({ hasText: 'Updated ' + habitName })).toBeVisible();
  });

  /**
   * TC44: Home page - search filters habit list results
   */
  test('TC44 - Home page - search filters habit list results', async ({ page }) => {
    await page.goto('/');
    const habit1 = `Search Alpha ${Date.now()}`;
    const habit2 = `Search Beta ${Date.now()}`;
    await page.getByLabel('New habit name').fill(habit1);
    await page.getByRole('button', { name: 'Add habit' }).click();
    const habit1Card = page.getByRole('listitem').filter({ hasText: habit1 });
    await expect(habit1Card).toBeVisible();
    await page.getByLabel('New habit name').fill(habit2);
    await page.getByRole('button', { name: 'Add habit' }).click();
    const habit2Card = page.getByRole('listitem').filter({ hasText: habit2 });
    await expect(habit2Card).toBeVisible();
    await page.getByLabel('Search habits by name').fill('Alpha');
    await expect(page.getByRole('listitem').filter({ hasText: habit1 })).toBeVisible();
    await expect(page.getByRole('listitem').filter({ hasText: habit2 })).toHaveCount(0);
  });

  /**
   * TC45: Home page - category filter updates visible habits
   */
  test('TC45 - Home page - category filter updates visible habits', async ({ page }) => {
    await page.goto('/');
    const catHabit1 = `Category Health ${Date.now()}`;
    const catHabit2 = `Category Work ${Date.now()}`;
    await page.getByLabel('New habit name').fill(catHabit1);
    await page.getByLabel('Habit category').selectOption('Health');
    await page.getByRole('button', { name: 'Add habit' }).click();
    await page.getByLabel('New habit name').fill(catHabit2);
    await page.getByLabel('Habit category').selectOption('Work');
    await page.getByRole('button', { name: 'Add habit' }).click();
    const filterDropdown = page.getByLabel('Filter by category');
    await filterDropdown.selectOption('Health');
    await expect(page.getByRole('listitem').filter({ hasText: catHabit1 })).toBeVisible();
    await expect(page.getByRole('listitem').filter({ hasText: catHabit2 })).toHaveCount(0);
  });

  /**
   * TC46: Home page - toggling show archived controls archived habits visibility
   */
  test('TC46 - Home page - toggling show archived controls archived habits visibility', async ({ page }) => {
    await page.goto('/');
    const archName = 'Archive Test ' + Date.now();
    await page.getByLabel('New habit name').fill(archName);
    await page.getByRole('button', { name: 'Add habit' }).click();
    const habitCard = page.getByRole('listitem').filter({ hasText: archName });
    await habitCard.getByRole('button', { name: `Archive ${archName}` }).click();
    await expect(page.getByRole('listitem').filter({ hasText: archName })).toHaveCount(0);
    const showArchivedCheckbox = page.getByLabel('Show archived');
    await showArchivedCheckbox.check();
    const archivedHabitCard = page.getByRole('listitem').filter({ hasText: archName });
    await expect(archivedHabitCard).toBeVisible();
  });

  /**
   * TC47: Home page - Complete all for today bulk action disables button and updates label
   */
  test('TC47 - Home page - Complete all for today bulk action disables button and updates label', async ({ page }) => {
    await page.goto('/');
    const habit1 = `BulkComplete 1 ${Date.now()}`;
    const habit2 = `BulkComplete 2 ${Date.now()}`;
    await page.getByLabel('New habit name').fill(habit1);
    await page.getByLabel('Habit category').selectOption('General');
    await page.getByRole('button', { name: 'Add habit' }).click();
    await expect(page.getByRole('listitem').filter({ hasText: habit1 })).toBeVisible();
    await page.getByLabel('New habit name').fill(habit2);
    await page.getByLabel('Habit category').selectOption('General');
    await page.getByRole('button', { name: 'Add habit' }).click();
    await expect(page.getByRole('listitem').filter({ hasText: habit2 })).toBeVisible();
    const bulkCompleteButton = page.getByRole('button', { name: /^Complete all for today/ });
    await expect(bulkCompleteButton).toBeEnabled();
    await bulkCompleteButton.click();
    await expect(bulkCompleteButton).not.toHaveText(/Completing…/, { timeout: 15000 });
  });

  /**
   * TC48: Home page - Export JSON and CSV buttons visibility and disabled state
   */
  test('TC48 - Home page - Export JSON and CSV buttons visibility and disabled state', async ({ page }) => {
    await page.goto('/');
    const exportJsonButton = page.getByRole('button', { name: 'Export JSON' });
    const exportCsvButton = page.getByRole('button', { name: 'Export CSV' });
    await expect(exportJsonButton).toBeVisible();
    await expect(exportCsvButton).toBeVisible();
    await expect(exportJsonButton).toBeDisabled();
    await expect(exportCsvButton).toBeDisabled();
    await page.getByLabel('New habit name').fill('Export Test ' + Date.now());
    await page.getByRole('button', { name: 'Add habit' }).click();
    await expect(exportJsonButton).toBeEnabled();
    await expect(exportCsvButton).toBeEnabled();
  });

  /**
   * TC49: HabitCard - edits an existing habit\\\'s name, category, target per week, and notes
   */
  test('TC49 - HabitCard - edits an existing habit\\\\\\\'s name, category, target per week, and notes', async ({ page }) => {
    await page.goto('/');
    const originalName = `Original Habit ${Date.now()}`;
    const updatedName = `Updated Habit ${Date.now()}`;
    await page.getByLabel('New habit name').fill(originalName);
    await page.getByRole('button', { name: 'Add habit' }).click();
    const habitCard = page.getByRole('listitem').filter({ hasText: originalName });
    await expect(habitCard).toBeVisible();
    await habitCard.getByRole('button', { name: `Edit` }).click();
    const nameInput = page.getByLabel(`Edit name for ${originalName}`);
    await expect(nameInput).toHaveValue(originalName);
    await nameInput.fill(updatedName);
    await page.getByLabel(`Edit category for ${originalName}`).selectOption('Health');
    await page.getByLabel(`Edit times per week for ${originalName}`).selectOption('3');
    await page.getByLabel(`Edit notes for ${originalName}`).fill('Updated notes');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByRole('listitem').filter({ hasText: updatedName })).toBeVisible();
  });

  /**
   * TC50: HabitCard - marks a habit as completed today
   */
  test('TC50 - HabitCard - marks a habit as completed today', async ({ page }) => {
    await page.goto('/');
    const habitName = `Complete Habit ${Date.now()}`;
    await page.getByLabel('New habit name').fill(habitName);
    await page.getByRole('button', { name: 'Add habit' }).click();
    const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
    await expect(habitCard).toBeVisible();
    const markDoneButton = habitCard.getByRole('button', { name: 'Mark done' });
    await markDoneButton.click();
    await expect(habitCard.getByRole('button', { name: 'Done today' })).toBeVisible();
    await expect(habitCard.getByRole('button', { name: 'Done today' })).toBeDisabled();
  });

  /**
   * TC51: HabitCard - toggles archive and unarchive of a habit
   */
  test('TC51 - HabitCard - toggles archive and unarchive of a habit', async ({ page }) => {
    await page.goto('/');
    const habitName = `Archive Habit ${Date.now()}`;
    await page.getByLabel('New habit name').fill(habitName);
    const addButton = page.getByRole('button', { name: 'Add habit' });
    await expect(addButton).toBeEnabled();
    await addButton.click();
    const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
    await expect(habitCard).toBeVisible();
    const archiveButton = habitCard.getByRole('button', { name: `Archive ${habitName}` });
    await archiveButton.click();
    await expect(page.getByRole('listitem').filter({ hasText: habitName })).toHaveCount(0);
    const showArchivedCheckbox = page.getByLabel('Show archived');
    await showArchivedCheckbox.check();
    const archivedHabitCard = page.getByRole('listitem').filter({ hasText: habitName });
    await expect(archivedHabitCard).toBeVisible();
    const unarchiveButton = archivedHabitCard.getByRole('button', { name: `Unarchive ${habitName}` });
    await unarchiveButton.click();
    await expect(page.getByRole('listitem').filter({ hasText: habitName })).toHaveCount(1);
  });

  /**
   * TC52: Home - filters habits by category
   */
  test('TC52 - Home - filters habits by category', async ({ page }) => {
    await page.goto('/');
    const habitName1 = `Filter Habit 1 ${Date.now()}`;
    const habitName2 = `Filter Habit 2 ${Date.now()}`;
    await page.getByLabel('New habit name').fill(habitName1);
    await page.getByLabel('Habit category').selectOption('Health');
    await page.getByRole('button', { name: 'Add habit' }).click();
    await expect(page.getByRole('listitem').filter({ hasText: habitName1 })).toBeVisible();
    await page.getByLabel('New habit name').fill(habitName2);
    await page.getByLabel('Habit category').selectOption('Work');
    await page.getByRole('button', { name: 'Add habit' }).click();
    await expect(page.getByRole('listitem').filter({ hasText: habitName2 })).toBeVisible();
    await page.getByLabel('Filter by category').selectOption('Health');
    await expect(page.getByRole('listitem').filter({ hasText: habitName1 })).toBeVisible();
    await expect(page.getByRole('listitem').filter({ hasText: habitName2 })).toHaveCount(0);
  });

  /**
   * TC53: Home - searches for habits by name
   */
  test('TC53 - Home - searches for habits by name', async ({ page }) => {
    await page.goto('/');
    const habitName = `Search Habit ${Date.now()}`;
    await page.getByLabel('New habit name').fill(habitName);
    await page.getByRole('button', { name: 'Add habit' }).click();
    await expect(page.getByRole('listitem').filter({ hasText: habitName })).toBeVisible();
    const searchInput = page.getByLabel('Search habits by name');
    await searchInput.fill(habitName.slice(0, 5));
    await expect(page.getByRole('listitem').filter({ hasText: habitName })).toBeVisible();
    await searchInput.fill('nomatchterm');
    await expect(page.getByText(new RegExp(`No habits match "nomatchterm"\.`))).toBeVisible();
  });

  /**
   * TC54: Home - sorts habits by different criteria updates visible list
   */
  test('TC54 - Home - sorts habits by different criteria updates visible list', async ({ page }) => {
    await page.goto('/');
    const habitName1 = `Sort Habit A ${Date.now()}`;
    const habitName2 = `Sort Habit B ${Date.now()}`;
    await page.getByLabel('New habit name').fill(habitName1);
    const addButton1 = page.getByRole('button', { name: 'Add habit' });
    await expect(addButton1).toBeEnabled();
    await addButton1.click();
    await expect(page.getByRole('listitem').filter({ hasText: habitName1 })).toBeVisible();
    await page.getByLabel('New habit name').fill(habitName2);
    const addButton2 = page.getByRole('button', { name: 'Add habit' });
    await expect(addButton2).toBeEnabled();
    await addButton2.click();
    await expect(page.getByRole('listitem').filter({ hasText: habitName2 })).toBeVisible();
    const sortSelect = page.getByLabel('Sort habits by');
    const sortValues = ['name', 'streak', 'category', 'target_per_week'];
    for (const val of sortValues) {
      await sortSelect.selectOption(val);
      await expect(page.getByRole('list')).toBeVisible();
    }
  });

  /**
   * TC55: Home - toggles show archived checkbox updates habits list
   */
  test('TC55 - Home - toggles show archived checkbox updates habits list', async ({ page }) => {
    await page.goto('/');
    const checkbox = page.getByRole('checkbox', { name: 'Show archived' });
    await checkbox.check();
    await expect(page.getByRole('list')).toBeVisible();
    await checkbox.uncheck();
    await expect(page.getByRole('list')).toBeVisible();
  });

  /**
   * TC56: Home - completes all incomplete habits for today with bulk action
   */
  test('TC56 - Home - completes all incomplete habits for today with bulk action', async ({ page }) => {
    await page.goto('/');
    const habitName1 = `Bulk Complete Habit 1 ${Date.now()}`;
    const habitName2 = `Bulk Complete Habit 2 ${Date.now()}`;
    await page.getByLabel('New habit name').fill(habitName1);
    const addButton1 = page.getByRole('button', { name: 'Add habit' });
    await expect(addButton1).toBeEnabled();
    await addButton1.click();
    await expect(page.getByRole('listitem').filter({ hasText: habitName1 })).toBeVisible();
    await page.getByLabel('New habit name').fill(habitName2);
    const addButton2 = page.getByRole('button', { name: 'Add habit' });
    await expect(addButton2).toBeEnabled();
    await addButton2.click();
    await expect(page.getByRole('listitem').filter({ hasText: habitName2 })).toBeVisible();
    const completeAllButton = page.getByRole('button', { name: /Complete all for today/ });
    await expect(completeAllButton).toBeEnabled();
    await completeAllButton.click();
    // The bulk action can settle before this assertion polls, so wait for the transient
    // "Completing…" label to clear rather than pinning the exact instant. The button
    // legitimately stays disabled afterward once nothing is left pending, so "enabled"
    // is not a reliable end state to assert on either.
    await expect(completeAllButton).not.toHaveText(/Completing…/, { timeout: 15_000 });
  });

  /**
   * TC57: Home - page loads and renders unconditional elements
   */
  test('TC57 - Home - page loads and renders unconditional elements', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
    await expect(page.getByText('Build small daily habits, one day at a time.')).toBeVisible();
    await expect(page.getByText(new RegExp('^\w+, \w+ \d{1,2}$'))).toBeVisible();
    await expect(page.getByRole('link', { name: 'History' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'View stats' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Archive' })).toBeVisible();
    await expect(page.getByLabel('Search habits by name')).toBeVisible();
    await expect(page.getByRole('combobox', { name: 'Sort habits by' })).toBeVisible();
    await expect(page.getByRole('combobox', { name: 'Filter by category' })).toBeVisible();
    await expect(page.getByLabel('Show archived')).toBeVisible();
    await expect(page.getByRole('button', { name: /^Complete all for today/ })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Export JSON' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Export CSV' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Name' })).toBeVisible();
    await expect(page.getByRole('combobox', { name: 'Category' })).toBeVisible();
    await expect(page.getByRole('spinbutton', { name: 'Target per week' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Notes' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add habit' })).toBeVisible();
  });

  /**
   * TC58: HabitList - complete a habit
   */
  test('TC58 - HabitList - complete a habit', async ({ page }) => {
    await page.goto('/');
    const habitName = `Complete Habit ${Date.now()}`;
    await page.getByRole('textbox', { name: 'Name' }).fill(habitName);
    await page.getByRole('combobox', { name: 'Category' }).selectOption('Health');
    await page.getByRole('spinbutton', { name: 'Target per week' }).fill('2');
    await page.getByRole('textbox', { name: 'Notes' }).fill('Complete test');
    await page.getByRole('button', { name: 'Add habit' }).click();
    const habitItem = page.getByRole('listitem').filter({ hasText: habitName });
    await expect(habitItem).toBeVisible();
    const completeButton = habitItem.getByRole('button', { name: /^Complete / });
    await completeButton.click();
    await expect(habitItem.getByRole('button', { name: /^Completed/ })).toBeVisible();
  });

  /**
   * TC59: Complete all - complete all pending habits for today
   */
  test('TC59 - Complete all - complete all pending habits for today', async ({ page }) => {
    await page.goto('/');
    const habitName1 = `CompleteAll1 ${Date.now()}`;
    const habitName2 = `CompleteAll2 ${Date.now()}`;
    await page.getByRole('textbox', { name: 'Name' }).fill(habitName1);
    await page.getByRole('combobox', { name: 'Category' }).selectOption('Health');
    await page.getByRole('spinbutton', { name: 'Target per week' }).fill('1');
    await page.getByRole('textbox', { name: 'Notes' }).fill('Notes 1');
    await page.getByRole('button', { name: 'Add habit' }).click();
    await expect(page.getByRole('listitem').filter({ hasText: habitName1 })).toBeVisible();
    await page.getByRole('textbox', { name: 'Name' }).fill(habitName2);
    await page.getByRole('combobox', { name: 'Category' }).selectOption('Health');
    await page.getByRole('spinbutton', { name: 'Target per week' }).fill('1');
    await page.getByRole('textbox', { name: 'Notes' }).fill('Notes 2');
    await page.getByRole('button', { name: 'Add habit' }).click();
    await expect(page.getByRole('listitem').filter({ hasText: habitName2 })).toBeVisible();
    const completeAllButton = page.getByRole('button', { name: /^Complete all for today/ });
    await completeAllButton.click();
    await expect(page.getByRole('listitem').filter({ hasText: habitName1 }).getByRole('button', { name: /^Completed/ })).toBeVisible();
    await expect(page.getByRole('listitem').filter({ hasText: habitName2 }).getByRole('button', { name: /^Completed/ })).toBeVisible();
  });

  /**
   * TC60: Filters - search habits by name
   */
  test('TC60 - Filters - search habits by name', async ({ page }) => {
    await page.goto('/');
    const uniqueSearch = `search-${Date.now()}`;
    await page.getByRole('textbox', { name: 'Search habits by name' }).fill(uniqueSearch);
    await expect(page.getByText(`No habits match "${uniqueSearch}".`)).toBeVisible();
  });

  /**
   * TC61: Filters - filter habits by category
   */
  test('TC61 - Filters - filter habits by category', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('combobox', { name: 'Filter by category' }).selectOption('Health');
    await expect(page.getByRole('list')).toBeVisible();
  });

  /**
   * TC62: Filters - toggle show archived habits
   */
  test('TC62 - Filters - toggle show archived habits', async ({ page }) => {
    await page.goto('/');
    const showArchivedCheckbox = page.getByLabel('Show archived');
    await showArchivedCheckbox.check();
    await expect(page.getByRole('list')).toBeVisible();
    await showArchivedCheckbox.uncheck();
    await expect(page.getByRole('list')).toBeVisible();
  });

  /**
   * TC63: Filters - clear all filters
   */
  test('TC63 - Filters - clear all filters', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('textbox', { name: 'Search habits by name' }).fill('test');
    await page.getByRole('combobox', { name: 'Filter by category' }).selectOption('Health');
    await page.getByLabel('Show archived').check();
    await page.getByRole('combobox', { name: 'Sort habits by' }).selectOption('streak');
    await page.getByRole('button', { name: 'Clear filters' }).click();
    await expect(page.getByRole('textbox', { name: 'Search habits by name' })).toHaveValue('');
    await expect(page.getByRole('combobox', { name: 'Filter by category' })).toHaveValue('');
    await expect(page.getByLabel('Show archived')).not.toBeChecked();
    await expect(page.getByRole('combobox', { name: 'Sort habits by' })).toHaveValue('name');
  });

  /**
   * TC64: Navigation - navigate to History page
   */
  test('TC64 - Navigation - navigate to History page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'History' }).click();
    await expect(page).toHaveURL('/history');
  });

  /**
   * TC65: Navigation - navigate to View stats page
   */
  test('TC65 - Navigation - navigate to View stats page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'View stats' }).click();
    await expect(page).toHaveURL('/stats');
  });

  /**
   * TC66: Navigation - navigate to Archive page
   */
  test('TC66 - Navigation - navigate to Archive page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Archive' }).click();
    await expect(page).toHaveURL('/archive');
  });

  /**
   * TC67: Home - page loads and displays header and date
   */
  test('TC67 - Home - page loads and displays header and date', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
    await expect(page.getByText('Build small daily habits, one day at a time.')).toBeVisible();
    const dateRegex = new RegExp('^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday),?\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2}$');
    const dateText = await page.locator('p.text-xs.text-zinc-400').first().textContent();
    expect(dateText).toMatch(dateRegex);
  });

  /**
   * TC68: HabitForm - can create a new habit successfully
   */
  test('TC68 - HabitForm - can create a new habit successfully', async ({ page }) => {
    await page.goto('/');
    const habitName = `Test Habit ${Date.now()}`;
    await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
    await page.getByRole('combobox', { name: 'Habit category' }).selectOption('General');
    await page.getByRole('combobox', { name: 'Times per week' }).selectOption('3');
    await page.getByRole('textbox', { name: 'Notes (optional)' }).fill('Test notes');
    await page.getByRole('button', { name: 'Add habit' }).click();
    const habitItem = page.getByRole('listitem').filter({ hasText: habitName });
    await expect(habitItem).toBeVisible();
  });

  /**
   * TC69: Home - complete a habit and verify completed state
   */
  test('TC69 - Home - complete a habit and verify completed state', async ({ page }) => {
    await page.goto('/');
    const habitName = `CompleteTest-${Date.now()}`;
    await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
    await page.getByRole('combobox', { name: 'Habit category' }).selectOption('General');
    await page.getByRole('combobox', { name: 'Times per week' }).selectOption('3');
    await page.getByRole('button', { name: 'Add habit' }).click();
    const habitItem = page.getByRole('listitem').filter({ hasText: habitName });
    await expect(habitItem).toBeVisible();
    const completeButton = habitItem.getByRole('button', { name: `Complete ${habitName}` });
    await completeButton.click();
    const completedButton = habitItem.getByRole('button', { name: `Completed ${habitName}` });
    await expect(completedButton).toBeVisible();
  });

  /**
   * TC70: Home - navigation links go to correct routes
   */
  test('TC70 - Home - navigation links go to correct routes', async ({ page }) => {
    await page.goto('/');
    const historyLink = page.getByRole('link', { name: 'History' });
    await expect(historyLink).toHaveAttribute('href', '/history');
    const statsLink = page.getByRole('link', { name: 'View stats' });
    await expect(statsLink).toHaveAttribute('href', '/stats');
    const archiveLink = page.getByRole('link', { name: 'Archive' });
    await expect(archiveLink).toHaveAttribute('href', '/archive');
  });

  /**
   * TC71: Home - search filters habits by name
   */
  test('TC71 - Home - search filters habits by name', async ({ page }) => {
    await page.goto('/');
    const uniqueSearch = `unique-search-${Date.now()}`;
    await page.getByRole('textbox', { name: 'New habit name' }).fill(uniqueSearch);
    await page.getByRole('combobox', { name: 'Habit category' }).selectOption('General');
    await page.getByRole('combobox', { name: 'Times per week' }).selectOption('3');
    await page.getByRole('button', { name: 'Add habit' }).click();
    await expect(page.getByRole('listitem').filter({ hasText: uniqueSearch })).toBeVisible();
    await page.getByLabel('Search habits by name').fill(uniqueSearch);
    const filteredItem = page.getByRole('listitem').filter({ hasText: uniqueSearch });
    await expect(filteredItem).toBeVisible();
  });

  /**
   * TC72: Home - sort habits by different criteria
   */
  test('TC72 - Home - sort habits by different criteria', async ({ page }) => {
    await page.goto('/');
    const habitNameA = `AAA-${Date.now()}`;
    const habitNameZ = `ZZZ-${Date.now()}`;
    await page.getByLabel('Name').fill(habitNameA);
    await page.getByLabel('Category').selectOption('General');
    await page.getByLabel('Target per week').selectOption('3');
    await page.getByRole('button', { name: 'Add habit' }).click();
    await expect(page.getByRole('listitem').filter({ hasText: habitNameA })).toBeVisible();
    await page.getByLabel('Name').fill(habitNameZ);
    await page.getByLabel('Category').selectOption('Health');
    await page.getByLabel('Target per week').selectOption('5');
    await page.getByRole('button', { name: 'Add habit' }).click();
    await expect(page.getByRole('listitem').filter({ hasText: habitNameZ })).toBeVisible();
    await page.getByLabel('Sort habits by').selectOption('name');
    const itemsByName = await page.getByRole('listitem').allTextContents();
    expect(itemsByName.find((text) => text.includes(habitNameA))).toBeTruthy();
    expect(itemsByName.find((text) => text.includes(habitNameZ))).toBeTruthy();
    await page.getByLabel('Sort habits by').selectOption('streak');
    await page.getByLabel('Sort habits by').selectOption('category');
    await page.getByLabel('Sort habits by').selectOption('target_per_week');
  });

  /**
   * TC73: Home - filter habits by category
   */
  test('TC73 - Home - filter habits by category', async ({ page }) => {
    await page.goto('/');
    const habitName = `CategoryTest-${Date.now()}`;
    await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
    await page.getByRole('combobox', { name: 'Habit category' }).selectOption('Health');
    await page.getByRole('combobox', { name: 'Times per week' }).selectOption('3');
    await page.getByRole('button', { name: 'Add habit' }).click();
    await expect(page.getByRole('listitem').filter({ hasText: habitName })).toBeVisible();
    await page.getByLabel('Filter by category').selectOption('Health');
    const filteredItem = page.getByRole('listitem').filter({ hasText: habitName });
    await expect(filteredItem).toBeVisible();
  });

  /**
   * TC74: Home - toggle show archived habits
   */
  test('TC74 - Home - toggle show archived habits', async ({ page }) => {
    await page.goto('/');
    const habitName = `ArchiveTest-${Date.now()}`;
    await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
    await page.getByRole('combobox', { name: 'Habit category' }).selectOption('General');
    await page.getByRole('combobox', { name: 'Times per week' }).selectOption('3');
    await page.getByRole('button', { name: 'Add habit' }).click();
    const habitItem = page.getByRole('listitem').filter({ hasText: habitName });
    await expect(habitItem).toBeVisible();
    await habitItem.getByRole('button', { name: `Archive ${habitName}` }).click();
    await expect(page.getByRole('listitem').filter({ hasText: habitName })).toHaveCount(0);
    await page.getByLabel('Show archived').check();
    const archivedItem = page.getByRole('listitem').filter({ hasText: habitName });
    await expect(archivedItem).toBeVisible();
  });

  /**
   * TC75: Home - clear all filters resets search, category, archived, and sort
   */
  test('TC75 - Home - clear all filters resets search, category, archived, and sort', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel('Search habits by name').fill('test');
    await page.getByLabel('Filter by category').selectOption('Health');
    await page.getByLabel('Show archived').check();
    await page.getByLabel('Sort habits by').selectOption('streak');
    await page.getByRole('button', { name: 'Clear filters' }).click();
    await expect(page.getByLabel('Search habits by name')).toHaveValue('');
    await expect(page.getByLabel('Filter by category')).toHaveValue('');
    await expect(page.getByLabel('Show archived')).not.toBeChecked();
    await expect(page.getByLabel('Sort habits by')).toHaveValue('name');
  });

  /**
   * TC76: Home - page loads with unconditional elements
   */
  test('TC76 - Home - page loads with unconditional elements', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
    await expect(page.getByText('Build small daily habits, one day at a time.')).toBeVisible();
    await expect(page.getByLabel('Search habits by name')).toBeVisible();
    await expect(page.getByLabel('Filter by category')).toBeVisible();
    await expect(page.getByLabel('Show archived')).toBeVisible();
    await expect(page.getByLabel('Sort habits by')).toBeVisible();
    await expect(page.getByRole('link', { name: 'History' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'View stats' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Archive' })).toBeVisible();
  });

  /**
   * TC77: Home - clicking clear filters resets all filters to default
   */
  test('TC77 - Home - clicking clear filters resets all filters to default', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel('Search habits by name').fill('abc');
    await page.getByLabel('Filter by category').selectOption('');
    await page.getByLabel('Show archived').check();
    await page.getByLabel('Sort habits by').selectOption('streak');
    await expect(page.getByRole('button', { name: 'Clear filters' })).toBeVisible();
    await page.getByRole('button', { name: 'Clear filters' }).click();
    await expect(page.getByLabel('Search habits by name')).toHaveValue('');
    await expect(page.getByLabel('Filter by category')).toHaveValue('');
    await expect(page.getByLabel('Show archived')).not.toBeChecked();
    await expect(page.getByLabel('Sort habits by')).toHaveValue('name');
  });

  /**
   * TC78: Home - shows completion progress when habits exist
   */
  test('TC78 - Home - shows completion progress when habits exist', async ({ page }) => {
    await page.goto('/');
    const createName = `Test Habit Completion ${Date.now()}`;
    await page.getByRole('textbox', { name: 'New habit name' }).fill(createName);
    await page.getByRole('combobox', { name: 'Habit category' }).selectOption('General');
    await page.getByRole('combobox', { name: 'Times per week' }).selectOption('3');
    await page.getByRole('button', { name: 'Add habit' }).click();
    await expect(page.getByText(/\d+\/\d+ done today/)).toBeVisible();
  });

  /**
   * TC79: Home - shows clear filters button when filters are active
   */
  test('TC79 - Home - shows clear filters button when filters are active', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel('Search habits by name').fill('some text');
    await expect(page.getByRole('button', { name: 'Clear filters' })).toBeVisible();
    await page.getByLabel('Search habits by name').fill('');
    await page.getByLabel('Filter by category').selectOption('Health');
    await expect(page.getByRole('button', { name: 'Clear filters' })).toBeVisible();
    await page.getByLabel('Show archived').check();
    await expect(page.getByRole('button', { name: 'Clear filters' })).toBeVisible();
    await page.getByLabel('Show archived').uncheck();
    await page.getByLabel('Sort habits by').selectOption('streak');
    await expect(page.getByRole('button', { name: 'Clear filters' })).toBeVisible();
  });

  /**
   * TC80: Home page - loads and renders main UI elements
   */
  test('TC80 - Home page - loads and renders main UI elements', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
    await expect(page.getByLabel('Search habits by name')).toBeVisible();
    await expect(page.getByLabel('Sort habits by')).toBeVisible();
    await expect(page.getByLabel('Filter by category')).toBeVisible();
    await expect(page.getByLabel('Show archived')).toBeVisible();
    await expect(page.getByRole('button', { name: /^Complete all for today \(\d+\)$/ })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Export JSON' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Export CSV' })).toBeVisible();
    await expect(page.getByRole('list')).toBeVisible();
  });

  /**
   * TC81: HabitCard - duplicates a habit and appends the copy with \\\\\\\\\\\\\\\' (copy)\\\\\\\\\\\\\\\' suffix
   */
  test('TC81 - HabitCard - duplicates a habit and appends the copy with \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\' (copy)\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\' suffix', async ({ page }) => {
    await page.goto('/');
    // Create a habit first to duplicate
    const habitName = `HabitToDuplicate ${Date.now()}`;
    await page.getByLabel('New habit name').fill(habitName);
    await page.getByLabel('Habit category').selectOption('Health');
    await page.getByLabel('Times per week').selectOption('3');
    await page.getByLabel('Notes (optional)').fill('Some notes');
    await page.getByRole('button', { name: 'Add habit' }).click();
    // Excludes " (copy)" so this stays pinned to the original once the
    // duplicate exists -- its name is a substring of the copy's name, so an
    // unqualified hasText filter would match both list items.
    const copyNamePartial = ' (copy)';
    const habitItem = page
      .getByRole('listitem')
      .filter({ hasText: habitName })
      .filter({ hasNotText: copyNamePartial });
    await expect(habitItem).toBeVisible();
    // Click the duplicate button on that habit card
    const duplicateButton = habitItem.getByRole('button', { name: `Duplicate ${habitName}` });
    await duplicateButton.click();
    // The duplicated habit should appear with the expected suffix (copy)
    const duplicatedHabitItem = page.getByRole('listitem').filter({ hasText: `${habitName}${copyNamePartial}` });
    await expect(duplicatedHabitItem).toBeVisible();
    // Verify the category badge matches (visible text from the original category)
    const categoryBadgeOriginal = habitItem.getByText('Health');
    await expect(categoryBadgeOriginal).toBeVisible();
    const categoryBadgeCopy = duplicatedHabitItem.getByText('Health');
    await expect(categoryBadgeCopy).toBeVisible();
  });

  /**
   * TC82: Home page - initial render with unconditional elements
   */
  test('TC82 - Home page - initial render with unconditional elements', async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Habit Tracker" })).toBeVisible();
    await expect(page.getByLabel("Search habits by name")).toBeVisible();
    await expect(page.getByRole("button", { name: /Complete all for today/ })).toBeVisible();
    await expect(page.getByLabel("Sort habits by")).toBeVisible();
    await expect(page.getByLabel("Filter by category")).toBeVisible();
    await expect(page.getByLabel("Show archived")).toBeVisible();
    await expect(page.getByRole("link", { name: "History" })).toBeVisible();
    await expect(page.getByRole("link", { name: "View stats" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Archive" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Export JSON" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Export CSV" })).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 9: Export
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC83: Home - exports habits as JSON and CSV
   */
  test('TC83 - Home - exports habits as JSON and CSV', async ({ page }) => {
    await page.goto('/');
    const exportJsonButton = page.getByRole('button', { name: 'Export JSON' });
    const exportCsvButton = page.getByRole('button', { name: 'Export CSV' });
    await expect(exportJsonButton).toBeEnabled();
    await expect(exportCsvButton).toBeEnabled();
    await exportJsonButton.click();
    await exportCsvButton.click();
  });

});
