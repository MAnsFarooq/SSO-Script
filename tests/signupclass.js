class SignUp {
    constructor(page) {
        this.page = page;
        this.passEyeIconSelector = '//*[@id="kc-register-form"]/div[2]/div/div/span/img';
        this.passwordFieldSelector = '//*[@id="password"]';
    }
    async createAnAccount() {
        await this.page.waitForSelector('//*[@id="kc-form-login"]/div[3]/div[1]/div/span/a', { timeout: 10000 });
        await this.page.click('//*[@id="kc-form-login"]/div[3]/div[1]/div/span/a');
    };
    async fillSignUpform(username , password , passwordConfirm)  {
        await this.page.fill('//*[@id="username"]', username);
        await this.page.fill('//*[@id="password"]', password);
        await this.page.fill('//*[@id="password-confirm"]', passwordConfirm);
    }
    async submitForm() {
        await this.page.click('//*[@id="kc-form-buttons"]/input');
    };
    async togglePasswordVisibility() {
        return await this.page.inputValue(this.passwordFieldSelector);
    };
    async waitForPasswordField() {
        await this.page.waitForSelector(this.passwordFieldSelector, { timeout: 10000 });
    };
    async isPasswordHidden() {
        const passwordType = await this.page.getAttribute(this.passwordFieldSelector, 'type');
    return passwordType === 'password';
    };
}
module.exports = {SignUp};