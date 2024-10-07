import { test, expect } from '@playwright/test';

test.describe('Overlapped Element Scenario', () => {
  test('should fill the input fields despite being overlapped', async ({ page }) => {
    await page.goto('/overlapped');

    const inputId = page.locator('#id');
    await inputId.fill('Loremipsum');
    await expect(inputId).toHaveValue('Loremipsum');

    const inputName = page.locator('#name');

    await inputName.evaluate(element => {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    await page.waitForTimeout(500);
    await inputName.click();
    await inputName.fill('Overlapped Element');
    await expect(inputName).toHaveValue('Overlapped Element');
  });
});
