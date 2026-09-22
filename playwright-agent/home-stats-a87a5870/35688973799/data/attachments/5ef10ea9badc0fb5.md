# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> Home >> TC51 - HabitCard - toggles archive and unarchive of a habit
- Location: tests/home.spec.ts:938:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('listitem').filter({ hasText: 'Archive Habit 1790053732009' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('listitem').filter({ hasText: 'Archive Habit 1790053732009' }) with timeout 10000ms
  - waiting for getByRole('listitem').filter({ hasText: 'Archive Habit 1790053732009' })

```

```yaml
- main:
  - heading "Habit Tracker" [level=1]
  - paragraph: Build small daily habits, one day at a time.
  - paragraph: Tuesday, September 22
  - paragraph: 1/7 done today
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
  - button "Complete all for today (6)"
  - button "Export JSON"
  - button "Export CSV"
  - list:
    - listitem:
      - paragraph: Archive Habit 1790053592087
      - text: General
      - paragraph: Start your streak today!
      - progressbar "Archive Habit 1790053592087 weekly progress"
      - text: 0/3 this week
      - button "Mark done"
      - button "Freeze Archive Habit 1790053592087 for today": 🧊 Freeze
      - button "Edit Archive Habit 1790053592087": Edit
      - button "Duplicate Archive Habit 1790053592087": Duplicate
      - button "Archive Archive Habit 1790053592087": Archive
      - button "Delete Archive Habit 1790053592087": Remove
    - listitem:
      - paragraph: Archive Habit 1790053655099
      - text: General
      - paragraph: Start your streak today!
      - progressbar "Archive Habit 1790053655099 weekly progress"
      - text: 0/3 this week
      - button "Mark done"
      - button "Freeze Archive Habit 1790053655099 for today": 🧊 Freeze
      - button "Edit Archive Habit 1790053655099": Edit
      - button "Duplicate Archive Habit 1790053655099": Duplicate
      - button "Archive Archive Habit 1790053655099": Archive
      - button "Delete Archive Habit 1790053655099": Remove
    - listitem:
      - paragraph: Complete Habit 1790053730775
      - text: General
      - paragraph: 🔥 1 day streak
      - progressbar "Complete Habit 1790053730775 weekly progress"
      - text: 1/7 this week
      - button "Done today" [disabled]
      - button "Freeze Complete Habit 1790053730775 for today" [disabled]: 🧊 Freeze
      - button "Edit Complete Habit 1790053730775": Edit
      - button "Duplicate Complete Habit 1790053730775": Duplicate
      - button "Archive Complete Habit 1790053730775": Archive
      - button "Delete Complete Habit 1790053730775": Remove
    - listitem:
      - paragraph: Duplicate Habit 1790053717969
      - text: General
      - paragraph: Start your streak today!
      - progressbar "Duplicate Habit 1790053717969 weekly progress"
      - text: 0/3 this week
      - button "Mark done"
      - button "Freeze Duplicate Habit 1790053717969 for today": 🧊 Freeze
      - button "Edit Duplicate Habit 1790053717969": Edit
      - button "Duplicate Duplicate Habit 1790053717969": Duplicate
      - button "Archive Duplicate Habit 1790053717969": Archive
      - button "Delete Duplicate Habit 1790053717969": Remove
    - listitem:
      - paragraph: Duplicate Habit 1790053717969 (copy)
      - text: General
      - paragraph: Start your streak today!
      - progressbar "Duplicate Habit 1790053717969 (copy) weekly progress"
      - text: 0/3 this week
      - button "Mark done"
      - button "Freeze Duplicate Habit 1790053717969 (copy) for today": 🧊 Freeze
      - button "Edit Duplicate Habit 1790053717969 (copy)": Edit
      - button "Duplicate Duplicate Habit 1790053717969 (copy)": Duplicate
      - button "Archive Duplicate Habit 1790053717969 (copy)": Archive
      - button "Delete Duplicate Habit 1790053717969 (copy)": Remove
    - listitem:
      - paragraph: Skip Habit 1790053466412
      - text: General
      - paragraph: Start your streak today!
      - progressbar "Skip Habit 1790053466412 weekly progress"
      - text: 0/3 this week
      - button "Mark done"
      - button "Freeze Skip Habit 1790053466412 for today": 🧊 Freeze
      - button "Edit Skip Habit 1790053466412": Edit
      - button "Duplicate Skip Habit 1790053466412": Duplicate
      - button "Archive Skip Habit 1790053466412": Archive
      - button "Delete Skip Habit 1790053466412": Remove
    - listitem:
      - paragraph: Skip Habit 1790053529053
      - text: General
      - paragraph: Start your streak today!
      - progressbar "Skip Habit 1790053529053 weekly progress"
      - text: 0/3 this week
      - button "Mark done"
      - button "Freeze Skip Habit 1790053529053 for today": 🧊 Freeze
      - button "Edit Skip Habit 1790053529053": Edit
      - button "Duplicate Skip Habit 1790053529053": Duplicate
      - button "Archive Skip Habit 1790053529053": Archive
      - button "Delete Skip Habit 1790053529053": Remove
- alert
```

# Test source

```ts
  846  |     await page.goto('/');
  847  |     const archName = 'Archive Test ' + Date.now();
  848  |     await page.getByLabel('New habit name').fill(archName);
  849  |     await page.getByRole('button', { name: 'Add habit' }).click();
  850  |     const habitCard = page.getByRole('listitem').filter({ hasText: archName });
  851  |     await habitCard.getByRole('button', { name: `Archive ${archName}` }).click();
  852  |     await expect(page.getByRole('listitem').filter({ hasText: archName })).toHaveCount(0);
  853  |     const showArchivedCheckbox = page.getByLabel('Show archived');
  854  |     await showArchivedCheckbox.check();
  855  |     const archivedHabitCard = page.getByRole('listitem').filter({ hasText: archName });
  856  |     await expect(archivedHabitCard).toBeVisible();
  857  |   });
  858  | 
  859  |   /**
  860  |    * TC47: Home page - Complete all for today bulk action disables button and updates label
  861  |    */
  862  |   test('TC47 - Home page - Complete all for today bulk action disables button and updates label', async ({ page }) => {
  863  |     await page.goto('/');
  864  |     const habit1 = `BulkComplete 1 ${Date.now()}`;
  865  |     const habit2 = `BulkComplete 2 ${Date.now()}`;
  866  |     await page.getByLabel('New habit name').fill(habit1);
  867  |     await page.getByLabel('Habit category').selectOption('General');
  868  |     await page.getByRole('button', { name: 'Add habit' }).click();
  869  |     await expect(page.getByRole('listitem').filter({ hasText: habit1 })).toBeVisible();
  870  |     await page.getByLabel('New habit name').fill(habit2);
  871  |     await page.getByLabel('Habit category').selectOption('General');
  872  |     await page.getByRole('button', { name: 'Add habit' }).click();
  873  |     await expect(page.getByRole('listitem').filter({ hasText: habit2 })).toBeVisible();
  874  |     const bulkCompleteButton = page.getByRole('button', { name: /^Complete all for today/ });
  875  |     await expect(bulkCompleteButton).toBeEnabled();
  876  |     await bulkCompleteButton.click();
  877  |     await expect(bulkCompleteButton).not.toHaveText(/Completing…/, { timeout: 15000 });
  878  |   });
  879  | 
  880  |   /**
  881  |    * TC48: Home page - Export JSON and CSV buttons visibility and disabled state
  882  |    */
  883  |   test('TC48 - Home page - Export JSON and CSV buttons visibility and disabled state', async ({ page }) => {
  884  |     await page.goto('/');
  885  |     const exportJsonButton = page.getByRole('button', { name: 'Export JSON' });
  886  |     const exportCsvButton = page.getByRole('button', { name: 'Export CSV' });
  887  |     await expect(exportJsonButton).toBeVisible();
  888  |     await expect(exportCsvButton).toBeVisible();
  889  |     await expect(exportJsonButton).toBeDisabled();
  890  |     await expect(exportCsvButton).toBeDisabled();
  891  |     await page.getByLabel('New habit name').fill('Export Test ' + Date.now());
  892  |     await page.getByRole('button', { name: 'Add habit' }).click();
  893  |     await expect(exportJsonButton).toBeEnabled();
  894  |     await expect(exportCsvButton).toBeEnabled();
  895  |   });
  896  | 
  897  |   /**
  898  |    * TC49: HabitCard - edits an existing habit\\\'s name, category, target per week, and notes
  899  |    */
  900  |   test('TC49 - HabitCard - edits an existing habit\\\\\\\'s name, category, target per week, and notes', async ({ page }) => {
  901  |     await page.goto('/');
  902  |     const originalName = `Original Habit ${Date.now()}`;
  903  |     const updatedName = `Updated Habit ${Date.now()}`;
  904  |     await page.getByLabel('New habit name').fill(originalName);
  905  |     await page.getByRole('button', { name: 'Add habit' }).click();
  906  |     const habitCard = page.getByRole('listitem').filter({ hasText: originalName });
  907  |     await expect(habitCard).toBeVisible();
  908  |     await habitCard.getByRole('button', { name: `Edit` }).click();
  909  |     const nameInput = page.getByLabel(`Edit name for ${originalName}`);
  910  |     await expect(nameInput).toHaveValue(originalName);
  911  |     await nameInput.fill(updatedName);
  912  |     await page.getByLabel(`Edit category for ${originalName}`).selectOption('Health');
  913  |     await page.getByLabel(`Edit times per week for ${originalName}`).selectOption('3');
  914  |     await page.getByLabel(`Edit notes for ${originalName}`).fill('Updated notes');
  915  |     await page.getByRole('button', { name: 'Save' }).click();
  916  |     await expect(page.getByRole('listitem').filter({ hasText: updatedName })).toBeVisible();
  917  |   });
  918  | 
  919  |   /**
  920  |    * TC50: HabitCard - marks a habit as completed today
  921  |    */
  922  |   test('TC50 - HabitCard - marks a habit as completed today', async ({ page }) => {
  923  |     await page.goto('/');
  924  |     const habitName = `Complete Habit ${Date.now()}`;
  925  |     await page.getByLabel('New habit name').fill(habitName);
  926  |     await page.getByRole('button', { name: 'Add habit' }).click();
  927  |     const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
  928  |     await expect(habitCard).toBeVisible();
  929  |     const markDoneButton = habitCard.getByRole('button', { name: 'Mark done' });
  930  |     await markDoneButton.click();
  931  |     await expect(habitCard.getByRole('button', { name: 'Done today' })).toBeVisible();
  932  |     await expect(habitCard.getByRole('button', { name: 'Done today' })).toBeDisabled();
  933  |   });
  934  | 
  935  |   /**
  936  |    * TC51: HabitCard - toggles archive and unarchive of a habit
  937  |    */
  938  |   test('TC51 - HabitCard - toggles archive and unarchive of a habit', async ({ page }) => {
  939  |     await page.goto('/');
  940  |     const habitName = `Archive Habit ${Date.now()}`;
  941  |     await page.getByLabel('New habit name').fill(habitName);
  942  |     const addButton = page.getByRole('button', { name: 'Add habit' });
  943  |     await expect(addButton).toBeEnabled();
  944  |     await addButton.click();
  945  |     const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
> 946  |     await expect(habitCard).toBeVisible();
       |                             ^ Error: expect(locator).toBeVisible() failed
  947  |     const archiveButton = habitCard.getByRole('button', { name: `Archive ${habitName}` });
  948  |     await archiveButton.click();
  949  |     await expect(page.getByRole('listitem').filter({ hasText: habitName })).toHaveCount(0);
  950  |     const showArchivedCheckbox = page.getByLabel('Show archived');
  951  |     await showArchivedCheckbox.check();
  952  |     const archivedHabitCard = page.getByRole('listitem').filter({ hasText: habitName });
  953  |     await expect(archivedHabitCard).toBeVisible();
  954  |     const unarchiveButton = archivedHabitCard.getByRole('button', { name: `Unarchive ${habitName}` });
  955  |     await unarchiveButton.click();
  956  |     await expect(page.getByRole('listitem').filter({ hasText: habitName })).toHaveCount(1);
  957  |   });
  958  | 
  959  |   /**
  960  |    * TC52: Home - filters habits by category
  961  |    */
  962  |   test('TC52 - Home - filters habits by category', async ({ page }) => {
  963  |     await page.goto('/');
  964  |     const habitName1 = `Filter Habit 1 ${Date.now()}`;
  965  |     const habitName2 = `Filter Habit 2 ${Date.now()}`;
  966  |     await page.getByLabel('New habit name').fill(habitName1);
  967  |     await page.getByLabel('Habit category').selectOption('Health');
  968  |     await page.getByRole('button', { name: 'Add habit' }).click();
  969  |     await expect(page.getByRole('listitem').filter({ hasText: habitName1 })).toBeVisible();
  970  |     await page.getByLabel('New habit name').fill(habitName2);
  971  |     await page.getByLabel('Habit category').selectOption('Work');
  972  |     await page.getByRole('button', { name: 'Add habit' }).click();
  973  |     await expect(page.getByRole('listitem').filter({ hasText: habitName2 })).toBeVisible();
  974  |     await page.getByLabel('Filter by category').selectOption('Health');
  975  |     await expect(page.getByRole('listitem').filter({ hasText: habitName1 })).toBeVisible();
  976  |     await expect(page.getByRole('listitem').filter({ hasText: habitName2 })).toHaveCount(0);
  977  |   });
  978  | 
  979  |   /**
  980  |    * TC53: Home - searches for habits by name
  981  |    */
  982  |   test('TC53 - Home - searches for habits by name', async ({ page }) => {
  983  |     await page.goto('/');
  984  |     const habitName = `Search Habit ${Date.now()}`;
  985  |     await page.getByLabel('New habit name').fill(habitName);
  986  |     await page.getByRole('button', { name: 'Add habit' }).click();
  987  |     await expect(page.getByRole('listitem').filter({ hasText: habitName })).toBeVisible();
  988  |     const searchInput = page.getByLabel('Search habits by name');
  989  |     await searchInput.fill(habitName.slice(0, 5));
  990  |     await expect(page.getByRole('listitem').filter({ hasText: habitName })).toBeVisible();
  991  |     await searchInput.fill('nomatchterm');
  992  |     await expect(page.getByText(new RegExp(`No habits match "nomatchterm"\.`))).toBeVisible();
  993  |   });
  994  | 
  995  |   /**
  996  |    * TC54: Home - sorts habits by different criteria updates visible list
  997  |    */
  998  |   test('TC54 - Home - sorts habits by different criteria updates visible list', async ({ page }) => {
  999  |     await page.goto('/');
  1000 |     const habitName1 = `Sort Habit A ${Date.now()}`;
  1001 |     const habitName2 = `Sort Habit B ${Date.now()}`;
  1002 |     await page.getByLabel('New habit name').fill(habitName1);
  1003 |     const addButton1 = page.getByRole('button', { name: 'Add habit' });
  1004 |     await expect(addButton1).toBeEnabled();
  1005 |     await addButton1.click();
  1006 |     await expect(page.getByRole('listitem').filter({ hasText: habitName1 })).toBeVisible();
  1007 |     await page.getByLabel('New habit name').fill(habitName2);
  1008 |     const addButton2 = page.getByRole('button', { name: 'Add habit' });
  1009 |     await expect(addButton2).toBeEnabled();
  1010 |     await addButton2.click();
  1011 |     await expect(page.getByRole('listitem').filter({ hasText: habitName2 })).toBeVisible();
  1012 |     const sortSelect = page.getByLabel('Sort habits by');
  1013 |     const sortValues = ['name', 'streak', 'category', 'target_per_week'];
  1014 |     for (const val of sortValues) {
  1015 |       await sortSelect.selectOption(val);
  1016 |       await expect(page.getByRole('list')).toBeVisible();
  1017 |     }
  1018 |   });
  1019 | 
  1020 |   /**
  1021 |    * TC55: Home - toggles show archived checkbox updates habits list
  1022 |    */
  1023 |   test('TC55 - Home - toggles show archived checkbox updates habits list', async ({ page }) => {
  1024 |     await page.goto('/');
  1025 |     const checkbox = page.getByRole('checkbox', { name: 'Show archived' });
  1026 |     await checkbox.check();
  1027 |     await expect(page.getByRole('list')).toBeVisible();
  1028 |     await checkbox.uncheck();
  1029 |     await expect(page.getByRole('list')).toBeVisible();
  1030 |   });
  1031 | 
  1032 |   /**
  1033 |    * TC56: Home - completes all incomplete habits for today with bulk action
  1034 |    */
  1035 |   test('TC56 - Home - completes all incomplete habits for today with bulk action', async ({ page }) => {
  1036 |     await page.goto('/');
  1037 |     const habitName1 = `Bulk Complete Habit 1 ${Date.now()}`;
  1038 |     const habitName2 = `Bulk Complete Habit 2 ${Date.now()}`;
  1039 |     await page.getByLabel('New habit name').fill(habitName1);
  1040 |     const addButton1 = page.getByRole('button', { name: 'Add habit' });
  1041 |     await expect(addButton1).toBeEnabled();
  1042 |     await addButton1.click();
  1043 |     await expect(page.getByRole('listitem').filter({ hasText: habitName1 })).toBeVisible();
  1044 |     await page.getByLabel('New habit name').fill(habitName2);
  1045 |     const addButton2 = page.getByRole('button', { name: 'Add habit' });
  1046 |     await expect(addButton2).toBeEnabled();
```