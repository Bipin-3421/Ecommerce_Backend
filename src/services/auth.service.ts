import bcrypt from "bcryptjs";
import { User } from "../models/user";
import { Response, NextFunction } from "express";
import ErrorHandler from "../utils/error-utility-class";
import { sendCookie } from "../utils/cookieHandler";
import jwt from "jsonwebtoken";

class AuthService {
  async loginAuthService(
    email: string,
    password: string,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = await User.findOne({ email }).select("password");
      if (!user) return next(new ErrorHandler("no user found ", 404));
      console.log(user);
      const isMatch = await bcrypt.compare(password, user.password);
      console.log(isMatch);
      console.log(user._id);
      if (!isMatch) return next(new ErrorHandler("password not matched", 400));
      sendCookie(user, res, `Welcome back, ${user._id}`, 200);
    } catch (err) {
      next(err);
    }
  }
  async registerAuthService(
    name: string,
    email: string,
    password: string,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });
      sendCookie(user, res, `${user.name} created successfully` as string, 201);
    } catch (err) {
      next(err);
    }
  }
}

export default new AuthService();
