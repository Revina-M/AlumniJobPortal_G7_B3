const express = require("express");
const {
  registerUser,
  authUser,
  updateUser,
  getAllUsers,
} = require("../controllers/userControllers");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(authUser);
router.route("/update").post(updateUser);
router.route("/getallusers").get(getAllUsers);

module.exports = router;
