import { Request, Response, NextFunction } from "express";
import productService from "../services/product.service";
import Product from "../models/product";
import ErrorHandler from "../utils/error-utility-class";
export const addProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, price, category } = req.body;
    await productService.addProductService(
      name,
      description,
      price,
      category,
      next,
      req,
      res
    );
  } catch (err) {
    next(err);
  }
};

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await productService.getProductService(next, res);
  } catch (err) {
    next(err);
  }
};

export const editProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, price, category } = req.body;
    await productService.editProductService(
      name,
      description,
      price,
      category,
      next,
      req,
      res
    );
  } catch (err) {
    next(err);
  }
};

export const deleteProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await productService.deleteProductService(req, res, next);
  } catch (err) {
    next(err);
  }
};
