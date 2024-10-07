import { test, expect } from '@playwright/test';

test.describe('Dynamic Table Scenario', () => {
  test('should get CPU load value for Chrome process and compare it with the value on the label', async ({ page }) => {
    await page.goto('/dynamictable');

    const labelText = await page.locator('.bg-warning').innerText();

    const cpuValue = await page.locator('span:text("Chrome")')
      .locator('xpath=ancestor::div[@role="row"]')
      .locator('[role="cell"]:has-text("%")')
      .innerText();

    expect(labelText).toContain(cpuValue);
  });
});
