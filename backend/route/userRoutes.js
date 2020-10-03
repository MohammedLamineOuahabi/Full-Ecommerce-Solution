import express from "express";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const router = express.Router();

// @desc Fetch all users
// @route /api/v1/users
// @access x
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
  })
);

// @desc Fetch a users
// @route /api/v1/users/:id
// @access x
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "user not found." });
    }
  })
);

export default router;
