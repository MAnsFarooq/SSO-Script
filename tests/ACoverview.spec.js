const {test , expect } = require('@playwright/test');
const fs  = require ('fs');
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
    editYourProfilePicture ,
    crossButtonEditProfilePic,
    WellcomeUser,
    uploadProfilePicture,
    UnexpectProfilePic ,
    headerDropdownMenu,
    dropDownSecretePasscode,
    genertasecretPasscodeButton,
} = require('../pageObject/acount.js');

const {
    loginUsernameXpath ,
    loginPasswordXpath,
    SignButtonEnableXpath,
   
} = require('../pageObject/login.js');
const { copyPasscodeButton } = require('../pageObject/signUp.js');

test.describe('Verify that account page test work as expected', () => {
    let account;
    test.beforeAll(async () => {
        console.log("Tests is starting all test are running parallel");
    });
    test.beforeEach(async ({ page }) => {
        //account = new Account(page); // Create instance of Account once
        await page.goto('https://profile.bimtvist.com', { waitUntil: 'networkidle' });
    });
    test('verify that Account overview click it should redirect to the User Acount details', async({page}) => {
        let login = new Login(page);
        await login.fillLoginForm(testData.correctValidUserName , testData.correctValidPassword);
        await login.clickSignButton();
        // Verify that Page Redirect to Acount OverView page;
        await login.isVisible(accountOverViewXpath);
        // verify that Acount OverView is Click Able 
        await login.click(accountOverViewXpath);
        //verify that Acount overView page details section is Visible;
        await login.getAttribute(YourdetailXpath ,'Your Details')
    });
    test('Verify that in Acount overview page user profile picture should visible' ,async ({page}) =>{
        let login = new Login(page);
        await login.fillLoginForm(testData.correctValidUserName , testData.correctValidPassword);
        await login.clickSignButton();
        await login.isVisible(accountOverViewXpath);
        await login.click(accountOverViewXpath);
        await login.isVisible('//*[@id="root"]/div/div[2]/div/div/div[1]/img')
        //expect(iVisible).toBeVisible()
    })
    test("verify that user information name  , username , email and phone number should be present in detail section" , async({page})=>{
        let login = new Login(page);
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        await login.clickSignButton();
        await login.isVisible(accountOverViewXpath);
        await login.click(accountOverViewXpath);
        await login.isVisible(YourdetailXpath);
        await login.getAttribute(userName, 'User Name');
        await login.getAttribute(EmailAddress, 'Email Address');
        await login.getAttribute(PhoneNumber,  'Phone No');
        await login.getAttribute(country ,'Country of Origin' )
    });
    test('Verify whether the user is able to click on the photo upload (Pencil) icon or not. ' , async ({page}) =>{
        let login = new Login(page);
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        await login.clickSignButton();
        await login.click(editProfilePencilIconeXpath);
        await login.getAttribute(editYourProfilePicture , "Edit Profile Picture")
    })
    test('verify that in edit profile picture section cross buttin is clickable and edit profile section box will close ' , async ({page}) =>{
        let login = new Login(page);
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        await login.clickSignButton();
        await login.click(editProfilePencilIconeXpath);
        await login.click(crossButtonEditProfilePic);
        await login.isVisible(WellcomeUser);
    });
    test('Verify that the user is able to upload a profile photo by uploading a valid file. (Image Type. JPEG, PNG, or GIF) ,'  ,async({page}) =>{
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
        await page.click(uploadProfilePicture );
    });
    test('verify tha that edit profile will Accept only exention JPG , PNG , GIF' , async({ page}) => {
        let login = new Login(page);
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        await login.clickSignButton();
        await login.click(editProfilePencilIconeXpath);
        //await page.waitForSelector('[type="file"]', { state: 'visible' });
        await page.setInputFiles('[type="file"]', path.resolve(__dirname, '../flashData/test.pdf'));
        await login.getAttribute(UnexpectProfilePic , testData.uploadImageErrorMsg);
    });
    test('Verify that Secret Passcode Button is available in Headers Drop-down and clickable.' , async({ page}) =>{
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
    test('verify that in Secrete passcode Page Secret Passcode Field will Auto generated' , async ({page}) =>{
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

    test.only('Verify that "Copy" secret passcode is clickable and changes to "Copied" status', async ({ page }) => {
        // Log in and navigate to the relevant page (update login details or steps as necessary)
        let login = new Login(page);
        await login.fillLoginForm(testData.correctValidUserName, testData.correctValidPassword);
        await login.clickSignButton();
        
        // Navigate to the profile management or secret passcode section
        await login.click(headerDropdownMenu); // Adjust the selector for the dropdown
        await login.click(dropDownSecretePasscode);
        await login.click(genertasecretPasscodeButton);
        
        // Wait for the "Copy Passcode" button to be visible and clickable
       
        await expect(copyPasscodeButton).toBeVisible();
        
        // Click the "Copy Passcode" button
        await login.click(copyPasscodeButton);
        
        // Wait for the button to change its text to "Copied"
        const copiedStatus = page.locator(copyPasscodeButton); // Selector for the button after clicking
        await expect(copiedStatus).toBeVisible();
        
        // Verify that the text has changed to "Copied"
        const buttonText = await copiedStatus.innerText();
        expect(buttonText).toBe('Copied');
    });
  








 

});
