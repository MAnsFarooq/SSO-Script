const { test, expect } = require('@playwright/test');

// Describing a suite of tests related to the registration process
test.describe('Signup Process with Validations', () => {

  // Before all tests
  test.beforeAll(async () => {
    console.log('Running setup before all tests...');
    // You can add initialization tasks here, such as setting up a database connection.
  });

  // Before each test
  test.beforeEach(async ({ page }) => {
    console.log('Running setup before each test...');
    // Navigate to the signup page before each test
    await page.goto('https://accounts.bimtvist.com/realms/virtua/protocol/openid-connect/auth?client_id=ResourcePortal-ebb64119-efee-4861-ab65-a71edebcf2e8&redirect_uri=https%3A%2F%2Fdashboard.bimtvist.com%2F&state=b3c98450-66e7-4c35-bd9b-364f47af0f19&response_mode=fragment&response_type=code&scope=openid&nonce=6f6289af-5da7-4d07-9abb-51c1d994641e&code_challenge=ttBOfBv5nqdbJOV9sAmuJwtjKwMNwzM32IDV5G-iP8E&code_challenge_method=S256');
  });

  // Test case for valid registration scenario
  test('Successful registration with valid credentials', async ({ page }) => {
    test.setTimeout(60000); // Set a timeout of 60 seconds

    // Fill in the form with valid data
    await page.click('//*[@id="kc-form-login"]/div[3]/div[1]/div/span/a');
    await page.fill('//*[@id="username"]', 'testuser5589');
    await page.fill('//*[@id="password"]', 'Test@user5589');
    await page.fill('//*[@id="password-confirm"]', 'Test@user5589');
    
    // Click Create an Account
    await page.click('//*[@id="kc-form-buttons"]/input');
    
    // Wait for the next page or success message
    await page.waitForSelector('//*[@id="kc-content-wrapper"]/div/form/div[2]/section/span', { state: 'visible' });

    // Verify that registration proceeds successfully
    expect(await page.isVisible('//*[@id="kc-content-wrapper"]/div/form/div[2]/section/span')).toBe(true);
  });

  // Test case for weak password validation
  test('Weak password shows an error message', async ({ page }) => {
    await page.click('//*[@id="kc-form-login"]/div[3]/div[1]/div/span/a');
    await page.fill('//*[@id="username"]', 'testuser123');
    await page.fill('//*[@id="password"]', 'weakpass');
    await page.fill('//*[@id="password-confirm"]', 'weakpass');

    await page.click('//*[@id="kc-form-buttons"]/input');

    await page.waitForSelector('//*[@id="kc-register-form"]/div[2]/div/div[2]', { state: 'visible' });
    expect(await page.textContent('//*[@id="kc-register-form"]/div[2]/div/div[2]')).toBe('Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character');
  });

  // Test case for invalid username validation
  test('Invalid username shows an error message', async ({ page }) => {
    await page.click('//*[@id="kc-form-login"]/div[3]/div[1]/div/span/a');
    await page.fill('//*[@id="username"]', 'user');  // Invalid username (less than 6 characters)
    await page.fill('//*[@id="password"]', 'Test@user123');
    await page.fill('//*[@id="password-confirm"]', 'Test@user123');

    await page.click('//*[@id="kc-form-buttons"]/input');

    await page.waitForSelector('//*[@id="kc-register-form"]/div[1]/div/div', { state: 'visible' });
    expect(await page.textContent('//*[@id="kc-register-form"]/div[1]/div/div')).toBe('Username must be at least 6 - 20 letters');
  });

  // After each test
  test.afterEach(async ({ page }) => {
    console.log('Cleaning up after each test...');
    // You can log out the user or clean cookies, etc.
  });

  // After all tests
  test.afterAll(async () => {
    console.log('All tests completed!');
    // Perform any teardown tasks here
  });

});
