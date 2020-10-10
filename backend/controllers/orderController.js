import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// @desc   create new order
// @route  POST /api/v1/orders
// @access private
const addOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error("No Items");
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});
// @desc   get order by id
// @route  GET /api/v1/orders/:id
// @access private
const getOrderById = asyncHandler(async (req, res) => {
  ///from user fields name & email
  const order = await Order.findById(req.params.id).populate("user", "username email");
  console.log(order);
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("No Order found.");
  }
});

export default { addOrder, getOrderById };
