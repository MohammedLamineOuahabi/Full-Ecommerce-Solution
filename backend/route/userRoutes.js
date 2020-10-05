import express from "express";
import userController from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", userController.authUser);
router.get("/profile", protect, userController.getUserProfile);
router.post("/", userController.addUser);
// // @desc Fetch all users
// // @route /api/v1/users
// // @access x
// router.get(
//   "/",
//   asyncHandler(async (req, res) => {
//     const users = await User.find({});
//     res.json(users);
//   })
// );

// // @desc Fetch a users
// // @route /api/v1/users/:id
// // @access x
// router.get(
//   "/:id",
//   asyncHandler(async (req, res) => {
//     const user = await User.findById(req.params.id);
//     if (user) {
//       res.status(200).json(user);
//     } else {
//       res.status(404).json({ message: "user not found." });
//     }
//   })
// );

export default router;
