# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> Home >> TC60 - Home - clears all filters and resets controls
- Location: tests/home.spec.ts:1107:7

# Error details

```
ReferenceError: categoryFilterControl is not defined
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
        - option "3x / week"
        - option "4x / week"
        - option "5x / week"
        - option "6x / week"
        - option "7x / week" [selected]
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
  1009 |     const habitCard = habitCardLocator(page, habitName);
  1010 |     await expect(habitCard).toBeVisible();
  1011 |     page.on('dialog', (dialog) => dialog.accept());
  1012 |     await habitCard.getByRole('button', { name: `Delete ${habitName}` }).click();
  1013 |     await expect(habitCard).toHaveCount(0);
  1014 |   });
  1015 | 
  1016 |   /**
  1017 |    * TC55: HabitList - edits a habit and verifies updated values
  1018 |    */
  1019 |   test('TC55 - HabitList - edits a habit and verifies updated values', async ({ page }) => {
  1020 |     await page.goto('/');
  1021 |     const habitName = `Edit Habit ${Date.now()}`;
  1022 |     await page.getByLabel('New habit name').fill(habitName);
  1023 |     await page.getByLabel('Habit category').selectOption('General');
  1024 |     await page.getByLabel('Times per week').selectOption('3');
  1025 |     await submitAddHabitButton(page).click();
  1026 |     const habitCard = habitCardLocator(page, habitName);
  1027 |     await expect(habitCard).toBeVisible();
  1028 |     await habitCard.getByRole('button', { name: `Edit ${habitName}` }).click();
  1029 |     const nameInput = page.getByLabel(`Edit name for ${habitName}`);
  1030 |     await expect(nameInput).toHaveValue(habitName);
  1031 |     const newName = `${habitName} Updated`;
  1032 |     await nameInput.fill(newName);
  1033 |     await habitCard.getByRole('button', { name: 'Save' }).click();
  1034 |     await expect(habitCardLocator(page, newName)).toBeVisible();
  1035 |   });
  1036 | 
  1037 |   /**
  1038 |    * TC56: Home - completes all pending habits for today
  1039 |    */
  1040 |   test('TC56 - Home - completes all pending habits for today', async ({ page }) => {
  1041 |     await page.goto('/');
  1042 |     const completeAllButton = page.getByRole('button', { name: /^Complete all for today/ });
  1043 |     await expect(completeAllButton).toBeEnabled();
  1044 |     await completeAllButton.click();
  1045 |     await expect(completeAllButton).not.toHaveText(/Completing…/, { timeout: 15000 });
  1046 |   });
  1047 | 
  1048 |   /**
  1049 |    * TC57: HabitList - skips and unskips a habit
  1050 |    */
  1051 |   test('TC57 - HabitList - skips and unskips a habit', async ({ page }) => {
  1052 |     await page.goto('/');
  1053 |     const habitName = `Skip Habit ${Date.now()}`;
  1054 |     await page.getByLabel('New habit name').fill(habitName);
  1055 |     await page.getByLabel('Habit category').selectOption('General');
  1056 |     await page.getByLabel('Times per week').selectOption('3');
  1057 |     await submitAddHabitButton(page).click();
  1058 |     const habitCard = habitCardLocator(page, habitName);
  1059 |     await expect(habitCard).toBeVisible();
  1060 |     await habitCard.getByRole('button', { name: `Skip ${habitName}` }).click();
  1061 |     await expect(habitCard.getByRole('button', { name: `Skipped ${habitName}` })).toBeVisible();
  1062 |     await habitCard.getByRole('button', { name: `Unskip ${habitName}` }).click();
  1063 |     await expect(habitCard.getByRole('button', { name: `Skip ${habitName}` })).toBeVisible();
  1064 |   });
  1065 | 
  1066 |   /**
  1067 |    * TC58: HabitList - toggles archive state of a habit
  1068 |    */
  1069 |   test('TC58 - HabitList - toggles archive state of a habit', async ({ page }) => {
  1070 |     await page.goto('/');
  1071 |     const habitName = `Archive Habit ${Date.now()}`;
  1072 |     await page.getByLabel('New habit name').fill(habitName);
  1073 |     await page.getByLabel('Habit category').selectOption('General');
  1074 |     await page.getByLabel('Times per week').selectOption('3');
  1075 |     await submitAddHabitButton(page).click();
  1076 |     const habitCard = habitCardLocator(page, habitName);
  1077 |     await expect(habitCard).toBeVisible();
  1078 |     await habitCard.getByRole('checkbox', { name: `Archive ${habitName}` }).check();
  1079 |     await expect(habitCardLocator(page, habitName)).toHaveCount(0);
  1080 |     await showArchivedToggle(page).check();
  1081 |     const archivedHabitCard = habitCardLocator(page, habitName);
  1082 |     await expect(archivedHabitCard).toBeVisible();
  1083 |     await archivedHabitCard.getByRole('checkbox', { name: `Unarchive ${habitName}` }).uncheck();
  1084 |     await expect(habitCardLocator(page, habitName)).toBeVisible();
  1085 |   });
  1086 | 
  1087 |   /**
  1088 |    * TC59: HabitList - duplicates a habit
  1089 |    */
  1090 |   test('TC59 - HabitList - duplicates a habit', async ({ page }) => {
  1091 |     await page.goto('/');
  1092 |     const habitName = `Duplicate Habit ${Date.now()}`;
  1093 |     await newHabitNameField(page).fill(habitName);
  1094 |     await newHabitCategoryField(page).selectOption('General');
  1095 |     await newHabitTargetField(page).selectOption('3');
  1096 |     await submitAddHabitButton(page).click();
  1097 |     const habitCard = habitCardLocator(page, habitName);
  1098 |     await expect(habitCard).toBeVisible();
  1099 |     await habitCard.getByRole('button', { name: `Duplicate ${habitName}` }).click();
  1100 |     const duplicateCard = habitCardLocator(page, `${habitName} (copy)`);
  1101 |     await expect(duplicateCard).toBeVisible();
  1102 |   });
  1103 | 
  1104 |   /**
  1105 |    * TC60: Home - clears all filters and resets controls
  1106 |    */
  1107 |   test('TC60 - Home - clears all filters and resets controls', async ({ page }) => {
  1108 |     await page.goto('/');
> 1109 |     await categoryFilterControl(page).selectOption('General');
       |     ^ ReferenceError: categoryFilterControl is not defined
  1110 |     await showArchivedToggle(page).check();
  1111 |     await habitSearchBox(page).fill('test');
  1112 |     await sortByControl(page).selectOption('streak');
  1113 |     await page.getByRole('button', { name: 'Clear filters' }).click();
  1114 |     await expect(categoryFilterControl(page)).toHaveValue('');
  1115 |     await expect(showArchivedToggle(page)).not.toBeChecked();
  1116 |     await expect(habitSearchBox(page)).toHaveValue('');
  1117 |     await expect(sortByControl(page)).toHaveValue('name');
  1118 |   });
  1119 | 
  1120 |   /**
  1121 |    * TC61: HabitCard - edits a habit\\\'s name, category, target per week, and notes successfully
  1122 |    */
  1123 |   test('TC61 - HabitCard - edits a habit\\\\\\\'s name, category, target per week, and notes successfully', async ({ page }) => {
  1124 |     await page.goto('/');
  1125 |     const originalName = `EditTest ${Date.now()}`;
  1126 |     const newName = `${originalName} Updated`;
  1127 |     await newHabitNameField(page).fill(originalName);
  1128 |     await submitAddHabitButton(page).click();
  1129 |     const habitCard = habitCardLocator(page, originalName);
  1130 |     await expect(habitCard).toBeVisible();
  1131 |     await habitCard.getByRole('button', { name: `Edit ${originalName}` }).click();
  1132 |     const nameInput = page.getByLabel(`Edit name for ${originalName}`);
  1133 |     await expect(nameInput).toHaveValue(originalName);
  1134 |     await nameInput.fill(newName);
  1135 |     await page.getByLabel(`Edit category for ${originalName}`).selectOption('Health');
  1136 |     await page.getByLabel(`Edit times per week for ${originalName}`).selectOption('5');
  1137 |     await page.getByLabel(`Edit notes for ${originalName}`).fill('Updated notes');
  1138 |     await habitCard.getByRole('button', { name: 'Save' }).click();
  1139 |     const updatedHabitCard = habitCardLocator(page, newName);
  1140 |     await expect(updatedHabitCard).toBeVisible();
  1141 |   });
  1142 | 
  1143 |   /**
  1144 |    * TC62: HabitCard - edits an existing habit\\\\\\\'s name, category, target per week, and notes
  1145 |    */
  1146 |   test('TC62 - HabitCard - edits an existing habit\\\\\\\\\\\\\\\'s name, category, target per week, and notes', async ({ page }) => {
  1147 |     await page.goto('/');
  1148 |     const originalName = `Original Habit ${Date.now()}`;
  1149 |     const updatedName = `Updated Habit ${Date.now()}`;
  1150 |     await page.getByLabel('New habit name').fill(originalName);
  1151 |     await submitAddHabitButton(page).click();
  1152 |     const habitCard = habitCardLocator(page, originalName);
  1153 |     await expect(habitCard).toBeVisible();
  1154 |     await habitCard.getByRole('button', { name: `Edit` }).click();
  1155 |     const nameInput = page.getByLabel(`Edit name for ${originalName}`);
  1156 |     await expect(nameInput).toHaveValue(originalName);
  1157 |     await nameInput.fill(updatedName);
  1158 |     await page.getByLabel(`Edit category for ${originalName}`).selectOption('Health');
  1159 |     await page.getByLabel(`Edit times per week for ${originalName}`).selectOption('3');
  1160 |     await page.getByLabel(`Edit notes for ${originalName}`).fill('Updated notes');
  1161 |     await page.getByRole('button', { name: 'Save' }).click();
  1162 |     await expect(habitCardLocator(page, updatedName)).toBeVisible();
  1163 |   });
  1164 | 
  1165 |   /**
  1166 |    * TC63: HabitList - complete a habit
  1167 |    */
  1168 |   test('TC63 - HabitList - complete a habit', async ({ page }) => {
  1169 |     await page.goto('/');
  1170 |     const habitName = `Complete Habit ${Date.now()}`;
  1171 |     await newHabitNameField(page).fill(habitName);
  1172 |     await newHabitCategoryField(page).selectOption('Health');
  1173 |     await newHabitTargetField(page).selectOption('2');
  1174 |     await newHabitNotesField(page).fill('Complete test');
  1175 |     await submitAddHabitButton(page).click();
  1176 |     const habitCard = habitCardLocator(page, habitName);
  1177 |     await expect(habitCard).toBeVisible();
  1178 |     await habitCard.getByRole('button', { name: 'Mark done' }).click();
  1179 |     await expect(habitCard.getByRole('button', { name: 'Done today' })).toBeVisible();
  1180 |   });
  1181 | 
  1182 |   /**
  1183 |    * TC64: Complete all - complete all pending habits for today
  1184 |    */
  1185 |   test('TC64 - Complete all - complete all pending habits for today', async ({ page }) => {
  1186 |     await page.goto('/');
  1187 |     const habitName1 = `CompleteAll1 ${Date.now()}`;
  1188 |     const habitName2 = `CompleteAll2 ${Date.now()}`;
  1189 |     await newHabitNameField(page).fill(habitName1);
  1190 |     await newHabitCategoryField(page).selectOption('Health');
  1191 |     await newHabitTargetField(page).selectOption('1');
  1192 |     await newHabitNotesField(page).fill('Notes 1');
  1193 |     await submitAddHabitButton(page).click();
  1194 |     await expect(habitCardLocator(page, habitName1)).toBeVisible();
  1195 |     await newHabitNameField(page).fill(habitName2);
  1196 |     await newHabitCategoryField(page).selectOption('Health');
  1197 |     await newHabitTargetField(page).selectOption('1');
  1198 |     await newHabitNotesField(page).fill('Notes 2');
  1199 |     await submitAddHabitButton(page).click();
  1200 |     await expect(habitCardLocator(page, habitName2)).toBeVisible();
  1201 |     const completeAllButton = page.getByRole('button', { name: /^Complete all for today/ });
  1202 |     await expect(completeAllButton).toBeEnabled();
  1203 |     await completeAllButton.click();
  1204 |     await expect(habitCardLocator(page, habitName1).getByRole('button', { name: 'Done today' })).toBeVisible();
  1205 |     await expect(habitCardLocator(page, habitName2).getByRole('button', { name: 'Done today' })).toBeVisible();
  1206 |   });
  1207 | 
  1208 |   /**
  1209 |    * TC65: Filters - search habits by name
```