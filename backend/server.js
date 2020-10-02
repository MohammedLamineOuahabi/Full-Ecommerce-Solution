require("dotenv").config();

const express = require("express");
const app = express();

const products = require("./data/products");

app.get("/api/", (req, res) => {
  res.send("API is running ..");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find(p => p._id === req.params.id);

  res.json(product);
});

const port = process.env.PORT || 5000;

app.listen(port, console.log(`server running in ${process.env.NODE_ENV} mode, on port ${port}`));
