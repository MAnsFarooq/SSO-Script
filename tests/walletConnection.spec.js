const Wallet = require('../classPage/wallet');
const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');
const { setTimeout: sleep } = require('timers/promises');

const {
    UserNameInputSelector,
    passwordInputSelector,
    loginButtonSelector
} = require('../pageElements/profiler');

const {
    termsCheckboxSelector,
    createNewWalletButton,
    importAnExistingWalletButton
} = require('../pageElements/metaMask');

test.describe('Wallet Connection Integration Tests', () => {
    let browser;
    let metaMaskPage;

    test.beforeAll(async () => {
        const metamaskPath = 'C:/Users/BiM Dev - 011/AppData/Local/Google/Chrome/User Data/Default/Extensions/nkbihfbeogaeaoehlefnkodbefgpgknn/12.5.1_0';

        // Launch the browser with MetaMask extension
        browser = await chromium.launchPersistentContext('', {
            headless: false,
            args: [
                `--disable-extensions-except=${metamaskPath}`,
                `--load-extension=${metamaskPath}`
            ],
        });

        await sleep(10000);  // Wait for MetaMask to load

        // Close any initial blank tabs
        const pages = await browser.pages();
        for (const page of pages) {
            if ((await page.url()) === 'about:blank') {
                await page.close();
            }
        }

        // Assign MetaMask page after blank tabs are closed
        metaMaskPage = (await browser.pages())[0];
    });

    test('Test MetaMask Wallet Connection', async () => {
        const wallet = new Wallet(metaMaskPage);

        // Ensure terms and conditions are accepted
        await wallet.cleckTermAndconditions();
        await wallet.importAnExistingWallet()
        await wallet.IAgree()
        await s
        sleep(3000)
        // Navigate to the profile page
        await metaMaskPage.goto('https://profile.bimtvist.com/');
        await sleep(5000);
    });

    test.only('Verify that when signing in with a MetaMask wallet already linked to another profile, an error message is displayed.', async () => {
        const wallet = new Wallet(metaMaskPage);
        await wallet.cleckTermAndconditions();
        await wallet.importAnExistingWallet()
        await wallet.IAgree();
        await wallet.writeSeedPhrase();
        await wallet.confirmRecoveryPhrase();
        await wallet.WriteExistingWalletPassword();
        await wallet.writeConfirmPasswordExisting();
        await wallet.markcheckboxAfterFillPassword();
        await wallet.importWallet();
        await wallet.gotIt();
        await wallet.nextAfterGotIt();
        await sleep(20000);
        await metaMaskPage.goto('https://profile.bimtvist.com/');
        await wallet.ethIconClick()
        await wallet.clickOnMetaMask();
        await wallet.clickNextafteronMetaMaskExtensionPage()

        await sleep(30000);
    })

    test.afterAll(async () => {
        // Close the browser after tests are done
        await browser.close();
    });
});
