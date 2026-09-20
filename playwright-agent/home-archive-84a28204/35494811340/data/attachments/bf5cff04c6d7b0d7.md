# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> Home >> TC29 - HabitCard - mark habit as done disables mark done button
- Location: tests/home.spec.ts:556:7

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByRole('listitem').filter({ hasText: 'Complete habit 1789886964938' }).getByRole('button', { name: 'Mark done', exact: true })

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
        - button "Complete all for today (18)" [ref=e33]
        - button "Export JSON" [ref=e34]
        - button "Export CSV" [ref=e35]
    - list [ref=e36]:
      - listitem [ref=e37]:
        - generic:
          - generic:
            - paragraph [ref=e38]: Archive habit 1789886951291
            - generic [ref=e39]: General
            - status "Archive habit 1789886951291 is at risk of missing its weekly goal" [ref=e40]: ⏰ Due today
          - paragraph: Start your streak today!
          - generic:
            - progressbar "Archive habit 1789886951291 weekly progress"
            - generic [ref=e41]: 0/7 this week
        - generic [ref=e42]:
          - button "Mark done" [ref=e43]
          - button "Freeze Archive habit 1789886951291 for today" [ref=e44]: 🧊 Freeze
          - button "Edit Archive habit 1789886951291" [ref=e45]: Edit
          - button "Duplicate Archive habit 1789886951291" [ref=e46]: Duplicate
          - button "Archive Archive habit 1789886951291" [ref=e47]: Archive
          - button "Delete Archive habit 1789886951291" [ref=e48]: Remove
      - listitem [ref=e49]:
        - generic:
          - generic:
            - paragraph [ref=e50]: Cancel edit habit 1789886871269
            - generic [ref=e51]: General
            - status "Cancel edit habit 1789886871269 is at risk of missing its weekly goal" [ref=e52]: ⏰ Due today
          - paragraph: Start your streak today!
          - generic:
            - progressbar "Cancel edit habit 1789886871269 weekly progress"
            - generic [ref=e53]: 0/3 this week
        - generic [ref=e54]:
          - button "Mark done" [ref=e55]
          - button "Freeze Cancel edit habit 1789886871269 for today" [ref=e56]: 🧊 Freeze
          - button "Edit Cancel edit habit 1789886871269" [ref=e57]: Edit
          - button "Duplicate Cancel edit habit 1789886871269" [ref=e58]: Duplicate
          - button "Archive Cancel edit habit 1789886871269" [ref=e59]: Archive
          - button "Delete Cancel edit habit 1789886871269" [ref=e60]: Remove
      - listitem [ref=e61]:
        - generic:
          - generic:
            - paragraph [ref=e62]: CompleteTest 1789886826449
            - generic [ref=e63]: General
          - paragraph: 🔥 1 day streak
          - generic:
            - progressbar "CompleteTest 1789886826449 weekly progress"
            - generic [ref=e64]: 1/7 this week
        - generic [ref=e65]:
          - button "Done today" [disabled] [ref=e66]
          - button "Freeze CompleteTest 1789886826449 for today" [disabled] [ref=e67]: 🧊 Freeze
          - button "Edit CompleteTest 1789886826449" [ref=e68]: Edit
          - button "Duplicate CompleteTest 1789886826449" [ref=e69]: Duplicate
          - button "Archive CompleteTest 1789886826449" [ref=e70]: Archive
          - button "Delete CompleteTest 1789886826449" [ref=e71]: Remove
      - listitem [ref=e72]:
        - generic:
          - generic:
            - paragraph [ref=e73]: Daily completion habit 1789886874884
            - generic [ref=e74]: General
            - status "Daily completion habit 1789886874884 is at risk of missing its weekly goal" [ref=e75]: ⏰ Due today
          - paragraph: Start your streak today!
          - generic:
            - progressbar "Daily completion habit 1789886874884 weekly progress"
            - generic [ref=e76]: 0/7 this week
        - generic [ref=e77]:
          - button "Mark done" [ref=e78]
          - button "Freeze Daily completion habit 1789886874884 for today" [ref=e79]: 🧊 Freeze
          - button "Edit Daily completion habit 1789886874884" [ref=e80]: Edit
          - button "Duplicate Daily completion habit 1789886874884" [ref=e81]: Duplicate
          - button "Archive Daily completion habit 1789886874884" [ref=e82]: Archive
          - button "Delete Daily completion habit 1789886874884" [ref=e83]: Remove
      - listitem [ref=e84]:
        - generic:
          - generic:
            - paragraph [ref=e85]: Daily completion habit 1789886886946
            - generic [ref=e86]: General
            - status "Daily completion habit 1789886886946 is at risk of missing its weekly goal" [ref=e87]: ⏰ Due today
          - paragraph: Start your streak today!
          - generic:
            - progressbar "Daily completion habit 1789886886946 weekly progress"
            - generic [ref=e88]: 0/7 this week
        - generic [ref=e89]:
          - button "Mark done" [ref=e90]
          - button "Freeze Daily completion habit 1789886886946 for today" [ref=e91]: 🧊 Freeze
          - button "Edit Daily completion habit 1789886886946" [ref=e92]: Edit
          - button "Duplicate Daily completion habit 1789886886946" [ref=e93]: Duplicate
          - button "Archive Daily completion habit 1789886886946" [ref=e94]: Archive
          - button "Delete Daily completion habit 1789886886946" [ref=e95]: Remove
      - listitem [ref=e96]:
        - generic:
          - generic:
            - paragraph [ref=e97]: Edit habit 1789886857544
            - generic [ref=e98]: General
            - status "Edit habit 1789886857544 is at risk of missing its weekly goal" [ref=e99]: ⏰ Due today
          - paragraph: Start your streak today!
          - generic:
            - progressbar "Edit habit 1789886857544 weekly progress"
            - generic [ref=e100]: 0/3 this week
        - generic [ref=e101]:
          - button "Mark done" [ref=e102]
          - button "Freeze Edit habit 1789886857544 for today" [ref=e103]: 🧊 Freeze
          - button "Edit Edit habit 1789886857544" [ref=e104]: Edit
          - button "Duplicate Edit habit 1789886857544" [ref=e105]: Duplicate
          - button "Archive Edit habit 1789886857544" [ref=e106]: Archive
          - button "Delete Edit habit 1789886857544" [ref=e107]: Remove
      - listitem [ref=e108]:
        - generic:
          - generic:
            - paragraph [ref=e109]: Edit validation habit 1789886872103
            - generic [ref=e110]: General
            - status "Edit validation habit 1789886872103 is at risk of missing its weekly goal" [ref=e111]: ⏰ Due today
          - paragraph: Start your streak today!
          - generic:
            - progressbar "Edit validation habit 1789886872103 weekly progress"
            - generic [ref=e112]: 0/3 this week
        - generic [ref=e113]:
          - button "Mark done" [ref=e114]
          - button "Freeze Edit validation habit 1789886872103 for today" [ref=e115]: 🧊 Freeze
          - button "Edit Edit validation habit 1789886872103" [ref=e116]: Edit
          - button "Duplicate Edit validation habit 1789886872103" [ref=e117]: Duplicate
          - button "Archive Edit validation habit 1789886872103" [ref=e118]: Archive
          - button "Delete Edit validation habit 1789886872103" [ref=e119]: Remove
      - listitem [ref=e120]:
        - generic:
          - generic:
            - paragraph [ref=e121]: Editable habit 1789886899020
            - generic [ref=e122]: General
            - status "Editable habit 1789886899020 is at risk of missing its weekly goal" [ref=e123]: ⏰ Due today
          - paragraph: Start your streak today!
          - generic:
            - progressbar "Editable habit 1789886899020 weekly progress"
            - generic [ref=e124]: 0/7 this week
        - generic [ref=e125]:
          - button "Mark done" [ref=e126]
          - button "Freeze Editable habit 1789886899020 for today" [ref=e127]: 🧊 Freeze
          - button "Edit Editable habit 1789886899020" [ref=e128]: Edit
          - button "Duplicate Editable habit 1789886899020" [ref=e129]: Duplicate
          - button "Archive Editable habit 1789886899020" [ref=e130]: Archive
          - button "Delete Editable habit 1789886899020" [ref=e131]: Remove
      - listitem [ref=e132]:
        - generic:
          - generic:
            - paragraph [ref=e133]: Editable habit save 1789886899913 updated
            - generic [ref=e134]: General
            - status "Editable habit save 1789886899913 updated is at risk of missing its weekly goal" [ref=e135]: ⏰ Due today
          - paragraph: Start your streak today!
          - generic:
            - progressbar "Editable habit save 1789886899913 updated weekly progress"
            - generic [ref=e136]: 0/3 this week
        - generic [ref=e137]:
          - button "Mark done" [ref=e138]
          - button "Freeze Editable habit save 1789886899913 updated for today" [ref=e139]: 🧊 Freeze
          - button "Edit Editable habit save 1789886899913 updated" [ref=e140]: Edit
          - button "Duplicate Editable habit save 1789886899913 updated" [ref=e141]: Duplicate
          - button "Archive Editable habit save 1789886899913 updated" [ref=e142]: Archive
          - button "Delete Editable habit save 1789886899913 updated" [ref=e143]: Remove
      - listitem [ref=e144]:
        - generic:
          - generic:
            - paragraph [ref=e145]: EditTest 1789886703719
            - generic [ref=e146]: General
          - paragraph: 🔥 1 day streak
          - generic:
            - progressbar "EditTest 1789886703719 weekly progress"
            - generic [ref=e147]: 1/7 this week
        - generic [ref=e148]:
          - button "Done today" [disabled] [ref=e149]
          - button "Freeze EditTest 1789886703719 for today" [disabled] [ref=e150]: 🧊 Freeze
          - button "Edit EditTest 1789886703719" [ref=e151]: Edit
          - button "Duplicate EditTest 1789886703719" [ref=e152]: Duplicate
          - button "Archive EditTest 1789886703719" [ref=e153]: Archive
          - button "Delete EditTest 1789886703719" [ref=e154]: Remove
      - listitem [ref=e155]:
        - generic:
          - generic:
            - paragraph [ref=e156]: EditTest 1789886765101
            - generic [ref=e157]: General
            - status "EditTest 1789886765101 is at risk of missing its weekly goal" [ref=e158]: ⏰ Due today
          - paragraph: Start your streak today!
          - generic:
            - progressbar "EditTest 1789886765101 weekly progress"
            - generic [ref=e159]: 0/7 this week
        - generic [ref=e160]:
          - button "Mark done" [ref=e161]
          - button "Freeze EditTest 1789886765101 for today" [ref=e162]: 🧊 Freeze
          - button "Edit EditTest 1789886765101" [ref=e163]: Edit
          - button "Duplicate EditTest 1789886765101" [ref=e164]: Duplicate
          - button "Archive EditTest 1789886765101" [ref=e165]: Archive
          - button "Delete EditTest 1789886765101" [ref=e166]: Remove
      - listitem [ref=e167]:
        - generic:
          - generic:
            - paragraph [ref=e168]: Habit 1789886702966
            - generic [ref=e169]: General
            - status "Habit 1789886702966 is at risk of missing its weekly goal" [ref=e170]: ⏰ Due today
          - paragraph: Start your streak today!
          - generic:
            - progressbar "Habit 1789886702966 weekly progress"
            - generic [ref=e171]: 0/7 this week
          - paragraph: Test notes
        - generic [ref=e172]:
          - button "Mark done" [ref=e173]
          - button "Freeze Habit 1789886702966 for today" [ref=e174]: 🧊 Freeze
          - button "Edit Habit 1789886702966" [ref=e175]: Edit
          - button "Duplicate Habit 1789886702966" [ref=e176]: Duplicate
          - button "Archive Habit 1789886702966" [ref=e177]: Archive
          - button "Delete Habit 1789886702966" [ref=e178]: Remove
      - listitem [ref=e179]:
        - generic:
          - generic:
            - paragraph [ref=e180]: SortA 1789886855063
            - generic [ref=e181]: General
            - status "SortA 1789886855063 is at risk of missing its weekly goal" [ref=e182]: ⏰ Due today
          - paragraph: Start your streak today!
          - generic:
            - progressbar "SortA 1789886855063 weekly progress"
            - generic [ref=e183]: 0/7 this week
        - generic [ref=e184]:
          - button "Mark done" [ref=e185]
          - button "Freeze SortA 1789886855063 for today" [ref=e186]: 🧊 Freeze
          - button "Edit SortA 1789886855063" [ref=e187]: Edit
          - button "Duplicate SortA 1789886855063" [ref=e188]: Duplicate
          - button "Archive SortA 1789886855063" [ref=e189]: Archive
          - button "Delete SortA 1789886855063" [ref=e190]: Remove
      - listitem [ref=e191]:
        - generic:
          - generic:
            - paragraph [ref=e192]: SortB 1789886855064
            - generic [ref=e193]: General
            - status "SortB 1789886855064 is at risk of missing its weekly goal" [ref=e194]: ⏰ Due today
          - paragraph: Start your streak today!
          - generic:
            - progressbar "SortB 1789886855064 weekly progress"
            - generic [ref=e195]: 0/7 this week
        - generic [ref=e196]:
          - button "Mark done" [ref=e197]
          - button "Freeze SortB 1789886855064 for today" [ref=e198]: 🧊 Freeze
          - button "Edit SortB 1789886855064" [ref=e199]: Edit
          - button "Duplicate SortB 1789886855064" [ref=e200]: Duplicate
          - button "Archive SortB 1789886855064" [ref=e201]: Archive
          - button "Delete SortB 1789886855064" [ref=e202]: Remove
      - listitem [ref=e203]:
        - generic:
          - generic:
            - paragraph [ref=e204]: Test habit 1789886901563
            - generic [ref=e205]: Health
            - status "Test habit 1789886901563 is at risk of missing its weekly goal" [ref=e206]: ⏰ Due today
          - paragraph: Start your streak today!
          - generic:
            - progressbar "Test habit 1789886901563 weekly progress"
            - generic [ref=e207]: 0/3 this week
          - paragraph: Test note for habit
        - generic [ref=e208]:
          - button "Mark done" [ref=e209]
          - button "Freeze Test habit 1789886901563 for today" [ref=e210]: 🧊 Freeze
          - button "Edit Test habit 1789886901563" [ref=e211]: Edit
          - button "Duplicate Test habit 1789886901563" [ref=e212]: Duplicate
          - button "Archive Test habit 1789886901563" [ref=e213]: Archive
          - button "Delete Test habit 1789886901563" [ref=e214]: Remove
      - listitem [ref=e215]:
        - generic:
          - generic:
            - paragraph [ref=e216]: Test habit 1789886913747
            - generic [ref=e217]: Health
            - status "Test habit 1789886913747 is at risk of missing its weekly goal" [ref=e218]: ⏰ Due today
          - paragraph: Start your streak today!
          - generic:
            - progressbar "Test habit 1789886913747 weekly progress"
            - generic [ref=e219]: 0/3 this week
          - paragraph: Test note for habit
        - generic [ref=e220]:
          - button "Mark done" [ref=e221]
          - button "Freeze Test habit 1789886913747 for today" [ref=e222]: 🧊 Freeze
          - button "Edit Test habit 1789886913747" [ref=e223]: Edit
          - button "Duplicate Test habit 1789886913747" [ref=e224]: Duplicate
          - button "Archive Test habit 1789886913747" [ref=e225]: Archive
          - button "Delete Test habit 1789886913747" [ref=e226]: Remove
      - listitem [ref=e227]:
        - generic:
          - generic:
            - paragraph [ref=e228]: Test habit create 1789886873623
            - generic [ref=e229]: General
            - status "Test habit create 1789886873623 is at risk of missing its weekly goal" [ref=e230]: ⏰ Due today
          - paragraph: Start your streak today!
          - generic:
            - progressbar "Test habit create 1789886873623 weekly progress"
            - generic [ref=e231]: 0/7 this week
        - generic [ref=e232]:
          - button "Mark done" [ref=e233]
          - button "Freeze Test habit create 1789886873623 for today" [ref=e234]: 🧊 Freeze
          - button "Edit Test habit create 1789886873623" [ref=e235]: Edit
          - button "Duplicate Test habit create 1789886873623" [ref=e236]: Duplicate
          - button "Archive Test habit create 1789886873623" [ref=e237]: Archive
          - button "Delete Test habit create 1789886873623" [ref=e238]: Remove
      - listitem [ref=e239]:
        - generic:
          - generic:
            - paragraph [ref=e240]: Test Unarchive 1789886570695
            - generic [ref=e241]: General
            - status "Test Unarchive 1789886570695 is at risk of missing its weekly goal" [ref=e242]: ⏰ Due today
          - paragraph: Start your streak today!
          - generic:
            - progressbar "Test Unarchive 1789886570695 weekly progress"
            - generic [ref=e243]: 0/7 this week
        - generic [ref=e244]:
          - button "Mark done" [ref=e245]
          - button "Freeze Test Unarchive 1789886570695 for today" [ref=e246]: 🧊 Freeze
          - button "Edit Test Unarchive 1789886570695" [ref=e247]: Edit
          - button "Duplicate Test Unarchive 1789886570695" [ref=e248]: Duplicate
          - button "Archive Test Unarchive 1789886570695" [ref=e249]: Archive
          - button "Delete Test Unarchive 1789886570695" [ref=e250]: Remove
      - listitem [ref=e251]:
        - generic:
          - generic:
            - paragraph [ref=e252]: Updated habit 1789886925931
            - generic [ref=e253]: Personal
            - status "Updated habit 1789886925931 is at risk of missing its weekly goal" [ref=e254]: ⏰ Due today
          - paragraph: Start your streak today!
          - generic:
            - progressbar "Updated habit 1789886925931 weekly progress"
            - generic [ref=e255]: 0/5 this week
          - paragraph: Updated notes
        - generic [ref=e256]:
          - button "Mark done" [ref=e257]
          - button "Freeze Updated habit 1789886925931 for today" [ref=e258]: 🧊 Freeze
          - button "Edit Updated habit 1789886925931" [ref=e259]: Edit
          - button "Duplicate Updated habit 1789886925931" [ref=e260]: Duplicate
          - button "Archive Updated habit 1789886925931" [ref=e261]: Archive
          - button "Delete Updated habit 1789886925931" [ref=e262]: Remove
      - listitem [ref=e263]:
        - generic:
          - generic:
            - paragraph [ref=e264]: Updated habit 1789886938560
            - generic [ref=e265]: Personal
            - status "Updated habit 1789886938560 is at risk of missing its weekly goal" [ref=e266]: ⏰ Due today
          - paragraph: Start your streak today!
          - generic:
            - progressbar "Updated habit 1789886938560 weekly progress"
            - generic [ref=e267]: 0/5 this week
          - paragraph: Updated notes
        - generic [ref=e268]:
          - button "Mark done" [ref=e269]
          - button "Freeze Updated habit 1789886938560 for today" [ref=e270]: 🧊 Freeze
          - button "Edit Updated habit 1789886938560" [ref=e271]: Edit
          - button "Duplicate Updated habit 1789886938560" [ref=e272]: Duplicate
          - button "Archive Updated habit 1789886938560" [ref=e273]: Archive
          - button "Delete Updated habit 1789886938560" [ref=e274]: Remove
  - alert [ref=e275]
```

# Test source

```ts
  465 |     await expect(allOption).toHaveCount(1);
  466 |     await expect(categoryFilter).toHaveValue('');
  467 |     const showArchivedCheckbox = page.getByLabel('Show archived');
  468 |     await expect(showArchivedCheckbox).toBeVisible();
  469 |     await expect(showArchivedCheckbox).not.toBeChecked();
  470 |     const exportJsonButton = page.getByRole('button', { name: 'Export JSON' });
  471 |     await expect(exportJsonButton).toBeVisible();
  472 |     await expect(exportJsonButton).toBeDisabled();
  473 |     const exportCsvButton = page.getByRole('button', { name: 'Export CSV' });
  474 |     await expect(exportCsvButton).toBeVisible();
  475 |     await expect(exportCsvButton).toBeDisabled();
  476 |     const statsLink = page.getByRole('link', { name: 'View stats' });
  477 |     await expect(statsLink).toBeVisible();
  478 |   });
  479 | 
  480 |   /**
  481 |    * TC26: HabitForm - create a habit with notes successfully adds it to the list and enables export buttons
  482 |    */
  483 |   test('TC26 - HabitForm - create a habit with notes successfully adds it to the list and enables export buttons', async ({ page }) => {
  484 |     await page.goto('/');
  485 |     const habitName = `Test habit ${Date.now()}`;
  486 |     const habitNotes = 'Test note for habit';
  487 |     await page.getByLabel('New habit name').fill(habitName);
  488 |     await page.getByLabel('Habit category').selectOption('Health');
  489 |     await page.getByLabel('Times per week').selectOption('3');
  490 |     await page.getByLabel('Notes (optional)').fill(habitNotes);
  491 |     await page.getByRole('button', { name: 'Add habit' }).click();
  492 |     const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
  493 |     await expect(habitCard).toBeVisible();
  494 |     await expect(habitCard.getByText(habitNotes)).toBeVisible();
  495 |     const exportJsonButton = page.getByRole('button', { name: 'Export JSON' });
  496 |     await expect(exportJsonButton).toBeEnabled();
  497 |     const exportCsvButton = page.getByRole('button', { name: 'Export CSV' });
  498 |     await expect(exportCsvButton).toBeEnabled();
  499 |   });
  500 | 
  501 |   /**
  502 |    * TC27: HabitCard - edit habit updates name, category, target per week, and notes
  503 |    */
  504 |   test('TC27 - HabitCard - edit habit updates name, category, target per week, and notes', async ({ page }) => {
  505 |     await page.goto('/');
  506 |     const originalName = `Edit habit ${Date.now()}`;
  507 |     const updatedName = `Updated habit ${Date.now()}`;
  508 |     const updatedNotes = 'Updated notes';
  509 |     await page.getByLabel('New habit name').fill(originalName);
  510 |     await page.getByLabel('Habit category').selectOption('Work');
  511 |     await page.getByLabel('Times per week').selectOption('2');
  512 |     await page.getByLabel('Notes (optional)').fill('Initial notes');
  513 |     await page.getByRole('button', { name: 'Add habit' }).click();
  514 |     const habitCard = page.getByRole('listitem').filter({ hasText: originalName });
  515 |     await expect(habitCard).toBeVisible();
  516 |     await habitCard.getByRole('button', { name: `Edit ${originalName}` }).click();
  517 |     const nameInput = page.getByLabel(`Edit name for ${originalName}`);
  518 |     await expect(nameInput).toHaveValue(originalName);
  519 |     const notesInput = page.getByLabel(`Edit notes for ${originalName}`);
  520 |     await expect(notesInput).toHaveValue('Initial notes');
  521 |     await nameInput.fill(updatedName);
  522 |     await page.getByLabel(`Edit category for ${originalName}`).selectOption('Personal');
  523 |     await page.getByLabel(`Edit times per week for ${originalName}`).selectOption('5');
  524 |     await notesInput.fill(updatedNotes);
  525 |     await page.getByRole('button', { name: 'Save', exact: true }).click();
  526 |     const updatedHabitCard = page.getByRole('listitem').filter({ hasText: updatedName });
  527 |     await expect(updatedHabitCard).toBeVisible();
  528 |     await expect(updatedHabitCard.getByText(updatedNotes)).toBeVisible();
  529 |   });
  530 | 
  531 |   /**
  532 |    * TC28: HabitCard - archive and unarchive a habit via its archive toggle button
  533 |    */
  534 |   test('TC28 - HabitCard - archive and unarchive a habit via its archive toggle button', async ({ page }) => {
  535 |     await page.goto('/');
  536 |     const habitName = `Archive habit ${Date.now()}`;
  537 |     await page.getByLabel('New habit name').fill(habitName);
  538 |     await page.getByRole('button', { name: 'Add habit' }).click();
  539 |     const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
  540 |     await expect(habitCard).toBeVisible();
  541 |     const archiveButton = habitCard.getByRole('button', { name: `Archive ${habitName}` });
  542 |     await archiveButton.click();
  543 |     await expect(page.getByRole('listitem').filter({ hasText: habitName })).toHaveCount(0);
  544 |     const showArchivedCheckbox = page.getByLabel('Show archived');
  545 |     await showArchivedCheckbox.check();
  546 |     const archivedHabitCard = page.getByRole('listitem').filter({ hasText: habitName });
  547 |     await expect(archivedHabitCard).toBeVisible();
  548 |     const unarchiveButton = archivedHabitCard.getByRole('button', { name: `Unarchive ${habitName}` });
  549 |     await unarchiveButton.click();
  550 |     await expect(page.getByRole('listitem').filter({ hasText: habitName })).toHaveCount(1);
  551 |   });
  552 | 
  553 |   /**
  554 |    * TC29: HabitCard - mark habit as done disables mark done button
  555 |    */
  556 |   test('TC29 - HabitCard - mark habit as done disables mark done button', async ({ page }) => {
  557 |     await page.goto('/');
  558 |     const habitName = `Complete habit ${Date.now()}`;
  559 |     await page.getByLabel('New habit name').fill(habitName);
  560 |     await page.getByLabel('Habit category').selectOption('General');
  561 |     await page.getByLabel('Times per week').selectOption('7');
  562 |     await page.getByRole('button', { name: 'Add habit' }).click();
  563 |     const habitCard = page.getByRole('listitem').filter({ hasText: habitName });
  564 |     const markDoneButton = habitCard.getByRole('button', { name: 'Mark done', exact: true });
> 565 |     await markDoneButton.click();
      |                          ^ Error: locator.click: Test timeout of 60000ms exceeded.
  566 |     await expect(habitCard.getByRole('button', { name: 'Done today', exact: true })).toBeDisabled();
  567 |   });
  568 | 
  569 |   /**
  570 |    * TC30: Home - filter habits list by category changes displayed habits accordingly
  571 |    */
  572 |   test('TC30 - Home - filter habits list by category changes displayed habits accordingly', async ({ page }) => {
  573 |     await page.goto('/');
  574 |     const categoryFilter = page.getByLabel('Filter by category');
  575 |     await categoryFilter.selectOption('Health');
  576 |     await expect(categoryFilter).toHaveValue('Health');
  577 |   });
  578 | 
  579 |   /**
  580 |    * TC31: Home - toggling show archived checkbox updates displayed habits accordingly
  581 |    */
  582 |   test('TC31 - Home - toggling show archived checkbox updates displayed habits accordingly', async ({ page }) => {
  583 |     await page.goto('/');
  584 |     const showArchivedCheckbox = page.getByLabel('Show archived');
  585 |     await showArchivedCheckbox.check();
  586 |     await expect(showArchivedCheckbox).toBeChecked();
  587 |     await showArchivedCheckbox.uncheck();
  588 |     await expect(showArchivedCheckbox).not.toBeChecked();
  589 |   });
  590 | 
  591 |   /**
  592 |    * TC32: Home - Export JSON and Export CSV buttons are disabled when no habits exist and enabled after habits are created
  593 |    */
  594 |   test('TC32 - Home - Export JSON and Export CSV buttons are disabled when no habits exist and enabled after habits are created', async ({ page }) => {
  595 |     await page.goto('/');
  596 |     const exportJsonButton = page.getByRole('button', { name: 'Export JSON' });
  597 |     const exportCsvButton = page.getByRole('button', { name: 'Export CSV' });
  598 |     await expect(exportJsonButton).toBeDisabled();
  599 |     await expect(exportCsvButton).toBeDisabled();
  600 |     const habitName = `Habit for export ${Date.now()}`;
  601 |     await page.getByLabel('New habit name').fill(habitName);
  602 |     await page.getByRole('button', { name: 'Add habit' }).click();
  603 |     await expect(exportJsonButton).toBeEnabled();
  604 |     await expect(exportCsvButton).toBeEnabled();
  605 |   });
  606 | 
  607 |   /**
  608 |    * TC33: LogoutButton - logout button logs out and navigates to /login
  609 |    */
  610 |   test('TC33 - LogoutButton - logout button logs out and navigates to /login', async ({ page }) => {
  611 |     await page.goto('/');
  612 |     await page.getByRole('button', { name: 'Logout' }).click();
  613 |     await expect(page).toHaveURL('/login');
  614 |   });
  615 | 
  616 |   /**
  617 |    * TC34: Home page - page loads and displays unconditional controls
  618 |    */
  619 |   test('TC34 - Home page - page loads and displays unconditional controls', async ({ page }) => {
  620 |     await page.goto('/');
  621 |     await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
  622 |     await expect(page.getByLabel('New habit name')).toBeVisible();
  623 |     await expect(page.getByLabel('Habit category')).toBeVisible();
  624 |     await expect(page.getByLabel('Times per week')).toBeVisible();
  625 |     await expect(page.getByRole('button', { name: 'Add habit' })).toBeVisible();
  626 |     await expect(page.getByLabel('Search habits by name')).toBeVisible();
  627 |     await expect(page.getByLabel('Sort habits by')).toBeVisible();
  628 |     await expect(page.getByLabel('Filter by category')).toBeVisible();
  629 |     await expect(page.getByRole('checkbox', { name: 'Show archived' })).toBeVisible();
  630 |     await expect(page.getByRole('button', { name: /^Complete all for today/ })).toBeVisible();
  631 |   });
  632 | 
  633 |   /**
  634 |    * TC35: HabitForm - add new habit successfully resets form
  635 |    */
  636 |   test('TC35 - HabitForm - add new habit successfully resets form', async ({ page }) => {
  637 |     await page.goto('/');
  638 |     const nameInput = page.getByLabel('New habit name');
  639 |     const categorySelect = page.getByLabel('Habit category');
  640 |     const timesSelect = page.getByLabel('Times per week');
  641 |     const notesInput = page.getByLabel('Notes (optional)');
  642 |     await nameInput.fill('Test habit ' + Date.now());
  643 |     await categorySelect.selectOption('Health');
  644 |     await timesSelect.selectOption('3');
  645 |     await notesInput.fill('Notes for testing');
  646 |     await page.getByRole('button', { name: 'Add habit' }).click();
  647 |     await expect(nameInput).toHaveValue('');
  648 |     await expect(notesInput).toHaveValue('');
  649 |   });
  650 | 
  651 |   /**
  652 |    * TC36: HabitCard - edit habit and save changes updates displayed name and disables save button when empty
  653 |    */
  654 |   test('TC36 - HabitCard - edit habit and save changes updates displayed name and disables save button when empty', async ({ page }) => {
  655 |     await page.goto('/');
  656 |     const habitName = `HabitEdit ${Date.now()}`;
  657 |     await page.getByLabel('New habit name').fill(habitName);
  658 |     await page.getByRole('button', { name: 'Add habit' }).click();
  659 |     const card = page.getByRole('listitem').filter({ hasText: habitName });
  660 |     const editButton = card.getByRole('button', { name: `Edit ${habitName}` });
  661 |     await editButton.click();
  662 |     const nameInput = page.getByLabel(`Edit name for ${habitName}`);
  663 |     await expect(nameInput).toHaveValue(habitName);
  664 |     const categorySelect = page.getByLabel(`Edit category for ${habitName}`);
  665 |     const timesSelect = page.getByLabel(`Edit times per week for ${habitName}`);
```