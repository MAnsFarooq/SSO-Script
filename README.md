1. Verify Username, Password, and Confirm Password Fields Presence
Ensures that all the required fields (username, password, confirm password) are visible on the registration page.
2. Username Field Validation
Tests that the username field does not accept more than 20 characters and triggers an error if it exceeds the limit.
Ensures the username field does not accept fewer than 6 characters.
Confirms that a username of exactly 20 characters functions correctly.
3. Password Field Validation
Verifies that passwords with fewer than 8 characters trigger an error.
Confirms that a valid password of at least 8 characters navigates successfully to the passcode page.
Ensures the password meets complexity requirements (uppercase, lowercase, digits, special characters) and triggers an error for weak passwords.
4. Confirm Password Validation
Ensures the confirm password matches the password and both are processed correctly.
5. Secret Passcode Verification
Validates that a secret passcode is auto-generated after successful password entry and is not left empty.
Ensures the "eye icon" toggles between hiding and showing the secret passcode for visibility confirmation.
This covers the important aspects of form validation, security checks, and user-friendly features for managing passcodes.
