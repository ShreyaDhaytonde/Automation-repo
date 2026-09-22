# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> Home >> TC72 - Home - sort habits by different criteria
- Location: tests/home.spec.ts:1274:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('listitem').filter({ hasText: 'AAA-1790056450076' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('listitem').filter({ hasText: 'AAA-1790056450076' }) with timeout 10000ms
  - waiting for getByRole('listitem').filter({ hasText: 'AAA-1790056450076' })

```

```yaml
- main:
  - heading "Habit Tracker" [level=1]
  - paragraph: Build small daily habits, one day at a time.
  - paragraph: Tuesday, September 22
  - paragraph: 3/3 done today
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
    - option "3x / week" [selected]
    - option "4x / week"
    - option "5x / week"
    - option "6x / week"
    - option "7x / week"
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
  - button "Complete all for today (0)" [disabled]
  - button "Export JSON"
  - button "Export CSV"
  - list:
    - listitem:
      - paragraph: Complete Habit 1790056444154
      - text: Health
      - paragraph: 🔥 1 day streak
      - progressbar "Complete Habit 1790056444154 weekly progress"
      - text: 1/2 this week
      - paragraph: Complete test
      - button "Done today" [disabled]
      - button "Freeze Complete Habit 1790056444154 for today" [disabled]: 🧊 Freeze
      - button "Edit Complete Habit 1790056444154": Edit
      - button "Duplicate Complete Habit 1790056444154": Duplicate
      - button "Archive Complete Habit 1790056444154": Archive
      - button "Delete Complete Habit 1790056444154": Remove
    - listitem:
      - paragraph: CompleteAll1 1790056445875
      - text: Health
      - paragraph: 🔥 1 day streak
      - progressbar "CompleteAll1 1790056445875 weekly progress"
      - text: 🎉 Weekly goal reached
      - paragraph: Notes 1
      - button "Done today" [disabled]
      - button "Freeze CompleteAll1 1790056445875 for today" [disabled]: 🧊 Freeze
      - button "Edit CompleteAll1 1790056445875": Edit
      - button "Duplicate CompleteAll1 1790056445875": Duplicate
      - button "Archive CompleteAll1 1790056445875": Archive
      - button "Delete CompleteAll1 1790056445875": Remove
    - listitem:
      - paragraph: CompleteAll2 1790056445875
      - text: Health
      - paragraph: 🔥 1 day streak
      - progressbar "CompleteAll2 1790056445875 weekly progress"
      - text: 🎉 Weekly goal reached
      - paragraph: Notes 2
      - button "Done today" [disabled]
      - button "Freeze CompleteAll2 1790056445875 for today" [disabled]: 🧊 Freeze
      - button "Edit CompleteAll2 1790056445875": Edit
      - button "Duplicate CompleteAll2 1790056445875": Duplicate
      - button "Archive CompleteAll2 1790056445875": Archive
      - button "Delete CompleteAll2 1790056445875": Remove
- alert
```

# Test source

```ts
  1182 |    * TC65: Navigation - navigate to View stats page
  1183 |    */
  1184 |   test('TC65 - Navigation - navigate to View stats page', async ({ page }) => {
  1185 |     await page.goto('/');
  1186 |     await page.getByRole('link', { name: 'View stats' }).click();
  1187 |     await expect(page).toHaveURL('/stats');
  1188 |   });
  1189 | 
  1190 |   /**
  1191 |    * TC66: Navigation - navigate to Archive page
  1192 |    */
  1193 |   test('TC66 - Navigation - navigate to Archive page', async ({ page }) => {
  1194 |     await page.goto('/');
  1195 |     await page.getByRole('link', { name: 'Archive' }).click();
  1196 |     await expect(page).toHaveURL('/archive');
  1197 |   });
  1198 | 
  1199 |   /**
  1200 |    * TC67: Home - page loads and displays header and date
  1201 |    */
  1202 |   test('TC67 - Home - page loads and displays header and date', async ({ page }) => {
  1203 |     await page.goto('/');
  1204 |     await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
  1205 |     await expect(page.getByText('Build small daily habits, one day at a time.')).toBeVisible();
  1206 |     await expect(page.locator('p.text-xs.text-zinc-400').first()).toBeVisible();
  1207 |   });
  1208 | 
  1209 |   /**
  1210 |    * TC68: HabitForm - can create a new habit successfully
  1211 |    */
  1212 |   test('TC68 - HabitForm - can create a new habit successfully', async ({ page }) => {
  1213 |     await page.goto('/');
  1214 |     const habitName = `Test Habit ${Date.now()}`;
  1215 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
  1216 |     await page.getByRole('combobox', { name: 'Habit category' }).selectOption('General');
  1217 |     await page.getByRole('combobox', { name: 'Times per week' }).selectOption('3');
  1218 |     await page.getByRole('textbox', { name: 'Notes (optional)' }).fill('Test notes');
  1219 |     await page.getByRole('button', { name: 'Add habit' }).click();
  1220 |     const habitItem = page.getByRole('listitem').filter({ hasText: habitName });
  1221 |     await expect(habitItem).toBeVisible();
  1222 |   });
  1223 | 
  1224 |   /**
  1225 |    * TC69: Home - complete a habit and verify completed state
  1226 |    */
  1227 |   test('TC69 - Home - complete a habit and verify completed state', async ({ page }) => {
  1228 |     await page.goto('/');
  1229 |     const habitName = `CompleteTest-${Date.now()}`;
  1230 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
  1231 |     await page.getByRole('combobox', { name: 'Habit category' }).selectOption('General');
  1232 |     await page.getByRole('combobox', { name: 'Times per week' }).selectOption('3');
  1233 |     await page.getByRole('button', { name: 'Add habit' }).click();
  1234 |     const habitItem = page.getByRole('listitem').filter({ hasText: habitName });
  1235 |     await expect(habitItem).toBeVisible();
  1236 |     const completeButton = habitItem.getByRole('button', { name: 'Mark done' });
  1237 |     await completeButton.click();
  1238 |     const completedButton = habitItem.getByRole('button', { name: 'Done today' });
  1239 |     await expect(completedButton).toBeVisible();
  1240 |   });
  1241 | 
  1242 |   /**
  1243 |    * TC70: Home - navigation links go to correct routes
  1244 |    */
  1245 |   test('TC70 - Home - navigation links go to correct routes', async ({ page }) => {
  1246 |     await page.goto('/');
  1247 |     const historyLink = page.getByRole('link', { name: 'History' });
  1248 |     await expect(historyLink).toHaveAttribute('href', '/history');
  1249 |     const statsLink = page.getByRole('link', { name: 'View stats' });
  1250 |     await expect(statsLink).toHaveAttribute('href', '/stats');
  1251 |     const archiveLink = page.getByRole('link', { name: 'Archive' });
  1252 |     await expect(archiveLink).toHaveAttribute('href', '/archive');
  1253 |   });
  1254 | 
  1255 |   /**
  1256 |    * TC71: Home - search filters habits by name
  1257 |    */
  1258 |   test('TC71 - Home - search filters habits by name', async ({ page }) => {
  1259 |     await page.goto('/');
  1260 |     const uniqueSearch = `unique-search-${Date.now()}`;
  1261 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(uniqueSearch);
  1262 |     await page.getByRole('combobox', { name: 'Habit category' }).selectOption('General');
  1263 |     await page.getByRole('combobox', { name: 'Times per week' }).selectOption('3');
  1264 |     await page.getByRole('button', { name: 'Add habit' }).click();
  1265 |     await expect(page.getByRole('listitem').filter({ hasText: uniqueSearch })).toBeVisible();
  1266 |     await page.getByLabel('Search habits by name').fill(uniqueSearch);
  1267 |     const filteredItem = page.getByRole('listitem').filter({ hasText: uniqueSearch });
  1268 |     await expect(filteredItem).toBeVisible();
  1269 |   });
  1270 | 
  1271 |   /**
  1272 |    * TC72: Home - sort habits by different criteria
  1273 |    */
  1274 |   test('TC72 - Home - sort habits by different criteria', async ({ page }) => {
  1275 |     await page.goto('/');
  1276 |     const habitNameA = `AAA-${Date.now()}`;
  1277 |     const habitNameZ = `ZZZ-${Date.now()}`;
  1278 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(habitNameA);
  1279 |     await page.getByRole('combobox', { name: 'Habit category' }).selectOption('General');
  1280 |     await page.getByRole('combobox', { name: 'Times per week' }).selectOption('3');
  1281 |     await page.getByRole('button', { name: 'Add habit' }).click();
> 1282 |     await expect(page.getByRole('listitem').filter({ hasText: habitNameA })).toBeVisible();
       |                                                                              ^ Error: expect(locator).toBeVisible() failed
  1283 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(habitNameZ);
  1284 |     await page.getByRole('combobox', { name: 'Habit category' }).selectOption('Health');
  1285 |     await page.getByRole('combobox', { name: 'Times per week' }).selectOption('5');
  1286 |     await page.getByRole('button', { name: 'Add habit' }).click();
  1287 |     await expect(page.getByRole('listitem').filter({ hasText: habitNameZ })).toBeVisible();
  1288 |     await page.getByLabel('Sort habits by').selectOption('name');
  1289 |     await expect(page.getByRole('listitem').filter({ hasText: habitNameA })).toBeVisible();
  1290 |     await expect(page.getByRole('listitem').filter({ hasText: habitNameZ })).toBeVisible();
  1291 |     await page.getByLabel('Sort habits by').selectOption('streak');
  1292 |     await page.getByLabel('Sort habits by').selectOption('category');
  1293 |     await page.getByLabel('Sort habits by').selectOption('target_per_week');
  1294 |   });
  1295 | 
  1296 |   /**
  1297 |    * TC73: Home - filter habits by category
  1298 |    */
  1299 |   test('TC73 - Home - filter habits by category', async ({ page }) => {
  1300 |     await page.goto('/');
  1301 |     const habitName = `CategoryTest-${Date.now()}`;
  1302 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
  1303 |     await page.getByRole('combobox', { name: 'Habit category' }).selectOption('Health');
  1304 |     await page.getByRole('combobox', { name: 'Times per week' }).selectOption('3');
  1305 |     await page.getByRole('button', { name: 'Add habit' }).click();
  1306 |     await expect(page.getByRole('listitem').filter({ hasText: habitName })).toBeVisible();
  1307 |     await page.getByLabel('Filter by category').selectOption('Health');
  1308 |     const filteredItem = page.getByRole('listitem').filter({ hasText: habitName });
  1309 |     await expect(filteredItem).toBeVisible();
  1310 |   });
  1311 | 
  1312 |   /**
  1313 |    * TC74: Home - toggle show archived habits
  1314 |    */
  1315 |   test('TC74 - Home - toggle show archived habits', async ({ page }) => {
  1316 |     await page.goto('/');
  1317 |     const habitName = `ArchiveTest-${Date.now()}`;
  1318 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
  1319 |     await page.getByRole('combobox', { name: 'Habit category' }).selectOption('General');
  1320 |     await page.getByRole('combobox', { name: 'Times per week' }).selectOption('3');
  1321 |     await page.getByRole('button', { name: 'Add habit' }).click();
  1322 |     const habitItem = page.getByRole('listitem').filter({ hasText: habitName });
  1323 |     await expect(habitItem).toBeVisible();
  1324 |     await habitItem.getByRole('button', { name: `Archive ${habitName}` }).click();
  1325 |     await expect(page.getByRole('listitem').filter({ hasText: habitName })).toHaveCount(0);
  1326 |     await page.getByLabel('Show archived').check();
  1327 |     const archivedItem = page.getByRole('listitem').filter({ hasText: habitName });
  1328 |     await expect(archivedItem).toBeVisible();
  1329 |   });
  1330 | 
  1331 |   /**
  1332 |    * TC75: Home - clear all filters resets search, category, archived, and sort
  1333 |    */
  1334 |   test('TC75 - Home - clear all filters resets search, category, archived, and sort', async ({ page }) => {
  1335 |     await page.goto('/');
  1336 |     await page.getByLabel('Search habits by name').fill('test');
  1337 |     await page.getByLabel('Filter by category').selectOption('Health');
  1338 |     await page.getByLabel('Show archived').check();
  1339 |     await page.getByLabel('Sort habits by').selectOption('streak');
  1340 |     await page.getByRole('button', { name: 'Clear filters' }).click();
  1341 |     await expect(page.getByLabel('Search habits by name')).toHaveValue('');
  1342 |     await expect(page.getByLabel('Filter by category')).toHaveValue('');
  1343 |     await expect(page.getByLabel('Show archived')).not.toBeChecked();
  1344 |     await expect(page.getByLabel('Sort habits by')).toHaveValue('name');
  1345 |   });
  1346 | 
  1347 |   /**
  1348 |    * TC76: Home - page loads with unconditional elements
  1349 |    */
  1350 |   test('TC76 - Home - page loads with unconditional elements', async ({ page }) => {
  1351 |     await page.goto('/');
  1352 |     await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
  1353 |     await expect(page.getByText('Build small daily habits, one day at a time.')).toBeVisible();
  1354 |     await expect(page.getByLabel('Search habits by name')).toBeVisible();
  1355 |     await expect(page.getByLabel('Filter by category')).toBeVisible();
  1356 |     await expect(page.getByLabel('Show archived')).toBeVisible();
  1357 |     await expect(page.getByLabel('Sort habits by')).toBeVisible();
  1358 |     await expect(page.getByRole('link', { name: 'History' })).toBeVisible();
  1359 |     await expect(page.getByRole('link', { name: 'View stats' })).toBeVisible();
  1360 |     await expect(page.getByRole('link', { name: 'Archive' })).toBeVisible();
  1361 |   });
  1362 | 
  1363 |   /**
  1364 |    * TC77: Home - clicking clear filters resets all filters to default
  1365 |    */
  1366 |   test('TC77 - Home - clicking clear filters resets all filters to default', async ({ page }) => {
  1367 |     await page.goto('/');
  1368 |     await page.getByLabel('Search habits by name').fill('abc');
  1369 |     await page.getByLabel('Filter by category').selectOption('');
  1370 |     await page.getByLabel('Show archived').check();
  1371 |     await page.getByLabel('Sort habits by').selectOption('streak');
  1372 |     await expect(page.getByRole('button', { name: 'Clear filters' })).toBeVisible();
  1373 |     await page.getByRole('button', { name: 'Clear filters' }).click();
  1374 |     await expect(page.getByLabel('Search habits by name')).toHaveValue('');
  1375 |     await expect(page.getByLabel('Filter by category')).toHaveValue('');
  1376 |     await expect(page.getByLabel('Show archived')).not.toBeChecked();
  1377 |     await expect(page.getByLabel('Sort habits by')).toHaveValue('name');
  1378 |   });
  1379 | 
  1380 |   /**
  1381 |    * TC78: Home - shows completion progress when habits exist
  1382 |    */
```