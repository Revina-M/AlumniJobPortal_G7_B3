const express = require("express");
const {
  getJobs,
  postJobs,
  editJobs,
  applyJobs,
} = require("../controllers/jobControllers");
const { protect } = require("../models/middlewares/authMiddleware");
const router = express.Router();

router.route("/getalljobs").get(getJobs);
router.route("/postjob").post(protect, postJobs);
router.route("/editjob").post(protect, editJobs);
router.route("/applyjob").post(applyJobs);

module.exports = router;
