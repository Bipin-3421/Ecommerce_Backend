import express from "express";
import {
  addProducts,
  getProducts,
  editProducts,
  deleteProducts,
} from "../controllers/productController.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = express.Router();

router.post("/", isAdmin, addProducts);

router.get("/all", getProducts);

router.put("/edit/:id", editProducts);

router.delete("/:id", deleteProducts);

export default router;
