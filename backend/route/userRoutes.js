import express from "express";
import userController from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/login").post(userController.authUser);

router
  .route("/profile")
  .get(protect, userController.getUserProfile)
  .put(protect, userController.updateUserProfile);

router.route("/").post(userController.addUser);

export default router;
