# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> Home >> TC03 - Home - shows completion progress when habits exist
- Location: tests/home.spec.ts:54:7

# Error details

```
Error: locator.fill: Error: strict mode violation: getByLabel('Name') resolved to 2 elements:
    1) <input value="" aria-label="New habit name" placeholder="e.g. Drink more water" class="flex-1 rounded-lg border border-zinc-300 px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 dark:border-zinc-700 dark:bg-zinc-900"/> aka getByRole('textbox', { name: 'New habit name' })
    2) <input value="" type="search" id="habit-search" placeholder="Search habits by name…" class="flex-1 rounded-lg border border-zinc-300 px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 dark:border-zinc-700 dark:bg-zinc-900"/> aka getByRole('searchbox', { name: 'Search habits by name' })

Call log:
  - waiting for getByLabel('Name')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
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
        - button "Complete all for today (0)" [disabled] [ref=e33]
        - button "Export JSON" [disabled] [ref=e34]
        - button "Export CSV" [disabled] [ref=e35]
    - paragraph [ref=e36]: Loading habits…
  - alert [ref=e37]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('Home', () => {
  4   |   test.setTimeout(60000);
  5   | 
  6   |   // ──────────────────────────────────────────────────────────────────────────
  7   |   // SECTION 1: Home page load
  8   |   // ──────────────────────────────────────────────────────────────────────────
  9   | 
  10  |   /**
  11  |    * TC01: Home - page loads with unconditional elements
  12  |    */
  13  |   test('TC01 - Home - page loads with unconditional elements', async ({ page }) => {
  14  |     await page.goto('/');
  15  |     await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
  16  |     await expect(page.getByText('Build small daily habits, one day at a time.')).toBeVisible();
  17  |     await expect(page.getByLabel('Search habits by name')).toBeVisible();
  18  |     await expect(page.getByLabel('Filter by category')).toBeVisible();
  19  |     await expect(page.getByLabel('Show archived')).toBeVisible();
  20  |     await expect(page.getByLabel('Sort habits by')).toBeVisible();
  21  |     await expect(page.getByRole('link', { name: 'History' })).toBeVisible();
  22  |     await expect(page.getByRole('link', { name: 'View stats' })).toBeVisible();
  23  |     await expect(page.getByRole('link', { name: 'Archive' })).toBeVisible();
  24  |   });
  25  | 
  26  |   // ──────────────────────────────────────────────────────────────────────────
  27  |   // SECTION 2: Filter controls
  28  |   // ──────────────────────────────────────────────────────────────────────────
  29  | 
  30  |   /**
  31  |    * TC02: Home - clicking clear filters resets all filters to default
  32  |    */
  33  |   test('TC02 - Home - clicking clear filters resets all filters to default', async ({ page }) => {
  34  |     await page.goto('/');
  35  |     await page.getByLabel('Search habits by name').fill('abc');
  36  |     await page.getByLabel('Filter by category').selectOption('Other');
  37  |     await page.getByLabel('Show archived').check();
  38  |     await page.getByLabel('Sort habits by').selectOption('streak');
  39  |     await expect(page.getByRole('button', { name: 'Clear filters' })).toBeVisible();
  40  |     await page.getByRole('button', { name: 'Clear filters' }).click();
  41  |     await expect(page.getByLabel('Search habits by name')).toHaveValue('');
  42  |     await expect(page.getByLabel('Filter by category')).toHaveValue('');
  43  |     await expect(page.getByLabel('Show archived')).not.toBeChecked();
  44  |     await expect(page.getByLabel('Sort habits by')).toHaveValue('name');
  45  |   });
  46  | 
  47  |   // ──────────────────────────────────────────────────────────────────────────
  48  |   // SECTION 3: Completion progress display
  49  |   // ──────────────────────────────────────────────────────────────────────────
  50  | 
  51  |   /**
  52  |    * TC03: Home - shows completion progress when habits exist
  53  |    */
  54  |   test('TC03 - Home - shows completion progress when habits exist', async ({ page }) => {
  55  |     await page.goto('/');
  56  |     const createName = `Test Habit Completion ${Date.now()}`;
> 57  |     await page.getByLabel('Name').fill(createName);
      |                                   ^ Error: locator.fill: Error: strict mode violation: getByLabel('Name') resolved to 2 elements:
  58  |     await page.getByLabel('Category').selectOption('Other');
  59  |     await page.getByLabel('Target per week').fill('3');
  60  |     await page.getByRole('button', { name: 'Add habit' }).click();
  61  |     await expect(page.getByText(new RegExp(`\d+/\d+ done today`))).toBeVisible();
  62  |   });
  63  | 
  64  |   // ──────────────────────────────────────────────────────────────────────────
  65  |   // SECTION 4: Filter controls
  66  |   // ──────────────────────────────────────────────────────────────────────────
  67  | 
  68  |   /**
  69  |    * TC04: Home - shows clear filters button when filters are active
  70  |    */
  71  |   test('TC04 - Home - shows clear filters button when filters are active', async ({ page }) => {
  72  |     await page.goto('/');
  73  |     await page.getByLabel('Search habits by name').fill('some text');
  74  |     await expect(page.getByRole('button', { name: 'Clear filters' })).toBeVisible();
  75  |     await page.getByLabel('Search habits by name').fill('');
  76  |     await page.getByLabel('Filter by category').selectOption('Other');
  77  |     await expect(page.getByRole('button', { name: 'Clear filters' })).toBeVisible();
  78  |     await page.getByLabel('Filter by category').selectOption('');
  79  |     await page.getByLabel('Show archived').check();
  80  |     await expect(page.getByRole('button', { name: 'Clear filters' })).toBeVisible();
  81  |     await page.getByLabel('Show archived').uncheck();
  82  |     await page.getByLabel('Sort habits by').selectOption('streak');
  83  |     await expect(page.getByRole('button', { name: 'Clear filters' })).toBeVisible();
  84  |   });
  85  | 
  86  |   // ──────────────────────────────────────────────────────────────────────────
  87  |   // SECTION 5: Home
  88  |   // ──────────────────────────────────────────────────────────────────────────
  89  | 
  90  |   /**
  91  |    * TC05: Home - page loads with unconditional elements visible
  92  |    */
  93  |   test('TC05 - Home - page loads with unconditional elements visible', async ({ page }) => {
  94  |     await page.goto('/');
  95  |     await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
  96  |     await expect(page.getByRole('textbox', { name: 'New habit name' })).toBeVisible();
  97  |     await expect(page.getByLabel('Habit category')).toBeVisible();
  98  |     await expect(page.getByLabel('Times per week')).toBeVisible();
  99  |     await expect(page.getByLabel('Notes (optional)')).toBeVisible();
  100 |     await expect(page.getByRole('button', { name: 'Add habit' })).toBeVisible();
  101 |     await expect(page.getByRole('searchbox', { name: 'Search habits by name' })).toBeVisible();
  102 |     await expect(page.getByRole('combobox', { name: 'Sort habits by' })).toBeVisible();
  103 |     await expect(page.getByRole('combobox', { name: 'Filter by category' })).toBeVisible();
  104 |     await expect(page.getByLabel('Show archived')).toBeVisible();
  105 |     await expect(page.getByRole('link', { name: 'View stats' })).toBeVisible();
  106 |     await expect(page.getByRole('button', { name: 'Complete all for today' })).toBeVisible();
  107 |     await expect(page.getByRole('button', { name: 'Export JSON' })).toBeVisible();
  108 |     await expect(page.getByRole('button', { name: 'Export CSV' })).toBeVisible();
  109 |   });
  110 | 
  111 |   /**
  112 |    * TC06: HabitForm - adds a new habit successfully
  113 |    */
  114 |   test('TC06 - HabitForm - adds a new habit successfully', async ({ page }) => {
  115 |     await page.goto('/');
  116 |     const uniqueName = `Habit ${Date.now()}`;
  117 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(uniqueName);
  118 |     await page.getByLabel('Habit category').selectOption('General');
  119 |     await page.getByLabel('Times per week').selectOption('7');
  120 |     await page.getByRole('textbox', { name: 'Notes (optional)' }).fill('Test notes');
  121 |     await page.getByRole('button', { name: 'Add habit' }).click();
  122 |     const habitItem = page.getByRole('listitem').filter({ hasText: uniqueName });
  123 |     await expect(habitItem).toBeVisible();
  124 |   });
  125 | 
  126 |   /**
  127 |    * TC07: HabitCard - edits a habit\'s name, category, target per week, and notes successfully
  128 |    */
  129 |   test('TC07 - HabitCard - edits a habit\\\'s name, category, target per week, and notes successfully', async ({ page }) => {
  130 |     await page.goto('/');
  131 |     const originalName = `EditTest ${Date.now()}`;
  132 |     const newName = `${originalName} Updated`;
  133 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(originalName);
  134 |     await page.getByRole('button', { name: 'Add habit' }).click();
  135 |     const habitItem = page.getByRole('listitem').filter({ hasText: originalName });
  136 |     await expect(habitItem).toBeVisible();
  137 |     await habitItem.getByRole('button', { name: `Edit ${originalName}` }).click();
  138 |     const nameInput = page.getByLabel(`Edit name for ${originalName}`);
  139 |     await expect(nameInput).toHaveValue(originalName);
  140 |     await nameInput.fill(newName);
  141 |     await page.getByLabel(`Edit category for ${originalName}`).selectOption('Health');
  142 |     await page.getByLabel(`Edit times per week for ${originalName}`).selectOption('5');
  143 |     await page.getByLabel(`Edit notes for ${originalName}`).fill('Updated notes');
  144 |     await habitItem.getByRole('button', { name: 'Save' }).click();
  145 |     const updatedHabitItem = page.getByRole('listitem').filter({ hasText: newName });
  146 |     await expect(updatedHabitItem).toBeVisible();
  147 |   });
  148 | 
  149 |   /**
  150 |    * TC08: HabitCard - marks a habit as done today button disables afterward
  151 |    */
  152 |   test('TC08 - HabitCard - marks a habit as done today button disables afterward', async ({ page }) => {
  153 |     await page.goto('/');
  154 |     const habitName = `CompleteTest ${Date.now()}`;
  155 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
  156 |     await page.getByRole('button', { name: 'Add habit' }).click();
  157 |     const habitItem = page.getByRole('listitem').filter({ hasText: habitName });
```