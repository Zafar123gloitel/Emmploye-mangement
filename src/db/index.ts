import { connect } from "mongoose";
import { configs } from "@/configs";
import { logger } from "@/helpers";
import { customErrorHandler } from "@/utils/customErrorHandler";

export async function connectDB(): Promise<Error | undefined> {
  try {
    const mongoDB = await connect(configs.db.mongodb.uri);
    if (mongoDB != null) {
      logger.info(
        `>>>>>>>------------------------------------------------------------------------->>>>>>>`,
      );
      logger.http("🔰 Connected to MongoDB Database Successfully. 🔥");
    }
  } catch (error: unknown) {
    return customErrorHandler(error, true);
  }
}
