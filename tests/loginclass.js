const {
    loginUsernameXpath,
    loginPasswordXpath,
    SignButtonEnableXpath,
    eyeIconPasswordXpath,
} = require('../pageObject/login.js');


const BasePage = require('../classPage/baseclass');

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
        return await this.getAttribute(loginPasswordXpath, 'type') === 'text'
           ? await this.page.inputValue(loginPasswordXpath)
            : '';
    }
    async isPasswordHidden(){
        return await this.getAttribute(loginPasswordXpath, 'type') === 'password';
    };



};

module.exports = Login;

