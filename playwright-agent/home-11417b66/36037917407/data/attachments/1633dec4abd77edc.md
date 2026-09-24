# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> Home >> TC14 - Page heading and static elements render
- Location: tests/home.spec.ts:346:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Build small daily habits, one day at a time.')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByText('Build small daily habits, one day at a time.') with timeout 10000ms
  - waiting for getByText('Build small daily habits, one day at a time.')

```

```yaml
- heading "Habit Tracker" [level=1]
- paragraph: Sign in to continue.
- text: Name
- textbox "Name"
- text: Password
- textbox "Password"
- button "Sign in"
- alert
```

# Test source

```ts
  249 |     }
  250 |     await expect(page.getByLabel('Times per week')).toBeVisible();
  251 |     for (const n of ['1x / week','2x / week','3x / week','4x / week','5x / week','6x / week','7x / week']) {
  252 |       await expect(page.getByLabel('Times per week').locator('option').filter({ hasText: n })).toHaveCount(1);
  253 |     }
  254 |     await expect(submitAddHabitButton(page)).toBeVisible();
  255 |   });
  256 | 
  257 |   /**
  258 |    * TC10: HabitCard - inline edit form displays when Edit button clicked and updates fields
  259 |    */
  260 |   test('TC10 - HabitCard - inline edit form displays when Edit button clicked and updates fields', async ({ page }) => {
  261 |     await page.goto('/');
  262 |     const habitName = `Edit habit ${Date.now()}`;
  263 |     await newHabitNameField(page).fill(habitName);
  264 |     await page.getByLabel('Habit category').selectOption('General');
  265 |     await page.getByLabel('Times per week').selectOption('3');
  266 |     await submitAddHabitButton(page).click();
  267 |     const habitCard = habitCardLocator(page, habitName);
  268 |     await expect(habitCard).toBeVisible();
  269 |     const editButton = habitCard.getByRole('button', { name: `Edit ${habitName}` });
  270 |     await editButton.click();
  271 |     const editNameInput = page.getByLabel(`Edit name for ${habitName}`);
  272 |     const editCategorySelect = page.getByLabel(`Edit category for ${habitName}`);
  273 |     const editTimesSelect = page.getByLabel(`Edit times per week for ${habitName}`);
  274 |     await expect(editNameInput).toBeVisible();
  275 |     await expect(editNameInput).toHaveValue(habitName);
  276 |     await expect(editCategorySelect).toHaveValue('General');
  277 |     await expect(editTimesSelect).toHaveValue('3');
  278 |     const newName = `${habitName} updated`;
  279 |     await editNameInput.fill(newName);
  280 |     await editCategorySelect.selectOption('Health');
  281 |     await editTimesSelect.selectOption('5');
  282 |     await page.getByRole('button', { name: 'Save', exact: true }).click();
  283 |     const updatedHabitCard = habitCardLocator(page, newName);
  284 |     await expect(updatedHabitCard).toBeVisible();
  285 |   });
  286 | 
  287 |   /**
  288 |    * TC11: HabitForm - form validation disables Add habit button for empty name
  289 |    */
  290 |   test('TC11 - HabitForm - form validation disables Add habit button for empty name', async ({ page }) => {
  291 |     await page.goto('/');
  292 |     const nameInput = newHabitNameField(page);
  293 |     const addButton = submitAddHabitButton(page);
  294 |     await nameInput.fill('');
  295 |     await expect(addButton).toBeDisabled();
  296 |     await nameInput.fill('   ');
  297 |     await expect(addButton).toBeDisabled();
  298 |   });
  299 | 
  300 |   /**
  301 |    * TC12: HabitCard - cancel edit closes inline form without saving changes
  302 |    */
  303 |   test('TC12 - HabitCard - cancel edit closes inline form without saving changes', async ({ page }) => {
  304 |     await page.goto('/');
  305 |     const habitName = `Cancel edit habit ${Date.now()}`;
  306 |     await newHabitNameField(page).fill(habitName);
  307 |     await page.getByLabel('Habit category').selectOption('General');
  308 |     await page.getByLabel('Times per week').selectOption('3');
  309 |     await submitAddHabitButton(page).click();
  310 |     const habitCard = habitCardLocator(page, habitName);
  311 |     await expect(habitCard).toBeVisible();
  312 |     const editButton = habitCard.getByRole('button', { name: `Edit ${habitName}` });
  313 |     await editButton.click();
  314 |     const editNameInput = page.getByLabel(`Edit name for ${habitName}`);
  315 |     await editNameInput.fill('Changed name');
  316 |     await page.getByRole('button', { name: 'Cancel', exact: true }).click();
  317 |     await expect(page.getByLabel(`Edit name for ${habitName}`)).toHaveCount(0);
  318 |     await expect(habitCard).toBeVisible();
  319 |   });
  320 | 
  321 |   /**
  322 |    * TC13: HabitCard - Save button disabled when name input is empty or blank
  323 |    */
  324 |   test('TC13 - HabitCard - Save button disabled when name input is empty or blank', async ({ page }) => {
  325 |     await page.goto('/');
  326 |     const habitName = `Edit validation habit ${Date.now()}`;
  327 |     await newHabitNameField(page).fill(habitName);
  328 |     await page.getByLabel('Habit category').selectOption('General');
  329 |     await page.getByLabel('Times per week').selectOption('3');
  330 |     await submitAddHabitButton(page).click();
  331 |     const habitCard = habitCardLocator(page, habitName);
  332 |     await expect(habitCard).toBeVisible();
  333 |     const editButton = habitCard.getByRole('button', { name: `Edit ${habitName}` });
  334 |     await editButton.click();
  335 |     const saveButton = page.getByRole('button', { name: 'Save', exact: true });
  336 |     const nameInput = page.getByLabel(`Edit name for ${habitName}`);
  337 |     await nameInput.fill('');
  338 |     await expect(saveButton).toBeDisabled();
  339 |     await nameInput.fill('   ');
  340 |     await expect(saveButton).toBeDisabled();
  341 |   });
  342 | 
  343 |   /**
  344 |    * TC14: Page heading and static elements render
  345 |    */
  346 |   test('TC14 - Page heading and static elements render', async ({ page }) => {
  347 |     await page.goto('/');
  348 |     await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
> 349 |     await expect(page.getByText('Build small daily habits, one day at a time.')).toBeVisible();
      |                                                                                  ^ Error: expect(locator).toBeVisible() failed
  350 |     await expect(page.getByLabel('Filter by category')).toBeVisible();
  351 |     await expect(categoryFilterControl(page)).toBeVisible();
  352 |     await expect(newHabitNameField(page)).toBeVisible();
  353 |     await expect(newHabitCategoryField(page)).toBeVisible();
  354 |     await expect(newHabitTargetField(page)).toBeVisible();
  355 |     await expect(submitAddHabitButton(page)).toBeVisible();
  356 |   });
  357 | 
  358 |   /**
  359 |    * TC15: HabitForm - allows creating a new habit
  360 |    */
  361 |   test('TC15 - HabitForm - allows creating a new habit', async ({ page }) => {
  362 |     await page.goto('/');
  363 |     const habitName = `Test habit create ${Date.now()}`;
  364 |     await newHabitNameField(page).fill(habitName);
  365 |     await newHabitCategoryField(page).selectOption('General');
  366 |     await newHabitTargetField(page).selectOption('7');
  367 |     await submitAddHabitButton(page).click();
  368 |     const habitCard = habitCardLocator(page, habitName);
  369 |     await expect(habitCard).toBeVisible();
  370 |   });
  371 | 
  372 |   /**
  373 |    * TC16: Category filter - allows filtering habits
  374 |    */
  375 |   test('TC16 - Category filter - allows filtering habits', async ({ page }) => {
  376 |     await page.goto('/');
  377 |     await categoryFilterControl(page).selectOption('Health');
  378 |     await expect(page.getByLabel('Filter by category')).toHaveValue('Health');
  379 |   });
  380 | 
  381 |   /**
  382 |    * TC17: HabitCard - marks habit done today disables button
  383 |    */
  384 |   test('TC17 - HabitCard - marks habit done today disables button', async ({ page }) => {
  385 |     await page.goto('/');
  386 |     const habitName = `Daily completion habit ${Date.now()}`;
  387 |     await newHabitNameField(page).fill(habitName);
  388 |     await submitAddHabitButton(page).click();
  389 |     const card = habitCardLocator(page, habitName);
  390 |     const markDoneButton = card.getByRole('button', { name: 'Mark done', exact: true });
  391 |     await markDoneButton.click();
  392 |     await expect(card.getByRole('button', { name: 'Done today', exact: true })).toBeVisible();
  393 |     await expect(card.getByRole('button', { name: 'Done today', exact: true })).toBeDisabled();
  394 |   });
  395 | 
  396 |   /**
  397 |    * TC18: HabitCard inline edit form - opens and cancels edit mode
  398 |    */
  399 |   test('TC18 - HabitCard inline edit form - opens and cancels edit mode', async ({ page }) => {
  400 |     await page.goto('/');
  401 |     const habitName = `Editable habit ${Date.now()}`;
  402 |     await newHabitNameField(page).fill(habitName);
  403 |     await submitAddHabitButton(page).click();
  404 |     const card = habitCardLocator(page, habitName);
  405 |     await card.getByRole('button', { name: `Edit ${habitName}` }).click();
  406 |     const nameInput = page.getByLabel(`Edit name for ${habitName}`);
  407 |     await expect(nameInput).toBeVisible();
  408 |     await page.getByRole('button', { name: 'Cancel', exact: true }).click();
  409 |     await expect(card.getByRole('button', { name: `Edit ${habitName}` })).toBeVisible();
  410 |   });
  411 | 
  412 |   /**
  413 |    * TC19: HabitCard inline edit form - saves edited habit and closes form
  414 |    */
  415 |   test('TC19 - HabitCard inline edit form - saves edited habit and closes form', async ({ page }) => {
  416 |     await page.goto('/');
  417 |     const habitName = `Editable habit save ${Date.now()}`;
  418 |     await newHabitNameField(page).fill(habitName);
  419 |     await submitAddHabitButton(page).click();
  420 |     const card = habitCardLocator(page, habitName);
  421 |     await card.getByRole('button', { name: `Edit ${habitName}` }).click();
  422 |     const nameInput = page.getByLabel(`Edit name for ${habitName}`);
  423 |     await expect(nameInput).toHaveValue(habitName);
  424 |     const updatedName = `${habitName} updated`;
  425 |     await nameInput.fill(updatedName);
  426 |     const categorySelect = page.getByLabel(`Edit category for ${habitName}`);
  427 |     await categorySelect.selectOption('General');
  428 |     const timesSelect = page.getByLabel(`Edit times per week for ${habitName}`);
  429 |     await timesSelect.selectOption('3');
  430 |     await page.getByRole('button', { name: 'Save', exact: true }).click();
  431 |     await expect(habitCardLocator(page, updatedName)).toBeVisible();
  432 |     await expect(page.getByLabel(`Edit name for ${habitName}`)).toHaveCount(0);
  433 |   });
  434 | 
  435 |   /**
  436 |    * TC20: Home page - initial render shows main heading, filter, show archived checkbox, export buttons disabled, and navigation link
  437 |    */
  438 |   test('TC20 - Home page - initial render shows main heading, filter, show archived checkbox, export buttons disabled, and navigation link', async ({ page }) => {
  439 |     await page.goto('/');
  440 |     await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
  441 |     const categoryFilter = page.getByLabel('Filter by category');
  442 |     await expect(categoryFilter).toBeVisible();
  443 |     const allOption = categoryFilter.locator('option[value=""]');
  444 |     await expect(allOption).toHaveCount(1);
  445 |     await expect(categoryFilter).toHaveValue('');
  446 |     const showArchivedCheckbox = showArchivedToggle(page);
  447 |     await expect(showArchivedCheckbox).toBeVisible();
  448 |     await expect(showArchivedCheckbox).not.toBeChecked();
  449 |     const exportJsonButton = page.getByRole('button', { name: 'Export JSON' });
```