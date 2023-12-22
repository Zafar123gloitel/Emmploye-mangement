import type { NextFunction, Response } from "express";
import { logger } from "@/helpers";
import { isEmpty } from "./validate.utils";
import {
  ACCEPTED,
  BAD_GATEWAY,
  BAD_REQUEST,
  CREATED,
  FORBIDDEN,
  GATEWAY_TIMEOUT,
  INTERNAL_SERVER_ERROR,
  OK,
  ROUTE_NOT_FOUND,
  SERVICE_UNAVAILABLE,
  THROTTLING_ERROR,
  UNAUTHORIZED,
} from "@/constants/auth";

export function customErrorHandler(error: unknown, isLogger = false): Error {
  const errorType = error as Error;
  if (isLogger) {
    logger.error(errorType.message);
  }
  return new Error(errorType.message);
}

// to pass the error to the next function of middleware
export function nextErrorHandler(
  error: unknown,
  next: NextFunction,
  isLogger = true,
): void {
  const errorType = error as Error;
  if (isLogger) {
    logger.error(errorType.message);
  }
  next(errorType.message);
}

export function statusError(
  status: number,
  res: Response,
  message = "",
): Response<unknown, Record<string, unknown>> {
  const errorMessages: Record<number, string> = {
    400: !isEmpty(message) ? message : BAD_REQUEST,
    401: !isEmpty(message) ? message : UNAUTHORIZED,
    403: !isEmpty(message) ? message : FORBIDDEN,
    404: ROUTE_NOT_FOUND,
    429: !isEmpty(message) ? message : THROTTLING_ERROR,
    500: !isEmpty(message) ? message : INTERNAL_SERVER_ERROR,
    502: !isEmpty(message) ? message : BAD_GATEWAY,
    503: !isEmpty(message) ? message : SERVICE_UNAVAILABLE,
    504: !isEmpty(message) ? message : GATEWAY_TIMEOUT,
  };
  if (status === 500) {
    logger.error("INTERNAL_SERVER_ERROR");
  }
  return res.status(status).json({
    success: false,
    status,
    message: errorMessages[status],
  });
}

export function statusSuccess(
  status: number,
  res: Response,
  message = "",
  payload = undefined,
  ...rest: unknown[]
): Response<unknown, Record<string, unknown>> {
  const successMessages: Record<number, string> = {
    200: !isEmpty(message) ? message : OK,
    201: !isEmpty(message) ? message : CREATED,
    202: !isEmpty(message) ? message : ACCEPTED,
  };
  return res.status(status).json({
    success: true,
    status,
    message: successMessages[status],
    payload,
    ...rest,
  });
}
