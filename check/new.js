// async function retrieveOtpFromSlack(slack_bot_token,channelId, emailId) {
//     const { WebClient } = require('@slack/web-api');
// const client = new WebClient(slack_bot_token);
//     try {
//         // Fetch the latest 100 messages from the specified channel
//         const response = await client.conversations.history({
//             channel: channelId,
//             limit: 100,
//         });
//         const messages = response.messages;

//         // Find the latest message that contains the specified email ID
//         for (const message of messages) {
//             if (message.text.includes(emailId)) {
//                 // Extract all digit groups from the message
//                 const digits = message.text.match(/\d+/g); // Match all digit sequences
//                 if (digits) {
//                     const lastSixDigits = digits[digits.length - 1].slice(-6); // Take the last group and extract its last 6 digits
//                     // console.log(lastSixDigits); // Print only the last 6 digits
//                     return lastSixDigits; // Return the 6 digits for further use
//                 }
//                 console.log("No 6-digit OTP found");
//                 return null;
//             }
//         }

//         console.log(`No message found containing '${emailId}'`);
//         return null;
//     } catch (error) {
//         console.error(`Error reading message: ${error.message}`);
//         return null;
//     }
// }


// // Example usage:
// (async () => {
//     const slack_bot_token = 'xoxb-3778523297014-7813470237312-dBHUUUl5L2aIRHilCEiN3Aa1'  // Replace with your Slack bot token
//     const channelId = "C07JV766FPX"; // Replace with your Slack channel ID
//     const emailId = "aruna.gowda@getmojo.ai"; // Replace with the email ID you're looking for
//     const result = await retrieveOtpFromSlack(slack_bot_token, channelId, emailId);
//     console.log(result);
// })();

// -----------------------------------------------------------------------------------

async function retrieveOtpFromSlack() {
    const slack_bot_token = 'xoxb-3778523297014-7813470237312-dBHUUUl5L2aIRHilCEiN3Aa1'  // Replace with your Slack bot token
    const channelId = "C07JV766FPX"; // Replace with your Slack channel ID
    const emailId = "aruna.gowda@getmojo.ai"; // Replace with the email ID you're looking for
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
                    // console.log(lastSixDigits); // Print only the last 6 digits
                    return lastSixDigits; // Return the 6 digits for further use
                }
                console.log("No 6-digit OTP found");
                return null;
            }
        }

        console.log(`No message found containing '${emailId}'`);
        return null;
    } catch (error) {
        console.error(`Error reading message: ${error.message}`);
        return null;
    }
}

(async () => {
    const result = await retrieveOtpFromSlack();
    console.log(result);
})();
