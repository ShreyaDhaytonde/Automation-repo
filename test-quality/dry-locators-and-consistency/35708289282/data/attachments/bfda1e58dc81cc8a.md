# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> Home >> TC04 - HabitList - edits a habit and verifies updated values
- Location: tests/home.spec.ts:116:7

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByRole('listitem').filter({ hasText: 'Edit Habit 1790068151212' }).getByRole('button', { name: 'Save' })

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - main [ref=e3]:
    - generic [ref=e4]:
      - generic [ref=e5]:
        - heading "Habit Tracker" [level=1] [ref=e6]
        - paragraph [ref=e7]: Build small daily habits, one day at a time.
        - paragraph [ref=e8]: Tuesday, September 22
        - paragraph [ref=e9]: 0/4 done today
      - generic [ref=e10]:
        - link "History" [ref=e11] [cursor=pointer]:
          - /url: /history
        - link "View stats" [ref=e12] [cursor=pointer]:
          - /url: /stats
        - link "Archive" [ref=e13] [cursor=pointer]:
          - /url: /archive
        - button "Switch to dark mode" [ref=e14]: 🌙 Dark
        - button "Logout" [ref=e15]
    - generic [ref=e17]:
      - textbox "New habit name" [ref=e18]:
        - /placeholder: e.g. Drink more water
      - combobox "Habit category" [ref=e19]:
        - option "General" [selected]
        - option "Health"
        - option "Work"
        - option "Personal"
        - option "Learning"
      - combobox "Times per week" [ref=e20]:
        - option "1x / week"
        - option "2x / week"
        - option "3x / week" [selected]
        - option "4x / week"
        - option "5x / week"
        - option "6x / week"
        - option "7x / week"
      - textbox "Notes (optional)" [ref=e21]
      - button "Add habit" [disabled] [ref=e22]
    - generic [ref=e23]:
      - generic [ref=e24]: Search habits by name
      - searchbox "Search habits by name" [ref=e25]
      - generic [ref=e26]: Sort by
      - combobox "Sort habits by" [ref=e27]:
        - option "Name (A-Z)" [selected]
        - option "Streak (highest first)"
        - option "Category"
        - option "Priority (highest first)"
        - option "Weekly target (highest first)"
    - generic [ref=e28]:
      - generic [ref=e29]:
        - generic [ref=e30]: Filter by category
        - combobox "Filter by category" [ref=e31]:
          - option "All" [selected]
          - option "General"
          - option "Health"
          - option "Work"
          - option "Personal"
          - option "Learning"
      - generic [ref=e32]:
        - generic [ref=e33]: Filter by priority
        - combobox "Filter by priority" [ref=e34]:
          - option "All" [selected]
          - option "Low"
          - option "Medium"
          - option "High"
      - generic [ref=e35]:
        - checkbox "Show archived" [ref=e36]
        - text: Show archived
      - generic [ref=e37]:
        - button "Complete all for today (4)" [ref=e38]
        - button "Export JSON" [ref=e39]
        - button "Export CSV" [ref=e40]
    - list [ref=e41]:
      - listitem [ref=e42]:
        - generic:
          - generic:
            - button "Pin Edit Habit 1790068089703" [ref=e43]: ☆
            - paragraph [ref=e44]: Edit Habit 1790068089703
            - generic [ref=e45]: General
            - button "Cycle priority for Edit Habit 1790068089703, currently Medium" [ref=e46]: Medium
          - paragraph: Start your streak today!
          - generic:
            - progressbar "Edit Habit 1790068089703 weekly progress"
            - generic [ref=e47]: 0/3 this week
        - generic [ref=e48]:
          - button "Mark done" [ref=e49]
          - button "Freeze Edit Habit 1790068089703 for today" [ref=e50]: 🧊 Freeze
          - button "Edit Edit Habit 1790068089703" [ref=e51]: Edit
          - button "Duplicate Edit Habit 1790068089703" [ref=e52]: Duplicate
          - button "Archive Edit Habit 1790068089703" [ref=e53]: Archive
          - button "Delete Edit Habit 1790068089703" [ref=e54]: Remove
      - listitem [ref=e55]:
        - generic [ref=e56]:
          - textbox "Edit name for Edit Habit 1790068151212" [active] [ref=e57]: Edit Habit 1790068151212 Updated
          - combobox "Edit category for Edit Habit 1790068151212" [ref=e58]:
            - option "General" [selected]
            - option "Health"
            - option "Work"
            - option "Personal"
            - option "Learning"
          - combobox "Edit times per week for Edit Habit 1790068151212" [ref=e59]:
            - option "1x / week"
            - option "2x / week"
            - option "3x / week" [selected]
            - option "4x / week"
            - option "5x / week"
            - option "6x / week"
            - option "7x / week"
          - textbox "Edit notes for Edit Habit 1790068151212" [ref=e60]:
            - /placeholder: Notes (optional)
          - button "Save" [ref=e61]
          - button "Cancel" [ref=e62]
      - listitem [ref=e63]:
        - generic:
          - generic:
            - button "Pin Test Archived Duplicate Button 1790068079828 (copy)" [ref=e64]: ☆
            - paragraph [ref=e65]: Test Archived Duplicate Button 1790068079828 (copy)
            - generic [ref=e66]: General
            - button "Cycle priority for Test Archived Duplicate Button 1790068079828 (copy), currently Medium" [ref=e67]: Medium
            - status "Test Archived Duplicate Button 1790068079828 (copy) is at risk of missing its weekly goal" [ref=e68]: ⏰ Due today
          - paragraph: Start your streak today!
          - generic:
            - progressbar "Test Archived Duplicate Button 1790068079828 (copy) weekly progress"
            - generic [ref=e69]: 0/7 this week
        - generic [ref=e70]:
          - button "Mark done" [ref=e71]
          - button "Freeze Test Archived Duplicate Button 1790068079828 (copy) for today" [ref=e72]: 🧊 Freeze
          - button "Edit Test Archived Duplicate Button 1790068079828 (copy)" [ref=e73]: Edit
          - button "Duplicate Test Archived Duplicate Button 1790068079828 (copy)" [ref=e74]: Duplicate
          - button "Archive Test Archived Duplicate Button 1790068079828 (copy)" [ref=e75]: Archive
          - button "Delete Test Archived Duplicate Button 1790068079828 (copy)" [ref=e76]: Remove
      - listitem [ref=e77]:
        - generic:
          - generic:
            - button "Pin Test Unarchive 1790068082943" [ref=e78]: ☆
            - paragraph [ref=e79]: Test Unarchive 1790068082943
            - generic [ref=e80]: General
            - button "Cycle priority for Test Unarchive 1790068082943, currently Medium" [ref=e81]: Medium
            - status "Test Unarchive 1790068082943 is at risk of missing its weekly goal" [ref=e82]: ⏰ Due today
          - paragraph: Start your streak today!
          - generic:
            - progressbar "Test Unarchive 1790068082943 weekly progress"
            - generic [ref=e83]: 0/7 this week
        - generic [ref=e84]:
          - button "Mark done" [ref=e85]
          - button "Freeze Test Unarchive 1790068082943 for today" [ref=e86]: 🧊 Freeze
          - button "Edit Test Unarchive 1790068082943" [ref=e87]: Edit
          - button "Duplicate Test Unarchive 1790068082943" [ref=e88]: Duplicate
          - button "Archive Test Unarchive 1790068082943" [ref=e89]: Archive
          - button "Delete Test Unarchive 1790068082943" [ref=e90]: Remove
  - alert [ref=e91]
```

# Test source

```ts
  30  | 
  31  | function sortByControl(page) {
  32  |   return page.getByRole('combobox', { name: 'Sort habits by' });
  33  | }
  34  | 
  35  | function showArchivedToggle(page) {
  36  |   return page.getByLabel('Show archived');
  37  | }
  38  | 
  39  | function habitCardLocator(page, name) {
  40  |   return page.getByRole('listitem').filter({ hasText: name });
  41  | }
  42  | 
  43  | test.describe('Home', () => {
  44  |   test.setTimeout(60000);
  45  | 
  46  |   // ──────────────────────────────────────────────────────────────────────────
  47  |   // SECTION 1: Habit creation
  48  |   // ──────────────────────────────────────────────────────────────────────────
  49  | 
  50  |   /**
  51  |    * TC01: HabitForm - creates a new habit successfully
  52  |    */
  53  |   test('TC01 - HabitForm - creates a new habit successfully', async ({ page }) => {
  54  |     await page.goto('/');
  55  |     const habitName = `Test Habit ${Date.now()}`;
  56  |     await newHabitNameField(page).fill(habitName);
  57  |     await newHabitCategoryField(page).selectOption('General');
  58  |     await newHabitTargetField(page).selectOption('3');
  59  |     await newHabitNotesField(page).fill('Test notes');
  60  |     await submitAddHabitButton(page).click();
  61  |     const habitCard = habitCardLocator(page, habitName);
  62  |     await expect(habitCard).toBeVisible();
  63  |   });
  64  | 
  65  |   // ──────────────────────────────────────────────────────────────────────────
  66  |   // SECTION 2: Home page load
  67  |   // ──────────────────────────────────────────────────────────────────────────
  68  | 
  69  |   /**
  70  |    * TC02: Home - page loads and displays header and controls
  71  |    */
  72  |   test('TC02 - Home - page loads and displays header and controls', async ({ page }) => {
  73  |     await page.goto('/');
  74  |     await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
  75  |     await expect(page.getByText('Build small daily habits, one day at a time.')).toBeVisible();
  76  |     await expect(page.locator('p.text-xs.text-zinc-400').first()).toBeVisible();
  77  |     await expect(page.getByRole('link', { name: 'History' })).toBeVisible();
  78  |     await expect(page.getByRole('link', { name: 'View stats' })).toBeVisible();
  79  |     await expect(page.getByRole('link', { name: 'Archive' })).toBeVisible();
  80  |     await expect(page.getByRole('button', { name: 'Switch to dark mode' })).toBeVisible();
  81  |     await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
  82  |     await expect(habitSearchBox(page)).toBeVisible();
  83  |     await expect(sortByControl(page)).toBeVisible();
  84  |     await expect(categoryFilterControl(page)).toBeVisible();
  85  |     await expect(showArchivedToggle(page)).toBeVisible();
  86  |     await expect(page.getByRole('button', { name: /^Complete all for today/ })).toBeVisible();
  87  |     await expect(page.getByRole('button', { name: 'Export JSON' })).toBeVisible();
  88  |     await expect(page.getByRole('button', { name: 'Export CSV' })).toBeVisible();
  89  |     await expect(submitAddHabitButton(page)).toBeVisible();
  90  |   });
  91  | 
  92  |   // ──────────────────────────────────────────────────────────────────────────
  93  |   // SECTION 3: Habit list actions
  94  |   // ──────────────────────────────────────────────────────────────────────────
  95  | 
  96  |   /**
  97  |    * TC03: HabitList - deletes a habit after confirmation
  98  |    */
  99  |   test('TC03 - HabitList - deletes a habit after confirmation', async ({ page }) => {
  100 |     await page.goto('/');
  101 |     const habitName = `Delete Habit ${Date.now()}`;
  102 |     await newHabitNameField(page).fill(habitName);
  103 |     await newHabitCategoryField(page).selectOption('General');
  104 |     await newHabitTargetField(page).selectOption('3');
  105 |     await submitAddHabitButton(page).click();
  106 |     const habitCard = habitCardLocator(page, habitName);
  107 |     await expect(habitCard).toBeVisible();
  108 |     page.on('dialog', (dialog) => dialog.accept());
  109 |     await habitCard.getByRole('button', { name: `Delete ${habitName}` }).click();
  110 |     await expect(habitCard).toHaveCount(0);
  111 |   });
  112 | 
  113 |   /**
  114 |    * TC04: HabitList - edits a habit and verifies updated values
  115 |    */
  116 |   test('TC04 - HabitList - edits a habit and verifies updated values', async ({ page }) => {
  117 |     await page.goto('/');
  118 |     const habitName = `Edit Habit ${Date.now()}`;
  119 |     await page.getByLabel('New habit name').fill(habitName);
  120 |     await page.getByLabel('Habit category').selectOption('General');
  121 |     await page.getByLabel('Times per week').selectOption('3');
  122 |     await submitAddHabitButton(page).click();
  123 |     const habitCard = habitCardLocator(page, habitName);
  124 |     await expect(habitCard).toBeVisible();
  125 |     await habitCard.getByRole('button', { name: `Edit ${habitName}` }).click();
  126 |     const nameInput = page.getByLabel(`Edit name for ${habitName}`);
  127 |     await expect(nameInput).toHaveValue(habitName);
  128 |     const newName = `${habitName} Updated`;
  129 |     await nameInput.fill(newName);
> 130 |     await habitCard.getByRole('button', { name: 'Save' }).click();
      |                                                           ^ Error: locator.click: Test timeout of 60000ms exceeded.
  131 |     await expect(habitCardLocator(page, newName)).toBeVisible();
  132 |   });
  133 | 
  134 |   // ──────────────────────────────────────────────────────────────────────────
  135 |   // SECTION 4: Bulk actions
  136 |   // ──────────────────────────────────────────────────────────────────────────
  137 | 
  138 |   /**
  139 |    * TC05: Home - completes all pending habits for today
  140 |    */
  141 |   test('TC05 - Home - completes all pending habits for today', async ({ page }) => {
  142 |     await page.goto('/');
  143 |     const completeAllButton = page.getByRole('button', { name: /^Complete all for today/ });
  144 |     await expect(completeAllButton).toBeEnabled();
  145 |     await completeAllButton.click();
  146 |     await expect(completeAllButton).not.toHaveText(/Completing…/, { timeout: 15000 });
  147 |   });
  148 | 
  149 |   // ──────────────────────────────────────────────────────────────────────────
  150 |   // SECTION 5: Habit list actions
  151 |   // ──────────────────────────────────────────────────────────────────────────
  152 | 
  153 |   /**
  154 |    * TC06: HabitList - skips and unskips a habit
  155 |    */
  156 |   test('TC06 - HabitList - skips and unskips a habit', async ({ page }) => {
  157 |     await page.goto('/');
  158 |     const habitName = `Skip Habit ${Date.now()}`;
  159 |     await page.getByLabel('New habit name').fill(habitName);
  160 |     await page.getByLabel('Habit category').selectOption('General');
  161 |     await page.getByLabel('Times per week').selectOption('3');
  162 |     await submitAddHabitButton(page).click();
  163 |     const habitCard = habitCardLocator(page, habitName);
  164 |     await expect(habitCard).toBeVisible();
  165 |     await habitCard.getByRole('button', { name: `Skip ${habitName}` }).click();
  166 |     await expect(habitCard.getByRole('button', { name: `Skipped ${habitName}` })).toBeVisible();
  167 |     await habitCard.getByRole('button', { name: `Unskip ${habitName}` }).click();
  168 |     await expect(habitCard.getByRole('button', { name: `Skip ${habitName}` })).toBeVisible();
  169 |   });
  170 | 
  171 |   /**
  172 |    * TC07: HabitList - toggles archive state of a habit
  173 |    */
  174 |   test('TC07 - HabitList - toggles archive state of a habit', async ({ page }) => {
  175 |     await page.goto('/');
  176 |     const habitName = `Archive Habit ${Date.now()}`;
  177 |     await page.getByLabel('New habit name').fill(habitName);
  178 |     await page.getByLabel('Habit category').selectOption('General');
  179 |     await page.getByLabel('Times per week').selectOption('3');
  180 |     await submitAddHabitButton(page).click();
  181 |     const habitCard = habitCardLocator(page, habitName);
  182 |     await expect(habitCard).toBeVisible();
  183 |     await habitCard.getByRole('checkbox', { name: `Archive ${habitName}` }).check();
  184 |     await expect(habitCardLocator(page, habitName)).toHaveCount(0);
  185 |     await showArchivedToggle(page).check();
  186 |     const archivedHabitCard = habitCardLocator(page, habitName);
  187 |     await expect(archivedHabitCard).toBeVisible();
  188 |     await archivedHabitCard.getByRole('checkbox', { name: `Unarchive ${habitName}` }).uncheck();
  189 |     await expect(habitCardLocator(page, habitName)).toBeVisible();
  190 |   });
  191 | 
  192 |   /**
  193 |    * TC08: HabitList - duplicates a habit
  194 |    */
  195 |   test('TC08 - HabitList - duplicates a habit', async ({ page }) => {
  196 |     await page.goto('/');
  197 |     const habitName = `Duplicate Habit ${Date.now()}`;
  198 |     await newHabitNameField(page).fill(habitName);
  199 |     await newHabitCategoryField(page).selectOption('General');
  200 |     await newHabitTargetField(page).selectOption('3');
  201 |     await submitAddHabitButton(page).click();
  202 |     const habitCard = habitCardLocator(page, habitName);
  203 |     await expect(habitCard).toBeVisible();
  204 |     await habitCard.getByRole('button', { name: `Duplicate ${habitName}` }).click();
  205 |     const duplicateCard = habitCardLocator(page, `${habitName} (copy)`);
  206 |     await expect(duplicateCard).toBeVisible();
  207 |   });
  208 | 
  209 |   // ──────────────────────────────────────────────────────────────────────────
  210 |   // SECTION 6: Filter and search
  211 |   // ──────────────────────────────────────────────────────────────────────────
  212 | 
  213 |   /**
  214 |    * TC09: Home - clears all filters and resets controls
  215 |    */
  216 |   test('TC09 - Home - clears all filters and resets controls', async ({ page }) => {
  217 |     await page.goto('/');
  218 |     await categoryFilterControl(page).selectOption('General');
  219 |     await showArchivedToggle(page).check();
  220 |     await habitSearchBox(page).fill('test');
  221 |     await sortByControl(page).selectOption('streak');
  222 |     await page.getByRole('button', { name: 'Clear filters' }).click();
  223 |     await expect(categoryFilterControl(page)).toHaveValue('');
  224 |     await expect(showArchivedToggle(page)).not.toBeChecked();
  225 |     await expect(habitSearchBox(page)).toHaveValue('');
  226 |     await expect(sortByControl(page)).toHaveValue('name');
  227 |   });
  228 | 
  229 |   // ──────────────────────────────────────────────────────────────────────────
  230 |   // SECTION 7: Habit creation validation
```