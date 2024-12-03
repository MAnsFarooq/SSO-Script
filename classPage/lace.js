const {test , expect } = require('@playwright/test');
const basePage = require('./baseclass')
const {
    agreeButton,
    CreateOrRestoreButtonrRestoreButton,
    restoreButton,
    nextButton,
    passwordInputSelector,
    openWalletSelector,
    AuthorizeSelector,
    always,
    confirmation,
    closeButtonWallet
} = require('../pageElements/lace')
const { 
    UserNameInputSelector,
    passwordInputSelectorlogin,
    loginButtonSelector,
    walletconnectionicon,
    AddWalletSelector,
   CardanoWalletselector,
     addLace
} = require('../pageElements/profiler')

const fs = require('fs');
const path = require('path');
const testData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../flashData/laceCredentials.json'), 'utf-8'));
class lace extends basePage {
    constructor(page) {
        super(page);
    };
    async clickAgreeButton() {
        await this.click(agreeButton);
    };
    async clickCreateOrRestoreButton(){
        await this.click(CreateOrRestoreButtonrRestoreButton);
    };
    async clickRestoreButton(){
        await this.click(restoreButton);
    };
    async clickNextButton(){
        await this.click(nextButton);
    };
    async writeSeedPhrase() {
        const seedPhrase = testData.AuthentocatedWalletSeedPhrase;
        const words = seedPhrase.split(' ');
    
        for (let i = 0; i < words.length; i++) {
           
            const selector = `//*[@id="mnemonic-word-${i + 1}"]`; 
            await this.fillInput(selector, words[i]);
        }
    }
    async writeExistingWalletPassword() {
        await this.fillInput(passwordInputSelector, testData.AutheniticatedWalletPassword);
    };
    async writeconfirmPassword(){
        const passwordInput = await this.page.locator('[data-testid="wallet-password-confirmation-input"]');
        await passwordInput.fill(testData.AutheniticatedWalletPassword);
    }
    async clickOnOpenWallet(){
        await this.click(openWalletSelector);
    };
    async Authorize(){
        await this.click(AuthorizeSelector);
    };
    async  clickOnAlways(){
        await this.click(always);
    }
    async clickOnConfirm(){
        await this.click(confirmation);
    }
    async closeWallet(){
        await this.click(closeButtonWallet);
    }
    /// Profiler Implementation
    async LoginNonConnectWalletUser(){
        await this.fillInput(UserNameInputSelector, testData.nonConnectWalletUserName);
        await this.fillInput(passwordInputSelectorlogin, testData.nonConnectWallectUserPassword);
        await this.click(loginButtonSelector); 
       
    };

    async clickOnWalletConnectionIcon(){
        await this.page.click(walletconnectionicon);
    };

    async AddWallet(){
        await this.page.click(AddWalletSelector);
    };
    async AddCardanoWallet(){
        await this.page.click(CardanoWalletselector);
    };
    async AddLaceWallet(){
        await this.page.click(addLace);
    };
}

module.exports = lace