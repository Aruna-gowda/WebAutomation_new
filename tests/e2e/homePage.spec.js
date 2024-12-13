// const { test } = require('@playwright/test'); // Corrected import for test
// const { LoginPage } = require('../../pages/loginPage'); // Adjusted path for LoginPage
// const { HomePage } = require('../../pages/homePage'); // Adjusted path for HomePage

// test.describe('HomePage Test Suite', () => {
//   let login; // Declare the LoginPage instance
//   let page;
//   let homePage; // Declare the HomePage instance

//   test.beforeAll(async ({ browser }) => {
//     page = await browser.newPage();
//     login = new LoginPage(page); // Initialize LoginPage instance
//     homePage = new HomePage(page); // Initialize HomePage instance
//     await login.Valid_login(); // Perform login before tests
//   });

  

//   test('TC001_Verify title (Safety Mojo) of the homepage', async () => {
//     await homePage.verify_HomepageTitle(); // Verify homepage title
//   });

//   // test('TC002_Verify Project dropdown & Values in homepage', async () => {
//   //   const expectedDropdownValues = [
//   //     'projects',
//   //     'contractors',
//   //     'forms',
//   //     'divisions',
//   //     'goals & control',
//   //     'users',
//   //   ];
//   //   await homePage.verify_ProjectDropdownAndValues(expectedDropdownValues);
//   // });

//   // test('TC003_Verify Project dropdown & Values in homepage', async () => {
//   //   const expectedDropdownValues = [
//   //     'projects',
//   //     'contractors', 
//   //     'forms',
//   //     'divisions',
//   //     'goals & control',
//   //     'users',
//   //   ];
//   //   await HomePage.verify_ProjectDropdownAndValues(expectedDropdownValues);
//   // });

//   // test('TC003_Verify Search box in homepage', async () => {
//   //   await homePage.QaAutomation_Visit(); // Visit QA Automation section
//   //   await homePage.verify_SearchBox(); // Verify search box functionality
//   // });
  

//   test('TC004_Verify Language dropdown & values', async () => {
//     await homePage.QaAutomation_Visit();
//     const expectedLanguages = ['English', 'Español'];
//     await homePage.verify_LanguageDropdown(expectedLanguages);
//   });

//   // test('TC005_Verify Notification displayed correctly', async () => {
//   //   await homePage.QaAutomation_Visit(); 
//   //   await homePage.verify_NotificationDisplay();
//   // });

//   // test('TC006_Verify User account is displayed correctly', async () => {
//   //   await homePage.QaAutomation_Visit();
//   //   await homePage.verify_UserAccountDisplay();
//   // });

//   // test('TC007_Verify Logout button is working correctly', async () => {
//   //   await homePage.QaAutomation_Visit();
//   //   await homePage.verify_LogoutButton();
//   // });

//   test.afterAll(async () => {
//     await page.close();
//   });

// });
  
