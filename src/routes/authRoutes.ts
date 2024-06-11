import express, { Request, Response, NextFunction } from "express";
import { register } from "../controllers/userController.js";
import isAdmin from "../middlewares/isAdmin.js";
const router = express.Router();

router.post("/", register);

export default router;
