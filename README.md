
**_****This project is licensed under Big Immersive QA. ********************_**
**SSO Automation Project**
**Overview**
This project automates the Single Sign-On (SSO) functionality, including user registration, login validation, wallet connection checks, and account management. It ensures proper validation of user credentials, security features, and wallet connections. The project also covers account overview tests like username validation and security checks.

We use Playwright for end-to-end testing, ensuring smooth user flows across multiple browsers while validating user-related functionalities such as login, account details, and wallet connectivity.

**Features**
Automated User Registration: Automates user registration with identity providers like Google and Facebook.
Login Validation: Verifies login functionality for valid users and handles invalid login attempts.
Wallet Connection Check: Ensures the wallet connection works correctly and verifies the status.
Account Overview: Tests related to user account details, including username validation and the accuracy of user information.
Security Checks: Verifies security aspects like password validation, account protection, and authentication.
Cross-Browser Testing: Runs the tests on multiple browsers (Chrome, Firefox, Edge, etc.).
Error Handling: Handles invalid input, error messages, and security failures gracefully.
**Tools and Technologies**
_Automation Framework_: Playwright
_Test Framework:_ Mocha or Jest
_Programming Language:_ JavaScript (Node.js)
_Browsers: _Chrome, Firefox, and Microsoft Edge for cross-browser testing
_Version Control_: Git
_Prerequisites_
Before you start, make sure you have the following installed:

****Node.js: Ensure Node.js is installed for running the tests.
Playwright: Install Playwright for browser automation.
bash
Copy code
npm install playwright
Setup Instructions
Clone the repository:
****
bash
Copy code
**git clone https://github.com/your-repo/SSO-Automation.git**
Install dependencies: Navigate to the project folder and install the required dependencies:

bash
Copy code
**npm install**
Playwright Setup: Install Playwright browsers for testing (Chrome, Firefox, Microsoft Edge).

bash
Copy code
**npx playwright install**
Environment Configuration: Set up any environment-specific configurations like URLs or credentials in the .env file.


**1. Automated User Registration**
Automates the user registration process through different identity providers. Tests include filling in registration forms, verifying the registration process, and handling error scenarios.

Example Test (Playwright):
javascript
Copy code
**const { test, expect } = require('@playwright/test');**

test('should register a user successfully', async ({ page }) => {
  await page.goto(`${process.env.BASE_URL}/register`);
  await page.fill('#email', 'testuser@example.com');
  await page.fill('#password', 'securePassword123');
  await page.click('#register-button');
  await expect(page.locator('#welcome-message')).toBeVisible();
});
**2. Login Validation**
Validates the login process, ensuring proper handling of valid and invalid credentials, and ensuring error messages appear for invalid attempts.

Example Test (Playwright):
javascript
Copy code
test('should login with valid credentials', async ({ page }) => {
  await page.goto(`${process.env.BASE_URL}/login`);
  await page.fill('#username', 'validUser');
  await page.fill('#password', 'validPassword');
  await page.click('#login-button');
  await expect(page.locator('#dashboard')).toBeVisible();
});

test('should show an error for invalid credentials', async ({ page }) => {
  await page.goto(`${process.env.BASE_URL}/login`);
  await page.fill('#username', 'invalidUser');
  await page.fill('#password', 'wrongPassword');
  await page.click('#login-button');
  await expect(page.locator('#error-message')).toHaveText('Invalid username or password');
});
**3. Wallet Connection Check**
Ensures that the wallet connection is properly established and verifies the connection status.

Example Test (Playwright):
javascript
Copy code
test('should connect the wallet successfully', async ({ page }) => {
  await page.goto(`${process.env.BASE_URL}/wallet`);
  await page.click('#connect-wallet-button');
  await expect(page.locator('#wallet-status')).toHaveText('Connected');
});

test('should display error message for failed wallet connection', async ({ page }) => {
  await page.goto(`${process.env.BASE_URL}/wallet`);
  await page.click('#connect-wallet-button');
  await expect(page.locator('#wallet-error-message')).toHaveText('Failed to connect wallet');
});
**4. Account Overview**
This feature tests the user’s account information, including username validation, account details verification, and checking for the accuracy of the displayed information.

**Example Test (Playwright):**
javascript
Copy code
test('should display correct username on the account overview page', async ({ page }) => {
  await page.goto(`${process.env.BASE_URL}/account`);
  await expect(page.locator('#username')).toHaveText('validUser');
});

test('should allow user to update their username', async ({ page }) => {
  await page.goto(`${process.env.BASE_URL}/account`);
  await page.fill('#username', 'newValidUser');
  await page.click('#update-button');
  await expect(page.locator('#username')).toHaveText('newValidUser');
});

test('should display correct email on the account overview page', async ({ page }) => {
  await page.goto(`${process.env.BASE_URL}/account`);
  await expect(page.locator('#email')).toHaveText('validUser@example.com');
});
**5. Security Checks**
Verifies that account security features, such as password complexity requirements, account protection, and 2FA (if applicable), are correctly implemented.

Example Test (Playwright):
javascript
Copy code
test('should enforce strong password during registration', async ({ page }) => {
  await page.goto(`${process.env.BASE_URL}/register`);
  await page.fill('#email', 'testuser@example.com');
  await page.fill('#password', 'weakpass');
  await page.click('#register-button');
  await expect(page.locator('#error-message')).toHaveText('Password is too weak');
});

test('should not allow login with incorrect password', async ({ page }) => {
  await page.goto(`${process.env.BASE_URL}/login`);
  await page.fill('#username', 'validUser');
  await page.fill('#password', 'incorrectPassword');
  await page.click('#login-button');
  await expect(page.locator('#error-message')).toHaveText('Invalid username or password');
});
**6. Cross-Browser Testing**
Playwright allows testing across different browsers to ensure compatibility.

**Example (Cross-Browser Test):**
javascript
Copy code
const { chromium, firefox, webkit } = require('playwright');

test('should login on Chrome browser', async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(`${process.env.BASE_URL}/login`);
  await page.fill('#username', 'validUser');
  await page.fill('#password', 'validPassword');
  await page.click('#login-button');
  await browser.close();
});

test('should login on Firefox browser', async () => {
  const browser = await firefox.launch();
  const page = await browser.newPage();
  await page.goto(`${process.env.BASE_URL}/login`);
  await page.fill('#username', 'validUser');
  await page.fill('#password', 'validPassword');
  await page.click('#login-button');
  await browser.close();
});
Running Tests
**1. Run Tests Locally**
To run the tests locally, use the following command:

_bash
Copy code
npm run test
2. Run Specific Test
To run a specific test file:_

bash
Copy code
npm run test -- tests/login.test.js
3. Run Cross-Browser Tests
You can specify which browser to run the tests in using Playwright’s built-in support for multiple browsers:
_
**bash
Copy code
npx playwright test --project=firefox
Known Issues
Wallet Connection Delay: Occasionally, wallet connection may experience delays under heavy network load.
Password Validation: The password validation message may not be displayed immediately due to UI rendering delays.
Browser-Specific UI Issues: Minor differences in UI rendering may occur between browsers.
Contributing
We welcome contributions! Please follow the steps below:
**_
Fork the repository.
Create a new branch (git checkout -b feature/your-feature-name).
Commit your changes (git commit -am 'Add new feature').
Push to the branch (git push origin feature/your-feature-name).
Create a Pull Request.
License
_****This project is licensed under Big Immersive QA. ********************_

