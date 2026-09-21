# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> Home >> TC61 - Home page - loads and renders main UI elements
- Location: tests/home.spec.ts:1111:7

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
  - paragraph: Monday, September 21
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
  - button "Complete all for today (0)" [disabled]
  - button "Export JSON" [disabled]
  - button "Export CSV" [disabled]
  - paragraph: No habits yet — add one above to get started.
- alert
```

# Test source

```ts
  1021 |   test('TC56 - Home - completes all incomplete habits for today with bulk action', async ({ page }) => {
  1022 |     await page.goto('/');
  1023 |     const habitName1 = `Bulk Complete Habit 1 ${Date.now()}`;
  1024 |     const habitName2 = `Bulk Complete Habit 2 ${Date.now()}`;
  1025 |     await page.getByLabel('New habit name').fill(habitName1);
  1026 |     const addButton1 = page.getByRole('button', { name: 'Add habit' });
  1027 |     await expect(addButton1).toBeEnabled();
  1028 |     await addButton1.click();
  1029 |     await expect(page.getByRole('listitem').filter({ hasText: habitName1 })).toBeVisible();
  1030 |     await page.getByLabel('New habit name').fill(habitName2);
  1031 |     const addButton2 = page.getByRole('button', { name: 'Add habit' });
  1032 |     await expect(addButton2).toBeEnabled();
  1033 |     await addButton2.click();
  1034 |     await expect(page.getByRole('listitem').filter({ hasText: habitName2 })).toBeVisible();
  1035 |     const completeAllButton = page.getByRole('button', { name: /Complete all for today/ });
  1036 |     await expect(completeAllButton).toBeEnabled();
  1037 |     await completeAllButton.click();
  1038 |     // The bulk action can settle before this assertion polls, so wait for the transient
  1039 |     // "Completing…" label to clear rather than pinning the exact instant. The button
  1040 |     // legitimately stays disabled afterward once nothing is left pending, so "enabled"
  1041 |     // is not a reliable end state to assert on either.
  1042 |     await expect(completeAllButton).not.toHaveText(/Completing…/, { timeout: 15_000 });
  1043 |   });
  1044 | 
  1045 |   /**
  1046 |    * TC57: Home - page loads with unconditional elements
  1047 |    */
  1048 |   test('TC57 - Home - page loads with unconditional elements', async ({ page }) => {
  1049 |     await page.goto('/');
  1050 |     await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
  1051 |     await expect(page.getByText('Build small daily habits, one day at a time.')).toBeVisible();
  1052 |     await expect(page.getByLabel('Search habits by name')).toBeVisible();
  1053 |     await expect(page.getByLabel('Filter by category')).toBeVisible();
  1054 |     await expect(page.getByLabel('Show archived')).toBeVisible();
  1055 |     await expect(page.getByLabel('Sort habits by')).toBeVisible();
  1056 |     await expect(page.getByRole('link', { name: 'History' })).toBeVisible();
  1057 |     await expect(page.getByRole('link', { name: 'View stats' })).toBeVisible();
  1058 |     await expect(page.getByRole('link', { name: 'Archive' })).toBeVisible();
  1059 |   });
  1060 | 
  1061 |   /**
  1062 |    * TC58: Home - clicking clear filters resets all filters to default
  1063 |    */
  1064 |   test('TC58 - Home - clicking clear filters resets all filters to default', async ({ page }) => {
  1065 |     await page.goto('/');
  1066 |     await page.getByLabel('Search habits by name').fill('abc');
  1067 |     await page.getByLabel('Filter by category').selectOption('');
  1068 |     await page.getByLabel('Show archived').check();
  1069 |     await page.getByLabel('Sort habits by').selectOption('streak');
  1070 |     await expect(page.getByRole('button', { name: 'Clear filters' })).toBeVisible();
  1071 |     await page.getByRole('button', { name: 'Clear filters' }).click();
  1072 |     await expect(page.getByLabel('Search habits by name')).toHaveValue('');
  1073 |     await expect(page.getByLabel('Filter by category')).toHaveValue('');
  1074 |     await expect(page.getByLabel('Show archived')).not.toBeChecked();
  1075 |     await expect(page.getByLabel('Sort habits by')).toHaveValue('name');
  1076 |   });
  1077 | 
  1078 |   /**
  1079 |    * TC59: Home - shows completion progress when habits exist
  1080 |    */
  1081 |   test('TC59 - Home - shows completion progress when habits exist', async ({ page }) => {
  1082 |     await page.goto('/');
  1083 |     const createName = `Test Habit Completion ${Date.now()}`;
  1084 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(createName);
  1085 |     await page.getByLabel('Habit category').selectOption('Other');
  1086 |     await page.getByLabel('Target per week').fill('3');
  1087 |     await page.getByRole('button', { name: 'Add habit' }).click();
  1088 |     await expect(page.getByText(/\d+\/\d+ done today/)).toBeVisible();
  1089 |   });
  1090 | 
  1091 |   /**
  1092 |    * TC60: Home - shows clear filters button when filters are active
  1093 |    */
  1094 |   test('TC60 - Home - shows clear filters button when filters are active', async ({ page }) => {
  1095 |     await page.goto('/');
  1096 |     await page.getByLabel('Search habits by name').fill('some text');
  1097 |     await expect(page.getByRole('button', { name: 'Clear filters' })).toBeVisible();
  1098 |     await page.getByLabel('Search habits by name').fill('');
  1099 |     await page.getByLabel('Filter by category').selectOption('Health');
  1100 |     await expect(page.getByRole('button', { name: 'Clear filters' })).toBeVisible();
  1101 |     await page.getByLabel('Show archived').check();
  1102 |     await expect(page.getByRole('button', { name: 'Clear filters' })).toBeVisible();
  1103 |     await page.getByLabel('Show archived').uncheck();
  1104 |     await page.getByLabel('Sort habits by').selectOption('streak');
  1105 |     await expect(page.getByRole('button', { name: 'Clear filters' })).toBeVisible();
  1106 |   });
  1107 | 
  1108 |   /**
  1109 |    * TC61: Home page - loads and renders main UI elements
  1110 |    */
  1111 |   test('TC61 - Home page - loads and renders main UI elements', async ({ page }) => {
  1112 |     await page.goto('/');
  1113 |     await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
  1114 |     await expect(page.getByLabel('Search habits by name')).toBeVisible();
  1115 |     await expect(page.getByLabel('Sort habits by')).toBeVisible();
  1116 |     await expect(page.getByLabel('Filter by category')).toBeVisible();
  1117 |     await expect(page.getByLabel('Show archived')).toBeVisible();
  1118 |     await expect(page.getByRole('button', { name: /^Complete all for today \(\d+\)$/ })).toBeVisible();
  1119 |     await expect(page.getByRole('button', { name: 'Export JSON' })).toBeVisible();
  1120 |     await expect(page.getByRole('button', { name: 'Export CSV' })).toBeVisible();
> 1121 |     await expect(page.getByRole('list')).toBeVisible();
       |                                          ^ Error: expect(locator).toBeVisible() failed
  1122 |   });
  1123 | 
  1124 |   /**
  1125 |    * TC62: HabitCard - duplicates a habit and appends the copy with \\\' (copy)\\\' suffix
  1126 |    */
  1127 |   test('TC62 - HabitCard - duplicates a habit and appends the copy with \\\\\\\' (copy)\\\\\\\' suffix', async ({ page }) => {
  1128 |     await page.goto('/');
  1129 |     // Create a habit first to duplicate
  1130 |     const habitName = `HabitToDuplicate ${Date.now()}`;
  1131 |     await page.getByLabel('New habit name').fill(habitName);
  1132 |     await page.getByLabel('Habit category').selectOption('Health');
  1133 |     await page.getByLabel('Times per week').selectOption('3');
  1134 |     await page.getByLabel('Notes (optional)').fill('Some notes');
  1135 |     await page.getByRole('button', { name: 'Add habit' }).click();
  1136 |     // Excludes " (copy)" so this stays pinned to the original once the
  1137 |     // duplicate exists -- its name is a substring of the copy's name, so an
  1138 |     // unqualified hasText filter would match both list items.
  1139 |     const copyNamePartial = ' (copy)';
  1140 |     const habitItem = page
  1141 |       .getByRole('listitem')
  1142 |       .filter({ hasText: habitName })
  1143 |       .filter({ hasNotText: copyNamePartial });
  1144 |     await expect(habitItem).toBeVisible();
  1145 |     // Click the duplicate button on that habit card
  1146 |     const duplicateButton = habitItem.getByRole('button', { name: `Duplicate ${habitName}` });
  1147 |     await duplicateButton.click();
  1148 |     // The duplicated habit should appear with the expected suffix (copy)
  1149 |     const duplicatedHabitItem = page.getByRole('listitem').filter({ hasText: `${habitName}${copyNamePartial}` });
  1150 |     await expect(duplicatedHabitItem).toBeVisible();
  1151 |     // Verify the category badge matches (visible text from the original category)
  1152 |     const categoryBadgeOriginal = habitItem.getByText('Health');
  1153 |     await expect(categoryBadgeOriginal).toBeVisible();
  1154 |     const categoryBadgeCopy = duplicatedHabitItem.getByText('Health');
  1155 |     await expect(categoryBadgeCopy).toBeVisible();
  1156 |   });
  1157 | 
  1158 |   /**
  1159 |    * TC63: Home page - initial render with unconditional elements
  1160 |    */
  1161 |   test('TC63 - Home page - initial render with unconditional elements', async ({ page }) => {
  1162 |     await page.goto("/");
  1163 |     await expect(page.getByRole("heading", { name: "Habit Tracker" })).toBeVisible();
  1164 |     await expect(page.getByLabel("Search habits by name")).toBeVisible();
  1165 |     await expect(page.getByRole("button", { name: /Complete all for today/ })).toBeVisible();
  1166 |     await expect(page.getByLabel("Sort habits by")).toBeVisible();
  1167 |     await expect(page.getByLabel("Filter by category")).toBeVisible();
  1168 |     await expect(page.getByLabel("Show archived")).toBeVisible();
  1169 |     await expect(page.getByRole("link", { name: "History" })).toBeVisible();
  1170 |     await expect(page.getByRole("link", { name: "View stats" })).toBeVisible();
  1171 |     await expect(page.getByRole("link", { name: "Archive" })).toBeVisible();
  1172 |     await expect(page.getByRole("button", { name: "Export JSON" })).toBeVisible();
  1173 |     await expect(page.getByRole("button", { name: "Export CSV" })).toBeVisible();
  1174 |   });
  1175 | 
  1176 | });
  1177 | 
```