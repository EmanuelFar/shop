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

const goodPasswords = [
  'Testtest123',
  'Password123',
  'SecurePass1!',
  'BMC-123456',
  'THAC-126',
]

const badPasswords = [
  'test',
  'testtest',
  'testtest123',
  'AA',
  '123456',
  '@@@@@',
]



for (const email of goodEmails) {
  test(`should handle correct email registration for email: ${email}`, async ({ page }) => {
    // Since tests are run in various internet explorers, we need to delete the user if it exists.
    await deleteUserByEmail(email);
    
    await page.goto('/register');
    await page.waitForSelector('input[name="email"]');
    
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', 'Testtest123');
    await page.fill('input[name="confirmPassword"]', 'Testtest123');
    
    await page.click('button[type="submit"]');
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveURL('/login');
  });
}

for (const email of goodEmails) {
  test(`should handle already registered email registration for email: ${email}`, async ({ page }) => {
    
    await page.goto('/register');
    await page.waitForSelector('input[name="email"]');
    
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', 'Testtest123');
    await page.fill('input[name="confirmPassword"]', 'Testtest123');
    
    await page.click('button[type="submit"]');

    await expect(page.getByText('User already exists')).toBeVisible();
    
  });
}

for (const email of badEmails) {
  test(`should handle wrong email registration for email: ${email}`, async ({ page }) => {
    await page.goto('/register');
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', 'Testtest123');
    await page.fill('input[name="confirmPassword"]', 'Testtest123');
    await page.click('button[type="submit"]');

    await expect(page.getByText('Invalid email address')).toBeVisible();
  });
}

for (const password of goodPasswords) {
  test(`should handle correct password registration with password: ${password}`, async ({ page }) => {
    const email = `test${Date.now()}@example.com`;
    // In case the user already exists, we delete it.
    await deleteUserByEmail(email);
    
    await page.goto('/register');
    await page.waitForSelector('input[name="email"]');
    
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.fill('input[name="confirmPassword"]', password);
    
    await page.click('button[type="submit"]');
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveURL('/login');
  });
}

for (const password of badPasswords) {
  test(`should handle invalid password registration with password: ${password}`, async ({ page }) => {
    const email = `test${Date.now()}@example.com`;
    
    await page.goto('/register');
    await page.waitForSelector('input[name="email"]');
    
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.fill('input[name="confirmPassword"]', password);
    
    await page.click('button[type="submit"]');
    
    await expect(page.getByText('Password must be at least 6 characters and also contain 1 capital letter')).toBeVisible();
  });
}

test('should handle mismatched password and confirm password', async ({ page }) => {
  const email = `test${Date.now()}@example.com`;
  
  await page.goto('/register');
  await page.waitForSelector('input[name="email"]');
  
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', 'Testtest123');
  await page.fill('input[name="confirmPassword"]', 'Testtest456');
  
  await page.click('button[type="submit"]');
  
  await expect(page.getByText('Passwords do not match')).toBeVisible();
});