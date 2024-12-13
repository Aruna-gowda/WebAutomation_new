import { expect } from 'allure-playwright';
import BasePage from './basePage';
const allure = require('allure-playwright');  // Allure Playwright Adapter

const { loadConfig } = require('../utils/config');
const env = process.env.ENV || 'default'; // Set environment via ENV variable
const config = loadConfig(env);

//Locators
export const locators = {
  username_input: '//input[@class="MuiInputBase-input MuiInput-input MuiInputBase-inputAdornedEnd css-mnn31"]',
  clearButton: '//*[contains(text(),"Clear")]',
  continueButton: '[data-testid="FormContinueOrSigninButton"]',
  otpInput: "[aria-label='Please enter OTP character 1']",
  SignInButton:'[data-testid="FormContinueOrSigninButton"]',

  securityPolicyLink: '//*[contains(text(),"Security Policy")]',
  privacyPolicyLink: '//*[contains(text(),"Privacy Policy")]',
  smsTermsLink: '//*[contains(text(),"SMS Terms of Use")]',
  securityPolicyHeading: "//h1[contains(text(),'Security of Customer Data')]",
  privacyPolicyHeading: "//h1[contains(text(),'Privacy Policy')]",
  smsTermsHeading: "//h1[contains(text(),'SMS Policy')]",
  
  otp_Verify: '//*[contains(text(),"Enter Verification Code")]',
  cancelButton:'[data-testid="FormCancelButton"]',

};

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
  }
  
  async openUrl(){
    await this.open(config.baseUrl);
  }

  async verify_securityPolicyLink(){
    await this.clickButton(locators.securityPolicyLink);
    await this.isElementVisible(locators.securityPolicyHeading);
  }

  async verify_privacyPolicyLink(){
    await this.clickButton(locators.privacyPolicyLink);
    await this.isElementVisible(locators.privacyPolicyHeading);
  }

  async verify_smsTermsLink(){
    await this.clickButton(locators.smsTermsLink);
    await this.isElementVisible(locators.smsTermsHeading);
  }

  async email_input(){
    await this.typeText(locators.username_input, config.email);
  }

  async verify_Clear(){
    await this.clickButton(locators.clearButton);
    await this.verifyElementText(locators.username_input,'')
  }

  async verify_Continue(){
    await this.clickButton(locators.continueButton);
    await this.isElementVisible(locators.otp_Verify);
  }

  async verify_Cancel(){
    await this.clickButton(locators.cancelButton);
    const actual = await this.getTitle();
    const expected = "Safety Mojo";
    expect(actual.trim()).toBe(expected.trim());
  }
  
  async Valid_login() { 
    await this.open(config.baseUrl);
    await this.typeText(locators.username_input, config.email);
    await this.clickButton(locators.continueButton);
    await this.enterOtp('[aria-label="Please enter OTP character {index}"]', false);
    await this.clickButton(locators.SignInButton);
    const actual = await this.getTitle();
    const expected = "Safety Mojo";
    expect(actual.trim()).toBe(expected.trim());
  }


  async login_Feature() { 
    await this.open(config.baseUrl);
    await this.typeText(locators.username_input, config.email);
    await this.clickButton(locators.continueButton);
    await this.enterOtp('[aria-label="Please enter OTP character {index}"]', false);
    await this.clickButton(locators.SignInButton);
    const actual = await this.getTitle();
    console.log(actual);
    const expected = "Safety Mojo";
    expect(actual.trim()).toBe(expected.trim());
  }


}
module.exports = { LoginPage };
