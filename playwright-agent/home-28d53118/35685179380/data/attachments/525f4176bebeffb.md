# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> Home >> TC14 - HabitCard - edits a habit\'s name, category, target per week, and notes successfully
- Location: tests/home.spec.ts:242:7

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByRole('listitem').filter({ hasText: 'EditTest 1790050124995' }).getByRole('button', { name: 'Save' })

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - main [ref=e3]:
    - generic [ref=e4]:
      - generic [ref=e5]:
        - heading "Habit Tracker" [level=1] [ref=e6]
        - paragraph [ref=e7]: Build small daily habits, one day at a time.
        - paragraph [ref=e8]: Tuesday, September 22
        - paragraph [ref=e9]: 0/2 done today
      - generic [ref=e10]:
        - link "History" [ref=e11] [cursor=pointer]:
          - /url: /history
        - link "View stats" [ref=e12] [cursor=pointer]:
          - /url: /stats
        - link "Archive" [ref=e13] [cursor=pointer]:
          - /url: /archive
        - button "Switch to dark mode" [ref=e14]: 🌙 Dark
        - button "Logout" [ref=e15]
    - generic [ref=e17]:
      - textbox "New habit name" [ref=e18]:
        - /placeholder: e.g. Drink more water
      - combobox "Habit category" [ref=e19]:
        - option "General" [selected]
        - option "Health"
        - option "Work"
        - option "Personal"
        - option "Learning"
      - combobox "Times per week" [ref=e20]:
        - option "1x / week"
        - option "2x / week"
        - option "3x / week"
        - option "4x / week"
        - option "5x / week"
        - option "6x / week"
        - option "7x / week" [selected]
      - textbox "Notes (optional)" [ref=e21]
      - button "Add habit" [disabled] [ref=e22]
    - generic [ref=e23]:
      - generic [ref=e24]: Search habits by name
      - searchbox "Search habits by name" [ref=e25]
      - generic [ref=e26]: Sort by
      - combobox "Sort habits by" [ref=e27]:
        - option "Name (A-Z)" [selected]
        - option "Streak (highest first)"
        - option "Category"
        - option "Weekly target (highest first)"
    - generic [ref=e28]:
      - generic [ref=e29]:
        - generic [ref=e30]: Filter by category
        - combobox "Filter by category" [ref=e31]:
          - option "All" [selected]
          - option "General"
          - option "Health"
          - option "Work"
          - option "Personal"
          - option "Learning"
      - generic [ref=e32]:
        - checkbox "Show archived" [ref=e33]
        - text: Show archived
      - generic [ref=e34]:
        - button "Complete all for today (2)" [ref=e35]
        - button "Export JSON" [ref=e36]
        - button "Export CSV" [ref=e37]
    - list [ref=e38]:
      - listitem [ref=e39]:
        - generic [ref=e40]:
          - textbox "Edit name for EditTest 1790050124995" [ref=e41]: EditTest 1790050124995 Updated
          - combobox "Edit category for EditTest 1790050124995" [ref=e42]:
            - option "General"
            - option "Health" [selected]
            - option "Work"
            - option "Personal"
            - option "Learning"
          - combobox "Edit times per week for EditTest 1790050124995" [ref=e43]:
            - option "1x / week"
            - option "2x / week"
            - option "3x / week"
            - option "4x / week"
            - option "5x / week" [selected]
            - option "6x / week"
            - option "7x / week"
          - textbox "Edit notes for EditTest 1790050124995" [active] [ref=e44]:
            - /placeholder: Notes (optional)
            - text: Updated notes
          - button "Save" [ref=e45]
          - button "Cancel" [ref=e46]
      - listitem [ref=e47]:
        - generic:
          - generic:
            - paragraph [ref=e48]: Habit 1790050063142
            - generic [ref=e49]: General
            - status "Habit 1790050063142 is at risk of missing its weekly goal" [ref=e50]: ⏰ Due today
          - paragraph: Start your streak today!
          - generic:
            - progressbar "Habit 1790050063142 weekly progress"
            - generic [ref=e51]: 0/7 this week
          - paragraph: Test notes
        - generic [ref=e52]:
          - button "Mark done" [ref=e53]
          - button "Freeze Habit 1790050063142 for today" [ref=e54]: 🧊 Freeze
          - button "Edit Habit 1790050063142" [ref=e55]: Edit
          - button "Duplicate Habit 1790050063142" [ref=e56]: Duplicate
          - button "Archive Habit 1790050063142" [ref=e57]: Archive
          - button "Delete Habit 1790050063142" [ref=e58]: Remove
  - alert [ref=e59]
```

# Test source

```ts
  157 |     await page.getByRole('textbox', { name: 'Search habits by name' }).fill('test');
  158 |     await page.getByRole('combobox', { name: 'Filter by category' }).selectOption('Health');
  159 |     await page.getByLabel('Show archived').check();
  160 |     await page.getByRole('combobox', { name: 'Sort habits by' }).selectOption('streak');
  161 |     await page.getByRole('button', { name: 'Clear filters' }).click();
  162 |     await expect(page.getByRole('textbox', { name: 'Search habits by name' })).toHaveValue('');
  163 |     await expect(page.getByRole('combobox', { name: 'Filter by category' })).toHaveValue('');
  164 |     await expect(page.getByLabel('Show archived')).not.toBeChecked();
  165 |     await expect(page.getByRole('combobox', { name: 'Sort habits by' })).toHaveValue('name');
  166 |   });
  167 | 
  168 |   // ──────────────────────────────────────────────────────────────────────────
  169 |   // SECTION 9: Navigation
  170 |   // ──────────────────────────────────────────────────────────────────────────
  171 | 
  172 |   /**
  173 |    * TC09: Navigation - navigate to History page
  174 |    */
  175 |   test('TC09 - Navigation - navigate to History page', async ({ page }) => {
  176 |     await page.goto('/');
  177 |     await page.getByRole('link', { name: 'History' }).click();
  178 |     await expect(page).toHaveURL('/history');
  179 |   });
  180 | 
  181 |   /**
  182 |    * TC10: Navigation - navigate to View stats page
  183 |    */
  184 |   test('TC10 - Navigation - navigate to View stats page', async ({ page }) => {
  185 |     await page.goto('/');
  186 |     await page.getByRole('link', { name: 'View stats' }).click();
  187 |     await expect(page).toHaveURL('/stats');
  188 |   });
  189 | 
  190 |   /**
  191 |    * TC11: Navigation - navigate to Archive page
  192 |    */
  193 |   test('TC11 - Navigation - navigate to Archive page', async ({ page }) => {
  194 |     await page.goto('/');
  195 |     await page.getByRole('link', { name: 'Archive' }).click();
  196 |     await expect(page).toHaveURL('/archive');
  197 |   });
  198 | 
  199 |   // ──────────────────────────────────────────────────────────────────────────
  200 |   // SECTION 10: Home
  201 |   // ──────────────────────────────────────────────────────────────────────────
  202 | 
  203 |   /**
  204 |    * TC12: Home - page loads with unconditional elements visible
  205 |    */
  206 |   test('TC12 - Home - page loads with unconditional elements visible', async ({ page }) => {
  207 |     await page.goto('/');
  208 |     await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
  209 |     await expect(page.getByRole('textbox', { name: 'New habit name' })).toBeVisible();
  210 |     await expect(page.getByLabel('Habit category')).toBeVisible();
  211 |     await expect(page.getByLabel('Times per week')).toBeVisible();
  212 |     await expect(page.getByLabel('Notes (optional)')).toBeVisible();
  213 |     await expect(page.getByRole('button', { name: 'Add habit' })).toBeVisible();
  214 |     await expect(page.getByRole('searchbox', { name: 'Search habits by name' })).toBeVisible();
  215 |     await expect(page.getByRole('combobox', { name: 'Sort habits by' })).toBeVisible();
  216 |     await expect(page.getByRole('combobox', { name: 'Filter by category' })).toBeVisible();
  217 |     await expect(page.getByLabel('Show archived')).toBeVisible();
  218 |     await expect(page.getByRole('link', { name: 'View stats' })).toBeVisible();
  219 |     await expect(page.getByRole('button', { name: 'Complete all for today' })).toBeVisible();
  220 |     await expect(page.getByRole('button', { name: 'Export JSON' })).toBeVisible();
  221 |     await expect(page.getByRole('button', { name: 'Export CSV' })).toBeVisible();
  222 |   });
  223 | 
  224 |   /**
  225 |    * TC13: HabitForm - adds a new habit successfully
  226 |    */
  227 |   test('TC13 - HabitForm - adds a new habit successfully', async ({ page }) => {
  228 |     await page.goto('/');
  229 |     const uniqueName = `Habit ${Date.now()}`;
  230 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(uniqueName);
  231 |     await page.getByLabel('Habit category').selectOption('General');
  232 |     await page.getByLabel('Times per week').selectOption('7');
  233 |     await page.getByRole('textbox', { name: 'Notes (optional)' }).fill('Test notes');
  234 |     await page.getByRole('button', { name: 'Add habit' }).click();
  235 |     const habitItem = page.getByRole('listitem').filter({ hasText: uniqueName });
  236 |     await expect(habitItem).toBeVisible();
  237 |   });
  238 | 
  239 |   /**
  240 |    * TC14: HabitCard - edits a habit\'s name, category, target per week, and notes successfully
  241 |    */
  242 |   test('TC14 - HabitCard - edits a habit\\\'s name, category, target per week, and notes successfully', async ({ page }) => {
  243 |     await page.goto('/');
  244 |     const originalName = `EditTest ${Date.now()}`;
  245 |     const newName = `${originalName} Updated`;
  246 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(originalName);
  247 |     await page.getByRole('button', { name: 'Add habit' }).click();
  248 |     const habitItem = page.getByRole('listitem').filter({ hasText: originalName });
  249 |     await expect(habitItem).toBeVisible();
  250 |     await habitItem.getByRole('button', { name: `Edit ${originalName}` }).click();
  251 |     const nameInput = page.getByLabel(`Edit name for ${originalName}`);
  252 |     await expect(nameInput).toHaveValue(originalName);
  253 |     await nameInput.fill(newName);
  254 |     await page.getByLabel(`Edit category for ${originalName}`).selectOption('Health');
  255 |     await page.getByLabel(`Edit times per week for ${originalName}`).selectOption('5');
  256 |     await page.getByLabel(`Edit notes for ${originalName}`).fill('Updated notes');
> 257 |     await habitItem.getByRole('button', { name: 'Save' }).click();
      |                                                           ^ Error: locator.click: Test timeout of 60000ms exceeded.
  258 |     const updatedHabitItem = page.getByRole('listitem').filter({ hasText: newName });
  259 |     await expect(updatedHabitItem).toBeVisible();
  260 |   });
  261 | 
  262 |   /**
  263 |    * TC15: HabitCard - marks a habit as done today button disables afterward
  264 |    */
  265 |   test('TC15 - HabitCard - marks a habit as done today button disables afterward', async ({ page }) => {
  266 |     await page.goto('/');
  267 |     const habitName = `CompleteTest ${Date.now()}`;
  268 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
  269 |     await page.getByRole('button', { name: 'Add habit' }).click();
  270 |     const habitItem = page.getByRole('listitem').filter({ hasText: habitName });
  271 |     await expect(habitItem).toBeVisible();
  272 |     const markDoneButton = habitItem.getByRole('button', { name: 'Mark done' });
  273 |     await markDoneButton.click();
  274 |     await expect(habitItem.getByRole('button', { name: 'Done today' })).toBeVisible();
  275 |     await expect(habitItem.getByRole('button', { name: 'Done today' })).toBeDisabled();
  276 |   });
  277 | 
  278 |   /**
  279 |    * TC16: HabitCard - archives and unarchives a habit
  280 |    */
  281 |   test('TC16 - HabitCard - archives and unarchives a habit', async ({ page }) => {
  282 |     await page.goto('/');
  283 |     const habitName = `ArchiveTest ${Date.now()}`;
  284 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
  285 |     await page.getByRole('button', { name: 'Add habit' }).click();
  286 |     const habitItem = page.getByRole('listitem').filter({ hasText: habitName });
  287 |     await expect(habitItem).toBeVisible();
  288 |     await habitItem.getByRole('button', { name: `Archive ${habitName}` }).click();
  289 |     await expect(habitItem).toHaveCount(0);
  290 |     await page.getByLabel('Show archived').check();
  291 |     const archivedHabitItem = page.getByRole('listitem').filter({ hasText: habitName });
  292 |     await expect(archivedHabitItem.getByRole('button', { name: `Unarchive ${habitName}` })).toBeVisible();
  293 |   });
  294 | 
  295 |   /**
  296 |    * TC17: HabitCard - removes a habit after confirm dialog
  297 |    */
  298 |   test('TC17 - HabitCard - removes a habit after confirm dialog', async ({ page }) => {
  299 |     await page.goto('/');
  300 |     const habitName = `DeleteTest ${Date.now()}`;
  301 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
  302 |     await page.getByRole('button', { name: 'Add habit' }).click();
  303 |     const habitItem = page.getByRole('listitem').filter({ hasText: habitName });
  304 |     await expect(habitItem).toBeVisible();
  305 |     page.on('dialog', (dialog) => dialog.accept());
  306 |     await habitItem.getByRole('button', { name: `Delete ${habitName}` }).click();
  307 |     await expect(page.getByRole('listitem').filter({ hasText: habitName })).toHaveCount(0);
  308 |   });
  309 | 
  310 |   /**
  311 |    * TC18: Search box - filters habit list by matching name
  312 |    */
  313 |   test('TC18 - Search box - filters habit list by matching name', async ({ page }) => {
  314 |     await page.goto('/');
  315 |     const uniqueName = `SearchTest ${Date.now()}`;
  316 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(uniqueName);
  317 |     await page.getByRole('button', { name: 'Add habit' }).click();
  318 |     await expect(page.getByRole('listitem').filter({ hasText: uniqueName })).toBeVisible();
  319 |     await page.getByRole('searchbox', { name: 'Search habits by name' }).fill(uniqueName);
  320 |     await expect(page.getByRole('listitem').filter({ hasText: uniqueName })).toBeVisible();
  321 |     await page.getByRole('searchbox', { name: 'Search habits by name' }).fill('nonexistentsearchterm' + Date.now());
  322 |     await expect(page.getByText(`No habits match "nonexistentsearchterm`)).toBeVisible();
  323 |   });
  324 | 
  325 |   /**
  326 |    * TC19: Category filter - filters habit list by category
  327 |    */
  328 |   test('TC19 - Category filter - filters habit list by category', async ({ page }) => {
  329 |     await page.goto('/');
  330 |     const uniqueName = `CategoryTest ${Date.now()}`;
  331 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(uniqueName);
  332 |     await page.getByLabel('Habit category').selectOption('Health');
  333 |     await page.getByRole('button', { name: 'Add habit' }).click();
  334 |     await expect(page.getByRole('listitem').filter({ hasText: uniqueName })).toBeVisible();
  335 |     await page.getByLabel('Filter by category').selectOption('Health');
  336 |     await expect(page.getByRole('listitem').filter({ hasText: uniqueName })).toBeVisible();
  337 |   });
  338 | 
  339 |   /**
  340 |    * TC20: Sort by dropdown - sorts habit list by name ascending
  341 |    */
  342 |   test('TC20 - Sort by dropdown - sorts habit list by name ascending', async ({ page }) => {
  343 |     await page.goto('/');
  344 |     const uniqueNameA = `SortA ${Date.now()}`;
  345 |     const uniqueNameB = `SortB ${Date.now() + 1}`;
  346 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(uniqueNameB);
  347 |     await page.getByRole('button', { name: 'Add habit' }).click();
  348 |     await expect(page.getByRole('listitem').filter({ hasText: uniqueNameB })).toBeVisible();
  349 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(uniqueNameA);
  350 |     await page.getByRole('button', { name: 'Add habit' }).click();
  351 |     await expect(page.getByRole('listitem').filter({ hasText: uniqueNameA })).toBeVisible();
  352 |     await page.getByRole('combobox', { name: 'Sort habits by' }).selectOption('name');
  353 |     const items = await page.getByRole('listitem').all();
  354 |     const texts = await Promise.all(items.map((item) => item.textContent()));
  355 |     const sorted = texts.every((text, i, arr) => !i || (text?.localeCompare(arr[i-1]!) ?? -1) >= 0);
  356 |     expect(sorted).toBe(true);
  357 |   });
```