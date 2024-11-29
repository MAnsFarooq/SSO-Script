const fs = require('fs');
const path = require('path');
const {expect } =require('@playwright/test')
const BasePage = require('./baseclass');
const testData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../flashData/geroWalletCredentials.json'), 'utf-8'));

// import  gero page selector / element ;

const {
    getstartedButtonSelector,
    creatAgeroWalletselector,
    importGeroWallet,
    seedPhraseInputSelector,
    importSeedPhrase,
    importPasswordSelector,
    importConfirmSelector,
    userAgreeSelector,
    userPasswordAgree,
    setUpPasswordSelector,
    continouButtonSelector,
    AllDoneSelector,
    clickOnRadioButton,
    continoueButtonSelector,
    checkMarkselector,
    connectWalletSelector,
    contioueAfterConnect,
    passwordFieldForConfirm,
    nextButtonforConfirm,
    


} = require('../pageElements/gero');

const {
    UserNameInputSelector,
    passwordInputSelectorlogin,
    loginButtonSelector,
    AddWalletSelector,
    CardanoWalletselector,
    addGero,
    walletconnectionicon,
    alreadyConnectedSelector
} = require('../pageElements/profiler')

class Gero extends BasePage{
    constructor(page) {
        super(page);
    };
    async clickOnGetStartedButton(){
        await this.page.click(getstartedButtonSelector)
    };
    async clickOnImportAnAccount(){
        await this.page.click(importGeroWallet);
    };
    async writeSeedPhrase(){
        const seedPhrase = testData.seedPhrase;
        const words = seedPhrase.split(' ');
    
        // Select all matching input fields at once
        const inputFields = await this.page.locator('input[aria-autocomplete="list"]');
    
        for (let i = 0; i < words.length; i++) {
            // Fill each input field with the corresponding word
            await inputFields.nth(i).fill(words[i]);
            await this.page.click(`span.ng-option-label:has-text("${words[i]}")`);
        }
    };
    async clickOnImportSeedPhrase(){
        await this.page.click(importSeedPhrase);
    };
    async writePassword(){
        await this.page.fill(importPasswordSelector, testData.WalletPassword);
    };
    async writeConfirmPassword(){
        await this.page.fill(importConfirmSelector, testData.WalletPassword);
    }
    async clickOnUserAgree(){
        await this.page.click(userAgreeSelector);
    };
    async clickOnUserPasswordAgree(){
        await this.page.click(userPasswordAgree);
    };
    async setUpPassword(){
        await this.page.click(setUpPasswordSelector)
    };
    async clickOnContinouButton(){
        await this.page.click(continouButtonSelector)
    };
    async clickOnAllDone(){
        await this.page.click(AllDoneSelector)
    };
    async loginNonConnected(){
        await this.fillInput(UserNameInputSelector,testData.nonConnectedUsername );
        await this.fillInput(passwordInputSelectorlogin , testData.nonConnectedPassword);
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
    async clickOnGeroWallet(){
        await this.page.click(addGero)
    };
    // Gero Pop Implementation
    async clickOnRadioButtonPopUp(){
        await this.page.click(clickOnRadioButton)
    };
    async clickOnContinoueButtonPopUp(){
        await this.page.click(continoueButtonSelector)
    };
    async checkMarkPopUp(){
        await this.page.click(checkMarkselector)
    };
    async connectWalletPopUp(){
        await this.page.click(connectWalletSelector)
    };
    async clickOnContioueAfterConnectPopUp(gerowalletPop){
        try {
            // Ensure the page is still open before interacting with it
            if (gerowalletPop.isClosed()) {
                console.error("Error: Pop-up page has been closed.");
                return;
            }
    
            // Log page state to check for navigation issues
            console.log("Waiting for 'Continue' button...");
            
            // Wait for the "Continue" button to become visible
            await gerowalletPop.waitForSelector('button:has-text("Continue")', { state: 'visible' });
    
            const continueButton = await gerowalletPop.locator('button:has-text("Continue")');
            // Log the visibility status
            if (await continueButton.isVisible()) {
                await continueButton.click();
                console.log('Successfully clicked the "Continue" button');
            } else {
                console.error('Continue button is not visible');
            }
        } catch (error) {
            console.error(`Error while clicking on Continue after Connect in Gero Pop-up: ${error.message}`);
            console.error(error.stack);
        }
    };
    async WriteWalletPasswordForConfirm(){
        await this.fillInput(passwordFieldForConfirm, testData.WalletPassword);
    };
    async clickOnNextButtonForConfirm(){
        await this.page.click(nextButtonforConfirm)
    };
    async isExpectwalletalreadylinkedtoauserErrorMessage(){
         // Get the text content and compare it with the expected value
         const actualText = await this.page.textContent(alreadyConnectedSelector);
         console.log(`Text found: ${actualText}`);
         console.log("value",'Wallet address already linked to a user' )// Debugging log
         expect(actualText).toContain('Wallet address already linked to a user'); // Assertion to check if the text matches
    }

}
    
    

    
    


module.exports = Gero;