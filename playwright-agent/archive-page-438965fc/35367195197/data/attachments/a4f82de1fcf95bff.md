# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: archive.spec.ts >> Archive page >> TC08 - Archive page - edit an archived habit\'s name
- Location: tests/archive.spec.ts:151:7

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
  54  |     await page.getByLabel('Habit category').selectOption({ index: 0 });
  55  |     await page.getByLabel('Times per week').selectOption('7');
  56  |     await page.getByLabel('Notes (optional)').fill('');
  57  |     await page.getByRole('button', { name: 'Add habit' }).click();
  58  |     const habitCard = page.getByRole('listitem').filter({ hasText: uniqueName });
  59  |     await expect(habitCard).toBeVisible();
  60  |     await habitCard.getByRole('button', { name: `Archive` }).click();
  61  |     await page.goto('/archive');
  62  |     const archivedHabitCard = page.getByRole('listitem').filter({ hasText: uniqueName });
  63  |     await expect(archivedHabitCard).toBeVisible();
  64  |     await archivedHabitCard.getByRole('button', { name: `Unarchive ${uniqueName}`, exact: true }).click();
  65  |     await expect(archivedHabitCard).toHaveCount(0);
  66  |   });
  67  | 
  68  |   /**
  69  |    * TC04: Archive page - can edit an archived habit's details
  70  |    */
  71  |   test('TC04 - Archive page - can edit an archived habit\'s details', async ({ page }) => {
  72  |     await page.goto('/');
  73  |     const uniqueName = `Test Edit ${Date.now()}`;
  74  |     await page.getByLabel('New habit name').fill(uniqueName);
  75  |     await page.getByLabel('Habit category').selectOption({ index: 0 });
  76  |     await page.getByLabel('Times per week').selectOption('7');
  77  |     await page.getByLabel('Notes (optional)').fill('');
  78  |     await page.getByRole('button', { name: 'Add habit' }).click();
  79  |     const habitCard = page.getByRole('listitem').filter({ hasText: uniqueName });
  80  |     await expect(habitCard).toBeVisible();
  81  |     await habitCard.getByRole('button', { name: `Archive` }).click();
  82  |     await page.goto('/archive');
  83  |     const archivedHabitCard = page.getByRole('listitem').filter({ hasText: uniqueName });
  84  |     await expect(archivedHabitCard).toBeVisible();
  85  |     await archivedHabitCard.getByRole('button', { name: `Edit ${uniqueName}`, exact: true }).click();
  86  |     const nameInput = page.getByLabel(`Edit name for ${uniqueName}`);
  87  |     await expect(nameInput).toHaveValue(uniqueName);
  88  |     await nameInput.fill(`${uniqueName} updated`);
  89  |     const saveButton = page.getByRole('button', { name: 'Save', exact: true });
  90  |     await saveButton.click();
  91  |     const updatedHabitCard = page.getByRole('listitem').filter({ hasText: `${uniqueName} updated` });
  92  |     await expect(updatedHabitCard).toBeVisible();
  93  |   });
  94  | 
  95  |   // ──────────────────────────────────────────────────────────────────────────
  96  |   // SECTION 3: Navigation
  97  |   // ──────────────────────────────────────────────────────────────────────────
  98  | 
  99  |   /**
  100 |    * TC05: Archive page - can navigate back to home page
  101 |    */
  102 |   test('TC05 - Archive page - can navigate back to home page', async ({ page }) => {
  103 |     await page.goto('/archive');
  104 |     await page.getByRole('link', { name: '← Back to habits' }).click();
  105 |     await expect(page).toHaveURL('/');
  106 |     await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
  107 |   });
  108 | 
  109 |   // ──────────────────────────────────────────────────────────────────────────
  110 |   // SECTION 4: Archive page
  111 |   // ──────────────────────────────────────────────────────────────────────────
  112 | 
  113 |   /**
  114 |    * TC06: Archive page - renders with heading and controls
  115 |    */
  116 |   test('TC06 - Archive page - renders with heading and controls', async ({ page }) => {
  117 |     await page.goto('/archive');
  118 |     await expect(page.getByRole('heading', { name: 'Archive' })).toBeVisible();
  119 |     await expect(page.getByText("Habits you've archived, out of the main list.")).toBeVisible();
  120 |     await expect(page.getByRole('link', { name: '← Back to habits' })).toBeVisible();
  121 |     await expect(page.getByText('No archived habits — anything you archive from the home page shows up here.')).toBeVisible();
  122 |     await expect(page.getByRole('button', { name: 'Theme toggle' })).toBeVisible();
  123 |     await expect(page.getByRole('button', { name: 'Log out' })).toBeVisible();
  124 |   });
  125 | 
  126 |   /**
  127 |    * TC07: Archive page - create and unarchive a habit
  128 |    */
  129 |   test('TC07 - Archive page - create and unarchive a habit', async ({ page }) => {
  130 |     const newHabitName = `Unarchive Test ${Date.now()}`;
  131 |     await page.goto('/');
  132 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(newHabitName);
  133 |     await page.locator('select[aria-label="Habit category"]').selectOption({ index: 1 });
  134 |     await page.getByLabel('Target per week').fill('1');
  135 |     await page.getByLabel('Notes').fill('Testing unarchive.');
  136 |     await page.getByRole('button', { name: 'Add habit' }).click();
  137 |     const habitCard = page.getByRole('listitem').filter({ hasText: newHabitName });
  138 |     await expect(habitCard).toBeVisible();
  139 |     await habitCard.getByRole('button', { name: `Archive ${newHabitName}` }).click();
  140 |     await expect(habitCard).toHaveCount(0);
  141 |     await page.goto('/archive');
  142 |     const archivedHabit = page.getByRole('listitem').filter({ hasText: newHabitName });
  143 |     await expect(archivedHabit).toBeVisible();
  144 |     await archivedHabit.getByRole('button', { name: `Unarchive ${newHabitName}` }).click();
  145 |     await expect(archivedHabit).toHaveCount(0);
  146 |   });
  147 | 
  148 |   /**
  149 |    * TC08: Archive page - edit an archived habit\'s name
  150 |    */
  151 |   test('TC08 - Archive page - edit an archived habit\\\'s name', async ({ page }) => {
  152 |     const habitName = `Edit Archived ${Date.now()}`;
  153 |     await page.goto('/');
> 154 |     await page.getByLabel('Name').fill(habitName);
      |                                   ^ Error: locator.fill: Error: strict mode violation: getByLabel('Name') resolved to 2 elements:
  155 |     await page.getByLabel('Category').selectOption({ index: 1 });
  156 |     await page.getByLabel('Target per week').fill('3');
  157 |     await page.getByLabel('Notes').fill('Editing archived habit test.');
  158 |     await page.getByRole('button', { name: 'Add habit' }).click();
  159 |     const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
  160 |     await expect(habitCard).toBeVisible();
  161 |     await habitCard.getByRole('button', { name: `Archive ${habitName}` }).click();
  162 |     await expect(habitCard).toHaveCount(0);
  163 |     await page.goto('/archive');
  164 |     const archivedHabit = page.getByRole('listitem').filter({ hasText: habitName });
  165 |     await expect(archivedHabit).toBeVisible();
  166 |     await archivedHabit.getByRole('button', { name: `Edit ${habitName}` }).click();
  167 |     const nameInput = page.getByLabel(`Edit name for ${habitName}`);
  168 |     await expect(nameInput).toBeVisible();
  169 |     const newName = `Edited Archived ${Date.now()}`;
  170 |     await nameInput.fill(newName);
  171 |     await archivedHabit.getByRole('button', { name: `Save ${habitName}` }).click();
  172 |     await expect(page.getByRole('listitem').filter({ hasText: newName })).toBeVisible();
  173 |   });
  174 | 
  175 |   /**
  176 |    * TC09: Archive page - delete an archived habit
  177 |    */
  178 |   test('TC09 - Archive page - delete an archived habit', async ({ page }) => {
  179 |     const habitName = `Delete Archived ${Date.now()}`;
  180 |     await page.goto('/');
  181 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
  182 |     await page.locator('select[aria-label="Habit category"]').selectOption({ index: 1 });
  183 |     await page.getByLabel('Target per week').fill('2');
  184 |     await page.getByLabel('Notes').fill('Deleting archived habit test.');
  185 |     await page.getByRole('button', { name: 'Add habit' }).click();
  186 |     const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
  187 |     await expect(habitCard).toBeVisible();
  188 |     await habitCard.getByRole('button', { name: `Archive ${habitName}` }).click();
  189 |     await expect(habitCard).toHaveCount(0);
  190 |     await page.goto('/archive');
  191 |     const archivedHabit = page.getByRole('listitem').filter({ hasText: habitName });
  192 |     await expect(archivedHabit).toBeVisible();
  193 |     await archivedHabit.getByRole('button', { name: `Delete ${habitName}` }).click();
  194 |     await expect(page.getByRole('listitem').filter({ hasText: habitName })).toHaveCount(0);
  195 |   });
  196 | 
  197 |   /**
  198 |    * TC10: History page - renders with heading and controls
  199 |    */
  200 |   test('TC10 - History page - renders with heading and controls', async ({ page }) => {
  201 |     await page.goto('/history');
  202 |     await expect(page.getByRole('heading', { name: 'History' })).toBeVisible();
  203 |     await expect(page.getByText('Last 28 days for each habit.')).toBeVisible();
  204 |     await expect(page.getByRole('link', { name: '← Back to habits' })).toBeVisible();
  205 |     await expect(page.getByText('Done')).toBeVisible();
  206 |     await expect(page.getByText('Frozen')).toBeVisible();
  207 |     await expect(page.getByText('Missed')).toBeVisible();
  208 |     await expect(page.getByRole('button', { name: 'Theme toggle' })).toBeVisible();
  209 |     await expect(page.getByRole('button', { name: 'Log out' })).toBeVisible();
  210 |   });
  211 | 
  212 |   /**
  213 |    * TC11: Home page - renders with heading and controls
  214 |    */
  215 |   test('TC11 - Home page - renders with heading and controls', async ({ page }) => {
  216 |     await page.goto('/');
  217 |     await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
  218 |     await expect(page.getByText('Build small daily habits, one day at a time.')).toBeVisible();
  219 |     await expect(page.getByRole('link', { name: 'History' })).toBeVisible();
  220 |     await expect(page.getByRole('link', { name: 'View stats' })).toBeVisible();
  221 |     await expect(page.getByRole('link', { name: 'Archive' })).toBeVisible();
  222 |     await expect(page.getByRole('button', { name: 'Theme toggle' })).toBeVisible();
  223 |     await expect(page.getByRole('button', { name: 'Log out' })).toBeVisible();
  224 |     await expect(page.getByRole('textbox', { name: 'Name' })).toBeVisible();
  225 |     await expect(page.getByLabel('Category')).toBeVisible();
  226 |     await expect(page.getByLabel('Target per week')).toBeVisible();
  227 |     await expect(page.getByLabel('Notes')).toBeVisible();
  228 |     await expect(page.getByRole('button', { name: 'Add habit' })).toBeVisible();
  229 |   });
  230 | 
  231 |   /**
  232 |    * TC12: History page - habit strips render and show status dots
  233 |    */
  234 |   test('TC12 - History page - habit strips render and show status dots', async ({ page }) => {
  235 |     const habitName = `History Test ${Date.now()}`;
  236 |     await page.goto('/');
  237 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
  238 |     await page.locator('select[aria-label="Habit category"]').selectOption({ index: 1 });
  239 |     await page.getByLabel('Target per week').fill('3');
  240 |     await page.getByLabel('Notes').fill('History strip rendering test.');
  241 |     await page.getByRole('button', { name: 'Add habit' }).click();
  242 |     await page.goto('/history');
  243 |     const habitStrip = page.getByRole('img', { name: `${habitName} activity for the last 28 days` });
  244 |     await expect(habitStrip).toBeVisible();
  245 |   });
  246 | 
  247 |   // ──────────────────────────────────────────────────────────────────────────
  248 |   // SECTION 5: Loading error handling
  249 |   // ──────────────────────────────────────────────────────────────────────────
  250 | 
  251 |   /**
  252 |    * TC13: Archive page - error message appears when loading fails (non-deterministic)
  253 |    */
  254 |   test('TC13 - Archive page - error message appears when loading fails (non-deterministic)', async ({ page }) => {
```