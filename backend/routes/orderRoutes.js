const express = require("express");
const orderController = require("../controllers/orderController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router
  .route("/")
  .post(protect, orderController.addOrder)
  .get(protect, admin, orderController.getOrders);
router.route("/myorders").get(protect, orderController.getMyOrders);
router.route("/:id").get(protect, orderController.getOrderById);
router.route("/:id/pay").put(protect, orderController.setOrderIsPaid);
router.route("/:id/delivered").put(protect, orderController.setOrderIsDelivered);

module.exports = router;
