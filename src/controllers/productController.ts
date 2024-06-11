import { Request, Response, NextFunction } from "express";
import Product from "../models/product.js";

export const addProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, price, category, imageUrl } = req.body;
    const product = await Product.create({
      name,
      description,
      price,
      category,
      imageUrl,
    });
    res.status(201).json({
      success: true,
      message: "Product added Successfully",
      product,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const product = await Product.find({});
    if (!product) {
      return res.status(404).json({
        success: false,
      });
    }
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
    const { name, description, price, category, imageUrl } = req.body;
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        category,
        imageUrl,
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
