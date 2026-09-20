# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> Home >> TC41 - Home page - Complete all for today bulk action disables button and updates label
- Location: tests/home.spec.ts:744:7

# Error details

```
Error: expect(locator).toBeDisabled() failed

Locator:  getByRole('button', { name: /^Complete all for today/ })
Expected: disabled
Received: enabled
Timeout:  10000ms

Call log:
  - Expect "toBeDisabled" getByRole('button', { name: /^Complete all for today/ }) with timeout 10000ms
  - waiting for getByRole('button', { name: /^Complete all for today/ })
    21 × locator resolved to <button class="rounded-full bg-emerald-600 px-3 py-1 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 disabled:opacity-50 disabled:hover:bg-emerald-600">Complete all for today (2)</button>
       - unexpected value "enabled"

```

```yaml
- button "Complete all for today (2)"
```

# Test source

```ts
  658 |     const card = page.getByRole('listitem').filter({ hasText: habitName });
  659 |     const editButton = card.getByRole('button', { name: `Edit ${habitName}` });
  660 |     await editButton.click();
  661 |     const nameInput = page.getByLabel(`Edit name for ${habitName}`);
  662 |     await expect(nameInput).toHaveValue(habitName);
  663 |     const categorySelect = page.getByLabel(`Edit category for ${habitName}`);
  664 |     const timesSelect = page.getByLabel(`Edit times per week for ${habitName}`);
  665 |     const notesInput = page.getByLabel(`Edit notes for ${habitName}`);
  666 |     await nameInput.fill('Updated ' + habitName);
  667 |     await categorySelect.selectOption('Work');
  668 |     await timesSelect.selectOption('5');
  669 |     await notesInput.fill('Updated notes');
  670 |     const saveButton = page.getByRole('button', { name: 'Save', exact: true });
  671 |     await expect(saveButton).toBeEnabled();
  672 |     await saveButton.click();
  673 |     const updatedCard = page.getByRole('listitem').filter({ hasText: 'Updated ' + habitName });
  674 |     await expect(updatedCard).toBeVisible();
  675 |     const updatedEditButton = updatedCard.getByRole('button', { name: `Edit Updated ${habitName}` });
  676 |     await updatedEditButton.click();
  677 |     const updatedNameInput = page.getByLabel(`Edit name for Updated ${habitName}`);
  678 |     await updatedNameInput.fill('');
  679 |     await expect(page.getByRole('button', { name: 'Save', exact: true })).toBeDisabled();
  680 |     const cancelButton = page.getByRole('button', { name: 'Cancel', exact: true });
  681 |     await cancelButton.click();
  682 |     await expect(page.getByRole('listitem').filter({ hasText: 'Updated ' + habitName })).toBeVisible();
  683 |   });
  684 | 
  685 |   /**
  686 |    * TC38: Home page - search filters habit list results
  687 |    */
  688 |   test('TC38 - Home page - search filters habit list results', async ({ page }) => {
  689 |     await page.goto('/');
  690 |     const habit1 = `Search Alpha ${Date.now()}`;
  691 |     const habit2 = `Search Beta ${Date.now()}`;
  692 |     await page.getByLabel('New habit name').fill(habit1);
  693 |     await page.getByRole('button', { name: 'Add habit' }).click();
  694 |     const habit1Card = page.getByRole('listitem').filter({ hasText: habit1 });
  695 |     await expect(habit1Card).toBeVisible();
  696 |     await page.getByLabel('New habit name').fill(habit2);
  697 |     await page.getByRole('button', { name: 'Add habit' }).click();
  698 |     const habit2Card = page.getByRole('listitem').filter({ hasText: habit2 });
  699 |     await expect(habit2Card).toBeVisible();
  700 |     await page.getByLabel('Search habits by name').fill('Alpha');
  701 |     await expect(page.getByRole('listitem').filter({ hasText: habit1 })).toBeVisible();
  702 |     await expect(page.getByRole('listitem').filter({ hasText: habit2 })).toHaveCount(0);
  703 |   });
  704 | 
  705 |   /**
  706 |    * TC39: Home page - category filter updates visible habits
  707 |    */
  708 |   test('TC39 - Home page - category filter updates visible habits', async ({ page }) => {
  709 |     await page.goto('/');
  710 |     const catHabit1 = `Category Health ${Date.now()}`;
  711 |     const catHabit2 = `Category Work ${Date.now()}`;
  712 |     await page.getByLabel('New habit name').fill(catHabit1);
  713 |     await page.getByLabel('Habit category').selectOption('Health');
  714 |     await page.getByRole('button', { name: 'Add habit' }).click();
  715 |     await page.getByLabel('New habit name').fill(catHabit2);
  716 |     await page.getByLabel('Habit category').selectOption('Work');
  717 |     await page.getByRole('button', { name: 'Add habit' }).click();
  718 |     const filterDropdown = page.getByLabel('Filter by category');
  719 |     await filterDropdown.selectOption('Health');
  720 |     await expect(page.getByRole('listitem').filter({ hasText: catHabit1 })).toBeVisible();
  721 |     await expect(page.getByRole('listitem').filter({ hasText: catHabit2 })).toHaveCount(0);
  722 |   });
  723 | 
  724 |   /**
  725 |    * TC40: Home page - toggling show archived controls archived habits visibility
  726 |    */
  727 |   test('TC40 - Home page - toggling show archived controls archived habits visibility', async ({ page }) => {
  728 |     await page.goto('/');
  729 |     const archName = 'Archive Test ' + Date.now();
  730 |     await page.getByLabel('New habit name').fill(archName);
  731 |     await page.getByRole('button', { name: 'Add habit' }).click();
  732 |     const habitCard = page.getByRole('listitem').filter({ hasText: archName });
  733 |     await habitCard.getByRole('button', { name: `Archive ${archName}` }).click();
  734 |     await expect(page.getByRole('listitem').filter({ hasText: archName })).toHaveCount(0);
  735 |     const showArchivedCheckbox = page.getByLabel('Show archived');
  736 |     await showArchivedCheckbox.check();
  737 |     const archivedHabitCard = page.getByRole('listitem').filter({ hasText: archName });
  738 |     await expect(archivedHabitCard).toBeVisible();
  739 |   });
  740 | 
  741 |   /**
  742 |    * TC41: Home page - Complete all for today bulk action disables button and updates label
  743 |    */
  744 |   test('TC41 - Home page - Complete all for today bulk action disables button and updates label', async ({ page }) => {
  745 |     await page.goto('/');
  746 |     const habit1 = `BulkComplete 1 ${Date.now()}`;
  747 |     const habit2 = `BulkComplete 2 ${Date.now()}`;
  748 |     await page.getByLabel('New habit name').fill(habit1);
  749 |     await page.getByLabel('Habit category').selectOption('General');
  750 |     await page.getByRole('button', { name: 'Add habit' }).click();
  751 |     await expect(page.getByRole('listitem').filter({ hasText: habit1 })).toBeVisible();
  752 |     await page.getByLabel('New habit name').fill(habit2);
  753 |     await page.getByLabel('Habit category').selectOption('General');
  754 |     await page.getByRole('button', { name: 'Add habit' }).click();
  755 |     await expect(page.getByRole('listitem').filter({ hasText: habit2 })).toBeVisible();
  756 |     const bulkCompleteButton = page.getByRole('button', { name: /^Complete all for today/ });
  757 |     await bulkCompleteButton.click();
> 758 |     await expect(bulkCompleteButton).toBeDisabled();
      |                                      ^ Error: expect(locator).toBeDisabled() failed
  759 |     // The bulk action can settle before this assertion polls, so wait for the transient
  760 |     // "Completing…" label to clear rather than pinning the exact instant it appears --
  761 |     // `expect(...).toHaveText(a).or.toHaveText(b)` is not a real Playwright API (`.or` is
  762 |     // a Locator method, not part of the assertion chain) and threw a TypeError here. Note
  763 |     // the button legitimately stays disabled afterward once nothing is left pending -- it
  764 |     // does not necessarily re-enable, so that isn't the right thing to assert either.
  765 |     await expect(bulkCompleteButton).not.toHaveText(/Completing…/, { timeout: 15_000 });
  766 |   });
  767 | 
  768 |   /**
  769 |    * TC42: Home page - Export JSON and CSV buttons visibility and disabled state
  770 |    */
  771 |   test('TC42 - Home page - Export JSON and CSV buttons visibility and disabled state', async ({ page }) => {
  772 |     await page.goto('/');
  773 |     const exportJsonButton = page.getByRole('button', { name: 'Export JSON' });
  774 |     const exportCsvButton = page.getByRole('button', { name: 'Export CSV' });
  775 |     await expect(exportJsonButton).toBeVisible();
  776 |     await expect(exportCsvButton).toBeVisible();
  777 |     await expect(exportJsonButton).toBeDisabled();
  778 |     await expect(exportCsvButton).toBeDisabled();
  779 |     await page.getByLabel('New habit name').fill('Export Test ' + Date.now());
  780 |     await page.getByRole('button', { name: 'Add habit' }).click();
  781 |     await expect(exportJsonButton).toBeEnabled();
  782 |     await expect(exportCsvButton).toBeEnabled();
  783 |   });
  784 | 
  785 |   /**
  786 |    * TC43: HabitForm - creates a new habit successfully
  787 |    */
  788 |   test('TC43 - HabitForm - creates a new habit successfully', async ({ page }) => {
  789 |     await page.goto('/');
  790 |     const habitName = `Test Habit ${Date.now()}`;
  791 |     await page.getByLabel('New habit name').fill(habitName);
  792 |     await page.getByLabel('Habit category').selectOption('General');
  793 |     await page.getByLabel('Times per week').selectOption('1');
  794 |     await page.getByLabel('Notes (optional)').fill('Test notes');
  795 |     await page.getByRole('button', { name: 'Add habit' }).click();
  796 |     await expect(page.getByRole('listitem').filter({ hasText: habitName })).toBeVisible();
  797 |   });
  798 | 
  799 |   /**
  800 |    * TC44: HabitCard - edits an existing habit\\\'s name, category, target per week, and notes
  801 |    */
  802 |   test('TC44 - HabitCard - edits an existing habit\\\\\\\'s name, category, target per week, and notes', async ({ page }) => {
  803 |     await page.goto('/');
  804 |     const originalName = `Original Habit ${Date.now()}`;
  805 |     const updatedName = `Updated Habit ${Date.now()}`;
  806 |     await page.getByLabel('New habit name').fill(originalName);
  807 |     await page.getByRole('button', { name: 'Add habit' }).click();
  808 |     const habitCard = page.getByRole('listitem').filter({ hasText: originalName });
  809 |     await expect(habitCard).toBeVisible();
  810 |     await habitCard.getByRole('button', { name: `Edit` }).click();
  811 |     const nameInput = page.getByLabel(`Edit name for ${originalName}`);
  812 |     await expect(nameInput).toHaveValue(originalName);
  813 |     await nameInput.fill(updatedName);
  814 |     await page.getByLabel(`Edit category for ${originalName}`).selectOption('Health');
  815 |     await page.getByLabel(`Edit times per week for ${originalName}`).selectOption('3');
  816 |     await page.getByLabel(`Edit notes for ${originalName}`).fill('Updated notes');
  817 |     await page.getByRole('button', { name: 'Save' }).click();
  818 |     await expect(page.getByRole('listitem').filter({ hasText: updatedName })).toBeVisible();
  819 |   });
  820 | 
  821 |   /**
  822 |    * TC45: HabitCard - marks a habit as completed today
  823 |    */
  824 |   test('TC45 - HabitCard - marks a habit as completed today', async ({ page }) => {
  825 |     await page.goto('/');
  826 |     const habitName = `Complete Habit ${Date.now()}`;
  827 |     await page.getByLabel('New habit name').fill(habitName);
  828 |     await page.getByRole('button', { name: 'Add habit' }).click();
  829 |     const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
  830 |     await expect(habitCard).toBeVisible();
  831 |     const markDoneButton = habitCard.getByRole('button', { name: 'Mark done' });
  832 |     await markDoneButton.click();
  833 |     await expect(habitCard.getByRole('button', { name: 'Done today' })).toBeVisible();
  834 |     await expect(habitCard.getByRole('button', { name: 'Done today' })).toBeDisabled();
  835 |   });
  836 | 
  837 |   /**
  838 |    * TC46: HabitCard - toggles archive and unarchive of a habit
  839 |    */
  840 |   test('TC46 - HabitCard - toggles archive and unarchive of a habit', async ({ page }) => {
  841 |     await page.goto('/');
  842 |     const habitName = `Archive Habit ${Date.now()}`;
  843 |     await page.getByLabel('New habit name').fill(habitName);
  844 |     const addButton = page.getByRole('button', { name: 'Add habit' });
  845 |     await expect(addButton).toBeEnabled();
  846 |     await addButton.click();
  847 |     const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
  848 |     await expect(habitCard).toBeVisible();
  849 |     const archiveButton = habitCard.getByRole('button', { name: `Archive ${habitName}` });
  850 |     await archiveButton.click();
  851 |     await expect(page.getByRole('listitem').filter({ hasText: habitName })).toHaveCount(0);
  852 |     const showArchivedCheckbox = page.getByLabel('Show archived');
  853 |     await showArchivedCheckbox.check();
  854 |     const archivedHabitCard = page.getByRole('listitem').filter({ hasText: habitName });
  855 |     await expect(archivedHabitCard).toBeVisible();
  856 |     const unarchiveButton = archivedHabitCard.getByRole('button', { name: `Unarchive ${habitName}` });
  857 |     await unarchiveButton.click();
  858 |     await expect(page.getByRole('listitem').filter({ hasText: habitName })).toHaveCount(1);
```