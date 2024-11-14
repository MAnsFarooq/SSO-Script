const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');
const { setTimeout: sleep } = require('timers/promises');
const Gero = require('../classPage/geroWallet')

test.describe('Cardano Gero Wallet Integration with SSO', () => {
    let browser;
    let GeroPage; 

    test.beforeAll(async () => {
        const GeroPath = "C:/Users/BiM Dev - 011/AppData/Local/Google/Chrome/User Data/Default/Extensions/bgpipimickeadkjlklgciifhnalhdjhe";

        // Launch the browser with Gero Extension
        browser = await chromium.launchPersistentContext('', {
            headless: false,
            args: [
                `--disable-extensions-except=${GeroPath}`,
                `--load-extension=${GeroPath}`
            ]
        });

        await sleep(5000); // Wait for the extension to load

        // Check for any pages opened by the browser
        const pages = await browser.pages();
        if (pages.length > 0) {
            GeroPage = pages[0];
        }

        // Ensure GeroPage is initialized
        if (!GeroPage) {
            throw new Error("Failed to initialize the GeroPage");
        }
    });

    test('verify that Gero extension is loaded', async () => {
        // Verify the extension's page is available
        await GeroPage.goto('chrome-extension://gbacgmmhkmcifjojhmaimddmdloogjlc/index.html?#/');
        const geroWallet = new Gero(GeroPage);
        await geroWallet.clickOnGetStartedButton();
        await geroWallet.clickOnImportAnAccount();
        await geroWallet.writeSeedPhrase();
        await geroWallet.clickOnImportSeedPhrase();
        await geroWallet.writePassword();
        await geroWallet.writeConfirmPassword();
        await geroWallet.clickOnUserAgree();
        await geroWallet.clickOnUserPasswordAgree();
        await geroWallet.setUpPassword();
        await geroWallet.clickOnContinouButton();
        await geroWallet.clickOnAllDone()
        await sleep(5000)
        // Verify SSO page navigation
        await GeroPage.goto('https://profile.bimtvist.com/');
        await geroWallet.loginNonConnected();
        await geroWallet.clickOnWalletConnection();
        await geroWallet.clickOnAddWallet();
        await geroWallet.clickOnCardano();
        await geroWallet.clickOnGeroWallet();

        // handle Gero Pop-up handle 
        const [geroWalletpopUp] = await Promise.all([
            browser.waitForEvent('page'),  // Listen for the Gero pop-up page
        ]);
        //console.log(geroWalletpopUp , " : found")
        if(!geroWalletpopUp){
            console.log('Pop not found')
        };
        await geroWalletpopUp.waitForLoadState('networkidle');
        const walletPopUp = new Gero(geroWalletpopUp);
        await walletPopUp.clickOnRadioButtonPopUp();
        await walletPopUp.clickOnContinoueButtonPopUp();
        await walletPopUp.checkMarkPopUp();
        await walletPopUp.connectWalletPopUp();
        await geroWalletpopUp.waitForLoadState('networkidle');
        await walletPopUp.clickOnContioueAfterConnectPopUp(geroWalletpopUp);

        //clickOnContinueAfterConnectPopUp
        await sleep(200000);
    });
});
