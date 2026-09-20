# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> Home >> TC22 - HabitCard - marks habit done today disables button
- Location: tests/home.spec.ts:385:7

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByRole('listitem').filter({ hasText: 'Daily completion habit 1789883020966' }).getByRole('button', { name: 'Done today', exact: true })
Expected: 1
Received: 0
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" getByRole('listitem').filter({ hasText: 'Daily completion habit 1789883020966' }).getByRole('button', { name: 'Done today', exact: true }) with timeout 10000ms
  - waiting for getByRole('listitem').filter({ hasText: 'Daily completion habit 1789883020966' }).getByRole('button', { name: 'Done today', exact: true })
    24 × locator resolved to 0 elements
       - unexpected value "0"

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
        - button "Complete all for today (1)" [ref=e33]
        - button "Export JSON" [ref=e34]
        - button "Export CSV" [ref=e35]
    - list [ref=e36]:
      - listitem [ref=e37]:
        - generic:
          - generic:
            - paragraph [ref=e38]: CompleteTest 1789882996461
            - generic [ref=e39]: General
          - paragraph: 🔥 1 day streak
          - generic:
            - progressbar "CompleteTest 1789882996461 weekly progress"
            - generic [ref=e40]: 1/7 this week
        - generic [ref=e41]:
          - button "Done today" [disabled] [ref=e42]
          - button "Freeze CompleteTest 1789882996461 for today" [disabled] [ref=e43]: 🧊 Freeze
          - button "Edit CompleteTest 1789882996461" [ref=e44]: Edit
          - button "Duplicate CompleteTest 1789882996461" [ref=e45]: Duplicate
          - button "Archive CompleteTest 1789882996461" [ref=e46]: Archive
          - button "Delete CompleteTest 1789882996461" [ref=e47]: Remove
      - listitem [ref=e48]:
        - generic:
          - generic:
            - paragraph [ref=e49]: CompleteTest 1789883008749
            - generic [ref=e50]: General
          - paragraph: 🔥 1 day streak
          - generic:
            - progressbar "CompleteTest 1789883008749 weekly progress"
            - generic [ref=e51]: 1/7 this week
        - generic [ref=e52]:
          - button "Done today" [disabled] [ref=e53]
          - button "Freeze CompleteTest 1789883008749 for today" [disabled] [ref=e54]: 🧊 Freeze
          - button "Edit CompleteTest 1789883008749" [ref=e55]: Edit
          - button "Duplicate CompleteTest 1789883008749" [ref=e56]: Duplicate
          - button "Archive CompleteTest 1789883008749" [ref=e57]: Archive
          - button "Delete CompleteTest 1789883008749" [ref=e58]: Remove
      - listitem [ref=e59]:
        - generic:
          - generic:
            - paragraph [ref=e60]: Daily completion habit 1789883020966
            - generic [ref=e61]: General
            - status "Daily completion habit 1789883020966 is at risk of missing its weekly goal" [ref=e62]: ⏰ Due today
          - paragraph: Start your streak today!
          - generic:
            - progressbar "Daily completion habit 1789883020966 weekly progress"
            - generic [ref=e63]: 0/7 this week
        - generic [ref=e64]:
          - button "Mark done" [ref=e65]
          - button "Freeze Daily completion habit 1789883020966 for today" [ref=e66]: 🧊 Freeze
          - button "Edit Daily completion habit 1789883020966" [ref=e67]: Edit
          - button "Duplicate Daily completion habit 1789883020966" [ref=e68]: Duplicate
          - button "Archive Daily completion habit 1789883020966" [ref=e69]: Archive
          - button "Delete Daily completion habit 1789883020966" [ref=e70]: Remove
  - alert [ref=e71]
```

# Test source

```ts
  292 |     await page.goto("/");
  293 |     const input = page.getByRole("textbox", { name: "New habit name" });
  294 |     const addButton = page.getByRole("button", { name: "Add habit" });
  295 |     await input.fill("");
  296 |     await expect(addButton).toBeDisabled();
  297 |     await input.fill("   ");
  298 |     await expect(addButton).toBeDisabled();
  299 |   });
  300 | 
  301 |   /**
  302 |    * TC17: HabitCard - cancel edit closes inline form without saving changes
  303 |    */
  304 |   test('TC17 - HabitCard - cancel edit closes inline form without saving changes', async ({ page }) => {
  305 |     await page.goto("/");
  306 |     const habitName = `Cancel edit habit ${Date.now()}`;
  307 |     await page.getByRole("textbox", { name: "New habit name" }).fill(habitName);
  308 |     await page.getByLabel("Habit category").selectOption("General");
  309 |     await page.getByLabel("Times per week").selectOption("3");
  310 |     await page.getByRole("button", { name: "Add habit" }).click();
  311 |     const habitCard = page.getByRole("listitem").filter({ hasText: habitName });
  312 |     await expect(habitCard).toBeVisible();
  313 |     const editButton = habitCard.getByRole("button", { name: `Edit ${habitName}` });
  314 |     await editButton.click();
  315 |     const editNameInput = page.getByLabel(`Edit name for ${habitName}`);
  316 |     await editNameInput.fill("Changed name");
  317 |     await page.getByRole("button", { name: "Cancel", exact: true }).click();
  318 |     await expect(page.getByLabel(`Edit name for ${habitName}`)).toHaveCount(0);
  319 |     await expect(habitCard).toBeVisible();
  320 |   });
  321 | 
  322 |   /**
  323 |    * TC18: HabitCard - Save button disabled when name input is empty or blank
  324 |    */
  325 |   test('TC18 - HabitCard - Save button disabled when name input is empty or blank', async ({ page }) => {
  326 |     await page.goto("/");
  327 |     const habitName = `Edit validation habit ${Date.now()}`;
  328 |     await page.getByRole("textbox", { name: "New habit name" }).fill(habitName);
  329 |     await page.getByLabel("Habit category").selectOption("General");
  330 |     await page.getByLabel("Times per week").selectOption("3");
  331 |     await page.getByRole("button", { name: "Add habit" }).click();
  332 |     const habitCard = page.getByRole("listitem").filter({ hasText: habitName });
  333 |     await expect(habitCard).toBeVisible();
  334 |     const editButton = habitCard.getByRole("button", { name: `Edit ${habitName}` });
  335 |     await editButton.click();
  336 |     const saveButton = page.getByRole("button", { name: "Save", exact: true });
  337 |     const nameInput = page.getByLabel(`Edit name for ${habitName}`);
  338 |     await nameInput.fill("");
  339 |     await expect(saveButton).toBeDisabled();
  340 |     await nameInput.fill("   ");
  341 |     await expect(saveButton).toBeDisabled();
  342 |   });
  343 | 
  344 |   /**
  345 |    * TC19: Page heading and static elements render
  346 |    */
  347 |   test('TC19 - Page heading and static elements render', async ({ page }) => {
  348 |     await page.goto("/");
  349 |     await expect(page.getByRole("heading", { name: "Habit Tracker" })).toBeVisible();
  350 |     await expect(page.getByText("Build small daily habits, one day at a time.")).toBeVisible();
  351 |     await expect(page.getByLabel("Filter by category")).toBeVisible();
  352 |     await expect(page.getByRole("combobox", { name: "Filter by category" })).toBeVisible();
  353 |     await expect(page.getByRole("textbox", { name: "New habit name" })).toBeVisible();
  354 |     await expect(page.getByRole("combobox", { name: "Habit category" })).toBeVisible();
  355 |     await expect(page.getByRole("combobox", { name: "Times per week" })).toBeVisible();
  356 |     await expect(page.getByRole("button", { name: "Add habit" })).toBeVisible();
  357 |   });
  358 | 
  359 |   /**
  360 |    * TC20: HabitForm - allows creating a new habit
  361 |    */
  362 |   test('TC20 - HabitForm - allows creating a new habit', async ({ page }) => {
  363 |     await page.goto("/");
  364 |     const habitName = `Test habit create ${Date.now()}`;
  365 |     await page.getByRole("textbox", { name: "New habit name" }).fill(habitName);
  366 |     await page.getByRole("combobox", { name: "Habit category" }).selectOption("General");
  367 |     await page.getByRole("combobox", { name: "Times per week" }).selectOption("7");
  368 |     await page.getByRole("button", { name: "Add habit" }).click();
  369 |     const habitCard = page.getByRole("listitem").filter({ hasText: habitName });
  370 |     await expect(habitCard).toBeVisible();
  371 |   });
  372 | 
  373 |   /**
  374 |    * TC21: Category filter - allows filtering habits
  375 |    */
  376 |   test('TC21 - Category filter - allows filtering habits', async ({ page }) => {
  377 |     await page.goto("/");
  378 |     await page.getByRole("combobox", { name: "Filter by category" }).selectOption("Health");
  379 |     await expect(page.getByLabel("Filter by category")).toHaveValue("Health");
  380 |   });
  381 | 
  382 |   /**
  383 |    * TC22: HabitCard - marks habit done today disables button
  384 |    */
  385 |   test('TC22 - HabitCard - marks habit done today disables button', async ({ page }) => {
  386 |     await page.goto('/');
  387 |     const habitName = `Daily completion habit ${Date.now()}`;
  388 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
  389 |     await page.getByRole('button', { name: 'Add habit' }).click();
  390 |     const card = page.getByRole('listitem').filter({ hasText: habitName });
  391 |     const doneButtons = card.getByRole('button', { name: 'Done today', exact: true });
> 392 |     await expect(doneButtons).toHaveCount(1);
      |                               ^ Error: expect(locator).toHaveCount(expected) failed
  393 |     await expect(doneButtons.first()).toBeDisabled();
  394 |   });
  395 | 
  396 |   /**
  397 |    * TC23: HabitCard inline edit form - opens and cancels edit mode
  398 |    */
  399 |   test('TC23 - HabitCard inline edit form - opens and cancels edit mode', async ({ page }) => {
  400 |     await page.goto("/");
  401 |     const habitName = `Editable habit ${Date.now()}`;
  402 |     await page.getByRole("textbox", { name: "New habit name" }).fill(habitName);
  403 |     await page.getByRole("button", { name: "Add habit" }).click();
  404 |     const card = page.getByRole("listitem").filter({ hasText: habitName });
  405 |     await card.getByRole("button", { name: `Edit ${habitName}` }).click();
  406 |     const nameInput = page.getByLabel(`Edit name for ${habitName}`);
  407 |     await expect(nameInput).toBeVisible();
  408 |     await page.getByRole("button", { name: "Cancel", exact: true }).click();
  409 |     await expect(card.getByRole("button", { name: `Edit ${habitName}` })).toBeVisible();
  410 |   });
  411 | 
  412 |   /**
  413 |    * TC24: HabitCard inline edit form - saves edited habit and closes form
  414 |    */
  415 |   test('TC24 - HabitCard inline edit form - saves edited habit and closes form', async ({ page }) => {
  416 |     await page.goto("/");
  417 |     const habitName = `Editable habit save ${Date.now()}`;
  418 |     await page.getByRole("textbox", { name: "New habit name" }).fill(habitName);
  419 |     await page.getByRole("button", { name: "Add habit" }).click();
  420 |     const card = page.getByRole("listitem").filter({ hasText: habitName });
  421 |     await card.getByRole("button", { name: `Edit ${habitName}` }).click();
  422 |     const nameInput = page.getByLabel(`Edit name for ${habitName}`);
  423 |     await expect(nameInput).toHaveValue(habitName);
  424 |     const updatedName = `${habitName} updated`;
  425 |     await nameInput.fill(updatedName);
  426 |     const categorySelect = page.getByLabel(`Edit category for ${habitName}`);
  427 |     await categorySelect.selectOption("General");
  428 |     const timesSelect = page.getByLabel(`Edit times per week for ${habitName}`);
  429 |     await timesSelect.selectOption("3");
  430 |     await page.getByRole("button", { name: "Save", exact: true }).click();
  431 |     await expect(page.getByRole("listitem").filter({ hasText: updatedName })).toBeVisible();
  432 |     await expect(page.getByLabel(`Edit name for ${habitName}`)).toHaveCount(0);
  433 |   });
  434 | 
  435 |   /**
  436 |    * TC25: Home page - initial render shows main heading, filter, show archived checkbox, export buttons disabled, and navigation link
  437 |    */
  438 |   test('TC25 - Home page - initial render shows main heading, filter, show archived checkbox, export buttons disabled, and navigation link', async ({ page }) => {
  439 |     await page.goto('/');
  440 |     await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
  441 |     const categoryFilter = page.getByLabel('Filter by category');
  442 |     await expect(categoryFilter).toBeVisible();
  443 |     const allOption = categoryFilter.locator('option[value=""]');
  444 |     await expect(allOption).toHaveCount(1);
  445 |     await expect(categoryFilter).toHaveValue('');
  446 |     const showArchivedCheckbox = page.getByLabel('Show archived');
  447 |     await expect(showArchivedCheckbox).toBeVisible();
  448 |     await expect(showArchivedCheckbox).not.toBeChecked();
  449 |     const exportJsonButton = page.getByRole('button', { name: 'Export JSON' });
  450 |     await expect(exportJsonButton).toBeVisible();
  451 |     await expect(exportJsonButton).toBeDisabled();
  452 |     const exportCsvButton = page.getByRole('button', { name: 'Export CSV' });
  453 |     await expect(exportCsvButton).toBeVisible();
  454 |     await expect(exportCsvButton).toBeDisabled();
  455 |     const statsLink = page.getByRole('link', { name: 'View stats' });
  456 |     await expect(statsLink).toBeVisible();
  457 |   });
  458 | 
  459 |   /**
  460 |    * TC26: HabitForm - create a habit with notes successfully adds it to the list and enables export buttons
  461 |    */
  462 |   test('TC26 - HabitForm - create a habit with notes successfully adds it to the list and enables export buttons', async ({ page }) => {
  463 |     await page.goto('/');
  464 |     const habitName = `Test habit ${Date.now()}`;
  465 |     const habitNotes = 'Test note for habit';
  466 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
  467 |     await page.getByRole('combobox', { name: 'Habit category' }).selectOption('Health');
  468 |     await page.getByRole('combobox', { name: 'Times per week' }).selectOption('3');
  469 |     await page.getByRole('textbox', { name: 'Notes (optional)' }).fill(habitNotes);
  470 |     await page.getByRole('button', { name: 'Add habit' }).click();
  471 |     const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
  472 |     await expect(habitCard).toBeVisible();
  473 |     const notesParagraph = habitCard.locator('p.mt-1.text-xs.text-zinc-500.italic').filter({ hasText: habitNotes });
  474 |     await expect(notesParagraph).toBeVisible();
  475 |     const exportJsonButton = page.getByRole('button', { name: 'Export JSON' });
  476 |     await expect(exportJsonButton).toBeEnabled();
  477 |     const exportCsvButton = page.getByRole('button', { name: 'Export CSV' });
  478 |     await expect(exportCsvButton).toBeEnabled();
  479 |   });
  480 | 
  481 |   /**
  482 |    * TC27: HabitCard - edit habit updates name, category, target per week, and notes
  483 |    */
  484 |   test('TC27 - HabitCard - edit habit updates name, category, target per week, and notes', async ({ page }) => {
  485 |     await page.goto('/');
  486 |     const originalName = `Edit habit ${Date.now()}`;
  487 |     const updatedName = `Updated habit ${Date.now()}`;
  488 |     const updatedNotes = 'Updated notes';
  489 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(originalName);
  490 |     await page.getByRole('button', { name: 'Add habit' }).click();
  491 |     const habitCard = page.getByRole('listitem').filter({ hasText: originalName });
  492 |     await expect(habitCard).toBeVisible();
```