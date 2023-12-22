import winston from "winston";
import { configs } from "@/configs";
import { endpoints } from "@/routes";

const isDevelopment: boolean = configs.nodeEnv === endpoints.development;

const levels: winston.config.AbstractConfigSetLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

winston.addColors({
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
});

const logger: winston.Logger = winston.createLogger({
  level: isDevelopment ? "debug" : "warn",
  levels,
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(
      (info: winston.Logform.TransformableInfo) =>
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `${[info.timestamp]} :: ${info.level} :: ${info.message}`,
    ),
  ),
  transports: [
    new winston.transports.File({
      level: "error",
      filename: "logs/error.log",
      maxsize: 10000000,
      maxFiles: 10,
    }),
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize({ all: true })),
    }),
  ],
});

export default logger;
