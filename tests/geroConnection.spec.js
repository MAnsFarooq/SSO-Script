const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');
const { setTimeout: sleep } = require('timers/promises');

test.describe('Cardano Gero Wallet Integration with SSO', () => {
    let browser;
    let GeroPage;

    test.beforeAll(async () => {
        const GeroPath = "C:/Users/BiM Dev - 011/AppData/Local/Google/Chrome/User Data/Default/Extensions/bgpipimickeadkjlklgciifhnalhdjhe";

        // Launch the browser with Gero Extension
        browser = await chromium.launchPersistentContext('', {
            headless: false,
            args: [
                `--disable-extensions-except=${GeroPath}`,
                `--load-extension=${GeroPath}`
            ]
        });

        await sleep(40000); // Wait for the extension to load

        // Check for any pages opened by the browser
        const pages = await browser.pages();
        if (pages.length > 0) {
            GeroPage = pages[0];
        }

        // Ensure GeroPage is initialized
        if (!GeroPage) {
            throw new Error("Failed to initialize the GeroPage");
        }
    });

    test('verify that Gero extension is loaded', async () => {
        // Verify the extension's page is available
        await GeroPage.goto('chrome-extension://gbacgmmhkmcifjojhmaimddmdloogjlc/index.html?#/');
        
        // Verify SSO page navigation
        await GeroPage.goto('https://profile.bimtvist.com/');
    });
});
