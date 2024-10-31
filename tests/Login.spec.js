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
    test('TC-SSO 33 Verify that Loggind In with Correct username ' , async({page}) =>{
        let login = new Login(page)
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        await login.clickSignButton();
        await login.isExpect(accountOvewrviewXpath , 'Account Overview');
    });
    test('Verify that when again loggin It will redirect to profile management ' , async ({page}) =>{
        let login = new Login(page)
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        await login.clickSignButton();
        await login.isVisible(accountOvewrviewXpath);
        await page.goto('https://profile.bimtvist.com', { waitUntil: 'networkidle' });
        await login.isExpect(accountOvewrviewXpath , 'Account Overview');
    });
    test("TC-SSO37 Verift that login with correct username and incorrect password flash error msg" , async ({page}) =>{
        let login = new Login(page)
        await login.fillLoginForm(testData.correctValidUserName, testData.incorrectPassword);
        await login.clickSignButton();
        await login.isExpect(errorMsg,testData.loginErrorMsg);  
    });
    test("TC-SSO 39 verify Sign Button is disabled when username  field is empty " , async ({page}) =>{
        let login = new Login(page)
        await login.fillLoginForm('', testData.correctValidPassword);
        await login.isVisible(disableSignButton);
        
    });
    test('TC-SS0 verify Sign Button is disabled when password field is  empty ' , async({page}) =>{
        let login = new Login(page)
        await login.fillLoginForm(testData.correctValidUserName, '');
        await login.isVisible(disableSignButton);
    });
    test('verify that sign button is disabled when both field is empty ' , async({page}) =>{
        let login = new Login(page)
        await login.fillLoginForm('', '');
        await login.isVisible(disableSignButton);
    });
    test('TC-SS0 verify Sign up functionaly when enter correct password in uppercase it should flash error msg' , async({page}) =>{
        let login = new Login(page)
        await login.fillLoginForm(testData.correctValidUserName, testData.uppercasePassword);
        await login.clickSignButton();
        await login.isExpect(errorMsg, testData.loginErrorMsg);
    });
    test('verify that sign Up functionaly when enter coorect password In lower it should flash error msg' , async({page}) =>{
        let login = new Login(page)
        await login.fillLoginForm(testData.correctValidUserName, testData.lowercasePassword);
        await login.clickSignButton();
        await login.isExpect(errorMsg, testData.loginErrorMsg);
    });
    test('verify when navigate to the webpage by default cursor should remain on the username field' , async ({page}) =>{
        await page.waitForSelector(loginUsernameXpath);
        // Step 1: Check if the username field is focused
        const isUsernameFocused = await page.evaluate(() => {
            const usernameField = document.querySelector('input#username'); // Adjust selector
            return document.activeElement === usernameField;
        });
        // Step 2: Assert that the username field is focused
        expect(isUsernameFocused).toBe(true);
    });
    test('verify that password is masked when typing in the password field' , async({page}) =>{
        let login = new Login(page)
        await login.fillLoginForm('', testData.correctValidPassword);
        const passwordType = await login.getAttribute(loginPasswordXpath, 'type');
        // Assert that the type is 'password' (which indicates that the password is masked)
        expect(passwordType).toBe('password');
    
    });
    test('veify that password is eye icon show/hide password' , async({page}) =>{
        let login = new Login(page)
        await login.fillLoginForm('', testData.correctValidPassword);
        await login.togglePasswordVisibility();
        await login.isPasswordHidden();
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

        await page.pause(50000)
    
        // Step 5: Verify the user is logged out
        await login.isVisible(loginUsernameXpath);
    
        // Clean up
        await context.close();
    });
    











})

