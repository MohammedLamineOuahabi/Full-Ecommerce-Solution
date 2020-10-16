const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const connectDB = require("./config/db.js");

const { notFound, errorHandler } = require("./middleware/errorMiddleware.js");
const productRoutes = require("./routes/productRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");
const uploadRoutes = require("./routes/uploadRoutes.js");

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
//const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

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

// *******  Error Middleware *************
app.use(notFound);
app.use(errorHandler); // if error return json response to client
// ******************************************
const port = process.env.PORT || 5000;
app.listen(
  port,
  console.log(`server running in ${process.env.NODE_ENV} mode, on port ${port}`.blue)
);
