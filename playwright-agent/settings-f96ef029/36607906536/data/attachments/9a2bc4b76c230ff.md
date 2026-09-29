# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: archive.spec.ts >> Archive >> TC01 - Archive - toggles pin state on an archived habit card
- Location: tests/archive.spec.ts:60:7

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
  3   | function nameInput(page) {
  4   |   return page.getByRole('textbox', { name: 'New habit name' });
  5   | }
  6   | 
  7   | test.describe('Archive', () => {
  8   |   test.setTimeout(60000);
  9   |   test.afterEach(async ({ page }) => {
  10  |     try {
  11  |       page.on('dialog', (dialog) => dialog.accept());
  12  |       const fixtureHabits = page.getByRole('listitem').filter({ hasText: /\d{13}/ });
  13  |       for (let i = 0; i < 20; i++) {
  14  |         const count = await fixtureHabits.count();
  15  |         if (count === 0) break;
  16  |         await fixtureHabits.first().getByRole('button', { name: /^Delete / }).click();
  17  |         await fixtureHabits.first().waitFor({ state: 'detached' }).catch(() => {});
  18  |       }
  19  |     } catch {
  20  |       // Best-effort cleanup -- never fail or flake the test that just ran
  21  |       // over a leftover-habit sweep.
  22  |     }
  23  |   });
  24  | 
  25  |   // ──────────────────────────────────────────────────────────────────────────
  26  |   // SECTION 1: HabitCard - pin toggle
  27  |   // ──────────────────────────────────────────────────────────────────────────
  28  | 
  29  |   /**
  30  |    * TC01: HabitCard - toggle pin state on an archived habit card
  31  |    */
  32  |   test('TC01 - HabitCard - toggle pin state on an archived habit card', async ({ page }) => {
  33  |     await page.goto('/');
  34  |     const habitName = `Pin Test Habit ${Date.now()}`;
  35  |     await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
  36  |     await page.getByRole('combobox', { name: 'Habit category' }).selectOption({ index: 0 });
  37  |     await page.getByRole('combobox', { name: 'Times per week' }).selectOption('7');
  38  |     await page.getByRole('button', { name: 'Add habit' }).click();
  39  |     const homeHabitCard = page.getByRole('listitem').filter({ hasText: habitName });
  40  |     await expect(homeHabitCard).toBeVisible();
  41  |     await homeHabitCard.getByRole('button', { name: `Archive ${habitName}` }).click();
  42  |     await expect(homeHabitCard).toHaveCount(0);
  43  |     await page.goto('/archive');
  44  |     const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
  45  |     await expect(habitCard).toBeVisible();
  46  |     const pinButton = habitCard.getByRole('button', { name: `Pin ${habitName}` });
  47  |     await pinButton.click();
  48  |     await expect(habitCard.getByRole('button', { name: `Unpin ${habitName}` })).toBeVisible();
  49  |     await habitCard.getByRole('button', { name: `Unpin ${habitName}` }).click();
  50  |     await expect(habitCard.getByRole('button', { name: `Pin ${habitName}` })).toBeVisible();
  51  |   });
  52  | 
  53  |   // ──────────────────────────────────────────────────────────────────────────
  54  |   // SECTION 1: Archived habit card pin toggle
  55  |   // ──────────────────────────────────────────────────────────────────────────
  56  | 
  57  |   /**
  58  |    * TC01: Archive - toggles pin state on an archived habit card
  59  |    */
  60  |   test('TC01 - Archive - toggles pin state on an archived habit card', async ({ page }) => {
  61  |     await page.goto('/archive');
  62  |     const nameInput = page.getByRole('textbox', { name: 'New habit name' });
  63  |     const newHabitName = `ArchivePinHabit ${Date.now()}`;
> 64  |     await nameInput.fill(newHabitName);
      |                     ^ Error: locator.fill: Test timeout of 60000ms exceeded.
  65  |     await page.getByRole('button', { name: 'Add habit' }).click();
  66  |     const habitCard = page.getByRole('listitem').filter({ hasText: newHabitName });
  67  |     await habitCard.getByRole('button', { name: `Archive ${newHabitName}` }).click();
  68  |     await expect(habitCard).toHaveCount(0);
  69  |     await page.goto('/archive');
  70  |     const archivedHabitCard = page.getByRole('listitem').filter({ hasText: newHabitName });
  71  |     const pinButton = archivedHabitCard.getByRole('button', { name: new RegExp(`Pin ${newHabitName}|Unpin ${newHabitName}`) });
  72  |     await pinButton.click();
  73  |     const unpinButton = archivedHabitCard.getByRole('button', { name: `Unpin ${newHabitName}` });
  74  |     await expect(unpinButton).toBeVisible();
  75  |     await unpinButton.click();
  76  |     const repinButton = archivedHabitCard.getByRole('button', { name: `Pin ${newHabitName}` });
  77  |     await expect(repinButton).toBeVisible();
  78  |   });
  79  | 
  80  |   // ──────────────────────────────────────────────────────────────────────────
  81  |   // SECTION 2: Archived habit card priority cycle
  82  |   // ──────────────────────────────────────────────────────────────────────────
  83  | 
  84  |   /**
  85  |    * TC02: Archive - cycles priority on an archived habit card
  86  |    */
  87  |   test('TC02 - Archive - cycles priority on an archived habit card', async ({ page }) => {
  88  |     await page.goto('/archive');
  89  |     const nameInput = page.getByRole('textbox', { name: 'New habit name' });
  90  |     const newHabitName = `ArchivePriorityHabit ${Date.now()}`;
  91  |     await nameInput.fill(newHabitName);
  92  |     await page.getByRole('button', { name: 'Add habit' }).click();
  93  |     const habitCard = page.getByRole('listitem').filter({ hasText: newHabitName });
  94  |     await habitCard.getByRole('button', { name: `Archive ${newHabitName}` }).click();
  95  |     await expect(habitCard).toHaveCount(0);
  96  |     await page.goto('/archive');
  97  |     const archivedHabitCard = page.getByRole('listitem').filter({ hasText: newHabitName });
  98  |     const priorityButton = archivedHabitCard.getByRole('button', { name: new RegExp(`Cycle priority for ${newHabitName}, currently (Low|Medium|High)`) });
  99  |     const initialPriority = await priorityButton.textContent();
  100 |     await priorityButton.click();
  101 |     const nextPriorityButton = archivedHabitCard.getByRole('button', { name: new RegExp(`Cycle priority for ${newHabitName}, currently (Low|Medium|High)`) });
  102 |     const nextPriority = await nextPriorityButton.textContent();
  103 |     expect(nextPriority).not.toBe(initialPriority);
  104 |   });
  105 | 
  106 |   // ──────────────────────────────────────────────────────────────────────────
  107 |   // SECTION 3: Archive
  108 |   // ──────────────────────────────────────────────────────────────────────────
  109 | 
  110 |   /**
  111 |    * TC03: HabitCard - toggle pin state on an archived habit card
  112 |    */
  113 |   test('TC03 - HabitCard - toggle pin state on an archived habit card', async ({ page }) => {
  114 |     await page.goto('/');
  115 |     const habitName = `Pin Test Habit ${Date.now()}`;
  116 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
  117 |     await page.getByRole('combobox', { name: 'Habit category' }).selectOption({ index: 0 });
  118 |     await page.getByRole('combobox', { name: 'Times per week' }).selectOption('7');
  119 |     await page.getByRole('button', { name: 'Add habit' }).click();
  120 |     const homeHabitCard = page.getByRole('listitem').filter({ hasText: habitName });
  121 |     await expect(homeHabitCard).toBeVisible();
  122 |     await homeHabitCard.getByRole('button', { name: `Archive ${habitName}` }).click();
  123 |     await expect(homeHabitCard).toHaveCount(0);
  124 |     await page.goto('/archive');
  125 |     const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
  126 |     await expect(habitCard).toBeVisible();
  127 |     const pinButton = habitCard.getByRole('button', { name: `Pin ${habitName}` });
  128 |     await pinButton.click();
  129 |     await expect(habitCard.getByRole('button', { name: `Unpin ${habitName}` })).toBeVisible();
  130 |     await habitCard.getByRole('button', { name: `Unpin ${habitName}` }).click();
  131 |     await expect(habitCard.getByRole('button', { name: `Pin ${habitName}` })).toBeVisible();
  132 |   });
  133 | 
  134 |   /**
  135 |    * TC04: HabitCard - cycle priority on an archived habit card
  136 |    */
  137 |   test('TC04 - HabitCard - cycle priority on an archived habit card', async ({ page }) => {
  138 |     await page.goto('/');
  139 |     const habitName = `Priority Test Habit ${Date.now()}`;
  140 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
  141 |     await page.getByRole('combobox', { name: 'Habit category' }).selectOption({ index: 0 });
  142 |     await page.getByRole('combobox', { name: 'Times per week' }).selectOption('7');
  143 |     await page.getByRole('button', { name: 'Add habit' }).click();
  144 |     const homeHabitCard = page.getByRole('listitem').filter({ hasText: habitName });
  145 |     await expect(homeHabitCard).toBeVisible();
  146 |     await homeHabitCard.getByRole('button', { name: `Archive ${habitName}` }).click();
  147 |     await expect(homeHabitCard).toHaveCount(0);
  148 |     await page.goto('/archive');
  149 |     const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
  150 |     await expect(habitCard).toBeVisible();
  151 |     const priorityButton = habitCard.getByRole('button', { name: new RegExp(`Cycle priority for ${habitName}, currently (Low|Medium|High)`) });
  152 |     const initialPriority = await priorityButton.textContent();
  153 |     await priorityButton.click();
  154 |     const nextPriority = initialPriority === 'Low' ? 'Medium' : initialPriority === 'Medium' ? 'High' : 'Low';
  155 |     await expect(habitCard.getByRole('button', { name: `Cycle priority for ${habitName}, currently ${nextPriority}` })).toBeVisible();
  156 |   });
  157 | 
  158 |   /**
  159 |    * TC05: Archive page - loads and renders main UI elements
  160 |    */
  161 |   test('TC05 - Archive page - loads and renders main UI elements', async ({ page }) => {
  162 |     await page.goto('/archive');
  163 |     await expect(page.getByRole('heading', { name: 'Archive' })).toBeVisible();
  164 |     await expect(page.getByText("Habits you've archived, out of the main list.")).toBeVisible();
```