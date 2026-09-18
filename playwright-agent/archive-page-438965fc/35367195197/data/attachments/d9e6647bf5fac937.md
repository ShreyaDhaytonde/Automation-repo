# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: archive.spec.ts >> Archive page >> TC11 - Home page - renders with heading and controls
- Location: tests/archive.spec.ts:215:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('button', { name: 'Theme toggle' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('button', { name: 'Theme toggle' }) with timeout 10000ms
  - waiting for getByRole('button', { name: 'Theme toggle' })

```

```yaml
- main:
  - heading "Habit Tracker" [level=1]
  - paragraph: Build small daily habits, one day at a time.
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
  - button "Complete all for today (6)"
  - button "Export JSON"
  - button "Export CSV"
  - list:
    - listitem:
      - paragraph: Test Delete 1789748137389
      - text: General
      - status "Test Delete 1789748137389 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "Test Delete 1789748137389 weekly progress"
      - text: 0/7 this week
      - button "Mark done"
      - button "Freeze Test Delete 1789748137389 for today": 🧊 Freeze
      - button "Edit Test Delete 1789748137389": Edit
      - button "Archive Test Delete 1789748137389": Archive
      - button "Delete Test Delete 1789748137389": Remove
    - listitem:
      - paragraph: Test Delete 1789748149555
      - text: General
      - status "Test Delete 1789748149555 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "Test Delete 1789748149555 weekly progress"
      - text: 0/7 this week
      - button "Mark done"
      - button "Freeze Test Delete 1789748149555 for today": 🧊 Freeze
      - button "Edit Test Delete 1789748149555": Edit
      - button "Archive Test Delete 1789748149555": Archive
      - button "Delete Test Delete 1789748149555": Remove
    - listitem:
      - paragraph: Test Edit 1789748166810
      - text: General
      - status "Test Edit 1789748166810 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "Test Edit 1789748166810 weekly progress"
      - text: 0/7 this week
      - button "Mark done"
      - button "Freeze Test Edit 1789748166810 for today": 🧊 Freeze
      - button "Edit Test Edit 1789748166810": Edit
      - button "Archive Test Edit 1789748166810": Archive
      - button "Delete Test Edit 1789748166810": Remove
    - listitem:
      - paragraph: Test Edit 1789748178916
      - text: General
      - status "Test Edit 1789748178916 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "Test Edit 1789748178916 weekly progress"
      - text: 0/7 this week
      - button "Mark done"
      - button "Freeze Test Edit 1789748178916 for today": 🧊 Freeze
      - button "Edit Test Edit 1789748178916": Edit
      - button "Archive Test Edit 1789748178916": Archive
      - button "Delete Test Edit 1789748178916": Remove
    - listitem:
      - paragraph: Test Unarchive 1789748162985
      - text: General
      - status "Test Unarchive 1789748162985 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "Test Unarchive 1789748162985 weekly progress"
      - text: 0/7 this week
      - button "Mark done"
      - button "Freeze Test Unarchive 1789748162985 for today": 🧊 Freeze
      - button "Edit Test Unarchive 1789748162985": Edit
      - button "Archive Test Unarchive 1789748162985": Archive
      - button "Delete Test Unarchive 1789748162985": Remove
    - listitem:
      - paragraph: Test Unarchive 1789748165278
      - text: General
      - status "Test Unarchive 1789748165278 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "Test Unarchive 1789748165278 weekly progress"
      - text: 0/7 this week
      - button "Mark done"
      - button "Freeze Test Unarchive 1789748165278 for today": 🧊 Freeze
      - button "Edit Test Unarchive 1789748165278": Edit
      - button "Archive Test Unarchive 1789748165278": Archive
      - button "Delete Test Unarchive 1789748165278": Remove
- alert
```

# Test source

```ts
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
  154 |     await page.getByLabel('Name').fill(habitName);
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
> 222 |     await expect(page.getByRole('button', { name: 'Theme toggle' })).toBeVisible();
      |                                                                      ^ Error: expect(locator).toBeVisible() failed
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
  255 |     await page.goto('/archive');
  256 |     await expect(page.locator('text=Could not load archived habits. Is the API running?')).toBeHidden();
  257 |   });
  258 | 
  259 |   // ──────────────────────────────────────────────────────────────────────────
  260 |   // SECTION 6: Empty state
  261 |   // ──────────────────────────────────────────────────────────────────────────
  262 | 
  263 |   /**
  264 |    * TC14: Archive page - empty state message is shown when no habits are archived (not reachable without backend control)
  265 |    */
  266 |   test('TC14 - Archive page - empty state message is shown when no habits are archived (not reachable without backend control)', async ({ page }) => {
  267 |     await page.goto('/archive');
  268 |     await expect(page.locator('text=No archived habits — anything you archive from the home page shows up here.')).toBeHidden();
  269 |   });
  270 | 
  271 | });
  272 | 
```