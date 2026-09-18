# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> Home >> TC03 - HabitCard - freeze and unfreeze habit for today
- Location: tests/home.spec.ts:53:7

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByRole('listitem').filter({ hasText: 'FreezeHabit 1789731726571' }).getByRole('button', { name: '🧊 Freeze' })

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
        - button "Complete all for today (2)" [ref=e33]
        - button "Export JSON" [ref=e34]
        - button "Export CSV" [ref=e35]
    - list [ref=e36]:
      - listitem [ref=e37]:
        - generic [ref=e38]:
          - generic [ref=e39]:
            - paragraph [ref=e40]: CompleteHabit 1789731662716
            - generic [ref=e41]: General
          - paragraph [ref=e42]: 🔥 1 day streak
          - generic [ref=e43]:
            - progressbar "CompleteHabit 1789731662716 weekly progress"
            - generic [ref=e44]: 1/7 this week
        - generic [ref=e45]:
          - button "Done today" [disabled] [ref=e46]
          - button "Freeze CompleteHabit 1789731662716 for today" [disabled] [ref=e47]: 🧊 Freeze
          - button "Edit CompleteHabit 1789731662716" [ref=e48]: Edit
          - button "Archive CompleteHabit 1789731662716" [ref=e49]: Archive
          - button "Delete CompleteHabit 1789731662716" [ref=e50]: Remove
      - listitem [ref=e51]:
        - generic [ref=e52]:
          - generic [ref=e53]:
            - paragraph [ref=e54]: FreezeHabit 1789731663820
            - generic [ref=e55]: General
            - status "FreezeHabit 1789731663820 is at risk of missing its weekly goal" [ref=e56]: ⏰ Due today
          - paragraph [ref=e57]: Start your streak today!
          - generic [ref=e58]:
            - progressbar "FreezeHabit 1789731663820 weekly progress"
            - generic [ref=e59]: 0/7 this week
        - generic [ref=e60]:
          - button "Mark done" [ref=e61]
          - button "Freeze FreezeHabit 1789731663820 for today" [ref=e62]: 🧊 Freeze
          - button "Edit FreezeHabit 1789731663820" [ref=e63]: Edit
          - button "Archive FreezeHabit 1789731663820" [ref=e64]: Archive
          - button "Delete FreezeHabit 1789731663820" [ref=e65]: Remove
      - listitem [ref=e66]:
        - generic [ref=e67]:
          - generic [ref=e68]:
            - paragraph [ref=e69]: FreezeHabit 1789731726571
            - generic [ref=e70]: General
            - status "FreezeHabit 1789731726571 is at risk of missing its weekly goal" [ref=e71]: ⏰ Due today
          - paragraph [ref=e72]: Start your streak today!
          - generic [ref=e73]:
            - progressbar "FreezeHabit 1789731726571 weekly progress"
            - generic [ref=e74]: 0/7 this week
        - generic [ref=e75]:
          - button "Mark done" [ref=e76]
          - button "Freeze FreezeHabit 1789731726571 for today" [ref=e77]: 🧊 Freeze
          - button "Edit FreezeHabit 1789731726571" [ref=e78]: Edit
          - button "Archive FreezeHabit 1789731726571" [ref=e79]: Archive
          - button "Delete FreezeHabit 1789731726571" [ref=e80]: Remove
  - alert [ref=e81]
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
> 59  |     await card.getByRole("button", { name: "🧊 Freeze" }).click();
      |                                                           ^ Error: locator.click: Test timeout of 60000ms exceeded.
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
  86  |     await page.getByRole("link", { name: "History" }).click();
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
```