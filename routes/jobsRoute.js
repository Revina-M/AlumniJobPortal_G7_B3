const express = require("express");
const {
  getJobs,
  postJobs,
  editJobs,
  applyJobs,
  deleteJobs,
} = require("../controllers/jobControllers");
const { protect } = require("../models/middlewares/authMiddleware");
const router = express.Router();

router.route("/getalljobs").get(getJobs);
router.route("/postjob").post(protect, postJobs);
router.route("/editjob").post(protect, editJobs);
router.route("/applyjob").post(applyJobs);
router.route("/deletejob").post(deleteJobs);

module.exports = router;
