const { test, expect } = require('@playwright/test');

class BasePage {
    constructor(page) {
        this.page = page;
    }

    // Method to navigate to the specified URL
    async navigate(url) {
        console.log(`Navigating to ${url}`);
        await this.page.goto(url, { waitUntil: 'networkidle' });
    }

    // Method to wait for a specific selector to be visible
    async waitForSelector(selector, options = {}) {
        await this.page.waitForSelector(selector, { state: 'visible', ...options });
    }

    async isVisible(selector) {
        // Wait for the selector to be visible
        await this.page.waitForSelector(selector, { state: 'visible' });
         console.log("is visible: " + selector)
        // Now check if the selector is visible
        return await this.page.isVisible(selector);
    }

    // Method to click on a specified selector
    async click(selector) {
        let dely =  4000
        await this.page.click(selector  , { state: 'visible' } ,{timeout : 100000} );
        //await this.page.waitForTimeout(dely)
    }

    // Method to get text content of a specified selector
    async isExpect(selector, value) {
        await this.page.waitForSelector(selector, { state: 'visible', timeout: 60000 });

        // Get the text content and compare it with the expected value
        const actualText = await this.page.textContent(selector);
        console.log(`Text found: ${actualText}`);
        console.log("value", value)// Debugging log
        expect(actualText).toContain(value); // Assertion to check if the text matches
    }

    // Method to fill input fields
    async fillInput(selector, value) {
        console.log(selector + ': ' + value);
        await this.page.waitForSelector(selector, { state: 'visible', timeout: 100000 }); // Ensure the input field is visible
        await this.page.fill(selector, value); // Fill the input field after visibility
    }

    // Method to check if an attribute is set
    async getAttribute(selector, attribute) {
        // Example: if there is a class that can uniquely identify the element
        await this.page.waitForSelector(selector, { state: 'visible' });

        return await this.page.getAttribute(selector, attribute);
    };

    async ExpectIselementInput(selector){
        const elementHanlder = await this.page.$(selector);
        const tagNamePassword = await elementHanlder.evaluate(el => el.tagName);
        expect(tagNamePassword).toBe('INPUT')

    }

    async dely(){
        let dely = 3000;
        await this.page.waitForTimeout(dely)
        }
}

module.exports = BasePage;