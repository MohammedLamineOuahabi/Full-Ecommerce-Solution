import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import productRoutes from "./route/productRoutes.js";
import userRoutes from "./route/userRoutes.js";
import orderRoutes from "./route/orderRoutes.js";

const app = express();
dotenv.config();
connectDB();

// ******* MIDDLEWARE ************************
app.use((req, res, next) => {
  //console.log(req.originalUrl);
  next();
});

app.use(express.json());

// *******   ROUTES   ************************
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/orders", orderRoutes);

app.get("/api/", (req, res) => {
  res.send("API is running ..");
});

// ******* Error Middleware ************************

app.use(notFound); // 404 error handler
app.use(errorHandler); // if error return json response to client

// ******************************************
const port = process.env.PORT || 5000;
app.listen(
  port,
  console.log(`server running in ${process.env.NODE_ENV} mode, on port ${port}`.blue)
);
