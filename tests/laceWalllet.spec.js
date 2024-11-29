const {test , expect } = require('@playwright/test');

const {chromium} = require('playwright');

const {setTimeout : sleep} = require('timers/promises')

test.describe('Cardano wallet lace integration' , async () => {
    let browser;
    let lacepage;
    test.beforeAll(async () =>{
        const laceWalletPath = "c:/Users/BiM Dev - 011/AppData/Local/Google/Chrome/User Data/Profile 5/Extensions/gafhhkghbfjjkeiendhlofajokpaflmk/1.17.5_0"
        browser = await chromium.launchPersistentContext ('', {
            headless: false,
            args: [
                `--disable-extensions-except=${laceWalletPath}`,
                `--load-extension=${laceWalletPath}`
            ],
        });
        await sleep(10000); // Wait for the extension to loa
       let retries = 5;
       while (retries > 0) {
        const pages = await browser.pages();
            console.log('Pages available:', pages.map(page => page.url()));
            lacepage = pages.find(page => ( page.url()).includes('chrome-extension://gafhhkghbfjjkeiendhlofajokpaflmk'));
            if (lacepage) break;
            await sleep(2000); // Wait and retry
            retries--;
       }
       if (!lacepage) {
        throw new Error('Lace Wallet extension page not found');
    }

      

        console.log('Pages available:', pages.map(page => page.url()));
      for (const page of pages) {
        if ((await page.url()) === 'about:blank') {
            await page.close();
        }
      };
      lacepage = (await browser.pages())[0]
    });
    test('verify that lace wallet extension load successfully' , async ()=>{await lacepage.goto('chrome-extension://gafhhkghbfjjkeiendhlofajokpaflmk/app.html#/assets')
        await lacepage.goto('https://profile.bimtvist.com/');
        await sleep(10000)
    })
})