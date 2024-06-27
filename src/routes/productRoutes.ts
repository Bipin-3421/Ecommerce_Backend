import express from "express";
import {
  addProducts,
  getProducts,
  editProducts,
  deleteProducts,
  filterByPriceRange,
  filterByCategory,
  totalProduct,
  productStockByCategory,
} from "../controllers/productController";
import isAdmin from "../middlewares/isAdmin";
import authMiddleware from "../middlewares/authMiddleware";
import { singleUpload } from "../middlewares/multer";

const router = express.Router();

router.post("/", authMiddleware, isAdmin, singleUpload, addProducts);

router.get("/", authMiddleware, isAdmin, singleUpload, getProducts);

router.get("/filter/price", filterByPriceRange);

router.get("/admin/totalProduct", authMiddleware, isAdmin, totalProduct);

router.get(
  "/admin/product/stock",
  authMiddleware,
  isAdmin,
  productStockByCategory
);

router.get("/filter/:category", filterByCategory);

router.patch("/:id", authMiddleware, isAdmin, singleUpload, editProducts);

router.delete("/:id", authMiddleware, isAdmin, deleteProducts);

export default router;
