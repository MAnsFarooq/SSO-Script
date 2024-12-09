const { test, expect } = require('@playwright/test');

const { chromium } = require('playwright');

const { setTimeout: sleep } = require('timers/promises')

const Nami = require('../classPage/nami');

test.describe('Cardano wallet lace integration', async () => {
    let browser;
    let Namipage;
    let profile
    test.beforeAll(async () => {//"C:/Users/BiM Dev - 011/AppData/Local/Google/Chrome/User Data/Profile 5/Extensions/lpfcbjknijpeeillifnkikgncikgfhdo/3.9.4_0"
        const laceWalletPath = "C:/Users/BiM Dev - 011/AppData/Local/Google/Chrome/User Data/Profile 5/Extensions/lpfcbjknijpeeillifnkikgncikgfhdo/3.9.4_0"
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
        Namipage = await pages[0]
        await Namipage.waitForLoadState(); // Ensure the page is fully loaded
    });
    test("verify that nami page is working" , async ()=>{
        console.log('page found ', Namipage);
        let nami = new Nami(Namipage);
        await nami.LoginNonConnectWalletUser();
        await nami.clickOnWalletConnectionIcon()
        await nami.AddWallet();
        await nami.AddCardanoWallet();
        await nami.AddNamiWallet();
        await sleep(500000);

        await nami.Iagree()



   
    })

});