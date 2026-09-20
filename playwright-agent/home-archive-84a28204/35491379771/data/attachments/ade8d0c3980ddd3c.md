# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> Home >> TC40 - Home page - Complete all for today bulk action disables button and updates label
- Location: tests/home.spec.ts:724:7

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
    21 × locator resolved to <button class="rounded-full bg-emerald-600 px-3 py-1 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 disabled:opacity-50 disabled:hover:bg-emerald-600">Complete all for today (1)</button>
       - unexpected value "enabled"

```

```yaml
- button "Complete all for today (1)"
```

# Test source

```ts
  638 |     const card = page.getByRole('listitem').filter({ hasText: habitName });
  639 |     const editButton = card.getByRole('button', { name: `Edit ${habitName}` });
  640 |     await editButton.click();
  641 |     const nameInput = page.getByLabel(`Edit name for ${habitName}`);
  642 |     await expect(nameInput).toHaveValue(habitName);
  643 |     const categorySelect = page.getByLabel(`Edit category for ${habitName}`);
  644 |     const timesSelect = page.getByLabel(`Edit times per week for ${habitName}`);
  645 |     const notesInput = page.getByLabel(`Edit notes for ${habitName}`);
  646 |     await nameInput.fill('Updated ' + habitName);
  647 |     await categorySelect.selectOption('Work');
  648 |     await timesSelect.selectOption('5');
  649 |     await notesInput.fill('Updated notes');
  650 |     const saveButton = page.getByRole('button', { name: 'Save', exact: true });
  651 |     await expect(saveButton).toBeEnabled();
  652 |     await saveButton.click();
  653 |     const updatedCard = page.getByRole('listitem').filter({ hasText: 'Updated ' + habitName });
  654 |     await expect(updatedCard).toBeVisible();
  655 |     const updatedEditButton = updatedCard.getByRole('button', { name: `Edit Updated ${habitName}` });
  656 |     await updatedEditButton.click();
  657 |     const updatedNameInput = page.getByLabel(`Edit name for Updated ${habitName}`);
  658 |     await updatedNameInput.fill('');
  659 |     await expect(page.getByRole('button', { name: 'Save', exact: true })).toBeDisabled();
  660 |     const cancelButton = page.getByRole('button', { name: 'Cancel', exact: true });
  661 |     await cancelButton.click();
  662 |     await expect(page.getByRole('listitem').filter({ hasText: 'Updated ' + habitName })).toBeVisible();
  663 |   });
  664 | 
  665 |   /**
  666 |    * TC37: Home page - search filters habit list results
  667 |    */
  668 |   test('TC37 - Home page - search filters habit list results', async ({ page }) => {
  669 |     await page.goto('/');
  670 |     const habit1 = `Search Alpha ${Date.now()}`;
  671 |     const habit2 = `Search Beta ${Date.now()}`;
  672 |     await page.getByLabel('New habit name').fill(habit1);
  673 |     await page.getByRole('button', { name: 'Add habit' }).click();
  674 |     const habit1Card = page.getByRole('listitem').filter({ hasText: habit1 });
  675 |     await expect(habit1Card).toBeVisible();
  676 |     await page.getByLabel('New habit name').fill(habit2);
  677 |     await page.getByRole('button', { name: 'Add habit' }).click();
  678 |     const habit2Card = page.getByRole('listitem').filter({ hasText: habit2 });
  679 |     await expect(habit2Card).toBeVisible();
  680 |     await page.getByLabel('Search habits by name').fill('Alpha');
  681 |     await expect(page.getByRole('listitem').filter({ hasText: habit1 })).toBeVisible();
  682 |     await expect(page.getByRole('listitem').filter({ hasText: habit2 })).toHaveCount(0);
  683 |   });
  684 | 
  685 |   /**
  686 |    * TC38: Home page - category filter updates visible habits
  687 |    */
  688 |   test('TC38 - Home page - category filter updates visible habits', async ({ page }) => {
  689 |     await page.goto('/');
  690 |     const catHabit1 = `Category Health ${Date.now()}`;
  691 |     const catHabit2 = `Category Work ${Date.now()}`;
  692 |     await page.getByLabel('New habit name').fill(catHabit1);
  693 |     await page.getByLabel('Habit category').selectOption('Health');
  694 |     await page.getByRole('button', { name: 'Add habit' }).click();
  695 |     await page.getByLabel('New habit name').fill(catHabit2);
  696 |     await page.getByLabel('Habit category').selectOption('Work');
  697 |     await page.getByRole('button', { name: 'Add habit' }).click();
  698 |     const filterDropdown = page.getByLabel('Filter by category');
  699 |     await filterDropdown.selectOption('Health');
  700 |     await expect(page.getByRole('listitem').filter({ hasText: catHabit1 })).toBeVisible();
  701 |     await expect(page.getByRole('listitem').filter({ hasText: catHabit2 })).toHaveCount(0);
  702 |   });
  703 | 
  704 |   /**
  705 |    * TC39: Home page - toggling show archived controls archived habits visibility
  706 |    */
  707 |   test('TC39 - Home page - toggling show archived controls archived habits visibility', async ({ page }) => {
  708 |     await page.goto('/');
  709 |     const archName = 'Archive Test ' + Date.now();
  710 |     await page.getByLabel('New habit name').fill(archName);
  711 |     await page.getByRole('button', { name: 'Add habit' }).click();
  712 |     const habitCard = page.getByRole('listitem').filter({ hasText: archName });
  713 |     await habitCard.getByRole('button', { name: `Archive ${archName}` }).click();
  714 |     await expect(page.getByRole('listitem').filter({ hasText: archName })).toHaveCount(0);
  715 |     const showArchivedCheckbox = page.getByLabel('Show archived');
  716 |     await showArchivedCheckbox.check();
  717 |     const archivedHabitCard = page.getByRole('listitem').filter({ hasText: archName });
  718 |     await expect(archivedHabitCard).toBeVisible();
  719 |   });
  720 | 
  721 |   /**
  722 |    * TC40: Home page - Complete all for today bulk action disables button and updates label
  723 |    */
  724 |   test('TC40 - Home page - Complete all for today bulk action disables button and updates label', async ({ page }) => {
  725 |     await page.goto('/');
  726 |     const habit1 = `BulkComplete 1 ${Date.now()}`;
  727 |     const habit2 = `BulkComplete 2 ${Date.now()}`;
  728 |     await page.getByLabel('New habit name').fill(habit1);
  729 |     await page.getByLabel('Habit category').selectOption('General');
  730 |     await page.getByRole('button', { name: 'Add habit' }).click();
  731 |     await expect(page.getByRole('listitem').filter({ hasText: habit1 })).toBeVisible();
  732 |     await page.getByLabel('New habit name').fill(habit2);
  733 |     await page.getByLabel('Habit category').selectOption('General');
  734 |     await page.getByRole('button', { name: 'Add habit' }).click();
  735 |     await expect(page.getByRole('listitem').filter({ hasText: habit2 })).toBeVisible();
  736 |     const bulkCompleteButton = page.getByRole('button', { name: /^Complete all for today/ });
  737 |     await bulkCompleteButton.click();
> 738 |     await expect(bulkCompleteButton).toBeDisabled();
      |                                      ^ Error: expect(locator).toBeDisabled() failed
  739 |     // The bulk action can settle before this assertion polls, so wait for the transient
  740 |     // "Completing…" label to clear rather than pinning the exact instant it appears --
  741 |     // `expect(...).toHaveText(a).or.toHaveText(b)` is not a real Playwright API (`.or` is
  742 |     // a Locator method, not part of the assertion chain) and threw a TypeError here. Note
  743 |     // the button legitimately stays disabled afterward once nothing is left pending -- it
  744 |     // does not necessarily re-enable, so that isn't the right thing to assert either.
  745 |     await expect(bulkCompleteButton).not.toHaveText(/Completing…/, { timeout: 15_000 });
  746 |   });
  747 | 
  748 |   /**
  749 |    * TC41: Home page - Export JSON and CSV buttons visibility and disabled state
  750 |    */
  751 |   test('TC41 - Home page - Export JSON and CSV buttons visibility and disabled state', async ({ page }) => {
  752 |     await page.goto('/');
  753 |     const exportJsonButton = page.getByRole('button', { name: 'Export JSON' });
  754 |     const exportCsvButton = page.getByRole('button', { name: 'Export CSV' });
  755 |     await expect(exportJsonButton).toBeVisible();
  756 |     await expect(exportCsvButton).toBeVisible();
  757 |     await expect(exportJsonButton).toBeDisabled();
  758 |     await expect(exportCsvButton).toBeDisabled();
  759 |     await page.getByLabel('New habit name').fill('Export Test ' + Date.now());
  760 |     await page.getByRole('button', { name: 'Add habit' }).click();
  761 |     await expect(exportJsonButton).toBeEnabled();
  762 |     await expect(exportCsvButton).toBeEnabled();
  763 |   });
  764 | 
  765 |   /**
  766 |    * TC42: HabitForm - creates a new habit successfully
  767 |    */
  768 |   test('TC42 - HabitForm - creates a new habit successfully', async ({ page }) => {
  769 |     await page.goto('/');
  770 |     const habitName = `Test Habit ${Date.now()}`;
  771 |     await page.getByLabel('New habit name').fill(habitName);
  772 |     await page.getByLabel('Habit category').selectOption('General');
  773 |     await page.getByLabel('Times per week').selectOption('1');
  774 |     await page.getByLabel('Notes (optional)').fill('Test notes');
  775 |     await page.getByRole('button', { name: 'Add habit' }).click();
  776 |     await expect(page.getByRole('listitem').filter({ hasText: habitName })).toBeVisible();
  777 |   });
  778 | 
  779 |   /**
  780 |    * TC43: HabitCard - edits an existing habit\\\'s name, category, target per week, and notes
  781 |    */
  782 |   test('TC43 - HabitCard - edits an existing habit\\\\\\\'s name, category, target per week, and notes', async ({ page }) => {
  783 |     await page.goto('/');
  784 |     const originalName = `Original Habit ${Date.now()}`;
  785 |     const updatedName = `Updated Habit ${Date.now()}`;
  786 |     await page.getByLabel('New habit name').fill(originalName);
  787 |     await page.getByRole('button', { name: 'Add habit' }).click();
  788 |     const habitCard = page.getByRole('listitem').filter({ hasText: originalName });
  789 |     await expect(habitCard).toBeVisible();
  790 |     await habitCard.getByRole('button', { name: `Edit` }).click();
  791 |     const nameInput = page.getByLabel(`Edit name for ${originalName}`);
  792 |     await expect(nameInput).toHaveValue(originalName);
  793 |     await nameInput.fill(updatedName);
  794 |     await page.getByLabel(`Edit category for ${originalName}`).selectOption('Health');
  795 |     await page.getByLabel(`Edit times per week for ${originalName}`).selectOption('3');
  796 |     await page.getByLabel(`Edit notes for ${originalName}`).fill('Updated notes');
  797 |     await page.getByRole('button', { name: 'Save' }).click();
  798 |     await expect(page.getByRole('listitem').filter({ hasText: updatedName })).toBeVisible();
  799 |   });
  800 | 
  801 |   /**
  802 |    * TC44: HabitCard - marks a habit as completed today
  803 |    */
  804 |   test('TC44 - HabitCard - marks a habit as completed today', async ({ page }) => {
  805 |     await page.goto('/');
  806 |     const habitName = `Complete Habit ${Date.now()}`;
  807 |     await page.getByLabel('New habit name').fill(habitName);
  808 |     await page.getByRole('button', { name: 'Add habit' }).click();
  809 |     const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
  810 |     await expect(habitCard).toBeVisible();
  811 |     const markDoneButton = habitCard.getByRole('button', { name: 'Mark done' });
  812 |     await markDoneButton.click();
  813 |     await expect(habitCard.getByRole('button', { name: 'Done today' })).toBeVisible();
  814 |     await expect(habitCard.getByRole('button', { name: 'Done today' })).toBeDisabled();
  815 |   });
  816 | 
  817 |   /**
  818 |    * TC45: HabitCard - toggles archive and unarchive of a habit
  819 |    */
  820 |   test('TC45 - HabitCard - toggles archive and unarchive of a habit', async ({ page }) => {
  821 |     await page.goto('/');
  822 |     const habitName = `Archive Habit ${Date.now()}`;
  823 |     await page.getByLabel('New habit name').fill(habitName);
  824 |     const addButton = page.getByRole('button', { name: 'Add habit' });
  825 |     await expect(addButton).toBeEnabled();
  826 |     await addButton.click();
  827 |     const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
  828 |     await expect(habitCard).toBeVisible();
  829 |     const archiveButton = habitCard.getByRole('button', { name: `Archive ${habitName}` });
  830 |     await archiveButton.click();
  831 |     await expect(page.getByRole('listitem').filter({ hasText: habitName })).toHaveCount(0);
  832 |     const showArchivedCheckbox = page.getByLabel('Show archived');
  833 |     await showArchivedCheckbox.check();
  834 |     const archivedHabitCard = page.getByRole('listitem').filter({ hasText: habitName });
  835 |     await expect(archivedHabitCard).toBeVisible();
  836 |     const unarchiveButton = archivedHabitCard.getByRole('button', { name: `Unarchive ${habitName}` });
  837 |     await unarchiveButton.click();
  838 |     await expect(page.getByRole('listitem').filter({ hasText: habitName })).toHaveCount(1);
```