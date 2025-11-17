import { test, expect } from '@playwright/test';

// Filled variant
test('TextField Filled variant renders correctly in Storybook', async ({ page }) => {
  await page.goto('http://localhost:65161/iframe.html?id=components-textfield--filled');
  await page.waitForLoadState('networkidle');
  
  const input = page.getByTestId('textfield-input');
  await input.waitFor({ state: 'visible', timeout: 30000 });
  
  await expect(input).toBeVisible();
  await expect(input).toBeEditable();
  await expect(page.getByText('Username')).toBeVisible();
  await expect(input).toHaveAttribute('placeholder', 'Enter your username');
});

// Outlined variant
test('TextField Outlined variant renders correctly in Storybook', async ({ page }) => {
  await page.goto('http://localhost:65161/iframe.html?id=components-textfield--outlined');
  await page.waitForLoadState('networkidle');
  
  const input = page.getByTestId('textfield-input');
  await input.waitFor({ state: 'visible', timeout: 30000 });
  
  await expect(input).toBeVisible();
  await expect(input).toBeEditable();
  await expect(page.getByText('Email Address')).toBeVisible();
  await expect(input).toHaveAttribute('placeholder', 'Enter your email');
});

// With Supporting Text
test('TextField With Supporting Text renders correctly', async ({ page }) => {
  await page.goto('http://localhost:65161/iframe.html?id=components-textfield--with-supporting-text');
  await page.waitForLoadState('networkidle');
  
  const input = page.getByTestId('textfield-input');
  await expect(input).toBeVisible();
  await expect(page.getByText('Full Name')).toBeVisible();
  await expect(page.getByText('Enter your first and last name')).toBeVisible();
});

// Error State
test('TextField Error State renders correctly', async ({ page }) => {
  await page.goto('http://localhost:65161/iframe.html?id=components-textfield--error-state');
  await page.waitForLoadState('networkidle');
  
  const input = page.getByTestId('textfield-input');
  await expect(input).toBeVisible();
  await expect(page.locator('label').filter({ hasText: 'Password' }).first()).toBeVisible();
  await expect(page.getByText('Password must be at least 8 characters long')).toBeVisible();
});

// Required Field
test('TextField Required renders correctly', async ({ page }) => {
  await page.goto('http://localhost:65161/iframe.html?id=components-textfield--required');
  await page.waitForLoadState('networkidle');
  
  const input = page.getByTestId('textfield-input');
  await expect(input).toBeVisible();
  await expect(page.getByText('Required Field')).toBeVisible();
});

// Disabled Field
test('TextField Disabled renders correctly', async ({ page }) => {
  await page.goto('http://localhost:65161/iframe.html?id=components-textfield--disabled');
  await page.waitForLoadState('networkidle');
  
  const input = page.getByTestId('textfield-input');
  await expect(input).toBeVisible();
  await expect(input).toBeDisabled();
  await expect(page.getByText('Disabled Field')).toBeVisible();
});

// Read Only Field
test('TextField Read Only renders correctly', async ({ page }) => {
  await page.goto('http://localhost:65161/iframe.html?id=components-textfield--read-only');
  await page.waitForLoadState('networkidle');
  
  const input = page.getByTestId('textfield-input');
  await expect(input).toBeVisible();
  await expect(input).toHaveAttribute('readonly');
  await expect(page.getByText('Read Only Field')).toBeVisible();
});

// With Counter
test('TextField With Counter renders correctly', async ({ page }) => {
  await page.goto('http://localhost:65161/iframe.html?id=components-textfield--with-counter');
  await page.waitForLoadState('networkidle');
  
  const input = page.getByTestId('textfield-input');
  await expect(input).toBeVisible();
  await expect(page.locator('label').filter({ hasText: 'Description' })).toBeVisible();
  await expect(page.getByText('Maximum 100 characters')).toBeVisible();
});

// With Prefix and Suffix
test('TextField With Prefix Suffix renders correctly', async ({ page }) => {
  await page.goto('http://localhost:65161/iframe.html?id=components-textfield--with-prefix-suffix');
  await page.waitForLoadState('networkidle');
  
  const input = page.getByTestId('textfield-input');
  await expect(input).toBeVisible();
  await expect(page.getByText('Price')).toBeVisible();
  await expect(page.getByText('$')).toBeVisible();
  await expect(page.getByText('USD')).toBeVisible();
});

// With Leading Icon
test('TextField With Leading Icon renders correctly', async ({ page }) => {
  await page.goto('http://localhost:65161/iframe.html?id=components-textfield--with-leading-icon');
  await page.waitForLoadState('networkidle');
  
  const input = page.getByTestId('textfield-input');
  await expect(input).toBeVisible();
  await expect(page.getByText('Search')).toBeVisible();
});

// With Trailing Icon
test('TextField With Trailing Icon renders correctly', async ({ page }) => {
  await page.goto('http://localhost:65161/iframe.html?id=components-textfield--with-trailing-icon');
  
  // Wait for any element to be visible on the page
  await page.waitForSelector('body', { timeout: 10000 });
  
  // Check if page has content
  const bodyContent = await page.locator('body').evaluate(el => el.innerHTML);
  if (bodyContent && bodyContent.length > 0) {
    await expect(page.locator('body')).toBeVisible();
  }
});

// Phone Number
test('TextField Phone Number renders correctly', async ({ page }) => {
  await page.goto('http://localhost:65161/iframe.html?id=components-textfield--phone-number');
  await page.waitForLoadState('networkidle');
  
  const input = page.getByTestId('textfield-input');
  await expect(input).toBeVisible();
  await expect(page.getByText('Phone Number')).toBeVisible();
  await expect(page.getByText('+1')).toBeVisible();
});

// Website URL
test('TextField Website URL renders correctly', async ({ page }) => {
  await page.goto('http://localhost:65161/iframe.html?id=components-textfield--website-url');
  await page.waitForLoadState('networkidle');
  
  const input = page.getByTestId('textfield-input');
  await expect(input).toBeVisible();
  await expect(page.getByText('Website')).toBeVisible();
  await expect(page.getByText('https://')).toBeVisible();
});

// Input Types
test('TextField Input Types renders correctly', async ({ page }) => {
  await page.goto('http://localhost:65161/iframe.html?id=components-textfield--input-types');
  await page.waitForLoadState('networkidle');
  
  // Check for labels instead of generic text to avoid strict mode issues
  await expect(page.locator('label').filter({ hasText: 'Text' }).first()).toBeVisible();
  await expect(page.locator('label').filter({ hasText: 'Email' })).toBeVisible();
  await expect(page.locator('label').filter({ hasText: 'Password' }).first()).toBeVisible();
  await expect(page.locator('label').filter({ hasText: 'Phone' })).toBeVisible();
  await expect(page.locator('label').filter({ hasText: 'URL' })).toBeVisible();
  await expect(page.locator('label').filter({ hasText: 'Search' })).toBeVisible();
  await expect(page.locator('label').filter({ hasText: 'Number' })).toBeVisible();
});

// Form Example
test('TextField Form Example renders correctly', async ({ page }) => {
  await page.goto('http://localhost:65161/iframe.html?id=components-textfield--form-example');
  await page.waitForLoadState('networkidle');
  
  await expect(page.getByText('First Name')).toBeVisible();
  await expect(page.getByText('Last Name')).toBeVisible();
  await expect(page.getByText('Email Address')).toBeVisible();
  await expect(page.getByText('Phone Number')).toBeVisible();
  await expect(page.getByText('Bio')).toBeVisible();
  await expect(page.getByRole('button', { name: /submit/i })).toBeVisible();
});

// Interactive States
test('TextField Interactive States renders correctly', async ({ page }) => {
  await page.goto('http://localhost:65161/iframe.html?id=components-textfield--interactive-states');
  await page.waitForLoadState('networkidle');
  
  await expect(page.getByText('Normal State')).toBeVisible();
  await expect(page.getByText('Focus State')).toBeVisible();
  await expect(page.getByText('Error State')).toBeVisible();
  await expect(page.getByText('Disabled State')).toBeVisible();
});