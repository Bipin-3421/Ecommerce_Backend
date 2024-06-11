import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
export const app = express();

// using middlewares

app.use(express.json());
app.use(cookieParser());

// using Routes
app.use("/api/products", productRoutes);
app.use("/api/users", authRoutes);

//Initial Testing
app.get("/", (req: Request, res: Response) => {
  res.send("It is working fine");
});

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
