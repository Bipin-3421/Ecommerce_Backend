import jwt from "jsonwebtoken";
import { Response } from "express";
export const sendCookie = (user, res: Response, message, statusCode) => {
  const token = jwt.sign({ _id: user._id }, process.env.jwt as string);
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message,
    });
};
