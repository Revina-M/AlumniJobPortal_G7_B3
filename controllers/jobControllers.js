const Job = require("../models/jobModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const moment = require("moment");

//To get all jobs
const getJobs = asyncHandler(async (req, res) => {
  try {
    const jobs = await Job.find();
    res.send(jobs);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

//To post jobs
const postJobs = asyncHandler(async (req, res) => {
  try {
    const newjob = new Job(req.body);
    await newjob.save();
    res.send("Job posted successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

//To edit job details
const editJobs = asyncHandler(async (req, res) => {
  try {
    const updatedjob = await Job.findOneAndUpdate(
      { _id: req.body._id },
      req.body
    );
    res.send("Job Updated Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

//To apply for a job
const applyJobs = asyncHandler(async (req, res) => {
  console.log("Entered Handler");
  const { user, job } = req.body;
  console.log(user);
  console.log(job);

  try {
    const jobDetails = await Job.findOne({ _id: job._id });

    const appliedCandidate = {
      userid: user._id,
      appliedDate: moment().format("MMM DD yyyy"),
    };
    console.log("2");
    console.log(appliedCandidate);
    console.log(jobDetails.appliedCandidates.push(appliedCandidate));
    console.log("3");
    await jobDetails.save();

    const userDetails = await User.findOne({ _id: user._id });
    console.log("4");
    const appliedJob = {
      jobid: job._id,
      appliedDate: moment().format("MMM DD yyyy"),
    };
    userDetails.appliedJobs.push(appliedJob);
    console.log("5");
    await userDetails.save();

    res.send("Job applied Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

//To delete job postings
const deleteJobs = asyncHandler(async (req, res) => {
  console.log("Entered Router");
  try {
    console.log("Entered Router Try block");
    const job = await Job.findOne({ _id: req.body._id });

    console.log(job);
    await job.delete();
    res.send("Job deleted Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = { getJobs, postJobs, editJobs, applyJobs, deleteJobs };
