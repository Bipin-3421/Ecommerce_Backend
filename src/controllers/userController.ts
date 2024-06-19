import { Request, Response, NextFunction } from "express";
import AuthSerice from "../services/auth.service";
import productService from "../services/product.service";
import { RegisterSchemaType } from "validators/authValidator";

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
  req: Request<unknown, unknown, RegisterSchemaType>,
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
