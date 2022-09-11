import AWS from "aws-sdk";
import { config } from "dotenv";

config({ path: ".env.local" });
config({ path: `.env.${process.env.APP_ENV}` });

AWS.config.update({ region: "ap-southeast-2" });
AWS.config.getCredentials(function (err) {
  if (err) console.log(err.stack);
});

export default {
  MAGIC_LINK_SECRET: process.env.MAGIC_LINK_SECRET || "",
  SESSION_SECRET: process.env.SESSION_SECRET || "",
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  NODE_ENV: process.env.NODE_ENV,
  ALLOWED_ORIGINS: (process.env.ALLOWED_ORIGINS || "").split(","),
  APP_URL: process.env.APP_URL,
  PORT: process.env.PORT,
};
