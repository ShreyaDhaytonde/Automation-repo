# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: archive.spec.ts >> Archive >> TC07 - Archive page - renders with heading and controls
- Location: tests/archive.spec.ts:117:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('No archived habits — anything you archive from the home page shows up here.')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByText('No archived habits — anything you archive from the home page shows up here.') with timeout 10000ms
  - waiting for getByText('No archived habits — anything you archive from the home page shows up here.')

```

```yaml
- main:
  - heading "Archive" [level=1]
  - paragraph: Habits you've archived, out of the main list.
  - button "Switch to dark mode": 🌙 Dark
  - button "Logout"
  - link "← Back to habits":
    - /url: /
  - list:
    - listitem:
      - paragraph: Test Delete 1789800396679
      - text: General
      - status "Test Delete 1789800396679 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "Test Delete 1789800396679 weekly progress"
      - text: 0/7 this week
      - button "Mark done" [disabled]
      - button "Freeze Test Delete 1789800396679 for today" [disabled]: 🧊 Freeze
      - button "Edit Test Delete 1789800396679": Edit
      - button "Duplicate Test Delete 1789800396679": Duplicate
      - button "Unarchive Test Delete 1789800396679": Unarchive
      - button "Delete Test Delete 1789800396679": Remove
    - listitem:
      - paragraph: Test Delete 1789800409053
      - text: General
      - status "Test Delete 1789800409053 is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "Test Delete 1789800409053 weekly progress"
      - text: 0/7 this week
      - button "Mark done" [disabled]
      - button "Freeze Test Delete 1789800409053 for today" [disabled]: 🧊 Freeze
      - button "Edit Test Delete 1789800409053": Edit
      - button "Duplicate Test Delete 1789800409053": Duplicate
      - button "Unarchive Test Delete 1789800409053": Unarchive
      - button "Delete Test Delete 1789800409053": Remove
    - listitem:
      - paragraph: Test Edit 1789800422464 updated
      - text: General
      - status "Test Edit 1789800422464 updated is at risk of missing its weekly goal": ⏰ Due today
      - paragraph: Start your streak today!
      - progressbar "Test Edit 1789800422464 updated weekly progress"
      - text: 0/7 this week
      - button "Mark done" [disabled]
      - button "Freeze Test Edit 1789800422464 updated for today" [disabled]: 🧊 Freeze
      - button "Edit Test Edit 1789800422464 updated": Edit
      - button "Duplicate Test Edit 1789800422464 updated": Duplicate
      - button "Unarchive Test Edit 1789800422464 updated": Unarchive
      - button "Delete Test Edit 1789800422464 updated": Remove
- alert
```

# Test source

```ts
  22  | 
  23  |   /**
  24  |    * TC02: Archive page - loads and shows static elements
  25  |    */
  26  |   test('TC02 - Archive page - loads and shows static elements', async ({ page }) => {
  27  |     await page.goto('/archive');
  28  |     await expect(page.getByRole('heading', { name: 'Archive' })).toBeVisible();
  29  |     await expect(page.getByRole('link', { name: '← Back to habits' })).toBeVisible();
  30  |     await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
  31  |     await expect(page.getByRole('button', { name: /switch to dark mode/i })).toBeVisible();
  32  |   });
  33  | 
  34  |   /**
  35  |    * TC03: Archive page - can delete an archived habit
  36  |    */
  37  |   test('TC03 - Archive page - can delete an archived habit', async ({ page }) => {
  38  |     await page.goto('/');
  39  |     const uniqueName = `Test Delete ${Date.now()}`;
  40  |     await page.getByLabel('New habit name').fill(uniqueName);
  41  |     await page.getByLabel('Habit category').selectOption({ index: 0 });
  42  |     await page.getByLabel('Times per week').selectOption('7');
  43  |     await page.getByLabel('Notes (optional)').fill('');
  44  |     await page.getByRole('button', { name: 'Add habit' }).click();
  45  |     const habitCard = page.getByRole('listitem').filter({ hasText: uniqueName });
  46  |     await expect(habitCard).toBeVisible();
  47  |     await habitCard.getByRole('button', { name: `Archive` }).click();
  48  |     await page.goto('/archive');
  49  |     const archivedHabitCard = page.getByRole('listitem').filter({ hasText: uniqueName });
  50  |     await expect(archivedHabitCard).toBeVisible();
  51  |     await archivedHabitCard.getByRole('button', { name: `Delete ${uniqueName}`, exact: true }).click();
  52  |     await page.waitForTimeout(500);
  53  |     await expect(archivedHabitCard).toHaveCount(0);
  54  |   });
  55  | 
  56  |   /**
  57  |    * TC04: Archive page - can unarchive an archived habit
  58  |    */
  59  |   test('TC04 - Archive page - can unarchive an archived habit', async ({ page }) => {
  60  |     await page.goto('/');
  61  |     const uniqueName = `Test Unarchive ${Date.now()}`;
  62  |     await page.getByLabel('New habit name').fill(uniqueName);
  63  |     await page.getByLabel('Habit category').selectOption({ index: 0 });
  64  |     await page.getByLabel('Times per week').selectOption('7');
  65  |     await page.getByLabel('Notes (optional)').fill('');
  66  |     await page.getByRole('button', { name: 'Add habit' }).click();
  67  |     const habitCard = page.getByRole('listitem').filter({ hasText: uniqueName });
  68  |     await expect(habitCard).toBeVisible();
  69  |     await habitCard.getByRole('button', { name: `Archive ${uniqueName}`, exact: true }).click();
  70  |     await page.goto('/archive');
  71  |     const archivedHabitCard = page.getByRole('listitem').filter({ hasText: uniqueName });
  72  |     await expect(archivedHabitCard).toBeVisible();
  73  |     await archivedHabitCard.getByRole('button', { name: `Unarchive ${uniqueName}`, exact: true }).click();
  74  |     await expect(page.getByRole('listitem').filter({ hasText: uniqueName })).toHaveCount(0);
  75  |   });
  76  | 
  77  |   /**
  78  |    * TC05: Archive page - can edit an archived habit\'s details
  79  |    */
  80  |   test('TC05 - Archive page - can edit an archived habit\\\'s details', async ({ page }) => {
  81  |     await page.goto('/');
  82  |     const uniqueName = `Test Edit ${Date.now()}`;
  83  |     await page.getByLabel('New habit name').fill(uniqueName);
  84  |     await page.getByLabel('Habit category').selectOption({ index: 0 });
  85  |     await page.getByLabel('Times per week').selectOption('7');
  86  |     await page.getByLabel('Notes (optional)').fill('');
  87  |     await page.getByRole('button', { name: 'Add habit' }).click();
  88  |     const habitCard = page.getByRole('listitem').filter({ hasText: uniqueName });
  89  |     await expect(habitCard).toBeVisible();
  90  |     await habitCard.getByRole('button', { name: `Archive` }).click();
  91  |     await page.goto('/archive');
  92  |     const archivedHabitCard = page.getByRole('listitem').filter({ hasText: uniqueName });
  93  |     await expect(archivedHabitCard).toBeVisible();
  94  |     await archivedHabitCard.getByRole('button', { name: `Edit ${uniqueName}`, exact: true }).click();
  95  |     const nameInput = page.getByLabel(`Edit name for ${uniqueName}`);
  96  |     await expect(nameInput).toHaveValue(uniqueName);
  97  |     await nameInput.fill(`${uniqueName} updated`);
  98  |     const saveButton = page.getByRole('button', { name: 'Save', exact: true });
  99  |     await saveButton.click();
  100 |     const updatedHabitCard = page.getByRole('listitem').filter({ hasText: `${uniqueName} updated` });
  101 |     await expect(updatedHabitCard).toBeVisible();
  102 |   });
  103 | 
  104 |   /**
  105 |    * TC06: Archive page - can navigate back to home page
  106 |    */
  107 |   test('TC06 - Archive page - can navigate back to home page', async ({ page }) => {
  108 |     await page.goto('/archive');
  109 |     await page.getByRole('link', { name: '← Back to habits' }).click();
  110 |     await expect(page).toHaveURL('/');
  111 |     await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
  112 |   });
  113 | 
  114 |   /**
  115 |    * TC07: Archive page - renders with heading and controls
  116 |    */
  117 |   test('TC07 - Archive page - renders with heading and controls', async ({ page }) => {
  118 |     await page.goto('/archive');
  119 |     await expect(page.getByRole('heading', { name: 'Archive' })).toBeVisible();
  120 |     await expect(page.getByText("Habits you've archived, out of the main list.")).toBeVisible();
  121 |     await expect(page.getByRole('link', { name: '← Back to habits' })).toBeVisible();
> 122 |     await expect(page.getByText('No archived habits — anything you archive from the home page shows up here.')).toBeVisible();
      |                                                                                                                 ^ Error: expect(locator).toBeVisible() failed
  123 |     await expect(page.getByRole('button', { name: 'Theme toggle' })).toBeVisible();
  124 |     await expect(page.getByRole('button', { name: 'Log out' })).toBeVisible();
  125 |   });
  126 | 
  127 |   /**
  128 |    * TC08: Archive page - create and unarchive a habit
  129 |    */
  130 |   test('TC08 - Archive page - create and unarchive a habit', async ({ page }) => {
  131 |     const newHabitName = `Unarchive Test ${Date.now()}`;
  132 |     await page.goto('/');
  133 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(newHabitName);
  134 |     await page.locator('select[aria-label="Habit category"]').selectOption({ index: 1 });
  135 |     await page.getByLabel('Target per week').fill('1');
  136 |     await page.getByLabel('Notes').fill('Testing unarchive.');
  137 |     await page.getByRole('button', { name: 'Add habit' }).click();
  138 |     const habitCard = page.getByRole('listitem').filter({ hasText: newHabitName });
  139 |     await expect(habitCard).toBeVisible();
  140 |     await habitCard.getByRole('button', { name: `Archive ${newHabitName}` }).click();
  141 |     await expect(habitCard).toHaveCount(0);
  142 |     await page.goto('/archive');
  143 |     const archivedHabit = page.getByRole('listitem').filter({ hasText: newHabitName });
  144 |     await expect(archivedHabit).toBeVisible();
  145 |     await archivedHabit.getByRole('button', { name: `Unarchive ${newHabitName}` }).click();
  146 |     await expect(archivedHabit).toHaveCount(0);
  147 |   });
  148 | 
  149 |   /**
  150 |    * TC09: Archive page - edit an archived habit\\\'s name
  151 |    */
  152 |   test('TC09 - Archive page - edit an archived habit\\\\\\\'s name', async ({ page }) => {
  153 |     const habitName = `Edit Archived ${Date.now()}`;
  154 |     await page.goto('/');
  155 |     await page.getByLabel('Name').fill(habitName);
  156 |     await page.getByLabel('Category').selectOption({ index: 1 });
  157 |     await page.getByLabel('Target per week').fill('3');
  158 |     await page.getByLabel('Notes').fill('Editing archived habit test.');
  159 |     await page.getByRole('button', { name: 'Add habit' }).click();
  160 |     const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
  161 |     await expect(habitCard).toBeVisible();
  162 |     await habitCard.getByRole('button', { name: `Archive ${habitName}` }).click();
  163 |     await expect(habitCard).toHaveCount(0);
  164 |     await page.goto('/archive');
  165 |     const archivedHabit = page.getByRole('listitem').filter({ hasText: habitName });
  166 |     await expect(archivedHabit).toBeVisible();
  167 |     await archivedHabit.getByRole('button', { name: `Edit ${habitName}` }).click();
  168 |     const nameInput = page.getByLabel(`Edit name for ${habitName}`);
  169 |     await expect(nameInput).toBeVisible();
  170 |     const newName = `Edited Archived ${Date.now()}`;
  171 |     await nameInput.fill(newName);
  172 |     await archivedHabit.getByRole('button', { name: `Save ${habitName}` }).click();
  173 |     await expect(page.getByRole('listitem').filter({ hasText: newName })).toBeVisible();
  174 |   });
  175 | 
  176 |   /**
  177 |    * TC10: Archive page - delete an archived habit
  178 |    */
  179 |   test('TC10 - Archive page - delete an archived habit', async ({ page }) => {
  180 |     const habitName = `Delete Archived ${Date.now()}`;
  181 |     await page.goto('/');
  182 |     await page.getByRole('textbox', { name: 'New habit name' }).fill(habitName);
  183 |     await page.locator('select[aria-label="Habit category"]').selectOption({ index: 1 });
  184 |     await page.getByLabel('Target per week').fill('2');
  185 |     await page.getByLabel('Notes').fill('Deleting archived habit test.');
  186 |     await page.getByRole('button', { name: 'Add habit' }).click();
  187 |     const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
  188 |     await expect(habitCard).toBeVisible();
  189 |     await habitCard.getByRole('button', { name: `Archive ${habitName}` }).click();
  190 |     await expect(habitCard).toHaveCount(0);
  191 |     await page.goto('/archive');
  192 |     const archivedHabit = page.getByRole('listitem').filter({ hasText: habitName });
  193 |     await expect(archivedHabit).toBeVisible();
  194 |     await archivedHabit.getByRole('button', { name: `Delete ${habitName}` }).click();
  195 |     await expect(page.getByRole('listitem').filter({ hasText: habitName })).toHaveCount(0);
  196 |   });
  197 | 
  198 |   /**
  199 |    * TC11: History page - renders with heading and controls
  200 |    */
  201 |   test('TC11 - History page - renders with heading and controls', async ({ page }) => {
  202 |     await page.goto('/history');
  203 |     await expect(page.getByRole('heading', { name: 'History' })).toBeVisible();
  204 |     await expect(page.getByText('Last 28 days for each habit.')).toBeVisible();
  205 |     await expect(page.getByRole('link', { name: '← Back to habits' })).toBeVisible();
  206 |     await expect(page.getByText('Done')).toBeVisible();
  207 |     await expect(page.getByText('Frozen')).toBeVisible();
  208 |     await expect(page.getByText('Missed')).toBeVisible();
  209 |     await expect(page.getByRole('button', { name: 'Theme toggle' })).toBeVisible();
  210 |     await expect(page.getByRole('button', { name: 'Log out' })).toBeVisible();
  211 |   });
  212 | 
  213 |   /**
  214 |    * TC12: Home page - renders with heading and controls
  215 |    */
  216 |   test('TC12 - Home page - renders with heading and controls', async ({ page }) => {
  217 |     await page.goto('/');
  218 |     await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
  219 |     await expect(page.getByText('Build small daily habits, one day at a time.')).toBeVisible();
  220 |     await expect(page.getByRole('link', { name: 'History' })).toBeVisible();
  221 |     await expect(page.getByRole('link', { name: 'View stats' })).toBeVisible();
  222 |     await expect(page.getByRole('link', { name: 'Archive' })).toBeVisible();
```