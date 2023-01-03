const fetch = require("node-fetch");

export const sendSMS = ({
  phoneNumber,
  message,
}: {
  phoneNumber: string;
  message: string;
}) =>
  new Promise(async (resolve, reject) => {
    try {
      const username = process.env.SMS_USERNAME;
      const password = process.env.SMS_PASSWORD;
      const auth =
        "Basic " + Buffer.from(username + ":" + password).toString("base64");
      const response = await fetch(`https://rest.clicksend.com/v3/sms/send`, {
        method: "POST",
        headers: {
          Authorization: auth,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              body: message,
              to: phoneNumber,
              from: "tSmart",
            },
          ],
        }),
      });
      resolve(await response.json());
    } catch (error) {
      reject(error);
    }
  });
