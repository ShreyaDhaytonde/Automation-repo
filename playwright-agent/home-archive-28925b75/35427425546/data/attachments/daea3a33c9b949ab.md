# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> Home >> TC24 - Sort by dropdown - sorts habit list by name ascending
- Location: tests/home.spec.ts:384:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('listitem').filter({ hasText: 'SortB 1789800955337' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('listitem').filter({ hasText: 'SortB 1789800955337' }) with timeout 10000ms
  - waiting for getByRole('listitem').filter({ hasText: 'SortB 1789800955337' })

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
  - button "Complete all for today (7)"
  - button "Export JSON"
  - button "Export CSV"
  - list:
    - listitem:
      - paragraph: Archive habit 1789800886026
      - text: General
      - status "Archive habit 1789800886026 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "Archive habit 1789800886026 weekly progress"
      - text: 0/7 this week
      - button "Mark done"
      - button "Freeze Archive habit 1789800886026 for today": 🧊 Freeze
      - button "Edit Archive habit 1789800886026": Edit
      - button "Duplicate Archive habit 1789800886026": Duplicate
      - button "Archive Archive habit 1789800886026": Archive
      - button "Delete Archive habit 1789800886026": Remove
    - listitem:
      - paragraph: Archive Habit 1789800904999
      - text: General
      - status "Archive Habit 1789800904999 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "Archive Habit 1789800904999 weekly progress"
      - text: 0/7 this week
      - button "Mark done"
      - button "Freeze Archive Habit 1789800904999 for today": 🧊 Freeze
      - button "Edit Archive Habit 1789800904999": Edit
      - button "Duplicate Archive Habit 1789800904999": Duplicate
      - button "Archive Archive Habit 1789800904999": Archive
      - button "Delete Archive Habit 1789800904999": Remove
    - listitem:
      - paragraph: Complete Habit 1789800904004
      - text: General
      - paragraph: 🔥 1 day streak
      - progressbar "Complete Habit 1789800904004 weekly progress"
      - text: 1/7 this week
      - button "Done today" [disabled]
      - button "Freeze Complete Habit 1789800904004 for today" [disabled]: 🧊 Freeze
      - button "Edit Complete Habit 1789800904004": Edit
      - button "Duplicate Complete Habit 1789800904004": Duplicate
      - button "Archive Complete Habit 1789800904004": Archive
      - button "Delete Complete Habit 1789800904004": Remove
    - listitem:
      - paragraph: Editable habit 1789800884781
      - text: General
      - status "Editable habit 1789800884781 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "Editable habit 1789800884781 weekly progress"
      - text: 0/7 this week
      - button "Mark done"
      - button "Freeze Editable habit 1789800884781 for today": 🧊 Freeze
      - button "Edit Editable habit 1789800884781": Edit
      - button "Duplicate Editable habit 1789800884781": Duplicate
      - button "Archive Editable habit 1789800884781": Archive
      - button "Delete Editable habit 1789800884781": Remove
    - listitem:
      - paragraph: Export Test 1789800902878
      - text: General
      - status "Export Test 1789800902878 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "Export Test 1789800902878 weekly progress"
      - text: 0/7 this week
      - button "Mark done"
      - button "Freeze Export Test 1789800902878 for today": 🧊 Freeze
      - button "Edit Export Test 1789800902878": Edit
      - button "Duplicate Export Test 1789800902878": Duplicate
      - button "Archive Export Test 1789800902878": Archive
      - button "Delete Export Test 1789800902878": Remove
    - listitem:
      - paragraph: Habit for export 1789800887717
      - text: General
      - status "Habit for export 1789800887717 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "Habit for export 1789800887717 weekly progress"
      - text: 0/7 this week
      - button "Mark done"
      - button "Freeze Habit for export 1789800887717 for today": 🧊 Freeze
      - button "Edit Habit for export 1789800887717": Edit
      - button "Duplicate Habit for export 1789800887717": Duplicate
      - button "Archive Habit for export 1789800887717": Archive
      - button "Delete Habit for export 1789800887717": Remove
    - listitem:
      - paragraph: Search Alpha 1789800901905
      - text: General
      - status "Search Alpha 1789800901905 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "Search Alpha 1789800901905 weekly progress"
      - text: 0/7 this week
      - button "Mark done"
      - button "Freeze Search Alpha 1789800901905 for today": 🧊 Freeze
      - button "Edit Search Alpha 1789800901905": Edit
      - button "Duplicate Search Alpha 1789800901905": Duplicate
      - button "Archive Search Alpha 1789800901905": Archive
      - button "Delete Search Alpha 1789800901905": Remove
    - listitem:
      - paragraph: Search Beta 1789800901905
      - text: General
      - status "Search Beta 1789800901905 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "Search Beta 1789800901905 weekly progress"
      - text: 0/7 this week
      - button "Mark done"
      - button "Freeze Search Beta 1789800901905 for today": 🧊 Freeze
      - button "Edit Search Beta 1789800901905": Edit
      - button "Duplicate Search Beta 1789800901905": Duplicate
      - button "Archive Search Beta 1789800901905": Archive
      - button "Delete Search Beta 1789800901905": Remove
- alert
```

# Test source

```ts
  290 |   /**
  291 |    * TC18: Home - searches for habits by name
  292 |    */
  293 |   test('TC18 - Home - searches for habits by name', async ({ page }) => {
  294 |     await page.goto('/');
  295 |     const habitName = `Search Habit ${Date.now()}`;
  296 |     await page.getByLabel('New habit name').fill(habitName);
  297 |     await page.getByRole('button', { name: 'Add habit' }).click();
  298 |     await expect(page.getByRole('listitem').filter({ hasText: habitName })).toBeVisible();
  299 |     const searchInput = page.getByLabel('Search habits by name');
  300 |     await searchInput.fill(habitName.slice(0, 5));
  301 |     await expect(page.getByRole('listitem').filter({ hasText: habitName })).toBeVisible();
  302 |     await searchInput.fill('nomatchterm');
  303 |     await expect(page.getByText(new RegExp(`No habits match "nomatchterm"\.`))).toBeVisible();
  304 |   });
  305 | 
  306 |   /**
  307 |    * TC19: Home - toggles show archived checkbox updates habits list
  308 |    */
  309 |   test('TC19 - Home - toggles show archived checkbox updates habits list', async ({ page }) => {
  310 |     await page.goto('/');
  311 |     const checkbox = page.getByRole('checkbox', { name: 'Show archived' });
  312 |     const initialCount = await page.getByRole('listitem').count();
  313 |     await checkbox.check();
  314 |     await expect(page.getByRole('list')).toBeVisible();
  315 |     await checkbox.uncheck();
  316 |     await expect(page.getByRole('list')).toBeVisible();
  317 |   });
  318 | 
  319 |   /**
  320 |    * TC20: HabitCard - marks a habit as done today button disables afterward
  321 |    */
  322 |   test('TC20 - HabitCard - marks a habit as done today button disables afterward', async ({ page }) => {
  323 |     await page.goto('/');
  324 |     const habitName = `CompleteTest ${Date.now()}`;
  325 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
  326 |     await page.getByRole('button', { name: 'Add habit' }).click();
  327 |     const habitItem = page.getByRole('listitem').filter({ hasText: habitName });
  328 |     await expect(habitItem).toBeVisible();
  329 |     const markDoneButton = habitItem.getByRole('button', { name: 'Mark done' });
  330 |     await markDoneButton.click();
  331 |     await expect(markDoneButton).toBeDisabled();
  332 |   });
  333 | 
  334 |   /**
  335 |    * TC21: HabitCard - archives and unarchives a habit
  336 |    */
  337 |   test('TC21 - HabitCard - archives and unarchives a habit', async ({ page }) => {
  338 |     await page.goto('/');
  339 |     const habitName = `ArchiveTest ${Date.now()}`;
  340 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
  341 |     await page.getByRole('button', { name: 'Add habit' }).click();
  342 |     const habitItem = page.getByRole('listitem').filter({ hasText: habitName });
  343 |     await expect(habitItem).toBeVisible();
  344 |     await habitItem.getByRole('button', { name: `Archive ${habitName}` }).click();
  345 |     await expect(habitItem).toHaveCount(0);
  346 |     await page.getByLabel('Show archived').check();
  347 |     const archivedHabitItem = page.getByRole('listitem').filter({ hasText: habitName });
  348 |     await expect(archivedHabitItem.getByRole('button', { name: `Unarchive ${habitName}` })).toBeVisible();
  349 |   });
  350 | 
  351 |   /**
  352 |    * TC22: HabitCard - removes a habit after confirm dialog
  353 |    */
  354 |   test('TC22 - HabitCard - removes a habit after confirm dialog', async ({ page }) => {
  355 |     await page.goto('/');
  356 |     const habitName = `DeleteTest ${Date.now()}`;
  357 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
  358 |     await page.getByRole('button', { name: 'Add habit' }).click();
  359 |     const habitItem = page.getByRole('listitem').filter({ hasText: habitName });
  360 |     await expect(habitItem).toBeVisible();
  361 |     page.on('dialog', (dialog) => dialog.accept());
  362 |     await habitItem.getByRole('button', { name: `Delete ${habitName}` }).click();
  363 |     await expect(page.getByRole('listitem').filter({ hasText: habitName })).toHaveCount(0);
  364 |   });
  365 | 
  366 |   /**
  367 |    * TC23: Search box - filters habit list by matching name
  368 |    */
  369 |   test('TC23 - Search box - filters habit list by matching name', async ({ page }) => {
  370 |     await page.goto('/');
  371 |     const uniqueName = `SearchTest ${Date.now()}`;
  372 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(uniqueName);
  373 |     await page.getByRole('button', { name: 'Add habit' }).click();
  374 |     await expect(page.getByRole('listitem').filter({ hasText: uniqueName })).toBeVisible();
  375 |     await page.getByRole('searchbox', { name: 'Search habits by name' }).fill(uniqueName);
  376 |     await expect(page.getByRole('listitem').filter({ hasText: uniqueName })).toBeVisible();
  377 |     await page.getByRole('searchbox', { name: 'Search habits by name' }).fill('nonexistentsearchterm' + Date.now());
  378 |     await expect(page.getByText(`No habits match "nonexistentsearchterm`)).toBeVisible();
  379 |   });
  380 | 
  381 |   /**
  382 |    * TC24: Sort by dropdown - sorts habit list by name ascending
  383 |    */
  384 |   test('TC24 - Sort by dropdown - sorts habit list by name ascending', async ({ page }) => {
  385 |     await page.goto('/');
  386 |     const uniqueNameA = `SortA ${Date.now()}`;
  387 |     const uniqueNameB = `SortB ${Date.now() + 1}`;
  388 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(uniqueNameB);
  389 |     await page.getByRole('button', { name: 'Add habit' }).click();
> 390 |     await expect(page.getByRole('listitem').filter({ hasText: uniqueNameB })).toBeVisible();
      |                                                                               ^ Error: expect(locator).toBeVisible() failed
  391 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(uniqueNameA);
  392 |     await page.getByRole('button', { name: 'Add habit' }).click();
  393 |     await expect(page.getByRole('listitem').filter({ hasText: uniqueNameA })).toBeVisible();
  394 |     await page.getByRole('combobox', { name: 'Sort habits by' }).selectOption('name');
  395 |     const items = await page.getByRole('listitem').all();
  396 |     const texts = await Promise.all(items.map((item) => item.textContent()));
  397 |     const sorted = texts.every((text, i, arr) => !i || (text?.localeCompare(arr[i-1]!) ?? -1) >= 0);
  398 |     expect(sorted).toBe(true);
  399 |   });
  400 | 
  401 |   /**
  402 |    * TC25: HabitForm - disables Add habit button when name is empty
  403 |    */
  404 |   test('TC25 - HabitForm - disables Add habit button when name is empty', async ({ page }) => {
  405 |     await page.goto('/');
  406 |     await page.getByRole('textbox', { name: 'New habit name' }).fill('');
  407 |     await expect(page.getByRole('button', { name: 'Add habit' })).toBeDisabled();
  408 |   });
  409 | 
  410 | });
  411 | 
```