import { test, expect } from '@playwright/test';

test.describe('Button Component', () => {
  test('should render a filled button with default label', async ({ page }) => {
    await page.goto('http://localhost:51505/iframe.html?id=components-buttons--filled');
    const button = page.getByRole('button', { name: 'Filled' });
    await expect(button).toBeVisible();
    await expect(button).toHaveClass(/button--filled/);
  });

  test('should render icon and label correctly', async ({ page }) => {
    await page.goto('http://localhost:51505/iframe.html?id=components-buttons--icon');
    const icon = page.locator('.button__icon');
    const label = page.locator('.button__label');
    await expect(icon).toBeVisible();
    await expect(label).toHaveText('Icon');
  });

  test('should fire onClick handler when clicked', async ({ page }) => {
    await page.goto('http://localhost:51505/iframe.html?id=components-buttons--clickable');
    const button = page.getByRole('button');
    await button.click();
    const result = page.locator('#click-result');
    await expect(result).toHaveText('Clicked!');
  });

  test('should render as a link when href is provided', async ({ page }) => {
    await page.goto('http://localhost:51505/iframe.html?id=components-buttons--as-link');
    const link = page.getByRole('link');
    await expect(link).toHaveAttribute('href', '/dashboard');
    await expect(link).toHaveClass(/button--filled/);
  });

  test('should be disabled when disabled prop is set', async ({ page }) => {
    await page.goto('http://localhost:51505/iframe.html?id=components-buttons--disabled');
    const button = page.getByRole('button', { name: 'Disabled' });
    await expect(button).toBeDisabled();
  });

  test('should show fallback text when no children or icon are provided', async ({ page }) => {
    await page.goto('http://localhost:51505/iframe.html?id=components-buttons--empty');
    const button = page.getByRole('button');
    await expect(button).toHaveText('Button');
  });

  test('should apply layout and fullWidth styles', async ({ page }) => {
    await page.goto('http://localhost:51505/iframe.html?id=components-buttons--layout');
    const button = page.getByRole('button');
    await expect(button).toHaveClass(/layout--horizontal/);
    await expect(button).toHaveClass(/button--fullWidth/);
  });
});
