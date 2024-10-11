const { test , expect } = require( '@playwright/test');

test.describe( 'Verify that Sigun-In test work as expected', ()=>{
    test.beforeAll( async () =>{
        console.log(" Tets is starting all test are running parallel");
    });
    test.beforeEach ( async ({ page}) => {
        await page.goto('https;//profile.bimtvist.com' ,{waitUntil :'networkidle'});
    });
    test( 'TCSSO:verify that logged in with correct credentials', async({page}) => {
        await page.waitForSeclector('')
    }) 
})