import { Request, Response, NextFunction } from "express";
import productService from "../services/product.service";
import Product, { IProduct } from "../models/product";
import ErrorHandler from "../utils/error-utility-class";
export const addProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, description, price, category } = req.body;
    const image = req.file;
    if (!name || !description || !price || !category || !image)
      throw new ErrorHandler("Please Enter all the fields", 400);
    const product: IProduct = await productService.addProductService(
      name,
      description,
      price,
      category,
      image
    );
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
): Promise<void> => {
  try {
    const product = await productService.getProductService();
    res.status(200).json({
      success: true,
      message: "The product is fetched Properly",
      product,
    });
  } catch (err) {
    next(err);
  }
};

export const editProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description, price, category } = req.body;
    const image = req.file;
    const updatedProduct = await productService.editProductService(
      id,
      name,
      description,
      price,
      category,
      image as Express.Multer.File
    );
    res.status(201).json({
      success: true,
      message: "product updated successfully",
      updatedProduct,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await productService.deleteProductService(id);
    res.status(200).json({
      success: true,
      message: `Product with name:${product.name}deleted Successfully`,
      product,
    });
  } catch (err) {
    next(err);
  }
};

export const filterByPriceRange = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const minPrice: number = 1000;
    const maxPrice: number = 4000;
    const filteredProduct = await productService.getProductByPrice(
      minPrice,
      maxPrice
    );
    res.status(200).json({
      success: true,
      message: "Product with the following price range filtered properly",
      filteredProduct,
    });
  } catch (err) {
    next(err);
  }
};

export const filterByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { category } = req.params;
    const product = await productService.getProductByCategory(category);
    res.status(200).json({
      success: true,
      message: "Product Filtered successfully according to category",
      product,
    });
  } catch (err) {
    next(err);
  }
};

export const totalProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const totalProduct = await Product.aggregate([
      {
        $count: "total",
      },
    ]);
    const total = totalProduct.length > 0 ? totalProduct[0].total : 0;
    res.status(200).json({
      success: true,
      totalProducts: total,
    });
  } catch (err) {
    next(err);
  }
};
