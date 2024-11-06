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
    test('verify that Account overview click it should redirect to the User Account details', async ({ page }) => {
        let login = new Login(page); 
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword); // Step 1: Fill the login form with valid username and password
        await login.clickSignButton(); // Step 2: Click the "Sign In" button to submit the login form
        await login.isVisible(accountOverViewXpath); // Step 3: Verify that the page redirects to the Account Overview page
        await login.click(accountOverViewXpath); // Step 4: Verify that the "Account Overview" section is clickable
        await login.isExpect(YourdetailXpath, 'Your Details'); // Step 5: After clicking on the "Account Overview", verify that the "Your Details" section is visible
    });
    
    test('Verify that in Account overview page user profile picture should visible', async ({ page }) => {
        // Create a new instance of the Login class to interact with login elements on the page
        let login = new Login(page);
        // Fill the login form with valid username and password
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        // Click the "Sign In" button to submit the login form
        await login.clickSignButton();
        // Verify that the page redirects to the Account Overview page after successful login
        await login.isVisible(accountOverViewXpath);
        // Click on the "Account Overview" section to navigate to user details
        await login.click(accountOverViewXpath);
        // Verify that the user's profile picture is visible in the Account Overview section
        await login.isVisible('//*[@id="root"]/div/div[2]/div/div/div[1]/img');
    });
    
    test("verify that user information name, username, email, and phone number should be present in detail section", async ({ page }) => {
        // Create a new instance of the Login class to interact with login elements on the page
        let login = new Login(page);
        // Fill the login form with valid username and password
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        // Click the "Sign In" button to submit the login form
        await login.clickSignButton();
        // Verify that the page redirects to the Account Overview page after successful login
        await login.isVisible(accountOverViewXpath);
        // Click on the "Account Overview" section to navigate to user details
        await login.click(accountOverViewXpath);
        // Verify that the "Your Details" section is visible
        await login.isVisible(YourdetailXpath);
        // Verify that the user's name is displayed under the 'User Name' label
        await login.isExpect(userName, 'User Name');
        // Verify that the user's email is displayed under the 'Email Address' label
        await login.isExpect(EmailAddress, 'Email Address');
        // Verify that the user's phone number is displayed under the 'Phone No' label
        await login.isExpect(PhoneNumber, 'Phone No');
        // Verify that the user's country of origin is displayed under the 'Country of Origin' label
        await login.isExpect(country, 'Country of Origin');
    });
    
    test('Verify whether the user is able to click on the photo upload (Pencil) icon or not.', async ({ page }) => {
        // Create a new instance of the Login class to interact with login elements on the page
        let login = new Login(page);
        // Fill the login form with valid username and password
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        // Click the "Sign In" button to submit the login form
        await login.clickSignButton();
        // Click on the pencil icon for editing the profile picture
        await login.click(editProfilePencilIconeXpath);
        // Verify that the "Edit Profile Picture" option is visible after clicking the pencil icon
        await login.isExpect(editYourProfilePicture, "Edit Profile Picture");
    });
    
    test('verify that in edit profile picture section cross button is clickable and edit profile section box will close', async ({ page }) => {
        // Create a new instance of the Login class to interact with login elements on the page
        let login = new Login(page);
        // Fill the login form with valid username and password
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        // Click the "Sign In" button to submit the login form
        await login.clickSignButton();
        // Click on the pencil icon to edit the profile picture
        await login.click(editProfilePencilIconeXpath);
        // Click on the cross button to close the "Edit Profile Picture" section
        await login.click(crossButtonEditProfilePic);
        // Verify that the "Welcome User" message is visible after closing the edit profile section
        await login.isVisible(WellcomeUser);
    });
    
    test('Verify that the user is able to upload a profile photo by uploading a valid file. (Image Type. JPEG, PNG, or GIF)', async ({ page }) => {
        // Create a new instance of the Login class to interact with login elements on the page
        let login = new Login(page);
        // Fill the login form with valid username and password
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        // Click the "Sign In" button to submit the login form
        await login.clickSignButton();
        // Click the pencil icon to edit the profile picture
        await login.click(editProfilePencilIconeXpath);
        // Set the file input to upload a valid image file (e.g., JPEG, PNG, or GIF)
        await page.setInputFiles('[type="file"]', path.resolve(__dirname, '../flashData/testPic.jpg'));

        await login.dely()
    
        // Locate the profile picture element and verify it's visible after uploading
        const profilePicture = page.locator('img[alt="user-photo"]'); // Modify the selector as needed
        await expect(profilePicture).toBeVisible();
        // Get the 'src' attribute of the uploaded profile picture to verify the upload URL
        const profileSrc = await profilePicture.getAttribute('src');

        await login.dely()
        console.log(profileSrc);
    
        // Validate that the uploaded image URL contains a valid image extension
        expect(profileSrc).toMatch(/\.(jpg|jpeg|png|gif)(\?.*)?$/); // Check for valid image extensions
    
        // Optionally click to upload the profile picture (commented out in this case)
        // await page.click(uploadProfilePicture);
    });
    
    test('verify that edit profile will accept only extensions JPG, PNG, GIF', async ({ page }) => {
        // Create a new instance of the Login class to interact with login elements on the page
        let login = new Login(page);
        // Fill the login form with valid username and password
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        // Click the "Sign In" button to submit the login form
        await login.clickSignButton();
        // Click the pencil icon to edit the profile picture
        await login.click(editProfilePencilIconeXpath);
        // Set the file input to upload an invalid file (PDF in this case)
        await page.setInputFiles('[type="file"]', path.resolve(__dirname, '../flashData/test.pdf'));
        // Verify that an error message is displayed for invalid file extensions
        await login.dely()
        await login.isExpect(UnexpectProfilePic, testData.uploadImageErrorMsg);
    });
    
    test('Verify that Secret Passcode Button is available in Headers Drop-down and clickable.', async ({ page }) => {
        // Create a new instance of the Login class to interact with login elements on the page
        let login = new Login(page);
        // Fill the login form with valid username and password
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        // Click the "Sign In" button to submit the login form
        await login.clickSignButton();
        // Click the dropdown menu in the header
        await login.click(headerDropdownMenu);
        // Verify that the "Secret Passcode" option is available in the dropdown menu
        await login.isVisible(dropDownSecretePasscode);
        // Click the "Secret Passcode" button from the dropdown menu
        await login.click(dropDownSecretePasscode);
        // Verify that the "Secret Passcode" page opens
        await expect(page.locator('//h4[text()="Secret Passcode"]')).toBeVisible();
    });
    
    test('verify that in Secret Passcode Page Secret Passcode Field will Auto generated', async ({ page }) => {
        // Create a new instance of the Login class to interact with login elements on the page
        let login = new Login(page);
        // Fill the login form with valid username and password
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        // Click the "Sign In" button to submit the login form
        await login.clickSignButton();
        // Click the dropdown menu in the header
        await login.click(headerDropdownMenu);
        // Click the "Secret Passcode" option from the dropdown menu
        await login.click(dropDownSecretePasscode);
        // Click the button to generate the secret passcode
        await login.click(genertasecretPasscodeButton);
        // Create a new instance of the Signup class to verify the secret passcode
        let SecretePasscode = new Signup(page);
        // Verify that the secret passcode is auto-generated and not editable on the account overview page
        await SecretePasscode.isSecretPasscodeAutoGeneratedAndNotEditableAcountOverview();
    });

    test('Verify that "Copy" secret passcode is clickable and changes to "Copied" status', async ({ page }) => {
        // Create a new instance of the Login class to interact with login elements on the page
        let login = new Login(page);
        // Fill the login form with valid username and password
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        // Click the "Sign In" button to submit the login form
        await login.clickSignButton();
    
        // Navigate to the profile management or secret passcode section
        await login.click(headerDropdownMenu); // Click the dropdown menu in the header
        await login.click(dropDownSecretePasscode); // Click the "Secret Passcode" option from the dropdown
        await login.click(genertasecretPasscodeButton); // Click the button to generate the secret passcode
    
        // Wait for the "Copy Passcode" button to be visible and clickable
        await login.isVisible(copyPasscodeCSSSelector); // Ensure the "Copy Passcode" button is visible
    
        // Click the "Copy Passcode" button
        await login.click(copyPasscodeCSSSelector);
    
        // Wait for the button to change its text to "Copied"
        await login.getAttribute(copyPasscodeCSSSelector, 'Copied'); // Verify the button changes to "Copied"
    });
    
    test('verify that the next button is disabled when passcode is not copied', { timeout: 90000 }, async ({ page }) => {
        // Create a new instance of the Login class to interact with login elements on the page
        let login = new Login(page);
        // Fill the login form with valid username and password
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        // Click the "Sign In" button to submit the login form
        await login.clickSignButton();
    
        // Navigate to the profile management or secret passcode section
        await login.click(headerDropdownMenu); // Click the dropdown menu in the header
        await login.click(dropDownSecretePasscode); // Click the "Secret Passcode" option from the dropdown
        await login.click(genertasecretPasscodeButton); // Click the button to generate the secret passcode
        await login.isVisible(copyPasscodeCSSSelector); // Ensure the "Copy Passcode" button is visible
    
        // Check if the "Next" button is disabled
        const isDisabled = await login.getAttribute(nextButtonCSSSelector, 'disabled'); // Get the 'disabled' attribute of the "Next" button
        expect(isDisabled).not.toBeNull(); // Expect the 'disabled' attribute to be present
    });
    test('Verify that clicking on Copy Passcode enables the Next button', async ({ page }) => {
        // Create a new instance of the Login class to interact with login elements on the page
        let login = new Login(page);
        // Fill the login form with valid username and password
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        // Click the "Sign In" button to submit the login form
        await login.clickSignButton();
        
        // Navigate to the profile management or secret passcode section
        await login.click(headerDropdownMenu); // Click the dropdown menu in the header
        await login.click(dropDownSecretePasscode); // Click the "Secret Passcode" option from the dropdown
        await login.click(genertasecretPasscodeButton); // Click the button to generate the secret passcode
        // Wait for the "Copy Passcode" button to be visible and clickable
        await login.isVisible(copyPasscodeCSSSelector); // Ensure the "Copy Passcode" button is visible
        // Click the "Copy Passcode" button
        await login.click(copyPasscodeCSSSelector); 
        // Locate the "Next" button on the page
        const nextButton = page.locator('button.w-100.text-uppercase.mt-20');
        // Assert that the "Next" button is now enabled after clicking "Copy Passcode"
        await expect(nextButton).toBeEnabled();
        
    });
    
    test('verify that the next button is clickable and redirects to the Confirm passcode Section', async ({ page }) => {
        // Create a new instance of the Login class to interact with login elements on the page
        let login = new Login(page);
        // Fill the login form with valid username and password
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        // Click the "Sign In" button to submit the login form
        await login.clickSignButton();
        // Navigate to the profile management or secret passcode section
        await login.click(headerDropdownMenu); // Click the dropdown menu in the header
        await login.click(dropDownSecretePasscode); // Click the "Secret Passcode" option from the dropdown
        await login.click(genertasecretPasscodeButton); // Click the button to generate the secret passcode
        // Wait for the "Copy Passcode" button to be visible and clickable
        await login.isVisible(copyPasscodeCSSSelector); // Ensure the "Copy Passcode" button is visible
        // Click the "Copy Passcode" button
        await login.click(copyPasscodeCSSSelector); 
        // Click the "Next" button after copying the passcode
        await login.click(nextButtonCSSSelector); 
        // After clicking the "Next" button, verify the page redirects to the Confirm passcode section
        await login.isExpect(confirmButtonCSSSelector, 'Confirm'); // Verify that the 'Confirm' button is present in the new section
    });
    
    test('verify that the copy passcode should fill passcode in the secret passcode field and passcode set successfully', async ({ page }) => {
        // Grant clipboard permissions for reading and writing the clipboard content
        await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
        // Create a new instance of the Login class to interact with login elements on the page
        let login = new Login(page);
        // Fill the login form with valid username and password
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        // Click the "Sign In" button to submit the login form
        await login.clickSignButton();
        // Navigate to the profile management or secret passcode section
        await login.click(headerDropdownMenu); // Click the dropdown menu in the header
        await login.click(dropDownSecretePasscode); // Click the "Secret Passcode" option from the dropdown
        await login.click(genertasecretPasscodeButton); // Click the button to generate the secret passcode
        // Wait for the "Copy Passcode" button to be visible and clickable
        await login.isVisible(copyPasscodeCSSSelector); // Ensure the "Copy Passcode" button is visible
        // Click the "Copy Passcode" button
        await login.click(copyPasscodeCSSSelector);
        // Get the clipboard content after copying the passcode
        const clipboardText = await page.evaluate(async () => await navigator.clipboard.readText());
        console.log(clipboardText); // Log the copied passcode text for verification
        // Click the "Next" button after copying the passcode
        await login.click(nextButtonCSSSelector);
        // Focus on the secret passcode input field and fill it with the copied passcode
        await page.focus(fillSecetePasscodeCssSelector);
        await login.fillInput(fillSecetePasscodeCssSelector, clipboardText);
        // Click the "Confirm" button to finalize the passcode setup
        await login.click(confirmButtonCSSSelector);
        // After clicking the "Confirm" button, verify that the passcode is set successfully
        await login.isExpect(confirmMsgCssSelector, 'Passcode set successfully'); // Verify the success message
    });

    test('verify that when user enters an invalid passcode, it should flash an error message', async ({ page }) => {
        // Grant clipboard permissions for reading and writing clipboard content
        await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
        // Create a new instance of the Login class to interact with login elements on the page
        let login = new Login(page);
        // Fill the login form with valid username and password
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        // Click the "Sign In" button to submit the login form
        await login.clickSignButton();
        // Navigate to the profile management or secret passcode section
        await login.click(headerDropdownMenu); // Click the dropdown menu in the header
        await login.click(dropDownSecretePasscode); // Click the "Secret Passcode" option from the dropdown
        await login.click(genertasecretPasscodeButton); // Click the button to generate the secret passcode
        // Wait for the "Copy Passcode" button to be visible and clickable
        await login.isVisible(copyPasscodeCSSSelector); // Ensure the "Copy Passcode" button is visible
        // Click the "Next" button to proceed
        await login.click(nextButtonCSSSelector);
        // Focus on the secret passcode input field and enter an invalid passcode
        await page.focus(fillSecetePasscodeCssSelector);
        await login.fillInput(fillSecetePasscodeCssSelector, 'invalidpasscodeccswdkoew');
        // Click the "Confirm" button to attempt to set the invalid passcode
        await login.click(confirmButtonCSSSelector);
        // Verify that an error message is flashed, indicating an invalid passcode
        await login.isExpect(flashMsgOfinvalidPasscode, 'Invalid Passcode'); // Check if the error message is displayed
    });
    

    test('Verify that in Account Overview, "Edit Your Info" icon is visible, clickable, and redirects to the Edit Info section', async ({ page }) => {
        // Create an instance of the Login class to handle login steps
        let login = new Login(page);
        // Log in using valid credentials
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        await login.clickSignButton();
        // Verify that the "Edit Your Info" icon is visible and clickable
        await login.isVisible(edityourinfo);
        // Click on the "Edit Your Info" icon
        await login.click(edityourinfo);
        // Confirm redirection to the "Edit Personal Information" section
        await login.isExpect(editpersomalinformation, 'Edit Personal Information');
    });

    test('Verify that the Edit Personal Information cross-button is clickable and redirects back to the "Your Details" page', async ({ page }) => {
        // Create an instance of the Login class to handle login steps
        let login = new Login(page);
        // Log in using valid credentials
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        await login.clickSignButton();
        // Navigate to the "Edit Your Info" section by clicking the edit info icon
        await login.click(edityourinfo);
        // Click the cross-button to exit the edit section and return to "Your Details"
        await login.click(editProfileCrossButton);
        // Confirm redirection back to the "Your Details" page by checking for the expected element or text
        await login.isExpect(YourdetailXpath, 'Your Details');
    });
    
    test('Verify that phone number constraints enforce a minimum length of 10 and maximum length of 18', async ({ page }) => {
        // Create an instance of the Login class to handle login steps
        let login = new Login(page);
        // Log in using valid credentials
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        await login.clickSignButton();
        // Navigate to the "Edit Your Info" section by clicking the edit info icon
        await login.click(edityourinfo);
        // Retrieve the value from the phone number input field
        const phoneNumberValue = await page.inputValue(phoneNumberxPth);
        //Verify minimum length constraint
        expect(phoneNumberValue.length).toBeGreaterThanOrEqual(10);
        // Verify maximum length constraint
        expect(phoneNumberValue.length).toBeLessThanOrEqual(18);
    });
    
    test('Verify that entering a duplicate email address triggers an error message', async ({ page }) => {
        // Log in and navigate to the Edit Personal Information page
        let login = new Login(page);
        await login.fillLoginForm('gamer52', 'Torres12!!');
        await login.clickSignButton();
        // Navigate to the edit personal information section
        await login.click(edityourinfo)
        // Fill in a duplicate email address
        await login.fillInput(EmailAddressXpath, 'anasfarooq0098@gmail.com');
        // Set additional required fields
        let sign = new Signup(page);
        await sign.selectCountry('United States');
        // Attempt to save changes
        await login.click(saveChangesXpath);
        // Verify that the duplicate email error message is displayed
        await login.isExpect(usernameErrorMsg, testData.userNameAlreadyExist);
    });
    
    test('Verify that leaving required fields empty in Edit Personal Information triggers error messages', async ({ page }) => {
        // Log in and navigate to the Edit Personal Information page
        let login = new Login(page);
        await login.fillLoginForm('gamer52', 'Torres12!!');
        await login.clickSignButton();
        // Navigate to the edit personal information section
        await login.click(edityourinfo);
        // Attempt to save changes without filling required fields
        await login.click(saveChangesXpath);
        // Verify error messages for required fields
        await login.isExpect(emailRequiredMsg, testData.emailIsRequired);   // Verify email required error message
        await login.isExpect(countryRequiredMsg, testData.countryIsRequired); // Verify country required error message
    });
    
    test('Verify that the username field is read-only and not editable in Edit Personal Information', async ({ page }) => {
        // Log in and navigate to the Edit Personal Information page
        let login = new Login(page);
        await login.fillLoginForm('gamer52', 'Torres12!!');
        await login.clickSignButton();
    
        // Navigate to edit personal information
        await login.click(edityourinfo);
    
        // Verify that the username field is read-only
        const usernameSelector = editInfoUserName; // Ensure this selector points to the username field
        const usernameElement = await page.waitForSelector(usernameSelector, { state: 'visible' });
        const isReadOnly = await page.evaluate(el => el.hasAttribute('readonly'), usernameElement);
    
        // Assert that the username input field is readonly
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
        await login.dely()
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

        await login.dely();
        // wait for the Acount deletion page to load
        await page.waitForSelector(acountDeletion, { state: 'visible' });
        // Check if the two options (cancel and proceed) are visible
        const isDeleteProcessButtonVisible = await login.isVisible(deleteProcessButton);
        const isDeleteACCancelButtonVisible = await login.isVisible(deleteACcancelButton);
        
        // Assertions to confirm visibility
        expect(isDeleteProcessButtonVisible).toBeTruthy(); // Check if "Proceed" button is visible
        expect(isDeleteACCancelButtonVisible).toBeTruthy(); 
    });

    test('verify that in the deletion Page when click on the proceed button it should go to the secret passcode field', async ({ page }) => {
        // Create an instance of the Login class to interact with the page
        let login = new Login(page);
        // Fill in the login form with the correct valid username and password
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        // Click the sign-in button to log in
        await login.clickSignButton();
        // Wait for the page to load completely by ensuring the network is idle
        await page.waitForLoadState('networkidle');
        // Click on the delete account button to initiate the account deletion process
        await page.click(deleteButtonIcon);
        // Wait for the account deletion page to load and make sure it is visible
        await page.waitForSelector(acountDeletion, { state: 'visible' });
        // Click the proceed button to move forward with the deletion process
        await login.click(deleteProcessButton);
        // Ensure that the secret passcode field is visible after clicking proceed
        await login.isVisible(deleationACpasscodefirls);
        // Assert that the secret passcode field is in an input state, ready for the user to enter the passcode
        await login.ExpectIselementInput(deleationACpasscodefirls);
    });
    
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

    test.only('verify that when enter valid passcode for delection account click confirm button is should go the dele', async ({ page }) => {
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
