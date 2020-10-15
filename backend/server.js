import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";
import connectDB from "./config/db.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const app = express();
dotenv.config();
connectDB();

// *******   ROUTES   ************************
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/upload", uploadRoutes);

app.get("/api/v1/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});
// ******* MIDDLEWARE ************************
app.use(express.json());
//__dirname not supported by es module
const __dirname = path.resolve();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  app.get("/", (req, res) => {
    res.send("Api is running ...");
  });
} else if (process.env.NODE_ENV === "production") {
  //set build folder as static folder
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  //redirect all not api routes to index.html
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// ******* Error Middleware ************************

app.use(notFound); // 404 error handler
app.use(errorHandler); // if error return json response to client

// ******************************************
const port = process.env.PORT || 5000;
app.listen(
  port,
  console.log(`server running in ${process.env.NODE_ENV} mode, on port ${port}`.blue)
);
