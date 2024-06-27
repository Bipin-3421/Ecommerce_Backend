import Product, { IProduct } from "../models/product";
import ErrorHandler from "../utils/error-utility-class";

class ProductService {
  async addProductService(
    name: string,
    description: string,
    price: number,
    category: string,
    image: Express.Multer.File,
    stock: number
  ): Promise<IProduct> {
    try {
      const product = await Product.create({
        name,
        description,
        price,
        category,
        image: image?.path,
        stock,
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
      throw new ErrorHandler(`Error created ${err}`, 404);
    }
  }

  async getProductByPrice(minPrice: number, maxPrice: number) {
    try {
      const getFilteredproduct = await Product.find({
        price: { $gte: minPrice } && { $lte: maxPrice },
      });
      if (getFilteredproduct.length === 0)
        throw new ErrorHandler(
          "no product with the filter range available",
          404
        );
      return getFilteredproduct;
    } catch (err) {
      throw new ErrorHandler(`Error while filtering Products ${err}`, 404);
    }
  }

  async getProductByCategory(category: string): Promise<IProduct> {
    try {
      let product = await Product.findOne({ category });
      if (!product) throw new ErrorHandler("Product not found", 404);
      return product;
    } catch (err) {
      throw new ErrorHandler(`Err:${err}`, 404);
    }
  }

  async getTotalProduct(): Promise<number> {
    try {
      const totalProduct = await Product.aggregate([
        {
          $count: "total",
        },
      ]);
      if (!totalProduct) throw new ErrorHandler("Product not found", 404);
      const total = totalProduct.length > 0 ? totalProduct[0] : 0;
      return total;
    } catch (err) {
      throw new ErrorHandler(`Err:${err}`, 404);
    }
  }
  async getProductStock(): Promise<IProduct> {
    try {
      const productStock = await Product.aggregate([
        {
          $group: {
            _id: "$category",
            stock: {
              $sum: "$stock",
            },
          },
        },
      ]);
      if (!productStock) throw new ErrorHandler("Product not found", 404);
      return productStock;
    } catch (err) {
      throw new ErrorHandler(`Err:${err}`, 404);
    }
  }
}
export default new ProductService();
