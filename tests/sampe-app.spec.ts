import { test, expect, Locator } from '@playwright/test';

test.describe('Sample App Login Tests', () => {
  let usernameField: Locator;
  let passwordField: Locator;
  let loginButton: Locator;
  let statusMessage: Locator;

  test.beforeEach(async ({ page }) => {
    await page.goto('/sampleapp');

    usernameField = page.locator('input[name="UserName"]');
    passwordField = page.locator('input[name="Password"]');
    loginButton = page.locator('button#login');
    statusMessage = page.locator('#loginstatus');
  });

  test('should log in with valid credentials', async () => {
    await usernameField.fill('TestUser');
    await passwordField.fill('pwd');
    await loginButton.click();
    await expect(statusMessage).toHaveText('Welcome, TestUser!');
  });

  test('should show error message for invalid credentials', async () => {
    await usernameField.fill('InvalidUser');
    await passwordField.fill('wrongpwd');
    await loginButton.click();
    await expect(statusMessage).toHaveText('Invalid username/password');
  });

  test('should log out successfully after login', async () => {
    await usernameField.fill('TestUser');
    await passwordField.fill('pwd');
    await loginButton.click();
    await expect(statusMessage).toHaveText('Welcome, TestUser!');

    await loginButton.click();
    await expect(statusMessage).toHaveText('User logged out.');
  });
});
