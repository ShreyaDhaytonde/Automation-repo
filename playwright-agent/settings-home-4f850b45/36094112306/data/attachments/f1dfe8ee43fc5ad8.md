# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> Home >> TC42 - HabitCard - edits a habit\'s name, category, target per week, and notes successfully
- Location: tests/home.spec.ts:854:7

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByRole('listitem').filter({ hasText: 'EditTest 1790310519415' }).getByRole('button', { name: 'Save' })

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - main [ref=e3]:
    - generic [ref=e4]:
      - generic [ref=e5]:
        - heading "Habit Tracker" [level=1] [ref=e6]
        - paragraph [ref=e7]: Build small daily habits, one day at a time.
        - paragraph [ref=e8]: Friday, September 25
        - paragraph [ref=e9]: 0/2 done today
      - generic [ref=e10]:
        - link "History" [ref=e11] [cursor=pointer]:
          - /url: /history
        - link "View stats" [ref=e12] [cursor=pointer]:
          - /url: /stats
        - link "Archive" [ref=e13] [cursor=pointer]:
          - /url: /archive
        - link "Settings" [ref=e14] [cursor=pointer]:
          - /url: /settings
        - button "Switch to dark mode" [ref=e15]: 🌙 Dark
        - button "Logout" [ref=e16]
    - generic [ref=e18]:
      - textbox "New habit name" [ref=e19]:
        - /placeholder: e.g. Drink more water
      - combobox "Habit category" [ref=e20]:
        - option "General" [selected]
        - option "Health"
        - option "Work"
        - option "Personal"
        - option "Learning"
      - combobox "Times per week" [ref=e21]:
        - option "1x / week"
        - option "2x / week"
        - option "3x / week"
        - option "4x / week"
        - option "5x / week"
        - option "6x / week"
        - option "7x / week" [selected]
      - textbox "Notes (optional)" [ref=e22]
      - button "Add habit" [disabled] [ref=e23]
    - generic [ref=e24]:
      - generic [ref=e25]: Search habits by name
      - searchbox "Search habits by name" [ref=e26]
      - generic [ref=e27]: Sort by
      - combobox "Sort habits by" [ref=e28]:
        - option "Name (A-Z)" [selected]
        - option "Streak (highest first)"
        - option "Category"
        - option "Priority (highest first)"
        - option "Weekly target (highest first)"
    - generic [ref=e29]:
      - generic [ref=e30]:
        - generic [ref=e31]: Filter by category
        - combobox "Filter by category" [ref=e32]:
          - option "All" [selected]
          - option "General"
          - option "Health"
          - option "Work"
          - option "Personal"
          - option "Learning"
      - generic [ref=e33]:
        - generic [ref=e34]: Filter by priority
        - combobox "Filter by priority" [ref=e35]:
          - option "All" [selected]
          - option "Low"
          - option "Medium"
          - option "High"
      - generic [ref=e36]:
        - checkbox "Show archived" [ref=e37]
        - text: Show archived
      - generic [ref=e38]:
        - button "Complete all for today (2)" [ref=e39]
        - button "Export JSON" [ref=e40]
        - button "Export CSV" [ref=e41]
        - button "Import CSV" [ref=e42]
    - list [ref=e43]:
      - listitem [ref=e44]:
        - generic [ref=e45]:
          - textbox "Edit name for EditTest 1790310519415" [ref=e46]: EditTest 1790310519415 Updated
          - combobox "Edit category for EditTest 1790310519415" [ref=e47]:
            - option "General"
            - option "Health" [selected]
            - option "Work"
            - option "Personal"
            - option "Learning"
          - combobox "Edit times per week for EditTest 1790310519415" [ref=e48]:
            - option "1x / week"
            - option "2x / week"
            - option "3x / week"
            - option "4x / week"
            - option "5x / week" [selected]
            - option "6x / week"
            - option "7x / week"
          - textbox "Edit notes for EditTest 1790310519415" [active] [ref=e49]:
            - /placeholder: Notes (optional)
            - text: Updated notes
          - button "Save" [ref=e50]
          - button "Cancel" [ref=e51]
      - listitem [ref=e52]:
        - generic:
          - generic:
            - button "Pin Habit 1790310456907" [ref=e53]: ☆
            - paragraph [ref=e54]: Habit 1790310456907
            - generic [ref=e55]: General
            - button "Cycle priority for Habit 1790310456907, currently Medium" [ref=e56]: Medium
            - status "Habit 1790310456907 is at risk of missing its weekly goal" [ref=e57]: ⏰ Due today
          - paragraph: Start your streak today!
          - generic:
            - progressbar "Habit 1790310456907 weekly progress"
            - generic [ref=e58]: 0/7 this week
          - paragraph: Test notes
        - generic [ref=e59]:
          - button "Mark done" [ref=e60]
          - button "Freeze Habit 1790310456907 for today" [ref=e61]: 🧊 Freeze
          - button "Edit Habit 1790310456907" [ref=e62]: Edit
          - button "Duplicate Habit 1790310456907" [ref=e63]: Duplicate
          - button "Archive Habit 1790310456907" [ref=e64]: Archive
          - button "Delete Habit 1790310456907" [ref=e65]: Remove
  - alert [ref=e66]
```

# Test source

```ts
  769 |     const sortValues = ['name', 'streak', 'category', 'target_per_week'];
  770 |     for (const val of sortValues) {
  771 |       await sortSelect.selectOption(val);
  772 |       await expect(page.getByRole('list')).toBeVisible();
  773 |     }
  774 |   });
  775 | 
  776 |   /**
  777 |    * TC38: Home - toggles show archived checkbox updates habits list
  778 |    */
  779 |   test('TC38 - Home - toggles show archived checkbox updates habits list', async ({ page }) => {
  780 |     await page.goto('/');
  781 |     const checkbox = page.getByRole('checkbox', { name: 'Show archived' });
  782 |     await checkbox.check();
  783 |     await expect(page.getByRole('list')).toBeVisible();
  784 |     await checkbox.uncheck();
  785 |     await expect(page.getByRole('list')).toBeVisible();
  786 |   });
  787 | 
  788 |   /**
  789 |    * TC39: Home - completes all incomplete habits for today with bulk action
  790 |    */
  791 |   test('TC39 - Home - completes all incomplete habits for today with bulk action', async ({ page }) => {
  792 |     await page.goto('/');
  793 |     const habitName1 = `Bulk Complete Habit 1 ${Date.now()}`;
  794 |     const habitName2 = `Bulk Complete Habit 2 ${Date.now()}`;
  795 |     await page.getByLabel('New habit name').fill(habitName1);
  796 |     const addButton1 = submitAddHabitButton(page);
  797 |     await expect(addButton1).toBeEnabled();
  798 |     await addButton1.click();
  799 |     await expect(habitCardLocator(page, habitName1)).toBeVisible();
  800 |     await page.getByLabel('New habit name').fill(habitName2);
  801 |     const addButton2 = submitAddHabitButton(page);
  802 |     await expect(addButton2).toBeEnabled();
  803 |     await addButton2.click();
  804 |     await expect(habitCardLocator(page, habitName2)).toBeVisible();
  805 |     const completeAllButton = page.getByRole('button', { name: /Complete all for today/ });
  806 |     await expect(completeAllButton).toBeEnabled();
  807 |     await completeAllButton.click();
  808 |     // The bulk action can settle before this assertion polls, so wait for the transient
  809 |     // "Completing…" label to clear rather than pinning the exact instant. The button
  810 |     // legitimately stays disabled afterward once nothing is left pending, so "enabled"
  811 |     // is not a reliable end state to assert on either.
  812 |     await expect(completeAllButton).not.toHaveText(/Completing…/, { timeout: 15_000 });
  813 |   });
  814 | 
  815 |   /**
  816 |    * TC40: Home - page loads with unconditional elements visible
  817 |    */
  818 |   test('TC40 - Home - page loads with unconditional elements visible', async ({ page }) => {
  819 |     await page.goto('/');
  820 |     await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
  821 |     await expect(page.getByRole('textbox', { name: 'New habit name' })).toBeVisible();
  822 |     await expect(page.getByLabel('Habit category')).toBeVisible();
  823 |     await expect(page.getByLabel('Times per week')).toBeVisible();
  824 |     await expect(page.getByLabel('Notes (optional)')).toBeVisible();
  825 |     await expect(page.getByRole('button', { name: 'Add habit' })).toBeVisible();
  826 |     await expect(page.getByRole('searchbox', { name: 'Search habits by name' })).toBeVisible();
  827 |     await expect(page.getByLabel('Sort habits by')).toBeVisible();
  828 |     await expect(page.getByLabel('Filter by category')).toBeVisible();
  829 |     await expect(page.getByRole('checkbox', { name: 'Show archived' })).toBeVisible();
  830 |     await expect(page.getByRole('link', { name: 'View stats' })).toBeVisible();
  831 |     await expect(page.getByRole('button', { name: 'Complete all for today' })).toBeVisible();
  832 |     await expect(page.getByRole('button', { name: 'Export JSON' })).toBeVisible();
  833 |     await expect(page.getByRole('button', { name: 'Export CSV' })).toBeVisible();
  834 |   });
  835 | 
  836 |   /**
  837 |    * TC41: HabitForm - adds a new habit successfully
  838 |    */
  839 |   test('TC41 - HabitForm - adds a new habit successfully', async ({ page }) => {
  840 |     await page.goto('/');
  841 |     const uniqueName = `Habit ${Date.now()}`;
  842 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(uniqueName);
  843 |     await page.getByLabel('Habit category').selectOption('General');
  844 |     await page.getByLabel('Times per week').selectOption('7x / week');
  845 |     await page.getByLabel('Notes (optional)').fill('Test notes');
  846 |     await page.getByRole('button', { name: 'Add habit' }).click();
  847 |     const habitCard = page.getByRole('listitem').filter({ hasText: uniqueName });
  848 |     await expect(habitCard).toBeVisible();
  849 |   });
  850 | 
  851 |   /**
  852 |    * TC42: HabitCard - edits a habit\'s name, category, target per week, and notes successfully
  853 |    */
  854 |   test('TC42 - HabitCard - edits a habit\\\'s name, category, target per week, and notes successfully', async ({ page }) => {
  855 |     await page.goto('/');
  856 |     const originalName = `EditTest ${Date.now()}`;
  857 |     const newName = `${originalName} Updated`;
  858 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(originalName);
  859 |     await page.getByRole('button', { name: 'Add habit' }).click();
  860 |     const habitItem = page.getByRole('listitem').filter({ hasText: originalName });
  861 |     await expect(habitItem).toBeVisible();
  862 |     await habitItem.getByRole('button', { name: `Edit ${originalName}` }).click();
  863 |     const nameInput = page.getByLabel(`Edit name for ${originalName}`);
  864 |     await expect(nameInput).toHaveValue(originalName);
  865 |     await nameInput.fill(newName);
  866 |     await page.getByLabel(`Edit category for ${originalName}`).selectOption('Health');
  867 |     await page.getByLabel(`Edit times per week for ${originalName}`).selectOption('5');
  868 |     await page.getByLabel(`Edit notes for ${originalName}`).fill('Updated notes');
> 869 |     await habitItem.getByRole('button', { name: 'Save' }).click();
      |                                                           ^ Error: locator.click: Test timeout of 60000ms exceeded.
  870 |     const updatedHabitItem = page.getByRole('listitem').filter({ hasText: newName });
  871 |     await expect(updatedHabitItem).toBeVisible();
  872 |   });
  873 | 
  874 |   /**
  875 |    * TC43: HabitCard - marks a habit as done today button disables afterward
  876 |    */
  877 |   test('TC43 - HabitCard - marks a habit as done today button disables afterward', async ({ page }) => {
  878 |     await page.goto('/');
  879 |     const habitName = `CompleteTest ${Date.now()}`;
  880 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
  881 |     await page.getByRole('button', { name: 'Add habit' }).click();
  882 |     const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
  883 |     await expect(habitCard).toBeVisible();
  884 |     const markDoneButton = habitCard.getByRole('button', { name: 'Mark done' });
  885 |     await markDoneButton.click();
  886 |     await expect(habitCard.getByRole('button', { name: 'Done today' })).toBeVisible();
  887 |     await expect(habitCard.getByRole('button', { name: 'Done today' })).toBeDisabled();
  888 |   });
  889 | 
  890 |   /**
  891 |    * TC44: HabitCard - archives and unarchives a habit
  892 |    */
  893 |   test('TC44 - HabitCard - archives and unarchives a habit', async ({ page }) => {
  894 |     await page.goto('/');
  895 |     const habitName = `ArchiveTest ${Date.now()}`;
  896 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
  897 |     await page.getByRole('button', { name: 'Add habit' }).click();
  898 |     const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
  899 |     await expect(habitCard).toBeVisible();
  900 |     await habitCard.getByRole('button', { name: `Archive ${habitName}` }).click();
  901 |     await expect(page.getByRole('listitem').filter({ hasText: habitName })).toHaveCount(0);
  902 |     await page.getByRole('checkbox', { name: 'Show archived' }).check();
  903 |     const archivedHabitCard = page.getByRole('listitem').filter({ hasText: habitName });
  904 |     await expect(archivedHabitCard.getByRole('button', { name: `Unarchive ${habitName}` })).toBeVisible();
  905 |   });
  906 | 
  907 |   /**
  908 |    * TC45: HabitCard - removes a habit after confirm dialog
  909 |    */
  910 |   test('TC45 - HabitCard - removes a habit after confirm dialog', async ({ page }) => {
  911 |     await page.goto('/');
  912 |     const habitName = `DeleteTest ${Date.now()}`;
  913 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
  914 |     await page.getByRole('button', { name: 'Add habit' }).click();
  915 |     const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
  916 |     await expect(habitCard).toBeVisible();
  917 |     page.on('dialog', (dialog) => dialog.accept());
  918 |     await habitCard.getByRole('button', { name: `Delete ${habitName}` }).click();
  919 |     await expect(page.getByRole('listitem').filter({ hasText: habitName })).toHaveCount(0);
  920 |   });
  921 | 
  922 |   /**
  923 |    * TC46: Search box - filters habit list by matching name
  924 |    */
  925 |   test('TC46 - Search box - filters habit list by matching name', async ({ page }) => {
  926 |     await page.goto('/');
  927 |     const uniqueName = `SearchTest ${Date.now()}`;
  928 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(uniqueName);
  929 |     await page.getByRole('button', { name: 'Add habit' }).click();
  930 |     await expect(page.getByRole('listitem').filter({ hasText: uniqueName })).toBeVisible();
  931 |     const searchBox = page.getByLabel('Search habits by name');
  932 |     await searchBox.fill(uniqueName);
  933 |     await expect(page.getByRole('listitem').filter({ hasText: uniqueName })).toBeVisible();
  934 |     await searchBox.fill('nonexistentsearchterm' + Date.now());
  935 |     await expect(page.getByText(new RegExp(`No habits match "nonexistentsearchterm`))).toBeVisible();
  936 |   });
  937 | 
  938 |   /**
  939 |    * TC47: Category filter - filters habit list by category
  940 |    */
  941 |   test('TC47 - Category filter - filters habit list by category', async ({ page }) => {
  942 |     await page.goto('/');
  943 |     const uniqueName = `CategoryTest ${Date.now()}`;
  944 |     await newHabitNameField(page).fill(uniqueName);
  945 |     await page.getByLabel('Habit category').selectOption('Health');
  946 |     await submitAddHabitButton(page).click();
  947 |     await expect(habitCardLocator(page, uniqueName)).toBeVisible();
  948 |     await page.getByLabel('Filter by category').selectOption('Health');
  949 |     await expect(habitCardLocator(page, uniqueName)).toBeVisible();
  950 |   });
  951 | 
  952 |   /**
  953 |    * TC48: Sort by dropdown - sorts habit list by name ascending
  954 |    */
  955 |   test('TC48 - Sort by dropdown - sorts habit list by name ascending', async ({ page }) => {
  956 |     await page.goto('/');
  957 |     const uniqueNameA = `SortA ${Date.now()}`;
  958 |     const uniqueNameB = `SortB ${Date.now() + 1}`;
  959 |     await newHabitNameField(page).fill(uniqueNameB);
  960 |     await submitAddHabitButton(page).click();
  961 |     await expect(habitCardLocator(page, uniqueNameB)).toBeVisible();
  962 |     await newHabitNameField(page).fill(uniqueNameA);
  963 |     await submitAddHabitButton(page).click();
  964 |     await expect(habitCardLocator(page, uniqueNameA)).toBeVisible();
  965 |     await sortByControl(page).selectOption('name');
  966 |     const habitCards = await page.getByRole('listitem').all();
  967 |     const texts = await Promise.all(habitCards.map((habitCard) => habitCard.textContent()));
  968 |     const sorted = texts.every((text, i, arr) => !i || (text?.localeCompare(arr[i-1]!) ?? -1) >= 0);
  969 |     expect(sorted).toBe(true);
```