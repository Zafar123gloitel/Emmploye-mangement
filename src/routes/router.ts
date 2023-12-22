import { statusError } from "@/utils/customErrorHandler";
import express, { type Router, type Request, type Response } from "express";

const router: Router = express.Router();

router.all("*", (req: Request, res: Response) => {
  return statusError(404, res);
});

router.use((error: Error, req: Request, res: Response) => {
  const message = error.message as string | undefined;
  return statusError(500, res, message);
});

export default router;
