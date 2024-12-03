const { test, expect } = require('@playwright/test');

const { chromium } = require('playwright');

const { setTimeout: sleep } = require('timers/promises')

const Lace = require('../classPage/lace');

test.describe('Cardano wallet lace integration', async () => {
    let browser;
    let lacepage;
    let profile
    test.beforeAll(async () => {
        const laceWalletPath = "c:/Users/BiM Dev - 011/AppData/Local/Google/Chrome/User Data/Profile 5/Extensions/gafhhkghbfjjkeiendhlofajokpaflmk/1.17.5_0"
        browser = await chromium.launchPersistentContext('', {
            headless: false,
            args: [
                `--disable-extensions-except=${laceWalletPath}`,
                `--load-extension=${laceWalletPath}`
            ],
        });
        await sleep(10000);

        const pages = await browser.pages();
        
        for (const page of pages) { 
            if ((await page.url()) === 'about:blank') {
                profile = page; // Assign the page to the profile variable
                await profile.goto('https://profile.bimtvist.com/', { waitUntil: 'domcontentloaded' }); // Navigate to the desired URL
                break; // Exit the loop after navigating
            }
        }
        
        lacepage = await pages[0]
        





        await lacepage.waitForLoadState(); // Ensure the page is fully loaded

    });
    test('verify that lace wallet extension load successfully', async () => {


      
        // // await lace.clickAgreeButton()
        // await sleep(5000);
        // await lacepage.close()
        // await lacepage.waitForLoadState(); // Ensure the page is

        await lacepage.goto('chrome-extension://gafhhkghbfjjkeiendhlofajokpaflmk/app.html#/assets')
        let lacewindowpage = new Lace(lacepage)
        await lacewindowpage.clickAgreeButton();
        await lacewindowpage.clickRestoreButton()
        await lacewindowpage.clickNextButton();
        await lacewindowpage.writeSeedPhrase();
        await lacewindowpage.clickNextButton();
        await lacewindowpage.writeExistingWalletPassword();
        await lacewindowpage.writeconfirmPassword()
        await lacewindowpage.clickOnOpenWallet()
        await lacepage.waitForTimeout(5000);
       //console.log("found",profile)
        //await profile.goto('https://profile.bimtvist.com/');
      
        console.log("Reloading profile page...");
        if (profile && !profile.isClosed()) {
            await profile.goto('https://profile.bimtvist.com/', { waitUntil: 'domcontentloaded' });
            console.log("Profile page reloaded successfully.");
        } else {
            console.error("Profile page is not available.");
        }

        let lace = new Lace(profile);
        /////////////
      
        await lace.LoginNonConnectWalletUser();
        await lace.clickOnWalletConnectionIcon()
        await lace.AddWallet();
        await lace.AddCardanoWallet();
        await lace.AddLaceWallet();

        let [popWindow] = await Promise.all([
            await browser.waitForEvent('page')
        ])
        let lacePopWindow = new Lace(popWindow)
        
        await lacePopWindow.Authorize()
        await lacePopWindow.clickOnAlways()
        let [popWindow2] = await Promise.all([
            await browser.waitForEvent('page')
        ])
        let lacePopWindow2 = new Lace(popWindow2)
        await lacePopWindow2.clickOnConfirm()
        // console.log("closed", popWindow)
        await lacePopWindow2.writeExistingWalletPassword()
        await lacePopWindow2.clickOnConfirm()
        await lacePopWindow2.closeWallet()



        await sleep(20000000)
    })
})