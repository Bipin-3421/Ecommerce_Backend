import { Request } from "express";
import User from "../models/user.ts";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: mongoose.Types.ObjectId;
        role: string;
        name: string;
        email: string;
        password: string;
      };
    }
    interface Request {
      product?: {
        id: mongoose.Types.ObjectId;
        name: string;
        description: string;
        price: number;
        category: string;
        image: Express.Multer.File;
      };
    }
  }
}
