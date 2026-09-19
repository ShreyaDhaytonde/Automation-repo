# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: archive.spec.ts >> Archive >> TC02 - HabitCard in Archive - duplicates an archived habit, which does not appear in Archive but is presumably added to Home
- Location: tests/archive.spec.ts:27:7

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /Edit / }).first()

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - main [ref=e3]:
    - generic [ref=e4]:
      - generic [ref=e5]:
        - heading "Archive" [level=1] [ref=e6]
        - paragraph [ref=e7]: Habits you've archived, out of the main list.
      - generic [ref=e8]:
        - button "Switch to dark mode" [ref=e9]: 🌙 Dark
        - button "Logout" [ref=e10]
    - link "← Back to habits" [ref=e11] [cursor=pointer]:
      - /url: /
    - paragraph [ref=e12]: No archived habits — anything you archive from the home page shows up here.
  - alert [ref=e13]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('Archive', () => {
  4   |   test.setTimeout(60000);
  5   | 
  6   |   // ──────────────────────────────────────────────────────────────────────────
  7   |   // SECTION 1: Archive page rendering
  8   |   // ──────────────────────────────────────────────────────────────────────────
  9   | 
  10  |   /**
  11  |    * TC01: Archive page - loads and renders unconditional elements
  12  |    */
  13  |   test('TC01 - Archive page - loads and renders unconditional elements', async ({ page }) => {
  14  |     await page.goto("/archive");
  15  |     await expect(page.getByRole("heading", { name: "Archive" })).toBeVisible();
  16  |     await expect(page.getByRole("link", { name: "← Back to habits" })).toBeVisible();
  17  |     await expect(page.getByRole("button", { name: /Edit / })).toBeVisible();
  18  |   });
  19  | 
  20  |   // ──────────────────────────────────────────────────────────────────────────
  21  |   // SECTION 2: HabitCard duplicate action
  22  |   // ──────────────────────────────────────────────────────────────────────────
  23  | 
  24  |   /**
  25  |    * TC02: HabitCard in Archive - duplicates an archived habit, which does not appear in Archive but is presumably added to Home
  26  |    */
  27  |   test('TC02 - HabitCard in Archive - duplicates an archived habit, which does not appear in Archive but is presumably added to Home', async ({ page }) => {
  28  |     await page.goto("/archive");
  29  |     const archivedHabitEditButton = page.getByRole("button", { name: /Edit / }).first();
> 30  |     await archivedHabitEditButton.click();
      |                                   ^ Error: locator.click: Test timeout of 60000ms exceeded.
  31  |     const archivedHabitNameLocator = page.getByRole("textbox", { name: /Edit name for / }).first();
  32  |     const archivedHabitName = await archivedHabitNameLocator.inputValue();
  33  |     const duplicateButton = page.getByRole("button", { name: `Duplicate ${archivedHabitName}` });
  34  |     await duplicateButton.click();
  35  |     await expect(page.locator(`text=${archivedHabitName} (copy)`)).toHaveCount(0);
  36  |     await expect(page.getByText("Could not duplicate that habit — try again.")).toHaveCount(0);
  37  |   });
  38  | 
  39  |   // ──────────────────────────────────────────────────────────────────────────
  40  |   // SECTION 3: Archive
  41  |   // ──────────────────────────────────────────────────────────────────────────
  42  | 
  43  |   /**
  44  |    * TC03: Archive page - loads and shows static elements
  45  |    */
  46  |   test('TC03 - Archive page - loads and shows static elements', async ({ page }) => {
  47  |     await page.goto('/archive');
  48  |     await expect(page.getByRole('heading', { name: 'Archive' })).toBeVisible();
  49  |     await expect(page.getByRole('link', { name: '← Back to habits' })).toBeVisible();
  50  |     await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
  51  |     await expect(page.getByRole('button', { name: /switch to dark mode/i })).toBeVisible();
  52  |   });
  53  | 
  54  |   /**
  55  |    * TC04: Archive page - can delete an archived habit
  56  |    */
  57  |   test('TC04 - Archive page - can delete an archived habit', async ({ page }) => {
  58  |     await page.goto('/');
  59  |     const uniqueName = `Test Delete ${Date.now()}`;
  60  |     await page.getByLabel('New habit name').fill(uniqueName);
  61  |     await page.getByLabel('Habit category').selectOption({ index: 0 });
  62  |     await page.getByLabel('Times per week').selectOption('7');
  63  |     await page.getByLabel('Notes (optional)').fill('');
  64  |     await page.getByRole('button', { name: 'Add habit' }).click();
  65  |     const habitCard = page.getByRole('listitem').filter({ hasText: uniqueName });
  66  |     await expect(habitCard).toBeVisible();
  67  |     await habitCard.getByRole('button', { name: `Archive` }).click();
  68  |     await page.goto('/archive');
  69  |     const archivedHabitCard = page.getByRole('listitem').filter({ hasText: uniqueName });
  70  |     await expect(archivedHabitCard).toBeVisible();
  71  |     await archivedHabitCard.getByRole('button', { name: `Delete ${uniqueName}`, exact: true }).click();
  72  |     await page.waitForTimeout(500);
  73  |     await expect(archivedHabitCard).toHaveCount(0);
  74  |   });
  75  | 
  76  |   /**
  77  |    * TC05: Archive page - can unarchive an archived habit
  78  |    */
  79  |   test('TC05 - Archive page - can unarchive an archived habit', async ({ page }) => {
  80  |     await page.goto('/');
  81  |     const uniqueName = `Test Unarchive ${Date.now()}`;
  82  |     await page.getByLabel('New habit name').fill(uniqueName);
  83  |     await page.getByLabel('Habit category').selectOption({ index: 0 });
  84  |     await page.getByLabel('Times per week').selectOption('7');
  85  |     await page.getByLabel('Notes (optional)').fill('');
  86  |     await page.getByRole('button', { name: 'Add habit' }).click();
  87  |     const habitCard = page.getByRole('listitem').filter({ hasText: uniqueName });
  88  |     await expect(habitCard).toBeVisible();
  89  |     await habitCard.getByRole('button', { name: `Archive ${uniqueName}`, exact: true }).click();
  90  |     await page.goto('/archive');
  91  |     const archivedHabitCard = page.getByRole('listitem').filter({ hasText: uniqueName });
  92  |     await expect(archivedHabitCard).toBeVisible();
  93  |     await archivedHabitCard.getByRole('button', { name: `Unarchive ${uniqueName}`, exact: true }).click();
  94  |     await expect(page.getByRole('listitem').filter({ hasText: uniqueName })).toHaveCount(0);
  95  |   });
  96  | 
  97  |   /**
  98  |    * TC06: Archive page - can edit an archived habit\'s details
  99  |    */
  100 |   test('TC06 - Archive page - can edit an archived habit\\\'s details', async ({ page }) => {
  101 |     await page.goto('/');
  102 |     const uniqueName = `Test Edit ${Date.now()}`;
  103 |     await page.getByLabel('New habit name').fill(uniqueName);
  104 |     await page.getByLabel('Habit category').selectOption({ index: 0 });
  105 |     await page.getByLabel('Times per week').selectOption('7');
  106 |     await page.getByLabel('Notes (optional)').fill('');
  107 |     await page.getByRole('button', { name: 'Add habit' }).click();
  108 |     const habitCard = page.getByRole('listitem').filter({ hasText: uniqueName });
  109 |     await expect(habitCard).toBeVisible();
  110 |     await habitCard.getByRole('button', { name: `Archive` }).click();
  111 |     await page.goto('/archive');
  112 |     const archivedHabitCard = page.getByRole('listitem').filter({ hasText: uniqueName });
  113 |     await expect(archivedHabitCard).toBeVisible();
  114 |     await archivedHabitCard.getByRole('button', { name: `Edit ${uniqueName}`, exact: true }).click();
  115 |     const nameInput = page.getByLabel(`Edit name for ${uniqueName}`);
  116 |     await expect(nameInput).toHaveValue(uniqueName);
  117 |     await nameInput.fill(`${uniqueName} updated`);
  118 |     const saveButton = page.getByRole('button', { name: 'Save', exact: true });
  119 |     await saveButton.click();
  120 |     const updatedHabitCard = page.getByRole('listitem').filter({ hasText: `${uniqueName} updated` });
  121 |     await expect(updatedHabitCard).toBeVisible();
  122 |   });
  123 | 
  124 |   /**
  125 |    * TC07: Archive page - can navigate back to home page
  126 |    */
  127 |   test('TC07 - Archive page - can navigate back to home page', async ({ page }) => {
  128 |     await page.goto('/archive');
  129 |     await page.getByRole('link', { name: '← Back to habits' }).click();
  130 |     await expect(page).toHaveURL('/');
```