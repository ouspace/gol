import { test, expect } from '@playwright/test';

test.describe('TextField Component', () => {
  test('should render default outlined variant', async ({ page }) => {
    await page.goto('/iframe.html?id=components-textfield--outlined');
    const input = page.getByRole('textbox');
    await expect(input).toBeVisible();
    await expect(input).toHaveClass(/textfield--outlined/);
  });

  test('should show label and helper text', async ({ page }) => {
    await page.goto('/iframe.html?id=components-textfield--with-label');
    const label = page.locator('label');
    const helper = page.locator('.textfield__helper');
    await expect(label).toHaveText(/Username/i);
    await expect(helper).toHaveText(/Enter your username/i);
  });

  test('should show error message when invalid', async ({ page }) => {
    await page.goto('/iframe.html?id=components-textfield--error');
    const input = page.getByRole('textbox');
    const error = page.locator('.textfield__error');
    await expect(input).toHaveClass(/textfield--error/);
    await expect(error).toHaveText(/This field is required/i);
  });

  test('should allow typing text', async ({ page }) => {
    await page.goto('/iframe.html?id=components-textfield--outlined');
    const input = page.getByRole('textbox');
    await input.fill('Guido Test');
    await expect(input).toHaveValue('Guido Test');
  });

  test('should be disabled when disabled prop is set', async ({ page }) => {
    await page.goto('/iframe.html?id=components-textfield--disabled');
    const input = page.getByRole('textbox');
    await expect(input).toBeDisabled();
  });
});
