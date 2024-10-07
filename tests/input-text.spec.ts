import { test, expect } from '@playwright/test';

test.describe('Text Input Tests', () => {
  test('should update the button label after entering text and clicking the button', async ({ page }) => {
    await page.goto('/textinput');

    const inputField = page.locator('#newButtonName');
    const button = page.locator('button#updatingButton');

    const newButtonName = 'New Button Test CTA ';
    await inputField.fill(newButtonName);
    await button.click();

    await expect(button).toHaveText(newButtonName);
  });
});
