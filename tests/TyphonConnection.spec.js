const { test  , expect }  = require("@playwright/test");
const {chromium } = require('playwright');
const { setTimeout  : sleep} = require('timers/promises');

/////////////////Import Class Typhon
const Typhon = require('../classPage/typhon');


test.describe("Typhon Wallet Integration with SSO", () => {
    let browser;
    let typhonPage;
    
    test.beforeAll( async () => {
        const typhonPath = "c:/Users/BiM Dev - 011/AppData/Local/Google/Chrome/User Data/Profile 5/Extensions/kfdniefadaanbjodldohaedphafoffoh/3.2.6_0";
        browser = await chromium.launchPersistentContext('' , {
            headless: false,
            args: [
                `--disable-extensions-except=${typhonPath}`,
                `--load-extension=${typhonPath}`
            ],
        });
        await sleep(5000);

        const pages=await browser.pages();
        for (const page of pages) {
            if ((await page.url()) === 'about:blank') {
                await page.close();
            }
        };
        typhonPage = (await browser.pages())[0];
    });
    // Test Cases ;
    test(" verify that typhon page is working" , async ()=>{
        //console.log("Page",typhonPage)
        let typhon = new Typhon(typhonPage);
        //await typhon.clickOnCreateWallet();
        await typhon.clickOnImportExistingWallet();
        await typhon.enterWalletName();
        await typhon.enterWalletpassword();
        await typhon.enterConfirmWalletpassword();
        await typhon.checkTermsAndConditions();
        await typhon.clickOnContinue();
        await typhon.selectSeedtype();    
        await typhon.writeseedPhrase();
        await typhon.unLockwallet();

        //// Integrate Typhon with SSO
        await typhonPage.goto('https://profile.bimtvist.com/');
        await typhon.loginNonConnected();
        await typhon.clickOnWalletConnection();
        await typhon.clickOnAddWallet();
        await typhon.clickOnCardano();
        await typhon.clickOnTyphonWallet();
       /// Handling Typhon Pop up Window 
        const [typhonPopUpWindow] = await Promise.all([
            browser.waitForEvent('page'),
        ]);
        await typhonPopUpWindow.waitForLoadState();
        let  typhonPopUp = new Typhon(typhonPopUpWindow);
        //await sleep(200000);
        await typhonPopUp.ClickOnAllowButton();
  

        // Another Pop Up Window for Typhon
        const [typhonPopUpWindow2] = await Promise.all([
            browser.waitForEvent('page'),
        ]);
        console.log('another pop',typhonPopUpWindow2)
        await typhonPopUpWindow2.waitForLoadState();
        const typhonPopUp2 = new Typhon(typhonPopUpWindow2);
        await sleep(10000);
        await typhonPopUp2.clickOnSignButton()
        await typhonPopUp2.writePassword();




        await sleep(50000)

    } )
})
