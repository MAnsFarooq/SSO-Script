const Wallet = require('../classPage/wallet');
const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');
const { setTimeout: sleep } = require('timers/promises');


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

    test.only('Verify this when try to Login with wallet that are already link with other Account It should generate error', async () => {
        try {
            const wallet = new Wallet(metaMaskPage);
    
            // Ensure terms and conditions are accepted
            await wallet.cleckTermAndconditions();
            await wallet.importAnExistingWallet();
            await wallet.IAgree();
            await wallet.writeSeedPhrase();
            await wallet.confirmRecoveryPhrase();
            await wallet.WriteExistingWalletPassword();
            await wallet.writeConfirmPasswordExisting();
            await wallet.markcheckboxAfterFillPassword();
            await wallet.importWallet();
            await wallet.gotIt();
            await wallet.nextAfterGotIt();
            await wallet.Done();
    
            await wallet.networkSelectDropDown();
            await wallet.checkTestNetwork();
            await wallet.selectSopliaNetwork();
    
            await metaMaskPage.goto('https://profile.bimtvist.com/');
    
            // Fill the login form that user not connected with wallet
            await wallet.fillLoginFormNonConnectWallet();
            await wallet.clickOnWalletConnectionIcon();
            await wallet.AddWallet();
            await wallet.AddEthereum();
            await wallet.AddMetamask();
    
            // Wait for MetaMask popup
            const [metamaskPopup] = await Promise.all([
                browser.waitForEvent('page'),  // Listen for the MetaMask pop-up page
            ]);
    
            // Check if popup opened correctly
            if (!metamaskPopup || metamaskPopup.isClosed()) {
                console.error("MetaMask popup did not open or was closed.");
                return;
            }
    
            await metamaskPopup.waitForLoadState();  // Ensure the MetaMask page is fully loaded
    
            // Handle MetaMask pop-up
            const walletPopup = new Wallet(metamaskPopup);
    
            await walletPopup.attemptToClickMetaMaskPopUpNext(metamaskPopup);
            await walletPopup.attemptToClickMetaMaskPopUpConfirm(metamaskPopup);
    
            // Check if wallet popup is still open before continuing
            if (metamaskPopup.isClosed()) {
                console.error("MetaMask popup closed unexpectedly.");
                return;
            }
    
            await wallet.isExpectWalletaddressalreadylinkedtoauser();
            await sleep(10000);
        } catch (error) {
            console.error("Error encountered during test execution:", error);
        }
    });
    
    test('Verify that login with authenticated wallet it should redirect to profile.', async () => {
        // Use existing browser context
        const page = await browser.newPage();  // Create a new page in the existing context

        const wallet = new Wallet(metaMaskPage);
        await wallet.cleckTermAndconditions();
        await wallet.importAnExistingWallet();
        await wallet.IAgree();
        await wallet.writeSeedPhrase();
        await wallet.confirmRecoveryPhrase();
        await wallet.WriteExistingWalletPassword();
        await wallet.writeConfirmPasswordExisting();
        await wallet.markcheckboxAfterFillPassword();
        await wallet.importWallet();
        await wallet.gotIt();
        await wallet.nextAfterGotIt();
        await wallet.Done();

        await sleep(5000);  // Wait for MetaMask setup to complete
        await metaMaskPage.goto('https://profile.bimtvist.com/');  // Go to the profile page
        await wallet.ethIconClick();
        await wallet.clickOnMetaMask();

        const [metamaskPopup] = await Promise.all([
            browser.waitForEvent('page'),  // Listen for the MetaMask pop-up page
        ]);

        await metamaskPopup.waitForLoadState()  // Ensure the MetaMask page is fully loaded
       // hanlde metamask pop-up loaded
        const walletPopup = new Wallet(metamaskPopup);

        // // Attempt to click 'Next' on the MetaMask pop-up
        await walletPopup.attemptToClickMetaMaskPopUpNext(metamaskPopup);
        await walletPopup.attemptToClickMetaMaskPopUpConfirm(metamaskPopup)
        await walletPopup.attemptToClickMetaMaskPopUpSignRequestConfirm(metamaskPopup)
        // Wait for any error message on the profile page
        await page.waitForTimeout(10000);
        const usernameElement ='h3.username'

        await wallet.isExpect(usernameElement , 'ansfarooq04')
    });


    test.afterAll(async () => {
        // Close the browser after tests are done
        await browser.close();
    });
});
