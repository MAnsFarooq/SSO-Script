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
    ErrorMessage,
    secretPasscodefield,
    IconEyeIconPassword,
    passcodeEyeIcon,
    NextButton,
    copyPasscodeButton,
    confirmButton,
    creatAccountButton,
    SubmitSignForm,
    UserNameErrorMsg,
    passwordErrorMsg,
    WeakPasswordErrorMsg,
    notSamePasswordXpath,
    secretPasscodePageXpath,
    acountOverViewPageXpath,

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
        console.log('UserName:', UserName);
        await signup.clickCreateAnAccountButton();
        const isVisible = await signup.isVisible(UserName);
        // Expect For Pass Test
        console.log('Is UserName visible:', isVisible); // Log the visibility status
    });
    test('verify That Password Field is password and visiible', async ({ page }) => {
        let signup = new SignUp(page)
        await signup.clickCreateAnAccountButton();
        const isVisible = await signup.isVisible(Password);
        console.log('Is Password visible:', isVisible);
        expect(await signup.getAttribute(Password, 'type')).toBe('password');
    });
    test('verify that confirm field is present', async ({ page }) => {
        let signup = new SignUp(page)
        await signup.clickCreateAnAccountButton();
        const isVisible = await signup.isVisible(ConfirmPassword);
        console.log('Is ConfirmPassword visible:', isVisible);
    });
    test('verify that upper limit of username username Accept 20 characters ', async ({ page }) => {
        let Login = new SignUp(page);
        await Login.clickCreateAnAccountButton();
        await Login.fillSignUpform(testData.username20Character, testData.StrongPassword, testData.StrongPassword);
        await Login.submitForm(SubmitSignForm);
    })
    test('Verify that lower limit of username Accpet 6 characters', async ({ page }) => {
        let Login = new SignUp(page);
        await Login.clickCreateAnAccountButton();
        await Login.fillSignUpform(testData.sixcharusername, testData.StrongPassword, testData.StrongPassword);
        await Login.submitForm(SubmitSignForm);
    });
    test('Verify that when username exceeds 20 characters It should flash an error msg', async ({ page }) => {
        let Login = new SignUp(page);
        await Login.clickCreateAnAccountButton();
        await Login.fillSignUpform(testData.userGreatorThan20, testData.StrongPassword, testData.StrongPassword);
        await Login.submitForm(SubmitSignForm);
        await Login.isExpect(UserNameErrorMsg, testData.usernameErrorMsg);

    })
    test('verify that username less then 6 characters It should flash an error msg', async ({ page }) => {
        let Login = new SignUp(page);
        await Login.clickCreateAnAccountButton();
        await Login.fillSignUpform(testData.usernamelessThan6, testData.StrongPassword, testData.StrongPassword);
        await Login.submitForm(SubmitSignForm);
        console.log(testData.UserNameErrorMsg);
        await Login.isExpect(UserNameErrorMsg, testData.usernameErrorMsg);
    })
    test('verify that username work with 6 characters ', async ({ page }) => {
        let Login = new SignUp(page);
        await Login.clickCreateAnAccountButton();
        await Login.fillSignUpform(testData.verifyUsername, testData.StrongPassword, testData.StrongPassword);
        await Login.submitForm(SubmitSignForm);
    })
    test('verify that password less than 8 charartment It should flash an error msg', async ({ page }) => {
        let Login = new SignUp(page);
        await Login.clickCreateAnAccountButton();
        await Login.fillSignUpform(testData.verifyUsername, testData.passwordLessThan8, testData.passwordLessThan8);
        await Login.submitForm(SubmitSignForm);
        await Login.isExpect(passwordErrorMsg, testData.passwordErrorMsg);
    });
    test('verify that when password are not strong  it should flash an error msg  ', async ({ page }) => {
        let Login = new SignUp(page);
        await Login.clickCreateAnAccountButton();
        console.log("password", testData.weakPassword);
        await Login.fillSignUpform(testData.verifyUsername, testData.WeakPassword, testData.WeakPassword);
        await Login.submitForm(SubmitSignForm);
        await Login.isExpect(WeakPasswordErrorMsg, testData.weakPasswordMsg);
    });
    test('verify that whem Password and comform field are not same it should flash an error msg', async ({ page }) => {
        let Login = new SignUp(page);
        await Login.clickCreateAnAccountButton();
        await Login.fillSignUpform(testData.verifyUsername, testData.StrongPassword, testData.WeakPassword);
        await Login.submitForm(SubmitSignForm);
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
    test("Verify that on clicking “CREAT AN ACCOUNT” by entering valid data it should moves to “Secret Passcode” page " , async({page}) =>{
        let Login = new SignUp(page);
        await Login.clickCreateAnAccountButton();
        await Login.fillSignUpform(testData.verifyUsername, testData.StrongPassword, testData.StrongPassword);
        await Login.submitForm(SubmitSignForm);
        await Login.isExpect(secretPasscodePageXpath , testData.secretPasscode);
    });
    test('Verify that “Secret Passcode” is auto generating and visible to user  and secrete passcode are not editable readonly', async({page}) =>{
        let Login = new SignUp(page);
        await Login.clickCreateAnAccountButton();
        await Login.fillSignUpform(testData.verifyUsername, testData.StrongPassword, testData.StrongPassword);
        await Login.submitForm(SubmitSignForm);
        await Login.isSecretPasscodeAutoGeneratedAndNotEditable();
    });
    test('verify that secrete passcode eye is hidee/show' , async({page}) =>{
        let Login = new SignUp(page);
        await Login.clickCreateAnAccountButton();
        await Login.fillSignUpform(testData.verifyUsername, testData.StrongPassword, testData.StrongPassword);
        await Login.submitForm(SubmitSignForm);
        await Login.toggleSecretPasscodeVisibility();
        await Login.isSecretPasscodeHidden();
    });
    test("verify that when secrete Passcode is not Copy so next button button disable" , async ( { page}) =>{
        let Login = new SignUp(page);
        await Login.clickCreateAnAccountButton();
        await Login.fillSignUpform(testData.verifyUsername, testData.StrongPassword, testData.StrongPassword);
        await Login.submitForm(SubmitSignForm);
        await Login.isNextButtonDisabled()
    });
    test('verify that copy passcode button is click able and able to copy tha Seceret Passcode after Next button is Enable after going to Confirm Secret Passcode page' , async({ page}) =>{
        let Login = new SignUp(page);
        await Login.clickCreateAnAccountButton();
        await Login.fillSignUpform(testData.verifyUsername, testData.StrongPassword, testData.StrongPassword);
        await Login.submitForm(SubmitSignForm);
        await Login.isCopyppasscodeButtonisClickbaleAndCopyPasscode();
        await Login.isNextButtonEnable();
        await Login.isconfirmSecrtePasscodePageVisibility();
    });
    test('verify that copy secret passcode and next button and pasting secret passcode and verfiy confirm page ' , async ({ page}) =>{
        let Login = new SignUp(page);
        await Login.clickCreateAnAccountButton();
        await Login.fillSignUpform("ssssssssssssssssffff", testData.StrongPassword, testData.StrongPassword);
        await Login.submitForm(SubmitSignForm);
        await Login.isCopyppasscodeButtonisClickbaleAndCopyPasscode();
        await Login.isNextButtonEnable();
        await Login.clickOnNextButton();
        await Login.pasteSecretePasscode();
    });
    test('verify that valids credentials making an account' , async ({ page }) =>{
        let Login = new SignUp(page);
        await Login.clickCreateAnAccountButton();
        await Login.fillSignUpform(testData.validUsername, testData.StrongPassword, testData.StrongPassword);
        await Login.submitForm(SubmitSignForm);
        await Login.isCopyppasscodeButtonisClickbaleAndCopyPasscode();
        await Login.isNextButtonEnable();
        await Login.clickOnNextButton();
        await Login.pasteSecretePasscode();
        await Login.clickOnConfirmButton();
        await Login.isVisible(acountOverViewPageXpath);
    })
    










});
