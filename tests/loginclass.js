class Login{
    constructor (page) {
        this.page = page;
    }
    async fillLoginForm (username , password) {
        await this.page.fill('//*[@id="username"]' ,username)
        await this.page.fill('//*[@id="password"]' , password);
    }
    async signIn (){
        await this.page.click('//*[@id="kc-form-buttons"]')
    }
}

module.exports = {Login};