import { test, expect } from '@playwright/test';

test.describe('Home', () => {
  test.setTimeout(60000);

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 1: Home page load
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC01: Home page - loads and renders base elements
   */
  test('TC01 - Home page - loads and renders base elements', async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Habit Tracker" })).toBeVisible();
    await expect(page.getByRole("link", { name: "History" })).toBeVisible();
    await expect(page.getByRole("link", { name: "View stats" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Archive" })).toBeVisible();
    await expect(page.getByLabel("Search habits by name")).toBeVisible();
    await expect(page.getByRole("combobox", { name: "Sort habits by" })).toBeVisible();
    await expect(page.getByRole("combobox", { name: "Filter by category" })).toBeVisible();
    await expect(page.getByLabel("Show archived")).toBeVisible();
    await expect(page.getByRole("button", { name: /Complete all for today/ })).toBeVisible();
    await expect(page.getByRole("button", { name: "Export JSON" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Export CSV" })).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 2: HabitCard - complete habit
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC02: HabitCard - mark habit as done today disables button
   */
  test('TC02 - HabitCard - mark habit as done today disables button', async ({ page }) => {
    await page.goto("/");
    const habitName = `CompleteHabit ${Date.now()}`;
    await page.getByLabel("New habit name").fill(habitName);
    await page.getByRole("button", { name: "Add habit" }).click();
    const card = page.getByRole("listitem").filter({ hasText: habitName });
    await expect(card.getByRole("button", { name: "Mark done" })).toBeVisible();
    await card.getByRole("button", { name: "Mark done" }).click();
    await expect(card.getByRole("button", { name: "Done today" })).toBeDisabled();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 3: HabitCard - toggle freeze
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC03: HabitCard - freeze and unfreeze habit for today
   */
  test('TC03 - HabitCard - freeze and unfreeze habit for today', async ({ page }) => {
    await page.goto("/");
    const habitName = `FreezeHabit ${Date.now()}`;
    await page.getByLabel("New habit name").fill(habitName);
    await page.getByRole("button", { name: "Add habit" }).click();
    const card = page.getByRole("listitem").filter({ hasText: habitName });
    await card.getByRole("button", { name: "🧊 Freeze" }).click();
    await expect(card.getByRole("button", { name: "Unfreeze" })).toBeVisible();
    await card.getByRole("button", { name: "Unfreeze" }).click();
    await expect(card.getByRole("button", { name: "🧊 Freeze" })).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 4: HabitCard - archive toggle
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC04: HabitCard - archive and unarchive habit from home page
   */
  test('TC04 - HabitCard - archive and unarchive habit from home page', async ({ page }) => {
    await page.goto("/");
    const habitName = `ArchiveHabit ${Date.now()}`;
    await page.getByLabel("New habit name").fill(habitName);
    await page.getByRole("button", { name: "Add habit" }).click();
    const card = page.getByRole("listitem").filter({ hasText: habitName });
    await card.getByRole("button", { name: `Archive ${habitName}` }).click();
    await expect(page.getByRole("listitem").filter({ hasText: habitName })).toHaveCount(0);
    await page.reload();
    await page.getByRole("link", { name: "Archive" }).click();
    const archivedCard = page.getByRole("listitem").filter({ hasText: habitName });
    await expect(archivedCard).toBeVisible();
    await archivedCard.getByRole("button", { name: `Unarchive ${habitName}` }).click();
    await expect(page.getByRole("listitem").filter({ hasText: habitName })).toHaveCount(0);
    await page.getByRole("link", { name: "History" }).click();
    await page.getByRole("link", { name: "Archive" }).click();
    await archivedCard.getByRole("button", { name: `Archive ${habitName}` }).click();
    await expect(archivedCard).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 5: Search - filtering
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC05: Home page - search filters habits by name
   */
  test('TC05 - Home page - search filters habits by name', async ({ page }) => {
    await page.goto("/");
    const uniqueName = `SearchHabit ${Date.now()}`;
    await page.getByLabel("New habit name").fill(uniqueName);
    await page.getByRole("button", { name: "Add habit" }).click();
    await page.getByLabel("habit-search").fill(uniqueName);
    const filtered = page.getByRole("listitem").filter({ hasText: uniqueName });
    await expect(filtered).toBeVisible();
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
   * TC11: Sort by dropdown - sorts habit list by name ascending
   */
  test('TC11 - Sort by dropdown - sorts habit list by name ascending', async ({ page }) => {
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
   * TC12: HabitForm - disables Add habit button when name is empty
   */
  test('TC12 - HabitForm - disables Add habit button when name is empty', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('textbox', { name: 'New habit name' }).fill('');
    await expect(page.getByRole('button', { name: 'Add habit' })).toBeDisabled();
  });

  /**
   * TC13: HabitForm - form validation disables Add habit button for empty name
   */
  test('TC13 - HabitForm - form validation disables Add habit button for empty name', async ({ page }) => {
    await page.goto("/");
    const input = page.getByRole("textbox", { name: "New habit name" });
    const addButton = page.getByRole("button", { name: "Add habit" });
    await input.fill("");
    await expect(addButton).toBeDisabled();
    await input.fill("   ");
    await expect(addButton).toBeDisabled();
  });

  /**
   * TC14: Page heading and static elements render
   */
  test('TC14 - Page heading and static elements render', async ({ page }) => {
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
   * TC15: HabitCard - marks habit done today disables button
   */
  test('TC15 - HabitCard - marks habit done today disables button', async ({ page }) => {
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
   * TC16: HabitCard inline edit form - opens and cancels edit mode
   */
  test('TC16 - HabitCard inline edit form - opens and cancels edit mode', async ({ page }) => {
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
   * TC17: Home page - initial render shows main heading, filter, show archived checkbox, export buttons disabled, and navigation link
   */
  test('TC17 - Home page - initial render shows main heading, filter, show archived checkbox, export buttons disabled, and navigation link', async ({ page }) => {
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
   * TC18: HabitCard - archive and unarchive a habit via its archive toggle button
   */
  test('TC18 - HabitCard - archive and unarchive a habit via its archive toggle button', async ({ page }) => {
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
   * TC19: Home - toggling show archived checkbox updates displayed habits accordingly
   */
  test('TC19 - Home - toggling show archived checkbox updates displayed habits accordingly', async ({ page }) => {
    await page.goto('/');
    const showArchivedCheckbox = page.getByLabel('Show archived');
    await showArchivedCheckbox.check();
    await expect(showArchivedCheckbox).toBeChecked();
    await showArchivedCheckbox.uncheck();
    await expect(showArchivedCheckbox).not.toBeChecked();
  });

  /**
   * TC20: Home - Export JSON and Export CSV buttons are disabled when no habits exist and enabled after habits are created
   */
  test('TC20 - Home - Export JSON and Export CSV buttons are disabled when no habits exist and enabled after habits are created', async ({ page }) => {
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
   * TC21: LogoutButton - logout button logs out and navigates to /login
   */
  test('TC21 - LogoutButton - logout button logs out and navigates to /login', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Logout' }).click();
    await expect(page).toHaveURL('/login');
  });

  /**
   * TC22: Home page - page loads and displays unconditional controls
   */
  test('TC22 - Home page - page loads and displays unconditional controls', async ({ page }) => {
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
   * TC23: HabitCard - mark habit done today disables button and changes label
   */
  test('TC23 - HabitCard - mark habit done today disables button and changes label', async ({ page }) => {
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
   * TC24: Home page - search filters habit list results
   */
  test('TC24 - Home page - search filters habit list results', async ({ page }) => {
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
   * TC25: Home page - Export JSON and CSV buttons visibility and disabled state
   */
  test('TC25 - Home page - Export JSON and CSV buttons visibility and disabled state', async ({ page }) => {
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
   * TC26: Home - page loads and renders core controls
   */
  test('TC26 - Home - page loads and renders core controls', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
    await expect(page.getByLabel('Search habits by name')).toBeVisible();
    await expect(page.getByLabel('Sort habits by')).toBeVisible();
    await expect(page.getByLabel('Filter by category')).toBeVisible();
    await expect(page.getByRole('checkbox', { name: 'Show archived' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add habit' })).toBeVisible();
  });

  /**
   * TC27: HabitCard - marks a habit as completed today
   */
  test('TC27 - HabitCard - marks a habit as completed today', async ({ page }) => {
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
   * TC28: HabitCard - toggles archive and unarchive of a habit
   */
  test('TC28 - HabitCard - toggles archive and unarchive of a habit', async ({ page }) => {
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
   * TC29: Home - searches for habits by name
   */
  test('TC29 - Home - searches for habits by name', async ({ page }) => {
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
   * TC30: Home - toggles show archived checkbox updates habits list
   */
  test('TC30 - Home - toggles show archived checkbox updates habits list', async ({ page }) => {
    await page.goto('/');
    const checkbox = page.getByRole('checkbox', { name: 'Show archived' });
    const initialCount = await page.getByRole('listitem').count();
    await checkbox.check();
    await expect(page.getByRole('list')).toBeVisible();
    await checkbox.uncheck();
    await expect(page.getByRole('list')).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 7: HabitCard - edit cancellation
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC31: HabitCard - cancel editing habit
   */
  test('TC31 - HabitCard - cancel editing habit', async ({ page }) => {
    await page.goto("/");
    const uniqueName = `HabitCancelEdit ${Date.now()}`;
    await page.getByLabel("New habit name").fill(uniqueName);
    await page.getByRole("button", { name: "Add habit" }).click();
    const card = page.getByRole("listitem").filter({ hasText: uniqueName });
    await expect(card).toBeVisible();
    await card.getByRole("button", { name: `Edit ${uniqueName}` }).click();
    await page.getByRole("button", { name: "Cancel", exact: true }).click();
    await expect(page.getByText(uniqueName)).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 8: Sorting - sort select
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC32: Home page - sort habits by name
   */
  test('TC32 - Home page - sort habits by name', async ({ page }) => {
    await page.goto("/");
    await page.getByRole("combobox", { name: "Sort habits by" }).selectOption("name");
    await expect(page.getByRole("combobox", { name: "Sort habits by" })).toHaveValue("name");
  });

});
