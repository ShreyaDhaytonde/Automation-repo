# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> Home >> TC19 - HabitCard - marks habit done today disables button
- Location: tests/home.spec.ts:320:7

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByRole('listitem').filter({ hasText: 'Daily completion habit 1789840651470' }).getByRole('button', { name: 'Done today', exact: true })
Expected: 1
Received: 0
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" getByRole('listitem').filter({ hasText: 'Daily completion habit 1789840651470' }).getByRole('button', { name: 'Done today', exact: true }) with timeout 10000ms
  - waiting for getByRole('listitem').filter({ hasText: 'Daily completion habit 1789840651470' }).getByRole('button', { name: 'Done today', exact: true })
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
        - button "Complete all for today (5)" [ref=e33]
        - button "Export JSON" [ref=e34]
        - button "Export CSV" [ref=e35]
    - list [ref=e36]:
      - listitem [ref=e37]:
        - generic:
          - generic:
            - paragraph [ref=e38]: Daily completion habit 1789840651470
            - generic [ref=e39]: General
            - status "Daily completion habit 1789840651470 is at risk of missing its weekly goal" [ref=e40]: ⏰ Due today
          - paragraph: Start your streak today!
          - generic:
            - progressbar "Daily completion habit 1789840651470 weekly progress"
            - generic [ref=e41]: 0/7 this week
        - generic [ref=e42]:
          - button "Mark done" [ref=e43]
          - button "Freeze Daily completion habit 1789840651470 for today" [ref=e44]: 🧊 Freeze
          - button "Edit Daily completion habit 1789840651470" [ref=e45]: Edit
          - button "Duplicate Daily completion habit 1789840651470" [ref=e46]: Duplicate
          - button "Archive Daily completion habit 1789840651470" [ref=e47]: Archive
          - button "Delete Daily completion habit 1789840651470" [ref=e48]: Remove
      - listitem [ref=e49]:
        - generic:
          - generic:
            - paragraph [ref=e50]: Edit validation habit 1789840624100
            - generic [ref=e51]: General
            - status "Edit validation habit 1789840624100 is at risk of missing its weekly goal" [ref=e52]: ⏰ Due today
          - paragraph: Start your streak today!
          - generic:
            - progressbar "Edit validation habit 1789840624100 weekly progress"
            - generic [ref=e53]: 0/3 this week
        - generic [ref=e54]:
          - button "Mark done" [ref=e55]
          - button "Freeze Edit validation habit 1789840624100 for today" [ref=e56]: 🧊 Freeze
          - button "Edit Edit validation habit 1789840624100" [ref=e57]: Edit
          - button "Duplicate Edit validation habit 1789840624100" [ref=e58]: Duplicate
          - button "Archive Edit validation habit 1789840624100" [ref=e59]: Archive
          - button "Delete Edit validation habit 1789840624100" [ref=e60]: Remove
      - listitem [ref=e61]:
        - generic:
          - generic:
            - paragraph [ref=e62]: Habit 1789840466426
            - generic [ref=e63]: General
            - status "Habit 1789840466426 is at risk of missing its weekly goal" [ref=e64]: ⏰ Due today
          - paragraph: Start your streak today!
          - generic:
            - progressbar "Habit 1789840466426 weekly progress"
            - generic [ref=e65]: 0/7 this week
          - paragraph: Test notes
        - generic [ref=e66]:
          - button "Mark done" [ref=e67]
          - button "Freeze Habit 1789840466426 for today" [ref=e68]: 🧊 Freeze
          - button "Edit Habit 1789840466426" [ref=e69]: Edit
          - button "Duplicate Habit 1789840466426" [ref=e70]: Duplicate
          - button "Archive Habit 1789840466426" [ref=e71]: Archive
          - button "Delete Habit 1789840466426" [ref=e72]: Remove
      - listitem [ref=e73]:
        - generic:
          - generic:
            - paragraph [ref=e74]: Test habit create 1789840637958
            - generic [ref=e75]: General
            - status "Test habit create 1789840637958 is at risk of missing its weekly goal" [ref=e76]: ⏰ Due today
          - paragraph: Start your streak today!
          - generic:
            - progressbar "Test habit create 1789840637958 weekly progress"
            - generic [ref=e77]: 0/7 this week
        - generic [ref=e78]:
          - button "Mark done" [ref=e79]
          - button "Freeze Test habit create 1789840637958 for today" [ref=e80]: 🧊 Freeze
          - button "Edit Test habit create 1789840637958" [ref=e81]: Edit
          - button "Duplicate Test habit create 1789840637958" [ref=e82]: Duplicate
          - button "Archive Test habit create 1789840637958" [ref=e83]: Archive
          - button "Delete Test habit create 1789840637958" [ref=e84]: Remove
      - listitem [ref=e85]:
        - generic:
          - generic:
            - paragraph [ref=e86]: Test Unarchive 1789840459399
            - generic [ref=e87]: General
            - status "Test Unarchive 1789840459399 is at risk of missing its weekly goal" [ref=e88]: ⏰ Due today
          - paragraph: Start your streak today!
          - generic:
            - progressbar "Test Unarchive 1789840459399 weekly progress"
            - generic [ref=e89]: 0/7 this week
        - generic [ref=e90]:
          - button "Mark done" [ref=e91]
          - button "Freeze Test Unarchive 1789840459399 for today" [ref=e92]: 🧊 Freeze
          - button "Edit Test Unarchive 1789840459399" [ref=e93]: Edit
          - button "Duplicate Test Unarchive 1789840459399" [ref=e94]: Duplicate
          - button "Archive Test Unarchive 1789840459399" [ref=e95]: Archive
          - button "Delete Test Unarchive 1789840459399" [ref=e96]: Remove
  - alert [ref=e97]
```

# Test source

```ts
  227 |    */
  228 |   test('TC13 - HabitForm - form validation disables Add habit button for empty name', async ({ page }) => {
  229 |     await page.goto("/");
  230 |     const input = page.getByRole("textbox", { name: "New habit name" });
  231 |     const addButton = page.getByRole("button", { name: "Add habit" });
  232 |     await input.fill("");
  233 |     await expect(addButton).toBeDisabled();
  234 |     await input.fill("   ");
  235 |     await expect(addButton).toBeDisabled();
  236 |   });
  237 | 
  238 |   /**
  239 |    * TC14: HabitCard - cancel edit closes inline form without saving changes
  240 |    */
  241 |   test('TC14 - HabitCard - cancel edit closes inline form without saving changes', async ({ page }) => {
  242 |     await page.goto("/");
  243 |     const habitName = `Cancel edit habit ${Date.now()}`;
  244 |     await page.getByRole("textbox", { name: "New habit name" }).fill(habitName);
  245 |     await page.getByLabel("Habit category").selectOption("General");
  246 |     await page.getByLabel("Times per week").selectOption("3");
  247 |     await page.getByRole("button", { name: "Add habit" }).click();
  248 |     const habitCard = page.getByRole("listitem").filter({ hasText: habitName });
  249 |     await expect(habitCard).toBeVisible();
  250 |     const editButton = habitCard.getByRole("button", { name: `Edit ${habitName}` });
  251 |     await editButton.click();
  252 |     const editNameInput = page.getByLabel(`Edit name for ${habitName}`);
  253 |     await editNameInput.fill("Changed name");
  254 |     await page.getByRole("button", { name: "Cancel", exact: true }).click();
  255 |     await expect(page.getByLabel(`Edit name for ${habitName}`)).toHaveCount(0);
  256 |     await expect(habitCard).toBeVisible();
  257 |   });
  258 | 
  259 |   /**
  260 |    * TC15: HabitCard - Save button disabled when name input is empty or blank
  261 |    */
  262 |   test('TC15 - HabitCard - Save button disabled when name input is empty or blank', async ({ page }) => {
  263 |     await page.goto("/");
  264 |     const habitName = `Edit validation habit ${Date.now()}`;
  265 |     await page.getByRole("textbox", { name: "New habit name" }).fill(habitName);
  266 |     await page.getByLabel("Habit category").selectOption("General");
  267 |     await page.getByLabel("Times per week").selectOption("3");
  268 |     await page.getByRole("button", { name: "Add habit" }).click();
  269 |     const habitCard = page.getByRole("listitem").filter({ hasText: habitName });
  270 |     await expect(habitCard).toBeVisible();
  271 |     const editButton = habitCard.getByRole("button", { name: `Edit ${habitName}` });
  272 |     await editButton.click();
  273 |     const saveButton = page.getByRole("button", { name: "Save", exact: true });
  274 |     await page.getByLabel(`Edit name for ${habitName}`).fill("");
  275 |     await expect(saveButton).toBeDisabled();
  276 |     await page.getByLabel(`Edit name for ${habitName}`).fill("   ");
  277 |     await expect(saveButton).toBeDisabled();
  278 |   });
  279 | 
  280 |   /**
  281 |    * TC16: Page heading and static elements render
  282 |    */
  283 |   test('TC16 - Page heading and static elements render', async ({ page }) => {
  284 |     await page.goto("/");
  285 |     await expect(page.getByRole("heading", { name: "Habit Tracker" })).toBeVisible();
  286 |     await expect(page.getByText("Build small daily habits, one day at a time.")).toBeVisible();
  287 |     await expect(page.getByLabel("Filter by category")).toBeVisible();
  288 |     await expect(page.getByRole("combobox", { name: "Filter by category" })).toBeVisible();
  289 |     await expect(page.getByRole("textbox", { name: "New habit name" })).toBeVisible();
  290 |     await expect(page.getByRole("combobox", { name: "Habit category" })).toBeVisible();
  291 |     await expect(page.getByRole("combobox", { name: "Times per week" })).toBeVisible();
  292 |     await expect(page.getByRole("button", { name: "Add habit" })).toBeVisible();
  293 |   });
  294 | 
  295 |   /**
  296 |    * TC17: HabitForm - allows creating a new habit
  297 |    */
  298 |   test('TC17 - HabitForm - allows creating a new habit', async ({ page }) => {
  299 |     await page.goto("/");
  300 |     const habitName = `Test habit create ${Date.now()}`;
  301 |     await page.getByRole("textbox", { name: "New habit name" }).fill(habitName);
  302 |     await page.getByRole("combobox", { name: "Habit category" }).selectOption("General");
  303 |     await page.getByRole("combobox", { name: "Times per week" }).selectOption("7");
  304 |     await page.getByRole("button", { name: "Add habit" }).click();
  305 |     await expect(page.getByRole("listitem").filter({ hasText: habitName })).toBeVisible();
  306 |   });
  307 | 
  308 |   /**
  309 |    * TC18: Category filter - allows filtering habits
  310 |    */
  311 |   test('TC18 - Category filter - allows filtering habits', async ({ page }) => {
  312 |     await page.goto("/");
  313 |     await page.getByRole("combobox", { name: "Filter by category" }).selectOption("Health");
  314 |     await expect(page.getByLabel("Filter by category")).toHaveValue("Health");
  315 |   });
  316 | 
  317 |   /**
  318 |    * TC19: HabitCard - marks habit done today disables button
  319 |    */
  320 |   test('TC19 - HabitCard - marks habit done today disables button', async ({ page }) => {
  321 |     await page.goto("/");
  322 |     const habitName = `Daily completion habit ${Date.now()}`;
  323 |     await page.getByRole("textbox", { name: "New habit name" }).fill(habitName);
  324 |     await page.getByRole("button", { name: "Add habit" }).click();
  325 |     const card = page.getByRole("listitem").filter({ hasText: habitName });
  326 |     const doneButtons = card.getByRole("button", { name: "Done today", exact: true });
> 327 |     await expect(doneButtons).toHaveCount(1);
      |                               ^ Error: expect(locator).toHaveCount(expected) failed
  328 |     await expect(doneButtons.first()).toBeDisabled();
  329 |   });
  330 | 
  331 |   /**
  332 |    * TC20: HabitCard inline edit form - opens and cancels edit mode
  333 |    */
  334 |   test('TC20 - HabitCard inline edit form - opens and cancels edit mode', async ({ page }) => {
  335 |     await page.goto("/");
  336 |     const habitName = `Editable habit ${Date.now()}`;
  337 |     await page.getByRole("textbox", { name: "New habit name" }).fill(habitName);
  338 |     await page.getByRole("button", { name: "Add habit" }).click();
  339 |     const card = page.getByRole("listitem").filter({ hasText: habitName });
  340 |     await card.getByRole("button", { name: `Edit ${habitName}` }).click();
  341 |     const nameInput = page.getByLabel(`Edit name for ${habitName}`);
  342 |     await expect(nameInput).toBeVisible();
  343 |     await page.getByRole("button", { name: "Cancel", exact: true }).click();
  344 |     await expect(card.getByRole("button", { name: `Edit ${habitName}` })).toBeVisible();
  345 |   });
  346 | 
  347 |   /**
  348 |    * TC21: HabitCard inline edit form - saves edited habit and closes form
  349 |    */
  350 |   test('TC21 - HabitCard inline edit form - saves edited habit and closes form', async ({ page }) => {
  351 |     await page.goto("/");
  352 |     const habitName = `Editable habit save ${Date.now()}`;
  353 |     await page.getByRole("textbox", { name: "New habit name" }).fill(habitName);
  354 |     await page.getByRole("button", { name: "Add habit" }).click();
  355 |     const card = page.getByRole("listitem").filter({ hasText: habitName });
  356 |     await card.getByRole("button", { name: `Edit ${habitName}` }).click();
  357 |     const nameInput = page.getByLabel(`Edit name for ${habitName}`);
  358 |     await expect(nameInput).toHaveValue(habitName);
  359 |     const updatedName = `${habitName} updated`;
  360 |     await nameInput.fill(updatedName);
  361 |     const categorySelect = page.getByLabel(`Edit category for ${habitName}`);
  362 |     await categorySelect.selectOption("General");
  363 |     const timesSelect = page.getByLabel(`Edit times per week for ${habitName}`);
  364 |     await timesSelect.selectOption("3");
  365 |     await page.getByRole("button", { name: "Save", exact: true }).click();
  366 |     await expect(page.getByRole("listitem").filter({ hasText: updatedName })).toBeVisible();
  367 |     await expect(page.getByLabel(`Edit name for ${habitName}`)).toHaveCount(0);
  368 |   });
  369 | 
  370 |   /**
  371 |    * TC22: Home page - initial render shows main heading, filter, show archived checkbox, export buttons disabled, and navigation link
  372 |    */
  373 |   test('TC22 - Home page - initial render shows main heading, filter, show archived checkbox, export buttons disabled, and navigation link', async ({ page }) => {
  374 |     await page.goto('/');
  375 |     await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
  376 |     const categoryFilter = page.getByLabel('Filter by category');
  377 |     await expect(categoryFilter).toBeVisible();
  378 |     const allOption = categoryFilter.locator('option[value=""]');
  379 |     await expect(allOption).toHaveCount(1);
  380 |     await expect(categoryFilter).toHaveValue('');
  381 |     const showArchivedCheckbox = page.getByLabel('Show archived');
  382 |     await expect(showArchivedCheckbox).toBeVisible();
  383 |     await expect(showArchivedCheckbox).not.toBeChecked();
  384 |     const exportJsonButton = page.getByRole('button', { name: 'Export JSON' });
  385 |     await expect(exportJsonButton).toBeVisible();
  386 |     await expect(exportJsonButton).toBeDisabled();
  387 |     const exportCsvButton = page.getByRole('button', { name: 'Export CSV' });
  388 |     await expect(exportCsvButton).toBeVisible();
  389 |     await expect(exportCsvButton).toBeDisabled();
  390 |     const statsLink = page.getByRole('link', { name: 'View stats' });
  391 |     await expect(statsLink).toBeVisible();
  392 |   });
  393 | 
  394 |   /**
  395 |    * TC23: HabitForm - create a habit with notes successfully adds it to the list and enables export buttons
  396 |    */
  397 |   test('TC23 - HabitForm - create a habit with notes successfully adds it to the list and enables export buttons', async ({ page }) => {
  398 |     await page.goto('/');
  399 |     const habitName = `Test habit ${Date.now()}`;
  400 |     const habitNotes = 'Test note for habit';
  401 |     await page.getByLabel('New habit name').fill(habitName);
  402 |     await page.getByLabel('Habit category').selectOption('Health');
  403 |     await page.getByLabel('Times per week').selectOption('3');
  404 |     await page.getByLabel('Notes (optional)').fill(habitNotes);
  405 |     await page.getByRole('button', { name: 'Add habit' }).click();
  406 |     const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
  407 |     await expect(habitCard).toBeVisible();
  408 |     await expect(habitCard.getByText(habitNotes)).toBeVisible();
  409 |     const exportJsonButton = page.getByRole('button', { name: 'Export JSON' });
  410 |     await expect(exportJsonButton).toBeEnabled();
  411 |     const exportCsvButton = page.getByRole('button', { name: 'Export CSV' });
  412 |     await expect(exportCsvButton).toBeEnabled();
  413 |   });
  414 | 
  415 |   /**
  416 |    * TC24: HabitCard - edit habit updates name, category, target per week, and notes
  417 |    */
  418 |   test('TC24 - HabitCard - edit habit updates name, category, target per week, and notes', async ({ page }) => {
  419 |     await page.goto('/');
  420 |     const originalName = `Edit habit ${Date.now()}`;
  421 |     const updatedName = `Updated habit ${Date.now()}`;
  422 |     const updatedNotes = 'Updated notes';
  423 |     await page.getByLabel('New habit name').fill(originalName);
  424 |     await page.getByLabel('Habit category').selectOption('Work');
  425 |     await page.getByLabel('Times per week').selectOption('2');
  426 |     await page.getByLabel('Notes (optional)').fill('Initial notes');
  427 |     await page.getByRole('button', { name: 'Add habit' }).click();
```