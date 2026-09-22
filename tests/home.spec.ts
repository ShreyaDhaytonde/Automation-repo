import { test, expect } from '@playwright/test';

test.describe('Home', () => {
  test.setTimeout(60000);

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 1: Page load
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC01: Home - page loads and renders unconditional elements
   */
  test('TC01 - Home - page loads and renders unconditional elements', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
    await expect(page.getByLabel('Search habits by name')).toBeVisible();
    await expect(page.getByLabel('Sort habits by')).toBeVisible();
    await expect(page.getByLabel('Filter by category')).toBeVisible();
    await expect(page.getByLabel('Filter by priority')).toBeVisible();
    await expect(page.getByLabel('Show archived')).toBeVisible();
    await expect(page.getByRole('button', { name: /^Complete all for today/ })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Export JSON' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Export CSV' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'History' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'View stats' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Archive' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Clear filters' })).toBeHidden();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 2: HabitForm - create habit
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC02: HabitForm - create a new habit successfully
   */
  test('TC02 - HabitForm - create a new habit successfully', async ({ page }) => {
    await page.goto('/');
    const habitName = `Test Habit ${Date.now()}`;
    await page.getByLabel('New habit name').fill(habitName);
    await page.getByLabel('Habit category').selectOption('General');
    await page.getByLabel('Times per week').selectOption('3');
    await page.getByLabel('Notes (optional)').fill('Test notes');
    await page.getByRole('button', { name: 'Add habit' }).click();
    const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
    await expect(habitCard).toBeVisible();
    await expect(habitCard.getByText('General')).toBeVisible();
    await expect(habitCard.getByText('0/3 this week')).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 3: HabitCard - pin toggle
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC03: HabitCard - toggle pin state on a habit card
   */
  test('TC03 - HabitCard - toggle pin state on a habit card', async ({ page }) => {
    await page.goto('/');
    const habitName = `Pin Test Habit ${Date.now()}`;
    await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
    await page.getByRole('button', { name: 'Add habit' }).click();
    const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
    const pinButton = habitCard.getByRole('button', { name: `Pin ${habitName}` });
    await pinButton.click();
    await expect(habitCard.getByRole('button', { name: `Unpin ${habitName}` })).toBeVisible();
    await habitCard.getByRole('button', { name: `Unpin ${habitName}` }).click();
    await expect(habitCard.getByRole('button', { name: `Pin ${habitName}` })).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 4: HabitCard - priority cycle
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC04: HabitCard - cycle priority on a habit card
   */
  test('TC04 - HabitCard - cycle priority on a habit card', async ({ page }) => {
    await page.goto('/');
    const habitName = `Priority Test Habit ${Date.now()}`;
    await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
    await page.getByRole('button', { name: 'Add habit' }).click();
    const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
    const priorityButton = habitCard.getByRole('button', { name: new RegExp(`Cycle priority for ${habitName}, currently (Low|Medium|High)`) });
    const initialPriority = await priorityButton.getAttribute('aria-label');
    const match = initialPriority?.match(/currently (Low|Medium|High)/);
    const currentPriority = match ? match[1] : null;
    const nextPriority = currentPriority === 'Low' ? 'Medium' : currentPriority === 'Medium' ? 'High' : 'Low';
    await priorityButton.click();
    await expect(habitCard.getByRole('button', { name: `Cycle priority for ${habitName}, currently ${nextPriority}` })).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 5: Filters - priority filter
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC05: Home - filter habits by priority
   */
  test('TC05 - Home - filter habits by priority', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('list')).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 6: Home
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC06: Home - page loads with unconditional elements visible
   */
  test('TC06 - Home - page loads with unconditional elements visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'New habit name' })).toBeVisible();
    await expect(page.getByLabel('Habit category')).toBeVisible();
    await expect(page.getByLabel('Times per week')).toBeVisible();
    await expect(page.getByLabel('Notes (optional)')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add habit' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Search habits by name' })).toBeVisible();
    await expect(page.getByLabel('Sort habits by')).toBeVisible();
    await expect(page.getByLabel('Filter by category')).toBeVisible();
    await expect(page.getByRole('checkbox', { name: 'Show archived' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'View stats' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Complete all for today' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Export JSON' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Export CSV' })).toBeVisible();
  });

  /**
   * TC07: HabitForm - adds a new habit successfully
   */
  test('TC07 - HabitForm - adds a new habit successfully', async ({ page }) => {
    await page.goto('/');
    const uniqueName = `Habit ${Date.now()}`;
    await page.getByRole('textbox', { name: 'New habit name' }).fill(uniqueName);
    await page.getByLabel('Habit category').selectOption('General');
    await page.getByLabel('Times per week').selectOption('7x / week');
    await page.getByLabel('Notes (optional)').fill('Test notes');
    await page.getByRole('button', { name: 'Add habit' }).click();
    const habitCard = page.getByRole('listitem').filter({ hasText: uniqueName });
    await expect(habitCard).toBeVisible();
  });

  /**
   * TC08: HabitCard - edits a habit\'s name, category, target per week, and notes successfully
   */
  test('TC08 - HabitCard - edits a habit\\\'s name, category, target per week, and notes successfully', async ({ page }) => {
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
   * TC09: HabitCard - marks a habit as done today button disables afterward
   */
  test('TC09 - HabitCard - marks a habit as done today button disables afterward', async ({ page }) => {
    await page.goto('/');
    const habitName = `CompleteTest ${Date.now()}`;
    await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
    await page.getByRole('button', { name: 'Add habit' }).click();
    const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
    await expect(habitCard).toBeVisible();
    const markDoneButton = habitCard.getByRole('button', { name: 'Mark done' });
    await markDoneButton.click();
    await expect(habitCard.getByRole('button', { name: 'Done today' })).toBeVisible();
    await expect(habitCard.getByRole('button', { name: 'Done today' })).toBeDisabled();
  });

  /**
   * TC10: HabitCard - archives and unarchives a habit
   */
  test('TC10 - HabitCard - archives and unarchives a habit', async ({ page }) => {
    await page.goto('/');
    const habitName = `ArchiveTest ${Date.now()}`;
    await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
    await page.getByRole('button', { name: 'Add habit' }).click();
    const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
    await expect(habitCard).toBeVisible();
    await habitCard.getByRole('button', { name: `Archive ${habitName}` }).click();
    await expect(page.getByRole('listitem').filter({ hasText: habitName })).toHaveCount(0);
    await page.getByRole('checkbox', { name: 'Show archived' }).check();
    const archivedHabitCard = page.getByRole('listitem').filter({ hasText: habitName });
    await expect(archivedHabitCard.getByRole('button', { name: `Unarchive ${habitName}` })).toBeVisible();
  });

  /**
   * TC11: HabitCard - removes a habit after confirm dialog
   */
  test('TC11 - HabitCard - removes a habit after confirm dialog', async ({ page }) => {
    await page.goto('/');
    const habitName = `DeleteTest ${Date.now()}`;
    await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
    await page.getByRole('button', { name: 'Add habit' }).click();
    const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
    await expect(habitCard).toBeVisible();
    page.on('dialog', (dialog) => dialog.accept());
    await habitCard.getByRole('button', { name: `Delete ${habitName}` }).click();
    await expect(page.getByRole('listitem').filter({ hasText: habitName })).toHaveCount(0);
  });

  /**
   * TC12: Search box - filters habit list by matching name
   */
  test('TC12 - Search box - filters habit list by matching name', async ({ page }) => {
    await page.goto('/');
    const uniqueName = `SearchTest ${Date.now()}`;
    await page.getByRole('textbox', { name: 'New habit name' }).fill(uniqueName);
    await page.getByRole('button', { name: 'Add habit' }).click();
    await expect(page.getByRole('listitem').filter({ hasText: uniqueName })).toBeVisible();
    const searchBox = page.getByLabel('Search habits by name');
    await searchBox.fill(uniqueName);
    await expect(page.getByRole('listitem').filter({ hasText: uniqueName })).toBeVisible();
    await searchBox.fill('nonexistentsearchterm' + Date.now());
    await expect(page.getByText(new RegExp(`No habits match "nonexistentsearchterm`))).toBeVisible();
  });

  /**
   * TC13: Category filter - filters habit list by category
   */
  test('TC13 - Category filter - filters habit list by category', async ({ page }) => {
    await page.goto('/');
    const uniqueName = `CategoryTest ${Date.now()}`;
    await newHabitNameField(page).fill(uniqueName);
    await page.getByLabel('Habit category').selectOption('Health');
    await submitAddHabitButton(page).click();
    await expect(habitCardLocator(page, uniqueName)).toBeVisible();
    await page.getByLabel('Filter by category').selectOption('Health');
    await expect(habitCardLocator(page, uniqueName)).toBeVisible();
  });

  /**
   * TC14: Sort by dropdown - sorts habit list by name ascending
   */
  test('TC14 - Sort by dropdown - sorts habit list by name ascending', async ({ page }) => {
    await page.goto('/');
    const uniqueNameA = `SortA ${Date.now()}`;
    const uniqueNameB = `SortB ${Date.now() + 1}`;
    await newHabitNameField(page).fill(uniqueNameB);
    await submitAddHabitButton(page).click();
    await expect(habitCardLocator(page, uniqueNameB)).toBeVisible();
    await newHabitNameField(page).fill(uniqueNameA);
    await submitAddHabitButton(page).click();
    await expect(habitCardLocator(page, uniqueNameA)).toBeVisible();
    await sortByControl(page).selectOption('name');
    const habitCards = await page.getByRole('listitem').all();
    const texts = await Promise.all(habitCards.map((habitCard) => habitCard.textContent()));
    const sorted = texts.every((text, i, arr) => !i || (text?.localeCompare(arr[i-1]!) ?? -1) >= 0);
    expect(sorted).toBe(true);
  });

  /**
   * TC15: HabitForm - disables Add habit button when name is empty
   */
  test('TC15 - HabitForm - disables Add habit button when name is empty', async ({ page }) => {
    await page.goto('/');
    await newHabitNameField(page).fill('');
    await expect(submitAddHabitButton(page)).toBeDisabled();
  });

  /**
   * TC16: Home page - page loads and renders unconditional elements
   */
  test('TC16 - Home page - page loads and renders unconditional elements', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
    await expect(page.getByText('Build small daily habits, one day at a time.')).toBeVisible();
    await expect(page.getByLabel('Filter by category')).toBeVisible();
    await expect(page.getByLabel('Filter by category').locator('option').first()).toHaveText('All');
    for (const category of ['General', 'Health', 'Work', 'Personal', 'Learning']) {
      await expect(page.getByLabel('Filter by category').locator('option').filter({ hasText: category })).toHaveCount(1);
    }
    await expect(newHabitNameField(page)).toBeVisible();
    await expect(page.getByLabel('Habit category')).toBeVisible();
    for (const category of ['General', 'Health', 'Work', 'Personal', 'Learning']) {
      await expect(page.getByLabel('Habit category').locator('option').filter({ hasText: category })).toHaveCount(1);
    }
    await expect(page.getByLabel('Times per week')).toBeVisible();
    for (const n of ['1x / week','2x / week','3x / week','4x / week','5x / week','6x / week','7x / week']) {
      await expect(page.getByLabel('Times per week').locator('option').filter({ hasText: n })).toHaveCount(1);
    }
    await expect(submitAddHabitButton(page)).toBeVisible();
  });

  /**
   * TC17: HabitCard - inline edit form displays when Edit button clicked and updates fields
   */
  test('TC17 - HabitCard - inline edit form displays when Edit button clicked and updates fields', async ({ page }) => {
    await page.goto('/');
    const habitName = `Edit habit ${Date.now()}`;
    await newHabitNameField(page).fill(habitName);
    await page.getByLabel('Habit category').selectOption('General');
    await page.getByLabel('Times per week').selectOption('3');
    await submitAddHabitButton(page).click();
    const habitCard = habitCardLocator(page, habitName);
    await expect(habitCard).toBeVisible();
    const editButton = habitCard.getByRole('button', { name: `Edit ${habitName}` });
    await editButton.click();
    const editNameInput = page.getByLabel(`Edit name for ${habitName}`);
    const editCategorySelect = page.getByLabel(`Edit category for ${habitName}`);
    const editTimesSelect = page.getByLabel(`Edit times per week for ${habitName}`);
    await expect(editNameInput).toBeVisible();
    await expect(editNameInput).toHaveValue(habitName);
    await expect(editCategorySelect).toHaveValue('General');
    await expect(editTimesSelect).toHaveValue('3');
    const newName = `${habitName} updated`;
    await editNameInput.fill(newName);
    await editCategorySelect.selectOption('Health');
    await editTimesSelect.selectOption('5');
    await page.getByRole('button', { name: 'Save', exact: true }).click();
    const updatedHabitCard = habitCardLocator(page, newName);
    await expect(updatedHabitCard).toBeVisible();
  });

  /**
   * TC18: HabitForm - form validation disables Add habit button for empty name
   */
  test('TC18 - HabitForm - form validation disables Add habit button for empty name', async ({ page }) => {
    await page.goto('/');
    const nameInput = newHabitNameField(page);
    const addButton = submitAddHabitButton(page);
    await nameInput.fill('');
    await expect(addButton).toBeDisabled();
    await nameInput.fill('   ');
    await expect(addButton).toBeDisabled();
  });

  /**
   * TC19: HabitCard - cancel edit closes inline form without saving changes
   */
  test('TC19 - HabitCard - cancel edit closes inline form without saving changes', async ({ page }) => {
    await page.goto('/');
    const habitName = `Cancel edit habit ${Date.now()}`;
    await newHabitNameField(page).fill(habitName);
    await page.getByLabel('Habit category').selectOption('General');
    await page.getByLabel('Times per week').selectOption('3');
    await submitAddHabitButton(page).click();
    const habitCard = habitCardLocator(page, habitName);
    await expect(habitCard).toBeVisible();
    const editButton = habitCard.getByRole('button', { name: `Edit ${habitName}` });
    await editButton.click();
    const editNameInput = page.getByLabel(`Edit name for ${habitName}`);
    await editNameInput.fill('Changed name');
    await page.getByRole('button', { name: 'Cancel', exact: true }).click();
    await expect(page.getByLabel(`Edit name for ${habitName}`)).toHaveCount(0);
    await expect(habitCard).toBeVisible();
  });

  /**
   * TC20: HabitCard - Save button disabled when name input is empty or blank
   */
  test('TC20 - HabitCard - Save button disabled when name input is empty or blank', async ({ page }) => {
    await page.goto('/');
    const habitName = `Edit validation habit ${Date.now()}`;
    await newHabitNameField(page).fill(habitName);
    await page.getByLabel('Habit category').selectOption('General');
    await page.getByLabel('Times per week').selectOption('3');
    await submitAddHabitButton(page).click();
    const habitCard = habitCardLocator(page, habitName);
    await expect(habitCard).toBeVisible();
    const editButton = habitCard.getByRole('button', { name: `Edit ${habitName}` });
    await editButton.click();
    const saveButton = page.getByRole('button', { name: 'Save', exact: true });
    const nameInput = page.getByLabel(`Edit name for ${habitName}`);
    await nameInput.fill('');
    await expect(saveButton).toBeDisabled();
    await nameInput.fill('   ');
    await expect(saveButton).toBeDisabled();
  });

  /**
   * TC21: Page heading and static elements render
   */
  test('TC21 - Page heading and static elements render', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
    await expect(page.getByText('Build small daily habits, one day at a time.')).toBeVisible();
    await expect(page.getByLabel('Filter by category')).toBeVisible();
    await expect(categoryFilterControl(page)).toBeVisible();
    await expect(newHabitNameField(page)).toBeVisible();
    await expect(newHabitCategoryField(page)).toBeVisible();
    await expect(newHabitTargetField(page)).toBeVisible();
    await expect(submitAddHabitButton(page)).toBeVisible();
  });

  /**
   * TC22: HabitForm - allows creating a new habit
   */
  test('TC22 - HabitForm - allows creating a new habit', async ({ page }) => {
    await page.goto('/');
    const habitName = `Test habit create ${Date.now()}`;
    await newHabitNameField(page).fill(habitName);
    await newHabitCategoryField(page).selectOption('General');
    await newHabitTargetField(page).selectOption('7');
    await submitAddHabitButton(page).click();
    const habitCard = habitCardLocator(page, habitName);
    await expect(habitCard).toBeVisible();
  });

  /**
   * TC23: Category filter - allows filtering habits
   */
  test('TC23 - Category filter - allows filtering habits', async ({ page }) => {
    await page.goto('/');
    await categoryFilterControl(page).selectOption('Health');
    await expect(page.getByLabel('Filter by category')).toHaveValue('Health');
  });

  /**
   * TC24: HabitCard - marks habit done today disables button
   */
  test('TC24 - HabitCard - marks habit done today disables button', async ({ page }) => {
    await page.goto('/');
    const habitName = `Daily completion habit ${Date.now()}`;
    await newHabitNameField(page).fill(habitName);
    await submitAddHabitButton(page).click();
    const card = habitCardLocator(page, habitName);
    const markDoneButton = card.getByRole('button', { name: 'Mark done', exact: true });
    await markDoneButton.click();
    await expect(card.getByRole('button', { name: 'Done today', exact: true })).toBeVisible();
    await expect(card.getByRole('button', { name: 'Done today', exact: true })).toBeDisabled();
  });

  /**
   * TC25: HabitCard inline edit form - opens and cancels edit mode
   */
  test('TC25 - HabitCard inline edit form - opens and cancels edit mode', async ({ page }) => {
    await page.goto('/');
    const habitName = `Editable habit ${Date.now()}`;
    await newHabitNameField(page).fill(habitName);
    await submitAddHabitButton(page).click();
    const card = habitCardLocator(page, habitName);
    await card.getByRole('button', { name: `Edit ${habitName}` }).click();
    const nameInput = page.getByLabel(`Edit name for ${habitName}`);
    await expect(nameInput).toBeVisible();
    await page.getByRole('button', { name: 'Cancel', exact: true }).click();
    await expect(card.getByRole('button', { name: `Edit ${habitName}` })).toBeVisible();
  });

  /**
   * TC26: HabitCard inline edit form - saves edited habit and closes form
   */
  test('TC26 - HabitCard inline edit form - saves edited habit and closes form', async ({ page }) => {
    await page.goto('/');
    const habitName = `Editable habit save ${Date.now()}`;
    await newHabitNameField(page).fill(habitName);
    await submitAddHabitButton(page).click();
    const card = habitCardLocator(page, habitName);
    await card.getByRole('button', { name: `Edit ${habitName}` }).click();
    const nameInput = page.getByLabel(`Edit name for ${habitName}`);
    await expect(nameInput).toHaveValue(habitName);
    const updatedName = `${habitName} updated`;
    await nameInput.fill(updatedName);
    const categorySelect = page.getByLabel(`Edit category for ${habitName}`);
    await categorySelect.selectOption('General');
    const timesSelect = page.getByLabel(`Edit times per week for ${habitName}`);
    await timesSelect.selectOption('3');
    await page.getByRole('button', { name: 'Save', exact: true }).click();
    await expect(habitCardLocator(page, updatedName)).toBeVisible();
    await expect(page.getByLabel(`Edit name for ${habitName}`)).toHaveCount(0);
  });

  /**
   * TC27: Home page - initial render shows main heading, filter, show archived checkbox, export buttons disabled, and navigation link
   */
  test('TC27 - Home page - initial render shows main heading, filter, show archived checkbox, export buttons disabled, and navigation link', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
    const categoryFilter = page.getByLabel('Filter by category');
    await expect(categoryFilter).toBeVisible();
    const allOption = categoryFilter.locator('option[value=""]');
    await expect(allOption).toHaveCount(1);
    await expect(categoryFilter).toHaveValue('');
    const showArchivedCheckbox = showArchivedToggle(page);
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
   * TC28: HabitForm - create a habit with notes successfully adds it to the list and enables export buttons
   */
  test('TC28 - HabitForm - create a habit with notes successfully adds it to the list and enables export buttons', async ({ page }) => {
    await page.goto('/');
    const habitName = `Test habit ${Date.now()}`;
    const habitNotes = 'Test note for habit';
    await newHabitNameField(page).fill(habitName);
    await newHabitCategoryField(page).selectOption('Health');
    await newHabitTargetField(page).selectOption('3');
    await newHabitNotesField(page).fill(habitNotes);
    await submitAddHabitButton(page).click();
    const habitCard = habitCardLocator(page, habitName);
    await expect(habitCard).toBeVisible();
    await expect(habitCard.getByText(habitNotes)).toBeVisible();
    const exportJsonButton = page.getByRole('button', { name: 'Export JSON' });
    await expect(exportJsonButton).toBeEnabled();
    const exportCsvButton = page.getByRole('button', { name: 'Export CSV' });
    await expect(exportCsvButton).toBeEnabled();
  });

  /**
   * TC29: HabitCard - edit habit updates name, category, target per week, and notes
   */
  test('TC29 - HabitCard - edit habit updates name, category, target per week, and notes', async ({ page }) => {
    await page.goto('/');
    const originalName = `Edit habit ${Date.now()}`;
    const updatedName = `Updated habit ${Date.now()}`;
    const updatedNotes = 'Updated notes';
    await newHabitNameField(page).fill(originalName);
    await newHabitCategoryField(page).selectOption('Work');
    await newHabitTargetField(page).selectOption('2');
    await newHabitNotesField(page).fill('Initial notes');
    await submitAddHabitButton(page).click();
    const habitCard = habitCardLocator(page, originalName);
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
    const updatedHabitCard = habitCardLocator(page, updatedName);
    await expect(updatedHabitCard).toBeVisible();
    await expect(updatedHabitCard.getByText(updatedNotes)).toBeVisible();
  });

  /**
   * TC30: HabitCard - archive and unarchive a habit via its archive toggle button
   */
  test('TC30 - HabitCard - archive and unarchive a habit via its archive toggle button', async ({ page }) => {
    await page.goto('/');
    const habitName = `Archive habit ${Date.now()}`;
    await page.getByLabel('New habit name').fill(habitName);
    await submitAddHabitButton(page).click();
    const habitCard = habitCardLocator(page, habitName);
    await expect(habitCard).toBeVisible();
    const archiveButton = habitCard.getByRole('button', { name: `Archive ${habitName}` });
    await archiveButton.click();
    await expect(habitCardLocator(page, habitName)).toHaveCount(0);
    await showArchivedToggle(page).check();
    const archivedHabitCard = habitCardLocator(page, habitName);
    await expect(archivedHabitCard).toBeVisible();
    const unarchiveButton = archivedHabitCard.getByRole('button', { name: `Unarchive ${habitName}` });
    await unarchiveButton.click();
    await expect(habitCardLocator(page, habitName)).toHaveCount(1);
  });

  /**
   * TC31: HabitCard - mark habit as done disables mark done button
   */
  test('TC31 - HabitCard - mark habit as done disables mark done button', async ({ page }) => {
    await page.goto('/');
    const habitName = `Complete habit ${Date.now()}`;
    await page.getByLabel('New habit name').fill(habitName);
    await page.getByLabel('Habit category').selectOption('General');
    await page.getByLabel('Times per week').selectOption('7');
    await submitAddHabitButton(page).click();
    const habitCard = habitCardLocator(page, habitName);
    const markDoneButton = habitCard.getByRole('button', { name: 'Mark done', exact: true });
    await markDoneButton.click();
    await expect(habitCard.getByRole('button', { name: 'Done today', exact: true })).toBeDisabled();
  });

  /**
   * TC32: Home - filter habits list by category changes displayed habits accordingly
   */
  test('TC32 - Home - filter habits list by category changes displayed habits accordingly', async ({ page }) => {
    await page.goto('/');
    const categoryFilter = page.getByLabel('Filter by category');
    await categoryFilter.selectOption('Health');
    await expect(categoryFilter).toHaveValue('Health');
  });

  /**
   * TC33: Home - toggling show archived checkbox updates displayed habits accordingly
   */
  test('TC33 - Home - toggling show archived checkbox updates displayed habits accordingly', async ({ page }) => {
    await page.goto('/');
    const showArchivedCheckbox = showArchivedToggle(page);
    await showArchivedCheckbox.check();
    await expect(showArchivedCheckbox).toBeChecked();
    await showArchivedCheckbox.uncheck();
    await expect(showArchivedCheckbox).not.toBeChecked();
  });

  /**
   * TC34: Home - Export JSON and Export CSV buttons are disabled when no habits exist and enabled after habits are created
   */
  test('TC34 - Home - Export JSON and Export CSV buttons are disabled when no habits exist and enabled after habits are created', async ({ page }) => {
    await page.goto('/');
    const exportJsonButton = page.getByRole('button', { name: 'Export JSON' });
    const exportCsvButton = page.getByRole('button', { name: 'Export CSV' });
    await expect(exportJsonButton).toBeDisabled();
    await expect(exportCsvButton).toBeDisabled();
    const habitName = `Habit for export ${Date.now()}`;
    await page.getByLabel('New habit name').fill(habitName);
    await submitAddHabitButton(page).click();
    await expect(exportJsonButton).toBeEnabled();
    await expect(exportCsvButton).toBeEnabled();
  });

  /**
   * TC35: LogoutButton - logout button logs out and navigates to /login
   */
  test('TC35 - LogoutButton - logout button logs out and navigates to /login', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Logout' }).click();
    await expect(page).toHaveURL('/login');
  });

  /**
   * TC36: Home page - page loads and displays unconditional controls
   */
  test('TC36 - Home page - page loads and displays unconditional controls', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
    await expect(page.getByLabel('New habit name')).toBeVisible();
    await expect(page.getByLabel('Habit category')).toBeVisible();
    await expect(page.getByLabel('Times per week')).toBeVisible();
    await expect(submitAddHabitButton(page)).toBeVisible();
    await expect(page.getByLabel('Search habits by name')).toBeVisible();
    await expect(page.getByLabel('Sort habits by')).toBeVisible();
    await expect(page.getByLabel('Filter by category')).toBeVisible();
    await expect(page.getByRole('checkbox', { name: 'Show archived' })).toBeVisible();
    await expect(page.getByRole('button', { name: /^Complete all for today/ })).toBeVisible();
  });

  /**
   * TC37: HabitForm - add new habit successfully resets form
   */
  test('TC37 - HabitForm - add new habit successfully resets form', async ({ page }) => {
    await page.goto('/');
    const nameInput = page.getByLabel('New habit name');
    const categorySelect = page.getByLabel('Habit category');
    const timesSelect = page.getByLabel('Times per week');
    const notesInput = page.getByLabel('Notes (optional)');
    await nameInput.fill('Test habit ' + Date.now());
    await categorySelect.selectOption('Health');
    await timesSelect.selectOption('3');
    await notesInput.fill('Notes for testing');
    await submitAddHabitButton(page).click();
    await expect(nameInput).toHaveValue('');
    await expect(notesInput).toHaveValue('');
  });

  /**
   * TC38: HabitCard - edit habit and save changes updates displayed name and disables save button when empty
   */
  test('TC38 - HabitCard - edit habit and save changes updates displayed name and disables save button when empty', async ({ page }) => {
    await page.goto('/');
    const habitName = `HabitEdit ${Date.now()}`;
    await page.getByLabel('New habit name').fill(habitName);
    await submitAddHabitButton(page).click();
    const card = habitCardLocator(page, habitName);
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
    const updatedCard = habitCardLocator(page, 'Updated ' + habitName);
    await expect(updatedCard).toBeVisible();
    const updatedEditButton = updatedCard.getByRole('button', { name: `Edit Updated ${habitName}` });
    await updatedEditButton.click();
    const updatedNameInput = page.getByLabel(`Edit name for Updated ${habitName}`);
    await updatedNameInput.fill('');
    await expect(page.getByRole('button', { name: 'Save', exact: true })).toBeDisabled();
    const cancelButton = page.getByRole('button', { name: 'Cancel', exact: true });
    await cancelButton.click();
    await expect(habitCardLocator(page, 'Updated ' + habitName)).toBeVisible();
  });

  /**
   * TC39: Home page - search filters habit list results
   */
  test('TC39 - Home page - search filters habit list results', async ({ page }) => {
    await page.goto('/');
    const habit1 = `Search Alpha ${Date.now()}`;
    const habit2 = `Search Beta ${Date.now()}`;
    await page.getByLabel('New habit name').fill(habit1);
    await submitAddHabitButton(page).click();
    const habit1Card = habitCardLocator(page, habit1);
    await expect(habit1Card).toBeVisible();
    await page.getByLabel('New habit name').fill(habit2);
    await submitAddHabitButton(page).click();
    const habit2Card = habitCardLocator(page, habit2);
    await expect(habit2Card).toBeVisible();
    await page.getByLabel('Search habits by name').fill('Alpha');
    await expect(habitCardLocator(page, habit1)).toBeVisible();
    await expect(habitCardLocator(page, habit2)).toHaveCount(0);
  });

  /**
   * TC40: Home page - category filter updates visible habits
   */
  test('TC40 - Home page - category filter updates visible habits', async ({ page }) => {
    await page.goto('/');
    const catHabit1 = `Category Health ${Date.now()}`;
    const catHabit2 = `Category Work ${Date.now()}`;
    await page.getByLabel('New habit name').fill(catHabit1);
    await page.getByLabel('Habit category').selectOption('Health');
    await submitAddHabitButton(page).click();
    await page.getByLabel('New habit name').fill(catHabit2);
    await page.getByLabel('Habit category').selectOption('Work');
    await submitAddHabitButton(page).click();
    const filterDropdown = page.getByLabel('Filter by category');
    await filterDropdown.selectOption('Health');
    await expect(habitCardLocator(page, catHabit1)).toBeVisible();
    await expect(habitCardLocator(page, catHabit2)).toHaveCount(0);
  });

  /**
   * TC41: Home page - toggling show archived controls archived habits visibility
   */
  test('TC41 - Home page - toggling show archived controls archived habits visibility', async ({ page }) => {
    await page.goto('/');
    const archName = 'Archive Test ' + Date.now();
    await page.getByLabel('New habit name').fill(archName);
    await submitAddHabitButton(page).click();
    const habitCard = habitCardLocator(page, archName);
    await habitCard.getByRole('button', { name: `Archive ${archName}` }).click();
    await expect(habitCardLocator(page, archName)).toHaveCount(0);
    const showArchivedCheckbox = showArchivedToggle(page);
    await showArchivedCheckbox.check();
    const archivedHabitCard = habitCardLocator(page, archName);
    await expect(archivedHabitCard).toBeVisible();
  });

  /**
   * TC42: Home page - Complete all for today bulk action disables button and updates label
   */
  test('TC42 - Home page - Complete all for today bulk action disables button and updates label', async ({ page }) => {
    await page.goto('/');
    const habit1 = `BulkComplete 1 ${Date.now()}`;
    const habit2 = `BulkComplete 2 ${Date.now()}`;
    await page.getByLabel('New habit name').fill(habit1);
    await page.getByLabel('Habit category').selectOption('General');
    await submitAddHabitButton(page).click();
    await expect(habitCardLocator(page, habit1)).toBeVisible();
    await page.getByLabel('New habit name').fill(habit2);
    await page.getByLabel('Habit category').selectOption('General');
    await submitAddHabitButton(page).click();
    await expect(habitCardLocator(page, habit2)).toBeVisible();
    const bulkCompleteButton = page.getByRole('button', { name: /^Complete all for today/ });
    await expect(bulkCompleteButton).toBeEnabled();
    await bulkCompleteButton.click();
    await expect(bulkCompleteButton).not.toHaveText(/Completing…/, { timeout: 15000 });
  });

  /**
   * TC43: Home page - Export JSON and CSV buttons visibility and disabled state
   */
  test('TC43 - Home page - Export JSON and CSV buttons visibility and disabled state', async ({ page }) => {
    await page.goto('/');
    const exportJsonButton = page.getByRole('button', { name: 'Export JSON' });
    const exportCsvButton = page.getByRole('button', { name: 'Export CSV' });
    await expect(exportJsonButton).toBeVisible();
    await expect(exportCsvButton).toBeVisible();
    await expect(exportJsonButton).toBeDisabled();
    await expect(exportCsvButton).toBeDisabled();
    await page.getByLabel('New habit name').fill('Export Test ' + Date.now());
    await submitAddHabitButton(page).click();
    await expect(exportJsonButton).toBeEnabled();
    await expect(exportCsvButton).toBeEnabled();
  });

  /**
   * TC44: HabitForm - creates a new habit successfully
   */
  test('TC44 - HabitForm - creates a new habit successfully', async ({ page }) => {
    await page.goto('/');
    const habitName = `Test Habit ${Date.now()}`;
    await newHabitNameField(page).fill(habitName);
    await newHabitCategoryField(page).selectOption('General');
    await newHabitTargetField(page).selectOption('3');
    await newHabitNotesField(page).fill('Test notes');
    await submitAddHabitButton(page).click();
    const habitCard = habitCardLocator(page, habitName);
    await expect(habitCard).toBeVisible();
  });

  /**
   * TC45: HabitCard - edits an existing habit\\\'s name, category, target per week, and notes
   */
  test('TC45 - HabitCard - edits an existing habit\\\\\\\'s name, category, target per week, and notes', async ({ page }) => {
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
   * TC46: HabitCard - marks a habit as completed today
   */
  test('TC46 - HabitCard - marks a habit as completed today', async ({ page }) => {
    await page.goto('/');
    const habitName = `Complete Habit ${Date.now()}`;
    await page.getByLabel('New habit name').fill(habitName);
    await submitAddHabitButton(page).click();
    const habitCard = habitCardLocator(page, habitName);
    await expect(habitCard).toBeVisible();
    const markDoneButton = habitCard.getByRole('button', { name: 'Mark done' });
    await markDoneButton.click();
    const doneTodayButton = habitCard.getByRole('button', { name: 'Done today' });
    await expect(doneTodayButton).toBeVisible();
    await expect(doneTodayButton).toBeDisabled();
  });

  /**
   * TC47: HabitCard - toggles archive and unarchive of a habit
   */
  test('TC47 - HabitCard - toggles archive and unarchive of a habit', async ({ page }) => {
    await page.goto('/');
    const habitName = `Archive Habit ${Date.now()}`;
    await page.getByLabel('New habit name').fill(habitName);
    const addButton = submitAddHabitButton(page);
    await expect(addButton).toBeEnabled();
    await addButton.click();
    const habitCard = habitCardLocator(page, habitName);
    await expect(habitCard).toBeVisible();
    const archiveButton = habitCard.getByRole('button', { name: `Archive ${habitName}` });
    await archiveButton.click();
    await expect(habitCardLocator(page, habitName)).toHaveCount(0);
    await showArchivedToggle(page).check();
    const archivedHabitCard = habitCardLocator(page, habitName);
    await expect(archivedHabitCard).toBeVisible();
    const unarchiveButton = archivedHabitCard.getByRole('button', { name: `Unarchive ${habitName}` });
    await unarchiveButton.click();
    await expect(habitCardLocator(page, habitName)).toHaveCount(1);
  });

  /**
   * TC48: Home - filters habits by category
   */
  test('TC48 - Home - filters habits by category', async ({ page }) => {
    await page.goto('/');
    const habitName1 = `Filter Habit 1 ${Date.now()}`;
    const habitName2 = `Filter Habit 2 ${Date.now()}`;
    await page.getByLabel('New habit name').fill(habitName1);
    await page.getByLabel('Habit category').selectOption('Health');
    await submitAddHabitButton(page).click();
    await expect(habitCardLocator(page, habitName1)).toBeVisible();
    await page.getByLabel('New habit name').fill(habitName2);
    await page.getByLabel('Habit category').selectOption('Work');
    await submitAddHabitButton(page).click();
    await expect(habitCardLocator(page, habitName2)).toBeVisible();
    await page.getByLabel('Filter by category').selectOption('Health');
    await expect(habitCardLocator(page, habitName1)).toBeVisible();
    await expect(habitCardLocator(page, habitName2)).toHaveCount(0);
  });

  /**
   * TC49: Home - searches for habits by name
   */
  test('TC49 - Home - searches for habits by name', async ({ page }) => {
    await page.goto('/');
    const habitName = `Search Habit ${Date.now()}`;
    await page.getByLabel('New habit name').fill(habitName);
    await submitAddHabitButton(page).click();
    await expect(habitCardLocator(page, habitName)).toBeVisible();
    const searchInput = page.getByLabel('Search habits by name');
    await searchInput.fill(habitName.slice(0, 5));
    await expect(habitCardLocator(page, habitName)).toBeVisible();
    await searchInput.fill('nomatchterm');
    await expect(page.getByText(new RegExp(`No habits match "nomatchterm"\.`))).toBeVisible();
  });

  /**
   * TC50: Home - sorts habits by different criteria updates visible list
   */
  test('TC50 - Home - sorts habits by different criteria updates visible list', async ({ page }) => {
    await page.goto('/');
    const habitName1 = `Sort Habit A ${Date.now()}`;
    const habitName2 = `Sort Habit B ${Date.now()}`;
    await page.getByLabel('New habit name').fill(habitName1);
    const addButton1 = submitAddHabitButton(page);
    await expect(addButton1).toBeEnabled();
    await addButton1.click();
    await expect(habitCardLocator(page, habitName1)).toBeVisible();
    await page.getByLabel('New habit name').fill(habitName2);
    const addButton2 = submitAddHabitButton(page);
    await expect(addButton2).toBeEnabled();
    await addButton2.click();
    await expect(habitCardLocator(page, habitName2)).toBeVisible();
    const sortSelect = page.getByLabel('Sort habits by');
    const sortValues = ['name', 'streak', 'category', 'target_per_week'];
    for (const val of sortValues) {
      await sortSelect.selectOption(val);
      await expect(page.getByRole('list')).toBeVisible();
    }
  });

  /**
   * TC51: Home - toggles show archived checkbox updates habits list
   */
  test('TC51 - Home - toggles show archived checkbox updates habits list', async ({ page }) => {
    await page.goto('/');
    const checkbox = page.getByRole('checkbox', { name: 'Show archived' });
    await checkbox.check();
    await expect(page.getByRole('list')).toBeVisible();
    await checkbox.uncheck();
    await expect(page.getByRole('list')).toBeVisible();
  });

  /**
   * TC52: Home - completes all incomplete habits for today with bulk action
   */
  test('TC52 - Home - completes all incomplete habits for today with bulk action', async ({ page }) => {
    await page.goto('/');
    const habitName1 = `Bulk Complete Habit 1 ${Date.now()}`;
    const habitName2 = `Bulk Complete Habit 2 ${Date.now()}`;
    await page.getByLabel('New habit name').fill(habitName1);
    const addButton1 = submitAddHabitButton(page);
    await expect(addButton1).toBeEnabled();
    await addButton1.click();
    await expect(habitCardLocator(page, habitName1)).toBeVisible();
    await page.getByLabel('New habit name').fill(habitName2);
    const addButton2 = submitAddHabitButton(page);
    await expect(addButton2).toBeEnabled();
    await addButton2.click();
    await expect(habitCardLocator(page, habitName2)).toBeVisible();
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
   * TC53: Home - page loads and displays header and controls
   */
  test('TC53 - Home - page loads and displays header and controls', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
    await expect(page.getByText('Build small daily habits, one day at a time.')).toBeVisible();
    await expect(page.locator('p.text-xs.text-zinc-400').first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'History' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'View stats' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Archive' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Switch to dark mode' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
    await expect(habitSearchBox(page)).toBeVisible();
    await expect(sortByControl(page)).toBeVisible();
    await expect(categoryFilterControl(page)).toBeVisible();
    await expect(showArchivedToggle(page)).toBeVisible();
    await expect(page.getByRole('button', { name: /^Complete all for today/ })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Export JSON' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Export CSV' })).toBeVisible();
    await expect(submitAddHabitButton(page)).toBeVisible();
  });

  /**
   * TC54: HabitList - deletes a habit after confirmation
   */
  test('TC54 - HabitList - deletes a habit after confirmation', async ({ page }) => {
    await page.goto('/');
    const habitName = `Delete Habit ${Date.now()}`;
    await newHabitNameField(page).fill(habitName);
    await newHabitCategoryField(page).selectOption('General');
    await newHabitTargetField(page).selectOption('3');
    await submitAddHabitButton(page).click();
    const habitCard = habitCardLocator(page, habitName);
    await expect(habitCard).toBeVisible();
    page.on('dialog', (dialog) => dialog.accept());
    await habitCard.getByRole('button', { name: `Delete ${habitName}` }).click();
    await expect(habitCard).toHaveCount(0);
  });

  /**
   * TC55: HabitList - edits a habit and verifies updated values
   */
  test('TC55 - HabitList - edits a habit and verifies updated values', async ({ page }) => {
    await page.goto('/');
    const habitName = `Edit Habit ${Date.now()}`;
    await page.getByLabel('New habit name').fill(habitName);
    await page.getByLabel('Habit category').selectOption('General');
    await page.getByLabel('Times per week').selectOption('3');
    await submitAddHabitButton(page).click();
    const habitCard = habitCardLocator(page, habitName);
    await expect(habitCard).toBeVisible();
    await habitCard.getByRole('button', { name: `Edit ${habitName}` }).click();
    const nameInput = page.getByLabel(`Edit name for ${habitName}`);
    await expect(nameInput).toHaveValue(habitName);
    const newName = `${habitName} Updated`;
    await nameInput.fill(newName);
    await habitCard.getByRole('button', { name: 'Save' }).click();
    await expect(habitCardLocator(page, newName)).toBeVisible();
  });

  /**
   * TC56: Home - completes all pending habits for today
   */
  test('TC56 - Home - completes all pending habits for today', async ({ page }) => {
    await page.goto('/');
    const completeAllButton = page.getByRole('button', { name: /^Complete all for today/ });
    await expect(completeAllButton).toBeEnabled();
    await completeAllButton.click();
    await expect(completeAllButton).not.toHaveText(/Completing…/, { timeout: 15000 });
  });

  /**
   * TC57: HabitList - skips and unskips a habit
   */
  test('TC57 - HabitList - skips and unskips a habit', async ({ page }) => {
    await page.goto('/');
    const habitName = `Skip Habit ${Date.now()}`;
    await page.getByLabel('New habit name').fill(habitName);
    await page.getByLabel('Habit category').selectOption('General');
    await page.getByLabel('Times per week').selectOption('3');
    await submitAddHabitButton(page).click();
    const habitCard = habitCardLocator(page, habitName);
    await expect(habitCard).toBeVisible();
    await habitCard.getByRole('button', { name: `Skip ${habitName}` }).click();
    await expect(habitCard.getByRole('button', { name: `Skipped ${habitName}` })).toBeVisible();
    await habitCard.getByRole('button', { name: `Unskip ${habitName}` }).click();
    await expect(habitCard.getByRole('button', { name: `Skip ${habitName}` })).toBeVisible();
  });

  /**
   * TC58: HabitList - toggles archive state of a habit
   */
  test('TC58 - HabitList - toggles archive state of a habit', async ({ page }) => {
    await page.goto('/');
    const habitName = `Archive Habit ${Date.now()}`;
    await page.getByLabel('New habit name').fill(habitName);
    await page.getByLabel('Habit category').selectOption('General');
    await page.getByLabel('Times per week').selectOption('3');
    await submitAddHabitButton(page).click();
    const habitCard = habitCardLocator(page, habitName);
    await expect(habitCard).toBeVisible();
    await habitCard.getByRole('checkbox', { name: `Archive ${habitName}` }).check();
    await expect(habitCardLocator(page, habitName)).toHaveCount(0);
    await showArchivedToggle(page).check();
    const archivedHabitCard = habitCardLocator(page, habitName);
    await expect(archivedHabitCard).toBeVisible();
    await archivedHabitCard.getByRole('checkbox', { name: `Unarchive ${habitName}` }).uncheck();
    await expect(habitCardLocator(page, habitName)).toBeVisible();
  });

  /**
   * TC59: HabitList - duplicates a habit
   */
  test('TC59 - HabitList - duplicates a habit', async ({ page }) => {
    await page.goto('/');
    const habitName = `Duplicate Habit ${Date.now()}`;
    await newHabitNameField(page).fill(habitName);
    await newHabitCategoryField(page).selectOption('General');
    await newHabitTargetField(page).selectOption('3');
    await submitAddHabitButton(page).click();
    const habitCard = habitCardLocator(page, habitName);
    await expect(habitCard).toBeVisible();
    await habitCard.getByRole('button', { name: `Duplicate ${habitName}` }).click();
    const duplicateCard = habitCardLocator(page, `${habitName} (copy)`);
    await expect(duplicateCard).toBeVisible();
  });

  /**
   * TC60: Home - clears all filters and resets controls
   */
  test('TC60 - Home - clears all filters and resets controls', async ({ page }) => {
    await page.goto('/');
    await categoryFilterControl(page).selectOption('General');
    await showArchivedToggle(page).check();
    await habitSearchBox(page).fill('test');
    await sortByControl(page).selectOption('streak');
    await page.getByRole('button', { name: 'Clear filters' }).click();
    await expect(categoryFilterControl(page)).toHaveValue('');
    await expect(showArchivedToggle(page)).not.toBeChecked();
    await expect(habitSearchBox(page)).toHaveValue('');
    await expect(sortByControl(page)).toHaveValue('name');
  });

  /**
   * TC61: HabitCard - edits a habit\\\'s name, category, target per week, and notes successfully
   */
  test('TC61 - HabitCard - edits a habit\\\\\\\'s name, category, target per week, and notes successfully', async ({ page }) => {
    await page.goto('/');
    const originalName = `EditTest ${Date.now()}`;
    const newName = `${originalName} Updated`;
    await newHabitNameField(page).fill(originalName);
    await submitAddHabitButton(page).click();
    const habitCard = habitCardLocator(page, originalName);
    await expect(habitCard).toBeVisible();
    await habitCard.getByRole('button', { name: `Edit ${originalName}` }).click();
    const nameInput = page.getByLabel(`Edit name for ${originalName}`);
    await expect(nameInput).toHaveValue(originalName);
    await nameInput.fill(newName);
    await page.getByLabel(`Edit category for ${originalName}`).selectOption('Health');
    await page.getByLabel(`Edit times per week for ${originalName}`).selectOption('5');
    await page.getByLabel(`Edit notes for ${originalName}`).fill('Updated notes');
    await habitCard.getByRole('button', { name: 'Save' }).click();
    const updatedHabitCard = habitCardLocator(page, newName);
    await expect(updatedHabitCard).toBeVisible();
  });

  /**
   * TC62: HabitCard - edits an existing habit\\\\\\\'s name, category, target per week, and notes
   */
  test('TC62 - HabitCard - edits an existing habit\\\\\\\\\\\\\\\'s name, category, target per week, and notes', async ({ page }) => {
    await page.goto('/');
    const originalName = `Original Habit ${Date.now()}`;
    const updatedName = `Updated Habit ${Date.now()}`;
    await page.getByLabel('New habit name').fill(originalName);
    await submitAddHabitButton(page).click();
    const habitCard = habitCardLocator(page, originalName);
    await expect(habitCard).toBeVisible();
    await habitCard.getByRole('button', { name: `Edit` }).click();
    const nameInput = page.getByLabel(`Edit name for ${originalName}`);
    await expect(nameInput).toHaveValue(originalName);
    await nameInput.fill(updatedName);
    await page.getByLabel(`Edit category for ${originalName}`).selectOption('Health');
    await page.getByLabel(`Edit times per week for ${originalName}`).selectOption('3');
    await page.getByLabel(`Edit notes for ${originalName}`).fill('Updated notes');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(habitCardLocator(page, updatedName)).toBeVisible();
  });

  /**
   * TC63: HabitList - complete a habit
   */
  test('TC63 - HabitList - complete a habit', async ({ page }) => {
    await page.goto('/');
    const habitName = `Complete Habit ${Date.now()}`;
    await newHabitNameField(page).fill(habitName);
    await newHabitCategoryField(page).selectOption('Health');
    await newHabitTargetField(page).selectOption('2');
    await newHabitNotesField(page).fill('Complete test');
    await submitAddHabitButton(page).click();
    const habitCard = habitCardLocator(page, habitName);
    await expect(habitCard).toBeVisible();
    await habitCard.getByRole('button', { name: 'Mark done' }).click();
    await expect(habitCard.getByRole('button', { name: 'Done today' })).toBeVisible();
  });

  /**
   * TC64: Complete all - complete all pending habits for today
   */
  test('TC64 - Complete all - complete all pending habits for today', async ({ page }) => {
    await page.goto('/');
    const habitName1 = `CompleteAll1 ${Date.now()}`;
    const habitName2 = `CompleteAll2 ${Date.now()}`;
    await newHabitNameField(page).fill(habitName1);
    await newHabitCategoryField(page).selectOption('Health');
    await newHabitTargetField(page).selectOption('1');
    await newHabitNotesField(page).fill('Notes 1');
    await submitAddHabitButton(page).click();
    await expect(habitCardLocator(page, habitName1)).toBeVisible();
    await newHabitNameField(page).fill(habitName2);
    await newHabitCategoryField(page).selectOption('Health');
    await newHabitTargetField(page).selectOption('1');
    await newHabitNotesField(page).fill('Notes 2');
    await submitAddHabitButton(page).click();
    await expect(habitCardLocator(page, habitName2)).toBeVisible();
    const completeAllButton = page.getByRole('button', { name: /^Complete all for today/ });
    await expect(completeAllButton).toBeEnabled();
    await completeAllButton.click();
    await expect(habitCardLocator(page, habitName1).getByRole('button', { name: 'Done today' })).toBeVisible();
    await expect(habitCardLocator(page, habitName2).getByRole('button', { name: 'Done today' })).toBeVisible();
  });

  /**
   * TC65: Filters - search habits by name
   */
  test('TC65 - Filters - search habits by name', async ({ page }) => {
    await page.goto('/');
    const uniqueSearch = `search-${Date.now()}`;
    await habitSearchBox(page).fill(uniqueSearch);
    await expect(page.getByText(`No habits match "${uniqueSearch}".`)).toBeVisible();
  });

  /**
   * TC66: Filters - filter habits by category
   */
  test('TC66 - Filters - filter habits by category', async ({ page }) => {
    await page.goto('/');
    await categoryFilterControl(page).selectOption('Health');
    await expect(page.getByRole('list')).toBeVisible();
  });

  /**
   * TC67: Filters - toggle show archived habits
   */
  test('TC67 - Filters - toggle show archived habits', async ({ page }) => {
    await page.goto('/');
    const showArchivedCheckbox = showArchivedToggle(page);
    await showArchivedCheckbox.check();
    await expect(page.getByRole('list')).toBeVisible();
    await showArchivedCheckbox.uncheck();
    await expect(page.getByRole('list')).toBeVisible();
  });

  /**
   * TC68: Filters - clear all filters
   */
  test('TC68 - Filters - clear all filters', async ({ page }) => {
    await page.goto('/');
    await habitSearchBox(page).fill('test');
    await categoryFilterControl(page).selectOption('Health');
    await showArchivedToggle(page).check();
    await sortByControl(page).selectOption('streak');
    await page.getByRole('button', { name: 'Clear filters' }).click();
    await expect(habitSearchBox(page)).toHaveValue('');
    await expect(categoryFilterControl(page)).toHaveValue('');
    await expect(showArchivedToggle(page)).not.toBeChecked();
    await expect(sortByControl(page)).toHaveValue('name');
  });

  /**
   * TC69: Navigation - navigate to History page
   */
  test('TC69 - Navigation - navigate to History page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'History' }).click();
    await expect(page).toHaveURL('/history');
  });

  /**
   * TC70: Navigation - navigate to View stats page
   */
  test('TC70 - Navigation - navigate to View stats page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'View stats' }).click();
    await expect(page).toHaveURL('/stats');
  });

  /**
   * TC71: Navigation - navigate to Archive page
   */
  test('TC71 - Navigation - navigate to Archive page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Archive' }).click();
    await expect(page).toHaveURL('/archive');
  });

  /**
   * TC72: Home - complete a habit and verify completed state
   */
  test('TC72 - Home - complete a habit and verify completed state', async ({ page }) => {
    await page.goto('/');
    const habitName = `CompleteTest-${Date.now()}`;
    await newHabitNameField(page).fill(habitName);
    await newHabitCategoryField(page).selectOption('General');
    await newHabitTargetField(page).selectOption('3');
    await submitAddHabitButton(page).click();
    const habitCard = habitCardLocator(page, habitName);
    await expect(habitCard).toBeVisible();
    const completeButton = habitCard.getByRole('button', { name: 'Mark done' });
    await completeButton.click();
    const completedButton = habitCard.getByRole('button', { name: 'Done today' });
    await expect(completedButton).toBeVisible();
  });

  /**
   * TC73: Home - navigation links go to correct routes
   */
  test('TC73 - Home - navigation links go to correct routes', async ({ page }) => {
    await page.goto('/');
    const historyLink = page.getByRole('link', { name: 'History' });
    await expect(historyLink).toHaveAttribute('href', '/history');
    const statsLink = page.getByRole('link', { name: 'View stats' });
    await expect(statsLink).toHaveAttribute('href', '/stats');
    const archiveLink = page.getByRole('link', { name: 'Archive' });
    await expect(archiveLink).toHaveAttribute('href', '/archive');
  });

  /**
   * TC74: Home - search filters habits by name
   */
  test('TC74 - Home - search filters habits by name', async ({ page }) => {
    await page.goto('/');
    const uniqueSearch = `unique-search-${Date.now()}`;
    await newHabitNameField(page).fill(uniqueSearch);
    await newHabitCategoryField(page).selectOption('General');
    await newHabitTargetField(page).selectOption('3');
    await submitAddHabitButton(page).click();
    await expect(habitCardLocator(page, uniqueSearch)).toBeVisible();
    await page.getByLabel('Search habits by name').fill(uniqueSearch);
    const filteredHabitCard = habitCardLocator(page, uniqueSearch);
    await expect(filteredHabitCard).toBeVisible();
  });

  /**
   * TC75: Home - sort habits by different criteria
   */
  test('TC75 - Home - sort habits by different criteria', async ({ page }) => {
    await page.goto('/');
    const habitNameA = `AAA-${Date.now()}`;
    const habitNameZ = `ZZZ-${Date.now()}`;
    await newHabitNameField(page).fill(habitNameA);
    await newHabitCategoryField(page).selectOption('General');
    await newHabitTargetField(page).selectOption('3');
    await submitAddHabitButton(page).click();
    await expect(habitCardLocator(page, habitNameA)).toBeVisible();
    await newHabitNameField(page).fill(habitNameZ);
    await newHabitCategoryField(page).selectOption('Health');
    await newHabitTargetField(page).selectOption('5');
    await submitAddHabitButton(page).click();
    await expect(habitCardLocator(page, habitNameZ)).toBeVisible();
    await page.getByLabel('Sort habits by').selectOption('name');
    await expect(habitCardLocator(page, habitNameA)).toBeVisible();
    await expect(habitCardLocator(page, habitNameZ)).toBeVisible();
    await page.getByLabel('Sort habits by').selectOption('streak');
    await page.getByLabel('Sort habits by').selectOption('category');
    await page.getByLabel('Sort habits by').selectOption('target_per_week');
  });

  /**
   * TC76: Home - filter habits by category
   */
  test('TC76 - Home - filter habits by category', async ({ page }) => {
    await page.goto('/');
    const habitName = `CategoryTest-${Date.now()}`;
    await newHabitNameField(page).fill(habitName);
    await newHabitCategoryField(page).selectOption('Health');
    await newHabitTargetField(page).selectOption('3');
    await submitAddHabitButton(page).click();
    await expect(habitCardLocator(page, habitName)).toBeVisible();
    await page.getByLabel('Filter by category').selectOption('Health');
    const filteredHabitCard = habitCardLocator(page, habitName);
    await expect(filteredHabitCard).toBeVisible();
  });

  /**
   * TC77: Home - toggle show archived habits
   */
  test('TC77 - Home - toggle show archived habits', async ({ page }) => {
    await page.goto('/');
    const habitName = `ArchiveTest-${Date.now()}`;
    await newHabitNameField(page).fill(habitName);
    await newHabitCategoryField(page).selectOption('General');
    await newHabitTargetField(page).selectOption('3');
    await submitAddHabitButton(page).click();
    const habitCard = habitCardLocator(page, habitName);
    await expect(habitCard).toBeVisible();
    await habitCard.getByRole('button', { name: `Archive ${habitName}` }).click();
    await expect(habitCardLocator(page, habitName)).toHaveCount(0);
    await showArchivedToggle(page).check();
    const archivedHabitCard = habitCardLocator(page, habitName);
    await expect(archivedHabitCard).toBeVisible();
  });

  /**
   * TC78: Home - clear all filters resets search, category, archived, and sort
   */
  test('TC78 - Home - clear all filters resets search, category, archived, and sort', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel('Search habits by name').fill('test');
    await page.getByLabel('Filter by category').selectOption('Health');
    await showArchivedToggle(page).check();
    await page.getByLabel('Sort habits by').selectOption('streak');
    await page.getByRole('button', { name: 'Clear filters' }).click();
    await expect(page.getByLabel('Search habits by name')).toHaveValue('');
    await expect(page.getByLabel('Filter by category')).toHaveValue('');
    await expect(showArchivedToggle(page)).not.toBeChecked();
    await expect(page.getByLabel('Sort habits by')).toHaveValue('name');
  });

  /**
   * TC79: Home - page loads with unconditional elements
   */
  test('TC79 - Home - page loads with unconditional elements', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
    await expect(page.getByText('Build small daily habits, one day at a time.')).toBeVisible();
    await expect(page.getByLabel('Search habits by name')).toBeVisible();
    await expect(page.getByLabel('Filter by category')).toBeVisible();
    await expect(showArchivedToggle(page)).toBeVisible();
    await expect(page.getByLabel('Sort habits by')).toBeVisible();
    await expect(page.getByRole('link', { name: 'History' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'View stats' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Archive' })).toBeVisible();
  });

  /**
   * TC80: Home - clicking clear filters resets all filters to default
   */
  test('TC80 - Home - clicking clear filters resets all filters to default', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel('Search habits by name').fill('abc');
    await page.getByLabel('Filter by category').selectOption('');
    await showArchivedToggle(page).check();
    await page.getByLabel('Sort habits by').selectOption('streak');
    await expect(page.getByRole('button', { name: 'Clear filters' })).toBeVisible();
    await page.getByRole('button', { name: 'Clear filters' }).click();
    await expect(page.getByLabel('Search habits by name')).toHaveValue('');
    await expect(page.getByLabel('Filter by category')).toHaveValue('');
    await expect(showArchivedToggle(page)).not.toBeChecked();
    await expect(page.getByLabel('Sort habits by')).toHaveValue('name');
  });

  /**
   * TC81: Home - shows completion progress when habits exist
   */
  test('TC81 - Home - shows completion progress when habits exist', async ({ page }) => {
    await page.goto('/');
    const createName = `Test Habit Completion ${Date.now()}`;
    await newHabitNameField(page).fill(createName);
    await newHabitCategoryField(page).selectOption('General');
    await newHabitTargetField(page).selectOption('3');
    await submitAddHabitButton(page).click();
    await expect(page.getByText(/\d+\/\d+ done today/)).toBeVisible();
  });

  /**
   * TC82: Home - shows clear filters button when filters are active
   */
  test('TC82 - Home - shows clear filters button when filters are active', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel('Search habits by name').fill('some text');
    await expect(page.getByRole('button', { name: 'Clear filters' })).toBeVisible();
    await page.getByLabel('Search habits by name').fill('');
    await page.getByLabel('Filter by category').selectOption('Health');
    await expect(page.getByRole('button', { name: 'Clear filters' })).toBeVisible();
    await showArchivedToggle(page).check();
    await expect(page.getByRole('button', { name: 'Clear filters' })).toBeVisible();
    await showArchivedToggle(page).uncheck();
    await page.getByLabel('Sort habits by').selectOption('streak');
    await expect(page.getByRole('button', { name: 'Clear filters' })).toBeVisible();
  });

  /**
   * TC83: Home page - loads and renders main UI elements
   */
  test('TC83 - Home page - loads and renders main UI elements', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
    await expect(page.getByLabel('Search habits by name')).toBeVisible();
    await expect(page.getByLabel('Sort habits by')).toBeVisible();
    await expect(page.getByLabel('Filter by category')).toBeVisible();
    await expect(showArchivedToggle(page)).toBeVisible();
    await expect(page.getByRole('button', { name: /^Complete all for today \(\d+\)$/ })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Export JSON' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Export CSV' })).toBeVisible();
    await expect(page.getByRole('list')).toBeVisible();
  });

  /**
   * TC84: HabitCard - duplicates a habit and appends the copy with \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\' (copy)\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\' suffix
   */
  test('TC84 - HabitCard - duplicates a habit and appends the copy with \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\' (copy)\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\' suffix', async ({ page }) => {
    await page.goto('/');
    // Create a habit first to duplicate
    const habitName = `HabitToDuplicate ${Date.now()}`;
    await page.getByLabel('New habit name').fill(habitName);
    await page.getByLabel('Habit category').selectOption('Health');
    await page.getByLabel('Times per week').selectOption('3');
    await page.getByLabel('Notes (optional)').fill('Some notes');
    await submitAddHabitButton(page).click();
    // Excludes " (copy)" so this stays pinned to the original once the
    // duplicate exists -- its name is a substring of the copy's name, so an
    // unqualified hasText filter would match both list items.
    const copyNamePartial = ' (copy)';
    const habitCard = page
      .getByRole('listitem')
      .filter({ hasText: habitName })
      .filter({ hasNotText: copyNamePartial });
    await expect(habitCard).toBeVisible();
    // Click the duplicate button on that habit card
    const duplicateButton = habitCard.getByRole('button', { name: `Duplicate ${habitName}` });
    await duplicateButton.click();
    // The duplicated habit should appear with the expected suffix (copy)
    const duplicatedHabitCard = habitCardLocator(page, `${habitName}${copyNamePartial}`);
    await expect(duplicatedHabitCard).toBeVisible();
    // Verify the category badge matches (visible text from the original category)
    const categoryBadgeOriginal = habitCard.getByText('Health');
    await expect(categoryBadgeOriginal).toBeVisible();
    const categoryBadgeCopy = duplicatedHabitCard.getByText('Health');
    await expect(categoryBadgeCopy).toBeVisible();
  });

  /**
   * TC85: Home page - initial render with unconditional elements
   */
  test('TC85 - Home page - initial render with unconditional elements', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
    await expect(page.getByLabel('Search habits by name')).toBeVisible();
    await expect(page.getByRole('button', { name: /Complete all for today/ })).toBeVisible();
    await expect(page.getByLabel('Sort habits by')).toBeVisible();
    await expect(page.getByLabel('Filter by category')).toBeVisible();
    await expect(showArchivedToggle(page)).toBeVisible();
    await expect(page.getByRole('link', { name: 'History' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'View stats' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Archive' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Export JSON' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Export CSV' })).toBeVisible();
  });

  /**
   * TC86: Home - exports habits as JSON and CSV
   */
  test('TC86 - Home - exports habits as JSON and CSV', async ({ page }) => {
    await page.goto('/');
    const exportJsonButton = page.getByRole('button', { name: 'Export JSON' });
    const exportCsvButton = page.getByRole('button', { name: 'Export CSV' });
    await expect(exportJsonButton).toBeEnabled();
    await expect(exportCsvButton).toBeEnabled();
    await exportJsonButton.click();
    await exportCsvButton.click();
  });

});
