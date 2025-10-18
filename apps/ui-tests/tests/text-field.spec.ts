import { test, expect } from '@playwright/test';

test('TextField renders in Storybook', async ({ page }) => {
  
  await page.goto('http://localhost:60128/iframe.html?id=components-textfield--outlined');

  await expect(page.locator('input')).toBeVisible();
  await expect(page.getByText('Username')).toBeVisible(); 
});