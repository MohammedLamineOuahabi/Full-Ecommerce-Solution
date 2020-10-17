const express = require("express");

const morgan = require("morgan");
const path = require("path");
const connectDB = require("./config/db.js");

const { notFound, errorHandler } = require("./middleware/errorMiddleware.js");
const productRoutes = require("./routes/productRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");
const uploadRoutes = require("./routes/uploadRoutes.js");

// ******* init express app *****************

const app = express();

// ******* load env vars for dev env  *******

if (process.env.NODE_ENV !== "production") require("dotenv").config();

// ******* Connect to db  *******************

connectDB();

// ******* static files *********************

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use(express.static(path.join(__dirname, "../frontend/build")));

// ******* MIDDLEWARE ************************

app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  app.get("/", (req, res) => {
    res.send("Api is running ...");
  });
}

// *******   ROUTES   ************************
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/upload", uploadRoutes);
app.get("/api/v1/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});
if (process.env.NODE_ENV === "production") {
  app.use(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, "..", "frontend", "build", "index.html"));
  });
}
// *******  Error Middleware *************

app.use(notFound);
app.use(errorHandler);
// if error return json response to client

// *********  listening  *****************
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server running on port " + port);
});
