# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> Home >> TC16 - HabitCard - archives and unarchives a habit
- Location: tests/home.spec.ts:281:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('listitem').filter({ hasText: 'ArchiveTest 1790050210473' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('listitem').filter({ hasText: 'ArchiveTest 1790050210473' }) with timeout 10000ms
  - waiting for getByRole('listitem').filter({ hasText: 'ArchiveTest 1790050210473' })

```

```yaml
- main:
  - heading "Habit Tracker" [level=1]
  - paragraph: Build small daily habits, one day at a time.
  - paragraph: Tuesday, September 22
  - paragraph: 1/2 done today
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
  - button "Complete all for today (1)"
  - button "Export JSON"
  - button "Export CSV"
  - list:
    - listitem:
      - paragraph: CompleteTest 1790050197728
      - text: General
      - paragraph: 🔥 1 day streak
      - progressbar "CompleteTest 1790050197728 weekly progress"
      - text: 1/7 this week
      - button "Done today" [disabled]
      - button "Freeze CompleteTest 1790050197728 for today" [disabled]: 🧊 Freeze
      - button "Edit CompleteTest 1790050197728": Edit
      - button "Duplicate CompleteTest 1790050197728": Duplicate
      - button "Archive CompleteTest 1790050197728": Archive
      - button "Delete CompleteTest 1790050197728": Remove
    - listitem:
      - paragraph: Habit 1790050063142
      - text: General
      - status "Habit 1790050063142 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "Habit 1790050063142 weekly progress"
      - text: 0/7 this week
      - paragraph: Test notes
      - button "Mark done"
      - button "Freeze Habit 1790050063142 for today": 🧊 Freeze
      - button "Edit Habit 1790050063142": Edit
      - button "Duplicate Habit 1790050063142": Duplicate
      - button "Archive Habit 1790050063142": Archive
      - button "Delete Habit 1790050063142": Remove
- alert
```

# Test source

```ts
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
  257 |     await habitItem.getByRole('button', { name: 'Save' }).click();
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
> 287 |     await expect(habitItem).toBeVisible();
      |                             ^ Error: expect(locator).toBeVisible() failed
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
  358 | 
  359 |   /**
  360 |    * TC21: HabitForm - disables Add habit button when name is empty
  361 |    */
  362 |   test('TC21 - HabitForm - disables Add habit button when name is empty', async ({ page }) => {
  363 |     await page.goto('/');
  364 |     await page.getByRole('textbox', { name: 'New habit name' }).fill('');
  365 |     await expect(page.getByRole('button', { name: 'Add habit' })).toBeDisabled();
  366 |   });
  367 | 
  368 |   /**
  369 |    * TC22: Home page - page loads and renders unconditional elements
  370 |    */
  371 |   test('TC22 - Home page - page loads and renders unconditional elements', async ({ page }) => {
  372 |     await page.goto("/");
  373 |     await expect(page.getByRole("heading", { name: "Habit Tracker" })).toBeVisible();
  374 |     await expect(page.getByText("Build small daily habits, one day at a time.")).toBeVisible();
  375 |     await expect(page.getByLabel("Filter by category")).toBeVisible();
  376 |     await expect(page.getByLabel("Filter by category").locator("option").first()).toHaveText("All");
  377 |     for (const category of ["General", "Health", "Work", "Personal", "Learning"]) {
  378 |       await expect(page.getByLabel("Filter by category").locator("option").filter({ hasText: category })).toHaveCount(1);
  379 |     }
  380 |     await expect(page.getByRole("textbox", { name: "New habit name" })).toBeVisible();
  381 |     await expect(page.getByLabel("Habit category")).toBeVisible();
  382 |     for (const category of ["General", "Health", "Work", "Personal", "Learning"]) {
  383 |       await expect(page.getByLabel("Habit category").locator("option").filter({ hasText: category })).toHaveCount(1);
  384 |     }
  385 |     await expect(page.getByLabel("Times per week")).toBeVisible();
  386 |     for (const n of ["1x / week","2x / week","3x / week","4x / week","5x / week","6x / week","7x / week"]) {
  387 |       await expect(page.getByLabel("Times per week").locator("option").filter({ hasText: n })).toHaveCount(1);
```