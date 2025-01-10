const allure = require('allure-playwright'); // Import Allure
import { expect, test } from '@playwright/test';
const { loadConfig } = require('../utils/config');
const env = process.env.ENV || 'default'; // Set environment via ENV variable
const config = loadConfig(env);

class BasePage {
	constructor(page) {
		this.page = page;
	}

	async open(url) {
		return await test.step(`Open URL: ${url}`, async () => {
			return await this.page.goto(url);
		});
	}

	async getTitle() {
		return await test.step('Get page title', async () => {
			return await this.page.title();
		});
	}

	async clickButton(selector) {
		return await test.step(`Click element: ${selector}`, async () => {
			return await this.page.click(selector);
		});
	}

	async typeText(selector, text) {
		return await test.step(`Type text '${text}' into element: ${selector}`, async () => {
			return await this.page.fill(selector, text);
		});
	}

	async verifyElementText(selector, text) {
		return await test.step(`Verify text '${text}' in element: ${selector}`, async () => {
			const textValue = await this.page.textContent(selector);
			return expect(textValue.trim()).toBe(text);
		});
	}

	async verifyElementContainsText(selector, text) {
		return await test.step(`Verify element contains text '${text}': ${selector}`, async () => {
			const locatorText = await this.page.locator(selector);
			return await expect(locatorText).toContainText(text);
		});
	}

	async takeScreenShot() {
		return await test.step('Take a screenshot', async () => {
			return expect(await this.page.screenshot()).toMatchSnapshot('MyScreenShot.png');
		});
	}

	async isElementVisible(selector) {
		await test.step(`Check visibility of element: ${selector}`, async () => {
			const element = this.page.locator(selector);
			try {
				const isVisible = await element.isVisible();
				return isVisible;
			} catch (error) {
				throw new Error('Element Not Visible. Check Failed!');
			}
		});
	}
	async verifyExpected_Actual_Text(actualTitle,expectedTitle) {
		expect(actualTitle.trim()).toBe(expectedTitle.trim());
	}


	async retrieveOtpFromSlack() {
		return await test.step('Retrieve OTP from Slack', async () => {
			const slack_bot_token = config.slack_bot_token; // Replace with your Slack bot token
			const channelId = config.channelId; // Replace with your Slack channel ID
			const emailId = config.email; // Replace with the email ID you're looking for

			const { WebClient } = require('@slack/web-api');
			const client = new WebClient(slack_bot_token);
			try {
				// Fetch the latest 100 messages from the specified channel
				const response = await client.conversations.history({
					channel: channelId,
					limit: 100,
				});
				const messages = response.messages;

				// Find the latest message that contains the specified email ID
				for (const message of messages) {
					if (message.text.includes(emailId)) {
						// Extract all digit groups from the message
						const digits = message.text.match(/\d+/g); // Match all digit sequences
						if (digits) {
							const lastSixDigits = digits[digits.length - 1].slice(-6); // Take the last group and extract its last 6 digits
							return lastSixDigits; // Return the 6 digits for further use
						}
						console.log('No 6-digit OTP found');
						return null;
					}
				}

				console.log(`No message found containing '${emailId}'`);
				return null;
			} catch (error) {
				console.error(`Error reading message: ${error.message}`);
				return null;
			}
		});
	}

	async enterOtp(locatorTemplate, validate = false) {
		await this.page.waitForTimeout(5000);
		const otp = await this.retrieveOtpFromSlack();
		console.log(otp);
		const otpCharacters = otp.split('');
	
		await test.step(`Enter OTP-${otp} into fields`, async () => { // Corrected string interpolation
			// Iterate over each character and fill it into the corresponding input field
			for (let i = 0; i < otpCharacters.length; i++) {
				const locator = locatorTemplate.replace('{index}', i + 1); // Replace {index} with the field number
				await this.page.locator(locator).fill(otpCharacters[i]);
	
				// Optionally validate the value after entering
				if (validate) {
					await expect(this.page.locator(locator)).toHaveValue(otpCharacters[i]);
				}
			}
		});
	}
	

	// async enterOtp(locatorTemplate, validate = false) {
	// 	await this.page.waitForTimeout(5000);
	// 	const otp = await this.retrieveOtpFromSlack();
	// 	console.log(otp);
	// 	const otpCharacters = otp.split('');

	// 	await test.step('Enter OTP-  into fields', async () => {
	// 		// Iterate over each character and fill it into the corresponding input field
	// 		for (let i = 0; i < otpCharacters.length; i++) {
	// 			const locator = locatorTemplate.replace('{index}', i + 1); // Replace {index} with the field number
	// 			await this.page.locator(locator).fill(otpCharacters[i]);

	// 			// Optionally validate the value after entering
	// 			if (validate) {
	// 				await expect(this.page.locator(locator)).toHaveValue(otpCharacters[i]);
	// 			}
	// 		}
	// 	});
	// }
}

export default BasePage;


// -----------------------------------------------------------------
// import { expect } from '@playwright/test'
// // const testData = JSON.parse(fs.readFileSync(`./data/users.json`, `utf-8`))
// const { loadConfig } = require('../utils/config');
// const env = process.env.ENV || 'default'; // Set environment via ENV variable
// const config = loadConfig(env);

// class BasePage {
// 	constructor(page) {
// 		this.page = page
// 	}

// 	async open(url) {
// 		return await this.page.goto(url)
// 	}

// 	async getTitle() {
// 		return await this.page.title()
// 	}

// 	async pause() {
// 		return await this.page.pause()
// 	}

// 	async getUrl() {
// 		return this.page.url()
// 	}

// 	async wait() {
// 		return this.page.waitForTimeout(10000)
// 	}

// 	async waitForPageLoad() {
// 		return await this.page.waitForLoadState('domcontentloaded')
// 	}

// 	async clickElemnet(selector) {
// 		return await this.page.click(selector)
// 	}

// 	async waitAndHardClick(selector) {
// 		return await this.page.$eval(selector, element => element.click())
// 	}

// 	async typeText(selector, text) {
// 		return await this.page.fill(selector, text)
// 	}

// 	async keyPress(selector, key) {
// 		return await this.page.press(selector, key)
// 	}

// 	async takeScreenShot() {
// 		return expect(await this.page.screenshot()).toMatchSnapshot(
// 			'MyScreenShot.png'
// 		)
// 	}

// 	async verifyElementText(selector, text) {
// 		const textValue = await this.page.textContent(selector)
// 		return expect(textValue.trim()).toBe(text)
// 	}

// 	async verifyElementContainsText(selector, text) {
// 		const locatorText = await this.page.locator(selector)
// 		return await expect(locatorText).toContainText(text)
// 	}

// 	async verifyJSElementValue(selector, text) {
// 		const textValue = await this.page.$eval(selector, element => element.value)
// 		return expect(textValue.trim()).toBe(text)
// 	}

// 	async selectValueFromDropdown(selector, text) {
// 		const dropdown = await this.page.locator(selector)
// 		return await dropdown.selectOption({ value: text })
// 	}

// 	async verifyElementAttribute(selector, attribute, value) {
// 		const textValue = await this.page.getAttribute(selector, attribute)
// 		return expect(textValue.trim()).toBe(value)
// 	}

// 	async getFirstElementFromTheList(selector) {
// 		const rows = await this.page.locator(selector)
// 		const count = await rows.count()
// 		for (let i = 0; i < count; ++i) {
// 			const firstItem = await rows.nth(0).textContent()
// 			return firstItem
// 		}
// 	}

// 	async getLastElementFromTheList(selector) {
// 		const rows = await this.page.locator(selector)
// 		const count = await rows.count()
// 		for (let i = 0; i < count; ++i) {
// 			const lastItem = await rows.nth(5).textContent()
// 			return lastItem
// 		}
// 	}

// 	async clickAllElements(selector) {
// 		const rows = await this.page.locator(selector)
// 		const count = 2
// 		for (let i = 0; i < count; ++i) {
// 			await rows.nth(i).click()
// 		}
// 	}
 
// 	async clickAllLinksInNewTabs(selector) {
// 		const rows = this.page.locator(selector)
// 		const count = rows.count()
// 		for (i in range(count)) {
// 			await rows.nth(i).click((modifiers = ['Control', 'Shift']))
// 		}
// 	}

// 	async isElementVisible(selector) {
// 		const element = this.page.locator(selector)
// 		try {
// 			const isVisible = await element.isVisible()
// 			return isVisible
// 			// expect(isVisible).toBeTruthy()
// 		} catch (error) {
// 			throw new Error('Element Not Visible. Check Failed!')
// 		}
// 	}

// 	async isElementNotVisible(selector) {
// 		const element = this.page.locator(selector)
// 		return expect(element).toBeHidden
// 	}

// 	async isElementEnabled(selector) {
// 		const element = this.page.locator(selector)
// 		try {
// 			const isEnabled = await element.isEnabled()
// 			// expect(isEnabled).toBeTruthy()
// 		} catch (error) {
// 			throw new Error('Element Not Enabled. Check Failed!')
// 		}
// 	}

// 	async isElementChecked(selector) {
// 		const element = this.page.locator(selector)
// 		try {
// 			const isChecked = await element.isChecked()
// 			return isChecked
// 			// expect(isChecked).toBeTruthy()
// 		} catch (error) {
// 			throw new Error('Element Not Visible. Check Failed!')
// 		}
// 	}
// // ---------------------------------------------------------------------------------
// 	async retrieveOtpFromSlack() {
// 		const slack_bot_token = config.slack_bot_token;  // Replace with your Slack bot token
// 		const channelId = config.channelId; // Replace with your Slack channel ID
// 		const emailId = config.email; // Replace with the email ID you're looking for

// 		const { WebClient } = require('@slack/web-api');
// 		const client = new WebClient(slack_bot_token);
// 		try {
// 			// Fetch the latest 100 messages from the specified channel
// 			const response = await client.conversations.history({
// 				channel: channelId,
// 				limit: 100,
// 			});
// 			const messages = response.messages;

// 			// Find the latest message that contains the specified email ID
// 			for (const message of messages) {
// 				if (message.text.includes(emailId)) {
// 					// Extract all digit groups from the message
// 					const digits = message.text.match(/\d+/g); // Match all digit sequences
// 					if (digits) {
// 						const lastSixDigits = digits[digits.length - 1].slice(-6); // Take the last group and extract its last 6 digits
// 						// console.log(lastSixDigits); // Print only the last 6 digits
// 						return lastSixDigits; // Return the 6 digits for further use
// 					}
// 					console.log("No 6-digit OTP found");
// 					return null;
// 				}
// 			}

// 			console.log(`No message found containing '${emailId}'`);
// 			return null;
// 		} catch (error) {
// 			console.error(`Error reading message: ${error.message}`);
// 			return null;
// 		}
// 	}

// 	async enterOtp(locatorTemplate, validate = false) {
// 		await this.page.waitForTimeout(5000);
// 		const otp = await this.retrieveOtpFromSlack();
// 		console.log(otp);
// 		const otpCharacters = otp.split('');
	
// 		// Iterate over each character and fill it into the corresponding input field
// 		for (let i = 0; i < otpCharacters.length; i++) {
// 			const locator = locatorTemplate.replace('{index}', i + 1); // Replace {index} with the field number
// 			await this.page.locator(locator).fill(otpCharacters[i]);
	
// 			// Optionally validate the value after entering
// 			if (validate) {
// 				await expect(this.page.locator(locator)).toHaveValue(otpCharacters[i]);
// 			}
// 		}
// 	}

// }
// export default BasePage