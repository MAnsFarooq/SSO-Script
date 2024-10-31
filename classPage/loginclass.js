const {
    loginUsernameXpath,
    loginPasswordXpath,
    SignButtonEnableXpath,
    eyeIconPasswordXpath,
} = require('../pageElements/login.js');

const {test , expect } = require('@playwright/test')

const BasePage = require('./baseclass.js');

class Login extends BasePage {
    constructor(page){
        super(page);
    };
    async fillLoginForm(username , password){
        await this.fillInput(loginUsernameXpath , username);
        await this.fillInput(loginPasswordXpath , password);
    };
    async clickSignButton(){
        await this.click(SignButtonEnableXpath);
    };
    async togglePasswordVisibility(){
        await this.click(eyeIconPasswordXpath);
        const  typeAttribute =await this.getAttribute(loginPasswordXpath, 'type');
        expect(typeAttribute).toBe('text')
        
        return await this.getAttribute(loginPasswordXpath, 'type') === 'text'
           ? await this.page.inputValue(loginPasswordXpath)
            : '';
    }
    async isPasswordHidden(){
        await this.click(eyeIconPasswordXpath);

        const  typeAttribute =await this.getAttribute(loginPasswordXpath, 'type');
        expect(typeAttribute).toBe('password')
        return await this.getAttribute(loginPasswordXpath, 'type') === 'password';
    };



};

module.exports = Login;

