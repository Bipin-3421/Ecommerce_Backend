import { Request, Response, NextFunction } from "express";
import AuthSerice from "../services/auth.service";
import { RegisterSchemaType } from "../validators/authValidator";
import { sendCookie } from "../utils/cookieHandler";
import AuthService from "../services/auth.service";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await AuthSerice.loginAuthService(email, password);
    sendCookie(user, res, `user.${email} Logged In Successfully`, 201);
  } catch (err) {
    next(err);
  }
};

export const register = async (
  req: Request<unknown, unknown, RegisterSchemaType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const user = await AuthSerice.registerAuthService(name, email, password);
    sendCookie(user, res, `user.${name} created successfully`, 201);
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await AuthService.getAuthenticatedUsers();
    res.status(200).json({
      success: true,
      message: "Users Fetched Successfully",
      user,
    });
  } catch (err) {
    next(err);
  }
};
