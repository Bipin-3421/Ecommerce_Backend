import express, { Request, Response, NextFunction } from "express";
import { register, login } from "../controllers/userController";
import validateBody from "../middlewares/validateMiddleware";
import {
  userLoginSchema,
  userRegisterSchema,
} from "../validators/authValidator";
const router = express.Router();

router.post("/", validateBody(userRegisterSchema), register);
router.post("/login", validateBody(userLoginSchema), login);

export default router;
