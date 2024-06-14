import { Request, Response, NextFunction } from "express";
import AuthSerice from "../services/auth.service";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    await AuthSerice.loginAuthService(email, password, res, next);
  } catch (err) {
    next(err);
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    await AuthSerice.registerAuthService(name, email, password, res, next);
  } catch (err) {
    next(err);
  }
};
