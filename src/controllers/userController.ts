import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/error-utility-class.js";
import { sendCookie } from "../utils/features.js";

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

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });
    res.status(201).json({
      success: true,
      message: "Registered Successfully",
      token,
    });
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
    if (!user) return next(new ErrorHandler("user not found", 404));
    const isUserMatch = await bcrypt.compare(password, user.password);
    if (!isUserMatch)
      return next(new ErrorHandler("Incorrect Credentials", 404));
    const token = jwt.sign({ _id: user._id }, process.env.jwt as string);
    sendCookie(user, res, `Welcome back, ${user.name}`, 200);
  } catch (err) {
    next(err);
  }
};
