# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> Home >> TC06 - HabitCard - edits a habit\'s name, category, target per week, and notes successfully
- Location: tests/home.spec.ts:131:7

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByRole('listitem').filter({ hasText: 'EditTest 1789886765101' }).getByRole('button', { name: 'Save' })

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - main [ref=e3]:
    - generic [ref=e4]:
      - generic [ref=e5]:
        - heading "Habit Tracker" [level=1] [ref=e6]
        - paragraph [ref=e7]: Build small daily habits, one day at a time.
      - generic [ref=e8]:
        - link "History" [ref=e9] [cursor=pointer]:
          - /url: /history
        - link "View stats" [ref=e10] [cursor=pointer]:
          - /url: /stats
        - link "Archive" [ref=e11] [cursor=pointer]:
          - /url: /archive
        - button "Switch to dark mode" [ref=e12]: 🌙 Dark
        - button "Logout" [ref=e13]
    - generic [ref=e15]:
      - textbox "New habit name" [ref=e16]:
        - /placeholder: e.g. Drink more water
      - combobox "Habit category" [ref=e17]:
        - option "General" [selected]
        - option "Health"
        - option "Work"
        - option "Personal"
        - option "Learning"
      - combobox "Times per week" [ref=e18]:
        - option "1x / week"
        - option "2x / week"
        - option "3x / week"
        - option "4x / week"
        - option "5x / week"
        - option "6x / week"
        - option "7x / week" [selected]
      - textbox "Notes (optional)" [ref=e19]
      - button "Add habit" [disabled] [ref=e20]
    - generic [ref=e21]:
      - generic [ref=e22]: Search habits by name
      - searchbox "Search habits by name" [ref=e23]
      - generic [ref=e24]: Sort by
      - combobox "Sort habits by" [ref=e25]:
        - option "Name (A-Z)" [selected]
        - option "Streak (highest first)"
        - option "Category"
        - option "Weekly target (highest first)"
    - generic [ref=e26]:
      - generic [ref=e27]:
        - generic [ref=e28]: Filter by category
        - combobox "Filter by category" [ref=e29]:
          - option "All" [selected]
          - option "General"
          - option "Health"
          - option "Work"
          - option "Personal"
          - option "Learning"
      - generic [ref=e30]:
        - checkbox "Show archived" [ref=e31]
        - text: Show archived
      - generic [ref=e32]:
        - button "Complete all for today (4)" [ref=e33]
        - button "Export JSON" [ref=e34]
        - button "Export CSV" [ref=e35]
    - list [ref=e36]:
      - listitem [ref=e37]:
        - generic:
          - generic:
            - paragraph [ref=e38]: EditTest 1789886703719
            - generic [ref=e39]: General
            - status "EditTest 1789886703719 is at risk of missing its weekly goal" [ref=e40]: ⏰ Due today
          - paragraph: Start your streak today!
          - generic:
            - progressbar "EditTest 1789886703719 weekly progress"
            - generic [ref=e41]: 0/7 this week
        - generic [ref=e42]:
          - button "Mark done" [ref=e43]
          - button "Freeze EditTest 1789886703719 for today" [ref=e44]: 🧊 Freeze
          - button "Edit EditTest 1789886703719" [ref=e45]: Edit
          - button "Duplicate EditTest 1789886703719" [ref=e46]: Duplicate
          - button "Archive EditTest 1789886703719" [ref=e47]: Archive
          - button "Delete EditTest 1789886703719" [ref=e48]: Remove
      - listitem [ref=e49]:
        - generic [ref=e50]:
          - textbox "Edit name for EditTest 1789886765101" [ref=e51]: EditTest 1789886765101 Updated
          - combobox "Edit category for EditTest 1789886765101" [ref=e52]:
            - option "General"
            - option "Health" [selected]
            - option "Work"
            - option "Personal"
            - option "Learning"
          - combobox "Edit times per week for EditTest 1789886765101" [ref=e53]:
            - option "1x / week"
            - option "2x / week"
            - option "3x / week"
            - option "4x / week"
            - option "5x / week" [selected]
            - option "6x / week"
            - option "7x / week"
          - textbox "Edit notes for EditTest 1789886765101" [active] [ref=e54]:
            - /placeholder: Notes (optional)
            - text: Updated notes
          - button "Save" [ref=e55]
          - button "Cancel" [ref=e56]
      - listitem [ref=e57]:
        - generic:
          - generic:
            - paragraph [ref=e58]: Habit 1789886702966
            - generic [ref=e59]: General
            - status "Habit 1789886702966 is at risk of missing its weekly goal" [ref=e60]: ⏰ Due today
          - paragraph: Start your streak today!
          - generic:
            - progressbar "Habit 1789886702966 weekly progress"
            - generic [ref=e61]: 0/7 this week
          - paragraph: Test notes
        - generic [ref=e62]:
          - button "Mark done" [ref=e63]
          - button "Freeze Habit 1789886702966 for today" [ref=e64]: 🧊 Freeze
          - button "Edit Habit 1789886702966" [ref=e65]: Edit
          - button "Duplicate Habit 1789886702966" [ref=e66]: Duplicate
          - button "Archive Habit 1789886702966" [ref=e67]: Archive
          - button "Delete Habit 1789886702966" [ref=e68]: Remove
      - listitem [ref=e69]:
        - generic:
          - generic:
            - paragraph [ref=e70]: Test Unarchive 1789886570695
            - generic [ref=e71]: General
            - status "Test Unarchive 1789886570695 is at risk of missing its weekly goal" [ref=e72]: ⏰ Due today
          - paragraph: Start your streak today!
          - generic:
            - progressbar "Test Unarchive 1789886570695 weekly progress"
            - generic [ref=e73]: 0/7 this week
        - generic [ref=e74]:
          - button "Mark done" [ref=e75]
          - button "Freeze Test Unarchive 1789886570695 for today" [ref=e76]: 🧊 Freeze
          - button "Edit Test Unarchive 1789886570695" [ref=e77]: Edit
          - button "Duplicate Test Unarchive 1789886570695" [ref=e78]: Duplicate
          - button "Archive Test Unarchive 1789886570695" [ref=e79]: Archive
          - button "Delete Test Unarchive 1789886570695" [ref=e80]: Remove
  - alert [ref=e81]
```

# Test source

```ts
  46  |     await duplicateButton.click();
  47  |     // The duplicated habit should appear with the expected suffix (copy)
  48  |     const copyNamePartial = ' (copy)';
  49  |     const duplicatedHabitItem = page.getByRole('listitem').filter({ hasText: `${habitName}${copyNamePartial}` });
  50  |     await expect(duplicatedHabitItem).toBeVisible();
  51  |     // Verify the category badge matches (visible text from the original category)
  52  |     const categoryBadgeOriginal = habitItem.getByText('Exercise');
  53  |     await expect(categoryBadgeOriginal).toBeVisible();
  54  |     const categoryBadgeCopy = duplicatedHabitItem.getByText('Exercise');
  55  |     await expect(categoryBadgeCopy).toBeVisible();
  56  |   });
  57  | 
  58  |   // ──────────────────────────────────────────────────────────────────────────
  59  |   // SECTION 3: Filter clearing
  60  |   // ──────────────────────────────────────────────────────────────────────────
  61  | 
  62  |   /**
  63  |    * TC03: Home page - clears all filters when 'Clear filters' button is clicked
  64  |    */
  65  |   test('TC03 - Home page - clears all filters when \'Clear filters\' button is clicked', async ({ page }) => {
  66  |     await page.goto('/');
  67  |     const searchInput = page.getByLabel('Search habits by name');
  68  |     const categoryFilter = page.getByLabel('Filter by category');
  69  |     const showArchivedCheckbox = page.getByLabel('Show archived');
  70  |     const sortSelect = page.getByLabel('Sort habits by');
  71  |     // Activate filters
  72  |     await searchInput.fill('nonexistent-filter-test');
  73  |     await categoryFilter.selectOption('Exercise');
  74  |     await showArchivedCheckbox.check();
  75  |     await sortSelect.selectOption('streak');
  76  |     // The Clear filters button should appear
  77  |     const clearFiltersButton = page.getByRole('button', { name: 'Clear filters' });
  78  |     await expect(clearFiltersButton).toBeVisible();
  79  |     // Click the Clear filters button
  80  |     await clearFiltersButton.click();
  81  |     // Assert filters reset to default: empty search, empty category, unchecked archived, sort by name
  82  |     await expect(searchInput).toHaveValue('');
  83  |     await expect(categoryFilter).toHaveValue('');
  84  |     await expect(showArchivedCheckbox).not.toBeChecked();
  85  |     await expect(sortSelect).toHaveValue('name');
  86  |   });
  87  | 
  88  |   // ──────────────────────────────────────────────────────────────────────────
  89  |   // SECTION 4: Home
  90  |   // ──────────────────────────────────────────────────────────────────────────
  91  | 
  92  |   /**
  93  |    * TC04: Home - page loads with unconditional elements visible
  94  |    */
  95  |   test('TC04 - Home - page loads with unconditional elements visible', async ({ page }) => {
  96  |     await page.goto('/');
  97  |     await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
  98  |     await expect(page.getByRole('textbox', { name: 'New habit name' })).toBeVisible();
  99  |     await expect(page.getByLabel('Habit category')).toBeVisible();
  100 |     await expect(page.getByLabel('Times per week')).toBeVisible();
  101 |     await expect(page.getByLabel('Notes (optional)')).toBeVisible();
  102 |     await expect(page.getByRole('button', { name: 'Add habit' })).toBeVisible();
  103 |     await expect(page.getByRole('searchbox', { name: 'Search habits by name' })).toBeVisible();
  104 |     await expect(page.getByRole('combobox', { name: 'Sort habits by' })).toBeVisible();
  105 |     await expect(page.getByRole('combobox', { name: 'Filter by category' })).toBeVisible();
  106 |     await expect(page.getByLabel('Show archived')).toBeVisible();
  107 |     await expect(page.getByRole('link', { name: 'View stats' })).toBeVisible();
  108 |     await expect(page.getByRole('button', { name: 'Complete all for today' })).toBeVisible();
  109 |     await expect(page.getByRole('button', { name: 'Export JSON' })).toBeVisible();
  110 |     await expect(page.getByRole('button', { name: 'Export CSV' })).toBeVisible();
  111 |   });
  112 | 
  113 |   /**
  114 |    * TC05: HabitForm - adds a new habit successfully
  115 |    */
  116 |   test('TC05 - HabitForm - adds a new habit successfully', async ({ page }) => {
  117 |     await page.goto('/');
  118 |     const uniqueName = `Habit ${Date.now()}`;
  119 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(uniqueName);
  120 |     await page.getByLabel('Habit category').selectOption('General');
  121 |     await page.getByLabel('Times per week').selectOption('7');
  122 |     await page.getByRole('textbox', { name: 'Notes (optional)' }).fill('Test notes');
  123 |     await page.getByRole('button', { name: 'Add habit' }).click();
  124 |     const habitItem = page.getByRole('listitem').filter({ hasText: uniqueName });
  125 |     await expect(habitItem).toBeVisible();
  126 |   });
  127 | 
  128 |   /**
  129 |    * TC06: HabitCard - edits a habit\'s name, category, target per week, and notes successfully
  130 |    */
  131 |   test('TC06 - HabitCard - edits a habit\\\'s name, category, target per week, and notes successfully', async ({ page }) => {
  132 |     await page.goto('/');
  133 |     const originalName = `EditTest ${Date.now()}`;
  134 |     const newName = `${originalName} Updated`;
  135 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(originalName);
  136 |     await page.getByRole('button', { name: 'Add habit' }).click();
  137 |     const habitItem = page.getByRole('listitem').filter({ hasText: originalName });
  138 |     await expect(habitItem).toBeVisible();
  139 |     await habitItem.getByRole('button', { name: `Edit ${originalName}` }).click();
  140 |     const nameInput = page.getByLabel(`Edit name for ${originalName}`);
  141 |     await expect(nameInput).toHaveValue(originalName);
  142 |     await nameInput.fill(newName);
  143 |     await page.getByLabel(`Edit category for ${originalName}`).selectOption('Health');
  144 |     await page.getByLabel(`Edit times per week for ${originalName}`).selectOption('5');
  145 |     await page.getByLabel(`Edit notes for ${originalName}`).fill('Updated notes');
> 146 |     await habitItem.getByRole('button', { name: 'Save' }).click();
      |                                                           ^ Error: locator.click: Test timeout of 60000ms exceeded.
  147 |     const updatedHabitItem = page.getByRole('listitem').filter({ hasText: newName });
  148 |     await expect(updatedHabitItem).toBeVisible();
  149 |   });
  150 | 
  151 |   /**
  152 |    * TC07: HabitCard - marks a habit as done today button disables afterward
  153 |    */
  154 |   test('TC07 - HabitCard - marks a habit as done today button disables afterward', async ({ page }) => {
  155 |     await page.goto('/');
  156 |     const habitName = `CompleteTest ${Date.now()}`;
  157 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
  158 |     await page.getByRole('button', { name: 'Add habit' }).click();
  159 |     const habitItem = page.getByRole('listitem').filter({ hasText: habitName });
  160 |     await expect(habitItem).toBeVisible();
  161 |     const markDoneButton = habitItem.getByRole('button', { name: 'Mark done' });
  162 |     await markDoneButton.click();
  163 |     await expect(markDoneButton).toBeDisabled();
  164 |   });
  165 | 
  166 |   /**
  167 |    * TC08: HabitCard - archives and unarchives a habit
  168 |    */
  169 |   test('TC08 - HabitCard - archives and unarchives a habit', async ({ page }) => {
  170 |     await page.goto('/');
  171 |     const habitName = `ArchiveTest ${Date.now()}`;
  172 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
  173 |     await page.getByRole('button', { name: 'Add habit' }).click();
  174 |     const habitItem = page.getByRole('listitem').filter({ hasText: habitName });
  175 |     await expect(habitItem).toBeVisible();
  176 |     await habitItem.getByRole('button', { name: `Archive ${habitName}` }).click();
  177 |     await expect(habitItem).toHaveCount(0);
  178 |     await page.getByLabel('Show archived').check();
  179 |     const archivedHabitItem = page.getByRole('listitem').filter({ hasText: habitName });
  180 |     await expect(archivedHabitItem.getByRole('button', { name: `Unarchive ${habitName}` })).toBeVisible();
  181 |   });
  182 | 
  183 |   /**
  184 |    * TC09: HabitCard - removes a habit after confirm dialog
  185 |    */
  186 |   test('TC09 - HabitCard - removes a habit after confirm dialog', async ({ page }) => {
  187 |     await page.goto('/');
  188 |     const habitName = `DeleteTest ${Date.now()}`;
  189 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
  190 |     await page.getByRole('button', { name: 'Add habit' }).click();
  191 |     const habitItem = page.getByRole('listitem').filter({ hasText: habitName });
  192 |     await expect(habitItem).toBeVisible();
  193 |     page.on('dialog', (dialog) => dialog.accept());
  194 |     await habitItem.getByRole('button', { name: `Delete ${habitName}` }).click();
  195 |     await expect(page.getByRole('listitem').filter({ hasText: habitName })).toHaveCount(0);
  196 |   });
  197 | 
  198 |   /**
  199 |    * TC10: Search box - filters habit list by matching name
  200 |    */
  201 |   test('TC10 - Search box - filters habit list by matching name', async ({ page }) => {
  202 |     await page.goto('/');
  203 |     const uniqueName = `SearchTest ${Date.now()}`;
  204 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(uniqueName);
  205 |     await page.getByRole('button', { name: 'Add habit' }).click();
  206 |     await expect(page.getByRole('listitem').filter({ hasText: uniqueName })).toBeVisible();
  207 |     await page.getByRole('searchbox', { name: 'Search habits by name' }).fill(uniqueName);
  208 |     await expect(page.getByRole('listitem').filter({ hasText: uniqueName })).toBeVisible();
  209 |     await page.getByRole('searchbox', { name: 'Search habits by name' }).fill('nonexistentsearchterm' + Date.now());
  210 |     await expect(page.getByText(`No habits match "nonexistentsearchterm`)).toBeVisible();
  211 |   });
  212 | 
  213 |   /**
  214 |    * TC11: Category filter - filters habit list by category
  215 |    */
  216 |   test('TC11 - Category filter - filters habit list by category', async ({ page }) => {
  217 |     await page.goto('/');
  218 |     const uniqueName = `CategoryTest ${Date.now()}`;
  219 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(uniqueName);
  220 |     await page.getByLabel('Habit category').selectOption('Health');
  221 |     await page.getByRole('button', { name: 'Add habit' }).click();
  222 |     await expect(page.getByRole('listitem').filter({ hasText: uniqueName })).toBeVisible();
  223 |     await page.getByLabel('Filter by category').selectOption('Health');
  224 |     await expect(page.getByRole('listitem').filter({ hasText: uniqueName })).toBeVisible();
  225 |   });
  226 | 
  227 |   /**
  228 |    * TC12: Sort by dropdown - sorts habit list by name ascending
  229 |    */
  230 |   test('TC12 - Sort by dropdown - sorts habit list by name ascending', async ({ page }) => {
  231 |     await page.goto('/');
  232 |     const uniqueNameA = `SortA ${Date.now()}`;
  233 |     const uniqueNameB = `SortB ${Date.now() + 1}`;
  234 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(uniqueNameB);
  235 |     await page.getByRole('button', { name: 'Add habit' }).click();
  236 |     await expect(page.getByRole('listitem').filter({ hasText: uniqueNameB })).toBeVisible();
  237 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(uniqueNameA);
  238 |     await page.getByRole('button', { name: 'Add habit' }).click();
  239 |     await expect(page.getByRole('listitem').filter({ hasText: uniqueNameA })).toBeVisible();
  240 |     await page.getByRole('combobox', { name: 'Sort habits by' }).selectOption('name');
  241 |     const items = await page.getByRole('listitem').all();
  242 |     const texts = await Promise.all(items.map((item) => item.textContent()));
  243 |     const sorted = texts.every((text, i, arr) => !i || (text?.localeCompare(arr[i-1]!) ?? -1) >= 0);
  244 |     expect(sorted).toBe(true);
  245 |   });
  246 | 
```