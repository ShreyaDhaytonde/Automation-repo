import { test, expect } from '@playwright/test';

test.describe('Home', () => {
  test.setTimeout(60000);

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 1: Home page
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC01: Home page - loads and shows page heading and main controls
   */
  test('TC01 - Home page - loads and shows page heading and main controls', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Search habits by name' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add habit' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Complete all for today (0)' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'View stats' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 2: HabitForm submission
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC02: HabitForm - successfully creates a new habit
   */
  test('TC02 - HabitForm - successfully creates a new habit', async ({ page }) => {
    await page.goto('/');
    const uniqueName = 'Habit ' + Date.now();
    const nameInput = page.getByLabel('New habit name');
    await nameInput.fill(uniqueName);
    await page.getByRole('button', { name: 'Add habit' }).click();
    const habitCard = page.getByRole('listitem').filter({ hasText: uniqueName });
    await expect(habitCard).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 3: HabitCard actions
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC03: HabitCard - mark habit done disables Mark done button and changes label
   */
  test('TC03 - HabitCard - mark habit done disables Mark done button and changes label', async ({ page }) => {
    await page.goto('/');
    const uniqueName = 'HabitDone ' + Date.now();
    await page.getByLabel('New habit name').fill(uniqueName);
    await page.getByRole('button', { name: 'Add habit' }).click();
    const card = page.getByRole('listitem').filter({ hasText: uniqueName });
    const markButton = card.getByRole('button', { name: 'Mark done' });
    await markButton.click();
    await expect(markButton).toBeDisabled();
    await expect(markButton).toHaveText(/Done today/);
  });

  /**
   * TC04: HabitCard - freeze and unfreeze habit toggles the freeze button label and aria-label
   */
  test('TC04 - HabitCard - freeze and unfreeze habit toggles the freeze button label and aria-label', async ({ page }) => {
    await page.goto('/');
    const uniqueName = 'HabitFreeze ' + Date.now();
    await page.getByLabel('New habit name').fill(uniqueName);
    await page.getByRole('button', { name: 'Add habit' }).click();
    const card = page.getByRole('listitem').filter({ hasText: uniqueName });
    const freezeButton = card.getByRole('button', { name: `Freeze` });
    await freezeButton.click();
    const unfreezeButton = card.getByRole('button', { name: `Unfreeze` });
    await expect(unfreezeButton).toBeVisible();
    await expect(unfreezeButton).toHaveAttribute('aria-label', `Unfreeze ${uniqueName}`);
    await unfreezeButton.click();
    await expect(freezeButton).toBeVisible();
    await expect(freezeButton).toHaveAttribute('aria-label', `Freeze ${uniqueName} for today`);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 4: HabitCard editing
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC05: HabitCard - edit habit updates habit details
   */
  test('TC05 - HabitCard - edit habit updates habit details', async ({ page }) => {
    await page.goto('/');
    const habitName = 'HabitEdit ' + Date.now();
    await page.getByLabel('New habit name').fill(habitName);
    await page.getByRole('button', { name: 'Add habit' }).click();
    const card = page.getByRole('listitem').filter({ hasText: habitName });
    const editButton = card.getByRole('button', { name: `Edit ${habitName}` });
    await editButton.click();
    const nameInput = page.getByLabel(`Edit name for ${habitName}`);
    await expect(nameInput).toHaveValue(habitName);
    const categorySelect = page.getByLabel(`Edit category for ${habitName}`);
    await categorySelect.selectOption('Work');
    const targetSelect = page.getByLabel(`Edit times per week for ${habitName}`);
    await targetSelect.selectOption('3');
    const notesInput = page.getByLabel(`Edit notes for ${habitName}`);
    await notesInput.fill('Updated notes');
    const saveButton = page.getByRole('button', { name: 'Save' });
    await expect(saveButton).toBeEnabled();
    await saveButton.click();
    await expect(page.getByRole('listitem').filter({ hasText: 'Updated notes' })).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 5: HabitCard archiving
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC06: HabitCard - toggling archive removes and restores habit in the list
   */
  test('TC06 - HabitCard - toggling archive removes and restores habit in the list', async ({ page }) => {
    await page.goto('/');
    const habitName = 'HabitArchive ' + Date.now();
    await page.getByLabel('New habit name').fill(habitName);
    await page.getByRole('button', { name: 'Add habit' }).click();
    const card = page.getByRole('listitem').filter({ hasText: habitName });
    const archiveButton = card.getByRole('button', { name: `Archive ${habitName}` });
    await archiveButton.click();
    await expect(card).toHaveCount(0);
    await page.getByLabel('Show archived').check();
    const archivedCard = page.getByRole('listitem').filter({ hasText: habitName });
    await expect(archivedCard.getByRole('button', { name: `Unarchive ${habitName}` })).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 6: HabitForm validation
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC07: HabitForm - disables Add habit button when name is empty and enables when filled
   */
  test('TC07 - HabitForm - disables Add habit button when name is empty and enables when filled', async ({ page }) => {
    await page.goto('/');
    const nameInput = page.getByLabel('New habit name');
    const addButton = page.getByRole('button', { name: 'Add habit' });
    await expect(addButton).toBeDisabled();
    await nameInput.fill('Test Habit ' + Date.now());
    await expect(addButton).toBeEnabled();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 7: HabitList empty state
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC08: HabitList - shows empty message when no habits match search
   */
  test('TC08 - HabitList - shows empty message when no habits match search', async ({ page }) => {
    await page.goto('/');
    const uniqueSearch = 'nonexistent-' + Date.now();
    await page.getByRole('textbox', { name: 'Search habits by name' }).fill(uniqueSearch);
    await expect(page.getByText(`No habits match "${uniqueSearch}".`)).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 8: Filtering
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC09: HabitList - filtering by category updates habits list
   */
  test('TC09 - HabitList - filtering by category updates habits list', async ({ page }) => {
    await page.goto('/');
    const categorySelect = page.getByLabel('Filter by category');
    await categorySelect.selectOption('Health');
    await expect(page.getByRole('list')).toBeVisible();
  });

  /**
   * TC10: HabitList - toggling show archived updates habits list
   */
  test('TC10 - HabitList - toggling show archived updates habits list', async ({ page }) => {
    await page.goto('/');
    const checkbox = page.getByLabel('Show archived');
    await checkbox.check();
    await expect(page.getByRole('list')).toBeVisible();
    await checkbox.uncheck();
    await expect(page.getByRole('list')).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 9: Search and Filtering
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC11: Home page - perform a search shows filtered results
   */
  test('TC11 - Home page - perform a search shows filtered results', async ({ page }) => {
    await page.goto('/');
    const uniqueName = 'Habit ' + Date.now();
    await page.getByLabel('New habit name').fill(uniqueName);
    await page.getByRole('button', { name: 'Add habit' }).click();
    const searchBox = page.getByRole('searchbox', { name: 'Search habits by name' });
    await searchBox.fill(uniqueName.substring(0, 5));
    const habitCard = page.getByRole('listitem').filter({ hasText: uniqueName });
    await expect(habitCard).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 10: Sorting habits
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC12: Home page - sorting habits updates the list order
   */
  test('TC12 - Home page - sorting habits updates the list order', async ({ page }) => {
    await page.goto('/');
    const sortSelect = page.getByRole('combobox', { name: 'Sort habits by' });
    await sortSelect.selectOption('streak');
    await expect(page.getByRole('list')).toBeVisible();
    await sortSelect.selectOption('name');
    await expect(page.getByRole('list')).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 11: Home
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC13: Home - page loads with unconditional elements visible
   */
  test('TC13 - Home - page loads with unconditional elements visible', async ({ page }) => {
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
   * TC14: HabitForm - adds a new habit successfully
   */
  test('TC14 - HabitForm - adds a new habit successfully', async ({ page }) => {
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
   * TC15: HabitCard - edits a habit\'s name, category, target per week, and notes successfully
   */
  test('TC15 - HabitCard - edits a habit\\\'s name, category, target per week, and notes successfully', async ({ page }) => {
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
   * TC16: HabitCard - marks a habit as done today button disables afterward
   */
  test('TC16 - HabitCard - marks a habit as done today button disables afterward', async ({ page }) => {
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
   * TC17: HabitCard - archives and unarchives a habit
   */
  test('TC17 - HabitCard - archives and unarchives a habit', async ({ page }) => {
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
   * TC18: HabitCard - removes a habit after confirm dialog
   */
  test('TC18 - HabitCard - removes a habit after confirm dialog', async ({ page }) => {
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
   * TC19: Search box - filters habit list by matching name
   */
  test('TC19 - Search box - filters habit list by matching name', async ({ page }) => {
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
   * TC20: Category filter - filters habit list by category
   */
  test('TC20 - Category filter - filters habit list by category', async ({ page }) => {
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
   * TC21: Sort by dropdown - sorts habit list by name ascending
   */
  test('TC21 - Sort by dropdown - sorts habit list by name ascending', async ({ page }) => {
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
   * TC22: HabitForm - disables Add habit button when name is empty
   */
  test('TC22 - HabitForm - disables Add habit button when name is empty', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('textbox', { name: 'New habit name' }).fill('');
    await expect(page.getByRole('button', { name: 'Add habit' })).toBeDisabled();
  });

  /**
   * TC23: Home page - page loads and renders unconditional elements
   */
  test('TC23 - Home page - page loads and renders unconditional elements', async ({ page }) => {
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
   * TC24: HabitForm - successful habit creation adds new habit to list
   */
  test('TC24 - HabitForm - successful habit creation adds new habit to list', async ({ page }) => {
    await page.goto("/");
    const habitName = `Test habit create ${Date.now()}`;
    await page.getByRole("textbox", { name: "New habit name" }).fill(habitName);
    await page.getByLabel("Habit category").selectOption("General");
    await page.getByLabel("Times per week").selectOption("3");
    await page.getByRole("button", { name: "Add habit" }).click();
    const habitCard = page.getByRole("listitem").filter({ hasText: habitName });
    await expect(habitCard).toBeVisible();
  });

  /**
   * TC25: HabitCard - inline edit form displays when Edit button clicked and updates fields
   */
  test('TC25 - HabitCard - inline edit form displays when Edit button clicked and updates fields', async ({ page }) => {
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
   * TC26: HabitForm - form validation disables Add habit button for empty name
   */
  test('TC26 - HabitForm - form validation disables Add habit button for empty name', async ({ page }) => {
    await page.goto("/");
    const input = page.getByRole("textbox", { name: "New habit name" });
    const addButton = page.getByRole("button", { name: "Add habit" });
    await input.fill("");
    await expect(addButton).toBeDisabled();
    await input.fill("   ");
    await expect(addButton).toBeDisabled();
  });

  /**
   * TC27: HabitCard - cancel edit closes inline form without saving changes
   */
  test('TC27 - HabitCard - cancel edit closes inline form without saving changes', async ({ page }) => {
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
   * TC28: HabitCard - Save button disabled when name input is empty or blank
   */
  test('TC28 - HabitCard - Save button disabled when name input is empty or blank', async ({ page }) => {
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
    await page.getByLabel(`Edit name for ${habitName}`).fill("");
    await expect(saveButton).toBeDisabled();
    await page.getByLabel(`Edit name for ${habitName}`).fill("   ");
    await expect(saveButton).toBeDisabled();
  });

  /**
   * TC29: Page heading and static elements render
   */
  test('TC29 - Page heading and static elements render', async ({ page }) => {
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
   * TC30: HabitForm - allows creating a new habit
   */
  test('TC30 - HabitForm - allows creating a new habit', async ({ page }) => {
    await page.goto("/");
    const habitName = `Test habit create ${Date.now()}`;
    await page.getByRole("textbox", { name: "New habit name" }).fill(habitName);
    await page.getByRole("combobox", { name: "Habit category" }).selectOption("General");
    await page.getByRole("combobox", { name: "Times per week" }).selectOption("7");
    await page.getByRole("button", { name: "Add habit" }).click();
    await expect(page.getByRole("listitem").filter({ hasText: habitName })).toBeVisible();
  });

  /**
   * TC31: Category filter - allows filtering habits
   */
  test('TC31 - Category filter - allows filtering habits', async ({ page }) => {
    await page.goto("/");
    await page.getByRole("combobox", { name: "Filter by category" }).selectOption("Health");
    await expect(page.getByLabel("Filter by category")).toHaveValue("Health");
  });

  /**
   * TC32: HabitCard - marks habit done today disables button
   */
  test('TC32 - HabitCard - marks habit done today disables button', async ({ page }) => {
    await page.goto("/");
    const habitName = `Daily completion habit ${Date.now()}`;
    await page.getByRole("textbox", { name: "New habit name" }).fill(habitName);
    await page.getByRole("button", { name: "Add habit" }).click();
    const card = page.getByRole("listitem").filter({ hasText: habitName });
    await card.getByRole("button", { name: "Mark done", exact: true }).click();
    await expect(card.getByRole("button", { name: "Done today", exact: true })).toBeDisabled();
  });

  /**
   * TC33: HabitCard inline edit form - opens and cancels edit mode
   */
  test('TC33 - HabitCard inline edit form - opens and cancels edit mode', async ({ page }) => {
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
   * TC34: HabitCard inline edit form - saves edited habit and closes form
   */
  test('TC34 - HabitCard inline edit form - saves edited habit and closes form', async ({ page }) => {
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
   * TC35: Home page - initial render shows main heading, filter, show archived checkbox, export buttons disabled, and navigation link
   */
  test('TC35 - Home page - initial render shows main heading, filter, show archived checkbox, export buttons disabled, and navigation link', async ({ page }) => {
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
   * TC36: HabitForm - create a habit with notes successfully adds it to the list and enables export buttons
   */
  test('TC36 - HabitForm - create a habit with notes successfully adds it to the list and enables export buttons', async ({ page }) => {
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
   * TC37: HabitCard - edit habit updates name, category, target per week, and notes
   */
  test('TC37 - HabitCard - edit habit updates name, category, target per week, and notes', async ({ page }) => {
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
   * TC38: HabitCard - archive and unarchive a habit via its archive toggle button
   */
  test('TC38 - HabitCard - archive and unarchive a habit via its archive toggle button', async ({ page }) => {
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
   * TC39: HabitCard - mark habit as done disables mark done button
   */
  test('TC39 - HabitCard - mark habit as done disables mark done button', async ({ page }) => {
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
   * TC40: Home - filter habits list by category changes displayed habits accordingly
   */
  test('TC40 - Home - filter habits list by category changes displayed habits accordingly', async ({ page }) => {
    await page.goto('/');
    const categoryFilter = page.getByLabel('Filter by category');
    await categoryFilter.selectOption('Health');
    await expect(categoryFilter).toHaveValue('Health');
  });

  /**
   * TC41: Home - toggling show archived checkbox updates displayed habits accordingly
   */
  test('TC41 - Home - toggling show archived checkbox updates displayed habits accordingly', async ({ page }) => {
    await page.goto('/');
    const showArchivedCheckbox = page.getByLabel('Show archived');
    await showArchivedCheckbox.check();
    await expect(showArchivedCheckbox).toBeChecked();
    await showArchivedCheckbox.uncheck();
    await expect(showArchivedCheckbox).not.toBeChecked();
  });

  /**
   * TC42: Home - Export JSON and Export CSV buttons are disabled when no habits exist and enabled after habits are created
   */
  test('TC42 - Home - Export JSON and Export CSV buttons are disabled when no habits exist and enabled after habits are created', async ({ page }) => {
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
   * TC43: LogoutButton - logout button logs out and navigates to /login
   */
  test('TC43 - LogoutButton - logout button logs out and navigates to /login', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Logout' }).click();
    await expect(page).toHaveURL('/login');
  });

  /**
   * TC44: Home page - page loads and displays unconditional controls
   */
  test('TC44 - Home page - page loads and displays unconditional controls', async ({ page }) => {
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
   * TC45: HabitForm - add new habit successfully resets form
   */
  test('TC45 - HabitForm - add new habit successfully resets form', async ({ page }) => {
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
   * TC46: HabitCard - mark habit done today disables button and changes label
   */
  test('TC46 - HabitCard - mark habit done today disables button and changes label', async ({ page }) => {
    await page.goto('/');
    const habitName = `HabitDone ${Date.now()}`;
    await page.getByLabel('New habit name').fill(habitName);
    await page.getByRole('button', { name: 'Add habit' }).click();
    const card = page.getByRole('listitem').filter({ hasText: habitName });
    const markDoneButton = card.getByRole('button', { name: 'Mark done', exact: true });
    await markDoneButton.click();
    await expect(card.getByRole('button', { name: 'Done today', exact: true })).toBeDisabled();
  });

  /**
   * TC47: HabitCard - edit habit and save changes updates displayed name and disables save button when empty
   */
  test('TC47 - HabitCard - edit habit and save changes updates displayed name and disables save button when empty', async ({ page }) => {
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
   * TC48: Home page - search filters habit list results
   */
  test('TC48 - Home page - search filters habit list results', async ({ page }) => {
    await page.goto('/');
    const habit1 = `Search Alpha ${Date.now()}`;
    const habit2 = `Search Beta ${Date.now()}`;
    await page.getByLabel('New habit name').fill(habit1);
    await page.getByRole('button', { name: 'Add habit' }).click();
    await expect(page.getByRole('listitem').filter({ hasText: habit1 })).toBeVisible();
    await page.getByLabel('New habit name').fill(habit2);
    await page.getByRole('button', { name: 'Add habit' }).click();
    await expect(page.getByRole('listitem').filter({ hasText: habit2 })).toBeVisible();
    await page.getByLabel('Search habits by name').fill('Alpha');
    await expect(page.getByRole('listitem').filter({ hasText: habit1 })).toBeVisible();
    await expect(page.getByRole('listitem').filter({ hasText: habit2 })).toHaveCount(0);
  });

  /**
   * TC49: Home page - category filter updates visible habits
   */
  test('TC49 - Home page - category filter updates visible habits', async ({ page }) => {
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
   * TC50: Home page - toggling show archived controls archived habits visibility
   */
  test('TC50 - Home page - toggling show archived controls archived habits visibility', async ({ page }) => {
    await page.goto('/');
    const archName = 'Archive Test ' + Date.now();
    await page.getByLabel('New habit name').fill(archName);
    await page.getByRole('button', { name: 'Add habit' }).click();
    const habitCard = page.getByRole('listitem').filter({ hasText: archName });
    habitCard.getByRole('button', { name: `Archive ${archName}` }).click();
    await expect(page.getByRole('listitem').filter({ hasText: archName })).toHaveCount(0);
    await page.getByRole('checkbox', { name: 'Show archived' }).check();
    await expect(page.getByRole('listitem').filter({ hasText: archName })).toBeVisible();
  });

  /**
   * TC51: Home page - Complete all for today bulk action disables button and updates label
   */
  test('TC51 - Home page - Complete all for today bulk action disables button and updates label', async ({ page }) => {
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
   * TC52: Home page - Export JSON and CSV buttons visibility and disabled state
   */
  test('TC52 - Home page - Export JSON and CSV buttons visibility and disabled state', async ({ page }) => {
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
   * TC53: Home - page loads and renders core controls
   */
  test('TC53 - Home - page loads and renders core controls', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
    await expect(page.getByLabel('Search habits by name')).toBeVisible();
    await expect(page.getByLabel('Sort habits by')).toBeVisible();
    await expect(page.getByLabel('Filter by category')).toBeVisible();
    await expect(page.getByRole('checkbox', { name: 'Show archived' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add habit' })).toBeVisible();
  });

  /**
   * TC54: HabitForm - creates a new habit successfully
   */
  test('TC54 - HabitForm - creates a new habit successfully', async ({ page }) => {
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
   * TC55: HabitCard - edits an existing habit\\\'s name, category, target per week, and notes
   */
  test('TC55 - HabitCard - edits an existing habit\\\\\\\'s name, category, target per week, and notes', async ({ page }) => {
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
   * TC56: HabitCard - marks a habit as completed today
   */
  test('TC56 - HabitCard - marks a habit as completed today', async ({ page }) => {
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
   * TC57: HabitCard - toggles archive and unarchive of a habit
   */
  test('TC57 - HabitCard - toggles archive and unarchive of a habit', async ({ page }) => {
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
   * TC58: Home - filters habits by category
   */
  test('TC58 - Home - filters habits by category', async ({ page }) => {
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
   * TC59: Home - searches for habits by name
   */
  test('TC59 - Home - searches for habits by name', async ({ page }) => {
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
   * TC60: Home - sorts habits by different criteria updates visible list
   */
  test('TC60 - Home - sorts habits by different criteria updates visible list', async ({ page }) => {
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
   * TC61: Home - toggles show archived checkbox updates habits list
   */
  test('TC61 - Home - toggles show archived checkbox updates habits list', async ({ page }) => {
    await page.goto('/');
    const checkbox = page.getByRole('checkbox', { name: 'Show archived' });
    const initialCount = await page.getByRole('listitem').count();
    await checkbox.check();
    await expect(page.getByRole('list')).toBeVisible();
    await checkbox.uncheck();
    await expect(page.getByRole('list')).toBeVisible();
  });

  /**
   * TC62: Home - completes all incomplete habits for today with bulk action
   */
  test('TC62 - Home - completes all incomplete habits for today with bulk action', async ({ page }) => {
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
   * TC63: HabitCard - edits an existing habit\'s name, category, target per week, and notes
   */
  test('TC63 - HabitCard - edits an existing habit\\\'s name, category, target per week, and notes', async ({ page }) => {
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

});
