import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc Fetch all products
// @route /api/v1/products?keyword=
// @access public
const getProducts = asyncHandler(async (req, res) => {
  //set the page size
  const pageSize = 10;
  const page = Number(req.query.page) || 1;

  const keyword = req.query.keyword
    ? {
        ///name of the products
        name: {
          ///like no (==)
          $regex: req.query.keyword,
          $options: "i"
        }
      }
    : {};
  ////
  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc Fetch single products
// @route /api/v1/products/:id
// @access public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error("Product not found.");
  }
});
// @desc delete single product
// @route /api/v1/products/:id
// @access private/admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.status(200).json({ message: "Product removed." });
  } else {
    res.status(404);
    throw new Error("Product not found.");
  }
});
// @desc create single product
// @route POST /api/v1/products
// @access private/admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample product",
    image: "/images/sample.jpg",
    brand: "Sample Brand",
    category: "Sample category",
    description: "Sample Description",
    numReviews: 0,
    price: 0,
    inStock: 0,
    user: req.user._id
  });
  const createdProduct = await product.save();
  if (createdProduct) {
    res.status(200).json(createdProduct);
  } else {
    res.status(404);
    throw new Error("Product not created.");
  }
});

// @desc update single product
// @route PUT /api/v1/products/id
// @access private/admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, image, brand, category, description, price, inStock } = req.body;
  console.log("req.params.id", req.params.id);

  console.log(name, image, brand, category, description, price, inStock);
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.description = description;
    product.price = price;
    product.inStock = inStock;
    console.log("in save");
    const createdProduct = await product.save();
    console.log(createdProduct);
    res.status(200).json(createdProduct);
  } else {
    res.status(404);
    throw new Error("Product not found.");
  }
});

// @desc create Review
// @route POST /api/v1/products/:id/review
// @access private/admin
const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    //check if the product already reviewed
    const alreadyReviewed = product.reviews.find(
      r => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed.");
    }
    //create review object
    const review = {
      name: req.user.username,
      rating: Number(rating),
      comment,
      user: req.user._id
    };

    //add the review obj to product.reviews array
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    const allProductRatings = product.reviews.reduce((acc, item) => item.rating + acc, 0);
    product.rating = allProductRatings / product.reviews.length;
    await product.save();
    res.status(201).json({ message: "review added." });
  } else {
    res.status(404);
    throw new Error("Product not found.");
  }
});

// @desc get top rated products
// @route POST /api/v1/products/top
// @access public

const getTopProducts = asyncHandler(async (req, res) => {
  console.log("in getTopProducts");
  const products = await Product.find({}).sort({ rating: -1 }).limit(3); ///

  if (products) {
    res.status(201).json(products);
  } else {
    res.status(404);
    throw new Error("no products found.");
  }
});

export default {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createReview,
  getTopProducts
};
