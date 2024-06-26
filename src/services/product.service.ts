import Product, { IProduct } from "../models/product";
import ErrorHandler from "../utils/error-utility-class";

class ProductService {
  async addProductService(
    name: string,
    description: string,
    price: number,
    category: string,
    image: Express.Multer.File
  ): Promise<IProduct> {
    try {
      const product = await Product.create({
        name,
        description,
        price,
        category,
        image: image?.path,
      });
      return product;
    } catch (err) {
      throw new ErrorHandler(`Error creating Product: ${err}`, 500);
    }
  }
  async editProductService(
    id: string,
    name: string,
    description: string,
    price: number,
    category: string,
    image: Express.Multer.File
  ): Promise<IProduct> {
    try {
      const product = await Product.findByIdAndUpdate(
        id,
        {
          name,
          description,
          price,
          category,
          image: image?.path,
        },
        {
          new: true,
        }
      );
      if (!product) throw new ErrorHandler("No product Found", 404);
      return product;
    } catch (err) {
      throw new ErrorHandler(`Error updating Product: ${err}`, 500);
    }
  }

  async getProductService() {
    const product = await Product.find({});
    if (product.length === 0) {
      throw new ErrorHandler("No product found ", 404);
    }
    return product;
  }

  async deleteProductService(id: string): Promise<IProduct> {
    try {
      const product = await Product.findByIdAndDelete(id);
      if (!product) throw new ErrorHandler("No product found", 404);
      return product;
    } catch (err) {
      throw new ErrorHandler(`Error created ${err}`, 500);
    }
  }

  async getProductByPrice(minPrice: number, maxPrice: number) {
    try {
      const getFilteredproduct = await Product.find({
        price: { $gte: minPrice } && { $lte: maxPrice },
      });
      return getFilteredproduct;
    } catch (err) {
      throw new ErrorHandler("filter error ", 500);
    }
  }

  async getProductByCategory(category: string) {
    try {
      let product = await Product.findOne({ category });
      if (!product) throw new ErrorHandler("Product not found", 400);
      return product;
    } catch (err) {
      throw new ErrorHandler(`Err:${err}`, 500);
    }
  }
}
export default new ProductService();
