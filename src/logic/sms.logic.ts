import AWS from "aws-sdk";

class SMSLogic {
  constructor() {
    AWS.config.update({
      accessKeyId: process.env.AMAZON_ACCESS_KEY_ID,
      secretAccessKey: process.env.AMAZON_SECRET_ACCESS_KEY,
      region: process.env.AMAZON_REGION,
    });
  }
  public async sendOTP({
    phoneNumber,
    message,
  }: {
    phoneNumber: string;
    message: string;
  }) {
    // Create publish parameters
    var params = {
      Message: message /* required */,
      PhoneNumber: phoneNumber,
    };
    console.log({ params });
    // Create promise and SNS service object
    var publishTextPromise = new AWS.SNS({ apiVersion: "2010-03-31" })
      .publish(params)
      .promise();

    // Handle promise's fulfilled/rejected states
    publishTextPromise
      .then(function (data) {
        console.log("MessageID is " + data.MessageId);
      })
      .catch(function (err) {
        console.error(err, err.stack);
      });
  }
}

export default SMSLogic;
