const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const Login = require('../classPage/loginclass.js');
const Signup = require('../classPage/signupclass.js');

test.setTimeout(100000);
const testData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../flashData/flashMsg.json'), 'utf-8'));

const {
    accountOverViewXpath,
    YourdetailXpath,
    userName,
    EmailAddress,
    PhoneNumber,
    country,
    editProfilePencilIconeXpath,
    editYourProfilePicture,
    crossButtonEditProfilePic,
    WellcomeUser,
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
    emailRequiredMsg,
    countryRequiredMsg,
    editInfoUserName,
    countryfield,
    deleteAcountTitle,
    deleteButtonIcon,
    acountDeletion,
    deleteProcessButton,
    deleteACcancelButton,
    deleationACpasscodefirls,
    pascodeErrorMsg,
    deletepageinitiated


} = require('../pageElements/acount.js');

const {
    loginUsernameXpath,
    loginPasswordXpath,
    SignButtonEnableXpath,

} = require('../pageElements/login.js');
//const SignUp = require('../pageElements/signupclass.js');


test.describe('Verify that account page test work as expected', () => {
    let account;
    test.beforeAll(async () => {
        console.log("Tests is starting all test are running parallel");
    });
    test.beforeEach(async ({ page }) => {
        //account = new Account(page); // Create instance of Account once
        await page.goto('/', { waitUntil: 'networkidle' });
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
        await login.isExpect(YourdetailXpath, 'Your Details')
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
        await login.isExpect(userName, 'User Name');
        await login.isExpect(EmailAddress, 'Email Address');
        await login.isExpect(PhoneNumber, 'Phone No');
        await login.isExpect(country, 'Country of Origin')
    });
    test('Verify whether the user is able to click on the photo upload (Pencil) icon or not. ', async ({ page }) => {
        let login = new Login(page);
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        await login.clickSignButton();
        await login.click(editProfilePencilIconeXpath);
        await login.isExpect(editYourProfilePicture, "Edit Profile Picture")
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

        // Validate that the uploaded image URL contains a valid image extension
        expect(profileSrc).toMatch(/\.(jpg|jpeg|png|gif)(\?.*)?$/); // Check for valid image extensions

        //await page.click(uploadProfilePicture);
    });
    test('verify tha that edit profile will Accept only exention JPG , PNG , GIF', async ({ page }) => {
        let login = new Login(page);
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        await login.clickSignButton();
        await login.click(editProfilePencilIconeXpath);
        //await page.waitForSelector('[type="file"]', { state: 'visible' });
        await page.setInputFiles('[type="file"]', path.resolve(__dirname, '../flashData/test.pdf'));
        await login.isExpect(UnexpectProfilePic, testData.uploadImageErrorMsg);
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
    test('verify that the next button is disabled when passcode is not copied', { timeout: 90000 }, async ({ page }) => {
        let login = new Login(page);
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        await login.clickSignButton();
    
        // Navigate to the profile management or secret passcode section
        await login.click(headerDropdownMenu); // Adjust the selector for the dropdown
        await login.click(dropDownSecretePasscode);
        await login.click(genertasecretPasscodeButton);
        await login.isVisible(copyPasscodeCSSSelector);
    
        // Check if the "Next" button is disabled
        const isDisabled = await login.getAttribute(nextButtonCSSSelector, 'disabled');
        expect(isDisabled).not.toBeNull(); // Expect the 'disabled' attribute to be present
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
        await login.isExpect(confirmButtonCSSSelector, 'Confirm');

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
        await login.isExpect(confirmMsgCssSelector, 'Passcode set successfully')
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
        await login.isExpect(flashMsgOfinvalidPasscode, 'Invalid Passcode')
    });
    test('Verify that In account overview Edit your Info Iconi  is visible  and clickAble redirect to edit info section', async ({ page }) => {

        // Log in and navigate to the relevant page (update login details or steps as necessary)
        let login = new Login(page);
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        await login.clickSignButton();
        // Click on the edit info Icon
        await login.click(edityourinfo);
        // after click on the edit info icon it confirm page section
        await login.isExpect(editpersomalinformation, 'Edit Personal Information');
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
        await login.isExpect(YourdetailXpath, 'Your Details');
    });
    test('verify that  constarints min lenght is 10 and max lenght is 20 ', async ({ page }) => {
        // Log in and navigate to the relevant page (update login details or steps as necessary)
        let login = new Login(page);
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        await login.clickSignButton();

        //const phoneNumberValue = await page.inputValue(phoneNumberxPth);
        await login.click(edityourinfo);

        const phoneNumberValue = await page.inputValue(phoneNumberxPth);
        // Verify minimum length
        expect(phoneNumberValue.length).toBeGreaterThanOrEqual(10);

        // Verify maximum length
        expect(phoneNumberValue.length).toBeLessThanOrEqual(18);
    })
    test('verify that when use dupicate Email Address it should flash ', async ({ page }) => {
        // Log in and navigate to the relevant page (update login details or steps as necessary)
        let login = new Login(page);
        await login.fillLoginForm('gamer52', 'Torres12!!');
        await login.clickSignButton();
        // Go the edit personal information;
        await login.click(edityourinfo);
        // try fill fill duplicate email address
        await login.fillInput(EmailAddressXpath, 'anasfarooq0098@gmail.com');

        let sign = new Signup(page);
        await sign.selectCountry('United States');
        await login.click(saveChangesXpath);
        // flash error message 
        await login.isExpect(usernameErrorMsg, testData.userNameAlreadyExist);
    });

    test('verify that when in edit personal information when required is empty and saves it should flash error msg', async ({ page }) => {
        // Log in and navigate to the relevant page (update login details or steps as necessary)
        let login = new Login(page);
        await login.fillLoginForm('gamer52', 'Torres12!!');
        await login.clickSignButton();
        // Go the edit personal information;
        await login.click(edityourinfo);
        // try saves changes without fill required fields 
        // click on saves changes button 
        await login.click(saveChangesXpath);
        // flash error message
        // email required error message
        await login.getAttribute(emailRequiredMsg, testData.emailIsRequired);
        // country required error message
        await login.isExpect(countryRequiredMsg, testData.countryIsRequired)
    });
    test('verify that when user tries to fill username it should be read-only and not editable', async ({ page }) => {
        let login = new Login(page);
        await login.fillLoginForm('gamer52', 'Torres12!!');
        await login.clickSignButton();

        // Go to edit personal information
        await login.click(edityourinfo);

        // Check username readonly
        const usernameSelector = editInfoUserName; // Make sure this is defined correctly
        const usernameElement = await page.waitForSelector(usernameSelector, { state: 'visible' });

        // Use the page reference directly
        const isReadOnly = await page.evaluate(el => el.readOnly, usernameElement);

        // Assert that the username input is readonly
        expect(isReadOnly).toBe(true);
    });
    test('verify that the country selector is not editable', async ({ page }) => {
        // Log in and navigate to the relevant page
        let login = new Login(page);
        await login.fillLoginForm('TestinQAausers', 'TestinQAauser@123');
        await login.clickSignButton();

        // Go to edit personal information
        await login.click(edityourinfo);

        // Wait for the country selector to be visible
        const countrySelector = 'div'; // Select the parent div
        await page.waitForSelector(countrySelector, { state: 'visible' });

        // Check if the specific country (Anguilla) is present and its read-only status
        const isCountrySelectorReadonly = await page.evaluate(() => {
            const div = Array.from(document.querySelectorAll('div'))
                .find(el => el.innerText.includes('Anguilla'));
            return div ? div.hasAttribute('disabled') : false;
        });

        // Assert that the country selector is not editable 
        expect(isCountrySelectorReadonly).toBe(false); // Expecting it to be not editable

        //  check if clicking the country selector does not allow changes
        const isCountrySelectorClickable = await page.evaluate(() => {
            const div = Array.from(document.querySelectorAll('div'))
                .find(el => el.innerText.includes('Anguilla'));
            return div ? !div.getAttribute('onclick') : true; // Check if there's no onclick attribute
        });

        expect(isCountrySelectorClickable).toBe(true); // Expecting it to not be clickable
    });
    test('Verify that In more Option delete virtue Account tille and delete button icone is Availble', async ({ page }) => {
        // Log in and navigate to the relevant page (update login details or steps as necessary)
        let login = new Login(page);
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        await login.clickSignButton();
        await page.waitForLoadState('networkidle');;
        // Check if the delete account title is visible
        const deleteAccountVisible = await page.$eval(deleteAcountTitle, el => !!el && el.offsetWidth > 0 && el.offsetHeight > 0);
        // Log the visibility check result for debugging
        console.log("Is the delete account title visible?", deleteAccountVisible);

        // Assert that the element is visible
        expect(deleteAccountVisible).toBe(true);
    });
    test('Verify thay in more Option delete button is visible and cliclable and open Acount deletion page', { timeout: 70000 }, async ({ page }) => {
        // Log in and navigate to the relevant page (update login details or steps as necessary)
        let login = new Login(page);
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        await login.clickSignButton();
        await page.waitForLoadState('networkidle');
        // Check if the delete button is visible
        const deleteButtonVisible = await page.$eval(deleteButtonIcon, el => !!el && el.offsetWidth > 0 && el.offsetHeight > 0);
        // Log the visibility check result for debugging
        console.log("Is the delete button visible?", deleteButtonVisible);
        // Assert that the element is visible
        expect(deleteButtonVisible).toBe(true);
        // click on delete button
        await page.click(deleteButtonIcon);
        // wait for the Acount deletion page to load
        await page.waitForSelector(acountDeletion, { state: 'visible' });
        // Check if the Acount deletion page is visible
        const acountDeletionPageVisible = await page.$eval(acountDeletion, el => !!el && el.offsetWidth > 0 && el.offsetHeight > 0);
        // Log the visibility check result for debugging
        console.log("Is the Acount deletion page visible?", acountDeletionPageVisible);
        // Assert that the element is visible
        expect(acountDeletionPageVisible).toBe(true);
    });
    test('verify that in the deletion page have two option cancel button and proceed button', async ({ page }) => {
        // Log in and navigate to the relevant page (update login details or steps as necessary)
        let login = new Login(page);
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        await login.clickSignButton();
        await page.waitForLoadState('networkidle');
        // click on delete button
        await page.click(deleteButtonIcon);
        // wait for the Acount deletion page to load
        await page.waitForSelector(acountDeletion, { state: 'visible' });
        // Check if the two options (cancel and proceed) are visible
        const isDeleteProcessButtonVisible = await login.isVisible(deleteProcessButton);
        const isDeleteACCancelButtonVisible = await login.isVisible(deleteACcancelButton);
        
        // Assertions to confirm visibility
        expect(isDeleteProcessButtonVisible).toBeTruthy(); // Check if "Proceed" button is visible
        expect(isDeleteACCancelButtonVisible).toBeTruthy(); 
    });
    test.skip('verify that in the deletion Page when click on the proceed button it should go to the secrete passcode field ,', async ({ page }) => {
        let login = new Login(page);
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        await login.clickSignButton();
        await page.waitForLoadState('networkidle');
        // click on delete button
        await page.click(deleteButtonIcon);
        // wait for the Acount deletion page to load
        await page.waitForSelector(acountDeletion, { state: 'visible' });
        // Check if the two options (cancel and proceed) are visible
        await login.click(deleteProcessButton);
        await login.isVisible(deleationACpasscodefirls);
        await login.ExpectIselementInput(deleationACpasscodefirls);
    })
    test('verify that when enter In valid passcode in passcode field for deletion account it should flash error ', async ({ page }) => {
        let login = new Login(page);
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        await login.clickSignButton();
        await page.waitForLoadState('networkidle');
        // click on delete button
        await page.click(deleteButtonIcon);
        // wait for the Acount deletion page to load
        await page.waitForSelector(acountDeletion, { state: 'visible' });
        // Check if the two options (cancel and proceed) are visible
        await login.click(deleteProcessButton);
        // fill invalid invalid passcode 
        await login.fillInput(deleationACpasscodefirls, 'fasdfdsfdsfsafs');
        // click on the continoue button
        const continueButton = page.locator('button', { hasText: 'Continue' });
        // Click the continue button
        await continueButton.click();

        // check assert error message ;

        await login.isExpect(pascodeErrorMsg, 'Invalid Secret Passcode')

    });
    test('verify that when click cancel is should back to Account Overview page', async ({ page }) => {
        let login = new Login(page);
        await login.fillLoginForm('gamer51', 'Torres12!!');
        await login.clickSignButton();
        await page.waitForLoadState('networkidle');
        // click on delete button
        await page.click(deleteButtonIcon);
        // wait for the Acount deletion page to load
        await page.waitForSelector(acountDeletion, { state: 'visible' });
        // Check if the two options (cancel and proceed) are visible
        await login.click(deleteACcancelButton);
        // Check if the Account Overview page is visible
        await login.isExpect(accountOverViewXpath,'Account Overview');
    });
    test.skip('verify that when enter valid passcode for delection account click confirm button is should go the dele', async ({ page }) => {
        let login = new Login(page);
        await login.fillLoginForm('gamer107', 'Torres12!!');
        await login.fillLoginForm('gamer107', 'Torres12!!');
        await login.clickSignButton();
        await page.waitForLoadState('networkidle');

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
        // click on delete button
        await page.click(deleteButtonIcon);
        // wait for the Acount deletion page to load
        await page.waitForSelector(acountDeletion, { state: 'visible' });
        // Check if the two options (cancel and proceed) are visible
        await login.click(deleteProcessButton);
        await login.fillInput(deleationACpasscodefirls, clipboardText);
        const continueButton = page.locator('button', { hasText: 'Continue' });
        // Click the continue button
        await continueButton.click();

        await login.isExpect(deletepageinitiated , "Your Virtua Account Deletion Request is being processed.")


        //
    })





























});
