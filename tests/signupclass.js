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
    createAccountButton,
    SubmitSignForm,
} = require('../pageObject/signUp.js');

const BasePage = require('../classPage/baseclass')

class SignUp extends BasePage{
    constructor (page){
        super(page);
    };
    async clickCreateAnAccountButton() {
        await this.click(createAccountButton);
    };
    async fillSignUpform(username, password, confirmPassword) {
        await this.fillInput(UserName, username );
        await this.fillInput(Password, password);
        await this.fillInput(ConfirmPassword, confirmPassword);
    };
    async submitForm(){
        await this.click(SubmitSignForm)
    };
    async togglePasswordVisibility() {
        await this.click(eyeIconSelector);
        return await this.getAttribute(IconEyeIconPassword, 'type') === 'text'
            ? await this.page.inputValue(IconEyeIconPassword)
            : '';
    }

    async isPasswordHidden() {
        return await this.getAttribute(IconEyeIconPassword, 'type') === 'password';
    }
}

module.exports = SignUp;