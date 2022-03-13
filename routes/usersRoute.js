const express = require("express");
const {
  registerUser,
  authUser,
  updateUser,
  getAllUsers,
} = require("../controllers/userControllers");
const { protect } = require("../models/middlewares/authMiddleware");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(authUser);
router.route("/update").post(protect, updateUser);
router.route("/getallusers").get(protect, getAllUsers);

module.exports = router;
