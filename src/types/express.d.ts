import { Request } from "express";

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
  }
}
