const fs = require('fs');
const path = require('path');
const {expect}  = require('@playwright/test');
const BasePage = require('./baseclass');

const {
    createWallet,
    importExistingWallet,
    walletNameInputField,
    passwordfieldInputSelector,
    confirmPasswordfieldInputSelector,
    checkTermAndConditions,
    continouButtonSelector,
    selectSeedtype,
    unlockWalletButton, 
    AllowButton,
    signButton,
    password


} = require('../pageElements/typhon');

const {
   UserNameInputSelector,
   passwordInputSelectorlogin,
   loginButtonSelector,
   walletconnectionicon,
   AddWalletSelector,
   CardanoWalletselector,
   addTyphon

} = require('../pageElements/profiler');

const testData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../flashData/typhon.json') , 'utf-8'))

class Typhon extends BasePage {
    constructor(page) {
        super(page);
    };
    async clickOnCreateWallet(){
        console.log(createWallet);
        await this.click(createWallet);
    };
    async clickOnImportExistingWallet(){
        await this.click(importExistingWallet);
    };
    async enterWalletName(){
        await this.fillInput(walletNameInputField,testData.walletName)
    };
    async enterWalletpassword(){
        await this.fillInput(passwordfieldInputSelector, testData.AutheniticatedWalletPassword)
    };
    async enterConfirmWalletpassword(){
        await this.fillInput(confirmPasswordfieldInputSelector, testData.AutheniticatedWalletPassword)
    };
    async checkTermsAndConditions(){
        await this.click(checkTermAndConditions);
    };
    async clickOnContinue(){
        await this.click(continouButtonSelector);
    };
    async selectSeedtype(){
        await this.click(selectSeedtype);
    };
    async writeseedPhrase() {
        const seedPhrase =  testData.AuthentocatedWalletSeedPhrase;
        const words = seedPhrase.split(' ');
        for (let i = 0; i < words.length; i++) {
            // XPath matches an input of type="text" with additional attributes
            await this.fillInput(`(//input[@type="text" and contains(@class, "labelColor2")])[${i + 1}]`, words[i]);
        }
    };
    async unLockwallet(){
        await this.click(unlockWalletButton);
    }

    // SSO implementation
    async loginNonConnected(){
        await this.fillInput(UserNameInputSelector,testData.nonConnectWalletUserName );
        await this.fillInput(passwordInputSelectorlogin , testData.nonConnectWallectUserPassword);
        await this.click(loginButtonSelector);
    }
    async clickOnWalletConnection(){
        await this.page.click(walletconnectionicon)
    }
    async clickOnAddWallet(){
        await this.page.click(AddWalletSelector)
    };
    async clickOnCardano(){
        await this.page.click(CardanoWalletselector)
    };
    async clickOnTyphonWallet(){
        await this.page.click(addTyphon);
    };

    async getOnAllowButton(){
        return await this.page.locator(AllowButton);
    };

    /// Typhon Pop up Window Implementation;
    async ClickOnAllowButton(){
        await this.page.click(AllowButton);
    };
    async clickOnSignButton(){
        await this.page.click(signButton);
    };
    async writePassword(){
        await this.fillInput(password , testData.AutheniticatedWalletPassword);
    };
    

    
}

module.exports = Typhon;