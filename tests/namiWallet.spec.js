const { test , expect } = require('@playwright/test');
const { chromium } = require('playwright')
const {setTimeout : sleep} = require('timers/promises');

test.describe(" integration Nami wallet" , async () =>{
    let browser;
    let namiPage;

    test.beforeAll(async () =>{
        const namiWalletPath = "C:/Users/BiM Dev - 011/AppData/Local/Google/Chrome/User Data/Profile 5/Extensions/lpfcbjknijpeeillifnkikgncikgfhdo/3.9.4_0"
        browser = await chromium.launchPersistentContext('' , {
            headless: false,
            args: [
                `--disable-extensions-except=${namiWalletPath}`,
                `--load-extension=${namiWalletPath}`
            ],
        });
        await sleep(5000);  // Wait for Nami Wallet to load
        const pages=await browser.pages();
        for (const page of pages) {
            if ((await page.url()) === 'about:blank') {
                await page.close();
            }
        };
        namiPage = (await browser.pages())[0];
    });
    test("verify that nami page is working" , async ()=>{
        console.log(namiPage);
    })
})
 