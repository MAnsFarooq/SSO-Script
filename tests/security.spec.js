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
        let login = new Login(page);
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        await login.clickSignButton();
        await login.click(securityTabLink);
        //verify that page have security modes
        await login.isExpect(securityPasswordLabel, 'Password')

    });
    test('verify  that In security Settings there are option available Password and 2-step verfication', async ({ page }) => {
        let login = new Login(page);
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        await login.clickSignButton();
        await login.click(securityTabLink);
        //verify that page have security modes
        await login.isExpect(securityPasswordLabel, "Password")
        await login.isExpect(securityTwoFAButton, "2-Step Verification")
    });
    test('verify that update password and 2FA button is avaiable ', async ({ page }) => {
        let login = new Login(page);
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        await login.clickSignButton();
        await login.click(securityTabLink);
        //verify that page have security mode
        //verify that button update password and 2FA button is avaiable
        await login.isVisible(securityUpdatePasswordLink);
        await login.isVisible(securityEnableTwoFALink);
        const type1 = await login.getAttribute(securityUpdatePasswordLink, 'type')
        //expect(type1).toBe('button')
    });
    test('verify that when click on the update password it should be secrete passcode field new password and confirm password field', async ({ page }) => {
        let login = new Login(page);
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        await login.clickSignButton();
        await login.click(securityTabLink);
        //verify that page have security modes
        await login.isVisible(securityPasswordLabel)
        await login.isVisible(securityTwoFAButton)
        //click on update password button
        await page.click(securityUpdatePasswordLink);
        //verify that page have secrete passcode field new password and confirm password field
        await login.isVisible(securitySecretPasscodeField)
        const passCodeType = await login.getAttribute(securitySecretPasscodeField, 'type');
        expect(passCodeType).toBe('password')
        const elementHandle = await page.$(securitySecretPasscodeField);
        // Get the tag name of the element and check it
        const tagName = await elementHandle.evaluate(el => el.tagName);
        // Expect the tag name to be 'INPUT'
        expect(tagName).toBe('INPUT');
        await login.isVisible(securityNewPasswordField)
        const elementHanlder = await page.$(securityNewPasswordField)
        const tagNamePassword = await elementHanlder.evaluate(el => el.tagName);
        // Expect the tag name to be 'INPUT'
        expect(tagNamePassword).toBe('INPUT');
        await login.isVisible(securityConfirmPasswordField)
    });
    test('verify that update password with invalid passcode it should should flash error ', async ({ page }) => {
        let login = new Login(page);
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        await login.clickSignButton();
        await login.click(securityTabLink);
        //verify that page have security modes
        await login.isVisible(securityPasswordLabel)
        await login.isVisible(securityTwoFAButton)
        //click on update password button
        await page.click(securityUpdatePasswordLink);
        //fill invalid passcode
        await page.fill(securitySecretPasscodeField, "dkjewdhwhwhdhjd");
        await page.fill(securityNewPasswordField, "Test@user1234");
        await page.fill(securityConfirmPasswordField, 'Test@user1234');
        await page.click(securityContinueButton);
        //verify that error message is displayed
        await login.isExpect(securityInvalidpasscode, 'Invalid passcode!')
    });
    test('verify that update password without entering passcode it should flash error', async ({ page }) => {
        let login = new Login(page);
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        await login.clickSignButton();
        await login.click(securityTabLink);
        //verify that page have security modes
        await login.isVisible(securityPasswordLabel)
        await login.isVisible(securityTwoFAButton)
        //click on update password button
        await page.click(securityUpdatePasswordLink);
        //fill invalid passcode
        await page.fill(securityNewPasswordField, "Test@user1234");
        await page.fill(securityConfirmPasswordField, 'Test@user1234');
        await page.click(securityContinueButton);
        ///checkl asset error mesage
        await login.isExpect(securitywithoutPasscode, 'Passcode is required');
    });
    test('verify that update password with valid Passcode with new password and confirm password  it should update password  and go to login page ', async ({ page }) => {
        await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
        let login = new Login(page);
        await login.fillLoginForm('gamer101', "tests123");
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
        await page.fill(securityConfirmPasswordField, 'Test@user1234');
        await page.click(securityContinueButton);

        await page.isVisible(signIntovirtuaAccount)
    })
    test('verify that update password generate an error if message ', async ({ page }) => {
        await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
        let login = new Login(page);
        await login.fillLoginForm('gamer101', 'tests123');
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

        await login.isExpect(passwordMistachError, 'New Password and Confirm Password Must Match');

    })
    test('verify that update password lower limit password it should error if password shorter than ', async ({ page }) => {
        await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
        let login = new Login(page);
        await login.fillLoginForm('gamer101', 'tests123');
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
        await login.fillLoginForm('gamer101', 'tests123');
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
