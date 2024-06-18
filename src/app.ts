import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import errorMiddleware from "./middlewares/errorMiddleWare";
import path from "path";
export const app = express();

// using middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// using Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use(errorMiddleware);
