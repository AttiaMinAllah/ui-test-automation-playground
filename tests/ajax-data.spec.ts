import { test, expect } from '@playwright/test';

test.describe('AJAX Data Scenario', () => {
  test('should wait for AJAX data to appear and verify spinner behavior', async ({ page }) => {
    await page.goto('http://uitestingplayground.com/ajax');

    const ajaxButton = page.locator('#ajaxButton');

    await ajaxButton.click();

    const spinner = page.locator('#spinner');
    await expect(spinner).toBeHidden({ timeout: 20000 });
    await expect(page.locator('#content')).toHaveText('Data loaded with AJAX get request.', { timeout: 20000 });

  });
});
