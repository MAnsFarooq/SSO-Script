const { test, expect } = require('@playwright/test');

// Set a timeout of 60 seconds (60000 milliseconds) for all test cases
test.setTimeout(60000);

test.describe("Verify that test cases work as expected", () => {

    test.beforeAll(async () => {
        console.log("Running tests");
    });

    test.beforeEach(async ({ page }) => {
        console.log("Navigating to the SSO webpage for each test case");
        await page.goto('https://accounts.bimtvist.com/realms/virtua/protocol/openid-connect/auth?client_id=ResourcePortal-ebb64119-efee-4861-ab65-a71edebcf2e8&redirect_uri=https%3A%2F%2Fdashboard.bimtvist.com%2F&state=b3c98450-66e7-4c35-bd9b-364f47af0f19&response_mode=fragment&response_type=code&scope=openid&nonce=6f6289af-5da7-4d07-9abb-51c1d994641e&code_challenge=ttBOfBv5nqdbJOV9sAmuJwtjKwMNwzM32IDV5G-iP8E&code_challenge_method=S256', { waitUntil: 'networkidle' });
    });

    // Test to verify if username, password, and confirm password fields are present
    test('Verify that username, password, and confirm password fields are present on the page', async ({ page }) => {
        await page.waitForSelector('//*[@id="kc-form-login"]/div[3]/div[1]/div/span/a', { timeout: 10000 });
        await page.click('//*[@id="kc-form-login"]/div[3]/div[1]/div/span/a');
        await page.waitForSelector('//*[@id="username"]', { timeout: 10000 });
        expect(await page.isVisible('//*[@id="username"]')).toBe(true);
    });

    // Test to verify that the password input field is present
    test('Verify that the password input field is present', async ({ page }) => {
        await page.waitForSelector('//*[@id="kc-form-login"]/div[3]/div[1]/div/span/a', { timeout: 10000 });
        await page.click('//*[@id="kc-form-login"]/div[3]/div[1]/div/span/a');
        await page.waitForSelector('//*[@id="password"]', { state: 'visible', timeout: 10000 });
        expect(await page.isVisible('//*[@id="password"]')).toBe(true);
    });

    // Test to verify that the confirm password field is present
    test('Verify that the confirm password field is present', async ({ page }) => {
        await page.waitForSelector('//*[@id="kc-form-login"]/div[3]/div[1]/div/span/a', { timeout: 10000 });
        await page.click('//*[@id="kc-form-login"]/div[3]/div[1]/div/span/a');
        await page.waitForSelector('//*[@id="password-confirm"]', { state: 'visible', timeout: 10000 });
        expect(await page.isVisible('//*[@id="password-confirm"]')).toBe(true);
    });

    // Test to verify the upper limit of the username field (6 to 20 characters)
    test('Verify that the username cannot exceed the upper limit of 20 characters', async ({ page }) => {
        // Navigate to the registration page
        await page.waitForSelector('//*[@id="kc-form-login"]/div[3]/div[1]/div/span/a', { timeout: 10000 });
        await page.click('//*[@id="kc-form-login"]/div[3]/div[1]/div/span/a');
        
        // Fill the username field with more than 20 characters
        await page.fill('//*[@id="username"]', 'thisisaverylongusername12345');
        
        // Submit the form
        await page.click('//*[@id="kc-form-buttons"]/input');
        
        // Wait for the error message indicating that the username exceeds the limit
        const errorMessageLocator = '//*[@id="kc-register-form"]/div[1]/div/div[contains(text(), "Username must be between 6 and 20 characters")]';
        
        // Increase timeout to wait for error message to appear if necessary
        await page.waitForSelector(errorMessageLocator, { timeout: 20000 });
        
        // Verify if the error message is visible
        const errorMessage = await page.isVisible(errorMessageLocator);
        expect(errorMessage).toBe(true);
    });
    
    test.afterAll(async () => {
        console.log('All tests completed!');
    });
});
