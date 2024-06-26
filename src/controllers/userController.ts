import { Request, Response, NextFunction } from "express";
import AuthSerice from "../services/auth.service";
import { RegisterSchemaType } from "../validators/authValidator";
import { sendCookie } from "../utils/cookieHandler";
import AuthService from "../services/auth.service";
import ErrorHandler from "../utils/error-utility-class";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
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
): Promise<void> => {
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
): Promise<void> => {
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

export const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await AuthSerice.getSingleUser(id);
    if (!user)
      return next(new ErrorHandler(`user with the id:${id} not found`, 404));
    res.status(200).json({
      success: true,
      message: "user fetched successfully",
      user,
    });
  } catch (err) {
    next(err);
  }
};

export const editUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { role } = req.body;
    const { id } = req.params;
    const updatedUser = await AuthSerice.updateSingleUser(id, role);
    if (!updatedUser)
      return next(new ErrorHandler(`user with the id:${id} not found`, 404));
    res.status(200).json({
      success: true,
      message: "user edited successfully",
      updatedUser,
    });
  } catch (err) {
    next(err);
  }
};
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedUser = await AuthSerice.deleteSingleUser(id);
    if (!deletedUser)
      return next(new ErrorHandler(`user with the id:${id} not found`, 404));
    res.status(200).json({
      success: true,
      message: `user with id:${id} deleted successfully`,
      deletedUser,
    });
  } catch (err) {
    next(err);
  }
};
