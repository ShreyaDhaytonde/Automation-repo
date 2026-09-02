import { test, expect } from '@playwright/test';
import { HABITS_API_RE, mockCreateHabitSuccess } from './home.mocks';

test.describe('Home', () => {
  test.setTimeout(60000);

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 1: 
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC01: Habit Progress - shows progress correctly
   */
  test('TC01 - Habit Progress - shows progress correctly', async ({ page }) => {
    await mockCreateHabitSuccess(page);
    await page.goto('/');
    await expect(page.getByRole('progressbar', { name: 'Drink water weekly progress' })).toBeVisible();
    await expect(page.getByText('0/7 this week')).toBeVisible();
  });

  /**
   * TC02: Habit Card - displays progress correctly
   */
  test('TC02 - Habit Card - displays progress correctly', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('progressbar', { name: 'Drink water weekly progress' })).toHaveAttribute('aria-valuenow', '0');
    await expect(page.getByText('0/7 this week')).toBeVisible();
  });

  /**
   * TC03: Habit Card - updates progress on completion
   */
  test('TC03 - Habit Card - updates progress on completion', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('progressbar', { name: 'Drink water weekly progress' })).toHaveAttribute('aria-valuenow', '1');
    await expect(page.getByText('1/7 this week')).toBeVisible();
  });

  /**
   * TC04: Habit Form - successfully adding a new habit with target per week
   */
  test('TC04 - Habit Form - successfully adding a new habit with target per week', async ({ page }) => {
    await mockCreateHabitSuccess(page);
    await page.goto('/');
    await page.getByLabel('New habit name').fill('Drink water');
    await page.getByLabel('Habit category').selectOption('Health');
    await page.getByLabel('Times per week').selectOption('5');
    await page.getByRole('button', { name: 'Add habit' }).click();
    await expect(page.getByText('Drink water')).toBeVisible();
    await expect(page.getByText('Health')).toBeVisible();
    await expect(page.getByText('5/5 this week')).toBeVisible();
  });

  /**
   * TC05: Habit List - shows updated habits after adding
   */
  test('TC05 - Habit List - shows updated habits after adding', async ({ page }) => {
    await mockCreateHabitSuccess(page);
    await page.goto('/');
    await page.getByLabel('New habit name').fill('Drink water');
    await page.getByLabel('Habit category').selectOption('Health');
    await page.getByLabel('Times per week').selectOption('5');
    await page.getByRole('button', { name: 'Add habit' }).click();
    await expect(page.getByText('1/5 this week')).toBeVisible();
  });

  /**
   * TC06: Habit Card - confirm before removing a habit
   */
  test('TC06 - Habit Card - confirm before removing a habit', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Remove' }).click();
    await expect(page.getByText('Remove "Drink water"? This can’t be undone.')).toBeVisible();
  });

  /**
   * TC07: Habit Card - successfully remove a habit
   */
  test('TC07 - Habit Card - successfully remove a habit', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Remove' }).click();
    await page.getByRole('button', { name: 'OK' }).click();
    await expect(page.getByText('Drink water')).not.toBeVisible();
  });

  /**
   * TC08: Habit List - displays habits correctly
   */
  test('TC08 - Habit List - displays habits correctly', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Drinking water')).toBeVisible();
    await expect(page.getByText('Health')).toBeVisible();
    await expect(page.getByText('5/5 this week')).toBeVisible();
  });

  /**
   * TC09: Habit Card - not removing without confirmation
   */
  test('TC09 - Habit Card - not removing without confirmation', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Remove' }).click();
    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(page.getByText('Drink water')).toBeVisible();
  });

  /**
   * TC10: Habit Form - successfully create a new habit
   */
  test('TC10 - Habit Form - successfully create a new habit', async ({ page }) => {
    await mockCreateHabitSuccess(page);
    await page.goto('/');
    await page.getByLabel('New habit name').fill('Drink water');
    await page.getByLabel('Habit category').selectOption('Health');
    await page.getByLabel('Times per week').selectOption('3');
    await page.getByRole('button', { name: 'Add habit' }).click();
    await expect(page.getByText('Drink water')).toBeVisible();
  });

  /**
   * TC11: Habit List - shows loading state during fetch
   */
  test('TC11 - Habit List - shows loading state during fetch', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Loading habits…')).toBeVisible();
  });

  /**
   * TC12: Habit Card - confirm before deleting a habit
   */
  test('TC12 - Habit Card - confirm before deleting a habit', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByLabel('Delete Drink water')).toBeVisible();
    await page.getByLabel('Delete Drink water').click();
    await expect(page.locator('text=Remove "Drink water"? This can\'t be undone.')).toBeVisible();
  });

  /**
   * TC13: Habit Card - delete habit after confirmation
   */
  test('TC13 - Habit Card - delete habit after confirmation', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel('Delete Drink water').click();
    await page.getByText('Remove "Drink water"? This can\'t be undone.').click();
    await expect(page.getByText('Drink water')).not.toBeVisible();
  });

  /**
   * TC14: Habit Card - completes habit and updates the progress bar
   */
  test('TC14 - Habit Card - completes habit and updates the progress bar', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Drink water').click();
    await expect(page.getByText('🎉 Goal reached')).toBeVisible();
  });

  /**
   * TC15: Habit Form - prevent submitting empty habit name
   */
  test('TC15 - Habit Form - prevent submitting empty habit name', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel('New habit name').fill('');
    await expect(page.getByRole('button', { name: 'Add habit' })).toBeDisabled();
  });

  /**
   * TC16: Habit List - shows error on failed fetch
   */
  test('TC16 - Habit List - shows error on failed fetch', async ({ page }) => {
    await page.goto('/');
    await page.route('/habits', route => route.abort());
    await expect(page.getByText('Could not load habits. Is the API running?')).toBeVisible();
  });

  /**
   * TC17: Habit Card - prevent completing an already completed habit
   */
  test('TC17 - Habit Card - prevent completing an already completed habit', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Drink water').click();
    await expect(page.getByLabel('Mark done')).toBeDisabled();
  });

  /**
   * TC18: Home - renders Ticket Stats component
   */
  test('TC18 - Home - renders Ticket Stats component', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Ticket Stats')).toBeVisible();
  });

  /**
   * TC19: Habit Form - valid habit creation
   */
  test('TC19 - Habit Form - valid habit creation', async ({ page }) => {
    await mockCreateHabitSuccess(page);
    await page.goto('/');
    await page.getByLabel('New habit name').fill('Read more books');
    await page.getByLabel('Habit category').selectOption('Health');
    await page.getByLabel('Times per week').selectOption('3');
    await page.getByRole('button', { name: 'Add habit' }).click();
    await expect(page.getByText('Read more books')).toBeVisible();
  });

  /**
   * TC20: Habit Card - zero-day streak displays friendly message
   */
  test('TC20 - Habit Card - zero-day streak displays friendly message', async ({ page }) => {
    await mockCreateHabitSuccess(page);
    await page.goto('/');
    await page.getByLabel('New habit name').fill('Go to gym');
    await page.getByLabel('Habit category').selectOption('Personal');
    await page.getByLabel('Times per week').selectOption('5');
    await page.getByRole('button', { name: 'Add habit' }).click();
    await expect(page.getByText('Start your streak today')).toBeVisible();
  });

  /**
   * TC21: Habit Card - goal reached badge appears
   */
  test('TC21 - Habit Card - goal reached badge appears', async ({ page }) => {
    await mockCreateHabitSuccess(page);
    await page.goto('/');
    await page.getByLabel('New habit name').fill('Study');
    await page.getByLabel('Habit category').selectOption('Learning');
    await page.getByLabel('Times per week').selectOption('2');
    await page.getByRole('button', { name: 'Add habit' }).click();
    await page.getByRole('button', { name: 'Mark done' }).click();
    await page.getByRole('button', { name: 'Mark done' }).click();
    await expect(page.getByText('🎉 Goal reached')).toBeVisible();
  });

  /**
   * TC22: Habit Card - error message when API fails
   */
  test('TC22 - Habit Card - error message when API fails', async ({ page }) => {
    await page.goto('/');
    await mockCreateHabitSuccess(page);
    await page.getByLabel('New habit name').fill('Failing habit');
    await page.getByLabel('Habit category').selectOption('Work');
    await page.getByLabel('Times per week').selectOption('4');
    await page.getByRole('button', { name: 'Add habit' }).click();
    await expect(page.getByText('Could not load habits. Is the API running?')).toBeVisible();
  });

  /**
   * TC23: Habit Form - submit without name
   */
  test('TC23 - Habit Form - submit without name', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel('New habit name').fill('');
    await page.getByRole('button', { name: 'Add habit' }).click();
    await expect(page.getByText('Please enter a habit name.')).toBeVisible();
  });

  /**
   * TC24: Habit Card - goal not reached message
   */
  test('TC24 - Habit Card - goal not reached message', async ({ page }) => {
    await mockCreateHabitSuccess(page);
    await page.goto('/');
    await page.getByLabel('New habit name').fill('Sample Habit');
    await page.getByLabel('Habit category').selectOption('General');
    await page.getByLabel('Times per week').selectOption('4');
    await page.getByRole('button', { name: 'Add habit' }).click();
    await expect(page.getByText('0/4 this week')).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 2: Habit Creation
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC25: Habit Form - Successful habit creation
   */
  test('TC25 - Habit Form - Successful habit creation', async ({ page }) => {
    await mockCreateHabitSuccess(page);
    await page.goto('/');
    await page.getByLabel('New habit name').fill('Drink water');
    await page.getByLabel('Habit category').selectOption('General');
    await page.getByLabel('Times per week').selectOption('7');
    await page.getByRole('button', { name: 'Add habit' }).click();
    await expect(page.getByText('Drink water')).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 3: Goal Badge Visibility
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC26: Habit Card - Displays goal reached badge
   */
  test('TC26 - Habit Card - Displays goal reached badge', async ({ page }) => {
    await mockCreateHabitSuccess(page);
    await page.goto('/');
    await page.getByLabel('New habit name').fill('Exercise');
    await page.getByLabel('Habit category').selectOption('General');
    await page.getByLabel('Times per week').selectOption('1');
    await page.getByRole('button', { name: 'Add habit' }).click();
    const habitCard = page.locator('role= listitem').filter({ hasText: 'Exercise' });
    await habitCard.getByRole('button', { name: 'Mark done' }).click();
    await expect(habitCard.getByText('🎉 Goal reached')).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 4: Habit Removal Confirmation
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC27: Habit Card - Confirm before habit removal
   */
  test('TC27 - Habit Card - Confirm before habit removal', async ({ page }) => {
    await mockCreateHabitSuccess(page);
    await page.goto('/');
    await page.getByLabel('New habit name').fill('Exercise');
    await page.getByLabel('Habit category').selectOption('General');
    await page.getByLabel('Times per week').selectOption('1');
    await page.getByRole('button', { name: 'Add habit' }).click();
    const habitCard = page.locator('role= listitem').filter({ hasText: 'Exercise' });
    await habitCard.getByRole('button', { name: 'Remove' }).click();
    await expect(page.locator('text=Remove "Exercise"? This can’t be undone.')).toBeVisible();
  });

  /**
   * TC28: Habit Card - Cancel habit removal confirmation
   */
  test('TC28 - Habit Card - Cancel habit removal confirmation', async ({ page }) => {
    await mockCreateHabitSuccess(page);
    await page.goto('/');
    await page.getByLabel('New habit name').fill('Exercise');
    await page.getByLabel('Habit category').selectOption('General');
    await page.getByLabel('Times per week').selectOption('1');
    await page.getByRole('button', { name: 'Add habit' }).click();
    const habitCard = page.locator('role= listitem').filter({ hasText: 'Exercise' });
    await habitCard.getByRole('button', { name: 'Remove' }).click();
    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(habitCard).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 5: Habit Creation
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC29: Habit Form - Empty habit name submission
   */
  test('TC29 - Habit Form - Empty habit name submission', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel('New habit name').fill('');
    await page.getByRole('button', { name: 'Add habit' }).click();
    await expect(page.getByLabel('New habit name')).toHaveClass(/is-invalid/);
  });

  /**
   * TC30: Habit Form - Invalid weekly target submission
   */
  test('TC30 - Habit Form - Invalid weekly target submission', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel('New habit name').fill('Drink water');
    await page.getByLabel('Habit category').selectOption('General');
    await page.getByLabel('Times per week').selectOption('8');
    await page.getByRole('button', { name: 'Add habit' }).click();
    await expect(page.getByText('Invalid weekly target')).toBeVisible();
  });

});
