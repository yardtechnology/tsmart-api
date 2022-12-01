const fetch = require("node-fetch");

export const sendSMS = (
  phoneNumbers: string,
  message: string,
  isCall: boolean
) =>
  new Promise(async (resolve, reject) => {
    try {
      const options = {
        authorization: process.env.FTS_KEY,
        message,
        numbers: phoneNumbers,
      };

      // const data = await fast2sms.sendMessage(options);
      const response = await fetch(
        `https://2factor.in/API/V1/${process.env.FTS_KEY}/${
          isCall ? "VOICE" : "SMS"
        }/${phoneNumbers}/${isCall ? message : `${message}/temp1`}`
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
