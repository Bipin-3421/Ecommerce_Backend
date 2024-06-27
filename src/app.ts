import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import errorMiddleware from "./middlewares/errorMiddleWare";
import path from "path";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

export const app = express();

// using middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const yamlFilePath = path.resolve(__dirname, "docs/swagger.yaml");
const swaggerDocument = YAML.load(yamlFilePath);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// using Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use(errorMiddleware);
