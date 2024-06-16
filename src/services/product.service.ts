import { NextFunction, Request, Response } from "express";
import Product from "../models/product";
import ErrorHandler from "../utils/error-utility-class";

class ProductService {
  constructor() {
    console.log("product service constructed");
  }

  async addProductService(
    name: string,
    description: string,
    price: number,
    category: string,
    next: NextFunction,
    req: Request,
    res: Response
  ): Promise<void> {
    try {
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
  }
  async editProductService(
    name: string,
    description: string,
    price: number,
    category: string,
    next: NextFunction,
    req: Request,
    res: Response
  ): Promise<any> {
    try {
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
        return next(new ErrorHandler("No product found", 404));
      }
      res.status(201).json({
        success: true,
        message: "product Edited Successfully",
        product,
      });
    } catch (err) {
      next(err);
    }
  }
  async getProductService(next: NextFunction, res: Response) {
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
      next(err);
    }
  }
  async deleteProductService(req: Request, res: Response, next: NextFunction) {
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
      next(err);
    }
  }
}
export default new ProductService();
