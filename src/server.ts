import "tsconfig-paths/register";
import express, { type Express } from "express";
import cors from "cors";
import compression from "compression";
import hpp from "hpp";
import helmet from "helmet";
import errorHandler from "errorhandler";
import path from "path";
import { configs } from "./configs";

import logger from "./helpers/logger";
import { router, endpoints, apiPath } from "./routes";
import { connectDB } from "./db";

const app: Express = express();
const { nodeEnv, host, port, apiVersion, baseURL } = configs;
const isProduction: boolean = nodeEnv === endpoints.production;

app.use(hpp());
app.use(helmet());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(compression());

if (!isProduction) {
  app.use(errorHandler());
}

async function startServer(): Promise<Error | undefined> {
  try {
    await connectDB();
    app.use(apiVersion, router);
  } catch (error) {
    if (error) return;
  } finally {
    app.listen(port, host, (error?: Error) => {
      if (error) return;
      logger.http(
        `🚀 Server ready at 📍 PID-${process.pid} :: HOST-${host} :: ${baseURL.server}`,
      );
      logger.debug("🔥 Start Coding with Happiness 😊 :: 🆗 ♻ 🎃 ✔ 💢 🎉");
      logger.info(
        `<<<<<<---------------------------------------------------------------------------<<<<<<`,
      );
    });
  }
}
void startServer();

app.get("/", (req, res) => {
  return res
    .status(200)
    .send(`Welcome to HelloWorld 🌍 :) Server is Running.^.^.^ 🔥`);
});

app.get("/api", (req, res) => {
  return res.status(200).json({
    message: `these are all api's list of empmang`,
    apis: apiPath,
  });
});
