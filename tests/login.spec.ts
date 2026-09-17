import { test, expect } from '@playwright/test';

test.describe('Login', () => {
  test.setTimeout(60000);

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 1: Page load
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC01: LoginPage - initial render shows login form with name and password fields and sign in button
   */
  test('TC01 - LoginPage - initial render shows login form with name and password fields and sign in button', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('heading', { name: 'Habit Tracker' })).toBeVisible();
    await expect(page.getByText('Sign in to continue.')).toBeVisible();
    await expect(page.getByLabel('Name')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();
    await expect(page.getByText('Invalid username or password.')).toHaveCount(0);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 2: Login validation
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC02: LoginPage - invalid login shows error message without navigation
   */
  test('TC02 - LoginPage - invalid login shows error message without navigation', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Name').fill('Wrong');
    await page.getByLabel('Password').fill('invalid');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.getByText('Invalid username or password.')).toBeVisible();
    await expect(page).toHaveURL('/login');
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 3: Login
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC03: Login Page - successful login navigates to home
   */
  test('TC03 - Login Page - successful login navigates to home', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Name').fill('Shreya');
    await page.getByLabel('Password').fill('Shreya#23');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.waitForURL('/');
    const cookies = await page.context().cookies();
    const authCookie = cookies.find(cookie => cookie.name === 'habit_auth');
    expect(authCookie).toBeTruthy();
    expect(authCookie?.value).toBe('1');
  });

});
