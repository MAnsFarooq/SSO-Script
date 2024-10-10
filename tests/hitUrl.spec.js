const { test, expect } = require('@playwright/test');
test.setTimeout(80000)

test(" go the SSo URl " , {timeout : 80000}, async({page}) =>{
    await page.goto('https://profile.bimtvist.com' , {waitUntil: 'networkidle'})
    page.pause(3000000)
    
})