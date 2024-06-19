import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/error-utility-class";
import { z } from "zod";

const errorMiddleware = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode ||= 500;
  err.message ||= "Internal Server Error";

  if (err instanceof z.ZodError) {
    return res
      .status(400)
      .json({ message: "Input validation failed", errors: err.errors });
  }

  return res
    .status(err.statusCode)
    .json({ success: false, message: err.message });
};

export default errorMiddleware;
