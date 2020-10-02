import dotenv from "dotenv";
import colors from "colors";

import products from "./products.js";
import users from "./users.js";

import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import Order from "../models/orderModel.js";

import connectDB from "../config/db.js";
dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map(p => {
      return {
        name: p.name,
        image: p.image,
        description: p.description,
        brand: p.brand,
        category: p.category,
        price: p.price,
        countInStock: p.countInStock,
        rating: p.rating,
        numReviews: p.numReviews,
        user: adminUser
      };
    });

    await Product.insertMany(sampleProducts);
    console.log("data imported!".green);
    process.exit();
  } catch (err) {
    console.error(err.message.red);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log("data deleted!".green);
    process.exit();
  } catch (err) {
    console.error(err.message.red);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  console.log("deleting data .. ");
  deleteData();
} else {
  console.log("importing data .. ");
  importData();
}
