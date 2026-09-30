import { test, expect } from '@playwright/test';

test.describe('Settings', () => {
  test.setTimeout(60000);

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 1: Settings page load
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC01: Settings - page loads and displays all default controls
   */
  test('TC01 - Settings - page loads and displays all default controls', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();
    await expect(page.getByRole('link', { name: '← Back to home page' })).toBeVisible();
    await expect(page.getByLabel('Default weekly target')).toBeVisible();
    await expect(page.getByLabel('Daily reminder time')).toBeVisible();
    await expect(page.getByLabel('Play sound on completion')).toBeVisible();
    await expect(page.getByLabel('Week starts on Monday')).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 2: Weekly target
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC02: Settings - change default weekly target and save
   */
  test('TC02 - Settings - change default weekly target and save', async ({ page }) => {
    await page.goto('/settings');
    const select = page.getByLabel('Default weekly target');
    await select.selectOption('3');
    await expect(page.getByRole('status')).toHaveText('Saved.');
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 3: Daily reminder
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC03: Settings - change daily reminder time and save
   */
  test('TC03 - Settings - change daily reminder time and save', async ({ page }) => {
    await page.goto('/settings');
    const timeInput = page.getByLabel('Daily reminder time');
    await timeInput.fill('08:30');
    await expect(page.getByRole('status')).toHaveText('Saved.');
    await expect(page.getByText('Reminder time: 08:30')).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 4: Completion sound toggle
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC04: Settings - toggle play sound on completion checkbox
   */
  test('TC04 - Settings - toggle play sound on completion checkbox', async ({ page }) => {
    await page.goto('/settings');
    const soundCheckbox = page.getByLabel('Play sound on completion');
    const initialChecked = await soundCheckbox.isChecked();
    if (initialChecked) {
      await soundCheckbox.uncheck();
      await expect(soundCheckbox).not.toBeChecked();
    } else {
      await soundCheckbox.check();
      await expect(soundCheckbox).toBeChecked();
    }
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 5: Week start day toggle
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC05: Settings - toggle week starts on Monday checkbox
   */
  test('TC05 - Settings - toggle week starts on Monday checkbox', async ({ page }) => {
    await page.goto('/settings');
    const weekStartCheckbox = page.getByLabel('Week starts on Monday');
    const initialChecked = await weekStartCheckbox.isChecked();
    if (initialChecked) {
      await weekStartCheckbox.uncheck();
      await expect(weekStartCheckbox).not.toBeChecked();
    } else {
      await weekStartCheckbox.check();
      await expect(weekStartCheckbox).toBeChecked();
    }
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 6: Settings
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC06: Settings page - change weekly target updates select and shows saved message
   */
  test('TC06 - Settings page - change weekly target updates select and shows saved message', async ({ page }) => {
    await page.goto('/settings');
    const select = page.getByRole('combobox', { name: 'Default weekly target' });
    await select.selectOption('3');
    await expect(select).toHaveValue('3');
    await expect(page.getByText('Saved.')).toBeVisible();
  });

  /**
   * TC07: Settings - page loads and renders default elements
   */
  test('TC07 - Settings - page loads and renders default elements', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();
    await expect(page.getByText('Defaults used when you add a new habit.')).toBeVisible();
    await expect(page.getByRole('link', { name: '← Back to home page' })).toBeVisible();
    await expect(page.getByRole('combobox', { name: 'Default weekly target' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Switch to dark mode', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
  });

  /**
   * TC08: Settings - changing default weekly target saves preference and shows saved message
   */
  test('TC08 - Settings - changing default weekly target saves preference and shows saved message', async ({ page }) => {
    await page.goto('/settings');
    const select = page.getByRole('combobox', { name: 'Default weekly target' });
    const initialValue = await select.inputValue();
    const newValue = initialValue === '7' ? '1' : '7';
    await select.selectOption(newValue);
    await expect(select).toHaveValue(newValue);
    await expect(page.getByText('Saved.')).toBeVisible();
  });

});
