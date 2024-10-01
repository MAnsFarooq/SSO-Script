
const { test, expect } = require('@playwright/test');

test('Signup process with automatic passcode handling', async ({ page }) => {
  // Increase the default timeout to 60 seconds
  test.setTimeout(60000);

  // Navigate to the main page and wait for the DOM content to load instead of the full page
  await page.goto('https://accounts.bimtvist.com/realms/virtua/protocol/openid-connect/auth?client_id=ResourcePortal-ebb64119-efee-4861-ab65-a71edebcf2e8&redirect_uri=https%3A%2F%2Fdashboard.bimtvist.com%2F&state=b3c98450-66e7-4c35-bd9b-364f47af0f19&response_mode=fragment&response_type=code&scope=openid&nonce=6f6289af-5da7-4d07-9abb-51c1d994641e&code_challenge=ttBOfBv5nqdbJOV9sAmuJwtjKwMNwzM32IDV5G-iP8E&code_challenge_method=S256', { waitUntil: 'domcontentloaded', timeout: 60000 });

  // Wait for the "Create an Account" button to be visible and click it
  await page.waitForSelector('//*[@id="kc-form-login"]/div[3]/div[1]/div/span/a', { state: 'visible' });
  await page.click('//*[@id="kc-form-login"]/div[3]/div[1]/div/span/a');

  // Wait for the signup form to be visible
  await page.waitForSelector('//*[@id="username"]', { state: 'visible' });

  // Check for the required fields
  expect(await page.isVisible('//*[@id="username"]')).toBe(true);
  expect(await page.isVisible('//*[@id="password"]')).toBe(true);
  expect(await page.isVisible('//*[@id="password-confirm"]')).toBe(true);

  // Fill in the fields (replace with actual test values)
  await page.fill('//*[@id="username"]', 'testuser321'); // Replace with the username
  await page.fill('//*[@id="password"]', 'Test@user321'); // Replace with the password
  await page.fill('//*[@id="password-confirm"]', 'Test@user321'); // Confirm password

  // Click on "Create an Account"
  await page.click('//*[@id="kc-form-buttons"]/input');

  // Wait for the "Copy Passcode" button to appear
  await page.waitForSelector('//*[@id="kc-content-wrapper"]/div/form/div[2]/section/span', { state: 'visible' });

  // Click "Copy Passcode" (it should automatically copy it)
  await page.click('//*[@id="kc-content-wrapper"]/div/form/div[2]/section/span');

  // Click "Next" to proceed to the next step
  await page.click('//*[@id="kc-login"]');

  // Wait for the passcode input field to be visible
  await page.waitForSelector('//*[@id="passcode"]', { state: 'visible' });

  // Paste the copied passcode
  await page.fill('//*[@id="passcode"]', await page.evaluate(() => navigator.clipboard.readText()));

  // Click the "Confirm" button to finalize the signup
  await page.click('//*[@id="kc-login"]');

  // Optionally, wait for the final confirmation or redirection page
  // await page.waitForNavigation({ waitUntil: 'load' });
});
