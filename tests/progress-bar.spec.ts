import { test, expect } from '@playwright/test';

test.describe('Progress Bar Tests', () => {
  test('should stop the progress bar at 75%', async ({ page }) => {
    await page.goto('/progressbar');

    const startButton = page.locator('#startButton');
    const stopButton = page.locator('#stopButton');
    const progressBar = page.locator('#progressBar');

    await startButton.click();

    await page.waitForFunction(
      (progressBar) => {
        if (!progressBar) return false;
        const value = parseInt(progressBar.textContent?.trim() || '0');
        return value >= 75;
      },
      await progressBar.elementHandle(),
      { timeout: 50000 }
    );

    await stopButton.click();

    const progressValue = await progressBar.textContent();
    expect(progressValue?.trim()).toBe('75%');
  });
});
