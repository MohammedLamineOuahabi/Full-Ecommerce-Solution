const express = require("express");
const productController = require("../controllers/productController");
const { protect, admin } = require("../middleware/authMiddleware");

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

module.exports = router;
