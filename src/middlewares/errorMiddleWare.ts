import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/error-utility-class";

const errorMiddleware = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode ||= 500;
  err.message ||= "Internal Server Error";

  return res
    .status(err.statusCode)
    .json({ success: false, message: err.message });
};

export default errorMiddleware;
