import { IConfigService } from "./config.interface";
import AWS from "aws-sdk";
import { config } from "dotenv";
import { object, string, number } from "yup";
import to from "await-to-js";

const envSchema = object({
  NODE_ENV: string().lowercase().default("development"),
  ALLOWED_ORIGINS: string().lowercase().default("http://localhost:3000"),
  PORT: number().required().default(4000),
  APP_URL: string().default("http://localhost:3000"),
  SESSION_SECRET: string().required(),
  MAGIC_LINK_SECRET: string().required(),
  AWS_ACCESS_KEY_ID: string().required(),
  AWS_SECRET_ACCESS_KEY: string().required(),
});

const configureAWS = () => {
  AWS.config.update({ region: "ap-southeast-2" });
  AWS.config.getCredentials(function (err) {
    if (err) console.log(err.stack);
  });
};

const createConfigService = (): IConfigService => {
  config({ path: ".env.local" });
  config({ path: `.env.${process.env.APP_ENV}` });

  const env = envSchema.validateSync(process.env);

  configureAWS();

  return {
    secrets: {
      magicLinkSecret: env.MAGIC_LINK_SECRET,
      sessionSecret: env.SESSION_SECRET,
    },
    aws: {
      awsAccessKeyId: env.AWS_ACCESS_KEY_ID,
      awsSecretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    },
    env: {
      allowedOrigins: env.ALLOWED_ORIGINS.split(","),
      appUrl: env.APP_URL,
      isDevelopment: env.NODE_ENV === "development",
      port: env.PORT,
    },
  };
};

export default createConfigService;
