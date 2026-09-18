# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> Home >> TC37 - Home - searches for habits by name
- Location: tests/home.spec.ts:698:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('listitem').filter({ hasText: 'Search Habit 1789710985822' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('listitem').filter({ hasText: 'Search Habit 1789710985822' }) with timeout 10000ms
  - waiting for getByRole('listitem').filter({ hasText: 'Search Habit 1789710985822' })

```

```yaml
- main:
  - heading "Habit Tracker" [level=1]
  - paragraph: Build small daily habits, one day at a time.
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
    - option "General" [selected]
    - option "Health"
    - option "Work"
    - option "Personal"
    - option "Learning"
  - combobox "Times per week":
    - option "1x / week"
    - option "2x / week"
    - option "3x / week"
    - option "4x / week"
    - option "5x / week"
    - option "6x / week"
    - option "7x / week" [selected]
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
  - button "Complete all for today (23)"
  - button "Export JSON"
  - button "Export CSV"
  - list:
    - listitem:
      - paragraph: Archive Habit 1789710972419
      - text: General
      - status "Archive Habit 1789710972419 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "Archive Habit 1789710972419 weekly progress"
      - text: 0/7 this week
      - button "Mark done"
      - button "Freeze Archive Habit 1789710972419 for today": 🧊 Freeze
      - button "Edit Archive Habit 1789710972419": Edit
      - button "Archive Archive Habit 1789710972419": Archive
      - button "Delete Archive Habit 1789710972419": Remove
    - listitem:
      - paragraph: BulkComplete 1 1789710940786
      - text: General
      - status "BulkComplete 1 1789710940786 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "BulkComplete 1 1789710940786 weekly progress"
      - text: 0/7 this week
      - button "Mark done"
      - button "Freeze BulkComplete 1 1789710940786 for today": 🧊 Freeze
      - button "Edit BulkComplete 1 1789710940786": Edit
      - button "Archive BulkComplete 1 1789710940786": Archive
      - button "Delete BulkComplete 1 1789710940786": Remove
    - listitem:
      - paragraph: Cancel edit habit 1789710871868
      - text: General
      - status "Cancel edit habit 1789710871868 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "Cancel edit habit 1789710871868 weekly progress"
      - text: 0/3 this week
      - button "Mark done"
      - button "Freeze Cancel edit habit 1789710871868 for today": 🧊 Freeze
      - button "Edit Cancel edit habit 1789710871868": Edit
      - button "Archive Cancel edit habit 1789710871868": Archive
      - button "Delete Cancel edit habit 1789710871868": Remove
    - listitem:
      - paragraph: Category Health 1789710926743
      - text: Health
      - status "Category Health 1789710926743 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "Category Health 1789710926743 weekly progress"
      - text: 0/7 this week
      - button "Mark done"
      - button "Freeze Category Health 1789710926743 for today": 🧊 Freeze
      - button "Edit Category Health 1789710926743": Edit
      - button "Archive Category Health 1789710926743": Archive
      - button "Delete Category Health 1789710926743": Remove
    - listitem:
      - paragraph: Category Work 1789710926743
      - text: Work
      - status "Category Work 1789710926743 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "Category Work 1789710926743 weekly progress"
      - text: 0/7 this week
      - button "Mark done"
      - button "Freeze Category Work 1789710926743 for today": 🧊 Freeze
      - button "Edit Category Work 1789710926743": Edit
      - button "Archive Category Work 1789710926743": Archive
      - button "Delete Category Work 1789710926743": Remove
    - listitem:
      - paragraph: Complete habit 1789710917994
      - text: General
      - paragraph: 🔥 1 day streak
      - progressbar "Complete habit 1789710917994 weekly progress"
      - text: 1/7 this week
      - button "Done today" [disabled]
      - button "Freeze Complete habit 1789710917994 for today" [disabled]: 🧊 Freeze
      - button "Edit Complete habit 1789710917994": Edit
      - button "Archive Complete habit 1789710917994": Archive
      - button "Delete Complete habit 1789710917994": Remove
    - listitem:
      - paragraph: Complete Habit 1789710958989
      - text: General
      - paragraph: 🔥 1 day streak
      - progressbar "Complete Habit 1789710958989 weekly progress"
      - text: 1/7 this week
      - button "Done today" [disabled]
      - button "Freeze Complete Habit 1789710958989 for today" [disabled]: 🧊 Freeze
      - button "Edit Complete Habit 1789710958989": Edit
      - button "Archive Complete Habit 1789710958989": Archive
      - button "Delete Complete Habit 1789710958989": Remove
    - listitem:
      - paragraph: Daily completion habit 1789710887793
      - text: General
      - status "Daily completion habit 1789710887793 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "Daily completion habit 1789710887793 weekly progress"
      - text: 0/7 this week
      - button "Mark done"
      - button "Freeze Daily completion habit 1789710887793 for today": 🧊 Freeze
      - button "Edit Daily completion habit 1789710887793": Edit
      - button "Archive Daily completion habit 1789710887793": Archive
      - button "Delete Daily completion habit 1789710887793": Remove
    - listitem:
      - paragraph: Daily completion habit 1789710899780
      - text: General
      - status "Daily completion habit 1789710899780 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "Daily completion habit 1789710899780 weekly progress"
      - text: 0/7 this week
      - button "Mark done"
      - button "Freeze Daily completion habit 1789710899780 for today": 🧊 Freeze
      - button "Edit Daily completion habit 1789710899780": Edit
      - button "Archive Daily completion habit 1789710899780": Archive
      - button "Delete Daily completion habit 1789710899780": Remove
    - listitem:
      - paragraph: Edit habit 1789710870106 updated
      - text: Health
      - status "Edit habit 1789710870106 updated is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "Edit habit 1789710870106 updated weekly progress"
      - text: 0/5 this week
      - button "Mark done"
      - button "Freeze Edit habit 1789710870106 updated for today": 🧊 Freeze
      - button "Edit Edit habit 1789710870106 updated": Edit
      - button "Archive Edit habit 1789710870106 updated": Archive
      - button "Delete Edit habit 1789710870106 updated": Remove
    - listitem:
      - paragraph: Edit validation habit 1789710872775
      - text: General
      - status "Edit validation habit 1789710872775 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "Edit validation habit 1789710872775 weekly progress"
      - text: 0/3 this week
      - button "Mark done"
      - button "Freeze Edit validation habit 1789710872775 for today": 🧊 Freeze
      - button "Edit Edit validation habit 1789710872775": Edit
      - button "Archive Edit validation habit 1789710872775": Archive
      - button "Delete Edit validation habit 1789710872775": Remove
    - listitem:
      - paragraph: Editable habit 1789710911949
      - text: General
      - status "Editable habit 1789710911949 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "Editable habit 1789710911949 weekly progress"
      - text: 0/7 this week
      - button "Mark done"
      - button "Freeze Editable habit 1789710911949 for today": 🧊 Freeze
      - button "Edit Editable habit 1789710911949": Edit
      - button "Archive Editable habit 1789710911949": Archive
      - button "Delete Editable habit 1789710911949": Remove
    - listitem:
      - paragraph: Editable habit save 1789710912935 updated
      - text: General
      - status "Editable habit save 1789710912935 updated is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "Editable habit save 1789710912935 updated weekly progress"
      - text: 0/3 this week
      - button "Mark done"
      - button "Freeze Editable habit save 1789710912935 updated for today": 🧊 Freeze
      - button "Edit Editable habit save 1789710912935 updated": Edit
      - button "Archive Editable habit save 1789710912935 updated": Archive
      - button "Delete Editable habit save 1789710912935 updated": Remove
    - listitem:
      - paragraph: Filter Habit 1 1789710984585
      - text: Health
      - status "Filter Habit 1 1789710984585 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "Filter Habit 1 1789710984585 weekly progress"
      - text: 0/7 this week
      - button "Mark done"
      - button "Freeze Filter Habit 1 1789710984585 for today": 🧊 Freeze
      - button "Edit Filter Habit 1 1789710984585": Edit
      - button "Archive Filter Habit 1 1789710984585": Archive
      - button "Delete Filter Habit 1 1789710984585": Remove
    - listitem:
      - paragraph: Filter Habit 2 1789710984585
      - text: Work
      - status "Filter Habit 2 1789710984585 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "Filter Habit 2 1789710984585 weekly progress"
      - text: 0/7 this week
      - button "Mark done"
      - button "Freeze Filter Habit 2 1789710984585 for today": 🧊 Freeze
      - button "Edit Filter Habit 2 1789710984585": Edit
      - button "Archive Filter Habit 2 1789710984585": Archive
      - button "Delete Filter Habit 2 1789710984585": Remove
    - listitem:
      - paragraph: Original Habit 1789710955159
      - text: General
      - status "Original Habit 1789710955159 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "Original Habit 1789710955159 weekly progress"
      - text: 0/7 this week
      - button "Mark done"
      - button "Freeze Original Habit 1789710955159 for today": 🧊 Freeze
      - button "Edit Original Habit 1789710955159": Edit
      - button "Archive Original Habit 1789710955159": Archive
      - button "Delete Original Habit 1789710955159": Remove
    - listitem:
      - paragraph: Original Habit 1789710957042
      - text: General
      - status "Original Habit 1789710957042 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "Original Habit 1789710957042 weekly progress"
      - text: 0/7 this week
      - button "Mark done"
      - button "Freeze Original Habit 1789710957042 for today": 🧊 Freeze
      - button "Edit Original Habit 1789710957042": Edit
      - button "Archive Original Habit 1789710957042": Archive
      - button "Delete Original Habit 1789710957042": Remove
    - listitem:
      - paragraph: Search Alpha 1789710925558
      - text: General
      - status "Search Alpha 1789710925558 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "Search Alpha 1789710925558 weekly progress"
      - text: 0/7 this week
      - button "Mark done"
      - button "Freeze Search Alpha 1789710925558 for today": 🧊 Freeze
      - button "Edit Search Alpha 1789710925558": Edit
      - button "Archive Search Alpha 1789710925558": Archive
      - button "Delete Search Alpha 1789710925558": Remove
    - listitem:
      - paragraph: Search Beta 1789710925558
      - text: General
      - status "Search Beta 1789710925558 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "Search Beta 1789710925558 weekly progress"
      - text: 0/7 this week
      - button "Mark done"
      - button "Freeze Search Beta 1789710925558 for today": 🧊 Freeze
      - button "Edit Search Beta 1789710925558": Edit
      - button "Archive Search Beta 1789710925558": Archive
      - button "Delete Search Beta 1789710925558": Remove
    - listitem:
      - paragraph: Test habit 1789710914761
      - text: Health
      - status "Test habit 1789710914761 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "Test habit 1789710914761 weekly progress"
      - text: 0/3 this week
      - paragraph: Test note for habit
      - button "Mark done"
      - button "Freeze Test habit 1789710914761 for today": 🧊 Freeze
      - button "Edit Test habit 1789710914761": Edit
      - button "Archive Test habit 1789710914761": Archive
      - button "Delete Test habit 1789710914761": Remove
    - listitem:
      - paragraph: Test Habit 1789710954278
      - text: General
      - paragraph: Start your streak today!
      - progressbar "Test Habit 1789710954278 weekly progress"
      - text: 0/1 this week
      - paragraph: Test notes
      - button "Mark done"
      - button "Freeze Test Habit 1789710954278 for today": 🧊 Freeze
      - button "Edit Test Habit 1789710954278": Edit
      - button "Archive Test Habit 1789710954278": Archive
      - button "Delete Test Habit 1789710954278": Remove
    - listitem:
      - paragraph: Test habit create 1789710867743
      - text: General
      - status "Test habit create 1789710867743 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "Test habit create 1789710867743 weekly progress"
      - text: 0/3 this week
      - button "Mark done"
      - button "Freeze Test habit create 1789710867743 for today": 🧊 Freeze
      - button "Edit Test habit create 1789710867743": Edit
      - button "Archive Test habit create 1789710867743": Archive
      - button "Delete Test habit create 1789710867743": Remove
    - listitem:
      - paragraph: Test habit create 1789710869350
      - text: General
      - status "Test habit create 1789710869350 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "Test habit create 1789710869350 weekly progress"
      - text: 0/3 this week
      - button "Mark done"
      - button "Freeze Test habit create 1789710869350 for today": 🧊 Freeze
      - button "Edit Test habit create 1789710869350": Edit
      - button "Archive Test habit create 1789710869350": Archive
      - button "Delete Test habit create 1789710869350": Remove
    - listitem:
      - paragraph: Test habit create 1789710874449
      - text: General
      - status "Test habit create 1789710874449 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "Test habit create 1789710874449 weekly progress"
      - text: 0/7 this week
      - button "Mark done"
      - button "Freeze Test habit create 1789710874449 for today": 🧊 Freeze
      - button "Edit Test habit create 1789710874449": Edit
      - button "Archive Test habit create 1789710874449": Archive
      - button "Delete Test habit create 1789710874449": Remove
    - listitem:
      - paragraph: Updated habit 1789710915541
      - text: Personal
      - status "Updated habit 1789710915541 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "Updated habit 1789710915541 weekly progress"
      - text: 0/5 this week
      - paragraph: Updated notes
      - button "Mark done"
      - button "Freeze Updated habit 1789710915541 for today": 🧊 Freeze
      - button "Edit Updated habit 1789710915541": Edit
      - button "Archive Updated habit 1789710915541": Archive
      - button "Delete Updated habit 1789710915541": Remove
- alert
```

# Test source

```ts
  603 |    */
  604 |   test('TC33 - HabitCard - edits an existing habit\'s name, category, target per week, and notes', async ({ page }) => {
  605 |     await page.goto('/');
  606 |     const originalName = `Original Habit ${Date.now()}`;
  607 |     const updatedName = `Updated Habit ${Date.now()}`;
  608 |     await page.getByLabel('New habit name').fill(originalName);
  609 |     await page.getByRole('button', { name: 'Add habit' }).click();
  610 |     const habitCard = page.getByRole('listitem').filter({ hasText: originalName });
  611 |     await expect(habitCard).toBeVisible();
  612 |     await habitCard.getByRole('button', { name: `Edit` }).click();
  613 |     const nameInput = page.getByLabel(`Edit name for ${originalName}`);
  614 |     await expect(nameInput).toHaveValue(originalName);
  615 |     await nameInput.fill(updatedName);
  616 |     await page.getByLabel(`Edit category for ${originalName}`).selectOption('Health');
  617 |     await page.getByLabel(`Edit times per week for ${originalName}`).selectOption('3');
  618 |     await page.getByLabel(`Edit notes for ${originalName}`).fill('Updated notes');
  619 |     await page.getByRole('button', { name: 'Save' }).click();
  620 |     await expect(page.getByRole('listitem').filter({ hasText: updatedName })).toBeVisible();
  621 |   });
  622 | 
  623 |   // ──────────────────────────────────────────────────────────────────────────
  624 |   // SECTION 5: HabitCard completion
  625 |   // ──────────────────────────────────────────────────────────────────────────
  626 | 
  627 |   /**
  628 |    * TC34: HabitCard - marks a habit as completed today
  629 |    */
  630 |   test('TC34 - HabitCard - marks a habit as completed today', async ({ page }) => {
  631 |     await page.goto('/');
  632 |     const habitName = `Complete Habit ${Date.now()}`;
  633 |     await page.getByLabel('New habit name').fill(habitName);
  634 |     await page.getByRole('button', { name: 'Add habit' }).click();
  635 |     const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
  636 |     await expect(habitCard).toBeVisible();
  637 |     const markDoneButton = habitCard.getByRole('button', { name: 'Mark done' });
  638 |     await markDoneButton.click();
  639 |     await expect(habitCard.getByRole('button', { name: 'Done today' })).toBeVisible();
  640 |     await expect(habitCard.getByRole('button', { name: 'Done today' })).toBeDisabled();
  641 |   });
  642 | 
  643 |   // ──────────────────────────────────────────────────────────────────────────
  644 |   // SECTION 6: HabitCard archiving
  645 |   // ──────────────────────────────────────────────────────────────────────────
  646 | 
  647 |   /**
  648 |    * TC35: HabitCard - toggles archive and unarchive of a habit
  649 |    */
  650 |   test('TC35 - HabitCard - toggles archive and unarchive of a habit', async ({ page }) => {
  651 |     await page.goto('/');
  652 |     const habitName = `Archive Habit ${Date.now()}`;
  653 |     await page.getByLabel('New habit name').fill(habitName);
  654 |     const addButton = page.getByRole('button', { name: 'Add habit' });
  655 |     await expect(addButton).toBeEnabled();
  656 |     await addButton.click();
  657 |     const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
  658 |     await expect(habitCard).toBeVisible();
  659 |     const archiveButton = habitCard.getByRole('button', { name: `Archive ${habitName}` });
  660 |     await archiveButton.click();
  661 |     await expect(page.getByRole('listitem').filter({ hasText: habitName })).toHaveCount(0);
  662 |     const showArchivedCheckbox = page.getByLabel('Show archived');
  663 |     await showArchivedCheckbox.check();
  664 |     const archivedHabitCard = page.getByRole('listitem').filter({ hasText: habitName });
  665 |     await expect(archivedHabitCard).toBeVisible();
  666 |     const unarchiveButton = archivedHabitCard.getByRole('button', { name: `Unarchive ${habitName}` });
  667 |     await unarchiveButton.click();
  668 |     await expect(page.getByRole('listitem').filter({ hasText: habitName })).toHaveCount(1);
  669 |   });
  670 | 
  671 |   // ──────────────────────────────────────────────────────────────────────────
  672 |   // SECTION 7: Habits filtering and searching
  673 |   // ──────────────────────────────────────────────────────────────────────────
  674 | 
  675 |   /**
  676 |    * TC36: Home - filters habits by category
  677 |    */
  678 |   test('TC36 - Home - filters habits by category', async ({ page }) => {
  679 |     await page.goto('/');
  680 |     const habitName1 = `Filter Habit 1 ${Date.now()}`;
  681 |     const habitName2 = `Filter Habit 2 ${Date.now()}`;
  682 |     await page.getByLabel('New habit name').fill(habitName1);
  683 |     await page.getByLabel('Habit category').selectOption('Health');
  684 |     await page.getByRole('button', { name: 'Add habit' }).click();
  685 |     await expect(page.getByRole('listitem').filter({ hasText: habitName1 })).toBeVisible();
  686 |     await page.getByLabel('New habit name').fill(habitName2);
  687 |     await page.getByLabel('Habit category').selectOption('Work');
  688 |     await page.getByRole('button', { name: 'Add habit' }).click();
  689 |     await expect(page.getByRole('listitem').filter({ hasText: habitName2 })).toBeVisible();
  690 |     await page.getByLabel('Filter by category').selectOption('Health');
  691 |     await expect(page.getByRole('listitem').filter({ hasText: habitName1 })).toBeVisible();
  692 |     await expect(page.getByRole('listitem').filter({ hasText: habitName2 })).toHaveCount(0);
  693 |   });
  694 | 
  695 |   /**
  696 |    * TC37: Home - searches for habits by name
  697 |    */
  698 |   test('TC37 - Home - searches for habits by name', async ({ page }) => {
  699 |     await page.goto('/');
  700 |     const habitName = `Search Habit ${Date.now()}`;
  701 |     await page.getByLabel('New habit name').fill(habitName);
  702 |     await page.getByRole('button', { name: 'Add habit' }).click();
> 703 |     await expect(page.getByRole('listitem').filter({ hasText: habitName })).toBeVisible();
      |                                                                             ^ Error: expect(locator).toBeVisible() failed
  704 |     const searchInput = page.getByLabel('Search habits by name');
  705 |     await searchInput.fill(habitName.slice(0, 5));
  706 |     await expect(page.getByRole('listitem').filter({ hasText: habitName })).toBeVisible();
  707 |     await searchInput.fill('nomatchterm');
  708 |     await expect(page.getByText(new RegExp(`No habits match "nomatchterm"\.`))).toBeVisible();
  709 |   });
  710 | 
  711 |   /**
  712 |    * TC38: Home - sorts habits by different criteria updates visible list
  713 |    */
  714 |   test('TC38 - Home - sorts habits by different criteria updates visible list', async ({ page }) => {
  715 |     await page.goto('/');
  716 |     const habitName1 = `Sort Habit A ${Date.now()}`;
  717 |     const habitName2 = `Sort Habit B ${Date.now()}`;
  718 |     await page.getByLabel('New habit name').fill(habitName1);
  719 |     const addButton1 = page.getByRole('button', { name: 'Add habit' });
  720 |     await expect(addButton1).toBeEnabled();
  721 |     await addButton1.click();
  722 |     await expect(page.getByRole('listitem').filter({ hasText: habitName1 })).toBeVisible();
  723 |     await page.getByLabel('New habit name').fill(habitName2);
  724 |     const addButton2 = page.getByRole('button', { name: 'Add habit' });
  725 |     await expect(addButton2).toBeEnabled();
  726 |     await addButton2.click();
  727 |     await expect(page.getByRole('listitem').filter({ hasText: habitName2 })).toBeVisible();
  728 |     const sortSelect = page.getByLabel('Sort habits by');
  729 |     const sortValues = ['name', 'streak', 'category', 'target_per_week'];
  730 |     for (const val of sortValues) {
  731 |       await sortSelect.selectOption(val);
  732 |       await expect(page.getByRole('list')).toBeVisible();
  733 |     }
  734 |   });
  735 | 
  736 |   /**
  737 |    * TC39: Home - toggles show archived checkbox updates habits list
  738 |    */
  739 |   test('TC39 - Home - toggles show archived checkbox updates habits list', async ({ page }) => {
  740 |     await page.goto('/');
  741 |     const checkbox = page.getByRole('checkbox', { name: 'Show archived' });
  742 |     const initialCount = await page.getByRole('listitem').count();
  743 |     await checkbox.check();
  744 |     await expect(page.getByRole('list')).toBeVisible();
  745 |     await checkbox.uncheck();
  746 |     await expect(page.getByRole('list')).toBeVisible();
  747 |   });
  748 | 
  749 |   // ──────────────────────────────────────────────────────────────────────────
  750 |   // SECTION 8: Habit bulk actions
  751 |   // ──────────────────────────────────────────────────────────────────────────
  752 | 
  753 |   /**
  754 |    * TC40: Home - completes all incomplete habits for today with bulk action
  755 |    */
  756 |   test('TC40 - Home - completes all incomplete habits for today with bulk action', async ({ page }) => {
  757 |     await page.goto('/');
  758 |     const habitName1 = `Bulk Complete Habit 1 ${Date.now()}`;
  759 |     const habitName2 = `Bulk Complete Habit 2 ${Date.now()}`;
  760 |     await page.getByLabel('New habit name').fill(habitName1);
  761 |     const addButton1 = page.getByRole('button', { name: 'Add habit' });
  762 |     await expect(addButton1).toBeEnabled();
  763 |     await addButton1.click();
  764 |     await expect(page.getByRole('listitem').filter({ hasText: habitName1 })).toBeVisible();
  765 |     await page.getByLabel('New habit name').fill(habitName2);
  766 |     const addButton2 = page.getByRole('button', { name: 'Add habit' });
  767 |     await expect(addButton2).toBeEnabled();
  768 |     await addButton2.click();
  769 |     await expect(page.getByRole('listitem').filter({ hasText: habitName2 })).toBeVisible();
  770 |     const completeAllButton = page.getByRole('button', { name: /Complete all for today/ });
  771 |     await expect(completeAllButton).toBeEnabled();
  772 |     await completeAllButton.click();
  773 |     // The bulk action can settle before this assertion polls, so wait for the transient
  774 |     // "Completing…" label to clear rather than pinning the exact instant. The button
  775 |     // legitimately stays disabled afterward once nothing is left pending, so "enabled"
  776 |     // is not a reliable end state to assert on either.
  777 |     await expect(completeAllButton).not.toHaveText(/Completing…/, { timeout: 15_000 });
  778 |   });
  779 | 
  780 | });
  781 | 
```