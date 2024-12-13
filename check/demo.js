const { test, expect } = require('@playwright/test');

// Generic method to enter OTP
async function enterOtp(page, otp) {
    // Split the OTP into individual characters
    const otpCharacters = otp.split('');

    // Iterate over each character and fill it into the corresponding input box
    for (let i = 0; i < otpCharacters.length; i++) {
        const locator = `[aria-label='Please enter OTP character ${i + 1}']`;
        await page.locator(locator).fill(otpCharacters[i]);
    }
}

// Example usage in a test
test('Fill OTP in the verification fields', async ({ page }) => {
    // Navigate to the application
    await page.goto('https://stage-app.edifyai.com/login'); // Update with your app URL

  
    await page.locator('//input[@class="MuiInputBase-input MuiInput-input MuiInputBase-inputAdornedEnd css-mnn31"]').fill("aruna.gowda984@gmail.com");
    await page.locator('[data-testid="FormContinueOrSigninButton"]').click;


    // Assume OTP is generated as 234598
    const otp = '234598';

    // Call the generic method to fill the OTP
    await enterOtp(page, otp);

    // Optionally, assert that fields are filled correctly
    for (let i = 0; i < otp.length; i++) {
        const locator = `[aria-label='Please enter OTP character ${i + 1}']`;
        await expect(page.locator(locator)).toHaveValue(otp[i]);
    }
});
