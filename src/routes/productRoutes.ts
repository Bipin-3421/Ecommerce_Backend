import express from "express";
import {
  addProducts,
  getProducts,
  editProducts,
  deleteProducts,
} from "../controllers/productController";
import isAdmin from "../middlewares/isAdmin";
import authMiddleware from "../middlewares/authMiddleware";
import { singleUpload } from "../middlewares/multer";

const router = express.Router();

router.post("/", authMiddleware, isAdmin, singleUpload, addProducts);

router.get("/", getProducts);

router.put("/:id", editProducts);

router.delete("/:id", deleteProducts);

export default router;
