# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> Home >> TC02 - Home - page loads and renders unconditional elements
- Location: tests/home.spec.ts:32:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/^w+, w+ d{1,2}$/)
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByText(/^w+, w+ d{1,2}$/) with timeout 10000ms
  - waiting for getByText(/^w+, w+ d{1,2}$/)

```

```yaml
- main:
  - heading "Habit Tracker" [level=1]
  - paragraph: Build small daily habits, one day at a time.
  - paragraph: Tuesday, September 22
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
  - button "Complete all for today (0)" [disabled]
  - button "Export JSON" [disabled]
  - button "Export CSV" [disabled]
  - paragraph: No habits yet — add one above to get started.
- alert
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('Home', () => {
  4   |   test.setTimeout(60000);
  5   | 
  6   |   // ──────────────────────────────────────────────────────────────────────────
  7   |   // SECTION 1: HabitForm - create habit
  8   |   // ──────────────────────────────────────────────────────────────────────────
  9   | 
  10  |   /**
  11  |    * TC01: HabitForm - creates a new habit successfully
  12  |    */
  13  |   test('TC01 - HabitForm - creates a new habit successfully', async ({ page }) => {
  14  |     await page.goto('/');
  15  |     const habitName = `Test Habit ${Date.now()}`;
  16  |     await page.getByRole('textbox', { name: 'Name' }).fill(habitName);
  17  |     await page.getByRole('combobox', { name: 'Category' }).selectOption('Health');
  18  |     await page.getByRole('spinbutton', { name: 'Target per week' }).fill('3');
  19  |     await page.getByRole('textbox', { name: 'Notes' }).fill('Test notes');
  20  |     await page.getByRole('button', { name: 'Add habit' }).click();
  21  |     const habitItem = page.getByRole('listitem').filter({ hasText: habitName });
  22  |     await expect(habitItem).toBeVisible();
  23  |   });
  24  | 
  25  |   // ──────────────────────────────────────────────────────────────────────────
  26  |   // SECTION 2: Page load
  27  |   // ──────────────────────────────────────────────────────────────────────────
  28  | 
  29  |   /**
  30  |    * TC02: Home - page loads and renders unconditional elements
  31  |    */
  32  |   test('TC02 - Home - page loads and renders unconditional elements', async ({ page }) => {
  33  |     await page.goto('/');
  34  |     await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
  35  |     await expect(page.getByText('Build small daily habits, one day at a time.')).toBeVisible();
> 36  |     await expect(page.getByText(new RegExp('^\w+, \w+ \d{1,2}$'))).toBeVisible();
      |                                                                    ^ Error: expect(locator).toBeVisible() failed
  37  |     await expect(page.getByRole('link', { name: 'History' })).toBeVisible();
  38  |     await expect(page.getByRole('link', { name: 'View stats' })).toBeVisible();
  39  |     await expect(page.getByRole('link', { name: 'Archive' })).toBeVisible();
  40  |     await expect(page.getByLabel('Search habits by name')).toBeVisible();
  41  |     await expect(page.getByRole('combobox', { name: 'Sort habits by' })).toBeVisible();
  42  |     await expect(page.getByRole('combobox', { name: 'Filter by category' })).toBeVisible();
  43  |     await expect(page.getByLabel('Show archived')).toBeVisible();
  44  |     await expect(page.getByRole('button', { name: /^Complete all for today/ })).toBeVisible();
  45  |     await expect(page.getByRole('button', { name: 'Export JSON' })).toBeVisible();
  46  |     await expect(page.getByRole('button', { name: 'Export CSV' })).toBeVisible();
  47  |     await expect(page.getByRole('textbox', { name: 'Name' })).toBeVisible();
  48  |     await expect(page.getByRole('combobox', { name: 'Category' })).toBeVisible();
  49  |     await expect(page.getByRole('spinbutton', { name: 'Target per week' })).toBeVisible();
  50  |     await expect(page.getByRole('textbox', { name: 'Notes' })).toBeVisible();
  51  |     await expect(page.getByRole('button', { name: 'Add habit' })).toBeVisible();
  52  |   });
  53  | 
  54  |   // ──────────────────────────────────────────────────────────────────────────
  55  |   // SECTION 3: HabitList - complete habit
  56  |   // ──────────────────────────────────────────────────────────────────────────
  57  | 
  58  |   /**
  59  |    * TC03: HabitList - complete a habit
  60  |    */
  61  |   test('TC03 - HabitList - complete a habit', async ({ page }) => {
  62  |     await page.goto('/');
  63  |     const habitName = `Complete Habit ${Date.now()}`;
  64  |     await page.getByRole('textbox', { name: 'Name' }).fill(habitName);
  65  |     await page.getByRole('combobox', { name: 'Category' }).selectOption('Health');
  66  |     await page.getByRole('spinbutton', { name: 'Target per week' }).fill('2');
  67  |     await page.getByRole('textbox', { name: 'Notes' }).fill('Complete test');
  68  |     await page.getByRole('button', { name: 'Add habit' }).click();
  69  |     const habitItem = page.getByRole('listitem').filter({ hasText: habitName });
  70  |     await expect(habitItem).toBeVisible();
  71  |     const completeButton = habitItem.getByRole('button', { name: /^Complete / });
  72  |     await completeButton.click();
  73  |     await expect(habitItem.getByRole('button', { name: /^Completed/ })).toBeVisible();
  74  |   });
  75  | 
  76  |   // ──────────────────────────────────────────────────────────────────────────
  77  |   // SECTION 4: Complete all habits
  78  |   // ──────────────────────────────────────────────────────────────────────────
  79  | 
  80  |   /**
  81  |    * TC04: Complete all - complete all pending habits for today
  82  |    */
  83  |   test('TC04 - Complete all - complete all pending habits for today', async ({ page }) => {
  84  |     await page.goto('/');
  85  |     const habitName1 = `CompleteAll1 ${Date.now()}`;
  86  |     const habitName2 = `CompleteAll2 ${Date.now()}`;
  87  |     await page.getByRole('textbox', { name: 'Name' }).fill(habitName1);
  88  |     await page.getByRole('combobox', { name: 'Category' }).selectOption('Health');
  89  |     await page.getByRole('spinbutton', { name: 'Target per week' }).fill('1');
  90  |     await page.getByRole('textbox', { name: 'Notes' }).fill('Notes 1');
  91  |     await page.getByRole('button', { name: 'Add habit' }).click();
  92  |     await expect(page.getByRole('listitem').filter({ hasText: habitName1 })).toBeVisible();
  93  |     await page.getByRole('textbox', { name: 'Name' }).fill(habitName2);
  94  |     await page.getByRole('combobox', { name: 'Category' }).selectOption('Health');
  95  |     await page.getByRole('spinbutton', { name: 'Target per week' }).fill('1');
  96  |     await page.getByRole('textbox', { name: 'Notes' }).fill('Notes 2');
  97  |     await page.getByRole('button', { name: 'Add habit' }).click();
  98  |     await expect(page.getByRole('listitem').filter({ hasText: habitName2 })).toBeVisible();
  99  |     const completeAllButton = page.getByRole('button', { name: /^Complete all for today/ });
  100 |     await completeAllButton.click();
  101 |     await expect(page.getByRole('listitem').filter({ hasText: habitName1 }).getByRole('button', { name: /^Completed/ })).toBeVisible();
  102 |     await expect(page.getByRole('listitem').filter({ hasText: habitName2 }).getByRole('button', { name: /^Completed/ })).toBeVisible();
  103 |   });
  104 | 
  105 |   // ──────────────────────────────────────────────────────────────────────────
  106 |   // SECTION 5: Filters - search habits
  107 |   // ──────────────────────────────────────────────────────────────────────────
  108 | 
  109 |   /**
  110 |    * TC05: Filters - search habits by name
  111 |    */
  112 |   test('TC05 - Filters - search habits by name', async ({ page }) => {
  113 |     await page.goto('/');
  114 |     const uniqueSearch = `search-${Date.now()}`;
  115 |     await page.getByRole('textbox', { name: 'Search habits by name' }).fill(uniqueSearch);
  116 |     await expect(page.getByText(`No habits match "${uniqueSearch}".`)).toBeVisible();
  117 |   });
  118 | 
  119 |   // ──────────────────────────────────────────────────────────────────────────
  120 |   // SECTION 6: Filters - filter habits
  121 |   // ──────────────────────────────────────────────────────────────────────────
  122 | 
  123 |   /**
  124 |    * TC06: Filters - filter habits by category
  125 |    */
  126 |   test('TC06 - Filters - filter habits by category', async ({ page }) => {
  127 |     await page.goto('/');
  128 |     await page.getByRole('combobox', { name: 'Filter by category' }).selectOption('Health');
  129 |     await expect(page.getByRole('list')).toBeVisible();
  130 |   });
  131 | 
  132 |   // ──────────────────────────────────────────────────────────────────────────
  133 |   // SECTION 7: Filters - show archived toggle
  134 |   // ──────────────────────────────────────────────────────────────────────────
  135 | 
  136 |   /**
```