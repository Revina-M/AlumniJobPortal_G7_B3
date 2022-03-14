import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Tag } from "antd";
import moment from "moment";
import { applyJob } from "../redux/actions/jobActions";

function JobInfo() {
  const { id } = useParams();
  const { jobs } = useSelector((state) => state.jobsReducer);
  const job = jobs.find((job) => job._id === id);

  const userid = JSON.parse(localStorage.getItem("userInfo"))._id;
  const dispatch = useDispatch();
  const appliedCandidates = job.appliedCandidates;
  const alreadyApplied = appliedCandidates.find(
    (candidate) => candidate.userid === userid
  );

  function applyNow() {
    dispatch(applyJob(job));
  }

  return (
    <div>
      <DefaultLayout>
        <div className="jobinfobg">
          <br></br>
          <div className="jobdetailsbg  p-2">
            {job && (
              <div>
                <p>
                  <b>Title</b> : {job.title}{" "}
                </p>
                <p>
                  <b>Company</b> : {job.company}
                </p>
                <p>
                  <b>Small Description</b> : {job.smallDescription}
                </p>
                <p>
                  <b>Full Description</b> : {job.fullDescription}
                </p>
                <p>
                  <b>Title</b> : {job.title}
                </p>
                <p>
                  <b>Skills Required</b> : {job.skillsRequired}
                </p>
                <p>
                  <b>Experience</b> : {job.experience}
                </p>
                <p>
                  <b>Minimum Qualification</b> : {job.minimumQualification}
                </p>

                <hr />

                <p>
                  <b>Salary Range</b> : {job.salaryFrom} - {job.salaryTo}
                </p>
                <p>
                  <b>Department</b> : {job.department}
                </p>
                <p>
                  <b>Company Profile</b> : {job.companyDescription}
                </p>
                <p>
                  <b>Company Website</b> :{" "}
                  <a href={job.companyUrl} target="_blank">
                    {job.companyUrl}
                  </a>
                </p>
                <p>
                  <b>Total Candidates applied</b> :{" "}
                  {job.appliedCandidates.length}
                </p>

                <hr />

                <div className="flex justify-content-between">
                  {job.postedBy === userid ? (
                    <Button>
                      <Link to={`/editjob/${job._id}`}>Edit Now</Link>
                    </Button>
                  ) : alreadyApplied ? (
                    <Tag color="green">Already Applied</Tag>
                  ) : (
                    <Button onClick={applyNow}>Apply Now</Button>
                  )}
                  <p>
                    <b>Posted on</b>:{" "}
                    {moment(job.createdAt).format("MMM DD yyyy")}
                  </p>
                </div>
              </div>
            )}
          </div>
          <br></br>
        </div>
      </DefaultLayout>
    </div>
  );
}

export default JobInfo;
