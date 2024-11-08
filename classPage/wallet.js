
const {
    termsCheckboxSelector,
    createNewWalletButton,
    importAnExistingWalletButton,
    IagreeButton,
    confirmButtonSelector,
    passwordInputSelector,
    confirmPasswordInputSelector,
    termsCheckboxSelectorPassword,
    importWalletButtonSelector,
    gotItButtonSelector,
    nextButtonSelectorAfterGotIt,
     nextButtonTextSelector 


    
} = require('../pageElements/metaMask');

const {ethIconSelector,
    metaMaskButtonSelector
} = require('../pageElements/profiler')
const fs = require('fs');
const path = require('path');
const testData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../flashData/walletCredentials.json'), 'utf-8'));
const BasePage = require('./baseclass');
class Wallet extends BasePage {
    constructor(page) {
        super(page);
    }
    async cleckTermAndconditions(){
        await this.page.click(termsCheckboxSelector);
    };

    async createNewWallet() {
        await this.page.click(createNewWalletButton);
    };

    async importAnExistingWallet(){
        await this.page.click(importAnExistingWalletButton);
    };

    async IAgree() {
        await this.page.click(IagreeButton);
    }
    async writeSeedPhrase(){
        const seedPhrase = testData.AuthentocatedWalletSeedPhrase;
        const words  = seedPhrase.split(' ');
        for (let i = 0; i < words.length; i++) {
            await this.fillInput(`//*[@id="import-srp__srp-word-${i}"]`, words[i]);  // Use XPath for each word field
          } 
    };

    async confirmRecoveryPhrase(){
        await this.page.click(confirmButtonSelector);
    };

    async WriteExistingWalletPassword(){
        await this.fillInput(passwordInputSelector, testData.AutheniticatedWalletPassword);
    };

    async writeConfirmPasswordExisting(){
        await this.fillInput(confirmPasswordInputSelector, testData.AutheniticatedWalletPassword);;
    };
    async markcheckboxAfterFillPassword(){
        await this.page.click(termsCheckboxSelectorPassword);
    }
    async importWallet(){
        await this.page.click(importWalletButtonSelector);
    };
    async gotIt(){
        await this.page.click(gotItButtonSelector);
    };
    async nextAfterGotIt(){
        await this.page.click(nextButtonSelectorAfterGotIt);
    };
    async ethIconClick(){
        await this.page.click(ethIconSelector);
    };
    async clickOnMetaMask(){
        await this.page.click(metaMaskButtonSelector);
    }
    async clickNextafteronMetaMaskExtensionPage(){
        await this.page.waitForSelector(nextButtonTextSelector);

    }
}


module.exports = Wallet;