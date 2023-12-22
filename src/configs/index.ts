import "dotenv/config";

export const configs = {
  nodeEnv: process.env.NODE_ENV as string,
  host: process.env.HOST ?? "0.0.0.0",
  port: Number(process.env.PORT) ?? 5000,
  apiVersion: process.env.API_VERSION ?? "/api/v1",

  baseDomain: {
    client: process.env.CLIENT_BASE_DOMAIN as string,
    server: process.env.SERVER_BASE_DOMAIN as string,
  },

  baseURL: {
    client: process.env.CLIENT_BASE_URL as string,
    server: process.env.SERVER_BASE_URL as string,
  },
  secratKeyAndToken: {
    secrat: process.env.SECRAT as string,
    accessToken: process.env.ACCESS_TOKEN_SECRAT as string,
    refreshToken: process.env.REFRESH_TOKEN_SECRAT as string,
  },
  db: {
    mongodb: {
      uri: process.env.MONGO_URL as string,
    },
  },
  email: {
    host: process.env.SMTP_HOST as string,
    port: process.env.SMTP_PORT as string,
    user: process.env.SMTP_USER as string,
    password: process.env.SMTP_PASSWORD as string,
  },
};

export const serverWithApiversion = `${configs.baseURL.server}${configs.apiVersion}`;
