const { test, expect } = require('@playwright/test');
const { Login } = require('./loginclass.js');

// golobaly set for testing 70Seconds
test.setTimeout(700000);

test.describe('Verify that Sigun-In test work as expected', () => {
    test.beforeAll(async () => {
        console.log(" Tests is starting all test are running parallel");
    });
    test.beforeEach(async ({ page }) => {
        await page.goto('https://profile.bimtvist.com', { waitUntil: 'networkidle' });
    });
    test('TCSSO33:verify that logged in with correct credentials', { timeout: 700000 }, async ({ page }) => {
        const login = new Login(page);
        await login.fillLoginForm('ansfarooq04', 'Ansfarooq04');
        console.log('Please check mark captcha manually ')
        await new Promise(resolve => setTimeout(resolve, 20000));
        await login.signIn();
        await page.pause(100000)
    });
    // Cannot run due staging server is slow down 
    test('TCSSO34:Verify that if already Login  will redirect to "You are already logged in" page.', { timeout: 700000 }, async ({ page }) => {
        const login = new Login(page);
        // First login attempt
        await login.fillLoginForm('ansfarooq04', 'Ansfarooq04');
        console.log('Please check mark captcha manually');
        await new Promise(resolve => setTimeout(resolve, 20000)); // Wait 20 seconds for CAPTCHA handling
        await login.signIn();
    });
    test('TCSSO39: verify that error when try to signIn with those credentials that are not registere' ,{ timeout : 700000} , async ( {page}) =>{
        const login = new Login(page);
        await login.fillLoginForm('ansfarooq1234', 'Ansfarooq1234');
        console.log('Please check mark captcha manually');
        await new Promise(resolve => setTimeout(resolve, 20000)); // Wait 20 seconds for CAPTCHA handling
        await login.signIn();
        await page.waitForSelector('//*[@id="kc-content-wrapper"]/div[1]/span', { state: 'visible' });
        expect(await page.textContent('//*[@id="kc-content-wrapper"]/div[1]/span')).toBe('Invalid username or password')
        
    })

})

