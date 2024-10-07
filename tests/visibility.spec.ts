import { test, expect } from '@playwright/test';

test.describe('Visibility Scenario', () => {
  test('should verify visibility of elements before and after clicking the Hide button', async ({ page }) => {
    await page.goto('/visibility');

    const hideButton = page.locator('#hideButton');
    const removedButton = page.locator('#removedButton');
    const zeroWidthButton = page.locator('#zeroWidthButton');
    const overlappedButton = page.locator('#overlappedButton');
    const opacityButton = page.locator('#transparentButton');
    const visibilityHiddenButton = page.locator('#invisibleButton');
    const displayNoneButton = page.locator('#notdisplayedButton');
    const offscreenButton = page.locator('#offscreenButton');

    await hideButton.click();

    await expect(removedButton).toBeHidden();
    await expect(zeroWidthButton).toHaveCSS('width', '0px');

    const isOverlapped = await overlappedButton.evaluate((button) => {
      const buttonRect = button.getBoundingClientRect();
      const hidingLayer = document.querySelector('#hidingLayer');
      if (!hidingLayer) return false;
      const hidingLayerRect = hidingLayer.getBoundingClientRect();

      return !(
        buttonRect.right < hidingLayerRect.left ||
        buttonRect.left > hidingLayerRect.right ||
        buttonRect.bottom < hidingLayerRect.top ||
        buttonRect.top > hidingLayerRect.bottom
      );
    });

    expect(isOverlapped).toBe(true);

    await expect(opacityButton).toHaveCSS('opacity', '0');
    await expect(visibilityHiddenButton).toBeHidden();
    await expect(displayNoneButton).toHaveCSS('display', 'none');

    const offscreenBox = await offscreenButton.boundingBox();
    expect(offscreenBox && (offscreenBox.y < 0 || offscreenBox.x < 0)).toBe(true);
  });
});
