import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:65161/iframe.html';
const WAIT_FOR = 30_000;

test.describe('components/text-field', () => {
  test('should render filled variant correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}?id=components-textfield--filled`);
    await page.waitForLoadState('networkidle');

    const input = page.getByTestId('textfield-input');
    await input.waitFor({ state: 'visible', timeout: WAIT_FOR });

    await expect(input).toBeVisible();
    await expect(input).toBeEditable();
    await expect(page.getByText('Username')).toBeVisible();
    await expect(input).toHaveAttribute('placeholder', 'Enter your username');
  });

  test('should render outlined variant correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}?id=components-textfield--outlined`);
    await page.waitForLoadState('networkidle');

    const input = page.getByTestId('textfield-input');
    await input.waitFor({ state: 'visible', timeout: WAIT_FOR });

    await expect(input).toBeVisible();
    await expect(input).toBeEditable();
    await expect(page.getByText('Email Address')).toBeVisible();
    await expect(input).toHaveAttribute('placeholder', 'Enter your email');
  });

  test('should render with supporting text correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}?id=components-textfield--with-supporting-text`);
    await page.waitForLoadState('networkidle');

    const input = page.getByTestId('textfield-input');
    await expect(input).toBeVisible();
    await expect(page.getByText('Full Name')).toBeVisible();
    await expect(page.getByText('Enter your first and last name')).toBeVisible();
  });

  test('should render error state correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}?id=components-textfield--error-state`);
    await page.waitForLoadState('networkidle');

    const input = page.getByTestId('textfield-input');
    await expect(input).toBeVisible();
    await expect(page.locator('label').filter({ hasText: 'Password' }).first()).toBeVisible();
    await expect(page.getByText('Password must be at least 8 characters long')).toBeVisible();
  });

  test('should render required field correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}?id=components-textfield--required`);
    await page.waitForLoadState('networkidle');

    const input = page.getByTestId('textfield-input');
    await expect(input).toBeVisible();
    await expect(page.getByText('Required Field')).toBeVisible();
  });

  test('should render disabled field correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}?id=components-textfield--disabled`);
    await page.waitForLoadState('networkidle');

    const input = page.getByTestId('textfield-input');
    await expect(input).toBeVisible();
    await expect(input).toBeDisabled();
    await expect(page.getByText('Disabled Field')).toBeVisible();
  });

  test('should render read-only field correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}?id=components-textfield--read-only`);
    await page.waitForLoadState('networkidle');

    const input = page.getByTestId('textfield-input');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('readonly');
    await expect(page.getByText('Read Only Field')).toBeVisible();
  });

  test('should render with counter correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}?id=components-textfield--with-counter`);
    await page.waitForLoadState('networkidle');

    const input = page.getByTestId('textfield-input');
    await expect(input).toBeVisible();
    await expect(page.locator('label').filter({ hasText: 'Description' })).toBeVisible();
    await expect(page.getByText('Maximum 100 characters')).toBeVisible();
  });

  test('should render with prefix and suffix correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}?id=components-textfield--with-prefix-suffix`);
    await page.waitForLoadState('networkidle');

    const input = page.getByTestId('textfield-input');
    await expect(input).toBeVisible();
    await expect(page.getByText('Price')).toBeVisible();
    await expect(page.getByText('$')).toBeVisible();
    await expect(page.getByText('USD')).toBeVisible();
  });

  test('should render with leading icon correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}?id=components-textfield--with-leading-icon`);
    await page.waitForLoadState('networkidle');

    const input = page.getByTestId('textfield-input');
    await expect(input).toBeVisible();
    await expect(page.getByText('Search')).toBeVisible();
  });

  test('should render with trailing icon correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}?id=components-textfield--with-trailing-icon`);
    await page.waitForLoadState('networkidle');

    const icon = page.locator('.field.text .icon--trailing');
    await expect(icon).toBeVisible();
  });

  test('should render phone number format correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}?id=components-textfield--phone-number`);
    await page.waitForLoadState('networkidle');

    const input = page.getByTestId('textfield-input');
    await expect(input).toBeVisible();
    await expect(page.getByText('Phone Number')).toBeVisible();
    await expect(page.getByText('+1')).toBeVisible();
  });

  test('should render website URL format correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}?id=components-textfield--website-url`);
    await page.waitForLoadState('networkidle');

    const input = page.getByTestId('textfield-input');
    await expect(input).toBeVisible();
    await expect(page.getByText('Website')).toBeVisible();
    await expect(page.getByText('https://')).toBeVisible();
  });

  test('should handle typing correctly (uncontrolled)', async ({ page }) => {
    await page.goto(`${BASE_URL}?id=components-textfield--filled`);
    await page.waitForLoadState('networkidle');

    const input = page.getByTestId('textfield-input');
    await input.fill('New Value');
    await expect(input).toHaveValue('New Value');
  });

  test.describe('Input Types', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`${BASE_URL}?id=components-textfield--input-types`);
      await page.waitForLoadState('networkidle');
    });

    test('should render all input types', async ({ page }) => {
      await expect(page.locator('label').filter({ hasText: 'Text' }).first()).toBeVisible();
      await expect(page.locator('label').filter({ hasText: 'Email' })).toBeVisible();
      await expect(page.locator('label').filter({ hasText: 'Password' }).first()).toBeVisible();
      await expect(page.locator('label').filter({ hasText: 'Phone' })).toBeVisible();
      await expect(page.locator('label').filter({ hasText: 'URL' })).toBeVisible();
      await expect(page.locator('label').filter({ hasText: 'Search' })).toBeVisible();
      await expect(page.locator('label').filter({ hasText: 'Number' })).toBeVisible();
    });
  });

  test.describe('Interactive States', () => {
    test('should render normal state', async ({ page }) => {
      await page.goto(`${BASE_URL}?id=components-textfield--normal-state`);
      await page.waitForLoadState('networkidle');
      const container = page.locator('.field.text');
      await expect(container).not.toHaveClass(/focused/);
      await expect(container).not.toHaveClass(/error/);
    });

    test('should render focus state', async ({ page }) => {
      await page.goto(`${BASE_URL}?id=components-textfield--focused-state`);
      await page.waitForLoadState('networkidle');
      const container = page.locator('.field.text');
      await expect(container).toHaveClass(/focused/);
    });

    test('should render error state (manual)', async ({ page }) => {
      await page.goto(`${BASE_URL}?id=components-textfield--error-state-manual`);
      await page.waitForLoadState('networkidle');
      const container = page.locator('.field.text');
      await expect(container).toHaveClass(/error/);
    });

    test('should render disabled state (manual)', async ({ page }) => {
      await page.goto(`${BASE_URL}?id=components-textfield--disabled-state`);
      await page.waitForLoadState('networkidle');
      const container = page.locator('.field.text');
      await expect(container).toHaveClass(/disabled/);
    });
  });
});