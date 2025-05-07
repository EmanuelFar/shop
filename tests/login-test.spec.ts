import { test, expect } from '@playwright/test';
import { deleteUserByEmail } from './clear-test-db';

const goodEmails = [
  'test1@example.com',
  'test2@example.com',
  'user+foo@domain.com',
  'user.bar@domain.co.uk',
  'test@test.com',
];

const badEmails = [
  'invalid-email',
  'test',
  'test@',
  'test@test',
  '@hey.com',
  'hey@gmail@com',
  'invalid@email.com@',
];

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

// Test successful login
for (const email of goodEmails) {
  test(`should handle successful login for email: ${email}`, async ({ page }) => {
    // In case the user already exists, we delete it.
    await deleteUserByEmail(email);
    // First register the user
    await registerUser(page, email, 'Testtest123');
    
    // Now test login
    await page.goto('/login');
    await page.waitForSelector('input[name="email"]');
    
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', 'Testtest123');
    
    await page.click('button[type="submit"]');
    await page.waitForLoadState('networkidle');
    
    // After successful login, should be redirected to dashboard
    await expect(page).toHaveURL('/shop');
  });
}

// Test login with wrong password
for (const email of goodEmails) {
  test(`should handle login with wrong password for email: ${email}`, async ({ page }) => {
    // First register the user
    await registerUser(page, email, 'Testtest123');
    
    // Now test login with wrong password
    await page.goto('/login');
    await page.waitForSelector('input[name="email"]');
    
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', 'WrongPassword123');
    
    await page.click('button[type="submit"]');
    
    await expect(page.getByText('Invalid email or password')).toBeVisible();
  });
}

// Test login with non-existent email
for (const email of badEmails) {
  test(`should handle login with non-existent email: ${email}`, async ({ page }) => {
    await page.goto('/login');
    await page.waitForSelector('input[name="email"]');
    
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', 'Testtest123');
    
    await page.click('button[type="submit"]');
    
    await expect(page.getByText('Invalid email or password')).toBeVisible();
  });
}

// Test login with empty fields
test('should handle login with empty fields', async ({ page }) => {
  await page.goto('/login');
  await page.waitForSelector('input[name="email"]');
  
  await page.click('button[type="submit"]');
  
  await expect(page.getByText('Please fill in all fields')).toBeVisible();
});
