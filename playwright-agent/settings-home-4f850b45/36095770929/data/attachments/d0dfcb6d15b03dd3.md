# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> Home >> TC01 - Home - page loads and renders unconditional elements
- Location: tests/home.spec.ts:57:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('textbox', { name: 'Search habits by name' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('textbox', { name: 'Search habits by name' }) with timeout 10000ms
  - waiting for getByRole('textbox', { name: 'Search habits by name' })

```

```yaml
- main:
  - heading "Habit Tracker" [level=1]
  - paragraph: Build small daily habits, one day at a time.
  - paragraph: Friday, September 25
  - paragraph: 5/10 done today
  - link "History":
    - /url: /history
  - link "View stats":
    - /url: /stats
  - link "Archive":
    - /url: /archive
  - link "Settings":
    - /url: /settings
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
  - button "Complete all for today (5)"
  - button "Export JSON"
  - button "Export CSV"
  - button "Import CSV"
  - list:
    - listitem:
      - button "Pin Archive Habit 1790311130911": ☆
      - paragraph: Archive Habit 1790311130911
      - text: General
      - button "Cycle priority for Archive Habit 1790311130911, currently Medium": Medium
      - status "Archive Habit 1790311130911 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "Archive Habit 1790311130911 weekly progress"
      - text: 0/3 this week
      - button "Mark done"
      - button "Freeze Archive Habit 1790311130911 for today": 🧊 Freeze
      - button "Edit Archive Habit 1790311130911": Edit
      - button "Duplicate Archive Habit 1790311130911": Duplicate
      - button "Archive Archive Habit 1790311130911": Archive
      - button "Delete Archive Habit 1790311130911": Remove
    - listitem:
      - button "Pin Archive Habit 1790311194662": ☆
      - paragraph: Archive Habit 1790311194662
      - text: General
      - button "Cycle priority for Archive Habit 1790311194662, currently Medium": Medium
      - status "Archive Habit 1790311194662 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "Archive Habit 1790311194662 weekly progress"
      - text: 0/3 this week
      - button "Mark done"
      - button "Freeze Archive Habit 1790311194662 for today": 🧊 Freeze
      - button "Edit Archive Habit 1790311194662": Edit
      - button "Duplicate Archive Habit 1790311194662": Duplicate
      - button "Archive Archive Habit 1790311194662": Archive
      - button "Delete Archive Habit 1790311194662": Remove
    - listitem:
      - button "Pin CompleteTest 1790310580863": ☆
      - paragraph: CompleteTest 1790310580863
      - text: General
      - button "Cycle priority for CompleteTest 1790310580863, currently Medium": Medium
      - paragraph: 🔥 1 day streak
      - progressbar "CompleteTest 1790310580863 weekly progress"
      - text: 1/7 this week
      - button "Done today" [disabled]
      - button "Freeze CompleteTest 1790310580863 for today" [disabled]: 🧊 Freeze
      - button "Edit CompleteTest 1790310580863": Edit
      - button "Duplicate CompleteTest 1790310580863": Duplicate
      - button "Archive CompleteTest 1790310580863": Archive
      - button "Delete CompleteTest 1790310580863": Remove
    - listitem:
      - button "Pin EditTest 1790310519415": ☆
      - paragraph: EditTest 1790310519415
      - text: General
      - button "Cycle priority for EditTest 1790310519415, currently Medium": Medium
      - paragraph: 🔥 1 day streak
      - progressbar "EditTest 1790310519415 weekly progress"
      - text: 1/7 this week
      - button "Done today" [disabled]
      - button "Freeze EditTest 1790310519415 for today" [disabled]: 🧊 Freeze
      - button "Edit EditTest 1790310519415": Edit
      - button "Duplicate EditTest 1790310519415": Duplicate
      - button "Archive EditTest 1790310519415": Archive
      - button "Delete EditTest 1790310519415": Remove
    - listitem:
      - button "Pin Habit 1790310456907": ☆
      - paragraph: Habit 1790310456907
      - text: General
      - button "Cycle priority for Habit 1790310456907, currently Medium": Medium
      - paragraph: 🔥 1 day streak
      - progressbar "Habit 1790310456907 weekly progress"
      - text: 1/7 this week
      - paragraph: Test notes
      - button "Done today" [disabled]
      - button "Freeze Habit 1790310456907 for today" [disabled]: 🧊 Freeze
      - button "Edit Habit 1790310456907": Edit
      - button "Duplicate Habit 1790310456907": Duplicate
      - button "Archive Habit 1790310456907": Archive
      - button "Delete Habit 1790310456907": Remove
    - listitem:
      - button "Pin Priority Test Habit 1790310813591": ☆
      - paragraph: Priority Test Habit 1790310813591
      - text: General
      - button "Cycle priority for Priority Test Habit 1790310813591, currently Medium": Medium
      - status "Priority Test Habit 1790310813591 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "Priority Test Habit 1790310813591 weekly progress"
      - text: 0/7 this week
      - button "Mark done"
      - button "Freeze Priority Test Habit 1790310813591 for today": 🧊 Freeze
      - button "Edit Priority Test Habit 1790310813591": Edit
      - button "Duplicate Priority Test Habit 1790310813591": Duplicate
      - button "Archive Priority Test Habit 1790310813591": Archive
      - button "Delete Priority Test Habit 1790310813591": Remove
    - listitem:
      - button "Pin Skip Habit 1790311003357": ☆
      - paragraph: Skip Habit 1790311003357
      - text: General
      - button "Cycle priority for Skip Habit 1790311003357, currently Medium": Medium
      - paragraph: 🔥 1 day streak
      - progressbar "Skip Habit 1790311003357 weekly progress"
      - text: 1/3 this week
      - button "Done today" [disabled]
      - button "Freeze Skip Habit 1790311003357 for today" [disabled]: 🧊 Freeze
      - button "Edit Skip Habit 1790311003357": Edit
      - button "Duplicate Skip Habit 1790311003357": Duplicate
      - button "Archive Skip Habit 1790311003357": Archive
      - button "Delete Skip Habit 1790311003357": Remove
    - listitem:
      - button "Pin Skip Habit 1790311067064": ☆
      - paragraph: Skip Habit 1790311067064
      - text: General
      - button "Cycle priority for Skip Habit 1790311067064, currently Medium": Medium
      - status "Skip Habit 1790311067064 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "Skip Habit 1790311067064 weekly progress"
      - text: 0/3 this week
      - button "Mark done"
      - button "Freeze Skip Habit 1790311067064 for today": 🧊 Freeze
      - button "Edit Skip Habit 1790311067064": Edit
      - button "Duplicate Skip Habit 1790311067064": Duplicate
      - button "Archive Skip Habit 1790311067064": Archive
      - button "Delete Skip Habit 1790311067064": Remove
    - listitem:
      - button "Pin SortA 1790310599480": ☆
      - paragraph: SortA 1790310599480
      - text: General
      - button "Cycle priority for SortA 1790310599480, currently Medium": Medium
      - status "SortA 1790310599480 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "SortA 1790310599480 weekly progress"
      - text: 0/7 this week
      - button "Mark done"
      - button "Freeze SortA 1790310599480 for today": 🧊 Freeze
      - button "Edit SortA 1790310599480": Edit
      - button "Duplicate SortA 1790310599480": Duplicate
      - button "Archive SortA 1790310599480": Archive
      - button "Delete SortA 1790310599480": Remove
    - listitem:
      - button "Pin SortB 1790310599481": ☆
      - paragraph: SortB 1790310599481
      - text: General
      - button "Cycle priority for SortB 1790310599481, currently Medium": Medium
      - paragraph: 🔥 1 day streak
      - progressbar "SortB 1790310599481 weekly progress"
      - text: 1/7 this week
      - button "Done today" [disabled]
      - button "Freeze SortB 1790310599481 for today" [disabled]: 🧊 Freeze
      - button "Edit SortB 1790310599481": Edit
      - button "Duplicate SortB 1790310599481": Duplicate
      - button "Archive SortB 1790310599481": Archive
      - button "Delete SortB 1790310599481": Remove
- alert
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | function newHabitNameField(page) {
  4   |   return page.getByRole('textbox', { name: 'New habit name' });
  5   | }
  6   | 
  7   | function newHabitCategoryField(page) {
  8   |   return page.getByRole('combobox', { name: 'Habit category' });
  9   | }
  10  | 
  11  | function newHabitTargetField(page) {
  12  |   return page.getByRole('combobox', { name: 'Times per week' });
  13  | }
  14  | 
  15  | function newHabitNotesField(page) {
  16  |   return page.getByRole('textbox', { name: 'Notes (optional)' });
  17  | }
  18  | 
  19  | function submitAddHabitButton(page) {
  20  |   return page.getByRole('button', { name: 'Add habit' });
  21  | }
  22  | 
  23  | function habitSearchBox(page) {
  24  |   return page.getByRole('searchbox', { name: 'Search habits by name' });
  25  | }
  26  | 
  27  | function categoryFilterControl(page) {
  28  |   return page.getByRole('combobox', { name: 'Filter by category' });
  29  | }
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
  43  | function nameInput(page) {
  44  |   return page.getByRole('textbox', { name: 'New habit name' });
  45  | }
  46  | 
  47  | test.describe('Home', () => {
  48  |   test.setTimeout(60000);
  49  | 
  50  |   // ──────────────────────────────────────────────────────────────────────────
  51  |   // SECTION 1: Home page load
  52  |   // ──────────────────────────────────────────────────────────────────────────
  53  | 
  54  |   /**
  55  |    * TC01: Home - page loads and renders unconditional elements
  56  |    */
  57  |   test('TC01 - Home - page loads and renders unconditional elements', async ({ page }) => {
  58  |     await page.goto('/');
  59  |     await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
  60  |     await expect(page.getByRole('link', { name: 'History' })).toBeVisible();
  61  |     await expect(page.getByRole('link', { name: 'View stats' })).toBeVisible();
  62  |     await expect(page.getByRole('link', { name: 'Archive' })).toBeVisible();
  63  |     await expect(page.getByRole('link', { name: 'Settings' })).toBeVisible();
  64  |     await expect(page.getByRole('button', { name: 'Switch to dark mode' })).toBeVisible();
  65  |     await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
  66  |     await expect(page.getByRole('textbox', { name: 'New habit name' })).toBeVisible();
  67  |     await expect(page.getByRole('combobox', { name: 'Habit category' })).toBeVisible();
  68  |     await expect(page.getByRole('combobox', { name: 'Times per week' })).toBeVisible();
  69  |     await expect(page.getByRole('textbox', { name: 'Notes (optional)' })).toBeVisible();
  70  |     await expect(page.getByRole('button', { name: 'Add habit' })).toBeVisible();
> 71  |     await expect(page.getByRole('textbox', { name: 'Search habits by name' })).toBeVisible();
      |                                                                                ^ Error: expect(locator).toBeVisible() failed
  72  |     await expect(page.getByRole('combobox', { name: 'Sort habits by' })).toBeVisible();
  73  |     await expect(page.getByRole('combobox', { name: 'Filter by category' })).toBeVisible();
  74  |     await expect(page.getByRole('combobox', { name: 'Filter by priority' })).toBeVisible();
  75  |     await expect(page.getByLabel('Show archived')).toBeVisible();
  76  |     await expect(page.getByRole('button', { name: /Complete all for today/ })).toBeVisible();
  77  |     await expect(page.getByRole('button', { name: 'Export JSON' })).toBeVisible();
  78  |     await expect(page.getByRole('button', { name: 'Export CSV' })).toBeVisible();
  79  |     await expect(page.getByRole('button', { name: 'Import CSV' })).toBeVisible();
  80  |   });
  81  | 
  82  |   // ──────────────────────────────────────────────────────────────────────────
  83  |   // SECTION 2: HabitForm creation
  84  |   // ──────────────────────────────────────────────────────────────────────────
  85  | 
  86  |   /**
  87  |    * TC02: HabitForm - creates a new habit with default or stored weekly target
  88  |    */
  89  |   test('TC02 - HabitForm - creates a new habit with default or stored weekly target', async ({ page }) => {
  90  |     await page.goto('/');
  91  |     const nameInput = page.getByRole('textbox', { name: 'New habit name' });
  92  |     const categorySelect = page.getByRole('combobox', { name: 'Habit category' });
  93  |     const timesPerWeekSelect = page.getByRole('combobox', { name: 'Times per week' });
  94  |     const notesInput = page.getByRole('textbox', { name: 'Notes (optional)' });
  95  |     const addButton = page.getByRole('button', { name: 'Add habit' });
  96  |     const uniqueName = `Habit ${Date.now()}`;
  97  |     await nameInput.fill(uniqueName);
  98  |     await timesPerWeekSelect.selectOption(timesPerWeekSelect.inputValue() || '7');
  99  |     await addButton.click();
  100 |     const createdCard = page.getByRole('listitem').filter({ hasText: uniqueName });
  101 |     await expect(createdCard).toBeVisible();
  102 |   });
  103 | 
  104 |   // ──────────────────────────────────────────────────────────────────────────
  105 |   // SECTION 3: Home
  106 |   // ──────────────────────────────────────────────────────────────────────────
  107 | 
  108 |   /**
  109 |    * TC03: Home page - page loads and renders unconditional elements
  110 |    */
  111 |   test('TC03 - Home page - page loads and renders unconditional elements', async ({ page }) => {
  112 |     await page.goto('/');
  113 |     await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
  114 |     await expect(page.getByText('Build small daily habits, one day at a time.')).toBeVisible();
  115 |     await expect(page.getByLabel('Filter by category')).toBeVisible();
  116 |     await expect(page.getByLabel('Filter by category').locator('option').first()).toHaveText('All');
  117 |     for (const category of ['General', 'Health', 'Work', 'Personal', 'Learning']) {
  118 |       await expect(page.getByLabel('Filter by category').locator('option').filter({ hasText: category })).toHaveCount(1);
  119 |     }
  120 |     await expect(newHabitNameField(page)).toBeVisible();
  121 |     await expect(page.getByLabel('Habit category')).toBeVisible();
  122 |     for (const category of ['General', 'Health', 'Work', 'Personal', 'Learning']) {
  123 |       await expect(page.getByLabel('Habit category').locator('option').filter({ hasText: category })).toHaveCount(1);
  124 |     }
  125 |     await expect(page.getByLabel('Times per week')).toBeVisible();
  126 |     for (const n of ['1x / week','2x / week','3x / week','4x / week','5x / week','6x / week','7x / week']) {
  127 |       await expect(page.getByLabel('Times per week').locator('option').filter({ hasText: n })).toHaveCount(1);
  128 |     }
  129 |     await expect(submitAddHabitButton(page)).toBeVisible();
  130 |   });
  131 | 
  132 |   /**
  133 |    * TC04: HabitCard - inline edit form displays when Edit button clicked and updates fields
  134 |    */
  135 |   test('TC04 - HabitCard - inline edit form displays when Edit button clicked and updates fields', async ({ page }) => {
  136 |     await page.goto('/');
  137 |     const habitName = `Edit habit ${Date.now()}`;
  138 |     await newHabitNameField(page).fill(habitName);
  139 |     await page.getByLabel('Habit category').selectOption('General');
  140 |     await page.getByLabel('Times per week').selectOption('3');
  141 |     await submitAddHabitButton(page).click();
  142 |     const habitCard = habitCardLocator(page, habitName);
  143 |     await expect(habitCard).toBeVisible();
  144 |     const editButton = habitCard.getByRole('button', { name: `Edit ${habitName}` });
  145 |     await editButton.click();
  146 |     const editNameInput = page.getByLabel(`Edit name for ${habitName}`);
  147 |     const editCategorySelect = page.getByLabel(`Edit category for ${habitName}`);
  148 |     const editTimesSelect = page.getByLabel(`Edit times per week for ${habitName}`);
  149 |     await expect(editNameInput).toBeVisible();
  150 |     await expect(editNameInput).toHaveValue(habitName);
  151 |     await expect(editCategorySelect).toHaveValue('General');
  152 |     await expect(editTimesSelect).toHaveValue('3');
  153 |     const newName = `${habitName} updated`;
  154 |     await editNameInput.fill(newName);
  155 |     await editCategorySelect.selectOption('Health');
  156 |     await editTimesSelect.selectOption('5');
  157 |     await page.getByRole('button', { name: 'Save', exact: true }).click();
  158 |     const updatedHabitCard = habitCardLocator(page, newName);
  159 |     await expect(updatedHabitCard).toBeVisible();
  160 |   });
  161 | 
  162 |   /**
  163 |    * TC05: HabitForm - form validation disables Add habit button for empty name
  164 |    */
  165 |   test('TC05 - HabitForm - form validation disables Add habit button for empty name', async ({ page }) => {
  166 |     await page.goto('/');
  167 |     const nameInput = newHabitNameField(page);
  168 |     const addButton = submitAddHabitButton(page);
  169 |     await nameInput.fill('');
  170 |     await expect(addButton).toBeDisabled();
  171 |     await nameInput.fill('   ');
```