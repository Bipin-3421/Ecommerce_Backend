import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import errorMiddleware from "./middlewares/errorMiddleWare";
export const app = express();

// using middlewares
app.use(express.json());
app.use(cookieParser());

// using Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use(errorMiddleware);
// good
app.use(function (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error) {
    return res.status(500).end();
  } else {
    return next();
  }
});
