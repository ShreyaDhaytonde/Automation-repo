# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> Home >> TC05 - Home page - search filters habits by name
- Location: tests/home.spec.ts:99:7

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.fill: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByLabel('habit-search')

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
        - button "Complete all for today (3)" [ref=e33]
        - button "Export JSON" [ref=e34]
        - button "Export CSV" [ref=e35]
    - list [ref=e36]:
      - listitem [ref=e37]:
        - generic [ref=e38]:
          - generic [ref=e39]:
            - paragraph [ref=e40]: ArchiveHabit 1789731789142
            - generic [ref=e41]: General
            - status "ArchiveHabit 1789731789142 is at risk of missing its weekly goal" [ref=e42]: ⏰ Due today
          - paragraph [ref=e43]: Start your streak today!
          - generic [ref=e44]:
            - progressbar "ArchiveHabit 1789731789142 weekly progress"
            - generic [ref=e45]: 0/7 this week
        - generic [ref=e46]:
          - button "Mark done" [ref=e47]
          - button "Freeze ArchiveHabit 1789731789142 for today" [ref=e48]: 🧊 Freeze
          - button "Edit ArchiveHabit 1789731789142" [ref=e49]: Edit
          - button "Archive ArchiveHabit 1789731789142" [ref=e50]: Archive
          - button "Delete ArchiveHabit 1789731789142" [ref=e51]: Remove
      - listitem [ref=e52]:
        - generic [ref=e53]:
          - generic [ref=e54]:
            - paragraph [ref=e55]: ArchiveHabit 1789731851580
            - generic [ref=e56]: General
            - status "ArchiveHabit 1789731851580 is at risk of missing its weekly goal" [ref=e57]: ⏰ Due today
          - paragraph [ref=e58]: Start your streak today!
          - generic [ref=e59]:
            - progressbar "ArchiveHabit 1789731851580 weekly progress"
            - generic [ref=e60]: 0/7 this week
        - generic [ref=e61]:
          - button "Mark done" [ref=e62]
          - button "Freeze ArchiveHabit 1789731851580 for today" [ref=e63]: 🧊 Freeze
          - button "Edit ArchiveHabit 1789731851580" [ref=e64]: Edit
          - button "Archive ArchiveHabit 1789731851580" [ref=e65]: Archive
          - button "Delete ArchiveHabit 1789731851580" [ref=e66]: Remove
      - listitem [ref=e67]:
        - generic [ref=e68]:
          - generic [ref=e69]:
            - paragraph [ref=e70]: SearchHabit 1789731914093
            - generic [ref=e71]: General
            - status "SearchHabit 1789731914093 is at risk of missing its weekly goal" [ref=e72]: ⏰ Due today
          - paragraph [ref=e73]: Start your streak today!
          - generic [ref=e74]:
            - progressbar "SearchHabit 1789731914093 weekly progress"
            - generic [ref=e75]: 0/7 this week
        - generic [ref=e76]:
          - button "Mark done" [ref=e77]
          - button "Freeze SearchHabit 1789731914093 for today" [ref=e78]: 🧊 Freeze
          - button "Edit SearchHabit 1789731914093" [ref=e79]: Edit
          - button "Archive SearchHabit 1789731914093" [ref=e80]: Archive
          - button "Delete SearchHabit 1789731914093" [ref=e81]: Remove
  - alert [ref=e82]
```

# Test source

```ts
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
> 104 |     await page.getByLabel("habit-search").fill(uniqueName);
      |                                           ^ Error: locator.fill: Test timeout of 60000ms exceeded.
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
  187 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(uniqueName);
  188 |     await page.getByRole('button', { name: 'Add habit' }).click();
  189 |     await expect(page.getByRole('listitem').filter({ hasText: uniqueName })).toBeVisible();
  190 |     await page.getByRole('searchbox', { name: 'Search habits by name' }).fill(uniqueName);
  191 |     await expect(page.getByRole('listitem').filter({ hasText: uniqueName })).toBeVisible();
  192 |     await page.getByRole('searchbox', { name: 'Search habits by name' }).fill('nonexistentsearchterm' + Date.now());
  193 |     await expect(page.getByText(`No habits match "nonexistentsearchterm`)).toBeVisible();
  194 |   });
  195 | 
  196 |   /**
  197 |    * TC11: Sort by dropdown - sorts habit list by name ascending
  198 |    */
  199 |   test('TC11 - Sort by dropdown - sorts habit list by name ascending', async ({ page }) => {
  200 |     await page.goto('/');
  201 |     const uniqueNameA = `SortA ${Date.now()}`;
  202 |     const uniqueNameB = `SortB ${Date.now() + 1}`;
  203 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(uniqueNameB);
  204 |     await page.getByRole('button', { name: 'Add habit' }).click();
```