console.log("hello")
// // Load environment variables from the .env file
// // require('dotenv').config();

// // Access the environment variables
// const slackToken = process.env.SLACK_TOKEN;
// const slackChannel = process.env.SLACK_CHANNEL;

// const { test, expect } = require('@playwright/test');

// // Playwright test to send a message to Slack
// test('send message to Slack', async ({ page }) => {
//   // Ensure the environment variables are correctly loaded
//   console.log(slackToken);  // Prints the SLACK_TOKEN
//   console.log(slackChannel);  // Prints the SLACK_CHANNEL

//   // Example request to Slack API to send a message
//   const response = await page.request.post('https://slack.com/api/chat.postMessage', {
//     headers: {
//       'Authorization': `Bearer ${slackToken}`,
//       'Content-Type': 'application/json',
//     },
//     data: {
//       channel: slackChannel,
//       text: 'Hello from Playwright!',
//     },
//   });

//   // Validate the response
//   expect(response.status()).toBe(200);
// });
