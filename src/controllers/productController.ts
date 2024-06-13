import { Request, Response, NextFunction } from "express";
import Product from "../models/product";
import ErrorHandler from "../utils/error-utility-class";

export const addProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, price, category } = req.body;
    const image = req.file;
    const product = await Product.create({
      name,
      description,
      price,
      category,
      image: image?.path,
      user: req.user?.id,
    });
    res.status(201).json({
      success: true,
      message: "Product added Successfully",
      product,
    });
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
    const product = await Product.find({});
    if (product.length == 0)
      return next(new ErrorHandler("No product found ", 404));
    res.status(200).json({
      success: true,
      message: "The product is fetched Properly",
      product,
    });
  } catch (err) {
    console.log(err);
  }
};

export const editProducts = async (req: Request, res: Response) => {
  try {
    const { name, description, price, category } = req.body;
    const image = req.file;
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        category,
        image: image?.path,
      },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "no product",
      });
    }

    res.status(201).json({
      success: true,
      message: "product Edited Successfully",
      product,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteProducts = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product doesn't exists",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (err) {
    console.log(err);
  }
};
