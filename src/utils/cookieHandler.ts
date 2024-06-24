import jwt from "jsonwebtoken";
import { Response } from "express";
import { IUser } from "../models/user";
export const sendCookie = (
  user: IUser,
  res: Response,
  message: string,
  statusCode: number
) => {
  const token = jwt.sign({ _id: user._id }, process.env.jwt as string);
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 40 * 60 * 60,
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message,
      token,
    });
};
