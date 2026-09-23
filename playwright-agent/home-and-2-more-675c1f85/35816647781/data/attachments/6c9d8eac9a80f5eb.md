# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> Home >> TC46 - HabitCard - marks a habit as completed today
- Location: tests/home.spec.ts:880:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('listitem').filter({ hasText: 'Complete Habit 1790137480173' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('listitem').filter({ hasText: 'Complete Habit 1790137480173' }) with timeout 10000ms
  - waiting for getByRole('listitem').filter({ hasText: 'Complete Habit 1790137480173' })

```

```yaml
- main:
  - heading "Habit Tracker" [level=1]
  - paragraph: Build small daily habits, one day at a time.
  - paragraph: Wednesday, September 23
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
    - option "Priority (highest first)"
    - option "Weekly target (highest first)"
  - text: Filter by category
  - combobox "Filter by category":
    - option "All" [selected]
    - option "General"
    - option "Health"
    - option "Work"
    - option "Personal"
    - option "Learning"
  - text: Filter by priority
  - combobox "Filter by priority":
    - option "All" [selected]
    - option "Low"
    - option "Medium"
    - option "High"
  - checkbox "Show archived"
  - text: Show archived
  - button "Complete all for today (0)" [disabled]
  - button "Export JSON" [disabled]
  - button "Export CSV" [disabled]
  - paragraph: No habits yet — add one above to get started.
- alert
```

# Test source

```ts
  786 |    * TC41: Home page - toggling show archived controls archived habits visibility
  787 |    */
  788 |   test('TC41 - Home page - toggling show archived controls archived habits visibility', async ({ page }) => {
  789 |     await page.goto('/');
  790 |     const archName = 'Archive Test ' + Date.now();
  791 |     await page.getByLabel('New habit name').fill(archName);
  792 |     await submitAddHabitButton(page).click();
  793 |     const habitCard = habitCardLocator(page, archName);
  794 |     await habitCard.getByRole('button', { name: `Archive ${archName}` }).click();
  795 |     await expect(habitCardLocator(page, archName)).toHaveCount(0);
  796 |     const showArchivedCheckbox = showArchivedToggle(page);
  797 |     await showArchivedCheckbox.check();
  798 |     const archivedHabitCard = habitCardLocator(page, archName);
  799 |     await expect(archivedHabitCard).toBeVisible();
  800 |   });
  801 | 
  802 |   /**
  803 |    * TC42: Home page - Complete all for today bulk action disables button and updates label
  804 |    */
  805 |   test('TC42 - Home page - Complete all for today bulk action disables button and updates label', async ({ page }) => {
  806 |     await page.goto('/');
  807 |     const habit1 = `BulkComplete 1 ${Date.now()}`;
  808 |     const habit2 = `BulkComplete 2 ${Date.now()}`;
  809 |     await page.getByLabel('New habit name').fill(habit1);
  810 |     await page.getByLabel('Habit category').selectOption('General');
  811 |     await submitAddHabitButton(page).click();
  812 |     await expect(habitCardLocator(page, habit1)).toBeVisible();
  813 |     await page.getByLabel('New habit name').fill(habit2);
  814 |     await page.getByLabel('Habit category').selectOption('General');
  815 |     await submitAddHabitButton(page).click();
  816 |     await expect(habitCardLocator(page, habit2)).toBeVisible();
  817 |     const bulkCompleteButton = page.getByRole('button', { name: /^Complete all for today/ });
  818 |     await expect(bulkCompleteButton).toBeEnabled();
  819 |     await bulkCompleteButton.click();
  820 |     await expect(bulkCompleteButton).not.toHaveText(/Completing…/, { timeout: 15000 });
  821 |   });
  822 | 
  823 |   /**
  824 |    * TC43: Home page - Export JSON and CSV buttons visibility and disabled state
  825 |    */
  826 |   test('TC43 - Home page - Export JSON and CSV buttons visibility and disabled state', async ({ page }) => {
  827 |     await page.goto('/');
  828 |     const exportJsonButton = page.getByRole('button', { name: 'Export JSON' });
  829 |     const exportCsvButton = page.getByRole('button', { name: 'Export CSV' });
  830 |     await expect(exportJsonButton).toBeVisible();
  831 |     await expect(exportCsvButton).toBeVisible();
  832 |     await expect(exportJsonButton).toBeDisabled();
  833 |     await expect(exportCsvButton).toBeDisabled();
  834 |     await page.getByLabel('New habit name').fill('Export Test ' + Date.now());
  835 |     await submitAddHabitButton(page).click();
  836 |     await expect(exportJsonButton).toBeEnabled();
  837 |     await expect(exportCsvButton).toBeEnabled();
  838 |   });
  839 | 
  840 |   /**
  841 |    * TC44: HabitForm - creates a new habit successfully
  842 |    */
  843 |   test('TC44 - HabitForm - creates a new habit successfully', async ({ page }) => {
  844 |     await page.goto('/');
  845 |     const habitName = `Test Habit ${Date.now()}`;
  846 |     await newHabitNameField(page).fill(habitName);
  847 |     await newHabitCategoryField(page).selectOption('General');
  848 |     await newHabitTargetField(page).selectOption('3');
  849 |     await newHabitNotesField(page).fill('Test notes');
  850 |     await submitAddHabitButton(page).click();
  851 |     const habitCard = habitCardLocator(page, habitName);
  852 |     await expect(habitCard).toBeVisible();
  853 |   });
  854 | 
  855 |   /**
  856 |    * TC45: HabitCard - edits an existing habit\\\'s name, category, target per week, and notes
  857 |    */
  858 |   test('TC45 - HabitCard - edits an existing habit\\\\\\\'s name, category, target per week, and notes', async ({ page }) => {
  859 |     await page.goto('/');
  860 |     const originalName = `Original Habit ${Date.now()}`;
  861 |     const updatedName = `Updated Habit ${Date.now()}`;
  862 |     await page.getByLabel('New habit name').fill(originalName);
  863 |     await page.getByRole('button', { name: 'Add habit' }).click();
  864 |     const habitCard = page.getByRole('listitem').filter({ hasText: originalName });
  865 |     await expect(habitCard).toBeVisible();
  866 |     await habitCard.getByRole('button', { name: `Edit` }).click();
  867 |     const nameInput = page.getByLabel(`Edit name for ${originalName}`);
  868 |     await expect(nameInput).toHaveValue(originalName);
  869 |     await nameInput.fill(updatedName);
  870 |     await page.getByLabel(`Edit category for ${originalName}`).selectOption('Health');
  871 |     await page.getByLabel(`Edit times per week for ${originalName}`).selectOption('3');
  872 |     await page.getByLabel(`Edit notes for ${originalName}`).fill('Updated notes');
  873 |     await page.getByRole('button', { name: 'Save' }).click();
  874 |     await expect(page.getByRole('listitem').filter({ hasText: updatedName })).toBeVisible();
  875 |   });
  876 | 
  877 |   /**
  878 |    * TC46: HabitCard - marks a habit as completed today
  879 |    */
  880 |   test('TC46 - HabitCard - marks a habit as completed today', async ({ page }) => {
  881 |     await page.goto('/');
  882 |     const habitName = `Complete Habit ${Date.now()}`;
  883 |     await page.getByLabel('New habit name').fill(habitName);
  884 |     await submitAddHabitButton(page).click();
  885 |     const habitCard = habitCardLocator(page, habitName);
> 886 |     await expect(habitCard).toBeVisible();
      |                             ^ Error: expect(locator).toBeVisible() failed
  887 |     const markDoneButton = habitCard.getByRole('button', { name: 'Mark done' });
  888 |     await markDoneButton.click();
  889 |     const doneTodayButton = habitCard.getByRole('button', { name: 'Done today' });
  890 |     await expect(doneTodayButton).toBeVisible();
  891 |     await expect(doneTodayButton).toBeDisabled();
  892 |   });
  893 | 
  894 |   /**
  895 |    * TC47: HabitCard - toggles archive and unarchive of a habit
  896 |    */
  897 |   test('TC47 - HabitCard - toggles archive and unarchive of a habit', async ({ page }) => {
  898 |     await page.goto('/');
  899 |     const habitName = `Archive Habit ${Date.now()}`;
  900 |     await page.getByLabel('New habit name').fill(habitName);
  901 |     const addButton = submitAddHabitButton(page);
  902 |     await expect(addButton).toBeEnabled();
  903 |     await addButton.click();
  904 |     const habitCard = habitCardLocator(page, habitName);
  905 |     await expect(habitCard).toBeVisible();
  906 |     const archiveButton = habitCard.getByRole('button', { name: `Archive ${habitName}` });
  907 |     await archiveButton.click();
  908 |     await expect(habitCardLocator(page, habitName)).toHaveCount(0);
  909 |     await showArchivedToggle(page).check();
  910 |     const archivedHabitCard = habitCardLocator(page, habitName);
  911 |     await expect(archivedHabitCard).toBeVisible();
  912 |     const unarchiveButton = archivedHabitCard.getByRole('button', { name: `Unarchive ${habitName}` });
  913 |     await unarchiveButton.click();
  914 |     await expect(habitCardLocator(page, habitName)).toHaveCount(1);
  915 |   });
  916 | 
  917 |   /**
  918 |    * TC48: Home - filters habits by category
  919 |    */
  920 |   test('TC48 - Home - filters habits by category', async ({ page }) => {
  921 |     await page.goto('/');
  922 |     const habitName1 = `Filter Habit 1 ${Date.now()}`;
  923 |     const habitName2 = `Filter Habit 2 ${Date.now()}`;
  924 |     await page.getByLabel('New habit name').fill(habitName1);
  925 |     await page.getByLabel('Habit category').selectOption('Health');
  926 |     await submitAddHabitButton(page).click();
  927 |     await expect(habitCardLocator(page, habitName1)).toBeVisible();
  928 |     await page.getByLabel('New habit name').fill(habitName2);
  929 |     await page.getByLabel('Habit category').selectOption('Work');
  930 |     await submitAddHabitButton(page).click();
  931 |     await expect(habitCardLocator(page, habitName2)).toBeVisible();
  932 |     await page.getByLabel('Filter by category').selectOption('Health');
  933 |     await expect(habitCardLocator(page, habitName1)).toBeVisible();
  934 |     await expect(habitCardLocator(page, habitName2)).toHaveCount(0);
  935 |   });
  936 | 
  937 |   /**
  938 |    * TC49: Home - searches for habits by name
  939 |    */
  940 |   test('TC49 - Home - searches for habits by name', async ({ page }) => {
  941 |     await page.goto('/');
  942 |     const habitName = `Search Habit ${Date.now()}`;
  943 |     await page.getByLabel('New habit name').fill(habitName);
  944 |     await submitAddHabitButton(page).click();
  945 |     await expect(habitCardLocator(page, habitName)).toBeVisible();
  946 |     const searchInput = page.getByLabel('Search habits by name');
  947 |     await searchInput.fill(habitName.slice(0, 5));
  948 |     await expect(habitCardLocator(page, habitName)).toBeVisible();
  949 |     await searchInput.fill('nomatchterm');
  950 |     await expect(page.getByText(new RegExp(`No habits match "nomatchterm"\.`))).toBeVisible();
  951 |   });
  952 | 
  953 |   /**
  954 |    * TC50: Home - sorts habits by different criteria updates visible list
  955 |    */
  956 |   test('TC50 - Home - sorts habits by different criteria updates visible list', async ({ page }) => {
  957 |     await page.goto('/');
  958 |     const habitName1 = `Sort Habit A ${Date.now()}`;
  959 |     const habitName2 = `Sort Habit B ${Date.now()}`;
  960 |     await page.getByLabel('New habit name').fill(habitName1);
  961 |     const addButton1 = submitAddHabitButton(page);
  962 |     await expect(addButton1).toBeEnabled();
  963 |     await addButton1.click();
  964 |     await expect(habitCardLocator(page, habitName1)).toBeVisible();
  965 |     await page.getByLabel('New habit name').fill(habitName2);
  966 |     const addButton2 = submitAddHabitButton(page);
  967 |     await expect(addButton2).toBeEnabled();
  968 |     await addButton2.click();
  969 |     await expect(habitCardLocator(page, habitName2)).toBeVisible();
  970 |     const sortSelect = page.getByLabel('Sort habits by');
  971 |     const sortValues = ['name', 'streak', 'category', 'target_per_week'];
  972 |     for (const val of sortValues) {
  973 |       await sortSelect.selectOption(val);
  974 |       await expect(page.getByRole('list')).toBeVisible();
  975 |     }
  976 |   });
  977 | 
  978 |   /**
  979 |    * TC51: Home - toggles show archived checkbox updates habits list
  980 |    */
  981 |   test('TC51 - Home - toggles show archived checkbox updates habits list', async ({ page }) => {
  982 |     await page.goto('/');
  983 |     const checkbox = page.getByRole('checkbox', { name: 'Show archived' });
  984 |     await checkbox.check();
  985 |     await expect(page.getByRole('list')).toBeVisible();
  986 |     await checkbox.uncheck();
```