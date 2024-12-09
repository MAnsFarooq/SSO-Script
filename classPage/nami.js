const {test , expect } = require('@playwright/test');
const basePage = require('./baseclass')
const {
   iAgreeSelector
} = require('../pageElements/nami');
const { 
    UserNameInputSelector,
    passwordInputSelectorlogin,
    loginButtonSelector,
    walletconnectionicon,
    AddWalletSelector,
   CardanoWalletselector,
    addnami
} = require('../pageElements/profiler')

const fs = require('fs');
const path = require('path');
const testData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../flashData/namiCredentials.json'), 'utf-8'));

class Nami extends basePage {
    constructor(page) {
        super(page);
    };
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
    async AddNamiWallet(){
        await this.page.click(addnami);
    };
    ////////////////
    async Iagree(){
        await this.page.click(this.Iagree);
    }
}
//////////////

module.exports = Nami;