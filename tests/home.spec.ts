import { test, expect } from '@playwright/test';

test.describe('Home', () => {
  test.setTimeout(60000);

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 1: Home page
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC01: Home page - page loads and renders unconditional elements
   */
  test('TC01 - Home page - page loads and renders unconditional elements', async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Habit Tracker" })).toBeVisible();
    await expect(page.getByText("Build small daily habits, one day at a time.")).toBeVisible();
    await expect(page.getByLabel("Filter by category")).toBeVisible();
    await expect(page.getByLabel("Filter by category").locator("option").first()).toHaveText("All");
    for (const category of ["General", "Health", "Work", "Personal", "Learning"]) {
      await expect(page.getByLabel("Filter by category").locator("option").filter({ hasText: category })).toHaveCount(1);
    }
    await expect(page.getByRole("textbox", { name: "New habit name" })).toBeVisible();
    await expect(page.getByLabel("Habit category")).toBeVisible();
    for (const category of ["General", "Health", "Work", "Personal", "Learning"]) {
      await expect(page.getByLabel("Habit category").locator("option").filter({ hasText: category })).toHaveCount(1);
    }
    await expect(page.getByLabel("Times per week")).toBeVisible();
    for (const n of ["1x / week","2x / week","3x / week","4x / week","5x / week","6x / week","7x / week"]) {
      await expect(page.getByLabel("Times per week").locator("option").filter({ hasText: n })).toHaveCount(1);
    }
    await expect(page.getByRole("button", { name: "Add habit" })).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 2: Habit creation
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC02: HabitForm - successful habit creation adds new habit to list
   */
  test('TC02 - HabitForm - successful habit creation adds new habit to list', async ({ page }) => {
    await page.goto("/");
    const habitName = `Test habit create ${Date.now()}`;
    await page.getByRole("textbox", { name: "New habit name" }).fill(habitName);
    await page.getByLabel("Habit category").selectOption("General");
    await page.getByLabel("Times per week").selectOption("3");
    await page.getByRole("button", { name: "Add habit" }).click();
    const habitCard = page.getByRole("listitem").filter({ hasText: habitName });
    await expect(habitCard).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 3: Habit editing
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC03: HabitCard - inline edit form displays when Edit button clicked and updates fields
   */
  test('TC03 - HabitCard - inline edit form displays when Edit button clicked and updates fields', async ({ page }) => {
    await page.goto("/");
    const habitName = `Edit habit ${Date.now()}`;
    await page.getByRole("textbox", { name: "New habit name" }).fill(habitName);
    await page.getByLabel("Habit category").selectOption("General");
    await page.getByLabel("Times per week").selectOption("3");
    await page.getByRole("button", { name: "Add habit" }).click();
    const habitCard = page.getByRole("listitem").filter({ hasText: habitName });
    await expect(habitCard).toBeVisible();
    const editButton = habitCard.getByRole("button", { name: `Edit ${habitName}` });
    await editButton.click();
    const editNameInput = page.getByLabel(`Edit name for ${habitName}`);
    const editCategorySelect = page.getByLabel(`Edit category for ${habitName}`);
    const editTimesSelect = page.getByLabel(`Edit times per week for ${habitName}`);
    await expect(editNameInput).toHaveValue(habitName);
    await expect(editCategorySelect).toHaveValue("General");
    await expect(editTimesSelect).toHaveValue("3");
    const newName = `${habitName} updated`;
    await editNameInput.fill(newName);
    await editCategorySelect.selectOption("Health");
    await editTimesSelect.selectOption("5");
    await page.getByRole("button", { name: "Save" }).click();
    const updatedHabitCard = page.getByRole("listitem").filter({ hasText: newName });
    await expect(updatedHabitCard).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 4: HabitForm validation
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC04: HabitForm - form validation disables Add habit button for empty name
   */
  test('TC04 - HabitForm - form validation disables Add habit button for empty name', async ({ page }) => {
    await page.goto("/");
    const input = page.getByRole("textbox", { name: "New habit name" });
    const addButton = page.getByRole("button", { name: "Add habit" });
    await input.fill("");
    await expect(addButton).toBeDisabled();
    await input.fill("   ");
    await expect(addButton).toBeDisabled();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 5: Habit editing
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC05: HabitCard - cancel edit closes inline form without saving changes
   */
  test('TC05 - HabitCard - cancel edit closes inline form without saving changes', async ({ page }) => {
    await page.goto("/");
    const habitName = `Cancel edit habit ${Date.now()}`;
    await page.getByRole("textbox", { name: "New habit name" }).fill(habitName);
    await page.getByLabel("Habit category").selectOption("General");
    await page.getByLabel("Times per week").selectOption("3");
    await page.getByRole("button", { name: "Add habit" }).click();
    const habitCard = page.getByRole("listitem").filter({ hasText: habitName });
    await expect(habitCard).toBeVisible();
    const editButton = habitCard.getByRole("button", { name: `Edit ${habitName}` });
    await editButton.click();
    const editNameInput = page.getByLabel(`Edit name for ${habitName}`);
    await editNameInput.fill("Changed name");
    await page.getByRole("button", { name: "Cancel" }).click();
    await expect(page.getByLabel(`Edit name for ${habitName}`)).toHaveCount(0);
    await expect(habitCard).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION 6: Habit editing validation
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * TC06: HabitCard - Save button disabled when name input is empty or blank
   */
  test('TC06 - HabitCard - Save button disabled when name input is empty or blank', async ({ page }) => {
    await page.goto("/");
    const habitName = `Edit validation habit ${Date.now()}`;
    await page.getByRole("textbox", { name: "New habit name" }).fill(habitName);
    await page.getByLabel("Habit category").selectOption("General");
    await page.getByLabel("Times per week").selectOption("3");
    await page.getByRole("button", { name: "Add habit" }).click();
    const habitCard = page.getByRole("listitem").filter({ hasText: habitName });
    await expect(habitCard).toBeVisible();
    const editButton = habitCard.getByRole("button", { name: `Edit ${habitName}` });
    await editButton.click();
    const saveButton = page.getByRole("button", { name: "Save" });
    await page.getByLabel(`Edit name for ${habitName}`).fill("");
    await expect(saveButton).toBeDisabled();
    await page.getByLabel(`Edit name for ${habitName}`).fill("   ");
    await expect(saveButton).toBeDisabled();
  });

});
