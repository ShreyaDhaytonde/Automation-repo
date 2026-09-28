import { test, expect } from '@playwright/test';

test.describe('Settings', () => {
  test.setTimeout(60000);

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 1: Settings
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC01: Settings page - loads and displays static elements
   */
  test('TC01 - Settings page - loads and displays static elements', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();
    await expect(page.getByRole('link', { name: '← Back to home page' })).toBeVisible();
    await expect(page.getByRole('combobox', { name: 'Default weekly target' })).toBeVisible();
  });

  /**
   * TC02: Settings page - change weekly target updates select and shows saved message
   */
  test('TC02 - Settings page - change weekly target updates select and shows saved message', async ({ page }) => {
    await page.goto('/settings');
    const select = page.getByRole('combobox', { name: 'Default weekly target' });
    await select.selectOption('3');
    await expect(select).toHaveValue('3');
    await expect(page.getByText('Saved.')).toBeVisible();
  });

  /**
   * TC03: Settings - page loads and renders default elements
   */
  test('TC03 - Settings - page loads and renders default elements', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();
    await expect(page.getByText('Defaults used when you add a new habit.')).toBeVisible();
    await expect(page.getByRole('link', { name: '← Back to home page' })).toBeVisible();
    await expect(page.getByRole('combobox', { name: 'Default weekly target' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Switch to dark mode', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
  });

  /**
   * TC04: Settings - changing default weekly target saves preference and shows saved message
   */
  test('TC04 - Settings - changing default weekly target saves preference and shows saved message', async ({ page }) => {
    await page.goto('/settings');
    const select = page.getByRole('combobox', { name: 'Default weekly target' });
    const initialValue = await select.inputValue();
    const newValue = initialValue === '7' ? '1' : '7';
    await select.selectOption(newValue);
    await expect(select).toHaveValue(newValue);
    await expect(page.getByText('Saved.')).toBeVisible();
  });

});
