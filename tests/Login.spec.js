const { test, expect } = require('@playwright/test');
const  Login  = require('../classPage/loginclass.js');
const fs = require('fs');
const path = require('path');
const testData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../flashData/flashMsg.json'), 'utf-8'));

const {
    SignButtonEnableXpath,
    eyeIconPasswordXpath,
    loginUsernameXpath,
    loginPasswordXpath,
    accountOvewrviewXpath,
    errorMsg,
    disableSignButton
} = require('../pageElements/login.js');
//console.log(testData)

test.describe('Verify that Sigun-In test work as expected', () => {
    //let login ;
    test.beforeAll(async () => {
        console.log(" Tests is starting all test are running parallel");
    });
    test.beforeEach(async ({ page }) => {
        await page.goto('/', { waitUntil: 'networkidle' });
    });
    test('TC-SSO 33 Verify that Loggind In with Correct username', async({page}) => {
        let login = new Login(page)
        // Fill the login form with the correct username and password
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        // Click the "Sign In" button to submit the login form
        await login.clickSignButton();
        // Verify that the "Account Overview" page is displayed after successful login
        await login.isExpect(accountOvewrviewXpath , 'Account Overview');
    });
    
    test('Verify that after logging in again, the user is redirected to the profile management page', async ({page}) => {
        let login = new Login(page)
        // Fill the login form with the correct username and password
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        // Click the "Sign In" button to submit the login form
        await login.clickSignButton();
        // Verify that the "Account Overview" page is visible after successful login
        await login.isVisible(accountOvewrviewXpath);
        // Navigate to the profile management page
        await page.goto('https://profile.bimtvist.com', { waitUntil: 'networkidle' });
        // Verify that the "Account Overview" page is visible after navigating to profile management
        await login.isExpect(accountOvewrviewXpath , 'Account Overview');
    });
    test("TC-SSO37 Verify that login with correct username and incorrect password flashes error message", async ({page}) => {
        let login = new Login(page)
        // Fill the login form with the correct username and incorrect password
        await login.fillLoginForm(testData.correctValidUserName, testData.incorrectPassword);
        // Click the "Sign In" button to submit the form
        await login.clickSignButton();
        // Verify that the appropriate error message is displayed
        await login.isExpect(errorMsg, testData.loginErrorMsg);  
    });
    
    test("TC-SSO 39 Verify Sign Button is disabled when username field is empty", async ({page}) => {
        let login = new Login(page)
        // Fill the login form with an empty username and a valid password
        await login.fillLoginForm('', testData.correctValidPassword);
        // Verify that the "Sign In" button is disabled when the username field is empty
        await login.isVisible(disableSignButton);
        await login.dely()
    });

    test('TC-SSO Verify Sign Button is disabled when password field is empty', async({page}) => {
        let login = new Login(page)
        // Fill the login form with a valid username and an empty password field
        await login.fillLoginForm(testData.correctValidUserName, '');
        // Verify that the "Sign In" button is disabled when the password field is empty
        await login.isVisible(disableSignButton);
        await login.dely()
    });

    test('verify that sign button is disabled when both fields are empty', async({page}) => {
        let login = new Login(page)
        // Fill the login form with both the username and password fields empty
        await login.fillLoginForm('', '');
        // Verify that the "Sign In" button is disabled when both fields are empty
        await login.isVisible(disableSignButton);
        await login.dely();
    });
    
    test('TC-SS0 verify Sign up functionality when enter correct password in uppercase it should flash error msg', async({page}) => {
        let login = new Login(page)
        // Fill the login form with a valid username and a password in uppercase
        await login.fillLoginForm(testData.correctValidUserName, testData.uppercasePassword);
        // Click the "Sign In" button to submit the login form
        await login.clickSignButton();
        // Verify that the correct error message is displayed due to the uppercase password
        await login.isExpect(errorMsg, testData.loginErrorMsg);
    });
    
    test('verify that sign Up functionality when enter correct password in lowercase it should flash error msg', async({page}) => {
        let login = new Login(page)
        // Fill the login form with a valid username and a password in lowercase
        await login.fillLoginForm(testData.correctValidUserName, testData.lowercasePassword);
        // Click the "Sign In" button to submit the login form
        await login.clickSignButton();
        // Verify that the correct error message is displayed due to the lowercase password
        await login.isExpect(errorMsg, testData.loginErrorMsg);
    });
    
    test('verify when navigate to the webpage by default cursor should remain on the username field', async ({page}) => {
        // Step 1: Wait for the username field to be visible on the page
        await page.waitForSelector(loginUsernameXpath);
        
        // Step 2: Check if the username field is focused by default
        const isUsernameFocused = await page.evaluate(() => {
            const usernameField = document.querySelector('input#username'); // Adjust selector to match the username field
            return document.activeElement === usernameField; // Check if the active (focused) element is the username field
        });
    
        // Step 3: Assert that the username field is focused (cursor should be on it by default)
        expect(isUsernameFocused).toBe(true);
    });
    
    test('verify that password is masked when typing in the password field', async({page}) => {
        let login = new Login(page);
        // Step 1: Fill in the login form with a valid password (password field should mask input)
        await login.fillLoginForm('', testData.correctValidPassword);
        // Step 2: Get the 'type' attribute of the password field to check if it's set to 'password' (indicating it's masked)
        const passwordType = await login.getAttribute(loginPasswordXpath, 'type');
        // Step 3: Assert that the 'type' of the password field is 'password', ensuring the input is masked
        expect(passwordType).toBe('password');
    });
    
    test('verify that password is eye icon show/hide password', async({page}) => {
        let login = new Login(page);
        // Step 1: Fill the login form with a valid password, but leave the username empty
        await login.fillLoginForm('', testData.correctValidPassword);
        // Step 2: Click on the eye icon to toggle password visibility (show password)
        await login.togglePasswordVisibility();
        // Step 3: Verify that the password is visible after clicking the eye icon
        await login.isPasswordHidden();  // You may need to change this method to verify visibility depending on how your implementation works
    });
    
    test('Verify closing and reopening the browser does not log out authenticated user', async ({ browser }) => {
        // Step 1: Launch a new browser context
        const context = await browser.newContext();
        const page = await context.newPage();
        
        // Step 2: Create a new Login instance
        let login = new Login(page);
    
        // Step 3: Navigate to the login page
        await page.goto('https://profile.bimtvist.com/login'); // Adjust the URL if needed
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        await login.clickSignButton();
    
        // Step 4: Verify the account overview is visible after login
        await login.isVisible(accountOvewrviewXpath);

        await context.storageState({ path: 'storageState.json' });
    
        await login.dely()
        // Step 5: Close the context (this will close the entire browser)c
        await context.close();
        // Step 6: Reopen a new browser context
        const newContext = await browser.newContext({ storageState: 'storageState.json' });
        const newPage = await newContext.newPage();
    
        // Step 7: Navigate to the application URL
        await newPage.goto('https://profile.bimtvist.com');
    
        // Step 8: Create a new Login instance for the new context
        let newLogin = new Login(newPage);
    
        // Step 9: Check if the account overview is still visible
        await newLogin.isVisible(accountOvewrviewXpath);
    
        // Step 10: Clean up

        await newContext.close();
    });

    test('Verify login session timeout duration', async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const login = new Login(page);
    
        // Step 1: Log in with valid credentials
        await page.goto('https://profile.bimtvist.com/login');
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        await login.clickSignButton();
    
        // Step 2: Verify the user is logged in
        await login.isVisible(accountOvewrviewXpath); // Adjust to your app's selector
    
        // Step 3: Simulate session expiration
        // Clear cookies to simulate session timeout
        await context.clearCookies();
    
        // Step 4: Attempt to access the protected resource after clearing cookies
        await page.reload();

        //await page.pause(50000)
    
        // Step 5: Verify the user is logged out
        await login.isVisible(loginUsernameXpath);

        await login.dely()
    
        // Clean up
        await context.close();
    });
    











})

