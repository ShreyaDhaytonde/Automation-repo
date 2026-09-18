# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> Home >> TC04 - HabitCard - archive and unarchive habit from home page
- Location: tests/home.spec.ts:72:7

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByRole('link', { name: 'History' })

```

# Page snapshot

```yaml
- generic [active] [ref=f1e1]:
  - alert [ref=f1e2]: Archive
  - main [ref=f1e4]:
    - generic [ref=f1e5]:
      - generic [ref=f1e6]:
        - heading "Archive" [level=1] [ref=f1e7]
        - paragraph [ref=f1e8]: Habits you've archived, out of the main list.
      - generic [ref=f1e9]:
        - button "Switch to dark mode" [ref=f1e10]: 🌙 Dark
        - button "Logout" [ref=f1e11]
    - link "← Back to habits" [ref=f1e12] [cursor=pointer]:
      - /url: /
    - paragraph [ref=f1e13]: No archived habits — anything you archive from the home page shows up here.
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
  11  |    * TC01: Home page - loads and renders base elements
  12  |    */
  13  |   test('TC01 - Home page - loads and renders base elements', async ({ page }) => {
  14  |     await page.goto("/");
  15  |     await expect(page.getByRole("heading", { name: "Habit Tracker" })).toBeVisible();
  16  |     await expect(page.getByRole("link", { name: "History" })).toBeVisible();
  17  |     await expect(page.getByRole("link", { name: "View stats" })).toBeVisible();
  18  |     await expect(page.getByRole("link", { name: "Archive" })).toBeVisible();
  19  |     await expect(page.getByLabel("Search habits by name")).toBeVisible();
  20  |     await expect(page.getByRole("combobox", { name: "Sort habits by" })).toBeVisible();
  21  |     await expect(page.getByRole("combobox", { name: "Filter by category" })).toBeVisible();
  22  |     await expect(page.getByLabel("Show archived")).toBeVisible();
  23  |     await expect(page.getByRole("button", { name: /Complete all for today/ })).toBeVisible();
  24  |     await expect(page.getByRole("button", { name: "Export JSON" })).toBeVisible();
  25  |     await expect(page.getByRole("button", { name: "Export CSV" })).toBeVisible();
  26  |   });
  27  | 
  28  |   // ──────────────────────────────────────────────────────────────────────────
  29  |   // SECTION 2: HabitCard - complete habit
  30  |   // ──────────────────────────────────────────────────────────────────────────
  31  | 
  32  |   /**
  33  |    * TC02: HabitCard - mark habit as done today disables button
  34  |    */
  35  |   test('TC02 - HabitCard - mark habit as done today disables button', async ({ page }) => {
  36  |     await page.goto("/");
  37  |     const habitName = `CompleteHabit ${Date.now()}`;
  38  |     await page.getByLabel("New habit name").fill(habitName);
  39  |     await page.getByRole("button", { name: "Add habit" }).click();
  40  |     const card = page.getByRole("listitem").filter({ hasText: habitName });
  41  |     await expect(card.getByRole("button", { name: "Mark done" })).toBeVisible();
  42  |     await card.getByRole("button", { name: "Mark done" }).click();
  43  |     await expect(card.getByRole("button", { name: "Done today" })).toBeDisabled();
  44  |   });
  45  | 
  46  |   // ──────────────────────────────────────────────────────────────────────────
  47  |   // SECTION 3: HabitCard - toggle freeze
  48  |   // ──────────────────────────────────────────────────────────────────────────
  49  | 
  50  |   /**
  51  |    * TC03: HabitCard - freeze and unfreeze habit for today
  52  |    */
  53  |   test('TC03 - HabitCard - freeze and unfreeze habit for today', async ({ page }) => {
  54  |     await page.goto("/");
  55  |     const habitName = `FreezeHabit ${Date.now()}`;
  56  |     await page.getByLabel("New habit name").fill(habitName);
  57  |     await page.getByRole("button", { name: "Add habit" }).click();
  58  |     const card = page.getByRole("listitem").filter({ hasText: habitName });
  59  |     await card.getByRole("button", { name: "🧊 Freeze" }).click();
  60  |     await expect(card.getByRole("button", { name: "Unfreeze" })).toBeVisible();
  61  |     await card.getByRole("button", { name: "Unfreeze" }).click();
  62  |     await expect(card.getByRole("button", { name: "🧊 Freeze" })).toBeVisible();
  63  |   });
  64  | 
  65  |   // ──────────────────────────────────────────────────────────────────────────
  66  |   // SECTION 4: HabitCard - archive toggle
  67  |   // ──────────────────────────────────────────────────────────────────────────
  68  | 
  69  |   /**
  70  |    * TC04: HabitCard - archive and unarchive habit from home page
  71  |    */
  72  |   test('TC04 - HabitCard - archive and unarchive habit from home page', async ({ page }) => {
  73  |     await page.goto("/");
  74  |     const habitName = `ArchiveHabit ${Date.now()}`;
  75  |     await page.getByLabel("New habit name").fill(habitName);
  76  |     await page.getByRole("button", { name: "Add habit" }).click();
  77  |     const card = page.getByRole("listitem").filter({ hasText: habitName });
  78  |     await card.getByRole("button", { name: `Archive ${habitName}` }).click();
  79  |     await expect(page.getByRole("listitem").filter({ hasText: habitName })).toHaveCount(0);
  80  |     await page.reload();
  81  |     await page.getByRole("link", { name: "Archive" }).click();
  82  |     const archivedCard = page.getByRole("listitem").filter({ hasText: habitName });
  83  |     await expect(archivedCard).toBeVisible();
  84  |     await archivedCard.getByRole("button", { name: `Unarchive ${habitName}` }).click();
  85  |     await expect(page.getByRole("listitem").filter({ hasText: habitName })).toHaveCount(0);
> 86  |     await page.getByRole("link", { name: "History" }).click();
      |                                                       ^ Error: locator.click: Test timeout of 60000ms exceeded.
  87  |     await page.getByRole("link", { name: "Archive" }).click();
  88  |     await archivedCard.getByRole("button", { name: `Archive ${habitName}` }).click();
  89  |     await expect(archivedCard).toBeVisible();
  90  |   });
  91  | 
  92  |   // ──────────────────────────────────────────────────────────────────────────
  93  |   // SECTION 5: Search - filtering
  94  |   // ──────────────────────────────────────────────────────────────────────────
  95  | 
  96  |   /**
  97  |    * TC05: Home page - search filters habits by name
  98  |    */
  99  |   test('TC05 - Home page - search filters habits by name', async ({ page }) => {
  100 |     await page.goto("/");
  101 |     const uniqueName = `SearchHabit ${Date.now()}`;
  102 |     await page.getByLabel("New habit name").fill(uniqueName);
  103 |     await page.getByRole("button", { name: "Add habit" }).click();
  104 |     await page.getByLabel("habit-search").fill(uniqueName);
  105 |     const filtered = page.getByRole("listitem").filter({ hasText: uniqueName });
  106 |     await expect(filtered).toBeVisible();
  107 |   });
  108 | 
  109 |   // ──────────────────────────────────────────────────────────────────────────
  110 |   // SECTION 6: Home
  111 |   // ──────────────────────────────────────────────────────────────────────────
  112 | 
  113 |   /**
  114 |    * TC06: Home - page loads with unconditional elements visible
  115 |    */
  116 |   test('TC06 - Home - page loads with unconditional elements visible', async ({ page }) => {
  117 |     await page.goto('/');
  118 |     await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
  119 |     await expect(page.getByRole('textbox', { name: 'New habit name' })).toBeVisible();
  120 |     await expect(page.getByLabel('Habit category')).toBeVisible();
  121 |     await expect(page.getByLabel('Times per week')).toBeVisible();
  122 |     await expect(page.getByLabel('Notes (optional)')).toBeVisible();
  123 |     await expect(page.getByRole('button', { name: 'Add habit' })).toBeVisible();
  124 |     await expect(page.getByRole('searchbox', { name: 'Search habits by name' })).toBeVisible();
  125 |     await expect(page.getByRole('combobox', { name: 'Sort habits by' })).toBeVisible();
  126 |     await expect(page.getByRole('combobox', { name: 'Filter by category' })).toBeVisible();
  127 |     await expect(page.getByLabel('Show archived')).toBeVisible();
  128 |     await expect(page.getByRole('link', { name: 'View stats' })).toBeVisible();
  129 |     await expect(page.getByRole('button', { name: 'Complete all for today' })).toBeVisible();
  130 |     await expect(page.getByRole('button', { name: 'Export JSON' })).toBeVisible();
  131 |     await expect(page.getByRole('button', { name: 'Export CSV' })).toBeVisible();
  132 |   });
  133 | 
  134 |   /**
  135 |    * TC07: HabitCard - marks a habit as done today button disables afterward
  136 |    */
  137 |   test('TC07 - HabitCard - marks a habit as done today button disables afterward', async ({ page }) => {
  138 |     await page.goto('/');
  139 |     const habitName = `CompleteTest ${Date.now()}`;
  140 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
  141 |     await page.getByRole('button', { name: 'Add habit' }).click();
  142 |     const habitItem = page.getByRole('listitem').filter({ hasText: habitName });
  143 |     await expect(habitItem).toBeVisible();
  144 |     const markDoneButton = habitItem.getByRole('button', { name: 'Mark done' });
  145 |     await markDoneButton.click();
  146 |     await expect(markDoneButton).toBeDisabled();
  147 |   });
  148 | 
  149 |   /**
  150 |    * TC08: HabitCard - archives and unarchives a habit
  151 |    */
  152 |   test('TC08 - HabitCard - archives and unarchives a habit', async ({ page }) => {
  153 |     await page.goto('/');
  154 |     const habitName = `ArchiveTest ${Date.now()}`;
  155 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
  156 |     await page.getByRole('button', { name: 'Add habit' }).click();
  157 |     const habitItem = page.getByRole('listitem').filter({ hasText: habitName });
  158 |     await expect(habitItem).toBeVisible();
  159 |     await habitItem.getByRole('button', { name: `Archive ${habitName}` }).click();
  160 |     await expect(habitItem).toHaveCount(0);
  161 |     await page.getByLabel('Show archived').check();
  162 |     const archivedHabitItem = page.getByRole('listitem').filter({ hasText: habitName });
  163 |     await expect(archivedHabitItem.getByRole('button', { name: `Unarchive ${habitName}` })).toBeVisible();
  164 |   });
  165 | 
  166 |   /**
  167 |    * TC09: HabitCard - removes a habit after confirm dialog
  168 |    */
  169 |   test('TC09 - HabitCard - removes a habit after confirm dialog', async ({ page }) => {
  170 |     await page.goto('/');
  171 |     const habitName = `DeleteTest ${Date.now()}`;
  172 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
  173 |     await page.getByRole('button', { name: 'Add habit' }).click();
  174 |     const habitItem = page.getByRole('listitem').filter({ hasText: habitName });
  175 |     await expect(habitItem).toBeVisible();
  176 |     page.on('dialog', (dialog) => dialog.accept());
  177 |     await habitItem.getByRole('button', { name: `Delete ${habitName}` }).click();
  178 |     await expect(page.getByRole('listitem').filter({ hasText: habitName })).toHaveCount(0);
  179 |   });
  180 | 
  181 |   /**
  182 |    * TC10: Search box - filters habit list by matching name
  183 |    */
  184 |   test('TC10 - Search box - filters habit list by matching name', async ({ page }) => {
  185 |     await page.goto('/');
  186 |     const uniqueName = `SearchTest ${Date.now()}`;
```