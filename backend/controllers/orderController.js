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

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("No Order found.");
  }
});
// @desc   update order to paid
// @route  POST /api/v1/orders/:id/pay
// @access private
const setOrderIsPaid = asyncHandler(async (req, res) => {
  //get order using id
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      ///paypal returns infos
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address
      ///end paypal info
      ///if using other payment method
      ///we my need to add other infos
    };

    const updatedOrder = await order.save();

    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("No Order found.");
  }
});

// @desc   get Logged In user orders
// @route  GET /api/v1/orders/myorders
// @access private
const getMyOrders = asyncHandler(async (req, res) => {
  //get order using id
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

export default { addOrder, getOrderById, setOrderIsPaid, getMyOrders };
