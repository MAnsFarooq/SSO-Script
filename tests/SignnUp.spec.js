const SignUp = require('./signupclass.js');
const fs = require('fs');
const { test, expect } = require('@playwright/test');
const path = require('path');
const testData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../flashData/flashMsg.json'), 'utf-8'));
console.log(testData)

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
}= require('../pageObject/signUp.js')

console.log("===>",UserName);
test.setTimeout(700000);

test.describe('User Registration', () => {
    let signup;

    test.beforeAll(async () => {
        console.log("Running tests");
    });

    test.beforeEach(async ({ page }) => {
        signup = new SignUp(page); // Create instance of SignUp once
        console.log("Navigating to the web page");
        await signup.navigate('https://profile.bimtvist.com');
    });

    // Test to verify that the username field is present
    test('Verify that the username field is present', async () => {
        console.log('UserName:', UserName); 
        await signup.clickCreateAnAccountButton(); 
        const isVisible = await signup.isVisible(UserName); 
        console.log('Is UserName visible:', isVisible); // Log the visibility status
    });
    test('verify That Password Field is password' , async({page}) =>{
        await signup.clickCreateAnAccountButton();
        const  isVisible = await signup.isVisible(Password);
        console.log('Is Password visible:', isVisible); 
        expect(await signup.getAttribute(Password, 'type')).toBe('password');
    });
    test('verify that confirm field is present' , async({page}) =>{
        await signup.clickCreateAnAccountButton();
        const  isVisible = await signup.isVisible(ConfirmPassword);
        console.log('Is ConfirmPassword visible:', isVisible);
    });
    test('verify that upper limit of username username Accept 20 characters ' , async({page}) =>{
        let Login  = new SignUp(page);
        await Login.clickCreateAnAccountButton();
        await Login.fillSignUpform(testData.username20Character , testData.StrongPassword ,testData.StrongPassword);
        await Login.submitForm(SubmitSignForm);
    })
    test('Verify that lower limit of username Accpet 6 characters' , async({page}) =>{
        let Login  = new SignUp(page);
        await Login.clickCreateAnAccountButton();
        await Login.fillSignUpform(testData.sixcharusername , testData.StrongPassword ,testData.StrongPassword);
        await Login.submitForm(SubmitSignForm);
    });
    test('Verify that when username exceeds 20 characters It should flash an error msg' , async({page}) =>{
        let Login  = new SignUp(page);
        await Login.clickCreateAnAccountButton();
        await Login.fillSignUpform(testData.userGreatorThan20 ,testData.StrongPassword ,testData.StrongPassword);
        await Login.submitForm(SubmitSignForm);
        await Login.getText(UserNameErrorMsg, testData.usernameErrorMsg);
        expect(await Login.getText(UserNameErrorMsg)).toBe(testData.usernameErrorMsg);
    })
    test('verify that username less then 6 characters It should flash an error msg' , async({page}) =>{
        let Login  = new SignUp(page);
        await Login.clickCreateAnAccountButton();
        await Login.fillSignUpform(testData.usernamelessThan6, testData.StrongPassword ,testData.StrongPassword);
        await Login.submitForm(SubmitSignForm);
        console.log(testData.UserNameErrorMsg);
        await Login.getText(UserNameErrorMsg, testData.usernameErrorMsg);
    })
    test('verify that username work with 6 characters ' , async({page}) =>{
        let Login  = new SignUp(page);
        await Login.clickCreateAnAccountButton();
        await Login.fillSignUpform(testData.verifyUsername , testData.StrongPassword ,testData.StrongPassword);
        await Login.submitForm(SubmitSignForm);
    })
    test('verify that password less than 8 charartment It should flash an error msg' , async({page}) =>{
        let Login  = new SignUp(page);
        await Login.clickCreateAnAccountButton();
        await Login.fillSignUpform(testData.verifyUsername , testData.passwordLessThan8 ,testData.passwordLessThan8);
        await Login.submitForm(SubmitSignForm);
        await Login.getText(passwordErrorMsg, testData.passwordErrorMsg);
    })




});
