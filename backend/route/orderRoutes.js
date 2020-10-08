import express from "express";
import orderController from "../controllers/orderController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, orderController.addOrder);

export default router;