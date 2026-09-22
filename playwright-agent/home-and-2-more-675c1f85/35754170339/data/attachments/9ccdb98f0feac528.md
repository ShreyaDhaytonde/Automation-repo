# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> Home >> TC58 - HabitList - toggles archive state of a habit
- Location: tests/home.spec.ts:1106:7

# Error details

```
ReferenceError: habitCardLocator is not defined
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - main [ref=e3]:
    - generic [ref=e4]:
      - generic [ref=e5]:
        - heading "Habit Tracker" [level=1] [ref=e6]
        - paragraph [ref=e7]: Build small daily habits, one day at a time.
        - paragraph [ref=e8]: Tuesday, September 22
      - generic [ref=e9]:
        - link "History" [ref=e10] [cursor=pointer]:
          - /url: /history
        - link "View stats" [ref=e11] [cursor=pointer]:
          - /url: /stats
        - link "Archive" [ref=e12] [cursor=pointer]:
          - /url: /archive
        - button "Switch to dark mode" [ref=e13]: 🌙 Dark
        - button "Logout" [ref=e14]
    - generic [ref=e16]:
      - textbox "New habit name" [ref=e17]:
        - /placeholder: e.g. Drink more water
      - combobox "Habit category" [ref=e18]:
        - option "General" [selected]
        - option "Health"
        - option "Work"
        - option "Personal"
        - option "Learning"
      - combobox "Times per week" [ref=e19]:
        - option "1x / week"
        - option "2x / week"
        - option "3x / week" [selected]
        - option "4x / week"
        - option "5x / week"
        - option "6x / week"
        - option "7x / week"
      - textbox "Notes (optional)" [ref=e20]
      - button "Add habit" [disabled] [ref=e21]
    - generic [ref=e22]:
      - generic [ref=e23]: Search habits by name
      - searchbox "Search habits by name" [ref=e24]
      - generic [ref=e25]: Sort by
      - combobox "Sort habits by" [ref=e26]:
        - option "Name (A-Z)" [selected]
        - option "Streak (highest first)"
        - option "Category"
        - option "Priority (highest first)"
        - option "Weekly target (highest first)"
    - generic [ref=e27]:
      - generic [ref=e28]:
        - generic [ref=e29]: Filter by category
        - combobox "Filter by category" [ref=e30]:
          - option "All" [selected]
          - option "General"
          - option "Health"
          - option "Work"
          - option "Personal"
          - option "Learning"
      - generic [ref=e31]:
        - generic [ref=e32]: Filter by priority
        - combobox "Filter by priority" [ref=e33]:
          - option "All" [selected]
          - option "Low"
          - option "Medium"
          - option "High"
      - generic [ref=e34]:
        - checkbox "Show archived" [ref=e35]
        - text: Show archived
      - generic [ref=e36]:
        - button "Complete all for today (0)" [disabled] [ref=e37]
        - button "Export JSON" [disabled] [ref=e38]
        - button "Export CSV" [disabled] [ref=e39]
    - paragraph [ref=e40]: Loading habits…
  - alert [ref=e41]
```

# Test source

```ts
  1013 |   /**
  1014 |    * TC53: Home - page loads and displays header and controls
  1015 |    */
  1016 |   test('TC53 - Home - page loads and displays header and controls', async ({ page }) => {
  1017 |     await page.goto('/');
  1018 |     await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
  1019 |     await expect(page.getByText('Build small daily habits, one day at a time.')).toBeVisible();
  1020 |     await expect(page.locator('p.text-xs.text-zinc-400').first()).toBeVisible();
  1021 |     await expect(page.getByRole('link', { name: 'History' })).toBeVisible();
  1022 |     await expect(page.getByRole('link', { name: 'View stats' })).toBeVisible();
  1023 |     await expect(page.getByRole('link', { name: 'Archive' })).toBeVisible();
  1024 |     await expect(page.getByRole('button', { name: 'Switch to dark mode' })).toBeVisible();
  1025 |     await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
  1026 |     await expect(habitSearchBox(page)).toBeVisible();
  1027 |     await expect(sortByControl(page)).toBeVisible();
  1028 |     await expect(categoryFilterControl(page)).toBeVisible();
  1029 |     await expect(showArchivedToggle(page)).toBeVisible();
  1030 |     await expect(page.getByRole('button', { name: /^Complete all for today/ })).toBeVisible();
  1031 |     await expect(page.getByRole('button', { name: 'Export JSON' })).toBeVisible();
  1032 |     await expect(page.getByRole('button', { name: 'Export CSV' })).toBeVisible();
  1033 |     await expect(submitAddHabitButton(page)).toBeVisible();
  1034 |   });
  1035 | 
  1036 |   /**
  1037 |    * TC54: HabitList - deletes a habit after confirmation
  1038 |    */
  1039 |   test('TC54 - HabitList - deletes a habit after confirmation', async ({ page }) => {
  1040 |     await page.goto('/');
  1041 |     const habitName = `Delete Habit ${Date.now()}`;
  1042 |     await newHabitNameField(page).fill(habitName);
  1043 |     await newHabitCategoryField(page).selectOption('General');
  1044 |     await newHabitTargetField(page).selectOption('3');
  1045 |     await submitAddHabitButton(page).click();
  1046 |     const habitCard = habitCardLocator(page, habitName);
  1047 |     await expect(habitCard).toBeVisible();
  1048 |     page.on('dialog', (dialog) => dialog.accept());
  1049 |     await habitCard.getByRole('button', { name: `Delete ${habitName}` }).click();
  1050 |     await expect(habitCard).toHaveCount(0);
  1051 |   });
  1052 | 
  1053 |   /**
  1054 |    * TC55: HabitList - edits a habit and verifies updated values
  1055 |    */
  1056 |   test('TC55 - HabitList - edits a habit and verifies updated values', async ({ page }) => {
  1057 |     await page.goto('/');
  1058 |     const habitName = `Edit Habit ${Date.now()}`;
  1059 |     await page.getByLabel('New habit name').fill(habitName);
  1060 |     await page.getByLabel('Habit category').selectOption('General');
  1061 |     await page.getByLabel('Times per week').selectOption('3');
  1062 |     await submitAddHabitButton(page).click();
  1063 |     const habitCard = habitCardLocator(page, habitName);
  1064 |     await expect(habitCard).toBeVisible();
  1065 |     await habitCard.getByRole('button', { name: `Edit ${habitName}` }).click();
  1066 |     const nameInput = page.getByLabel(`Edit name for ${habitName}`);
  1067 |     await expect(nameInput).toHaveValue(habitName);
  1068 |     const newName = `${habitName} Updated`;
  1069 |     await nameInput.fill(newName);
  1070 |     await habitCard.getByRole('button', { name: 'Save' }).click();
  1071 |     await expect(habitCardLocator(page, newName)).toBeVisible();
  1072 |   });
  1073 | 
  1074 |   /**
  1075 |    * TC56: Home - completes all pending habits for today
  1076 |    */
  1077 |   test('TC56 - Home - completes all pending habits for today', async ({ page }) => {
  1078 |     await page.goto('/');
  1079 |     const completeAllButton = page.getByRole('button', { name: /^Complete all for today/ });
  1080 |     await expect(completeAllButton).toBeEnabled();
  1081 |     await completeAllButton.click();
  1082 |     await expect(completeAllButton).not.toHaveText(/Completing…/, { timeout: 15000 });
  1083 |   });
  1084 | 
  1085 |   /**
  1086 |    * TC57: HabitList - skips and unskips a habit
  1087 |    */
  1088 |   test('TC57 - HabitList - skips and unskips a habit', async ({ page }) => {
  1089 |     await page.goto('/');
  1090 |     const habitName = `Skip Habit ${Date.now()}`;
  1091 |     await page.getByLabel('New habit name').fill(habitName);
  1092 |     await page.getByLabel('Habit category').selectOption('General');
  1093 |     await page.getByLabel('Times per week').selectOption('3');
  1094 |     await submitAddHabitButton(page).click();
  1095 |     const habitCard = habitCardLocator(page, habitName);
  1096 |     await expect(habitCard).toBeVisible();
  1097 |     await habitCard.getByRole('button', { name: `Skip ${habitName}` }).click();
  1098 |     await expect(habitCard.getByRole('button', { name: `Skipped ${habitName}` })).toBeVisible();
  1099 |     await habitCard.getByRole('button', { name: `Unskip ${habitName}` }).click();
  1100 |     await expect(habitCard.getByRole('button', { name: `Skip ${habitName}` })).toBeVisible();
  1101 |   });
  1102 | 
  1103 |   /**
  1104 |    * TC58: HabitList - toggles archive state of a habit
  1105 |    */
  1106 |   test('TC58 - HabitList - toggles archive state of a habit', async ({ page }) => {
  1107 |     await page.goto('/');
  1108 |     const habitName = `Archive Habit ${Date.now()}`;
  1109 |     await page.getByLabel('New habit name').fill(habitName);
  1110 |     await page.getByLabel('Habit category').selectOption('General');
  1111 |     await page.getByLabel('Times per week').selectOption('3');
  1112 |     await submitAddHabitButton(page).click();
> 1113 |     const habitCard = habitCardLocator(page, habitName);
       |                       ^ ReferenceError: habitCardLocator is not defined
  1114 |     await expect(habitCard).toBeVisible();
  1115 |     await habitCard.getByRole('checkbox', { name: `Archive ${habitName}` }).check();
  1116 |     await expect(habitCardLocator(page, habitName)).toHaveCount(0);
  1117 |     await showArchivedToggle(page).check();
  1118 |     const archivedHabitCard = habitCardLocator(page, habitName);
  1119 |     await expect(archivedHabitCard).toBeVisible();
  1120 |     await archivedHabitCard.getByRole('checkbox', { name: `Unarchive ${habitName}` }).uncheck();
  1121 |     await expect(habitCardLocator(page, habitName)).toBeVisible();
  1122 |   });
  1123 | 
  1124 |   /**
  1125 |    * TC59: HabitList - duplicates a habit
  1126 |    */
  1127 |   test('TC59 - HabitList - duplicates a habit', async ({ page }) => {
  1128 |     await page.goto('/');
  1129 |     const habitName = `Duplicate Habit ${Date.now()}`;
  1130 |     await newHabitNameField(page).fill(habitName);
  1131 |     await newHabitCategoryField(page).selectOption('General');
  1132 |     await newHabitTargetField(page).selectOption('3');
  1133 |     await submitAddHabitButton(page).click();
  1134 |     const habitCard = habitCardLocator(page, habitName);
  1135 |     await expect(habitCard).toBeVisible();
  1136 |     await habitCard.getByRole('button', { name: `Duplicate ${habitName}` }).click();
  1137 |     const duplicateCard = habitCardLocator(page, `${habitName} (copy)`);
  1138 |     await expect(duplicateCard).toBeVisible();
  1139 |   });
  1140 | 
  1141 |   /**
  1142 |    * TC60: Home - clears all filters and resets controls
  1143 |    */
  1144 |   test('TC60 - Home - clears all filters and resets controls', async ({ page }) => {
  1145 |     await page.goto('/');
  1146 |     await categoryFilterControl(page).selectOption('General');
  1147 |     await showArchivedToggle(page).check();
  1148 |     await habitSearchBox(page).fill('test');
  1149 |     await sortByControl(page).selectOption('streak');
  1150 |     await page.getByRole('button', { name: 'Clear filters' }).click();
  1151 |     await expect(categoryFilterControl(page)).toHaveValue('');
  1152 |     await expect(showArchivedToggle(page)).not.toBeChecked();
  1153 |     await expect(habitSearchBox(page)).toHaveValue('');
  1154 |     await expect(sortByControl(page)).toHaveValue('name');
  1155 |   });
  1156 | 
  1157 |   /**
  1158 |    * TC61: HabitCard - edits a habit\\\'s name, category, target per week, and notes successfully
  1159 |    */
  1160 |   test('TC61 - HabitCard - edits a habit\\\\\\\'s name, category, target per week, and notes successfully', async ({ page }) => {
  1161 |     await page.goto('/');
  1162 |     const originalName = `EditTest ${Date.now()}`;
  1163 |     const newName = `${originalName} Updated`;
  1164 |     await newHabitNameField(page).fill(originalName);
  1165 |     await submitAddHabitButton(page).click();
  1166 |     const habitCard = habitCardLocator(page, originalName);
  1167 |     await expect(habitCard).toBeVisible();
  1168 |     await habitCard.getByRole('button', { name: `Edit ${originalName}` }).click();
  1169 |     const nameInput = page.getByLabel(`Edit name for ${originalName}`);
  1170 |     await expect(nameInput).toHaveValue(originalName);
  1171 |     await nameInput.fill(newName);
  1172 |     await page.getByLabel(`Edit category for ${originalName}`).selectOption('Health');
  1173 |     await page.getByLabel(`Edit times per week for ${originalName}`).selectOption('5');
  1174 |     await page.getByLabel(`Edit notes for ${originalName}`).fill('Updated notes');
  1175 |     await habitCard.getByRole('button', { name: 'Save' }).click();
  1176 |     const updatedHabitCard = habitCardLocator(page, newName);
  1177 |     await expect(updatedHabitCard).toBeVisible();
  1178 |   });
  1179 | 
  1180 |   /**
  1181 |    * TC62: HabitCard - edits an existing habit\\\\\\\'s name, category, target per week, and notes
  1182 |    */
  1183 |   test('TC62 - HabitCard - edits an existing habit\\\\\\\\\\\\\\\'s name, category, target per week, and notes', async ({ page }) => {
  1184 |     await page.goto('/');
  1185 |     const originalName = `Original Habit ${Date.now()}`;
  1186 |     const updatedName = `Updated Habit ${Date.now()}`;
  1187 |     await page.getByLabel('New habit name').fill(originalName);
  1188 |     await submitAddHabitButton(page).click();
  1189 |     const habitCard = habitCardLocator(page, originalName);
  1190 |     await expect(habitCard).toBeVisible();
  1191 |     await habitCard.getByRole('button', { name: `Edit` }).click();
  1192 |     const nameInput = page.getByLabel(`Edit name for ${originalName}`);
  1193 |     await expect(nameInput).toHaveValue(originalName);
  1194 |     await nameInput.fill(updatedName);
  1195 |     await page.getByLabel(`Edit category for ${originalName}`).selectOption('Health');
  1196 |     await page.getByLabel(`Edit times per week for ${originalName}`).selectOption('3');
  1197 |     await page.getByLabel(`Edit notes for ${originalName}`).fill('Updated notes');
  1198 |     await page.getByRole('button', { name: 'Save' }).click();
  1199 |     await expect(habitCardLocator(page, updatedName)).toBeVisible();
  1200 |   });
  1201 | 
  1202 |   /**
  1203 |    * TC63: HabitList - complete a habit
  1204 |    */
  1205 |   test('TC63 - HabitList - complete a habit', async ({ page }) => {
  1206 |     await page.goto('/');
  1207 |     const habitName = `Complete Habit ${Date.now()}`;
  1208 |     await newHabitNameField(page).fill(habitName);
  1209 |     await newHabitCategoryField(page).selectOption('Health');
  1210 |     await newHabitTargetField(page).selectOption('2');
  1211 |     await newHabitNotesField(page).fill('Complete test');
  1212 |     await submitAddHabitButton(page).click();
  1213 |     const habitCard = habitCardLocator(page, habitName);
```