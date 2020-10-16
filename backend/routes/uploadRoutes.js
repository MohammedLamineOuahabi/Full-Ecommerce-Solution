const express = require("express");
const multer = require("multer");
const path = require("path");
///import userController from "../controllers/userController.js";
//import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    //rename the file to prevent duplication file names
    const newFileName = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;

    cb(null, newFileName);
  }
});

//cb(error,val) is a callback function
const checkFileType = (file, cb) => {
  const fileTypes = /jpg|png|jpeg/;
  const extname = path.extname(file.originalname).toLowerCase();

  const test = fileTypes.test(extname);
  const mimeTypeTest = fileTypes.test(file.mimetype);
  if (test && mimeTypeTest) {
    return cb(null, true);
  } else {
    cb("Images Only!");
  }
};
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
});

router.route("/").post(upload.single("image"), (req, res) => {
  res.send(`${req.file.filename}`);
});

module.exports = router;
