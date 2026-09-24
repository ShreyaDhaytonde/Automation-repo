# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> Home >> TC01 - HabitForm - creates a new habit successfully
- Location: tests/home.spec.ts:57:7

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.fill: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByRole('textbox', { name: 'New habit name' })

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e3]:
    - generic [ref=e4]:
      - heading "Habit Tracker" [level=1] [ref=e5]
      - paragraph [ref=e6]: Sign in to continue.
    - generic [ref=e7]:
      - generic [ref=e8]: Name
      - textbox "Name" [ref=e9]
    - generic [ref=e10]:
      - generic [ref=e11]: Password
      - textbox "Password" [ref=e12]
    - button "Sign in" [ref=e13]
  - alert [ref=e14]
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
  51  |   // SECTION 1: Habit creation
  52  |   // ──────────────────────────────────────────────────────────────────────────
  53  | 
  54  |   /**
  55  |    * TC01: HabitForm - creates a new habit successfully
  56  |    */
  57  |   test('TC01 - HabitForm - creates a new habit successfully', async ({ page }) => {
  58  |     await page.goto('/');
  59  |     const nameInput = page.getByRole('textbox', { name: 'New habit name' });
  60  |     const categorySelect = page.getByLabel('Category');
  61  |     const targetInput = page.getByRole('spinbutton', { name: 'Target per week' });
  62  |     const notesInput = page.getByRole('textbox', { name: 'Notes' });
  63  |     const addButton = page.getByRole('button', { name: 'Add habit' });
  64  |     const uniqueName = `Test Habit ${Date.now()}`;
> 65  |     await nameInput.fill(uniqueName);
      |                     ^ Error: locator.fill: Test timeout of 60000ms exceeded.
  66  |     await categorySelect.selectOption('Health');
  67  |     await targetInput.fill('3');
  68  |     await notesInput.fill('Test notes');
  69  |     await addButton.click();
  70  |     const habitCard = page.getByRole('listitem').filter({ hasText: uniqueName });
  71  |     await expect(habitCard).toBeVisible();
  72  |   });
  73  | 
  74  |   // ──────────────────────────────────────────────────────────────────────────
  75  |   // SECTION 2: Home page load
  76  |   // ──────────────────────────────────────────────────────────────────────────
  77  | 
  78  |   /**
  79  |    * TC02: Home - page loads and renders unconditional elements
  80  |    */
  81  |   test('TC02 - Home - page loads and renders unconditional elements', async ({ page }) => {
  82  |     await page.goto('/');
  83  |     await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
  84  |     await expect(page.getByText('Build small daily habits, one day at a time.')).toBeVisible();
  85  |     await expect(page.getByText(/^[A-Za-z]+,? [A-Za-z]+ \d{1,2}$/)).toBeVisible();
  86  |     await expect(page.getByRole('link', { name: 'History' })).toBeVisible();
  87  |     await expect(page.getByRole('link', { name: 'View stats' })).toBeVisible();
  88  |     await expect(page.getByRole('link', { name: 'Archive' })).toBeVisible();
  89  |     await expect(page.getByRole('button', { name: 'Complete all for today' })).toBeVisible();
  90  |     await expect(page.getByRole('button', { name: 'Export JSON' })).toBeVisible();
  91  |     await expect(page.getByRole('button', { name: 'Export CSV' })).toBeVisible();
  92  |     await expect(page.getByRole('button', { name: 'Import CSV' })).toBeVisible();
  93  |     await expect(page.getByRole('textbox', { name: 'Search habits by name' })).toBeVisible();
  94  |     await expect(page.getByLabel('Sort habits by')).toBeVisible();
  95  |     await expect(page.getByLabel('Filter by category')).toBeVisible();
  96  |     await expect(page.getByLabel('Filter by priority')).toBeVisible();
  97  |     await expect(page.getByLabel('Show archived')).toBeVisible();
  98  |   });
  99  | 
  100 |   // ──────────────────────────────────────────────────────────────────────────
  101 |   // SECTION 3: Bulk actions
  102 |   // ──────────────────────────────────────────────────────────────────────────
  103 | 
  104 |   /**
  105 |    * TC03: Complete all button - completes all pending habits
  106 |    */
  107 |   test('TC03 - Complete all button - completes all pending habits', async ({ page }) => {
  108 |     await page.goto('/');
  109 |     const nameInput = page.getByRole('textbox', { name: 'New habit name' });
  110 |     const categorySelect = page.getByLabel('Category');
  111 |     const targetInput = page.getByRole('spinbutton', { name: 'Target per week' });
  112 |     const notesInput = page.getByRole('textbox', { name: 'Notes' });
  113 |     const addButton = page.getByRole('button', { name: 'Add habit' });
  114 |     const uniqueName = `CompleteAll${Date.now()}`;
  115 |     await nameInput.fill(uniqueName);
  116 |     await categorySelect.selectOption('Health');
  117 |     await targetInput.fill('1');
  118 |     await notesInput.fill('');
  119 |     await addButton.click();
  120 |     const completeAllButton = page.getByRole('button', { name: /Complete all for today/ });
  121 |     await completeAllButton.click();
  122 |     const habitCard = page.getByRole('listitem').filter({ hasText: uniqueName });
  123 |     await expect(habitCard).toBeVisible();
  124 |   });
  125 | 
  126 |   // ──────────────────────────────────────────────────────────────────────────
  127 |   // SECTION 4: Search and filter
  128 |   // ──────────────────────────────────────────────────────────────────────────
  129 | 
  130 |   /**
  131 |    * TC04: Search input - filters habits by name
  132 |    */
  133 |   test('TC04 - Search input - filters habits by name', async ({ page }) => {
  134 |     await page.goto('/');
  135 |     const searchInput = page.getByRole('searchbox', { name: 'Search habits by name' });
  136 |     const uniqueName = `UniqueSearch${Date.now()}`;
  137 |     const nameInput = page.getByRole('textbox', { name: 'New habit name' });
  138 |     const categorySelect = page.getByLabel('Category');
  139 |     const targetInput = page.getByRole('spinbutton', { name: 'Target per week' });
  140 |     const notesInput = page.getByRole('textbox', { name: 'Notes' });
  141 |     const addButton = page.getByRole('button', { name: 'Add habit' });
  142 |     await nameInput.fill(uniqueName);
  143 |     await categorySelect.selectOption('Health');
  144 |     await targetInput.fill('2');
  145 |     await notesInput.fill('');
  146 |     await addButton.click();
  147 |     await expect(page.getByRole('listitem').filter({ hasText: uniqueName })).toBeVisible();
  148 |     await searchInput.fill(uniqueName);
  149 |     await expect(page.getByRole('listitem').filter({ hasText: uniqueName })).toBeVisible();
  150 |   });
  151 | 
  152 |   /**
  153 |    * TC05: Category filter - filters habits by category
  154 |    */
  155 |   test('TC05 - Category filter - filters habits by category', async ({ page }) => {
  156 |     await page.goto('/');
  157 |     const categoryFilter = page.getByLabel('Filter by category');
  158 |     const uniqueName = `CategoryFilter${Date.now()}`;
  159 |     const nameInput = page.getByRole('textbox', { name: 'New habit name' });
  160 |     const categorySelect = page.getByLabel('Category');
  161 |     const targetInput = page.getByRole('spinbutton', { name: 'Target per week' });
  162 |     const notesInput = page.getByRole('textbox', { name: 'Notes' });
  163 |     const addButton = page.getByRole('button', { name: 'Add habit' });
  164 |     await nameInput.fill(uniqueName);
  165 |     await categorySelect.selectOption('Health');
```