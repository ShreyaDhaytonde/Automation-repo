# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: history.spec.ts >> History >> TC01 - History - page loads and renders unconditional elements
- Location: tests/history.spec.ts:13:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('button', { name: 'Toggle theme' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('button', { name: 'Toggle theme' }) with timeout 10000ms
  - waiting for getByRole('button', { name: 'Toggle theme' })

```

```yaml
- main:
  - heading "History" [level=1]
  - paragraph: Last 28 days for each habit.
  - button "Switch to dark mode": 🌙 Dark
  - button "Logout"
  - link "← Back to habits":
    - /url: /
  - text: Done Frozen Missed
  - paragraph: No habits yet — add one to see its history here.
- alert
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('History', () => {
  4   |   test.setTimeout(60000);
  5   | 
  6   |   // ──────────────────────────────────────────────────────────────────────────
  7   |   // SECTION 1: Page load and static content
  8   |   // ──────────────────────────────────────────────────────────────────────────
  9   | 
  10  |   /**
  11  |    * TC01: History - page loads and renders unconditional elements
  12  |    */
  13  |   test('TC01 - History - page loads and renders unconditional elements', async ({ page }) => {
  14  |     await page.goto('/history');
  15  |     await expect(page.getByRole('heading', { name: 'History' })).toBeVisible();
  16  |     await expect(page.getByText('Last 28 days for each habit.')).toBeVisible();
  17  |     await expect(page.getByRole('link', { name: '← Back to habits' })).toBeVisible();
  18  |     await expect(page.getByText('Done')).toBeVisible();
  19  |     await expect(page.getByText('Frozen')).toBeVisible();
  20  |     await expect(page.getByText('Missed')).toBeVisible();
> 21  |     await expect(page.getByRole('button', { name: 'Toggle theme' })).toBeVisible();
      |                                                                      ^ Error: expect(locator).toBeVisible() failed
  22  |     await expect(page.getByRole('button', { name: 'Log out' })).toBeVisible();
  23  |   });
  24  | 
  25  |   // ──────────────────────────────────────────────────────────────────────────
  26  |   // SECTION 2: Tracked habit count display
  27  |   // ──────────────────────────────────────────────────────────────────────────
  28  | 
  29  |   /**
  30  |    * TC02: History - shows tracked habit count when habits exist
  31  |    */
  32  |   test('TC02 - History - shows tracked habit count when habits exist', async ({ page }) => {
  33  |     await page.goto('/history');
  34  |     await expect(page.getByRole('list')).toBeVisible();
  35  |     const habitCountText = await page.locator('p.text-xs.text-zinc-400').textContent();
  36  |     await expect(habitCountText).toMatch(/\d+ habit(s)? tracked/);
  37  |   });
  38  | 
  39  |   // ──────────────────────────────────────────────────────────────────────────
  40  |   // SECTION 3: Empty state
  41  |   // ──────────────────────────────────────────────────────────────────────────
  42  | 
  43  |   /**
  44  |    * TC03: History - shows empty state message when no habits exist
  45  |    */
  46  |   test('TC03 - History - shows empty state message when no habits exist', async ({ page }) => {
  47  |     await page.goto('/history');
  48  |     // Filter to empty state by waiting for the empty message to appear
  49  |     await expect(page.getByText('No habits yet — add one to see its history here.')).toBeVisible();
  50  |   });
  51  | 
  52  |   // ──────────────────────────────────────────────────────────────────────────
  53  |   // SECTION 4: Loading and error states
  54  |   // ──────────────────────────────────────────────────────────────────────────
  55  | 
  56  |   /**
  57  |    * TC04: History - shows error message if loading habits fails
  58  |    */
  59  |   test('TC04 - History - shows error message if loading habits fails', async ({ page }) => {
  60  |     await page.goto('/history');
  61  |     // Note: Cannot reliably trigger error without backend control; this test asserts error message presence if it appears.
  62  |     const errorMessage = page.getByText('Could not load history. Is the API running?');
  63  |     if (await errorMessage.count() > 0) {
  64  |       await expect(errorMessage).toBeVisible();
  65  |     }
  66  |   });
  67  | 
  68  |   // ──────────────────────────────────────────────────────────────────────────
  69  |   // SECTION 5: History
  70  |   // ──────────────────────────────────────────────────────────────────────────
  71  | 
  72  |   /**
  73  |    * TC05: History page - shows loading state while fetching habits
  74  |    */
  75  |   test('TC05 - History page - shows loading state while fetching habits', async ({ page }) => {
  76  |     await page.goto('/history');
  77  |     await expect(page.getByText('Loading history…')).toBeVisible();
  78  |   });
  79  | 
  80  |   /**
  81  |    * TC06: History page - shows tracked habit count when habits exist
  82  |    */
  83  |   test('TC06 - History page - shows tracked habit count when habits exist', async ({ page }) => {
  84  |     await page.goto('/history');
  85  |     const habitCountLocator = page.locator('p.text-xs.text-zinc-400');
  86  |     if (await habitCountLocator.count() > 0) {
  87  |       const text = await habitCountLocator.textContent();
  88  |       await expect(text).toMatch(/\d+ habit(s)? tracked/);
  89  |     }
  90  |   });
  91  | 
  92  |   /**
  93  |    * TC07: History page - shows empty state when no habits exist
  94  |    */
  95  |   test('TC07 - History page - shows empty state when no habits exist', async ({ page }) => {
  96  |     await page.goto('/history');
  97  |     const emptyMessage = page.getByText('No habits yet — add one to see its history here.');
  98  |     if (await emptyMessage.count() > 0) {
  99  |       await expect(emptyMessage).toBeVisible();
  100 |     }
  101 |   });
  102 | 
  103 |   /**
  104 |    * TC08: History page - navigate back to habits
  105 |    */
  106 |   test('TC08 - History page - navigate back to habits', async ({ page }) => {
  107 |     await page.goto('/history');
  108 |     await page.getByRole('link', { name: '← Back to habits' }).click();
  109 |     await expect(page).toHaveURL('/');
  110 |     await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
  111 |   });
  112 | 
  113 | });
  114 | 
```