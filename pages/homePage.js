import { expect } from '@playwright/test'; // Corrected import for expect
import BasePage from './basePage'; // BasePage should be imported correctly
const allure = require('allure-playwright'); // Allure Playwright Adapter

const { loadConfig } = require('../utils/config');
const env = process.env.ENV || 'default'; // Set environment via ENV variable
const config = loadConfig(env);

// Locators
export const locators = {
  QaAutomation_Visit: "//p[contains(text(), 'QA Automation')]/following::button[contains(., 'Visit')][1]",
  projectDropdown: '//div[contains(text(),"Projects")]',
  projectDropdownOption: "//div[contains(@class, 'MuiPaper-root') and contains(@class, 'MuiMenu-paper')]",
  languageDropdown: '[data-testid="LanguageIcon"]',
  languageDropdownOption: '//div[contains(@class, "language-dropdown")]',
  notificationIcon: '//div[contains(@class, "notification-icon")]',
  userAccountMenu: '//div[contains(@class, "user-account")]',
  logoutButton: '//button[contains(text(), "Logout")]',
};

class HomePage extends BasePage {
  constructor(page) {
    super(page);
  }

  async QaAutomation_Visit() {
    await this.clickButton(locators.QaAutomation_Visit);
  }

  async verify_HomepageTitle() {
    const actual = await this.getTitle(); // Assuming getTitle() is implemented in BasePage
    const expected = "Safety Mojo";
    expect(actual.trim()).toBe(expected.trim());
  }
  // ------------------------------------------------------------------------------------------
  async verifyDropdownOptions(expectedOptions) {
    await this.clickButton(locators.languageDropdown);
    // Locate the dropdown element
    const dropdown = await page.locator(dropdownSelector);
    
    // Fetch all option values from the dropdown
    const actualOptions = await dropdown.locator('option').allTextContents();
    
    // Compare actual options with the expected options
    expect(actualOptions).toEqual(expectedOptions);
}

  // async verify_LanguageDropdown(expectedLanguages) {
  //   await this.clickButton(locators.languageDropdown);
  //   const languages = await this.page.$$eval(
  //     `${locators.languageDropdown} li`,
  //     elements => elements.map(el => el.textContent.trim())
  //   );
  //   expectedLanguages.forEach(language => {
  //     expect(languages).toContain(language);
  //   });
  // }

  async verify_NotificationDisplay() {
    await this.isElementVisible(locators.notificationIcon);
    await this.clickButton(locators.notificationIcon);
    // Add verification for notification panel contents
  }

  async verify_UserAccountDisplay() {
    await this.isElementVisible(locators.userAccountMenu);
    const accountName = await this.page.$eval(
      locators.userAccountMenu,
      el => el.textContent.trim()
    );
    expect(accountName).not.toBe('');
  }

  async verify_LogoutButton() {
    await this.clickButton(locators.userAccountMenu);
    await this.isElementVisible(locators.logoutButton);
    await this.clickButton(locators.logoutButton);
    // Verify redirect to login page
    const title = await this.getTitle();
    expect(title).toBe('Login - Safety Mojo');
  }
}

//   async verify_ProjectDropdownAndValues(expectedValues) {
//     // Click on the button to visit QA Automation section
//     await this.page.click(locators.QaAutomation_Visit);

//     // Click on the dropdown to reveal options
//     await this.page.click(locators.projectDropdown);

//     // Wait for the dropdown options to be visible
//     await this.page.waitForSelector(locators.projectDropdownOption, { state: 'visible' });

//     // Fetch all options from the dropdown - Updated selector to get text content
//     const options = await this.page.$$eval(
//         `${locators.projectDropdownOption} li`, 
//         (elements) => elements.map(el => el.textContent.trim())
//     );

//     // Debug: Log the extracted dropdown values
//     console.log('Extracted dropdown values:', options);
//     console.log('expectedValues:', expectedValues);

//     // Verify each expected value exists in the actual options
//     expectedValues.forEach((expectedValue) => {
//         expect(options).toContain(expectedValue);
//     });
// }

module.exports = { HomePage }; // Corrected the export
