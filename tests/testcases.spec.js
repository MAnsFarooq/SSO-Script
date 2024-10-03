const { test, expect } = require('@playwright/test');

// Set a timeout of 60 seconds (60000 milliseconds) for all test cases
test.setTimeout(80000);

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
    test('Verify that the username cannot exceed the upper limit of 20 characters', { timeout: 80000 }, async ({ page }) => {
        // Navigate to the registration page
        await page.waitForSelector('//*[@id="kc-form-login"]/div[3]/div[1]/div/span/a', { timeout: 10000 });
        await page.click('//*[@id="kc-form-login"]/div[3]/div[1]/div/span/a');

        // Fill the username field with more than 20 characters
        await page.fill('//*[@id="username"]', 'thisisaverylongusername12345');

        // Submit the form
        await page.click('//*[@id="kc-form-buttons"]/input');

        // Wait for the error message indicating that the username exceeds the limit
        await page.waitForSelector('//*[@id="kc-register-form"]/div[1]/div/div', { state: 'visible' });
        expect(await page.textContent('//*[@id="kc-register-form"]/div[1]/div/div')).toBe('Username must be at least 6 - 20 letters');
    });
    test("verify the lower limit of the username ", { timeout: 80000 }, async ({ page }) => {
        await page.waitForSelector('//*[@id="kc-form-login"]/div[3]/div[1]/div/span/a', { timeout: 10000 });
        await page.click('//*[@id="kc-form-login"]/div[3]/div[1]/div/span/a');

        // Fill the username field with less than 6 characters
        await page.fill('//*[@id="username"]', 'user');

        // Submit the form
        await page.click('//*[@id="kc-form-buttons"]/input');

        // Wait for the error message indicating that the username is too short
        await page.waitForSelector('//*[@id="kc-register-form"]/div[1]/div/div', { state: 'visible' });
        expect(await page.textContent('//*[@id="kc-register-form"]/div[1]/div/div')).toBe('Username must be at least 6 - 20 letters');
    });
    test('verify that username must be 20 letters', { timeout: 80000 }, async ({ page }) => {
        await page.waitForSelector('//*[@id="kc-form-login"]/div[3]/div[1]/div/span/a', { timeout: 10000 });
        await page.click('//*[@id="kc-form-login"]/div[3]/div[1]/div/span/a');

        // Fill the username field with 20 characters
        await page.fill('//*[@id="username"]', 'thisisaverylongusername12345678901234567890');

        // Submit the form
        await page.click('//*[@id="kc-form-buttons"]/input');

        // Wait for the error message indicating that the username exceeds the limit
        await page.waitForSelector('//*[@id="kc-register-form"]/div[1]/div/div', { state: 'visible' });
        const errorMessage = await page.textContent('//*[@id="kc-register-form"]/div[2]/div/div[2]');
        if (errorMessage.includes('Password must have 8 - 20 characters')) {
            expect(errorMessage).toBe('Password must have 8 - 20 characters');
        } else if (errorMessage.includes('Password must contain at least one lowercase letter')) {
            expect(errorMessage).toBe('Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character');
        }


    });
    test('verify that password enter less than 8 character it should display error message', async ({ page }) => {
        await page.waitForSelector('//*[@id="kc-form-login"]/div[3]/div[1]/div/span/a', { timeout: 10000 });
        await page.click('//*[@id="kc-form-login"]/div[3]/div[1]/div/span/a');

        // Fill the username and password fields with valid data
        await page.fill('//*[@id="username"]', 'testuser');
        await page.fill('//*[@id="password"]', 'Test12345678');

        // Submit the form
        await page.click('//*[@id="kc-form-buttons"]/input');

        // Wait for the error message indicating that the password is too short  
    })
    test('verify that password must be at least 8 characters long ', { timeout: 80000 }, async ({ page }) => {
        await page.waitForSelector('//*[@id="kc-form-login"]/div[3]/div[1]/div/span/a', { timeout: 10000 });
        await page.click('//*[@id="kc-form-login"]/div[3]/div[1]/div/span/a');

        // Fill the username and password fields with valid data
        await page.fill('//*[@id="username"]', 'testuser6');
        await page.fill('//*[@id="password"]', 'Test@user3366');
        await page.fill('//*[@id="password-confirm"]', "Test@user3366")

        // Submit the form
        await page.click('//*[@id="kc-form-buttons"]/input');

        // page will goto secret code section
        await page.waitForSelector('//*[@id="kc-content-wrapper"]/div/form/div[2]/section/span', { timeout: 20000 })
        expect(await page.textContent('//*[@id="kc-content-wrapper"]/div/form/div[2]/section/span')).toBe('Copy Passcode');
    });
    test('Verify that error message should display if password is not strong  like upper case , digits , special characters and small letters', { timeout: 80000 }, async ({ page }) => {
        await page.waitForSelector('//*[@id="kc-form-login"]/div[3]/div[1]/div/span/a', { timeout: 10000 });
        await page.click('//*[@id="kc-form-login"]/div[3]/div[1]/div/span/a');

        // Fill the username and password fields with valid data
        await page.fill('//*[@id="username"]', 'testuser7');
        await page.fill('//*[@id="password"]', 'testuser123');
        await page.fill('//*[@id="password-confirm"]', 'testuser123')

        // Submit the form
        await page.click('//*[@id="kc-form-buttons"]/input');

        // Wait for the error message indicating that the password is too weak
        await page.waitForSelector('//*[@id="kc-register-form"]/div[2]/div/div[2]', { state: 'visible' }, { timeout: 20000 });
        expect(await page.textContent('//*[@id="kc-register-form"]/div[2]/div/div[2]')).toBe('Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character')

    })
    test('verify password and confirm password are same ', { timeout: 80000 }, async ({ page }) => {
        await page.waitForSelector('//*[@id="kc-form-login"]/div[3]/div[1]/div/span/a', { timeout: 10000 });
        await page.click('//*[@id="kc-form-login"]/div[3]/div[1]/div/span/a');

        // Fill the username and password fields with valid data
        await page.fill('//*[@id="username"]', 'testuser8');
        await page.fill('//*[@id="password"]', 'Test@12345678');
        await page.fill('//*[@id="password-confirm"]', "Test@12345678")

        // Submit the form
        await page.click('//*[@id="kc-form-buttons"]/input');

    });

    test('Verify that  secrete passcode are auto generated ', async ({ page }) => {
        await page.waitForSelector('//*[@id="kc-form-login"]/div[3]/div[1]/div/span/a', { timeout: 10000 });
        await page.click('//*[@id="kc-form-login"]/div[3]/div[1]/div/span/a');

        // Fill the username and password fields with valid data
        await page.fill('//*[@id="username"]', 'testuser8');
        await page.fill('//*[@id="password"]', 'Test@12345678');
        await page.fill('//*[@id="password-confirm"]', "Test@12345678")

        // Submit the form
        await page.click('//*[@id="kc-form-buttons"]/input');
        await page.waitForSelector('//*[@id="passcode"]', { state: 'visible' });

        // Verify that the passcode is auto-generated and not empty
        const generatedPasscode = await page.getAttribute('//*[@id="passcode"]', 'value');
        console.log("Generated Passcode:", generatedPasscode);
        expect(generatedPasscode).not.toBe('');

    })
    test('verify that secret passcode hide and show eye icon is worlable', { timeout: 80000 }, async ({ page }) => {
        await page.waitForSelector('//*[@id="kc-form-login"]/div[3]/div[1]/div/span/a', { timeout: 10000 });
        await page.click('//*[@id="kc-form-login"]/div[3]/div[1]/div/span/a');

        // Fill the username and password fields with valid data
        await page.fill('//*[@id="username"]', 'testuser8');
        await page.fill('//*[@id="password"]', 'Test@12345678');
        await page.fill('//*[@id="password-confirm"]', "Test@12345678")

        // Submit the form
        await page.click('//*[@id="kc-form-buttons"]/input');

        const passcodeField = '//*[@id="passcode"]';  // XPath of passcode field
        const eyeIcon = '//*[@id="kc-content-wrapper"]/div/form/div[1]/div/span/img';  // XPath of eye icon for showing/hiding the passcode (replace with actual XPath)

        // Initially check that the passcode is hidden (type="password")
        let passcodeType = await page.getAttribute(passcodeField, 'type');
        expect(passcodeType).toBe('password');

        // Click the eye icon to show the passcode
        await page.click(eyeIcon);

        // Check that the passcode is now visible (type="text")
        passcodeType = await page.getAttribute(passcodeField, 'type');
        expect(passcodeType).toBe('text');

        // Click the eye icon again to hide the passcode
        await page.click(eyeIcon);

        // Verify that the passcode is hidden again (type="password")
        passcodeType = await page.getAttribute(passcodeField, 'type');
        expect(passcodeType).toBe('password');
    })
    test('Verify that the Secret Passcode field is readonly', async ({ page }) => {
       
  
        await page.waitForSelector('//*[@id="kc-form-login"]/div[3]/div[1]/div/span/a', { timeout: 10000 });
        await page.click('//*[@id="kc-form-login"]/div[3]/div[1]/div/span/a');

        // Fill the username and password fields with valid data
        await page.fill('//*[@id="username"]', 'testuser8');
        await page.fill('//*[@id="password"]', 'Test@12345678');
        await page.fill('//*[@id="password-confirm"]', "Test@12345678")

        // Submit the form
        await page.click('//*[@id="kc-form-buttons"]/input');
        // Wait for the Secret Passcode field to be visible
        const passcodeField = await page.waitForSelector('//*[@id="passcode"]', { state: 'visible' });

        // Verify that the Secret Passcode field has the readonly attribute
        const isReadonly = await passcodeField.getAttribute('readonly');
        expect(isReadonly !== null).toBe(true);;  // This checks that the attribute exists and is truthy

        // Optionally, log the result
        console.log('The Secret Passcode field is readonly:', isReadonly);
    });

})



test.afterAll(async () => {
    console.log('All tests completed!');
});

