const SignUp = require('../classPage/signupclass');
const fs = require('fs');
const { test, expect } = require('@playwright/test');
const path = require('path');
const testData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../flashData/flashMsg.json'), 'utf-8'));
//

const {
    UserName,
    Password,
    ConfirmPassword,
    SubmitSignForm,
    UserNameErrorMsg,
    passwordErrorMsg,
    WeakPasswordErrorMsg,
    notSamePasswordXpath,
    secretPasscodePageXpath,
    acountOverViewPageXpath,
    signOutButton,
    secretPasscodepage

} = require('../pageElements/signUp.js')

console.log("===>", UserName);


test.describe('User Registration', () => {
//
    test.beforeAll(async () => {
        console.log("Running tests");
    });

    test.beforeEach(async ({ page }) => {
       //let  signup = new SignUp(page); // Create instance of SignUp once
        console.log("Navigating to the web page");
       await page.goto('/')
    });

    // Test to verify that the username field is present
    test('Verify that the username field is present', async ({page}) => {
        let signup = new SignUp(page)
        console.log('UserName:',UserName );
        await signup.clickCreateAnAccountButton();
        const isVisible = await signup.isVisible(UserName);
        // Expect For Pass Test
        await signup.ExpectIselementInput(UserName);
        // Convert XPath to Locator
        const UserNameLocator = await signup.ConvertXpathToLocator(UserName)
         // Check if the username input field is visible
        expect(UserNameLocator).toBeVisible();
        console.log('Is UserName visible:', isVisible); // Log the visibility status
    });
    test('verify That Password Field is password and visiible', async ({ page }) => {
        let signup = new SignUp(page)
        await signup.clickCreateAnAccountButton();
        const isVisible = await signup.isVisible(Password);
        console.log('Is Password visible:', isVisible);
        // Convert Xpath to Locator
        const PasswordLocator = await signup.ConvertXpathToLocator(Password)
        // Check if the password input field is visible
        expect(PasswordLocator).toBeVisible();
        // Check if the password input field is of type 'password'
        expect(await signup.getAttribute(Password, 'type')).toBe('password');
        // check password field is input 
        await signup.ExpectIselementInput(Password)
    });
    test('verify that confirm field is present', async ({ page }) => {
        let signup = new SignUp(page)
        //click on create an account button
        await signup.clickCreateAnAccountButton();
        // convert Xpath into locator
        const ConfirmPasswordLocator = await signup.ConvertXpathToLocator(ConfirmPassword);
        // Check if the confirm password input field is visible
        expect(ConfirmPasswordLocator).toBeVisible();
        // check confirm password field is input 
        await signup.ExpectIselementInput(ConfirmPassword)
    });
    test('verify that upper limit of username username Accept 20 characters . It should Re-Direct to secret Passcode Page  ', async ({ page }) => {
        let Login = new SignUp(page);
        await Login.clickCreateAnAccountButton();
        await Login.fillSignUpform(testData.username20Character, testData.StrongPassword, testData.StrongPassword);
        await Login.submitForm(SubmitSignForm);
        //check Assertion page redirect to secret passcode 
        await Login.isExpect(secretPasscodepage , 'Secret Passcode')
    })
    test('Verify that lower limit of username Accpet 6 characters', async ({ page }) => {
        let Login = new SignUp(page);
        await Login.clickCreateAnAccountButton();
        await Login.fillSignUpform(testData.sixcharusername, testData.StrongPassword, testData.StrongPassword);
        await Login.submitForm(SubmitSignForm);
        //check assert page redirect to secret passcode page
        await Login.isExpect(secretPasscodePageXpath, 'Secret Passcode');
    });
    test('Verify that when username exceeds 20 characters It should flash an error msg', async ({ page }) => {
        // Create an instance of the SignUp class to interact with the page elements
        let Login = new SignUp(page);
        // Click the 'Create an Account' button to navigate to the registration form
        await Login.clickCreateAnAccountButton();
        // Fill the sign-up form with a username greater than 20 characters, a strong password, and confirm password
        await Login.fillSignUpform(testData.userGreatorThan20, testData.StrongPassword, testData.StrongPassword);
        // Submit the form after filling it with the test data
        await Login.submitForm(SubmitSignForm);
        // Validate that when the username exceeds 20 characters, an error message is displayed for the username field
        await Login.isExpect(UserNameErrorMsg, testData.usernameErrorMsg);
    })
    
    test('verify that username less than 6 characters It should flash an error msg', async ({ page }) => {
        // Create an instance of the SignUp class to interact with the page elements
        let Login = new SignUp(page);
        // Click the 'Create an Account' button to open the sign-up form
        await Login.clickCreateAnAccountButton();
        // Fill the sign-up form with a username that is less than 6 characters, a strong password, and confirm password
        await Login.fillSignUpform(testData.usernamelessThan6, testData.StrongPassword, testData.StrongPassword);
        // Submit the sign-up form with the provided data
        await Login.submitForm(SubmitSignForm);
        // Log the expected error message for debugging purposes
        console.log(testData.UserNameErrorMsg);
        // Check that the username validation error message is displayed when the username is less than 6 characters
        await Login.isExpect(UserNameErrorMsg, testData.usernameErrorMsg);
    })
    
    test('verify that username works with 6 characters', async ({ page }) => {
        // Create an instance of the SignUp class to interact with the page elements
        let Login = new SignUp(page);
        // Click the 'Create an Account' button to open the sign-up form
        await Login.clickCreateAnAccountButton();
        // Fill the sign-up form with a username that is exactly 6 characters long, 
        // a strong password, and confirm password
        await Login.fillSignUpform(testData.verifyUsername, testData.StrongPassword, testData.StrongPassword);
        // Submit the form with the provided data
        await Login.submitForm(SubmitSignForm);
        // Verify that the page redirects to the 'secret passcode' page after successful sign-up
        // Check that the 'secret passcode' page is displayed with the expected title or content
        await Login.isExpect(secretPasscodepage, 'Secret Passcode');
    })

    test('Verify that a password less than 8 characters should flash an error message', async ({ page }) => {
        // Create a new SignUp instance to interact with the signup form
        let Login = new SignUp(page);
        // Click on the "Create An Account" button to open the signup form
        await Login.clickCreateAnAccountButton();
        // Fill the signup form with a username and a password that is less than 8 characters
        await Login.fillSignUpform(testData.verifyUsername, testData.passwordLessThan8, testData.passwordLessThan8);
        // Submit the signup form
        await Login.submitForm(SubmitSignForm);
        // Check if the correct error message for the password validation is displayed
        await Login.isExpect(passwordErrorMsg, testData.passwordErrorMsg);
    });
    
    test('Verify that when the password is weak, it should flash an error message', async ({ page }) => {
        // Create a new SignUp instance to interact with the signup form
        let Login = new SignUp(page);
        // Click on the "Create An Account" button to open the signup form
        await Login.clickCreateAnAccountButton();
        // Log the weak password for debugging purposes
        console.log("password", testData.weakPassword);
        // Fill the signup form with a valid username and a weak password (less secure)
        await Login.fillSignUpform(testData.verifyUsername, testData.WeakPassword, testData.WeakPassword);
        // Submit the signup form
        await Login.submitForm(SubmitSignForm);
        // Check if the correct error message for the weak password validation is displayed
        await Login.isExpect(WeakPasswordErrorMsg, testData.weakPasswordMsg);
    });
    
    test('Verify that when the password and confirm password fields do not match, an error message should be displayed', async ({ page }) => {
        // Create a new SignUp instance to interact with the signup form
        let Login = new SignUp(page);
        // Click on the "Create An Account" button to open the signup form
        await Login.clickCreateAnAccountButton();
        // Fill the signup form with a valid username, a strong password, and a mismatched confirm password
        await Login.fillSignUpform(testData.verifyUsername, testData.StrongPassword, testData.WeakPassword);
        // Submit the signup form
        await Login.submitForm(SubmitSignForm);
        // Verify that the appropriate error message for mismatched passwords is displayed
        await Login.isExpect(notSamePasswordXpath, testData.isNotsamePasswordErrorMsg);
    });
    
    test('verify that when Password and confirm password Eye Icon is clickale and show/hide the Password', async({page}) =>{
        let Login = new SignUp(page);
        await Login.clickCreateAnAccountButton();
        await Login.fillSignUpform(testData.verifyUsername, testData.StrongPassword, testData.StrongPassword);
        //Click eyeIcone Password is visible
        await Login.togglePasswordVisibility();
        // click Password is hide
        await Login.isPasswordHidden();
        //Click eyeIcon Confirm Password is visible
        await Login.toogleConfirmPassVisibility();
        // click Confirm Password is hide
        await Login.isConfirmPassHidden();
    });
    test("Verify that clicking the 'CREATE AN ACCOUNT' button with valid data redirects to the 'Secret Passcode' page", async({page}) => {
        let Login = new SignUp(page);
        // Click the "Create An Account" button to open the sign-up form
        await Login.clickCreateAnAccountButton();
        // Fill the sign-up form with a valid username and strong password for both password fields
        await Login.fillSignUpform(testData.verifyUsername, testData.StrongPassword, testData.StrongPassword);
        // Submit the form to attempt account creation
        await Login.submitForm(SubmitSignForm);
        // Check if the page is redirected to the Secret Passcode page
        await Login.isExpect(secretPasscodePageXpath, testData.secretPasscode);
    });
    
    test('Verify that the “Secret Passcode” is auto-generated, visible to the user, and not editable (readonly)', async({page}) => {
        let Login = new SignUp(page);
        // Click the "Create An Account" button to open the sign-up form
        await Login.clickCreateAnAccountButton();
        // Fill the sign-up form with a valid username and strong password for both fields
        await Login.fillSignUpform(testData.verifyUsername, testData.StrongPassword, testData.StrongPassword);
        // Submit the form to attempt account creation
        await Login.submitForm(SubmitSignForm);
        // Verify that the Secret Passcode is auto-generated, visible, and readonly (not editable)
        await Login.isSecretPasscodeAutoGeneratedAndNotEditable();
    });
    
    test('Verify that the “Secret Passcode” eye icon shows/hides the passcode visibility', async({page}) => {
        let Login = new SignUp(page);
        // Click the "Create An Account" button to open the sign-up form
        await Login.clickCreateAnAccountButton();
        // Fill the sign-up form with a valid username and strong password for both fields
        await Login.fillSignUpform(testData.verifyUsername, testData.StrongPassword, testData.StrongPassword);
        // Submit the form to attempt account creation
        await Login.submitForm(SubmitSignForm);
        // Toggle the visibility of the Secret Passcode by clicking the eye icon
        await Login.toggleSecretPasscodeVisibility();
        // Verify that the Secret Passcode is now hidden
        await Login.isSecretPasscodeHidden();
    });
    
    test("Verify that when the Secret Passcode is not copied, the 'Next' button is disabled", async ({ page }) => {
        let Login = new SignUp(page);
        // Click the "Create An Account" button to open the sign-up form
        await Login.clickCreateAnAccountButton();
        // Fill the sign-up form with a valid username and strong password for both fields
        await Login.fillSignUpform(testData.verifyUsername, testData.StrongPassword, testData.StrongPassword);
        // Submit the form to attempt account creation
        await Login.submitForm(SubmitSignForm);
        // Check if the 'Next' button is disabled when the Secret Passcode is not copied
        await Login.isNextButtonDisabled();
    });
    
    test('verify that copy passcode button is click able and able to copy the Secret Passcode after Next button is Enabled after going to Confirm Secret Passcode page', async({ page }) => {
        let Login = new SignUp(page);
        // Click "Create An Account" button to initiate account creation process
        await Login.clickCreateAnAccountButton();
        // Fill the sign-up form with the provided valid username and strong password
        await Login.fillSignUpform(testData.verifyUsername, testData.StrongPassword, testData.StrongPassword);
        // Submit the sign-up form
        await Login.submitForm(SubmitSignForm);
        // Verify that the "Copy Passcode" button is clickable and functions as expected by copying the passcode
        await Login.isCopyppasscodeButtonisClickbaleAndCopyPasscode();
        // Check if the "Next" button becomes enabled after copying the secret passcode
        await Login.isNextButtonEnable();
        // Verify that the "Confirm Secret Passcode" page is visible after navigating
        await Login.isconfirmSecrtePasscodePageVisibility();
    });
    
    test('verify that copy secret passcode and next button and pasting secret passcode and verify confirm page', async ({ page }) => {
        let Login = new SignUp(page);
        // Click "Create An Account" button to start the registration process
        await Login.clickCreateAnAccountButton();
        // Fill the sign-up form with the test username and strong password
        await Login.fillSignUpform("ssssssssssssssssffff", testData.StrongPassword, testData.StrongPassword);
        // Submit the sign-up form
        await Login.submitForm(SubmitSignForm);
        // Verify that the "Copy Passcode" button is clickable and copy the secret passcode
        await Login.isCopyppasscodeButtonisClickbaleAndCopyPasscode();
        // Check if the "Next" button becomes enabled after the secret passcode is copied
        await Login.isNextButtonEnable();
        // Click on the "Next" button to proceed to the next step
        await Login.clickOnNextButton();
        // Paste the copied secret passcode to verify if it's correctly pasted
        await Login.pasteSecretePasscode();
      
    });
    

    test('verify that valids credentials making an account' , async ({ page }) =>{
        let Login = new SignUp(page);
        await Login.clickCreateAnAccountButton();
        await Login.fillSignUpform("gamers222", testData.StrongPassword, testData.StrongPassword);
        await Login.submitForm(SubmitSignForm);
        await Login.isCopyppasscodeButtonisClickbaleAndCopyPasscode();
        await Login.isNextButtonEnable();
        await Login.clickOnNextButton();
        await Login.pasteSecretePasscode();
        await Login.clickOnConfirmButton();
        await Login.isVisible(acountOverViewPageXpath);
    })

    /// create multiple users
    test.only('verify that valid credentials create an account 30 times', async ({ page }) => {
        for (let i =1 ; i <=20; i++) {
            const Login = new SignUp(page); // Re-instantiate in each loop for fresh state
    
            await test.step(`Run iteration ${i + 1}`, async () => {
                const uniqueUsername = `billo${i}`;
                await Login.clickCreateAnAccountButton();
                await Login.fillSignUpform(uniqueUsername, testData.StrongPassword, testData.StrongPassword);
                await Login.submitForm(SubmitSignForm);
    
                await Login.isCopyppasscodeButtonisClickbaleAndCopyPasscode();
                await Login.isNextButtonEnable();
                await Login.clickOnNextButton();
                await Login.pasteSecretePasscode();
                await Login.clickOnConfirmButton();
    
                // Ensure account creation confirmation is visible
                await Login.isVisible(acountOverViewPageXpath);
                await Login.click('//*[@id="header"]/div[2]/ul/li[2]/div[1]/div/ul/li/div/div[3]/img')
    
                // Navigate or reset state to prepare for next iteration
               await Login.click(signOutButton)
            });
        }
    });
    
    










});
