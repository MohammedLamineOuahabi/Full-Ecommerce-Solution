import express from "express";
import productController from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/top").get(productController.getTopProducts);
router
  .route("/")
  .get(productController.getProducts)
  .post(protect, admin, productController.createProduct);
router
  .route("/:id")
  .get(productController.getProductById)
  .put(protect, admin, productController.updateProduct)
  .delete(protect, admin, productController.deleteProduct);
router.route("/:id/review").post(protect, productController.createReview);

export default router;
