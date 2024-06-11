import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.js";

const isAdmin = (req: Request, res: Response, next: NextFunction) => {};

export default isAdmin;
