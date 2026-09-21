# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> Home >> TC32 - HabitForm - create a habit with notes successfully adds it to the list and enables export buttons
- Location: tests/home.spec.ts:575:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator:  getByRole('listitem').filter({ hasText: 'Test habit 1789981608265' }).getByText('Test note for habit')
Expected: visible
Received: hidden
Timeout:  10000ms

Call log:
  - Expect "toBeVisible" getByRole('listitem').filter({ hasText: 'Test habit 1789981608265' }).getByText('Test note for habit') with timeout 10000ms
  - waiting for getByRole('listitem').filter({ hasText: 'Test habit 1789981608265' }).getByText('Test note for habit')
    24 × locator resolved to <p class="mt-1 text-xs text-zinc-500 italic">Test note for habit</p>
       - unexpected value "hidden"

```

```yaml
- main:
  - heading "Habit Tracker" [level=1]
  - paragraph: Build small daily habits, one day at a time.
  - paragraph: Monday, September 21
  - paragraph: 0/3 done today
  - link "History":
    - /url: /history
  - link "View stats":
    - /url: /stats
  - link "Archive":
    - /url: /archive
  - button "Switch to dark mode": 🌙 Dark
  - button "Logout"
  - textbox "New habit name":
    - /placeholder: e.g. Drink more water
  - combobox "Habit category":
    - option "General"
    - option "Health" [selected]
    - option "Work"
    - option "Personal"
    - option "Learning"
  - combobox "Times per week":
    - option "1x / week"
    - option "2x / week"
    - option "3x / week" [selected]
    - option "4x / week"
    - option "5x / week"
    - option "6x / week"
    - option "7x / week"
  - textbox "Notes (optional)"
  - button "Add habit" [disabled]
  - text: Search habits by name
  - searchbox "Search habits by name"
  - text: Sort by
  - combobox "Sort habits by":
    - option "Name (A-Z)" [selected]
    - option "Streak (highest first)"
    - option "Category"
    - option "Weekly target (highest first)"
  - text: Filter by category
  - combobox "Filter by category":
    - option "All" [selected]
    - option "General"
    - option "Health"
    - option "Work"
    - option "Personal"
    - option "Learning"
  - checkbox "Show archived"
  - text: Show archived
  - button "Complete all for today (3)"
  - button "Export JSON"
  - button "Export CSV"
  - list:
    - listitem:
      - paragraph: CompleteTest-1789981532563
      - text: General
      - paragraph: Start your streak today!
      - progressbar "CompleteTest-1789981532563 weekly progress"
      - text: 0/3 this week
      - button "Mark done"
      - button "Freeze CompleteTest-1789981532563 for today": 🧊 Freeze
      - button "Edit CompleteTest-1789981532563": Edit
      - button "Duplicate CompleteTest-1789981532563": Duplicate
      - button "Archive CompleteTest-1789981532563": Archive
      - button "Delete CompleteTest-1789981532563": Remove
    - listitem:
      - paragraph: Test habit 1789981595980
      - text: Health
      - paragraph: Start your streak today!
      - progressbar "Test habit 1789981595980 weekly progress"
      - text: 0/3 this week
      - paragraph: Test note for habit
      - button "Mark done"
      - button "Freeze Test habit 1789981595980 for today": 🧊 Freeze
      - button "Edit Test habit 1789981595980": Edit
      - button "Duplicate Test habit 1789981595980": Duplicate
      - button "Archive Test habit 1789981595980": Archive
      - button "Delete Test habit 1789981595980": Remove
    - listitem:
      - paragraph: Test habit 1789981608265
      - text: Health
      - paragraph: Start your streak today!
      - progressbar "Test habit 1789981608265 weekly progress"
      - text: 0/3 this week
      - paragraph: Test note for habit
      - button "Mark done"
      - button "Freeze Test habit 1789981608265 for today": 🧊 Freeze
      - button "Edit Test habit 1789981608265": Edit
      - button "Duplicate Test habit 1789981608265": Duplicate
      - button "Archive Test habit 1789981608265": Archive
      - button "Delete Test habit 1789981608265": Remove
- alert
```

# Test source

```ts
  486 |    * TC27: Category filter - allows filtering habits
  487 |    */
  488 |   test('TC27 - Category filter - allows filtering habits', async ({ page }) => {
  489 |     await page.goto("/");
  490 |     await page.getByRole("combobox", { name: "Filter by category" }).selectOption("Health");
  491 |     await expect(page.getByLabel("Filter by category")).toHaveValue("Health");
  492 |   });
  493 | 
  494 |   /**
  495 |    * TC28: HabitCard - marks habit done today disables button
  496 |    */
  497 |   test('TC28 - HabitCard - marks habit done today disables button', async ({ page }) => {
  498 |     await page.goto('/');
  499 |     const habitName = `Daily completion habit ${Date.now()}`;
  500 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
  501 |     await page.getByRole('button', { name: 'Add habit' }).click();
  502 |     const card = page.getByRole('listitem').filter({ hasText: habitName });
  503 |     const markDoneButton = card.getByRole('button', { name: 'Mark done', exact: true });
  504 |     await markDoneButton.click();
  505 |     await expect(card.getByRole('button', { name: 'Done today', exact: true })).toBeVisible();
  506 |     await expect(card.getByRole('button', { name: 'Done today', exact: true })).toBeDisabled();
  507 |   });
  508 | 
  509 |   /**
  510 |    * TC29: HabitCard inline edit form - opens and cancels edit mode
  511 |    */
  512 |   test('TC29 - HabitCard inline edit form - opens and cancels edit mode', async ({ page }) => {
  513 |     await page.goto("/");
  514 |     const habitName = `Editable habit ${Date.now()}`;
  515 |     await page.getByRole("textbox", { name: "New habit name" }).fill(habitName);
  516 |     await page.getByRole("button", { name: "Add habit" }).click();
  517 |     const card = page.getByRole("listitem").filter({ hasText: habitName });
  518 |     await card.getByRole("button", { name: `Edit ${habitName}` }).click();
  519 |     const nameInput = page.getByLabel(`Edit name for ${habitName}`);
  520 |     await expect(nameInput).toBeVisible();
  521 |     await page.getByRole("button", { name: "Cancel", exact: true }).click();
  522 |     await expect(card.getByRole("button", { name: `Edit ${habitName}` })).toBeVisible();
  523 |   });
  524 | 
  525 |   /**
  526 |    * TC30: HabitCard inline edit form - saves edited habit and closes form
  527 |    */
  528 |   test('TC30 - HabitCard inline edit form - saves edited habit and closes form', async ({ page }) => {
  529 |     await page.goto("/");
  530 |     const habitName = `Editable habit save ${Date.now()}`;
  531 |     await page.getByRole("textbox", { name: "New habit name" }).fill(habitName);
  532 |     await page.getByRole("button", { name: "Add habit" }).click();
  533 |     const card = page.getByRole("listitem").filter({ hasText: habitName });
  534 |     await card.getByRole("button", { name: `Edit ${habitName}` }).click();
  535 |     const nameInput = page.getByLabel(`Edit name for ${habitName}`);
  536 |     await expect(nameInput).toHaveValue(habitName);
  537 |     const updatedName = `${habitName} updated`;
  538 |     await nameInput.fill(updatedName);
  539 |     const categorySelect = page.getByLabel(`Edit category for ${habitName}`);
  540 |     await categorySelect.selectOption("General");
  541 |     const timesSelect = page.getByLabel(`Edit times per week for ${habitName}`);
  542 |     await timesSelect.selectOption("3");
  543 |     await page.getByRole("button", { name: "Save", exact: true }).click();
  544 |     await expect(page.getByRole("listitem").filter({ hasText: updatedName })).toBeVisible();
  545 |     await expect(page.getByLabel(`Edit name for ${habitName}`)).toHaveCount(0);
  546 |   });
  547 | 
  548 |   /**
  549 |    * TC31: Home page - initial render shows main heading, filter, show archived checkbox, export buttons disabled, and navigation link
  550 |    */
  551 |   test('TC31 - Home page - initial render shows main heading, filter, show archived checkbox, export buttons disabled, and navigation link', async ({ page }) => {
  552 |     await page.goto('/');
  553 |     await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
  554 |     const categoryFilter = page.getByLabel('Filter by category');
  555 |     await expect(categoryFilter).toBeVisible();
  556 |     const allOption = categoryFilter.locator('option[value=""]');
  557 |     await expect(allOption).toHaveCount(1);
  558 |     await expect(categoryFilter).toHaveValue('');
  559 |     const showArchivedCheckbox = page.getByLabel('Show archived');
  560 |     await expect(showArchivedCheckbox).toBeVisible();
  561 |     await expect(showArchivedCheckbox).not.toBeChecked();
  562 |     const exportJsonButton = page.getByRole('button', { name: 'Export JSON' });
  563 |     await expect(exportJsonButton).toBeVisible();
  564 |     await expect(exportJsonButton).toBeDisabled();
  565 |     const exportCsvButton = page.getByRole('button', { name: 'Export CSV' });
  566 |     await expect(exportCsvButton).toBeVisible();
  567 |     await expect(exportCsvButton).toBeDisabled();
  568 |     const statsLink = page.getByRole('link', { name: 'View stats' });
  569 |     await expect(statsLink).toBeVisible();
  570 |   });
  571 | 
  572 |   /**
  573 |    * TC32: HabitForm - create a habit with notes successfully adds it to the list and enables export buttons
  574 |    */
  575 |   test('TC32 - HabitForm - create a habit with notes successfully adds it to the list and enables export buttons', async ({ page }) => {
  576 |     await page.goto('/');
  577 |     const habitName = `Test habit ${Date.now()}`;
  578 |     const habitNotes = 'Test note for habit';
  579 |     await page.getByLabel('New habit name').fill(habitName);
  580 |     await page.getByLabel('Habit category').selectOption('Health');
  581 |     await page.getByLabel('Times per week').selectOption('3');
  582 |     await page.getByLabel('Notes (optional)').fill(habitNotes);
  583 |     await page.getByRole('button', { name: 'Add habit' }).click();
  584 |     const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
  585 |     await expect(habitCard).toBeVisible();
> 586 |     await expect(habitCard.getByText(habitNotes)).toBeVisible();
      |                                                   ^ Error: expect(locator).toBeVisible() failed
  587 |     const exportJsonButton = page.getByRole('button', { name: 'Export JSON' });
  588 |     await expect(exportJsonButton).toBeEnabled();
  589 |     const exportCsvButton = page.getByRole('button', { name: 'Export CSV' });
  590 |     await expect(exportCsvButton).toBeEnabled();
  591 |   });
  592 | 
  593 |   /**
  594 |    * TC33: HabitCard - edit habit updates name, category, target per week, and notes
  595 |    */
  596 |   test('TC33 - HabitCard - edit habit updates name, category, target per week, and notes', async ({ page }) => {
  597 |     await page.goto('/');
  598 |     const originalName = `Edit habit ${Date.now()}`;
  599 |     const updatedName = `Updated habit ${Date.now()}`;
  600 |     const updatedNotes = 'Updated notes';
  601 |     await page.getByLabel('New habit name').fill(originalName);
  602 |     await page.getByLabel('Habit category').selectOption('Work');
  603 |     await page.getByLabel('Times per week').selectOption('2');
  604 |     await page.getByLabel('Notes (optional)').fill('Initial notes');
  605 |     await page.getByRole('button', { name: 'Add habit' }).click();
  606 |     const habitCard = page.getByRole('listitem').filter({ hasText: originalName });
  607 |     await expect(habitCard).toBeVisible();
  608 |     await habitCard.getByRole('button', { name: `Edit ${originalName}` }).click();
  609 |     const nameInput = page.getByLabel(`Edit name for ${originalName}`);
  610 |     await expect(nameInput).toHaveValue(originalName);
  611 |     const notesInput = page.getByLabel(`Edit notes for ${originalName}`);
  612 |     await expect(notesInput).toHaveValue('Initial notes');
  613 |     await nameInput.fill(updatedName);
  614 |     await page.getByLabel(`Edit category for ${originalName}`).selectOption('Personal');
  615 |     await page.getByLabel(`Edit times per week for ${originalName}`).selectOption('5');
  616 |     await notesInput.fill(updatedNotes);
  617 |     await page.getByRole('button', { name: 'Save', exact: true }).click();
  618 |     const updatedHabitCard = page.getByRole('listitem').filter({ hasText: updatedName });
  619 |     await expect(updatedHabitCard).toBeVisible();
  620 |     await expect(updatedHabitCard.getByText(updatedNotes)).toBeVisible();
  621 |   });
  622 | 
  623 |   /**
  624 |    * TC34: HabitCard - archive and unarchive a habit via its archive toggle button
  625 |    */
  626 |   test('TC34 - HabitCard - archive and unarchive a habit via its archive toggle button', async ({ page }) => {
  627 |     await page.goto('/');
  628 |     const habitName = `Archive habit ${Date.now()}`;
  629 |     await page.getByLabel('New habit name').fill(habitName);
  630 |     await page.getByRole('button', { name: 'Add habit' }).click();
  631 |     const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
  632 |     await expect(habitCard).toBeVisible();
  633 |     const archiveButton = habitCard.getByRole('button', { name: `Archive ${habitName}` });
  634 |     await archiveButton.click();
  635 |     await expect(page.getByRole('listitem').filter({ hasText: habitName })).toHaveCount(0);
  636 |     await page.getByLabel('Show archived').check();
  637 |     const archivedHabitCard = page.getByRole('listitem').filter({ hasText: habitName });
  638 |     await expect(archivedHabitCard).toBeVisible();
  639 |     const unarchiveButton = archivedHabitCard.getByRole('button', { name: `Unarchive ${habitName}` });
  640 |     await unarchiveButton.click();
  641 |     await expect(page.getByRole('listitem').filter({ hasText: habitName })).toHaveCount(1);
  642 |   });
  643 | 
  644 |   /**
  645 |    * TC35: HabitCard - mark habit as done disables mark done button
  646 |    */
  647 |   test('TC35 - HabitCard - mark habit as done disables mark done button', async ({ page }) => {
  648 |     await page.goto('/');
  649 |     const habitName = `Complete habit ${Date.now()}`;
  650 |     await page.getByLabel('New habit name').fill(habitName);
  651 |     await page.getByLabel('Habit category').selectOption('General');
  652 |     await page.getByLabel('Times per week').selectOption('7');
  653 |     await page.getByRole('button', { name: 'Add habit' }).click();
  654 |     const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
  655 |     const markDoneButton = habitCard.getByRole('button', { name: 'Mark done', exact: true });
  656 |     await markDoneButton.click();
  657 |     await expect(habitCard.getByRole('button', { name: 'Done today', exact: true })).toBeDisabled();
  658 |   });
  659 | 
  660 |   /**
  661 |    * TC36: Home - filter habits list by category changes displayed habits accordingly
  662 |    */
  663 |   test('TC36 - Home - filter habits list by category changes displayed habits accordingly', async ({ page }) => {
  664 |     await page.goto('/');
  665 |     const categoryFilter = page.getByLabel('Filter by category');
  666 |     await categoryFilter.selectOption('Health');
  667 |     await expect(categoryFilter).toHaveValue('Health');
  668 |   });
  669 | 
  670 |   /**
  671 |    * TC37: Home - toggling show archived checkbox updates displayed habits accordingly
  672 |    */
  673 |   test('TC37 - Home - toggling show archived checkbox updates displayed habits accordingly', async ({ page }) => {
  674 |     await page.goto('/');
  675 |     const showArchivedCheckbox = page.getByLabel('Show archived');
  676 |     await showArchivedCheckbox.check();
  677 |     await expect(showArchivedCheckbox).toBeChecked();
  678 |     await showArchivedCheckbox.uncheck();
  679 |     await expect(showArchivedCheckbox).not.toBeChecked();
  680 |   });
  681 | 
  682 |   /**
  683 |    * TC38: Home - Export JSON and Export CSV buttons are disabled when no habits exist and enabled after habits are created
  684 |    */
  685 |   test('TC38 - Home - Export JSON and Export CSV buttons are disabled when no habits exist and enabled after habits are created', async ({ page }) => {
  686 |     await page.goto('/');
```