import axios from "axios";
import { message } from "antd";
import { Navigate, useNavigate } from "react-router-dom";

//To get all jobs
export const getAllJobs = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.get("/api/jobs/getalljobs");
    dispatch({ type: "GET_ALL_JOBS", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

//To post jobs
export const postJob = (values) => async (dispatch, getState) => {
  try {
    values.postedBy = JSON.parse(localStorage.getItem("userInfo"))._id;
  } catch (error) {
    console.log("Not authorized");
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: "LOADING", payload: false });
  }

  dispatch({ type: "LOADING", payload: true });

  const {
    userLogin: { userInfo },
  } = getState();

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  try {
    const response = await axios.post("/api/jobs/postjob", values, config);
    dispatch({ type: "LOADING", payload: false });
    message.success("Job Posted Successfully");

    setTimeout(() => {
      window.location.href = "/posted";
    }, 1000);
  } catch (error) {
    console.log(error);
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: "LOADING", payload: false });
  }
};

//To edit job details
export const editJob = (values) => async (dispatch, getState) => {
  dispatch({ type: "LOADING", payload: true });
  const {
    userLogin: { userInfo },
  } = getState();

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  try {
    const response = await axios.post("/api/jobs/editjob", values, config);
    dispatch({ type: "LOADING", payload: false });
    message.success("Job Updated Successfully");

    setTimeout(() => {
      window.location.href = "/posted";
    }, 1000);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

//To apply for a job
export const applyJob = (job) => async (dispatch, getState) => {
  dispatch({ type: "LOADING", payload: true });
  const user = JSON.parse(localStorage.getItem("userInfo"));

  try {
    await axios.post("/api/jobs/applyjob", { job, user });
    dispatch({ type: "LOADING", payload: false });
    message.success("Job Applied Successfully");

    setTimeout(() => {
      window.location.href = "/alumnidashboard";
    }, 1000);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

//To delete a job
export const deleteJob = (job) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  console.log("Entered Job Actions");
  try {
    console.log("Entered Job Actions try block");
    await axios.post("/api/jobs/deletejob", job);
    dispatch({ type: "LOADING", payload: false });
    message.success("Job Deleted Successfully");
    setTimeout(() => {
      window.location.href = "/posted";
    }, 1000);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

//To search for jobs using filter
export const searchJobs = (searchKey) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.get("/api/jobs/getalljobs");
    const jobs = response.data;
    const filteredJobs = jobs.filter((job) =>
      job.title.toLowerCase().includes(searchKey.toLowerCase())
    );
    dispatch({ type: "GET_ALL_JOBS", payload: filteredJobs });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

//To sort jobs based on filter criteria
export const sortJobs = (values) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.get("/api/jobs/getalljobs");
    const jobs = response.data;

    var filteredJobs = jobs;
    if (values.experience !== undefined) {
      filteredJobs = jobs.filter((job) => job.experience <= values.experience);
    }
    if (values.salary !== undefined) {
      filteredJobs = jobs.filter((job) => job.salaryTo >= values.salary);
    }
    dispatch({ type: "GET_ALL_JOBS", payload: filteredJobs });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};
