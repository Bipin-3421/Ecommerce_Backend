import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/error-utility-class.js";
import { IUser, User } from "../models/user.js";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
        name: string;
        email: string;
        password: string;
      };
    }
  }
}

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      next(new ErrorHandler("User is not Authenticated", 404));
    }
    const decoded = jwt.verify(token, process.env.jwt as string);
    // handling type
    if (typeof decoded === "string") return;
    const user: IUser | null = await User.findById(decoded._id);
    if (!user) return next(new ErrorHandler("User not found", 404));
    const userId = user._id.toString();
    req.user = {
      id: userId,
      role: user?.role,
      name: user?.name,
      email: user?.email,
      password: (user as IUser).password,
    };
    next();
  } catch (err) {
    next(err);
  }
};
