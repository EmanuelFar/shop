import { test, expect } from '@playwright/test';

/******   ROUTING TESTS  *******/

test('should redirect to /login when visiting root', async ({ page }) => {
  // Go to the root URL
  await page.goto('/');

  // Wait for navigation to complete
  await page.waitForLoadState('networkidle');

  // Check that the URL is now /login
  await expect(page).toHaveURL('/login');
});


test('should redirect to /login when visiting cart', async ({ page }) => {
  await page.goto('/cart');

  await page.waitForLoadState('networkidle');

  await expect(page).toHaveURL('/login');
});

test('should redirect to /login when visiting shop', async ({ page }) => {
  await page.goto('/shop');

  await page.waitForLoadState('networkidle');

  await expect(page).toHaveURL('/login');
});

test('should redirect to /login when visiting dashboard', async ({ page }) => {
  await page.goto('/dashboard');

  await page.waitForLoadState('networkidle');

  await expect(page).toHaveURL('/login');
});