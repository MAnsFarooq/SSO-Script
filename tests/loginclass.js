class Login{
    constructor (page) {
        this.page = page;
    }
    async fillLoginForm (username , password) {
        await this.page.fill('//*[@id="username"]' ,username )
        await this.page.fill('//*[@id="password"]' , password);
    }
    async signIn (){
        await this.page.waitForSelector('//*[@id="kc-login"]' , {state : 'visible'});
        await this.page.click('//*[@id="kc-login"]');
    }
}
module.exports = {Login};