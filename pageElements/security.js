// Security Tab Elements
export const securityTabLink = 'span:has-text("Security")';
export const securityPasswordLabel = 'span:has-text("Password")';
export const securityTwoFAButton = 'span:has-text("2-Step Verification")'; // Updated for clarity
export const securityUpdatePasswordLink = 'a:has-text("Update your password")';
export const securityEnableTwoFALink = 'a:has-text("Enable 2FA >")';
export const signIntovirtuaAccount = '//*[@id="scroll-to-here"]';
export const passwordMistachError = 'div.error:has-text("New Password and Confirm Password Must Match")';
export const shortPasswordError = 'div.error:has-text("New Password length should be of 8-20 characters long")'
export const passwordvalidationMsg = 'div.error:has-text("New Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.")'
// Input Fields
export const securitySecretPasscodeField = 'input[type="password"][placeholder="Enter Secret Passcode"]'; // Fixed selector
export const securityNewPasswordField = 'input[type="password"][placeholder="Enter new password"]';
export const securityConfirmPasswordField = 'input[type="password"][placeholder="Re-enter new password"]';

// Buttons
export const securityContinueButton = 'button.custom-btn.lg.primary.w-100.mb-3[type="submit"]';
export const securityCancelButton = 'button.custom-btn.lg.secondary.w-100';
export const okButton = 'button.custom-btn.lg.primary:has-text("Ok")';///

export const  securityInvalidpasscode='div:has-text("Invalid passcode!")';
export const securitywithoutPasscode = 'div:has-text("Passcode is required")'