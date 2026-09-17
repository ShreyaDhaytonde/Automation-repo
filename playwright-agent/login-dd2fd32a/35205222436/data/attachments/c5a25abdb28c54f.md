# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> Home >> TC10 - HabitCard - marks habit done today disables button
- Location: tests/home.spec.ts:172:7

# Error details

```
Error: expect(locator).toBeDisabled() failed

Locator: getByRole('listitem').filter({ hasText: 'Daily completion habit 1789637389127' }).getByRole('button', { name: 'Done today', exact: true })
Expected: disabled
Error: strict mode violation: getByRole('listitem').filter({ hasText: 'Daily completion habit 1789637389127' }).getByRole('button', { name: 'Done today', exact: true }) resolved to 2 elements:
    1) <button disabled class="rounded-full bg-emerald-600 px-4 py-1.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 disabled:opacity-50 disabled:hover:bg-emerald-600">Done today</button> aka getByRole('button', { name: 'Done today' }).first()
    2) <button disabled class="rounded-full bg-emerald-600 px-4 py-1.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 disabled:opacity-50 disabled:hover:bg-emerald-600">Done today</button> aka getByRole('button', { name: 'Done today' }).nth(1)

Call log:
  - Expect "toBeDisabled" getByRole('listitem').filter({ hasText: 'Daily completion habit 1789637389127' }).getByRole('button', { name: 'Done today', exact: true }) with timeout 10000ms
  - waiting for getByRole('listitem').filter({ hasText: 'Daily completion habit 1789637389127' }).getByRole('button', { name: 'Done today', exact: true })

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
        - link "View stats" [ref=e9] [cursor=pointer]:
          - /url: /stats
        - button "Switch to dark mode" [ref=e10]: 🌙 Dark
        - button "Logout" [ref=e11]
    - generic [ref=e13]:
      - textbox "New habit name" [ref=e14]:
        - /placeholder: e.g. Drink more water
      - combobox "Habit category" [ref=e15]:
        - option "General" [selected]
        - option "Health"
        - option "Work"
        - option "Personal"
        - option "Learning"
      - combobox "Times per week" [ref=e16]:
        - option "1x / week"
        - option "2x / week"
        - option "3x / week"
        - option "4x / week"
        - option "5x / week"
        - option "6x / week"
        - option "7x / week" [selected]
      - textbox "Notes (optional)" [ref=e17]
      - button "Add habit" [disabled] [ref=e18]
    - generic [ref=e19]:
      - generic [ref=e20]: Search habits by name
      - searchbox "Search habits by name" [ref=e21]
      - generic [ref=e22]: Sort by
      - combobox "Sort habits by" [ref=e23]:
        - option "Name (A-Z)" [selected]
        - option "Streak (highest first)"
        - option "Category"
        - option "Weekly target (highest first)"
    - generic [ref=e24]:
      - generic [ref=e25]:
        - generic [ref=e26]: Filter by category
        - combobox "Filter by category" [ref=e27]:
          - option "All" [selected]
          - option "General"
          - option "Health"
          - option "Work"
          - option "Personal"
          - option "Learning"
      - generic [ref=e28]:
        - checkbox "Show archived" [ref=e29]
        - text: Show archived
      - generic [ref=e30]:
        - button "Complete all for today (4)" [ref=e31]
        - button "Export JSON" [ref=e32]
        - button "Export CSV" [ref=e33]
    - list [ref=e34]:
      - listitem [ref=e35]:
        - generic [ref=e36]:
          - generic [ref=e37]:
            - paragraph [ref=e38]: Cancel edit habit 1789637385563
            - generic [ref=e39]: General
          - paragraph [ref=e40]: Start your streak today!
          - generic [ref=e41]:
            - progressbar "Cancel edit habit 1789637385563 weekly progress" [ref=e42]
            - generic [ref=e43]: 0/3 this week
        - generic [ref=e44]:
          - button "Mark done" [ref=e45]
          - button "Freeze Cancel edit habit 1789637385563 for today" [ref=e46]: 🧊 Freeze
          - button "Edit Cancel edit habit 1789637385563" [ref=e47]: Edit
          - button "Archive Cancel edit habit 1789637385563" [ref=e48]: Archive
          - button "Delete Cancel edit habit 1789637385563" [ref=e49]: Remove
      - listitem [ref=e50]:
        - generic [ref=e51]:
          - generic [ref=e52]:
            - paragraph [ref=e53]: Daily completion habit 1789637389127
            - generic [ref=e54]: General
          - paragraph [ref=e55]: 🔥 1 day streak
          - generic [ref=e56]:
            - progressbar "Daily completion habit 1789637389127 weekly progress" [ref=e57]
            - generic [ref=e59]: 1/7 this week
        - generic [ref=e60]:
          - button "Done today" [disabled] [ref=e61]
          - button "Freeze Daily completion habit 1789637389127 for today" [disabled] [ref=e62]: 🧊 Freeze
          - button "Edit Daily completion habit 1789637389127" [ref=e63]: Edit
          - button "Archive Daily completion habit 1789637389127" [ref=e64]: Archive
          - button "Delete Daily completion habit 1789637389127" [ref=e65]: Remove
      - listitem [ref=e66]:
        - generic [ref=e67]:
          - generic [ref=e68]:
            - paragraph [ref=e69]: Daily completion habit 1789637389127
            - generic [ref=e70]: General
          - paragraph [ref=e71]: 🔥 1 day streak
          - generic [ref=e72]:
            - progressbar "Daily completion habit 1789637389127 weekly progress" [ref=e73]
            - generic [ref=e75]: 1/7 this week
        - generic [ref=e76]:
          - button "Done today" [disabled] [ref=e77]
          - button "Freeze Daily completion habit 1789637389127 for today" [disabled] [ref=e78]: 🧊 Freeze
          - button "Edit Daily completion habit 1789637389127" [ref=e79]: Edit
          - button "Archive Daily completion habit 1789637389127" [ref=e80]: Archive
          - button "Delete Daily completion habit 1789637389127" [ref=e81]: Remove
      - listitem [ref=e82]:
        - generic [ref=e83]:
          - generic [ref=e84]:
            - paragraph [ref=e85]: Edit habit 1789637384046 updated
            - generic [ref=e86]: Health
            - status "Edit habit 1789637384046 updated is at risk of missing its weekly goal" [ref=e87]: ⏰ Due today
          - paragraph [ref=e88]: Start your streak today!
          - generic [ref=e89]:
            - progressbar "Edit habit 1789637384046 updated weekly progress" [ref=e90]
            - generic [ref=e91]: 0/5 this week
        - generic [ref=e92]:
          - button "Mark done" [ref=e93]
          - button "Freeze Edit habit 1789637384046 updated for today" [ref=e94]: 🧊 Freeze
          - button "Edit Edit habit 1789637384046 updated" [ref=e95]: Edit
          - button "Archive Edit habit 1789637384046 updated" [ref=e96]: Archive
          - button "Delete Edit habit 1789637384046 updated" [ref=e97]: Remove
      - listitem [ref=e98]:
        - generic [ref=e99]:
          - generic [ref=e100]:
            - paragraph [ref=e101]: Edit validation habit 1789637386581
            - generic [ref=e102]: General
          - paragraph [ref=e103]: Start your streak today!
          - generic [ref=e104]:
            - progressbar "Edit validation habit 1789637386581 weekly progress" [ref=e105]
            - generic [ref=e106]: 0/3 this week
        - generic [ref=e107]:
          - button "Mark done" [ref=e108]
          - button "Freeze Edit validation habit 1789637386581 for today" [ref=e109]: 🧊 Freeze
          - button "Edit Edit validation habit 1789637386581" [ref=e110]: Edit
          - button "Archive Edit validation habit 1789637386581" [ref=e111]: Archive
          - button "Delete Edit validation habit 1789637386581" [ref=e112]: Remove
      - listitem [ref=e113]:
        - generic [ref=e114]:
          - generic [ref=e115]:
            - paragraph [ref=e116]: Test habit create 1789637387961
            - generic [ref=e117]: General
            - status "Test habit create 1789637387961 is at risk of missing its weekly goal" [ref=e118]: ⏰ Due today
          - paragraph [ref=e119]: Start your streak today!
          - generic [ref=e120]:
            - progressbar "Test habit create 1789637387961 weekly progress" [ref=e121]
            - generic [ref=e122]: 0/7 this week
        - generic [ref=e123]:
          - button "Mark done" [ref=e124]
          - button "Freeze Test habit create 1789637387961 for today" [ref=e125]: 🧊 Freeze
          - button "Edit Test habit create 1789637387961" [ref=e126]: Edit
          - button "Archive Test habit create 1789637387961" [ref=e127]: Archive
          - button "Delete Test habit create 1789637387961" [ref=e128]: Remove
  - alert [ref=e129]
```

# Test source

```ts
  79  |    */
  80  |   test('TC04 - HabitForm - form validation disables Add habit button for empty name', async ({ page }) => {
  81  |     await page.goto("/");
  82  |     const input = page.getByRole("textbox", { name: "New habit name" });
  83  |     const addButton = page.getByRole("button", { name: "Add habit" });
  84  |     await input.fill("");
  85  |     await expect(addButton).toBeDisabled();
  86  |     await input.fill("   ");
  87  |     await expect(addButton).toBeDisabled();
  88  |   });
  89  | 
  90  |   /**
  91  |    * TC05: HabitCard - cancel edit closes inline form without saving changes
  92  |    */
  93  |   test('TC05 - HabitCard - cancel edit closes inline form without saving changes', async ({ page }) => {
  94  |     await page.goto("/");
  95  |     const habitName = `Cancel edit habit ${Date.now()}`;
  96  |     await page.getByRole("textbox", { name: "New habit name" }).fill(habitName);
  97  |     await page.getByLabel("Habit category").selectOption("General");
  98  |     await page.getByLabel("Times per week").selectOption("3");
  99  |     await page.getByRole("button", { name: "Add habit" }).click();
  100 |     const habitCard = page.getByRole("listitem").filter({ hasText: habitName });
  101 |     await expect(habitCard).toBeVisible();
  102 |     const editButton = habitCard.getByRole("button", { name: `Edit ${habitName}` });
  103 |     await editButton.click();
  104 |     const editNameInput = page.getByLabel(`Edit name for ${habitName}`);
  105 |     await editNameInput.fill("Changed name");
  106 |     await page.getByRole("button", { name: "Cancel", exact: true }).click();
  107 |     await expect(page.getByLabel(`Edit name for ${habitName}`)).toHaveCount(0);
  108 |     await expect(habitCard).toBeVisible();
  109 |   });
  110 | 
  111 |   /**
  112 |    * TC06: HabitCard - Save button disabled when name input is empty or blank
  113 |    */
  114 |   test('TC06 - HabitCard - Save button disabled when name input is empty or blank', async ({ page }) => {
  115 |     await page.goto("/");
  116 |     const habitName = `Edit validation habit ${Date.now()}`;
  117 |     await page.getByRole("textbox", { name: "New habit name" }).fill(habitName);
  118 |     await page.getByLabel("Habit category").selectOption("General");
  119 |     await page.getByLabel("Times per week").selectOption("3");
  120 |     await page.getByRole("button", { name: "Add habit" }).click();
  121 |     const habitCard = page.getByRole("listitem").filter({ hasText: habitName });
  122 |     await expect(habitCard).toBeVisible();
  123 |     const editButton = habitCard.getByRole("button", { name: `Edit ${habitName}` });
  124 |     await editButton.click();
  125 |     const saveButton = page.getByRole("button", { name: "Save", exact: true });
  126 |     await page.getByLabel(`Edit name for ${habitName}`).fill("");
  127 |     await expect(saveButton).toBeDisabled();
  128 |     await page.getByLabel(`Edit name for ${habitName}`).fill("   ");
  129 |     await expect(saveButton).toBeDisabled();
  130 |   });
  131 | 
  132 |   /**
  133 |    * TC07: Page heading and static elements render
  134 |    */
  135 |   test('TC07 - Page heading and static elements render', async ({ page }) => {
  136 |     await page.goto("/");
  137 |     await expect(page.getByRole("heading", { name: "Habit Tracker" })).toBeVisible();
  138 |     await expect(page.getByText("Build small daily habits, one day at a time.")).toBeVisible();
  139 |     await expect(page.getByLabel("Filter by category")).toBeVisible();
  140 |     await expect(page.getByRole("combobox", { name: "Filter by category" })).toBeVisible();
  141 |     await expect(page.getByRole("textbox", { name: "New habit name" })).toBeVisible();
  142 |     await expect(page.getByRole("combobox", { name: "Habit category" })).toBeVisible();
  143 |     await expect(page.getByRole("combobox", { name: "Times per week" })).toBeVisible();
  144 |     await expect(page.getByRole("button", { name: "Add habit" })).toBeVisible();
  145 |   });
  146 | 
  147 |   /**
  148 |    * TC08: HabitForm - allows creating a new habit
  149 |    */
  150 |   test('TC08 - HabitForm - allows creating a new habit', async ({ page }) => {
  151 |     await page.goto("/");
  152 |     const habitName = `Test habit create ${Date.now()}`;
  153 |     await page.getByRole("textbox", { name: "New habit name" }).fill(habitName);
  154 |     await page.getByRole("combobox", { name: "Habit category" }).selectOption("General");
  155 |     await page.getByRole("combobox", { name: "Times per week" }).selectOption("7");
  156 |     await page.getByRole("button", { name: "Add habit" }).click();
  157 |     await expect(page.getByRole("listitem").filter({ hasText: habitName })).toBeVisible();
  158 |   });
  159 | 
  160 |   /**
  161 |    * TC09: Category filter - allows filtering habits
  162 |    */
  163 |   test('TC09 - Category filter - allows filtering habits', async ({ page }) => {
  164 |     await page.goto("/");
  165 |     await page.getByRole("combobox", { name: "Filter by category" }).selectOption("Health");
  166 |     await expect(page.getByLabel("Filter by category")).toHaveValue("Health");
  167 |   });
  168 | 
  169 |   /**
  170 |    * TC10: HabitCard - marks habit done today disables button
  171 |    */
  172 |   test('TC10 - HabitCard - marks habit done today disables button', async ({ page }) => {
  173 |     await page.goto("/");
  174 |     const habitName = `Daily completion habit ${Date.now()}`;
  175 |     await page.getByRole("textbox", { name: "New habit name" }).fill(habitName);
  176 |     await page.getByRole("button", { name: "Add habit" }).click();
  177 |     const card = page.getByRole("listitem").filter({ hasText: habitName });
  178 |     await card.getByRole("button", { name: "Mark done", exact: true }).click();
> 179 |     await expect(card.getByRole("button", { name: "Done today", exact: true })).toBeDisabled();
      |                                                                                 ^ Error: expect(locator).toBeDisabled() failed
  180 |   });
  181 | 
  182 |   /**
  183 |    * TC11: HabitCard inline edit form - opens and cancels edit mode
  184 |    */
  185 |   test('TC11 - HabitCard inline edit form - opens and cancels edit mode', async ({ page }) => {
  186 |     await page.goto("/");
  187 |     const habitName = `Editable habit ${Date.now()}`;
  188 |     await page.getByRole("textbox", { name: "New habit name" }).fill(habitName);
  189 |     await page.getByRole("button", { name: "Add habit" }).click();
  190 |     const card = page.getByRole("listitem").filter({ hasText: habitName });
  191 |     await card.getByRole("button", { name: `Edit ${habitName}` }).click();
  192 |     const nameInput = page.getByLabel(`Edit name for ${habitName}`);
  193 |     await expect(nameInput).toBeVisible();
  194 |     await page.getByRole("button", { name: "Cancel", exact: true }).click();
  195 |     await expect(card.getByRole("button", { name: `Edit ${habitName}` })).toBeVisible();
  196 |   });
  197 | 
  198 |   /**
  199 |    * TC12: HabitCard inline edit form - saves edited habit and closes form
  200 |    */
  201 |   test('TC12 - HabitCard inline edit form - saves edited habit and closes form', async ({ page }) => {
  202 |     await page.goto("/");
  203 |     const habitName = `Editable habit save ${Date.now()}`;
  204 |     await page.getByRole("textbox", { name: "New habit name" }).fill(habitName);
  205 |     await page.getByRole("button", { name: "Add habit" }).click();
  206 |     const card = page.getByRole("listitem").filter({ hasText: habitName });
  207 |     await card.getByRole("button", { name: `Edit ${habitName}` }).click();
  208 |     const nameInput = page.getByLabel(`Edit name for ${habitName}`);
  209 |     await expect(nameInput).toHaveValue(habitName);
  210 |     const updatedName = `${habitName} updated`;
  211 |     await nameInput.fill(updatedName);
  212 |     const categorySelect = page.getByLabel(`Edit category for ${habitName}`);
  213 |     await categorySelect.selectOption("General");
  214 |     const timesSelect = page.getByLabel(`Edit times per week for ${habitName}`);
  215 |     await timesSelect.selectOption("3");
  216 |     await page.getByRole("button", { name: "Save", exact: true }).click();
  217 |     await expect(page.getByRole("listitem").filter({ hasText: updatedName })).toBeVisible();
  218 |     await expect(page.getByLabel(`Edit name for ${habitName}`)).toHaveCount(0);
  219 |   });
  220 | 
  221 |   /**
  222 |    * TC13: Home page - initial render shows main heading, filter, show archived checkbox, export buttons disabled, and navigation link
  223 |    */
  224 |   test('TC13 - Home page - initial render shows main heading, filter, show archived checkbox, export buttons disabled, and navigation link', async ({ page }) => {
  225 |     await page.goto('/');
  226 |     await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
  227 |     const categoryFilter = page.getByLabel('Filter by category');
  228 |     await expect(categoryFilter).toBeVisible();
  229 |     const allOption = categoryFilter.locator('option[value=""]');
  230 |     await expect(allOption).toHaveCount(1);
  231 |     await expect(categoryFilter).toHaveValue('');
  232 |     const showArchivedCheckbox = page.getByLabel('Show archived');
  233 |     await expect(showArchivedCheckbox).toBeVisible();
  234 |     await expect(showArchivedCheckbox).not.toBeChecked();
  235 |     const exportJsonButton = page.getByRole('button', { name: 'Export JSON' });
  236 |     await expect(exportJsonButton).toBeVisible();
  237 |     await expect(exportJsonButton).toBeDisabled();
  238 |     const exportCsvButton = page.getByRole('button', { name: 'Export CSV' });
  239 |     await expect(exportCsvButton).toBeVisible();
  240 |     await expect(exportCsvButton).toBeDisabled();
  241 |     const statsLink = page.getByRole('link', { name: 'View stats' });
  242 |     await expect(statsLink).toBeVisible();
  243 |   });
  244 | 
  245 |   /**
  246 |    * TC14: HabitForm - create a habit with notes successfully adds it to the list and enables export buttons
  247 |    */
  248 |   test('TC14 - HabitForm - create a habit with notes successfully adds it to the list and enables export buttons', async ({ page }) => {
  249 |     await page.goto('/');
  250 |     const habitName = `Test habit ${Date.now()}`;
  251 |     const habitNotes = 'Test note for habit';
  252 |     await page.getByLabel('New habit name').fill(habitName);
  253 |     await page.getByLabel('Habit category').selectOption('Health');
  254 |     await page.getByLabel('Times per week').selectOption('3');
  255 |     await page.getByLabel('Notes (optional)').fill(habitNotes);
  256 |     await page.getByRole('button', { name: 'Add habit' }).click();
  257 |     const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
  258 |     await expect(habitCard).toBeVisible();
  259 |     await expect(habitCard.getByText(habitNotes)).toBeVisible();
  260 |     const exportJsonButton = page.getByRole('button', { name: 'Export JSON' });
  261 |     await expect(exportJsonButton).toBeEnabled();
  262 |     const exportCsvButton = page.getByRole('button', { name: 'Export CSV' });
  263 |     await expect(exportCsvButton).toBeEnabled();
  264 |   });
  265 | 
  266 |   /**
  267 |    * TC15: HabitCard - edit habit updates name, category, target per week, and notes
  268 |    */
  269 |   test('TC15 - HabitCard - edit habit updates name, category, target per week, and notes', async ({ page }) => {
  270 |     await page.goto('/');
  271 |     const originalName = `Edit habit ${Date.now()}`;
  272 |     const updatedName = `Updated habit ${Date.now()}`;
  273 |     const updatedNotes = 'Updated notes';
  274 |     await page.getByLabel('New habit name').fill(originalName);
  275 |     await page.getByLabel('Habit category').selectOption('Work');
  276 |     await page.getByLabel('Times per week').selectOption('2');
  277 |     await page.getByLabel('Notes (optional)').fill('Initial notes');
  278 |     await page.getByRole('button', { name: 'Add habit' }).click();
  279 |     const habitCard = page.getByRole('listitem').filter({ hasText: originalName });
```