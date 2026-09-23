# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> Home >> TC67 - Filters - toggle show archived habits
- Location: tests/home.spec.ts:1271:7

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
  - paragraph: Wednesday, September 23
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
    - option "Priority (highest first)"
    - option "Weekly target (highest first)"
  - text: Filter by category
  - combobox "Filter by category":
    - option "All" [selected]
    - option "General"
    - option "Health"
    - option "Work"
    - option "Personal"
    - option "Learning"
  - text: Filter by priority
  - combobox "Filter by priority":
    - option "All" [selected]
    - option "Low"
    - option "Medium"
    - option "High"
  - checkbox "Show archived" [checked]
  - text: Show archived
  - button "Clear filters"
  - button "Complete all for today (0)" [disabled]
  - button "Export JSON" [disabled]
  - button "Export CSV" [disabled]
  - paragraph: No habits yet — add one above to get started.
- alert
```

# Test source

```ts
  1175 |     await nameInput.fill(newName);
  1176 |     await page.getByLabel(`Edit category for ${originalName}`).selectOption('Health');
  1177 |     await page.getByLabel(`Edit times per week for ${originalName}`).selectOption('5');
  1178 |     await page.getByLabel(`Edit notes for ${originalName}`).fill('Updated notes');
  1179 |     await habitCard.getByRole('button', { name: 'Save' }).click();
  1180 |     const updatedHabitCard = habitCardLocator(page, newName);
  1181 |     await expect(updatedHabitCard).toBeVisible();
  1182 |   });
  1183 | 
  1184 |   /**
  1185 |    * TC62: HabitCard - edits an existing habit\\\\\\\'s name, category, target per week, and notes
  1186 |    */
  1187 |   test('TC62 - HabitCard - edits an existing habit\\\\\\\\\\\\\\\'s name, category, target per week, and notes', async ({ page }) => {
  1188 |     await page.goto('/');
  1189 |     const originalName = `Original Habit ${Date.now()}`;
  1190 |     const updatedName = `Updated Habit ${Date.now()}`;
  1191 |     await page.getByLabel('New habit name').fill(originalName);
  1192 |     await submitAddHabitButton(page).click();
  1193 |     const habitCard = habitCardLocator(page, originalName);
  1194 |     await expect(habitCard).toBeVisible();
  1195 |     await habitCard.getByRole('button', { name: `Edit` }).click();
  1196 |     const nameInput = page.getByLabel(`Edit name for ${originalName}`);
  1197 |     await expect(nameInput).toHaveValue(originalName);
  1198 |     await nameInput.fill(updatedName);
  1199 |     await page.getByLabel(`Edit category for ${originalName}`).selectOption('Health');
  1200 |     await page.getByLabel(`Edit times per week for ${originalName}`).selectOption('3');
  1201 |     await page.getByLabel(`Edit notes for ${originalName}`).fill('Updated notes');
  1202 |     await page.getByRole('button', { name: 'Save' }).click();
  1203 |     await expect(habitCardLocator(page, updatedName)).toBeVisible();
  1204 |   });
  1205 | 
  1206 |   /**
  1207 |    * TC63: HabitList - complete a habit
  1208 |    */
  1209 |   test('TC63 - HabitList - complete a habit', async ({ page }) => {
  1210 |     await page.goto('/');
  1211 |     const habitName = `Complete Habit ${Date.now()}`;
  1212 |     await newHabitNameField(page).fill(habitName);
  1213 |     await newHabitCategoryField(page).selectOption('Health');
  1214 |     await newHabitTargetField(page).selectOption('2');
  1215 |     await newHabitNotesField(page).fill('Complete test');
  1216 |     await submitAddHabitButton(page).click();
  1217 |     const habitCard = habitCardLocator(page, habitName);
  1218 |     await expect(habitCard).toBeVisible();
  1219 |     await habitCard.getByRole('button', { name: 'Mark done' }).click();
  1220 |     await expect(habitCard.getByRole('button', { name: 'Done today' })).toBeVisible();
  1221 |   });
  1222 | 
  1223 |   /**
  1224 |    * TC64: Complete all - complete all pending habits for today
  1225 |    */
  1226 |   test('TC64 - Complete all - complete all pending habits for today', async ({ page }) => {
  1227 |     await page.goto('/');
  1228 |     const habitName1 = `CompleteAll1 ${Date.now()}`;
  1229 |     const habitName2 = `CompleteAll2 ${Date.now()}`;
  1230 |     await newHabitNameField(page).fill(habitName1);
  1231 |     await newHabitCategoryField(page).selectOption('Health');
  1232 |     await newHabitTargetField(page).selectOption('1');
  1233 |     await newHabitNotesField(page).fill('Notes 1');
  1234 |     await submitAddHabitButton(page).click();
  1235 |     await expect(habitCardLocator(page, habitName1)).toBeVisible();
  1236 |     await newHabitNameField(page).fill(habitName2);
  1237 |     await newHabitCategoryField(page).selectOption('Health');
  1238 |     await newHabitTargetField(page).selectOption('1');
  1239 |     await newHabitNotesField(page).fill('Notes 2');
  1240 |     await submitAddHabitButton(page).click();
  1241 |     await expect(habitCardLocator(page, habitName2)).toBeVisible();
  1242 |     const completeAllButton = page.getByRole('button', { name: /^Complete all for today/ });
  1243 |     await expect(completeAllButton).toBeEnabled();
  1244 |     await completeAllButton.click();
  1245 |     await expect(habitCardLocator(page, habitName1).getByRole('button', { name: 'Done today' })).toBeVisible();
  1246 |     await expect(habitCardLocator(page, habitName2).getByRole('button', { name: 'Done today' })).toBeVisible();
  1247 |   });
  1248 | 
  1249 |   /**
  1250 |    * TC65: Filters - search habits by name
  1251 |    */
  1252 |   test('TC65 - Filters - search habits by name', async ({ page }) => {
  1253 |     await page.goto('/');
  1254 |     const uniqueSearch = `search-${Date.now()}`;
  1255 |     await habitSearchBox(page).fill(uniqueSearch);
  1256 |     await expect(page.getByText(`No habits match "${uniqueSearch}".`)).toBeVisible();
  1257 |   });
  1258 | 
  1259 |   /**
  1260 |    * TC66: Filters - filter habits by category
  1261 |    */
  1262 |   test('TC66 - Filters - filter habits by category', async ({ page }) => {
  1263 |     await page.goto('/');
  1264 |     await categoryFilterControl(page).selectOption('Health');
  1265 |     await expect(page.getByRole('list')).toBeVisible();
  1266 |   });
  1267 | 
  1268 |   /**
  1269 |    * TC67: Filters - toggle show archived habits
  1270 |    */
  1271 |   test('TC67 - Filters - toggle show archived habits', async ({ page }) => {
  1272 |     await page.goto('/');
  1273 |     const showArchivedCheckbox = showArchivedToggle(page);
  1274 |     await showArchivedCheckbox.check();
> 1275 |     await expect(page.getByRole('list')).toBeVisible();
       |                                          ^ Error: expect(locator).toBeVisible() failed
  1276 |     await showArchivedCheckbox.uncheck();
  1277 |     await expect(page.getByRole('list')).toBeVisible();
  1278 |   });
  1279 | 
  1280 |   /**
  1281 |    * TC68: Filters - clear all filters
  1282 |    */
  1283 |   test('TC68 - Filters - clear all filters', async ({ page }) => {
  1284 |     await page.goto('/');
  1285 |     await habitSearchBox(page).fill('test');
  1286 |     await categoryFilterControl(page).selectOption('Health');
  1287 |     await showArchivedToggle(page).check();
  1288 |     await sortByControl(page).selectOption('streak');
  1289 |     await page.getByRole('button', { name: 'Clear filters' }).click();
  1290 |     await expect(habitSearchBox(page)).toHaveValue('');
  1291 |     await expect(categoryFilterControl(page)).toHaveValue('');
  1292 |     await expect(showArchivedToggle(page)).not.toBeChecked();
  1293 |     await expect(sortByControl(page)).toHaveValue('name');
  1294 |   });
  1295 | 
  1296 |   /**
  1297 |    * TC69: Navigation - navigate to History page
  1298 |    */
  1299 |   test('TC69 - Navigation - navigate to History page', async ({ page }) => {
  1300 |     await page.goto('/');
  1301 |     await page.getByRole('link', { name: 'History' }).click();
  1302 |     await expect(page).toHaveURL('/history');
  1303 |   });
  1304 | 
  1305 |   /**
  1306 |    * TC70: Navigation - navigate to View stats page
  1307 |    */
  1308 |   test('TC70 - Navigation - navigate to View stats page', async ({ page }) => {
  1309 |     await page.goto('/');
  1310 |     await page.getByRole('link', { name: 'View stats' }).click();
  1311 |     await expect(page).toHaveURL('/stats');
  1312 |   });
  1313 | 
  1314 |   /**
  1315 |    * TC71: Navigation - navigate to Archive page
  1316 |    */
  1317 |   test('TC71 - Navigation - navigate to Archive page', async ({ page }) => {
  1318 |     await page.goto('/');
  1319 |     await page.getByRole('link', { name: 'Archive' }).click();
  1320 |     await expect(page).toHaveURL('/archive');
  1321 |   });
  1322 | 
  1323 |   /**
  1324 |    * TC72: Home - complete a habit and verify completed state
  1325 |    */
  1326 |   test('TC72 - Home - complete a habit and verify completed state', async ({ page }) => {
  1327 |     await page.goto('/');
  1328 |     const habitName = `CompleteTest-${Date.now()}`;
  1329 |     await newHabitNameField(page).fill(habitName);
  1330 |     await newHabitCategoryField(page).selectOption('General');
  1331 |     await newHabitTargetField(page).selectOption('3');
  1332 |     await submitAddHabitButton(page).click();
  1333 |     const habitCard = habitCardLocator(page, habitName);
  1334 |     await expect(habitCard).toBeVisible();
  1335 |     const completeButton = habitCard.getByRole('button', { name: 'Mark done' });
  1336 |     await completeButton.click();
  1337 |     const completedButton = habitCard.getByRole('button', { name: 'Done today' });
  1338 |     await expect(completedButton).toBeVisible();
  1339 |   });
  1340 | 
  1341 |   /**
  1342 |    * TC73: Home - navigation links go to correct routes
  1343 |    */
  1344 |   test('TC73 - Home - navigation links go to correct routes', async ({ page }) => {
  1345 |     await page.goto('/');
  1346 |     const historyLink = page.getByRole('link', { name: 'History' });
  1347 |     await expect(historyLink).toHaveAttribute('href', '/history');
  1348 |     const statsLink = page.getByRole('link', { name: 'View stats' });
  1349 |     await expect(statsLink).toHaveAttribute('href', '/stats');
  1350 |     const archiveLink = page.getByRole('link', { name: 'Archive' });
  1351 |     await expect(archiveLink).toHaveAttribute('href', '/archive');
  1352 |   });
  1353 | 
  1354 |   /**
  1355 |    * TC74: Home - search filters habits by name
  1356 |    */
  1357 |   test('TC74 - Home - search filters habits by name', async ({ page }) => {
  1358 |     await page.goto('/');
  1359 |     const uniqueSearch = `unique-search-${Date.now()}`;
  1360 |     await newHabitNameField(page).fill(uniqueSearch);
  1361 |     await newHabitCategoryField(page).selectOption('General');
  1362 |     await newHabitTargetField(page).selectOption('3');
  1363 |     await submitAddHabitButton(page).click();
  1364 |     await expect(habitCardLocator(page, uniqueSearch)).toBeVisible();
  1365 |     await page.getByLabel('Search habits by name').fill(uniqueSearch);
  1366 |     const filteredHabitCard = habitCardLocator(page, uniqueSearch);
  1367 |     await expect(filteredHabitCard).toBeVisible();
  1368 |   });
  1369 | 
  1370 |   /**
  1371 |    * TC75: Home - sort habits by different criteria
  1372 |    */
  1373 |   test('TC75 - Home - sort habits by different criteria', async ({ page }) => {
  1374 |     await page.goto('/');
  1375 |     const habitNameA = `AAA-${Date.now()}`;
```