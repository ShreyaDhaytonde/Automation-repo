# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> Home >> TC34 - HabitForm - create a habit with notes successfully adds it to the list and enables export buttons
- Location: tests/home.spec.ts:597:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('listitem').filter({ hasText: 'Test habit 1790050620075' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('listitem').filter({ hasText: 'Test habit 1790050620075' }) with timeout 10000ms
  - waiting for getByRole('listitem').filter({ hasText: 'Test habit 1790050620075' })

```

```yaml
- main:
  - heading "Habit Tracker" [level=1]
  - paragraph: Build small daily habits, one day at a time.
  - paragraph: Tuesday, September 22
  - paragraph: 2/14 done today
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
  - button "Complete all for today (12)"
  - button "Export JSON"
  - button "Export CSV"
  - list:
    - listitem:
      - paragraph: Cancel edit habit 1790050275464
      - text: General
      - paragraph: Start your streak today!
      - progressbar "Cancel edit habit 1790050275464 weekly progress"
      - text: 0/3 this week
      - button "Mark done"
      - button "Freeze Cancel edit habit 1790050275464 for today": 🧊 Freeze
      - button "Edit Cancel edit habit 1790050275464": Edit
      - button "Duplicate Cancel edit habit 1790050275464": Duplicate
      - button "Archive Cancel edit habit 1790050275464": Archive
      - button "Delete Cancel edit habit 1790050275464": Remove
    - listitem:
      - paragraph: CategoryTest 1790050258802
      - text: Health
      - status "CategoryTest 1790050258802 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "CategoryTest 1790050258802 weekly progress"
      - text: 0/7 this week
      - button "Mark done"
      - button "Freeze CategoryTest 1790050258802 for today": 🧊 Freeze
      - button "Edit CategoryTest 1790050258802": Edit
      - button "Duplicate CategoryTest 1790050258802": Duplicate
      - button "Archive CategoryTest 1790050258802": Archive
      - button "Delete CategoryTest 1790050258802": Remove
    - listitem:
      - paragraph: CompleteTest 1790050197728
      - text: General
      - paragraph: 🔥 1 day streak
      - progressbar "CompleteTest 1790050197728 weekly progress"
      - text: 1/7 this week
      - button "Done today" [disabled]
      - button "Freeze CompleteTest 1790050197728 for today" [disabled]: 🧊 Freeze
      - button "Edit CompleteTest 1790050197728": Edit
      - button "Duplicate CompleteTest 1790050197728": Duplicate
      - button "Archive CompleteTest 1790050197728": Archive
      - button "Delete CompleteTest 1790050197728": Remove
    - listitem:
      - paragraph: Daily completion habit 1790050354927
      - text: General
      - paragraph: 🔥 1 day streak
      - progressbar "Daily completion habit 1790050354927 weekly progress"
      - text: 1/7 this week
      - button "Done today" [disabled]
      - button "Freeze Daily completion habit 1790050354927 for today" [disabled]: 🧊 Freeze
      - button "Edit Daily completion habit 1790050354927": Edit
      - button "Duplicate Daily completion habit 1790050354927": Duplicate
      - button "Archive Daily completion habit 1790050354927": Archive
      - button "Delete Daily completion habit 1790050354927": Remove
    - listitem:
      - paragraph: Edit habit 1790050273723 updated
      - text: Health
      - paragraph: Start your streak today!
      - progressbar "Edit habit 1790050273723 updated weekly progress"
      - text: 0/5 this week
      - button "Mark done"
      - button "Freeze Edit habit 1790050273723 updated for today": 🧊 Freeze
      - button "Edit Edit habit 1790050273723 updated": Edit
      - button "Duplicate Edit habit 1790050273723 updated": Duplicate
      - button "Archive Edit habit 1790050273723 updated": Archive
      - button "Delete Edit habit 1790050273723 updated": Remove
    - listitem:
      - paragraph: Edit validation habit 1790050277005
      - text: General
      - paragraph: Start your streak today!
      - progressbar "Edit validation habit 1790050277005 weekly progress"
      - text: 0/3 this week
      - button "Mark done"
      - button "Freeze Edit validation habit 1790050277005 for today": 🧊 Freeze
      - button "Edit Edit validation habit 1790050277005": Edit
      - button "Duplicate Edit validation habit 1790050277005": Duplicate
      - button "Archive Edit validation habit 1790050277005": Archive
      - button "Delete Edit validation habit 1790050277005": Remove
    - listitem:
      - paragraph: Editable habit 1790050356006
      - text: General
      - status "Editable habit 1790050356006 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "Editable habit 1790050356006 weekly progress"
      - text: 0/7 this week
      - button "Mark done"
      - button "Freeze Editable habit 1790050356006 for today": 🧊 Freeze
      - button "Edit Editable habit 1790050356006": Edit
      - button "Duplicate Editable habit 1790050356006": Duplicate
      - button "Archive Editable habit 1790050356006": Archive
      - button "Delete Editable habit 1790050356006": Remove
    - listitem:
      - paragraph: Editable habit save 1790050481686
      - text: General
      - status "Editable habit save 1790050481686 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "Editable habit save 1790050481686 weekly progress"
      - text: 0/7 this week
      - button "Mark done"
      - button "Freeze Editable habit save 1790050481686 for today": 🧊 Freeze
      - button "Edit Editable habit save 1790050481686": Edit
      - button "Duplicate Editable habit save 1790050481686": Duplicate
      - button "Archive Editable habit save 1790050481686": Archive
      - button "Delete Editable habit save 1790050481686": Remove
    - listitem:
      - paragraph: Editable habit save 1790050544646
      - text: General
      - status "Editable habit save 1790050544646 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "Editable habit save 1790050544646 weekly progress"
      - text: 0/7 this week
      - button "Mark done"
      - button "Freeze Editable habit save 1790050544646 for today": 🧊 Freeze
      - button "Edit Editable habit save 1790050544646": Edit
      - button "Duplicate Editable habit save 1790050544646": Duplicate
      - button "Archive Editable habit save 1790050544646": Archive
      - button "Delete Editable habit save 1790050544646": Remove
    - listitem:
      - paragraph: Habit 1790050063142
      - text: General
      - status "Habit 1790050063142 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "Habit 1790050063142 weekly progress"
      - text: 0/7 this week
      - paragraph: Test notes
      - button "Mark done"
      - button "Freeze Habit 1790050063142 for today": 🧊 Freeze
      - button "Edit Habit 1790050063142": Edit
      - button "Duplicate Habit 1790050063142": Duplicate
      - button "Archive Habit 1790050063142": Archive
      - button "Delete Habit 1790050063142": Remove
    - listitem:
      - paragraph: SearchTest 1790050245624
      - text: General
      - status "SearchTest 1790050245624 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "SearchTest 1790050245624 weekly progress"
      - text: 0/7 this week
      - button "Mark done"
      - button "Freeze SearchTest 1790050245624 for today": 🧊 Freeze
      - button "Edit SearchTest 1790050245624": Edit
      - button "Duplicate SearchTest 1790050245624": Duplicate
      - button "Archive SearchTest 1790050245624": Archive
      - button "Delete SearchTest 1790050245624": Remove
    - listitem:
      - paragraph: SortA 1790050271466
      - text: General
      - status "SortA 1790050271466 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "SortA 1790050271466 weekly progress"
      - text: 0/7 this week
      - button "Mark done"
      - button "Freeze SortA 1790050271466 for today": 🧊 Freeze
      - button "Edit SortA 1790050271466": Edit
      - button "Duplicate SortA 1790050271466": Duplicate
      - button "Archive SortA 1790050271466": Archive
      - button "Delete SortA 1790050271466": Remove
    - listitem:
      - paragraph: SortB 1790050271467
      - text: General
      - status "SortB 1790050271467 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "SortB 1790050271467 weekly progress"
      - text: 0/7 this week
      - button "Mark done"
      - button "Freeze SortB 1790050271467 for today": 🧊 Freeze
      - button "Edit SortB 1790050271467": Edit
      - button "Duplicate SortB 1790050271467": Duplicate
      - button "Archive SortB 1790050271467": Archive
      - button "Delete SortB 1790050271467": Remove
    - listitem:
      - paragraph: Test habit create 1790050278680
      - text: General
      - status "Test habit create 1790050278680 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "Test habit create 1790050278680 weekly progress"
      - text: 0/7 this week
      - button "Mark done"
      - button "Freeze Test habit create 1790050278680 for today": 🧊 Freeze
      - button "Edit Test habit create 1790050278680": Edit
      - button "Duplicate Test habit create 1790050278680": Duplicate
      - button "Archive Test habit create 1790050278680": Archive
      - button "Delete Test habit create 1790050278680": Remove
- alert
```

# Test source

```ts
  507 |   /**
  508 |    * TC29: Category filter - allows filtering habits
  509 |    */
  510 |   test('TC29 - Category filter - allows filtering habits', async ({ page }) => {
  511 |     await page.goto("/");
  512 |     await page.getByRole("combobox", { name: "Filter by category" }).selectOption("Health");
  513 |     await expect(page.getByLabel("Filter by category")).toHaveValue("Health");
  514 |   });
  515 | 
  516 |   /**
  517 |    * TC30: HabitCard - marks habit done today disables button
  518 |    */
  519 |   test('TC30 - HabitCard - marks habit done today disables button', async ({ page }) => {
  520 |     await page.goto('/');
  521 |     const habitName = `Daily completion habit ${Date.now()}`;
  522 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
  523 |     await page.getByRole('button', { name: 'Add habit' }).click();
  524 |     const card = page.getByRole('listitem').filter({ hasText: habitName });
  525 |     const markDoneButton = card.getByRole('button', { name: 'Mark done', exact: true });
  526 |     await markDoneButton.click();
  527 |     await expect(card.getByRole('button', { name: 'Done today', exact: true })).toBeVisible();
  528 |     await expect(card.getByRole('button', { name: 'Done today', exact: true })).toBeDisabled();
  529 |   });
  530 | 
  531 |   /**
  532 |    * TC31: HabitCard inline edit form - opens and cancels edit mode
  533 |    */
  534 |   test('TC31 - HabitCard inline edit form - opens and cancels edit mode', async ({ page }) => {
  535 |     await page.goto("/");
  536 |     const habitName = `Editable habit ${Date.now()}`;
  537 |     await page.getByRole("textbox", { name: "New habit name" }).fill(habitName);
  538 |     await page.getByRole("button", { name: "Add habit" }).click();
  539 |     const card = page.getByRole("listitem").filter({ hasText: habitName });
  540 |     await card.getByRole("button", { name: `Edit ${habitName}` }).click();
  541 |     const nameInput = page.getByLabel(`Edit name for ${habitName}`);
  542 |     await expect(nameInput).toBeVisible();
  543 |     await page.getByRole("button", { name: "Cancel", exact: true }).click();
  544 |     await expect(card.getByRole("button", { name: `Edit ${habitName}` })).toBeVisible();
  545 |   });
  546 | 
  547 |   /**
  548 |    * TC32: HabitCard inline edit form - saves edited habit and closes form
  549 |    */
  550 |   test('TC32 - HabitCard inline edit form - saves edited habit and closes form', async ({ page }) => {
  551 |     await page.goto("/");
  552 |     const habitName = `Editable habit save ${Date.now()}`;
  553 |     await page.getByRole("textbox", { name: "New habit name" }).fill(habitName);
  554 |     await page.getByRole("button", { name: "Add habit" }).click();
  555 |     const card = page.getByRole("listitem").filter({ hasText: habitName });
  556 |     await card.getByRole("button", { name: `Edit ${habitName}` }).click();
  557 |     const nameInput = page.getByLabel(`Edit name for ${habitName}`);
  558 |     await expect(nameInput).toHaveValue(habitName);
  559 |     const updatedName = `${habitName} updated`;
  560 |     await nameInput.fill(updatedName);
  561 |     const categorySelect = page.getByLabel(`Edit category for ${habitName}`);
  562 |     await categorySelect.selectOption("General");
  563 |     const timesSelect = page.getByLabel(`Edit times per week for ${habitName}`);
  564 |     await timesSelect.selectOption("3");
  565 |     await page.getByRole("button", { name: "Save", exact: true }).click();
  566 |     await expect(page.getByRole("listitem").filter({ hasText: updatedName })).toBeVisible();
  567 |     await expect(page.getByLabel(`Edit name for ${habitName}`)).toHaveCount(0);
  568 |   });
  569 | 
  570 |   /**
  571 |    * TC33: Home page - initial render shows main heading, filter, show archived checkbox, export buttons disabled, and navigation link
  572 |    */
  573 |   test('TC33 - Home page - initial render shows main heading, filter, show archived checkbox, export buttons disabled, and navigation link', async ({ page }) => {
  574 |     await page.goto('/');
  575 |     await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
  576 |     const categoryFilter = page.getByLabel('Filter by category');
  577 |     await expect(categoryFilter).toBeVisible();
  578 |     const allOption = categoryFilter.locator('option[value=""]');
  579 |     await expect(allOption).toHaveCount(1);
  580 |     await expect(categoryFilter).toHaveValue('');
  581 |     const showArchivedCheckbox = page.getByLabel('Show archived');
  582 |     await expect(showArchivedCheckbox).toBeVisible();
  583 |     await expect(showArchivedCheckbox).not.toBeChecked();
  584 |     const exportJsonButton = page.getByRole('button', { name: 'Export JSON' });
  585 |     await expect(exportJsonButton).toBeVisible();
  586 |     await expect(exportJsonButton).toBeDisabled();
  587 |     const exportCsvButton = page.getByRole('button', { name: 'Export CSV' });
  588 |     await expect(exportCsvButton).toBeVisible();
  589 |     await expect(exportCsvButton).toBeDisabled();
  590 |     const statsLink = page.getByRole('link', { name: 'View stats' });
  591 |     await expect(statsLink).toBeVisible();
  592 |   });
  593 | 
  594 |   /**
  595 |    * TC34: HabitForm - create a habit with notes successfully adds it to the list and enables export buttons
  596 |    */
  597 |   test('TC34 - HabitForm - create a habit with notes successfully adds it to the list and enables export buttons', async ({ page }) => {
  598 |     await page.goto('/');
  599 |     const habitName = `Test habit ${Date.now()}`;
  600 |     const habitNotes = 'Test note for habit';
  601 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
  602 |     await page.getByRole('combobox', { name: 'Habit category' }).selectOption('Health');
  603 |     await page.getByRole('combobox', { name: 'Times per week' }).selectOption('3');
  604 |     await page.getByRole('textbox', { name: 'Notes (optional)' }).fill(habitNotes);
  605 |     await page.getByRole('button', { name: 'Add habit' }).click();
  606 |     const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
> 607 |     await expect(habitCard).toBeVisible();
      |                             ^ Error: expect(locator).toBeVisible() failed
  608 |     await expect(habitCard.getByText(habitNotes)).toBeVisible();
  609 |     const exportJsonButton = page.getByRole('button', { name: 'Export JSON' });
  610 |     await expect(exportJsonButton).toBeEnabled();
  611 |     const exportCsvButton = page.getByRole('button', { name: 'Export CSV' });
  612 |     await expect(exportCsvButton).toBeEnabled();
  613 |   });
  614 | 
  615 |   /**
  616 |    * TC35: HabitCard - edit habit updates name, category, target per week, and notes
  617 |    */
  618 |   test('TC35 - HabitCard - edit habit updates name, category, target per week, and notes', async ({ page }) => {
  619 |     await page.goto('/');
  620 |     const originalName = `Edit habit ${Date.now()}`;
  621 |     const updatedName = `Updated habit ${Date.now()}`;
  622 |     const updatedNotes = 'Updated notes';
  623 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(originalName);
  624 |     await page.getByRole('combobox', { name: 'Habit category' }).selectOption('Work');
  625 |     await page.getByRole('combobox', { name: 'Times per week' }).selectOption('2');
  626 |     await page.getByRole('textbox', { name: 'Notes (optional)' }).fill('Initial notes');
  627 |     await page.getByRole('button', { name: 'Add habit' }).click();
  628 |     const habitCard = page.getByRole('listitem').filter({ hasText: originalName });
  629 |     await expect(habitCard).toBeVisible();
  630 |     await habitCard.getByRole('button', { name: `Edit ${originalName}` }).click();
  631 |     const nameInput = page.getByLabel(`Edit name for ${originalName}`);
  632 |     await expect(nameInput).toHaveValue(originalName);
  633 |     const notesInput = page.getByLabel(`Edit notes for ${originalName}`);
  634 |     await expect(notesInput).toHaveValue('Initial notes');
  635 |     await nameInput.fill(updatedName);
  636 |     await page.getByLabel(`Edit category for ${originalName}`).selectOption('Personal');
  637 |     await page.getByLabel(`Edit times per week for ${originalName}`).selectOption('5');
  638 |     await notesInput.fill(updatedNotes);
  639 |     await page.getByRole('button', { name: 'Save', exact: true }).click();
  640 |     const updatedHabitCard = page.getByRole('listitem').filter({ hasText: updatedName });
  641 |     await expect(updatedHabitCard).toBeVisible();
  642 |     await expect(updatedHabitCard.getByText(updatedNotes)).toBeVisible();
  643 |   });
  644 | 
  645 |   /**
  646 |    * TC36: HabitCard - archive and unarchive a habit via its archive toggle button
  647 |    */
  648 |   test('TC36 - HabitCard - archive and unarchive a habit via its archive toggle button', async ({ page }) => {
  649 |     await page.goto('/');
  650 |     const habitName = `Archive habit ${Date.now()}`;
  651 |     await page.getByLabel('New habit name').fill(habitName);
  652 |     await page.getByRole('button', { name: 'Add habit' }).click();
  653 |     const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
  654 |     await expect(habitCard).toBeVisible();
  655 |     const archiveButton = habitCard.getByRole('button', { name: `Archive ${habitName}` });
  656 |     await archiveButton.click();
  657 |     await expect(page.getByRole('listitem').filter({ hasText: habitName })).toHaveCount(0);
  658 |     await page.getByLabel('Show archived').check();
  659 |     const archivedHabitCard = page.getByRole('listitem').filter({ hasText: habitName });
  660 |     await expect(archivedHabitCard).toBeVisible();
  661 |     const unarchiveButton = archivedHabitCard.getByRole('button', { name: `Unarchive ${habitName}` });
  662 |     await unarchiveButton.click();
  663 |     await expect(page.getByRole('listitem').filter({ hasText: habitName })).toHaveCount(1);
  664 |   });
  665 | 
  666 |   /**
  667 |    * TC37: HabitCard - mark habit as done disables mark done button
  668 |    */
  669 |   test('TC37 - HabitCard - mark habit as done disables mark done button', async ({ page }) => {
  670 |     await page.goto('/');
  671 |     const habitName = `Complete habit ${Date.now()}`;
  672 |     await page.getByLabel('New habit name').fill(habitName);
  673 |     await page.getByLabel('Habit category').selectOption('General');
  674 |     await page.getByLabel('Times per week').selectOption('7');
  675 |     await page.getByRole('button', { name: 'Add habit' }).click();
  676 |     const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
  677 |     const markDoneButton = habitCard.getByRole('button', { name: 'Mark done', exact: true });
  678 |     await markDoneButton.click();
  679 |     await expect(habitCard.getByRole('button', { name: 'Done today', exact: true })).toBeDisabled();
  680 |   });
  681 | 
  682 |   /**
  683 |    * TC38: Home - filter habits list by category changes displayed habits accordingly
  684 |    */
  685 |   test('TC38 - Home - filter habits list by category changes displayed habits accordingly', async ({ page }) => {
  686 |     await page.goto('/');
  687 |     const categoryFilter = page.getByLabel('Filter by category');
  688 |     await categoryFilter.selectOption('Health');
  689 |     await expect(categoryFilter).toHaveValue('Health');
  690 |   });
  691 | 
  692 |   /**
  693 |    * TC39: Home - toggling show archived checkbox updates displayed habits accordingly
  694 |    */
  695 |   test('TC39 - Home - toggling show archived checkbox updates displayed habits accordingly', async ({ page }) => {
  696 |     await page.goto('/');
  697 |     const showArchivedCheckbox = page.getByLabel('Show archived');
  698 |     await showArchivedCheckbox.check();
  699 |     await expect(showArchivedCheckbox).toBeChecked();
  700 |     await showArchivedCheckbox.uncheck();
  701 |     await expect(showArchivedCheckbox).not.toBeChecked();
  702 |   });
  703 | 
  704 |   /**
  705 |    * TC40: Home - Export JSON and Export CSV buttons are disabled when no habits exist and enabled after habits are created
  706 |    */
  707 |   test('TC40 - Home - Export JSON and Export CSV buttons are disabled when no habits exist and enabled after habits are created', async ({ page }) => {
```