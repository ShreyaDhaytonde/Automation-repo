# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: archive.spec.ts >> Archive >> TC13 - History page - habit strips render and show status dots
- Location: tests/archive.spec.ts:235:7

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.fill: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByLabel('Target per week')

```

# Page snapshot

```yaml
- generic [ref=e1]:
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
      - textbox "New habit name" [active] [ref=e16]:
        - /placeholder: e.g. Drink more water
        - text: History Test 1789800797818
      - combobox "Habit category" [ref=e17]:
        - option "General"
        - option "Health" [selected]
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
      - button "Add habit" [ref=e20]
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
        - button "Complete all for today (1)" [ref=e33]
        - button "Export JSON" [ref=e34]
        - button "Export CSV" [ref=e35]
    - list [ref=e36]:
      - listitem [ref=e37]:
        - generic:
          - generic:
            - paragraph [ref=e38]: Test Unarchive 1789800421375
            - generic [ref=e39]: General
            - status "Test Unarchive 1789800421375 is at risk of missing its weekly goal" [ref=e40]: ⏰ Due today
          - paragraph: Start your streak today!
          - generic:
            - progressbar "Test Unarchive 1789800421375 weekly progress"
            - generic [ref=e41]: 0/7 this week
        - generic [ref=e42]:
          - button "Mark done" [ref=e43]
          - button "Freeze Test Unarchive 1789800421375 for today" [ref=e44]: 🧊 Freeze
          - button "Edit Test Unarchive 1789800421375" [ref=e45]: Edit
          - button "Duplicate Test Unarchive 1789800421375" [ref=e46]: Duplicate
          - button "Archive Test Unarchive 1789800421375" [ref=e47]: Archive
          - button "Delete Test Unarchive 1789800421375" [ref=e48]: Remove
  - alert [ref=e49]
```

# Test source

```ts
  140 |     await habitCard.getByRole('button', { name: `Archive ${newHabitName}` }).click();
  141 |     await expect(habitCard).toHaveCount(0);
  142 |     await page.goto('/archive');
  143 |     const archivedHabit = page.getByRole('listitem').filter({ hasText: newHabitName });
  144 |     await expect(archivedHabit).toBeVisible();
  145 |     await archivedHabit.getByRole('button', { name: `Unarchive ${newHabitName}` }).click();
  146 |     await expect(archivedHabit).toHaveCount(0);
  147 |   });
  148 | 
  149 |   /**
  150 |    * TC09: Archive page - edit an archived habit\\\'s name
  151 |    */
  152 |   test('TC09 - Archive page - edit an archived habit\\\\\\\'s name', async ({ page }) => {
  153 |     const habitName = `Edit Archived ${Date.now()}`;
  154 |     await page.goto('/');
  155 |     await page.getByLabel('Name').fill(habitName);
  156 |     await page.getByLabel('Category').selectOption({ index: 1 });
  157 |     await page.getByLabel('Target per week').fill('3');
  158 |     await page.getByLabel('Notes').fill('Editing archived habit test.');
  159 |     await page.getByRole('button', { name: 'Add habit' }).click();
  160 |     const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
  161 |     await expect(habitCard).toBeVisible();
  162 |     await habitCard.getByRole('button', { name: `Archive ${habitName}` }).click();
  163 |     await expect(habitCard).toHaveCount(0);
  164 |     await page.goto('/archive');
  165 |     const archivedHabit = page.getByRole('listitem').filter({ hasText: habitName });
  166 |     await expect(archivedHabit).toBeVisible();
  167 |     await archivedHabit.getByRole('button', { name: `Edit ${habitName}` }).click();
  168 |     const nameInput = page.getByLabel(`Edit name for ${habitName}`);
  169 |     await expect(nameInput).toBeVisible();
  170 |     const newName = `Edited Archived ${Date.now()}`;
  171 |     await nameInput.fill(newName);
  172 |     await archivedHabit.getByRole('button', { name: `Save ${habitName}` }).click();
  173 |     await expect(page.getByRole('listitem').filter({ hasText: newName })).toBeVisible();
  174 |   });
  175 | 
  176 |   /**
  177 |    * TC10: Archive page - delete an archived habit
  178 |    */
  179 |   test('TC10 - Archive page - delete an archived habit', async ({ page }) => {
  180 |     const habitName = `Delete Archived ${Date.now()}`;
  181 |     await page.goto('/');
  182 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
  183 |     await page.locator('select[aria-label="Habit category"]').selectOption({ index: 1 });
  184 |     await page.getByLabel('Target per week').fill('2');
  185 |     await page.getByLabel('Notes').fill('Deleting archived habit test.');
  186 |     await page.getByRole('button', { name: 'Add habit' }).click();
  187 |     const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
  188 |     await expect(habitCard).toBeVisible();
  189 |     await habitCard.getByRole('button', { name: `Archive ${habitName}` }).click();
  190 |     await expect(habitCard).toHaveCount(0);
  191 |     await page.goto('/archive');
  192 |     const archivedHabit = page.getByRole('listitem').filter({ hasText: habitName });
  193 |     await expect(archivedHabit).toBeVisible();
  194 |     await archivedHabit.getByRole('button', { name: `Delete ${habitName}` }).click();
  195 |     await expect(page.getByRole('listitem').filter({ hasText: habitName })).toHaveCount(0);
  196 |   });
  197 | 
  198 |   /**
  199 |    * TC11: History page - renders with heading and controls
  200 |    */
  201 |   test('TC11 - History page - renders with heading and controls', async ({ page }) => {
  202 |     await page.goto('/history');
  203 |     await expect(page.getByRole('heading', { name: 'History' })).toBeVisible();
  204 |     await expect(page.getByText('Last 28 days for each habit.')).toBeVisible();
  205 |     await expect(page.getByRole('link', { name: '← Back to habits' })).toBeVisible();
  206 |     await expect(page.getByText('Done')).toBeVisible();
  207 |     await expect(page.getByText('Frozen')).toBeVisible();
  208 |     await expect(page.getByText('Missed')).toBeVisible();
  209 |     await expect(page.getByRole('button', { name: 'Theme toggle' })).toBeVisible();
  210 |     await expect(page.getByRole('button', { name: 'Log out' })).toBeVisible();
  211 |   });
  212 | 
  213 |   /**
  214 |    * TC12: Home page - renders with heading and controls
  215 |    */
  216 |   test('TC12 - Home page - renders with heading and controls', async ({ page }) => {
  217 |     await page.goto('/');
  218 |     await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
  219 |     await expect(page.getByText('Build small daily habits, one day at a time.')).toBeVisible();
  220 |     await expect(page.getByRole('link', { name: 'History' })).toBeVisible();
  221 |     await expect(page.getByRole('link', { name: 'View stats' })).toBeVisible();
  222 |     await expect(page.getByRole('link', { name: 'Archive' })).toBeVisible();
  223 |     await expect(page.getByRole('button', { name: 'Theme toggle' })).toBeVisible();
  224 |     await expect(page.getByRole('button', { name: 'Log out' })).toBeVisible();
  225 |     await expect(page.getByRole('textbox', { name: 'Name' })).toBeVisible();
  226 |     await expect(page.getByLabel('Category')).toBeVisible();
  227 |     await expect(page.getByLabel('Target per week')).toBeVisible();
  228 |     await expect(page.getByLabel('Notes')).toBeVisible();
  229 |     await expect(page.getByRole('button', { name: 'Add habit' })).toBeVisible();
  230 |   });
  231 | 
  232 |   /**
  233 |    * TC13: History page - habit strips render and show status dots
  234 |    */
  235 |   test('TC13 - History page - habit strips render and show status dots', async ({ page }) => {
  236 |     const habitName = `History Test ${Date.now()}`;
  237 |     await page.goto('/');
  238 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
  239 |     await page.locator('select[aria-label="Habit category"]').selectOption({ index: 1 });
> 240 |     await page.getByLabel('Target per week').fill('3');
      |                                              ^ Error: locator.fill: Test timeout of 60000ms exceeded.
  241 |     await page.getByLabel('Notes').fill('History strip rendering test.');
  242 |     await page.getByRole('button', { name: 'Add habit' }).click();
  243 |     await page.goto('/history');
  244 |     const habitStrip = page.getByRole('img', { name: `${habitName} activity for the last 28 days` });
  245 |     await expect(habitStrip).toBeVisible();
  246 |   });
  247 | 
  248 |   /**
  249 |    * TC14: Archive page - error message appears when loading fails (non-deterministic)
  250 |    */
  251 |   test('TC14 - Archive page - error message appears when loading fails (non-deterministic)', async ({ page }) => {
  252 |     await page.goto('/archive');
  253 |     await expect(page.locator('text=Could not load archived habits. Is the API running?')).toBeHidden();
  254 |   });
  255 | 
  256 |   /**
  257 |    * TC15: Archive page - empty state message is shown when no habits are archived (not reachable without backend control)
  258 |    */
  259 |   test('TC15 - Archive page - empty state message is shown when no habits are archived (not reachable without backend control)', async ({ page }) => {
  260 |     await page.goto('/archive');
  261 |     await expect(page.locator('text=No archived habits — anything you archive from the home page shows up here.')).toBeHidden();
  262 |   });
  263 | 
  264 | });
  265 | 
```