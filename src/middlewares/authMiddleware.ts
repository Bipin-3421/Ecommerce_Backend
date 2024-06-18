import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/error-utility-class";
import { IUser, User } from "../models/user";

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
    if (typeof decoded === "string") return;
    const user: IUser | null = await User.findById(decoded._id);
    if (!user) return next(new ErrorHandler("User not found", 404));
    req.user = {
      id: user?._id,
      role: user?.role,
      name: user?.name,
      email: user?.email,
      password: user?.password,
    };
    next();
  } catch (err) {
    next(err);
  }
};

export default authMiddleware;
