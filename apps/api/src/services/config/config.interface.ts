type TAppEnv = {
  isDevelopment: boolean;
  port: number;
  appUrl: string;
  allowedOrigins: string[];
};

type TAppSecrets = {
  sessionSecret: string;
  magicLinkSecret: string;
};

type TAWSConfig = {
  awsAccessKeyId: string;
  awsSecretAccessKey: string;
};

export interface IConfigService {
  secrets: TAppSecrets;
  aws: TAWSConfig;
  env: TAppEnv;
}
