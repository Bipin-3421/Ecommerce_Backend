import express, { Request, Response, NextFunction } from "express";
import { register, login } from "../controllers/userController.js";
import isAdmin from "../middlewares/isAdmin.js";
const router = express.Router();

router.post("/", register);
router.post("/login", login);

export default router;
