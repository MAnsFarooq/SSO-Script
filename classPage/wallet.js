

const { expect } = require('@playwright/test')
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
    nextButtonTextSelector,
    Done,
    networkSelectDropDown,
    checkTestNetwork,
    selectSopliaNetwork



} = require('../pageElements/metaMask');

const { ethIconSelector,
    metaMaskButtonSelector,
    UserNameInputSelector,
    passwordInputSelectorlogin,
    loginButtonSelector,
    walletconnectionicon,
    AddWalletSelector,
    addEthereumSelector,
    addMetamask,
    alreadyConnectedSelector
} = require('../pageElements/profiler')
const fs = require('fs');
const path = require('path');
const testData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../flashData/walletCredentials.json'), 'utf-8'));
const BasePage = require('./baseclass');
class Wallet extends BasePage   {
    constructor(page) {
        super(page);
    }
    async cleckTermAndconditions() {
        await this.page.click(termsCheckboxSelector);
    };

    async createNewWallet() {
        await this.page.click(createNewWalletButton);
    };

    async importAnExistingWallet() {
        await this.page.click(importAnExistingWalletButton);
    };

    async IAgree() {
        await this.page.click(IagreeButton);
    }
    async writeSeedPhrase() {
        const seedPhrase = testData.AuthentocatedWalletSeedPhrase;
        const words = seedPhrase.split(' ');
        for (let i = 0; i < words.length; i++) {
            await this.fillInput(`//*[@id="import-srp__srp-word-${i}"]`, words[i]);  // Use XPath for each word field
        }
    };

    async confirmRecoveryPhrase() {
        await this.page.click(confirmButtonSelector);
    };

    async WriteExistingWalletPassword() {
        await this.fillInput(passwordInputSelector, testData.AutheniticatedWalletPassword);
    };

    async writeConfirmPasswordExisting() {
        await this.fillInput(confirmPasswordInputSelector, testData.AutheniticatedWalletPassword);;
    };
    async markcheckboxAfterFillPassword() {
        await this.page.click(termsCheckboxSelectorPassword);
    }
    async importWallet() {
        await this.page.click(importWalletButtonSelector);
    };
    async gotIt() {
        await this.page.click(gotItButtonSelector);
    };
    async nextAfterGotIt() {
        await this.page.click(nextButtonSelectorAfterGotIt);
    };
    async ethIconClick() {
        await this.page.click(ethIconSelector);
    };
    async clickOnMetaMask() {
        await this.page.click(metaMaskButtonSelector);
    }
    async clickNextafteronMetaMaskExtensionPage() {
        await this.page.waitForSelector(nextButtonTextSelector);

    };
    async networkSelectDropDown() {
        await this.page.click(networkSelectDropDown)
    }
    async checkTestNetwork() {
        await this.page.click(checkTestNetwork)
    };
    async selectSopliaNetwork() {
        await this.page.click(selectSopliaNetwork)
    };
    async Done(){
        await this.page.click(Done);
    }
    // Class method in Wallet class
    async attemptToClickMetaMaskPopUpNext(metamaskPopup) {
        try {
            // Wait until the "Next" button is visible and enabled, with a timeout
            await metamaskPopup.waitForSelector('button:has-text("Next")', { timeout: 10000 });

            // Click the "Next" button
            await metamaskPopup.locator('button:has-text("Next")').click();
            console.log("Clicked MetaMask 'Next' button successfully.");
        } catch (error) {
            console.error("Failed to click the MetaMask 'Next' button:", error);
        }
    };
    async attemptToClickMetaMaskPopUpConfirm(metamaskPopup) {
        try {
            await metamaskPopup.waitForSelector('button:has-text("Confirm")', { timeout: 10000 });
            await metamaskPopup.locator('button:has-text("Confirm")').click();
            console.log("MetaMask connection confirmed.");
        } catch (error) {
            console.log("MetaMask Confirm button not found or failed:", error);
        }
    };
    async attemptToClickMetaMaskPopUpSignRequestConfirm(metamaskPopup) {
        try {
            await metamaskPopup.waitForSelector('button:has-text("Confirm")', { timeout: 10000 });
            await metamaskPopup.locator('button:has-text("Confirm")').click();
            console.log("MetaMask connection confirmed.");
        } catch (error) {
            console.log("MetaMask Confirm button not found or failed:", error);
        }
    };

    async fillLoginFormNonConnectWallet(){
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
    async AddEthereum(){
        await this.page.click(addEthereumSelector);
    };
    async AddMetamask(){
        await this.page.click(addMetamask);
    };
    async isExpectWalletaddressalreadylinkedtoauser(){
        await this.page.waitForSelector(alreadyConnectedSelector, { state: 'visible', timeout: 60000 });

        // Get the text content and compare it with the expected value
        const actualText = await this.page.textContent(alreadyConnectedSelector);
        console.log(`Text found: ${actualText}`);
        console.log("value",'Wallet address already linked to a user' )// Debugging log
        expect(actualText).toContain('Wallet address already linked to a user'); // Assertion to check if the text matches
    }



}


module.exports = Wallet;