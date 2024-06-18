import express, { Request, Response, NextFunction } from "express";
import { register, login } from "../controllers/userController";
import validateUser from "../middlewares/validateMiddleware";
import {
  userLoginSchema,
  userRegisterSchema,
} from "../validators/authValidator";
const router = express.Router();

router.post("/", validateUser(userRegisterSchema), register);
router.post("/login", validateUser(userLoginSchema), login);

export default router;
