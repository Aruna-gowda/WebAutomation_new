// playwright.config.js
const {defineConfig,devices} = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/e2e',
  timeout: 30000,
  retries: 0,
  reporter: [
    ['list'],
    ['allure-playwright'],
  ],
  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'only-on-failure',
    // video: 'retry-with-video',
    channel: 'chrome',
    // baseURL: 'https://stage-app.edifyai.com/login',
    slowMo: 1000, // Add this line to enable slow motion
  },
  
    /* Configure projects for major browsers */
  
    projects: [
      {
          name: 'chromium',
          use: {
              channel: 'chrome',
              ...devices['Desktop Chrome'],
          },
      },
  ],
});