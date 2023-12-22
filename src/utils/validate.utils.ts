// import type { Request, Response } from "express";
// import { statusError } from "./customErrorHandler";

export const isEmpty = (value: undefined | string | number | null) =>
  [undefined, null, NaN, ""].includes(value);
