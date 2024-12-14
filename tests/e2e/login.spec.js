const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/loginPage');

test.describe('LoginPage Test Suite', () => {
  let login; // Declare the LoginPage instance
  let browser;
  let page;

  test.beforeAll(async () => {
    browser = await require('playwright').chromium.launch();  // or use .firefox/.webkit based on your need
    page = await browser.newPage();
    login = new LoginPage(page); // Assuming LoginPage constructor requires a page object
    await login.openUrl();  // Replace with your login method
  });

  // test.beforeEach(async ({ page }) => {
  //   login = new LoginPage(page); // Initialize the LoginPage instance
  //   await login.openUrl(); // Open the application URL
  // });

  test("verify_SecurityPolicyLink", async () => {
    await login.verify_securityPolicyLink();
  });

  test("verify_privacyPolicyLink", async () => {
    await login.verify_privacyPolicyLink();
  });

  test("verify_smsTermsLink", async () => {
    await login.verify_smsTermsLink();
  });

  // test("Verify 'Clear' button clears the entered text in email box.", async () =>{
  //   await login.email_input();
  //   await login.verify_Clear();
  // });

  // test("Verify Valid email input redirects to the OTP Screen after pressing 'Continue' button", async () =>{
  //   await login.email_input();
  //   await login.verify_Continue();
  // });

  // test("Verify Cancel button redirects to the previous page or login options", async () =>{
  //   await login.email_input();
  //   await login.verify_Cancel();
  // });

  // test("Verify Successful login with valid verification code", async () =>{
  //   await login.Valid_login();
  // });

  // test("Verify Valid OTP input redirects to the Dashboard screen after clicking on Sign In button", async () =>{
  //   await login.Valid_login();
  // });

  // // Teardown: Logout and close the browser after all tests are executed
  // test.afterAll(async () => {
  //   // await login.performLogout();  // Replace with your logout method
  //   await browser.close();
  // });

});