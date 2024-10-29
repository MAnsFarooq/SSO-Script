const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const Login = require('./loginclass.js');
const Signup = require('./signupclass.js');

const testData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../flashData/flashMsg.json'), 'utf-8'));

const {
    accountOverViewXpath,
    editYourInforXpath,
    YourdetailXpath,
    userName,
    EmailAddress,
    PhoneNumber,
    country,
    editProfilePencilIconeXpath,
    editYourProfilePicture,
    crossButtonEditProfilePic,
    WellcomeUser,
    uploadProfilePicture,
    UnexpectProfilePic,
    headerDropdownMenu,
    dropDownSecretePasscode,
    genertasecretPasscodeButton,
    copyPasscodeCSSSelector,
    nextButtonCSSSelector,
    confirmButtonCSSSelector,
    fillSecetePasscodeCssSelector,
    confirmMsgCssSelector,
    flashMsgOfinvalidPasscode,
    edityourinfo,
    editpersomalinformation,
    editProfileCrossButton,
    phoneNumberxPth,
    EmailAddressXpath,
    usernameErrorMsg,
    saveChangesXpath,
    countrySelectorDropdown

} = require('../pageObject/acount.js');

const {
    loginUsernameXpath,
    loginPasswordXpath,
    SignButtonEnableXpath,

} = require('../pageObject/login.js');


test.describe('Verify that account page test work as expected', () => {
    let account;
    test.beforeAll(async () => {
        console.log("Tests is starting all test are running parallel");
    });
    test.beforeEach(async ({ page }) => {
        //account = new Account(page); // Create instance of Account once
        await page.goto('https://profile.bimtvist.com', { waitUntil: 'networkidle' });
    });
    test('verify that Account overview click it should redirect to the User Acount details', async ({ page }) => {
        let login = new Login(page);
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        await login.clickSignButton();
        // Verify that Page Redirect to Acount OverView page;
        await login.isVisible(accountOverViewXpath);
        // verify that Acount OverView is Click Able 
        await login.click(accountOverViewXpath);
        //verify that Acount overView page details section is Visible;
        await login.getAttribute(YourdetailXpath, 'Your Details')
    });
    test('Verify that in Acount overview page user profile picture should visible', async ({ page }) => {
        let login = new Login(page);
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        await login.clickSignButton();
        await login.isVisible(accountOverViewXpath);
        await login.click(accountOverViewXpath);
        await login.isVisible('//*[@id="root"]/div/div[2]/div/div/div[1]/img')
        //expect(iVisible).toBeVisible()
    })
    test("verify that user information name  , username , email and phone number should be present in detail section", async ({ page }) => {
        let login = new Login(page);
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        await login.clickSignButton();
        await login.isVisible(accountOverViewXpath);
        await login.click(accountOverViewXpath);
        await login.isVisible(YourdetailXpath);
        await login.getAttribute(userName, 'User Name');
        await login.getAttribute(EmailAddress, 'Email Address');
        await login.getAttribute(PhoneNumber, 'Phone No');
        await login.getAttribute(country, 'Country of Origin')
    });
    test('Verify whether the user is able to click on the photo upload (Pencil) icon or not. ', async ({ page }) => {
        let login = new Login(page);
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        await login.clickSignButton();
        await login.click(editProfilePencilIconeXpath);
        await login.getAttribute(editYourProfilePicture, "Edit Profile Picture")
    })
    test('verify that in edit profile picture section cross buttin is clickable and edit profile section box will close ', async ({ page }) => {
        let login = new Login(page);
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        await login.clickSignButton();
        await login.click(editProfilePencilIconeXpath);
        await login.click(crossButtonEditProfilePic);
        await login.isVisible(WellcomeUser);
    });
    test('Verify that the user is able to upload a profile photo by uploading a valid file. (Image Type. JPEG, PNG, or GIF) ,', async ({ page }) => {
        let login = new Login(page);
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        await login.clickSignButton();
        await login.click(editProfilePencilIconeXpath);
        //await page.waitForSelector('[type="file"]', { state: 'visible' });
        await page.setInputFiles('[type="file"]', path.resolve(__dirname, '../flashData/testPic.jpg'));

        const profilePicture = page.locator('img[alt="user-photo"]'); // Modify the selector as needed
        await expect(profilePicture).toBeVisible();
        const profileSrc = await profilePicture.getAttribute('src');
        console.log(profileSrc);
        expect(profileSrc).toContain('jpg');
        await page.click(uploadProfilePicture);
    });
    test('verify tha that edit profile will Accept only exention JPG , PNG , GIF', async ({ page }) => {
        let login = new Login(page);
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        await login.clickSignButton();
        await login.click(editProfilePencilIconeXpath);
        //await page.waitForSelector('[type="file"]', { state: 'visible' });
        await page.setInputFiles('[type="file"]', path.resolve(__dirname, '../flashData/test.pdf'));
        await login.getAttribute(UnexpectProfilePic, testData.uploadImageErrorMsg);
    });
    test('Verify that Secret Passcode Button is available in Headers Drop-down and clickable.', async ({ page }) => {
        let login = new Login(page);
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        await login.clickSignButton();
        await login.click(headerDropdownMenu);
        //verify that SecretPasscode is avaible
        await login.isVisible(dropDownSecretePasscode);
        //verify that SecretPasscode Button is clickable
        await login.click(dropDownSecretePasscode);
        //verify that SecretPasscode page is open
        await expect(page.locator('//h4[text()="Secret Passcode"]')).toBeVisible();
    });
    test('verify that in Secrete passcode Page Secret Passcode Field will Auto generated', async ({ page }) => {
        let login = new Login(page);
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        await login.clickSignButton();
        await login.click(headerDropdownMenu);
        await login.click(dropDownSecretePasscode);
        await login.click(genertasecretPasscodeButton);
        // let call functionlity 
        let SecretePasscode = new Signup(page);
        await SecretePasscode.isSecretPasscodeAutoGeneratedAndNotEditableAcountOverview();
    });

    test('Verify that "Copy" secret passcode is clickable and changes to "Copied" status', async ({ page }) => {
        // Log in and navigate to the relevant page (update login details or steps as necessary)
        let login = new Login(page);
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        await login.clickSignButton();

        // Navigate to the profile management or secret passcode section
        await login.click(headerDropdownMenu); // Adjust the selector for the dropdown
        await login.click(dropDownSecretePasscode);
        await login.click(genertasecretPasscodeButton);

        // Wait for the "Copy Passcode" button to be visible and clickable

        await login.isVisible(copyPasscodeCSSSelector)

        // // Click the "Copy Passcode" button
        await login.click(copyPasscodeCSSSelector);

        // // Wait for the button to change its text to "Copied"
        await login.getAttribute(copyPasscodeCSSSelector, 'Copied') // Selector for the button after clicking
    });
    test('verify that with copy the passcode next button is disAble', async ({ page }) => {
        // Log in and navigate to the relevant page (update login details or steps as necessary)
        let login = new Login(page);
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        await login.clickSignButton();
        // Navigate to the profile management or secret passcode section
        await login.click(headerDropdownMenu); // Adjust the selector for the dropdown
        await login.click(dropDownSecretePasscode);
        await login.click(genertasecretPasscodeButton);
        await login.isVisible(copyPasscodeCSSSelector)

        // check next button is disabled
        await login.getAttribute(nextButtonCSSSelector, 'disabled')
    });
    test('Verify that clicking on Copy Passcode enables the Next button', async ({ page }) => {
        // Log in and navigate to the relevant page (update login details or steps as necessary)
        let login = new Login(page);
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        await login.clickSignButton();
        // Navigate to the profile management or secret passcode section
        await login.click(headerDropdownMenu); // Adjust the selector for the dropdown
        await login.click(dropDownSecretePasscode);
        await login.click(genertasecretPasscodeButton);
        // Wait for the "Copy Passcode" button to be visible and clickable
        await login.isVisible(copyPasscodeCSSSelector)
        // // Click the "Copy Passcode" button
        await login.click(copyPasscodeCSSSelector);
        const nextButton = page.locator('button.w-100.text-uppercase.mt-20');
        await expect(nextButton).toBeEnabled();
        // Optionally, click the Next button to verify it is clickabl
    });
    test('verify that the next button is clickable and redirect to the Confirm passcode Section ', async ({ page }) => {

        // Log in and navigate to the relevant page (update login details or steps as necessary)
        let login = new Login(page);
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        await login.clickSignButton();
        // Navigate to the profile management or secret passcode section
        await login.click(headerDropdownMenu); // Adjust the selector for the dropdown
        await login.click(dropDownSecretePasscode);
        await login.click(genertasecretPasscodeButton);
        // Wait for the "Copy Passcode" button to be visible and clickable
        await login.isVisible(copyPasscodeCSSSelector)
        // // Click the "Copy Passcode" button
        await login.click(copyPasscodeCSSSelector);

        await login.click(nextButtonCSSSelector);
        // after click on the next button it confirm page section
        await login.getAttribute(confirmButtonCSSSelector, 'confirm');

    });
    test('verify that the copy passcode should fill passcode  in the secret passcode field and passcode set successfully  ', async ({ page }) => {
        await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
        let login = new Login(page);
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        await login.clickSignButton();
        // Navigate to the profile management or secret passcode section
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
        await login.click(confirmButtonCSSSelector);
        // after click on the confirm button it confirm page section
        await page.focus(fillSecetePasscodeCssSelector);
        await login.fillInput(fillSecetePasscodeCssSelector, clipboardText);
        /////
        await login.click(confirmButtonCSSSelector);
        // after click on the confirm button it confirm page section
        await login.getAttribute(confirmMsgCssSelector, 'Passcode set successfully')
    });
    test('verify that when user enter Invalid passcode is should flash error message ', async ({ page }) => {
        await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
        let login = new Login(page);
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        await login.clickSignButton();
        // Navigate to the profile management or secret passcode section
        await login.click(headerDropdownMenu); // Adjust the selector for the dropdown
        await login.click(dropDownSecretePasscode);
        await login.click(genertasecretPasscodeButton);
        // Wait for the "Copy Passcode" button to be visible and clickable
        await login.isVisible(copyPasscodeCSSSelector)
        // // Click the "Copy Passcode" button
        await login.click(nextButtonCSSSelector);
        // fill the passcode in the secrete passcode field;
        // click on the confirm button 
        await login.click(confirmButtonCSSSelector);
        // after click on the confirm button it confirm page section
        await page.focus(fillSecetePasscodeCssSelector);
        await login.fillInput(fillSecetePasscodeCssSelector, 'invalidpasscodeccswdkoew');
        /////
        await login.click(confirmButtonCSSSelector);
        // flash errror msg when user  invalid passcode 
        await login.getAttribute(flashMsgOfinvalidPasscode, 'Invalid Passcode')
    });
    test('Verify that In account overview Edit your Info Iconi  is visible  and clickAble redirect to edit info section', async ({ page }) => {

        // Log in and navigate to the relevant page (update login details or steps as necessary)
        let login = new Login(page);
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        await login.clickSignButton();
        // Click on the edit info Icon
        await login.click(edityourinfo);
        // after click on the edit info icon it confirm page section
        await login.getAttribute(editpersomalinformation, 'Edit Personal Information');
    });
    test('verify that edit personal information cross-button is clickable and redirect back to your detail page', async ({ page }) => {
        // Log in and navigate to the relevant page (update login details or steps as necessary)
        let login = new Login(page);
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        await login.clickSignButton();
        // Click on the edit info Icon
        await login.click(edityourinfo);
        // click on cross button to go back to your detail page
        await login.click(editProfileCrossButton);
        await login.getAttribute(YourdetailXpath, 'Your Details');
    });
    test('verify that  constarints min lenght is 10 and max lenght is 20 ', async ({ page }) => {
        // Log in and navigate to the relevant page (update login details or steps as necessary)
        let login = new Login(page);
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        await login.clickSignButton();

        const phoneNumberValue = await page.inputValue(phoneNumberxPth);
        await login.click(edityourinfo);
        // Verify minimum length
        expect(phoneNumberValue.length).toBeGreaterThanOrEqual(10);

        // Verify maximum length
        expect(phoneNumberValue.length).toBeLessThanOrEqual(18);
    })
    test.only('verify that when use dupicate Email Address it should flash ', async ({ page }) => {
        // Log in and navigate to the relevant page (update login details or steps as necessary)
        let login = new Login(page);
        await login.fillLoginForm('TestinQAauser', 'TestinQAauser@123');
        await login.clickSignButton();
        // Go the edit personal information;
        await login.click(edityourinfo);
        // try fill fill duplicate email address
        await login.fillInput(EmailAddressXpath, 'anasfarooq0098@gmail.com');
        // click on the saves Changes button
        await login.click(saveChangesXpath);
        // flash error message 
        await login.getAttribute(usernameErrorMsg, testData.userNameAlreadyExist);
       // select country
       let sign = new Signup;
       await sign.selectCountry('United States');
        
    })






















});
