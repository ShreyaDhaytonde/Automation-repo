# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> Home >> TC05 - Home - completes all pending habits for today
- Location: tests/home.spec.ts:101:7

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
    16 × locator resolved to <button class="rounded-full bg-emerald-600 px-3 py-1 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 disabled:opacity-50 disabled:hover:bg-emerald-600">Complete all for today (15)</button>
       - unexpected value "enabled"

```

```yaml
- button "Complete all for today (15)"
```

# Test source

```ts
  6   |   // ──────────────────────────────────────────────────────────────────────────
  7   |   // SECTION 1: Habit creation
  8   |   // ──────────────────────────────────────────────────────────────────────────
  9   | 
  10  |   /**
  11  |    * TC01: HabitForm - creates a new habit successfully
  12  |    */
  13  |   test('TC01 - HabitForm - creates a new habit successfully', async ({ page }) => {
  14  |     await page.goto('/');
  15  |     const habitName = `Test Habit ${Date.now()}`;
  16  |     await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
  17  |     await page.getByRole('combobox', { name: 'Habit category' }).selectOption('General');
  18  |     await page.getByRole('combobox', { name: 'Times per week' }).selectOption('3');
  19  |     await page.getByRole('textbox', { name: 'Notes (optional)' }).fill('Test notes');
  20  |     await page.getByRole('button', { name: 'Add habit' }).click();
  21  |     const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
  22  |     await expect(habitCard).toBeVisible();
  23  |   });
  24  | 
  25  |   // ──────────────────────────────────────────────────────────────────────────
  26  |   // SECTION 2: Home page load
  27  |   // ──────────────────────────────────────────────────────────────────────────
  28  | 
  29  |   /**
  30  |    * TC02: Home - page loads and displays header and controls
  31  |    */
  32  |   test('TC02 - Home - page loads and displays header and controls', async ({ page }) => {
  33  |     await page.goto('/');
  34  |     await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
  35  |     await expect(page.getByText('Build small daily habits, one day at a time.')).toBeVisible();
  36  |     await expect(page.locator('p.text-xs.text-zinc-400').first()).toBeVisible();
  37  |     await expect(page.getByRole('link', { name: 'History' })).toBeVisible();
  38  |     await expect(page.getByRole('link', { name: 'View stats' })).toBeVisible();
  39  |     await expect(page.getByRole('link', { name: 'Archive' })).toBeVisible();
  40  |     await expect(page.getByRole('button', { name: 'Switch to dark mode' })).toBeVisible();
  41  |     await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
  42  |     await expect(page.getByRole('searchbox', { name: 'Search habits by name' })).toBeVisible();
  43  |     await expect(page.getByRole('combobox', { name: 'Sort habits by' })).toBeVisible();
  44  |     await expect(page.getByRole('combobox', { name: 'Filter by category' })).toBeVisible();
  45  |     await expect(page.getByLabel('Show archived')).toBeVisible();
  46  |     await expect(page.getByRole('button', { name: /^Complete all for today/ })).toBeVisible();
  47  |     await expect(page.getByRole('button', { name: 'Export JSON' })).toBeVisible();
  48  |     await expect(page.getByRole('button', { name: 'Export CSV' })).toBeVisible();
  49  |     await expect(page.getByRole('button', { name: 'Add habit' })).toBeVisible();
  50  |   });
  51  | 
  52  |   // ──────────────────────────────────────────────────────────────────────────
  53  |   // SECTION 3: Habit list actions
  54  |   // ──────────────────────────────────────────────────────────────────────────
  55  | 
  56  |   /**
  57  |    * TC03: HabitList - deletes a habit after confirmation
  58  |    */
  59  |   test('TC03 - HabitList - deletes a habit after confirmation', async ({ page }) => {
  60  |     await page.goto('/');
  61  |     const habitName = `Delete Habit ${Date.now()}`;
  62  |     await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
  63  |     await page.getByRole('combobox', { name: 'Habit category' }).selectOption('General');
  64  |     await page.getByRole('combobox', { name: 'Times per week' }).selectOption('3');
  65  |     await page.getByRole('button', { name: 'Add habit' }).click();
  66  |     const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
  67  |     await expect(habitCard).toBeVisible();
  68  |     page.on('dialog', (dialog) => dialog.accept());
  69  |     await habitCard.getByRole('button', { name: `Delete ${habitName}` }).click();
  70  |     await expect(habitCard).toHaveCount(0);
  71  |   });
  72  | 
  73  |   /**
  74  |    * TC04: HabitList - edits a habit and verifies updated values
  75  |    */
  76  |   test('TC04 - HabitList - edits a habit and verifies updated values', async ({ page }) => {
  77  |     await page.goto('/');
  78  |     const habitName = `Edit Habit ${Date.now()}`;
  79  |     await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
  80  |     await page.getByRole('combobox', { name: 'Habit category' }).selectOption('General');
  81  |     await page.getByRole('combobox', { name: 'Times per week' }).selectOption('3');
  82  |     await page.getByRole('button', { name: 'Add habit' }).click();
  83  |     const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
  84  |     await expect(habitCard).toBeVisible();
  85  |     await habitCard.getByRole('button', { name: `Edit ${habitName}` }).click();
  86  |     const nameInput = page.getByLabel(`Edit name for ${habitName}`);
  87  |     await expect(nameInput).toHaveValue(habitName);
  88  |     const newName = `${habitName} Updated`;
  89  |     await nameInput.fill(newName);
  90  |     await habitCard.getByRole('button', { name: 'Save' }).click();
  91  |     await expect(page.getByRole('listitem').filter({ hasText: newName })).toBeVisible();
  92  |   });
  93  | 
  94  |   // ──────────────────────────────────────────────────────────────────────────
  95  |   // SECTION 4: Bulk actions
  96  |   // ──────────────────────────────────────────────────────────────────────────
  97  | 
  98  |   /**
  99  |    * TC05: Home - completes all pending habits for today
  100 |    */
  101 |   test('TC05 - Home - completes all pending habits for today', async ({ page }) => {
  102 |     await page.goto('/');
  103 |     const completeAllButton = page.getByRole('button', { name: /^Complete all for today/ });
  104 |     await expect(completeAllButton).toBeEnabled();
  105 |     await completeAllButton.click();
> 106 |     await expect(completeAllButton).toBeDisabled();
      |                                     ^ Error: expect(locator).toBeDisabled() failed
  107 |   });
  108 | 
  109 |   // ──────────────────────────────────────────────────────────────────────────
  110 |   // SECTION 5: Habit list actions
  111 |   // ──────────────────────────────────────────────────────────────────────────
  112 | 
  113 |   /**
  114 |    * TC06: HabitList - skips and unskips a habit
  115 |    */
  116 |   test('TC06 - HabitList - skips and unskips a habit', async ({ page }) => {
  117 |     await page.goto('/');
  118 |     const habitName = `Skip Habit ${Date.now()}`;
  119 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
  120 |     await page.getByRole('combobox', { name: 'Habit category' }).selectOption('General');
  121 |     await page.getByRole('combobox', { name: 'Times per week' }).selectOption('3');
  122 |     await page.getByRole('button', { name: 'Add habit' }).click();
  123 |     const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
  124 |     await expect(habitCard).toBeVisible();
  125 |     await habitCard.getByRole('button', { name: `Skip ${habitName}` }).click();
  126 |     await expect(habitCard.getByRole('button', { name: `Skipped ${habitName}` })).toBeVisible();
  127 |     await habitCard.getByRole('button', { name: `Unskip ${habitName}` }).click();
  128 |     await expect(habitCard.getByRole('button', { name: `Skip ${habitName}` })).toBeVisible();
  129 |   });
  130 | 
  131 |   /**
  132 |    * TC07: HabitList - toggles archive state of a habit
  133 |    */
  134 |   test('TC07 - HabitList - toggles archive state of a habit', async ({ page }) => {
  135 |     await page.goto('/');
  136 |     const habitName = `Archive Habit ${Date.now()}`;
  137 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
  138 |     await page.getByRole('combobox', { name: 'Habit category' }).selectOption('General');
  139 |     await page.getByRole('combobox', { name: 'Times per week' }).selectOption('3');
  140 |     await page.getByRole('button', { name: 'Add habit' }).click();
  141 |     const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
  142 |     await expect(habitCard).toBeVisible();
  143 |     await habitCard.getByRole('checkbox', { name: `Archive ${habitName}` }).check();
  144 |     await expect(habitCard).toHaveCount(0);
  145 |     await page.getByLabel('Show archived').check();
  146 |     const archivedCard = page.getByRole('listitem').filter({ hasText: habitName });
  147 |     await expect(archivedCard).toBeVisible();
  148 |     await archivedCard.getByRole('checkbox', { name: `Unarchive ${habitName}` }).uncheck();
  149 |     await expect(page.getByRole('listitem').filter({ hasText: habitName })).toBeVisible();
  150 |   });
  151 | 
  152 |   /**
  153 |    * TC08: HabitList - duplicates a habit
  154 |    */
  155 |   test('TC08 - HabitList - duplicates a habit', async ({ page }) => {
  156 |     await page.goto('/');
  157 |     const habitName = `Duplicate Habit ${Date.now()}`;
  158 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
  159 |     await page.getByRole('combobox', { name: 'Habit category' }).selectOption('General');
  160 |     await page.getByRole('combobox', { name: 'Times per week' }).selectOption('3');
  161 |     await page.getByRole('button', { name: 'Add habit' }).click();
  162 |     const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
  163 |     await expect(habitCard).toBeVisible();
  164 |     await habitCard.getByRole('button', { name: `Duplicate ${habitName}` }).click();
  165 |     const duplicateCard = page.getByRole('listitem').filter({ hasText: `${habitName} (copy)` });
  166 |     await expect(duplicateCard).toBeVisible();
  167 |   });
  168 | 
  169 |   // ──────────────────────────────────────────────────────────────────────────
  170 |   // SECTION 6: Filter and search
  171 |   // ──────────────────────────────────────────────────────────────────────────
  172 | 
  173 |   /**
  174 |    * TC09: Home - clears all filters and resets controls
  175 |    */
  176 |   test('TC09 - Home - clears all filters and resets controls', async ({ page }) => {
  177 |     await page.goto('/');
  178 |     await page.getByRole('combobox', { name: 'Filter by category' }).selectOption('General');
  179 |     await page.getByLabel('Show archived').check();
  180 |     await page.getByRole('textbox', { name: 'Search habits by name' }).fill('test');
  181 |     await page.getByRole('combobox', { name: 'Sort habits by' }).selectOption('streak');
  182 |     await page.getByRole('button', { name: 'Clear filters' }).click();
  183 |     await expect(page.getByRole('combobox', { name: 'Filter by category' })).toHaveValue('');
  184 |     await expect(page.getByLabel('Show archived')).not.toBeChecked();
  185 |     await expect(page.getByRole('textbox', { name: 'Search habits by name' })).toHaveValue('');
  186 |     await expect(page.getByRole('combobox', { name: 'Sort habits by' })).toHaveValue('name');
  187 |   });
  188 | 
  189 |   // ──────────────────────────────────────────────────────────────────────────
  190 |   // SECTION 7: Habit creation validation
  191 |   // ──────────────────────────────────────────────────────────────────────────
  192 | 
  193 |   /**
  194 |    * TC10: HabitForm - shows validation error when name is empty
  195 |    */
  196 |   test('TC10 - HabitForm - shows validation error when name is empty', async ({ page }) => {
  197 |     await page.goto('/');
  198 |     await page.getByLabel('Name').fill('');
  199 |     await page.getByRole('button', { name: 'Add habit' }).click();
  200 |     await expect(page.getByText('Name is required')).toBeVisible();
  201 |   });
  202 | 
  203 |   // ──────────────────────────────────────────────────────────────────────────
  204 |   // SECTION 8: Home
  205 |   // ──────────────────────────────────────────────────────────────────────────
  206 | 
```