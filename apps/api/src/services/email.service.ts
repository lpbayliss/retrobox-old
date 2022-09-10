import { SES } from "aws-sdk";
import AWS from "aws-sdk";

const aws = new AWS.SES({ apiVersion: "2010-12-01" });

const send = async (toAddresses: string[], message: SES.Message) => {
  const params = {
    Destination: { ToAddresses: toAddresses },
    Message: message,
    Source: "noreply@retrobox.app",
  };

  await aws.sendEmail(params).promise();
};

export default {
  send,
};
