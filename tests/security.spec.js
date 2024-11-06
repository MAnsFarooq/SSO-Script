const {
    securityTabLink,
    securityPasswordLabel,
    securityTwoFAButton,
    securityUpdatePasswordLink,
    securityEnableTwoFALink,
    securitySecretPasscodeField,
    securityNewPasswordField,
    securityConfirmPasswordField,
    securityContinueButton,
    securityCancelButton,
    securityInvalidpasscode,
    securitywithoutPasscode,
    signIntovirtuaAccount,
    passwordMistachError,
    shortPasswordError,
    passwordvalidationMsg,
    okButton
} = require('../pageElements/security.js');

const {
    headerDropdownMenu,
    dropDownSecretePasscode,
    genertasecretPasscodeButton,
    nextButtonCSSSelector,
    confirmButtonCSSSelector,
    copyPasscodeCSSSelector,
    fillSecetePasscodeCssSelector,

} = require('../pageElements/acount.js')

const { test, expect } = require('@playwright/test');

const Login = require('../classPage/loginclass.js');
const Signup = require('../classPage/signupclass.js');
const fs = require('fs');
const path = require('path');
const testData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../flashData/flashMsg.json'), 'utf-8'));


test.describe('Security Settings', () => {
    let page;

    test.beforeEach(async ({ page }) => {
        await page.goto('/', { waitUntil: 'networkidle' });
    });

    test('verify That when click on security Tab is should go the security setting Page', async ({ page }) => {
        // Create an instance of the Login class to interact with the page
        let login = new Login(page);
    
        // Fill in the login form with the correct valid username and password
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
    
        // Click the sign-in button to log in
        await login.clickSignButton();
    
        // Click on the "Security" tab to navigate to the security settings page
        await login.click(securityTabLink);
    
        // Verify that the page contains security modes, by checking for the presence of the "Password" label
        await login.isExpect(securityPasswordLabel, 'Password');
    });
    
    test('verify that In security Settings there are options available Password and 2-step verification', async ({ page }) => { 
        // Create an instance of the Login class to interact with the page
        let login = new Login(page);
    
        // Fill in the login form with the correct valid username and password
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
    
        // Click the sign-in button to log in
        await login.clickSignButton();
    
        // Click on the "Security" tab to navigate to the security settings page
        await login.click(securityTabLink);
    
        // Verify that the page contains the "Password" option, confirming it's available in the security settings
        await login.isExpect(securityPasswordLabel, "Password");
    
        // Verify that the page contains the "2-Step Verification" option, confirming it's available in the security settings
        await login.isExpect(securityTwoFAButton, "2-Step Verification");
    });
    
    test('verify that update password and 2FA button is available', async ({ page }) => {
        // Create an instance of the Login class to interact with the page
        let login = new Login(page);
    
        // Fill in the login form with the correct valid username and password
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
    
        // Click the sign-in button to log in
        await login.clickSignButton();
    
        // Click on the "Security" tab to navigate to the security settings page
        await login.click(securityTabLink);
    
        // Verify that the "Update Password" button is visible on the security settings page
        await login.isVisible(securityUpdatePasswordLink);
    
        // Verify that the "Enable 2FA" button is visible on the security settings page
        await login.isVisible(securityEnableTwoFALink);
    
        // Retrieve the 'type' attribute of the "Update Password" button to check if it's a button element
        const type1 = await login.getAttribute(securityUpdatePasswordLink, 'type');
        
        // Optionally, check that the 'type' attribute of the button is 'button' (commented out in your test)
        // expect(type1).toBe('button');
    });
    
    test('verify that when click on the update password it should be secret passcode field, new password, and confirm password field', async ({ page }) => {
        // Create an instance of the Login class to interact with the page
        let login = new Login(page);
    
        // Fill in the login form with the correct valid username and password
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
    
        // Click the sign-in button to log in
        await login.clickSignButton();
    
        // Click on the "Security" tab to navigate to the security settings page
        await login.click(securityTabLink);
    
        // Verify that the security settings page contains the security modes (Password and 2FA)
        await login.isVisible(securityPasswordLabel); // Verifies Password label is visible
        await login.isVisible(securityTwoFAButton);  // Verifies 2FA button is visible
    
        // Click on the "Update Password" button to navigate to the password update section
        await page.click(securityUpdatePasswordLink);

        await login.dely()
    
        // Verify that the update password section contains the necessary fields
    
        // Verify that the secret passcode field is visible and ensure it's a password type
        await login.isVisible(securitySecretPasscodeField); // Verifies secret passcode field visibility
        const passCodeType = await login.getAttribute(securitySecretPasscodeField, 'type'); // Get the field type
        expect(passCodeType).toBe('password'); // Ensure it's of type 'password'
        await login.ExpectIselementInput(securitySecretPasscodeField); // Check if the secret passcode field is an input element
    
        // Verify that the new password field is visible and an input element
        await login.isVisible(securityNewPasswordField);  // Verifies new password field visibility
        await login.ExpectIselementInput(securityNewPasswordField); // Check if the new password field is an input element
    
        // Verify that the confirm password field is visible and an input element
        await login.isVisible(securityConfirmPasswordField); // Verifies confirm password field visibility
        await login.ExpectIselementInput(securityConfirmPasswordField); // Check if the confirm password field is an input element
    });
    
    test('verify that update password with invalid passcode it should flash error', async ({ page }) => {
        // Create an instance of the Login class to interact with the page
        let login = new Login(page);
    
        // Fill in the login form with the correct valid username and password
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
    
        // Click the sign-in button to log in
        await login.clickSignButton();
    
        // Navigate to the "Security" tab to access the security settings page
        await login.click(securityTabLink);
    
        // Verify that the security settings page contains the security modes (Password and 2FA)
        await login.isVisible(securityPasswordLabel); // Verifies Password label is visible
        await login.isVisible(securityTwoFAButton);  // Verifies 2FA button is visible
    
        // Click on the "Update Password" button to navigate to the password update section
        await page.click(securityUpdatePasswordLink);
    
        // Fill in the invalid passcode in the secret passcode field
        await page.fill(securitySecretPasscodeField, "dkjewdhwhwhdhjd"); // Invalid passcode
    
        // Fill in a valid new password and confirm password
        await page.fill(securityNewPasswordField, "Test@user1234");  // New password
        await page.fill(securityConfirmPasswordField, 'Test@user1234'); // Confirm password
    
        // Click on the "Continue" button to attempt password update
        await page.click(securityContinueButton);

        await login.dely()
        // Verify that an error message is displayed indicating invalid passcode
        await login.isExpect(securityInvalidpasscode, 'Invalid passcode!'); // Error message verification
    });
    
    test('verify that update password without entering passcode it should flash error', async ({ page }) => {
        // Create an instance of the Login class to interact with the page
        let login = new Login(page);
    
        // Fill in the login form with the correct valid username and password
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
    
        // Click the sign-in button to log in
        await login.clickSignButton();
    
        // Navigate to the "Security" tab to access the security settings page
        await login.click(securityTabLink);
    
        // Verify that the security settings page contains the security modes (Password and 2FA)
        await login.isVisible(securityPasswordLabel); // Verifies Password label is visible
        await login.isVisible(securityTwoFAButton);  // Verifies 2FA button is visible
    
        // Click on the "Update Password" button to navigate to the password update section
        await page.click(securityUpdatePasswordLink);
    
        // Fill in the new password and confirm password fields without entering the secret passcode
        await page.fill(securityNewPasswordField, "Test@user1234"); // New password
        await page.fill(securityConfirmPasswordField, 'Test@user1234'); // Confirm password
    
        // Click on the "Continue" button to attempt password update without entering the passcode
        await page.click(securityContinueButton);
        await login.dely()
    
        // Verify that an error message is displayed indicating that the passcode is required
        await login.isExpect(securitywithoutPasscode, 'Passcode is required'); // Error message verification
    });
    
    test('verify that update password with valid Passcode with new password and confirm password it should update password and go to login page ', async ({ page }) => {
        // Grant clipboard permissions for reading and writing
        await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
        let login = new Login(page);
        // Log in with valid username and password
        await login.fillLoginForm('gamer101', "Test@user1234");
        await login.clickSignButton();
        // Navigate to security settings
        await login.click(securityTabLink);
        // Verify that the security password and 2FA buttons are visible
        await login.isVisible(securityPasswordLabel);
        await login.isVisible(securityTwoFAButton);
        // Click on the update password link
        await page.click(securityUpdatePasswordLink);
        // Open the secret passcode dropdown menu
        await login.click(headerDropdownMenu);
        await login.click(dropDownSecretePasscode);
        // Generate a new secret passcode
        await login.click(genertasecretPasscodeButton);
        // Verify that the copy passcode button is visible
        await login.isVisible(copyPasscodeCSSSelector);
        // Click on the copy passcode button
        await login.click(copyPasscodeCSSSelector);
        // Get the clipboard content
        const clipboardText = await page.evaluate(async () => await navigator.clipboard.readText());
        console.log(clipboardText);
        // Click the next button to proceed
        await login.click(nextButtonCSSSelector);
        // Focus on the secret passcode input field and fill the clipboard content
        await page.focus(fillSecetePasscodeCssSelector);
        await login.fillInput(fillSecetePasscodeCssSelector, clipboardText);
        // Confirm the entered passcode
        await login.click(confirmButtonCSSSelector);
        await login.click(okButton);
        // Fill in the new password and confirm password fields
        await page.fill(securitySecretPasscodeField, clipboardText);
        await page.fill(securityNewPasswordField, "Test@user1234");
        await page.fill(securityConfirmPasswordField, 'Test@user1234');
        // Click the continue button to update the password
        await page.click(securityContinueButton);

        await login.dely()
        // Verify that the user is redirected to the sign-in page
        await page.isVisible(signIntovirtuaAccount);
    });
    
    test('verify that update password generate an error if message ', async ({ page }) => {
        await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
        let login = new Login(page);
        await login.fillLoginForm('gamer101', 'Test@user1234');
        await login.clickSignButton();
        await login.click(securityTabLink);
        //verify that page have security modes
        await login.isVisible(securityPasswordLabel)
        await login.isVisible(securityTwoFAButton)
        //click on update password button
        await page.click(securityUpdatePasswordLink);
        await login.click(headerDropdownMenu); // Adjust the selector for the dropdown
        await login.click(dropDownSecretePasscode);
        await login.click(genertasecretPasscodeButton);
        // Wait for the "Copy Passcode" button to be visible and clickable
        await login.isVisible(copyPasscodeCSSSelector)
        // // Click the "Copy Passcode" button
        await login.click(copyPasscodeCSSSelector);
        const clipboardText = await page.evaluate(async () => await navigator.clipboard.readText());
        console.log(clipboardText)

        await login.click(nextButtonCSSSelector);
        // fill the passcode in the secrete passcode field;
        // click on the confirm button 
        await page.focus(fillSecetePasscodeCssSelector);
        await login.fillInput(fillSecetePasscodeCssSelector, clipboardText);
        await login.click(confirmButtonCSSSelector);
        await login.click(okButton)
        //fill invalid passcode
        await page.fill(securitySecretPasscodeField, clipboardText);
        await page.fill(securityNewPasswordField, "Test@user1234");
        await page.fill(securityConfirmPasswordField, 'Test@user123');
        await page.click(securityContinueButton);
    
        await login.dely()

        await login.isExpect(passwordMistachError, 'New Password and Confirm Password Must Match');

    })

    test('verify that update password lower limit password it should error if password shorter than ', async ({ page }) => {
        await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
        let login = new Login(page);
        await login.fillLoginForm('gamer101', 'Test@user1234');
        await login.clickSignButton();
        await login.click(securityTabLink);
        //verify that page have security modes
        await login.isVisible(securityPasswordLabel)
        await login.isVisible(securityTwoFAButton)
        //click on update password button
        await page.click(securityUpdatePasswordLink);


        await login.click(headerDropdownMenu); // Adjust the selector for the dropdown
        await login.click(dropDownSecretePasscode);
        await login.click(genertasecretPasscodeButton);
        // Wait for the "Copy Passcode" button to be visible and clickable
        await login.isVisible(copyPasscodeCSSSelector)
        // // Click the "Copy Passcode" button
        await login.click(copyPasscodeCSSSelector);
        const clipboardText = await page.evaluate(async () => await navigator.clipboard.readText());
        console.log(clipboardText)

        await login.click(nextButtonCSSSelector);
        // fill the passcode in the secrete passcode field;
        // click on the confirm button 
        await page.focus(fillSecetePasscodeCssSelector);
        await login.fillInput(fillSecetePasscodeCssSelector, clipboardText);
        await login.click(confirmButtonCSSSelector);
        await login.click(okButton)
        //fill invalid passcode
        await login.fillInput(securitySecretPasscodeField, clipboardText);
        await login.fillInput(securityNewPasswordField, "Test@");
        await login.fillInput(securityConfirmPasswordField, 'Test@');
        await login.click(securityContinueButton);

        await login.isExpect(shortPasswordError, 'New Password length should be of 8-20 characters long');

    });
    test('veriy update password validation if password have no special characters and capptials and small is should generate error', async ({ page }) => {
        let login = new Login(page);
        await login.fillLoginForm('gamers22', 'Torres12!!');
        await login.clickSignButton();
        await login.click(securityTabLink);
        //verify that page have security modes
        await login.isVisible(securityPasswordLabel)
        await login.isVisible(securityTwoFAButton)
        //click on update password button
        await page.click(securityUpdatePasswordLink);


        await login.click(headerDropdownMenu); // Adjust the selector for the dropdown
        await login.click(dropDownSecretePasscode);
        await login.click(genertasecretPasscodeButton);
        // Wait for the "Copy Passcode" button to be visible and clickable
        await login.isVisible(copyPasscodeCSSSelector)
        // // Click the "Copy Passcode" button
        await login.click(copyPasscodeCSSSelector);
        const clipboardText = await page.evaluate(async () => await navigator.clipboard.readText());
        console.log(clipboardText)

        await login.click(nextButtonCSSSelector);
        // fill the passcode in the secrete passcode field;
        //click on the confirm button 
        await page.focus(fillSecetePasscodeCssSelector);
        await login.fillInput(fillSecetePasscodeCssSelector, clipboardText);
        await login.click(confirmButtonCSSSelector);
        //fill invalid passcode
        await page.fill(securitySecretPasscodeField, clipboardText);
        await page.fill(securityNewPasswordField, "tests123");
        await page.fill(securityConfirmPasswordField, 'tests123');
        await page.click(securityContinueButton);

        await login.isExpect(passwordvalidationMsg, 'New Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.');
    })




});
