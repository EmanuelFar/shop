import { test, expect } from '@playwright/test';
import { deleteUserByEmail } from './clear-test-db';

async function registerUser(page, email, password) {
  await deleteUserByEmail(email);
  
  await page.goto('/register');
  await page.waitForSelector('input[name="email"]');
  
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.fill('input[name="confirmPassword"]', password);
  
  await page.click('button[type="submit"]');
  await page.waitForLoadState('networkidle');
}

async function loginUser(page, email, password) {
  await page.goto('/login');
  await page.waitForSelector('input[name="email"]');
  
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  
  await page.click('button[type="submit"]');
  await page.waitForLoadState('networkidle');
}

// Test adding items to cart and verifying
test('should add items to cart and verify quantities', async ({ page }) => {
  // TODO: Add a random number of clicks for both products and compare the quantities in cart.
  // First register and login with a test account
  const testEmail = `test${Date.now()}@example.com`;
  const testPassword = 'Carttest';

  await registerUser(page, testEmail, testPassword);
  await loginUser(page, testEmail, testPassword);
  
  await page.goto('/shop');
  
  // Wait for the page to be fully loaded
  await page.waitForLoadState('networkidle');
  
 
  // Add first product to cart
  const firstProduct = page.locator('.item-card').first();
  await expect(firstProduct).toBeVisible();
  
  const firstProductName = await firstProduct.locator('.item-name').textContent() || '';
  const firstProductPrice = await firstProduct.locator('.item-price').textContent() || '';
  
  await firstProduct.locator('button.item-button').click();
  await page.waitForLoadState('networkidle');
  await firstProduct.locator('button.item-button').click();
  await page.waitForLoadState('networkidle');
  
  // Add second product to cart
  const secondProduct = page.locator('.item-card').nth(1);
  await expect(secondProduct).toBeVisible();
  
  const secondProductName = await secondProduct.locator('.item-name').textContent() || '';
  const secondProductPrice = await secondProduct.locator('.item-price').textContent() || '';
  
  await secondProduct.locator('button.item-button').click();
  await page.waitForLoadState('networkidle');
  
  // Go to cart and verify items
  await page.goto('/cart');
  await page.waitForLoadState('networkidle');
  
  // Wait for cart items to be visible
  await page.waitForSelector('.cart-item', { timeout: 10000 });
  
  // Wait for cart to be fully loaded
  await page.waitForTimeout(1000); 

  const firstCartItem = page.locator('.cart-item').nth(0);
  const secondCartItem = page.locator('.cart-item').nth(1);
  
  // Verify items
  await expect(firstCartItem.locator('.cart-item-name')).toHaveText(firstProductName.trim());
  await expect(firstCartItem.locator('.cart-item-price')).toHaveText("Price: " + firstProductPrice.trim());
  await expect(firstCartItem.locator('.cart-item-quantity')).toHaveText("Quantity: 2");
  
  await expect(secondCartItem.locator('.cart-item-name')).toHaveText(secondProductName.trim());
  await expect(secondCartItem.locator('.cart-item-price')).toHaveText("Price: " + secondProductPrice.trim());
  await expect(secondCartItem.locator('.cart-item-quantity')).toHaveText("Quantity: 1");
  await deleteUserByEmail(testEmail);
});

// Test removing items from cart
test('should remove items from cart', async ({ page }) => {
  // First register and login with a test account
  const testEmail = `test${Date.now()}@example.com`;
  const testPassword = 'Carttest';

  await registerUser(page, testEmail, testPassword);
  await loginUser(page, testEmail, testPassword);
  
  // Navigate to shop page and wait for it to load
  await page.goto('/shop');
  
  // Wait for the page to be fully loaded
  await page.waitForLoadState('networkidle');
  
 
  // Add first product to cart
  const firstProduct = page.locator('.item-card').first();
  await expect(firstProduct).toBeVisible();
  
  // Add first product twice
  await firstProduct.locator('button.item-button').click();
  await page.waitForLoadState('networkidle');
  await firstProduct.locator('button.item-button').click();
  await page.waitForLoadState('networkidle');
  
  
  // Go to cart and verify items
  await page.goto('/cart');
  await page.waitForLoadState('networkidle');
  
  // Wait for cart items to be visible
  await page.waitForSelector('.cart-item', { timeout: 10000 });
  
  // Wait for cart to be fully loaded
  await page.waitForTimeout(1000); 

  // Remove item
  await page.locator('button.delete-button').click();
  await page.waitForLoadState('networkidle');
  
  // Verify cart is empty
  await expect(page.locator('.cart-item')).toHaveCount(0);
  await deleteUserByEmail(testEmail);
});
