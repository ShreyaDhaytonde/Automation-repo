# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> Home >> TC75 - Filters - filter habits by category
- Location: tests/home.spec.ts:1425:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('list')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('list') with timeout 10000ms
  - waiting for getByRole('list')

```

```yaml
- main:
  - heading "Habit Tracker" [level=1]
  - paragraph: Build small daily habits, one day at a time.
  - paragraph: Friday, September 25
  - link "History":
    - /url: /history
  - link "View stats":
    - /url: /stats
  - link "Archive":
    - /url: /archive
  - link "Settings":
    - /url: /settings
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
    - option "Priority (highest first)"
    - option "Weekly target (highest first)"
  - text: Filter by category
  - combobox "Filter by category":
    - option "All"
    - option "General"
    - option "Health" [selected]
    - option "Work"
    - option "Personal"
    - option "Learning"
  - text: Filter by priority
  - combobox "Filter by priority":
    - option "All" [selected]
    - option "Low"
    - option "Medium"
    - option "High"
  - checkbox "Show archived"
  - text: Show archived
  - button "Clear filters"
  - button "Complete all for today (0)" [disabled]
  - button "Export JSON" [disabled]
  - button "Export CSV" [disabled]
  - button "Import CSV"
  - paragraph: No habits in the "Health" category yet.
- alert
```

# Test source

```ts
  1328 |     await expect(habitCardLocator(page, habitName)).toHaveCount(0);
  1329 |     await showArchivedToggle(page).check();
  1330 |     const archivedHabitCard = habitCardLocator(page, habitName);
  1331 |     await expect(archivedHabitCard).toBeVisible();
  1332 |     await archivedHabitCard.getByRole('checkbox', { name: `Unarchive ${habitName}` }).uncheck();
  1333 |     await expect(habitCardLocator(page, habitName)).toBeVisible();
  1334 |   });
  1335 | 
  1336 |   /**
  1337 |    * TC70: HabitList - duplicates a habit
  1338 |    */
  1339 |   test('TC70 - HabitList - duplicates a habit', async ({ page }) => {
  1340 |     await page.goto('/');
  1341 |     const habitName = `Duplicate Habit ${Date.now()}`;
  1342 |     await newHabitNameField(page).fill(habitName);
  1343 |     await newHabitCategoryField(page).selectOption('General');
  1344 |     await newHabitTargetField(page).selectOption('3');
  1345 |     await submitAddHabitButton(page).click();
  1346 |     const habitCard = habitCardLocator(page, habitName);
  1347 |     await expect(habitCard).toBeVisible();
  1348 |     await habitCard.getByRole('button', { name: `Duplicate ${habitName}` }).click();
  1349 |     const duplicateCard = habitCardLocator(page, `${habitName} (copy)`);
  1350 |     await expect(duplicateCard).toBeVisible();
  1351 |   });
  1352 | 
  1353 |   /**
  1354 |    * TC71: Home - clears all filters and resets controls
  1355 |    */
  1356 |   test('TC71 - Home - clears all filters and resets controls', async ({ page }) => {
  1357 |     await page.goto('/');
  1358 |     await categoryFilterControl(page).selectOption('General');
  1359 |     await showArchivedToggle(page).check();
  1360 |     await habitSearchBox(page).fill('test');
  1361 |     await sortByControl(page).selectOption('streak');
  1362 |     await page.getByRole('button', { name: 'Clear filters' }).click();
  1363 |     await expect(categoryFilterControl(page)).toHaveValue('');
  1364 |     await expect(showArchivedToggle(page)).not.toBeChecked();
  1365 |     await expect(habitSearchBox(page)).toHaveValue('');
  1366 |     await expect(sortByControl(page)).toHaveValue('name');
  1367 |   });
  1368 | 
  1369 |   /**
  1370 |    * TC72: HabitList - complete a habit
  1371 |    */
  1372 |   test('TC72 - HabitList - complete a habit', async ({ page }) => {
  1373 |     await page.goto('/');
  1374 |     const habitName = `Complete Habit ${Date.now()}`;
  1375 |     await newHabitNameField(page).fill(habitName);
  1376 |     await newHabitCategoryField(page).selectOption('Health');
  1377 |     await newHabitTargetField(page).selectOption('2');
  1378 |     await newHabitNotesField(page).fill('Complete test');
  1379 |     await submitAddHabitButton(page).click();
  1380 |     const habitCard = habitCardLocator(page, habitName);
  1381 |     await expect(habitCard).toBeVisible();
  1382 |     await habitCard.getByRole('button', { name: 'Mark done' }).click();
  1383 |     await expect(habitCard.getByRole('button', { name: 'Done today' })).toBeVisible();
  1384 |   });
  1385 | 
  1386 |   /**
  1387 |    * TC73: Complete all - complete all pending habits for today
  1388 |    */
  1389 |   test('TC73 - Complete all - complete all pending habits for today', async ({ page }) => {
  1390 |     await page.goto('/');
  1391 |     const habitName1 = `CompleteAll1 ${Date.now()}`;
  1392 |     const habitName2 = `CompleteAll2 ${Date.now()}`;
  1393 |     await newHabitNameField(page).fill(habitName1);
  1394 |     await newHabitCategoryField(page).selectOption('Health');
  1395 |     await newHabitTargetField(page).selectOption('1');
  1396 |     await newHabitNotesField(page).fill('Notes 1');
  1397 |     await submitAddHabitButton(page).click();
  1398 |     await expect(habitCardLocator(page, habitName1)).toBeVisible();
  1399 |     await newHabitNameField(page).fill(habitName2);
  1400 |     await newHabitCategoryField(page).selectOption('Health');
  1401 |     await newHabitTargetField(page).selectOption('1');
  1402 |     await newHabitNotesField(page).fill('Notes 2');
  1403 |     await submitAddHabitButton(page).click();
  1404 |     await expect(habitCardLocator(page, habitName2)).toBeVisible();
  1405 |     const completeAllButton = page.getByRole('button', { name: /^Complete all for today/ });
  1406 |     await expect(completeAllButton).toBeEnabled();
  1407 |     await completeAllButton.click();
  1408 |     await expect(habitCardLocator(page, habitName1).getByRole('button', { name: 'Done today' })).toBeVisible();
  1409 |     await expect(habitCardLocator(page, habitName2).getByRole('button', { name: 'Done today' })).toBeVisible();
  1410 |   });
  1411 | 
  1412 |   /**
  1413 |    * TC74: Filters - search habits by name
  1414 |    */
  1415 |   test('TC74 - Filters - search habits by name', async ({ page }) => {
  1416 |     await page.goto('/');
  1417 |     const uniqueSearch = `search-${Date.now()}`;
  1418 |     await habitSearchBox(page).fill(uniqueSearch);
  1419 |     await expect(page.getByText(`No habits match "${uniqueSearch}".`)).toBeVisible();
  1420 |   });
  1421 | 
  1422 |   /**
  1423 |    * TC75: Filters - filter habits by category
  1424 |    */
  1425 |   test('TC75 - Filters - filter habits by category', async ({ page }) => {
  1426 |     await page.goto('/');
  1427 |     await categoryFilterControl(page).selectOption('Health');
> 1428 |     await expect(page.getByRole('list')).toBeVisible();
       |                                          ^ Error: expect(locator).toBeVisible() failed
  1429 |   });
  1430 | 
  1431 |   /**
  1432 |    * TC76: Filters - toggle show archived habits
  1433 |    */
  1434 |   test('TC76 - Filters - toggle show archived habits', async ({ page }) => {
  1435 |     await page.goto('/');
  1436 |     const showArchivedCheckbox = showArchivedToggle(page);
  1437 |     await showArchivedCheckbox.check();
  1438 |     await expect(page.getByRole('list')).toBeVisible();
  1439 |     await showArchivedCheckbox.uncheck();
  1440 |     await expect(page.getByRole('list')).toBeVisible();
  1441 |   });
  1442 | 
  1443 |   /**
  1444 |    * TC77: Filters - clear all filters
  1445 |    */
  1446 |   test('TC77 - Filters - clear all filters', async ({ page }) => {
  1447 |     await page.goto('/');
  1448 |     await habitSearchBox(page).fill('test');
  1449 |     await categoryFilterControl(page).selectOption('Health');
  1450 |     await showArchivedToggle(page).check();
  1451 |     await sortByControl(page).selectOption('streak');
  1452 |     await page.getByRole('button', { name: 'Clear filters' }).click();
  1453 |     await expect(habitSearchBox(page)).toHaveValue('');
  1454 |     await expect(categoryFilterControl(page)).toHaveValue('');
  1455 |     await expect(showArchivedToggle(page)).not.toBeChecked();
  1456 |     await expect(sortByControl(page)).toHaveValue('name');
  1457 |   });
  1458 | 
  1459 |   /**
  1460 |    * TC78: Navigation - navigate to History page
  1461 |    */
  1462 |   test('TC78 - Navigation - navigate to History page', async ({ page }) => {
  1463 |     await page.goto('/');
  1464 |     await page.getByRole('link', { name: 'History' }).click();
  1465 |     await expect(page).toHaveURL('/history');
  1466 |   });
  1467 | 
  1468 |   /**
  1469 |    * TC79: Navigation - navigate to View stats page
  1470 |    */
  1471 |   test('TC79 - Navigation - navigate to View stats page', async ({ page }) => {
  1472 |     await page.goto('/');
  1473 |     await page.getByRole('link', { name: 'View stats' }).click();
  1474 |     await expect(page).toHaveURL('/stats');
  1475 |   });
  1476 | 
  1477 |   /**
  1478 |    * TC80: Navigation - navigate to Archive page
  1479 |    */
  1480 |   test('TC80 - Navigation - navigate to Archive page', async ({ page }) => {
  1481 |     await page.goto('/');
  1482 |     await page.getByRole('link', { name: 'Archive' }).click();
  1483 |     await expect(page).toHaveURL('/archive');
  1484 |   });
  1485 | 
  1486 |   /**
  1487 |    * TC81: Home - complete a habit and verify completed state
  1488 |    */
  1489 |   test('TC81 - Home - complete a habit and verify completed state', async ({ page }) => {
  1490 |     await page.goto('/');
  1491 |     const habitName = `CompleteTest-${Date.now()}`;
  1492 |     await newHabitNameField(page).fill(habitName);
  1493 |     await newHabitCategoryField(page).selectOption('General');
  1494 |     await newHabitTargetField(page).selectOption('3');
  1495 |     await submitAddHabitButton(page).click();
  1496 |     const habitCard = habitCardLocator(page, habitName);
  1497 |     await expect(habitCard).toBeVisible();
  1498 |     const completeButton = habitCard.getByRole('button', { name: 'Mark done' });
  1499 |     await completeButton.click();
  1500 |     const completedButton = habitCard.getByRole('button', { name: 'Done today' });
  1501 |     await expect(completedButton).toBeVisible();
  1502 |   });
  1503 | 
  1504 |   /**
  1505 |    * TC82: Home - navigation links go to correct routes
  1506 |    */
  1507 |   test('TC82 - Home - navigation links go to correct routes', async ({ page }) => {
  1508 |     await page.goto('/');
  1509 |     const historyLink = page.getByRole('link', { name: 'History' });
  1510 |     await expect(historyLink).toHaveAttribute('href', '/history');
  1511 |     const statsLink = page.getByRole('link', { name: 'View stats' });
  1512 |     await expect(statsLink).toHaveAttribute('href', '/stats');
  1513 |     const archiveLink = page.getByRole('link', { name: 'Archive' });
  1514 |     await expect(archiveLink).toHaveAttribute('href', '/archive');
  1515 |   });
  1516 | 
  1517 |   /**
  1518 |    * TC83: Home - search filters habits by name
  1519 |    */
  1520 |   test('TC83 - Home - search filters habits by name', async ({ page }) => {
  1521 |     await page.goto('/');
  1522 |     const uniqueSearch = `unique-search-${Date.now()}`;
  1523 |     await newHabitNameField(page).fill(uniqueSearch);
  1524 |     await newHabitCategoryField(page).selectOption('General');
  1525 |     await newHabitTargetField(page).selectOption('3');
  1526 |     await submitAddHabitButton(page).click();
  1527 |     await expect(habitCardLocator(page, uniqueSearch)).toBeVisible();
  1528 |     await page.getByLabel('Search habits by name').fill(uniqueSearch);
```