import express from "express";
import {
  register,
  login,
  getAllUsers,
  getSingleUser,
  editUser,
  deleteUser,
} from "../controllers/userController";
import validateBody from "../middlewares/validateMiddleware";
import {
  userLoginSchema,
  userRegisterSchema,
} from "../validators/authValidator";
import authMiddleware from "../middlewares/authMiddleware";
import isAdmin from "../middlewares/isAdmin";
const router = express.Router();

router.get("/", authMiddleware, isAdmin, getAllUsers);

router.post("/", validateBody(userRegisterSchema), register);

router.post("/login", validateBody(userLoginSchema), login);

router.get("/:id", authMiddleware, isAdmin, getSingleUser);

router.patch("/:id", authMiddleware, isAdmin, editUser);

router.delete("/:id", authMiddleware, isAdmin, deleteUser);

export default router;
