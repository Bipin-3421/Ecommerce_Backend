import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.js";
import ErrorHandler from "../utils/error-utility-class.js";

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new ErrorHandler("Unauthorized", 401));
  }
  if (req.user.role !== "admin") {
    return next(new ErrorHandler("Forbidden: Admins only", 401));
  }

  next();
};

export default isAdmin;
