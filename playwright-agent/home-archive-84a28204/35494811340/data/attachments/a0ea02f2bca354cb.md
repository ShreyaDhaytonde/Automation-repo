# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: archive.spec.ts >> Archive >> TC05 - Archive page - can delete an archived habit
- Location: tests/archive.spec.ts:75:7

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByRole('listitem').filter({ hasText: 'Test Delete 1789886544739' })
Expected: 0
Received: 1
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" getByRole('listitem').filter({ hasText: 'Test Delete 1789886544739' }) with timeout 10000ms
  - waiting for getByRole('listitem').filter({ hasText: 'Test Delete 1789886544739' })
    24 × locator resolved to 1 element
       - unexpected value "1"

```

# Page snapshot

```yaml
- generic [ref=f1e1]:
  - main [ref=f1e3]:
    - generic [ref=f1e4]:
      - generic [ref=f1e5]:
        - heading "Archive" [level=1] [ref=f1e6]
        - paragraph [ref=f1e7]: Habits you've archived, out of the main list.
      - generic [ref=f1e8]:
        - button "Switch to dark mode" [ref=f1e9]: 🌙 Dark
        - button "Logout" [ref=f1e10]
    - link "← Back to habits" [ref=f1e11] [cursor=pointer]:
      - /url: /
    - list [ref=f1e12]:
      - listitem [ref=f1e13]:
        - generic:
          - generic:
            - paragraph [ref=f1e14]: Test Delete 1789886544739
            - generic [ref=f1e15]: General
            - status "Test Delete 1789886544739 is at risk of missing its weekly goal" [ref=f1e16]: ⏰ Due today
          - paragraph: Start your streak today!
          - generic:
            - progressbar "Test Delete 1789886544739 weekly progress"
            - generic [ref=f1e17]: 0/7 this week
        - generic [ref=f1e18]:
          - button "Mark done" [disabled] [ref=f1e19]
          - button "Freeze Test Delete 1789886544739 for today" [disabled] [ref=f1e20]: 🧊 Freeze
          - button "Edit Test Delete 1789886544739" [ref=f1e21]: Edit
          - button "Duplicate Test Delete 1789886544739" [ref=f1e22]: Duplicate
          - button "Unarchive Test Delete 1789886544739" [ref=f1e23]: Unarchive
          - button "Delete Test Delete 1789886544739" [active] [ref=f1e24]: Remove
  - alert [ref=f1e25]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('Archive', () => {
  4   |   test.setTimeout(60000);
  5   | 
  6   |   // ──────────────────────────────────────────────────────────────────────────
  7   |   // SECTION 1: Page load
  8   |   // ──────────────────────────────────────────────────────────────────────────
  9   | 
  10  |   /**
  11  |    * TC01: Archive page - loads and renders main UI elements
  12  |    */
  13  |   test('TC01 - Archive page - loads and renders main UI elements', async ({ page }) => {
  14  |     await page.goto('/archive');
  15  |     await expect(page.getByRole('heading', { name: 'Archive' })).toBeVisible();
  16  |     await expect(page.getByText("Habits you've archived, out of the main list.")).toBeVisible();
  17  |     await expect(page.getByRole('link', { name: '← Back to habits' })).toBeVisible();
  18  |     await expect(page.getByRole('list').or(page.getByText('No archived habits — anything you archive from the home page shows up here.'))).toBeVisible();
  19  |   });
  20  | 
  21  |   // ──────────────────────────────────────────────────────────────────────────
  22  |   // SECTION 2: HabitCard duplicate action
  23  |   // ──────────────────────────────────────────────────────────────────────────
  24  | 
  25  |   /**
  26  |    * TC02: Archive HabitCard - duplicates an archived habit, creating an active copy on home page
  27  |    */
  28  |   test('TC02 - Archive HabitCard - duplicates an archived habit, creating an active copy on home page', async ({ page }) => {
  29  |     await page.goto('/archive');
  30  |     // Wait for the archive list or empty message
  31  |     const archiveListOrEmpty = page.getByRole('list').or(page.getByText('No archived habits — anything you archive from the home page shows up here.'));
  32  |     await expect(archiveListOrEmpty).toBeVisible();
  33  |     // If no archived habits, skip this duplication test
  34  |     const archivedHabitItem = await page.locator('li').filter({ hasText: ' (copy)' }).first();
  35  |     if (await archivedHabitItem.count() === 0) {
  36  |       // Create a new habit on Home to archive it first before duplication test is possible.
  37  |       // But since home page is out of scope here, skip duplication test with missing info
  38  |       return;
  39  |     }
  40  |     // Click the duplicate button on first archived habit
  41  |     const duplicateButton = archivedHabitItem.getByRole('button').filter({ hasText: /^Duplicate/ });
  42  |     await duplicateButton.first().click();
  43  |     // Assert no error message is visible
  44  |     await expect(page.getByText('Could not duplicate that habit — try again.')).toHaveCount(0);
  45  |   });
  46  | 
  47  |   // ──────────────────────────────────────────────────────────────────────────
  48  |   // SECTION 3: Archive
  49  |   // ──────────────────────────────────────────────────────────────────────────
  50  | 
  51  |   /**
  52  |    * TC03: HabitCard - duplicate habit button is visible and clickable on archived habits
  53  |    */
  54  |   test('TC03 - HabitCard - duplicate habit button is visible and clickable on archived habits', async ({ page }) => {
  55  |     await page.goto("/archive");
  56  |     const habitCard = page.getByRole("listitem").first();
  57  |     await expect(habitCard.getByRole("button", { name: new RegExp("Duplicate ") })).toBeVisible();
  58  |     await habitCard.getByRole("button", { name: new RegExp("Duplicate ") }).click();
  59  |   });
  60  | 
  61  |   /**
  62  |    * TC04: Archive page - loads and shows static elements
  63  |    */
  64  |   test('TC04 - Archive page - loads and shows static elements', async ({ page }) => {
  65  |     await page.goto('/archive');
  66  |     await expect(page.getByRole('heading', { name: 'Archive' })).toBeVisible();
  67  |     await expect(page.getByRole('link', { name: '← Back to habits' })).toBeVisible();
  68  |     await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
  69  |     await expect(page.getByRole('button', { name: /switch to dark mode/i })).toBeVisible();
  70  |   });
  71  | 
  72  |   /**
  73  |    * TC05: Archive page - can delete an archived habit
  74  |    */
  75  |   test('TC05 - Archive page - can delete an archived habit', async ({ page }) => {
  76  |     await page.goto('/');
  77  |     const uniqueName = `Test Delete ${Date.now()}`;
  78  |     await page.getByLabel('New habit name').fill(uniqueName);
  79  |     await page.getByLabel('Habit category').selectOption({ index: 0 });
  80  |     await page.getByLabel('Times per week').selectOption('7');
  81  |     await page.getByLabel('Notes (optional)').fill('');
  82  |     await page.getByRole('button', { name: 'Add habit' }).click();
  83  |     const habitCard = page.getByRole('listitem').filter({ hasText: uniqueName });
  84  |     await expect(habitCard).toBeVisible();
  85  |     await habitCard.getByRole('button', { name: `Archive` }).click();
  86  |     await page.goto('/archive');
  87  |     const archivedHabitCard = page.getByRole('listitem').filter({ hasText: uniqueName });
  88  |     await expect(archivedHabitCard).toBeVisible();
  89  |     await archivedHabitCard.getByRole('button', { name: `Delete ${uniqueName}`, exact: true }).click();
  90  |     await page.waitForTimeout(500);
> 91  |     await expect(archivedHabitCard).toHaveCount(0);
      |                                     ^ Error: expect(locator).toHaveCount(expected) failed
  92  |   });
  93  | 
  94  |   /**
  95  |    * TC06: Archive page - can unarchive an archived habit
  96  |    */
  97  |   test('TC06 - Archive page - can unarchive an archived habit', async ({ page }) => {
  98  |     await page.goto('/');
  99  |     const uniqueName = `Test Unarchive ${Date.now()}`;
  100 |     await page.getByLabel('New habit name').fill(uniqueName);
  101 |     await page.getByLabel('Habit category').selectOption({ index: 0 });
  102 |     await page.getByLabel('Times per week').selectOption('7');
  103 |     await page.getByLabel('Notes (optional)').fill('');
  104 |     await page.getByRole('button', { name: 'Add habit' }).click();
  105 |     const habitCard = page.getByRole('listitem').filter({ hasText: uniqueName });
  106 |     await expect(habitCard).toBeVisible();
  107 |     await habitCard.getByRole('button', { name: `Archive ${uniqueName}`, exact: true }).click();
  108 |     await page.goto('/archive');
  109 |     const archivedHabitCard = page.getByRole('listitem').filter({ hasText: uniqueName });
  110 |     await expect(archivedHabitCard).toBeVisible();
  111 |     await archivedHabitCard.getByRole('button', { name: `Unarchive ${uniqueName}`, exact: true }).click();
  112 |     await expect(page.getByRole('listitem').filter({ hasText: uniqueName })).toHaveCount(0);
  113 |   });
  114 | 
  115 |   /**
  116 |    * TC07: Archive page - can edit an archived habit\\\'s details
  117 |    */
  118 |   test('TC07 - Archive page - can edit an archived habit\\\\\\\'s details', async ({ page }) => {
  119 |     await page.goto('/');
  120 |     const uniqueName = `Test Edit ${Date.now()}`;
  121 |     await page.getByLabel('New habit name').fill(uniqueName);
  122 |     await page.getByLabel('Habit category').selectOption({ index: 0 });
  123 |     await page.getByLabel('Times per week').selectOption('7');
  124 |     await page.getByLabel('Notes (optional)').fill('');
  125 |     await page.getByRole('button', { name: 'Add habit' }).click();
  126 |     const habitCard = page.getByRole('listitem').filter({ hasText: uniqueName });
  127 |     await expect(habitCard).toBeVisible();
  128 |     await habitCard.getByRole('button', { name: `Archive` }).click();
  129 |     await page.goto('/archive');
  130 |     const archivedHabitCard = page.getByRole('listitem').filter({ hasText: uniqueName });
  131 |     await expect(archivedHabitCard).toBeVisible();
  132 |     await archivedHabitCard.getByRole('button', { name: `Edit ${uniqueName}`, exact: true }).click();
  133 |     const nameInput = page.getByLabel(`Edit name for ${uniqueName}`);
  134 |     await expect(nameInput).toHaveValue(uniqueName);
  135 |     await nameInput.fill(`${uniqueName} updated`);
  136 |     const saveButton = page.getByRole('button', { name: 'Save', exact: true });
  137 |     await saveButton.click();
  138 |     const updatedHabitCard = page.getByRole('listitem').filter({ hasText: `${uniqueName} updated` });
  139 |     await expect(updatedHabitCard).toBeVisible();
  140 |   });
  141 | 
  142 |   /**
  143 |    * TC08: Archive page - can navigate back to home page
  144 |    */
  145 |   test('TC08 - Archive page - can navigate back to home page', async ({ page }) => {
  146 |     await page.goto('/archive');
  147 |     await page.getByRole('link', { name: '← Back to habits' }).click();
  148 |     await expect(page).toHaveURL('/');
  149 |     await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
  150 |   });
  151 | 
  152 |   /**
  153 |    * TC09: Archive page - error message appears when loading fails (non-deterministic)
  154 |    */
  155 |   test('TC09 - Archive page - error message appears when loading fails (non-deterministic)', async ({ page }) => {
  156 |     await page.goto('/archive');
  157 |     await expect(page.locator('text=Could not load archived habits. Is the API running?')).toBeHidden();
  158 |   });
  159 | 
  160 |   /**
  161 |    * TC10: Archive page - empty state message is shown when no habits are archived (not reachable without backend control)
  162 |    */
  163 |   test('TC10 - Archive page - empty state message is shown when no habits are archived (not reachable without backend control)', async ({ page }) => {
  164 |     await page.goto('/archive');
  165 |     await expect(page.locator('text=No archived habits — anything you archive from the home page shows up here.')).toBeHidden();
  166 |   });
  167 | 
  168 | });
  169 | 
```