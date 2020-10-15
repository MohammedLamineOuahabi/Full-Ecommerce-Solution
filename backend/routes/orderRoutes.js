import express from "express";
import orderController from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(protect, orderController.addOrder)
  .get(protect, admin, orderController.getOrders);
router.route("/myorders").get(protect, orderController.getMyOrders);
router.route("/:id").get(protect, orderController.getOrderById);
router.route("/:id/pay").put(protect, orderController.setOrderIsPaid);
router.route("/:id/delivered").put(protect, orderController.setOrderIsDelivered);

export default router;
