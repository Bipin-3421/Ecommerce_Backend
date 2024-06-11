import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/user.js";
import { NewUserRequestBody } from "../types/types.js";
import jwt from "jsonwebtoken";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

  res.status(200).json({
    success: true,
    message: "User Successfully Registered",
    user,
  });
};
