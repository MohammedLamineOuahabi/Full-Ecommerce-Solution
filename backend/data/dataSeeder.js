const dotenv = require("dotenv");
const colors = require("colors");

const products = require("./products");
const users = require("./users");

const Product = require("../models/productModel");
const User = require("../models/userModel");
const Order = require("../models/orderModel");

const connectDB = require("../config/db");
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
