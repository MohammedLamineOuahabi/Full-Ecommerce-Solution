import express from "express";
import orderController from "../controllers/orderController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, orderController.addOrder);
router.route("/myorders").get(protect, orderController.getMyOrders);
router.route("/:id").get(protect, orderController.getOrderById);
router.route("/:id/pay").put(protect, orderController.setOrderIsPaid);

export default router;
