import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/error-utility-class";
import { sendCookie } from "../utils/features";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ _id: user._id }, process.env.jwt as string);
    sendCookie(user, res, `${user.name} created successfully` as string, 200);
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler("no user found", 404));
    const isUserMatch = await bcrypt.compare(password, user.password);
    if (!isUserMatch)
      next(new ErrorHandler("user credentials not matched", 404));
    const token = jwt.sign({ _id: user._id }, process.env.jwt as string);
    sendCookie(user, res, `Welcome back, ${user.name}` as string, 200);
  } catch (err) {
    next(err);
  }
};
