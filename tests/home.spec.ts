import { test, expect } from '@playwright/test';

test.describe('Home', () => {
  test.setTimeout(60000);

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 1: Home page load
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC01: Home Page - loads and displays unconditional elements
   */
  test('TC01 - Home Page - loads and displays unconditional elements', async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Habit Tracker" })).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Search habits by name" })).toBeVisible();
    await expect(page.getByRole("combobox", { name: "Sort habits by" })).toBeVisible();
    await expect(page.getByRole("combobox", { name: "Filter by category" })).toBeVisible();
    await expect(page.getByLabel("Show archived")).toBeVisible();
    await expect(page.getByRole("button", { name: /^Complete all for today/ })).toBeVisible();
    await expect(page.getByRole("button", { name: "Export JSON" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Export CSV" })).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 2: Habit duplication
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC02: HabitCard - duplicate habit creates a copy with name suffixed '(copy)'
   */
  test('TC02 - HabitCard - duplicate habit creates a copy with name suffixed \'(copy)\'', async ({ page }) => {
    await page.goto("/");
    const habitName = `HabitToDuplicate_${Date.now()}`;
    await page.getByLabel("Name").fill(habitName);
    await page.getByLabel("Category").selectOption("Exercise");
    await page.getByLabel("Target per week").selectOption("3");
    await page.getByLabel("Notes (optional)").fill("Notes");
    await page.getByRole("button", { name: "Add habit" }).click();
    const habitCard = page.getByRole("listitem").filter({ hasText: habitName });
    await expect(habitCard).toBeVisible();
    await habitCard.getByRole("button", { name: `Duplicate ${habitName}`, exact: true }).click();
    await expect(page.getByRole("listitem").filter({ hasText: `${habitName} (copy)` })).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 3: Filter controls
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC03: Clear filters button - resets all filters and sorting to default
   */
  test('TC03 - Clear filters button - resets all filters and sorting to default', async ({ page }) => {
    await page.goto("/");
    await page.getByRole("textbox", { name: "Search habits by name" }).fill("nonexistent-filter-value-" + Date.now());
    await page.getByRole("combobox", { name: "Filter by category" }).selectOption("Exercise");
    await page.getByLabel("Show archived").check();
    await page.getByRole("combobox", { name: "Sort habits by" }).selectOption("streak");
    await expect(page.getByRole("button", { name: "Clear filters" })).toBeVisible();
    await page.getByRole("button", { name: "Clear filters" }).click();
    await expect(page.getByRole("textbox", { name: "Search habits by name" })).toHaveValue("");
    await expect(page.getByRole("combobox", { name: "Filter by category" })).toHaveValue("");
    await expect(page.getByLabel("Show archived")).not.toBeChecked();
    await expect(page.getByRole("combobox", { name: "Sort habits by" })).toHaveValue("name");
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 4: Home
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC04: Home - page loads with unconditional elements visible
   */
  test('TC04 - Home - page loads with unconditional elements visible', async ({ page }) => {
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
   * TC05: HabitForm - adds a new habit successfully
   */
  test('TC05 - HabitForm - adds a new habit successfully', async ({ page }) => {
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
   * TC06: HabitCard - edits a habit\'s name, category, target per week, and notes successfully
   */
  test('TC06 - HabitCard - edits a habit\\\'s name, category, target per week, and notes successfully', async ({ page }) => {
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
   * TC07: HabitCard - marks a habit as done today button disables afterward
   */
  test('TC07 - HabitCard - marks a habit as done today button disables afterward', async ({ page }) => {
    await page.goto('/');
    const habitName = `CompleteTest ${Date.now()}`;
    await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
    await page.getByRole('button', { name: 'Add habit' }).click();
    const habitItem = page.getByRole('listitem').filter({ hasText: habitName });
    await expect(habitItem).toBeVisible();
    const markDoneButton = habitItem.getByRole('button', { name: 'Mark done' });
    await markDoneButton.click();
    await expect(markDoneButton).toBeDisabled();
  });

  /**
   * TC08: HabitCard - archives and unarchives a habit
   */
  test('TC08 - HabitCard - archives and unarchives a habit', async ({ page }) => {
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
   * TC09: HabitCard - removes a habit after confirm dialog
   */
  test('TC09 - HabitCard - removes a habit after confirm dialog', async ({ page }) => {
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
   * TC10: Search box - filters habit list by matching name
   */
  test('TC10 - Search box - filters habit list by matching name', async ({ page }) => {
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
   * TC11: Category filter - filters habit list by category
   */
  test('TC11 - Category filter - filters habit list by category', async ({ page }) => {
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
   * TC12: Sort by dropdown - sorts habit list by name ascending
   */
  test('TC12 - Sort by dropdown - sorts habit list by name ascending', async ({ page }) => {
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
   * TC13: HabitForm - disables Add habit button when name is empty
   */
  test('TC13 - HabitForm - disables Add habit button when name is empty', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('textbox', { name: 'New habit name' }).fill('');
    await expect(page.getByRole('button', { name: 'Add habit' })).toBeDisabled();
  });

  /**
   * TC14: Home page - page loads and renders unconditional elements
   */
  test('TC14 - Home page - page loads and renders unconditional elements', async ({ page }) => {
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
   * TC15: HabitCard - inline edit form displays when Edit button clicked and updates fields
   */
  test('TC15 - HabitCard - inline edit form displays when Edit button clicked and updates fields', async ({ page }) => {
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
   * TC16: HabitForm - form validation disables Add habit button for empty name
   */
  test('TC16 - HabitForm - form validation disables Add habit button for empty name', async ({ page }) => {
    await page.goto("/");
    const input = page.getByRole("textbox", { name: "New habit name" });
    const addButton = page.getByRole("button", { name: "Add habit" });
    await input.fill("");
    await expect(addButton).toBeDisabled();
    await input.fill("   ");
    await expect(addButton).toBeDisabled();
  });

  /**
   * TC17: HabitCard - cancel edit closes inline form without saving changes
   */
  test('TC17 - HabitCard - cancel edit closes inline form without saving changes', async ({ page }) => {
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
   * TC18: HabitCard - Save button disabled when name input is empty or blank
   */
  test('TC18 - HabitCard - Save button disabled when name input is empty or blank', async ({ page }) => {
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
   * TC19: Page heading and static elements render
   */
  test('TC19 - Page heading and static elements render', async ({ page }) => {
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
   * TC20: HabitForm - allows creating a new habit
   */
  test('TC20 - HabitForm - allows creating a new habit', async ({ page }) => {
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
   * TC21: Category filter - allows filtering habits
   */
  test('TC21 - Category filter - allows filtering habits', async ({ page }) => {
    await page.goto("/");
    await page.getByRole("combobox", { name: "Filter by category" }).selectOption("Health");
    await expect(page.getByLabel("Filter by category")).toHaveValue("Health");
  });

  /**
   * TC22: HabitCard - marks habit done today disables button
   */
  test('TC22 - HabitCard - marks habit done today disables button', async ({ page }) => {
    await page.goto("/");
    const habitName = `Daily completion habit ${Date.now()}`;
    await page.getByRole("textbox", { name: "New habit name" }).fill(habitName);
    await page.getByRole("button", { name: "Add habit" }).click();
    const card = page.getByRole("listitem").filter({ hasText: habitName });
    const doneButtons = card.getByRole("button", { name: "Done today", exact: true });
    await expect(doneButtons).toHaveCount(1);
    await expect(doneButtons.first()).toBeDisabled();
  });

  /**
   * TC23: HabitCard inline edit form - opens and cancels edit mode
   */
  test('TC23 - HabitCard inline edit form - opens and cancels edit mode', async ({ page }) => {
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
   * TC24: HabitCard inline edit form - saves edited habit and closes form
   */
  test('TC24 - HabitCard inline edit form - saves edited habit and closes form', async ({ page }) => {
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
   * TC25: Home page - initial render shows main heading, filter, show archived checkbox, export buttons disabled, and navigation link
   */
  test('TC25 - Home page - initial render shows main heading, filter, show archived checkbox, export buttons disabled, and navigation link', async ({ page }) => {
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
   * TC26: HabitForm - create a habit with notes successfully adds it to the list and enables export buttons
   */
  test('TC26 - HabitForm - create a habit with notes successfully adds it to the list and enables export buttons', async ({ page }) => {
    await page.goto('/');
    const habitName = `Test habit ${Date.now()}`;
    const habitNotes = 'Test note for habit';
    await page.getByLabel('New habit name').fill(habitName);
    await page.getByLabel('Habit category').selectOption('Health');
    await page.getByLabel('Times per week').selectOption('3');
    await page.getByLabel('Notes (optional)').fill(habitNotes);
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
   * TC27: HabitCard - edit habit updates name, category, target per week, and notes
   */
  test('TC27 - HabitCard - edit habit updates name, category, target per week, and notes', async ({ page }) => {
    await page.goto('/');
    const originalName = `Edit habit ${Date.now()}`;
    const updatedName = `Updated habit ${Date.now()}`;
    const updatedNotes = 'Updated notes';
    await page.getByLabel('New habit name').fill(originalName);
    await page.getByLabel('Habit category').selectOption('Work');
    await page.getByLabel('Times per week').selectOption('2');
    await page.getByLabel('Notes (optional)').fill('Initial notes');
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
   * TC28: HabitCard - archive and unarchive a habit via its archive toggle button
   */
  test('TC28 - HabitCard - archive and unarchive a habit via its archive toggle button', async ({ page }) => {
    await page.goto('/');
    const habitName = `Archive habit ${Date.now()}`;
    await page.getByLabel('New habit name').fill(habitName);
    await page.getByRole('button', { name: 'Add habit' }).click();
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
   * TC29: HabitCard - mark habit as done disables mark done button
   */
  test('TC29 - HabitCard - mark habit as done disables mark done button', async ({ page }) => {
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
   * TC30: Home - filter habits list by category changes displayed habits accordingly
   */
  test('TC30 - Home - filter habits list by category changes displayed habits accordingly', async ({ page }) => {
    await page.goto('/');
    const categoryFilter = page.getByLabel('Filter by category');
    await categoryFilter.selectOption('Health');
    await expect(categoryFilter).toHaveValue('Health');
  });

  /**
   * TC31: Home - toggling show archived checkbox updates displayed habits accordingly
   */
  test('TC31 - Home - toggling show archived checkbox updates displayed habits accordingly', async ({ page }) => {
    await page.goto('/');
    const showArchivedCheckbox = page.getByLabel('Show archived');
    await showArchivedCheckbox.check();
    await expect(showArchivedCheckbox).toBeChecked();
    await showArchivedCheckbox.uncheck();
    await expect(showArchivedCheckbox).not.toBeChecked();
  });

  /**
   * TC32: Home - Export JSON and Export CSV buttons are disabled when no habits exist and enabled after habits are created
   */
  test('TC32 - Home - Export JSON and Export CSV buttons are disabled when no habits exist and enabled after habits are created', async ({ page }) => {
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
   * TC33: LogoutButton - logout button logs out and navigates to /login
   */
  test('TC33 - LogoutButton - logout button logs out and navigates to /login', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Logout' }).click();
    await expect(page).toHaveURL('/login');
  });

  /**
   * TC34: Home page - page loads and displays unconditional controls
   */
  test('TC34 - Home page - page loads and displays unconditional controls', async ({ page }) => {
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
   * TC35: HabitForm - add new habit successfully resets form
   */
  test('TC35 - HabitForm - add new habit successfully resets form', async ({ page }) => {
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
   * TC36: HabitCard - edit habit and save changes updates displayed name and disables save button when empty
   */
  test('TC36 - HabitCard - edit habit and save changes updates displayed name and disables save button when empty', async ({ page }) => {
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
   * TC37: Home page - search filters habit list results
   */
  test('TC37 - Home page - search filters habit list results', async ({ page }) => {
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
   * TC38: Home page - category filter updates visible habits
   */
  test('TC38 - Home page - category filter updates visible habits', async ({ page }) => {
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
   * TC39: Home page - toggling show archived controls archived habits visibility
   */
  test('TC39 - Home page - toggling show archived controls archived habits visibility', async ({ page }) => {
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
   * TC40: Home page - Complete all for today bulk action disables button and updates label
   */
  test('TC40 - Home page - Complete all for today bulk action disables button and updates label', async ({ page }) => {
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
    await bulkCompleteButton.click();
    await expect(bulkCompleteButton).toBeDisabled();
    // The bulk action can settle before this assertion polls, so wait for the transient
    // "Completing…" label to clear rather than pinning the exact instant it appears --
    // `expect(...).toHaveText(a).or.toHaveText(b)` is not a real Playwright API (`.or` is
    // a Locator method, not part of the assertion chain) and threw a TypeError here. Note
    // the button legitimately stays disabled afterward once nothing is left pending -- it
    // does not necessarily re-enable, so that isn't the right thing to assert either.
    await expect(bulkCompleteButton).not.toHaveText(/Completing…/, { timeout: 15_000 });
  });

  /**
   * TC41: Home page - Export JSON and CSV buttons visibility and disabled state
   */
  test('TC41 - Home page - Export JSON and CSV buttons visibility and disabled state', async ({ page }) => {
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
   * TC42: HabitForm - creates a new habit successfully
   */
  test('TC42 - HabitForm - creates a new habit successfully', async ({ page }) => {
    await page.goto('/');
    const habitName = `Test Habit ${Date.now()}`;
    await page.getByLabel('New habit name').fill(habitName);
    await page.getByLabel('Habit category').selectOption('General');
    await page.getByLabel('Times per week').selectOption('1');
    await page.getByLabel('Notes (optional)').fill('Test notes');
    await page.getByRole('button', { name: 'Add habit' }).click();
    await expect(page.getByRole('listitem').filter({ hasText: habitName })).toBeVisible();
  });

  /**
   * TC43: HabitCard - edits an existing habit\\\'s name, category, target per week, and notes
   */
  test('TC43 - HabitCard - edits an existing habit\\\\\\\'s name, category, target per week, and notes', async ({ page }) => {
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
   * TC44: HabitCard - marks a habit as completed today
   */
  test('TC44 - HabitCard - marks a habit as completed today', async ({ page }) => {
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
   * TC45: HabitCard - toggles archive and unarchive of a habit
   */
  test('TC45 - HabitCard - toggles archive and unarchive of a habit', async ({ page }) => {
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
   * TC46: Home - filters habits by category
   */
  test('TC46 - Home - filters habits by category', async ({ page }) => {
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
   * TC47: Home - searches for habits by name
   */
  test('TC47 - Home - searches for habits by name', async ({ page }) => {
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
   * TC48: Home - sorts habits by different criteria updates visible list
   */
  test('TC48 - Home - sorts habits by different criteria updates visible list', async ({ page }) => {
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
   * TC49: Home - toggles show archived checkbox updates habits list
   */
  test('TC49 - Home - toggles show archived checkbox updates habits list', async ({ page }) => {
    await page.goto('/');
    const checkbox = page.getByRole('checkbox', { name: 'Show archived' });
    await checkbox.check();
    await expect(page.getByRole('list')).toBeVisible();
    await checkbox.uncheck();
    await expect(page.getByRole('list')).toBeVisible();
  });

  /**
   * TC50: Home - completes all incomplete habits for today with bulk action
   */
  test('TC50 - Home - completes all incomplete habits for today with bulk action', async ({ page }) => {
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
   * TC51: Home page - initial render with unconditional elements
   */
  test('TC51 - Home page - initial render with unconditional elements', async ({ page }) => {
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

});
