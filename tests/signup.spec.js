const { test, expect } = require('@playwright/test');
const { SignUp} = require('./signupclass.js');

// Set a timeout of 60 seconds (60000 milliseconds) for all test cases
test.setTimeout(80000);

test.describe("Verify that test cases work as expected", () => {

    test.beforeAll(async () => {
        console.log("Running tests");
    });

    test.beforeEach(async ({ page }) => {
        console.log("Navigating to the SSO webpage for each test case");
        await page.goto('https://profile.bimtvist.com', { waitUntil: 'networkidle' });
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
        const sign = new SignUp(page);
        await sign.createAnAccount();
        await sign.fillSignUpform('thisisaverylongusername12345', 'Password@123', "Pasword@123")

        // Wait for the error message indicating that the username exceeds the limit
        await page.waitForSelector('//*[@id="kc-register-form"]/div[1]/div/div', { state: 'visible' });
        expect(await page.textContent('//*[@id="kc-register-form"]/div[1]/div/div')).toBe('Username must be at least 6 - 20 letters');
    });
    test("verify the lower limit of the username ", { timeout: 80000 }, async ({ page }) => {
        const signup = new SignUp(page);
        await signup.createAnAccount();
        await signup.fillSignUpform('user', 'Password@123', "Pasword@123");
        await signup.submitForm();
        // Wait for the error message indicating that the username is too short
        await page.waitForSelector('//*[@id="kc-register-form"]/div[1]/div/div', { state: 'visible' });
        expect(await page.textContent('//*[@id="kc-register-form"]/div[1]/div/div')).toBe('Username must be at least 6 - 20 letters');
    });
    test('verify that username must be exeeds 20 letters it display flash error message', { timeout: 80000 }, async ({ page }) => {
         const signup = new SignUp(page);
         signup.createAnAccount();
         signup.fillSignUpform('thisisaverylongusername12345678901234567890', 'Password@123', "Pasword@123");
         await signup.submitForm();
        // Wait for the error message indicating that the username exceeds the limit
        await page.waitForSelector('//*[@id="kc-register-form"]/div[1]/div/div', { timeout: 20000 }, { state: 'visible' });
        const errorMessage = await page.textContent('//*[@id="kc-register-form"]/div[1]/div/div');
        expect(errorMessage).toBe('Username must be at least 6 - 20 letters');


    });
    test('verify that password enter less than 8 character it should display error message', async ({ page }) => {
            const signup = new SignUp(page);
            await signup.createAnAccount();
            await signup.fillSignUpform('testpasslenght', 'Test@', "Test@");
            await signup.submitForm();
        // Wait for the error message indicating that the password is too short  
    })
    test('verify that password must be at least 8 characters long ', { timeout: 80000 }, async ({ page }) => {
            const signup = new SignUp(page);
            await signup.createAnAccount();
            await signup.fillSignUpform('testlenghtre8', 'Test@123Bim', "Test@123Bim");

        // page will goto secret code section
        await page.waitForSelector('//*[@id="kc-content-wrapper"]/div/form/div[2]/section/span', { timeout: 20000 })
        expect(await page.textContent('//*[@id="kc-content-wrapper"]/div/form/div[2]/section/span')).toBe('Copy Passcode');
    });
    test('Verify that error message should display if password is not strong  like upper case , digits , special characters and small letters', { timeout: 80000 }, async ({ page }) => {
       const signUp = new SignUp(page);
       await signUp.createAnAccount();
       await signUp.fillSignUpform('testpassstrong', 'test@123Bim', "test@123Bim");
// Wait for the error message indicating that the password is too weak
        await page.waitForSelector('//*[@id="kc-register-form"]/div[2]/div/div[2]', { state: 'visible' }, { timeout: 20000 });
        expect(await page.textContent('//*[@id="kc-register-form"]/div[2]/div/div[2]')).toBe('Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character')

    })
    test('verify password and confirm password are same ', { timeout: 80000 }, async ({ page }) => {
        const signUp = new SignUp(page);
        await signUp.createAnAccount();
        await signUp.fillSignUpform('testpassstrong', 'Test@123Bim', "Test@123Bim123");
        // when password are match so it gonna to the secret page so the test case is pase
    });
    test.only('Eye icon shows/hides the password', { timeout: 70000 }, async ({ page }) => {
        const signUp = new SignUp(page);
        await signUp.createAnAccount();
        await signUp.fillSignUpform('testpasseyeicon', 'Test@user123Bim', 'Test@user123Bim');
        //click on eyeicon for show password
        const passwordVisible = await signUp.togglePasswordVisibility();
        expect(passwordVisible).toBe('Test@user123Bim');      
        // Click the eye icon again to hide the password
        await signUp.togglePasswordVisibility();
        const isPasswordHidden = await signUp.isPasswordHidden();
        expect(isPasswordHidden).toBe(true);  // The password should now be hidden
    });
    test('Mismatched passwords and confirm password  show an error', { timeout: 70000 }, async ({ page }) => {
        await page.click('//*[@id="kc-form-login"]/div[3]/div[1]/div/span/a');
        await page.fill('//*[@id="username"]', 'testuser99956');
        await page.fill('//*[@id="password"]', 'Test@user123');
        await page.fill('//*[@id="password-confirm"]', 'Test@user456'); // Mismatching passwords

        await page.click('//*[@id="kc-form-buttons"]/input');

        // Check for the error message about passwords not matching
        await page.waitForSelector('//*[@id="kc-register-form"]/div[3]/div/div[2]', { state: 'visible' });
        expect(await page.textContent('//*[@id="kc-register-form"]/div[3]/div/div[2]')).toBe('Passwords must match');
    });

    test('Verify that  secrete passcode are auto generated ', async ({ page }) => {
        await page.waitForSelector('//*[@id="kc-form-login"]/div[3]/div[1]/div/span/a', { timeout: 10000 });
        await page.click('//*[@id="kc-form-login"]/div[3]/div[1]/div/span/a');

        // Fill the username and password fields with valid data
        await page.fill('//*[@id="username"]', 'testautopasscode');
        await page.fill('//*[@id="password"]', 'Test@autosso123');
        await page.fill('//*[@id="password-confirm"]', "Test@autosso123")

        // Submit the form
        await page.click('//*[@id="kc-form-buttons"]/input');
        await page.waitForSelector('//*[@id="passcode"]', { state: 'visible' } ,{timeout : 30000});

        // Verify that the passcode is auto-generated and not empty
        const generatedPasscode = await page.getAttribute('//*[@id="passcode"]', 'value');
        console.log("Generated Passcode:", generatedPasscode);
        expect(generatedPasscode).not.toBe('');

    })
    test('verify that secret passcode hide and show eye icon is worlable', { timeout: 800000 }, async ({ page }) => {
        await page.waitForSelector('//*[@id="kc-form-login"]/div[3]/div[1]/div/span/a', { timeout: 10000 });
        await page.click('//*[@id="kc-form-login"]/div[3]/div[1]/div/span/a');

        // Fill the username and password fields with valid data
        await page.fill('//*[@id="username"]', 'passcodeeyeicon856');
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
    test('Verify that the Secret Passcode field is readonly',{timeout: 80000} ,async ({ page }) => {

        const signup = new SignUp(page);
        await signup.createAnAccount();
        await signup.fillSignUpform('readonlypasscode123','Test@autosso123', 'Test@autosso123')
        await signup.submitForm();

        // Wait for the Secret Passcode field to be visible
        const passcodeField = await page.waitForSelector('//*[@id="passcode"]', {timeout :30000},{ state: 'visible' } , );

        // Verify that the Secret Passcode field has the readonly attribute
        const isReadonly = await passcodeField.getAttribute('readonly');
        expect(isReadonly !== null).toBe(true);;  // This checks that the attribute exists and is truthy

        // Optionally, log the result
        console.log('The Secret Passcode field is readonly:', isReadonly);
    });
    test('Verify Copy Passcode, Next Button, and Confirm Secret Passcode functionality', { timeout: 80000 }, async ({ page }) => {
        // Grant clipboard permissions
        await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
    
        const signup = new SignUp(page);
        await signup.createAnAccount();
        await signup.fillSignUpform('testcopypasscode','Test@autosso123', 'Test@autosso123')
        await signup.submitForm();
        
        // Submit the form
        await page.click('//*[@id="kc-form-buttons"]/input');
    
        // Step 2: Wait for the "Copy Passcode" button and click it
        const copyPasscodeButton = await page.waitForSelector('//*[@id="kc-content-wrapper"]/div/form/div[2]/section/span', { state: 'visible' });
        expect(copyPasscodeButton).toBeTruthy();
        await copyPasscodeButton.click();
    
        // Step 3: Retrieve the copied passcode from the clipboard
        const clipboardText = await page.evaluate(async () => await navigator.clipboard.readText());
    
        // Step 4: Verify the "Next" button is clickable and click it
        const nextButton = await page.waitForSelector('//*[@id="kc-login"]', { state: 'visible' });
        expect(nextButton).toBeTruthy();
        await nextButton.click();
    
        // Step 5: Verify we are on the "Confirm Secret Passcode" page
        const confirmPasscodeTitle = await page.waitForSelector('//*[@id="kc-page-title"]', { state: 'visible' });
        const titleText = await confirmPasscodeTitle.textContent();
        expect(titleText).toContain('Confirm Secret Passcode');
    
        // Step 6: Verify the "Enter your secret passcode" field is editable
        const passcodeField = await page.waitForSelector('//*[@id="passcode"]', { state: 'visible' });
        expect(passcodeField).toBeTruthy();
    
        // Step 7: Paste the copied passcode into the "Enter your secret passcode" field
        await passcodeField.fill(clipboardText);
    
        // Step 8: Optionally, log the result for debugging
        const enteredPasscode = await passcodeField.inputValue();
        console.log('Entered Passcode:', enteredPasscode);
        expect(enteredPasscode).toBe(clipboardText); 
         // Verify that the passcode was entered correctly

         
        // Using locator for XPath
        const confirmButton = await page.locator('xpath=//*[@id="kc-form-buttons"]');
        await confirmButton.waitFor({ state: 'visible' });  // Ensure the Confirm button is visible
        expect(confirmButton).toBeTruthy();  // Ensure the Confirm button exists
        await confirmButton.click();  // Click the Confirm button
    });
    
    test('verify correct creditenials making an account', { timeout: 80000 }, async ({ page }) => {
        // Grant clipboard permissions
        await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
    
        // Step 1: Navigate and login
        await page.waitForSelector('//*[@id="kc-form-login"]/div[3]/div[1]/div/span/a', { timeout: 10000 });
        await page.click('//*[@id="kc-form-login"]/div[3]/div[1]/div/span/a');
    
        await page.fill('//*[@id="username"]', 'auto@another2User2');
        await page.fill('//*[@id="password"]', 'Test@autosso123');
        await page.fill('//*[@id="password-confirm"]', 'Test@autosso123');
    
        // Submit the form
        await page.click('//*[@id="kc-form-buttons"]/input');
    
        // Step 2: Wait for the "Copy Passcode" button and click it
        const copyPasscodeButton = await page.waitForSelector('//*[@id="kc-content-wrapper"]/div/form/div[2]/section/span', { state: 'visible' });
        expect(copyPasscodeButton).toBeTruthy();
        await copyPasscodeButton.click();
    
        // Step 3: Retrieve the copied passcode from the clipboard
        const clipboardText = await page.evaluate(async () => await navigator.clipboard.readText());
    
        // Step 4: Verify the "Next" button is clickable and click it
        const nextButton = await page.waitForSelector('//*[@id="kc-login"]', { state: 'visible' });
        expect(nextButton).toBeTruthy();
        await nextButton.click();
    
        // Step 5: Verify we are on the "Confirm Secret Passcode" page
        const confirmPasscodeTitle = await page.waitForSelector('//*[@id="kc-page-title"]', { state: 'visible' });
        const titleText = await confirmPasscodeTitle.textContent();
        expect(titleText).toContain('Confirm Secret Passcode');
    
        // Step 6: Verify the "Enter your secret passcode" field is editable
        const passcodeField = await page.waitForSelector('//*[@id="passcode"]', { state: 'visible' });
        expect(passcodeField).toBeTruthy();
    
        // Step 7: Paste the copied passcode into the "Enter your secret passcode" field
        await passcodeField.fill(clipboardText);
    
        // Step 8: Optionally, log the result for debugging
        const enteredPasscode = await passcodeField.inputValue();
        console.log('Entered Passcode:', enteredPasscode);
        expect(enteredPasscode).toBe(clipboardText); 
         // Verify that the passcode was entered correctly

         
        // Using locator for XPath
        const confirmButton = await page.locator('xpath=//*[@id="kc-form-buttons"]');
        await confirmButton.waitFor({ state: 'visible' });  // Ensure the Confirm button is visible
        expect(confirmButton).toBeTruthy();  // Ensure the Confirm button exists
        await confirmButton.click();  // Click the Confirm button
        await page.pause(300000)
    });
    test.only('verify that when sign Up with same credentials it will go the login ', {timeout : 80000} , async ({page}) =>{
      const signUp = new SignUp(page);
      await signUp.createAnAccount();
      await signUp.fillSignUpform('auto@another2User2' ,'Test@autosso123' ,'Test@autosso123')
      await signUp.submitForm();
    })
    
})

test.afterAll(async () => {
    console.log('All tests are compiling ');
});


