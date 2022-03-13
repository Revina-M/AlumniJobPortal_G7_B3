import React, { useEffect } from "react";
import AlumniLayout from "../components/AlumniLayout";
import { useSelector, useDispatch } from "react-redux";
import { getAllJobs } from "../redux/actions/jobActions";
import { Row, Col, Button } from "antd";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/actions/userActions";
import "./css/Home.css";
import banr1 from "../assets/19873.jpg";
function Alumnidashboard() {
  const { jobs } = useSelector((state) => state.jobsReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllJobs());
  }, []);

  // const { userInfo } = useSelector((state) => state.userLogin);
  // const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // const logoutHandler = () => {
  //   dispatch(logout());
  // };
  // useEffect(() => {}, [userInfo]);

  return (
    <div>
      <AlumniLayout>
        {/* <button type="button" class="btn btn-info" onClick={logoutHandler}>
          LogOut
        </button> */}
        {/* <Button>LogOut</Button> */}
        <div className="bannerH">
          <img src={banr1} className="bannerHpic"></img>
        </div>

        <div className="homebg">
          <Row gutter={16}>
            {jobs.map((job) => {
              return (
                <Col lg={12} sm={24}>
                  <div className="job-div bs m-3 p-2">
                    <h4>{job.title}</h4>
                    <p>{job.company}</p>
                    <hr />
                    <p>{job.smallDescription}</p>

                    <p>
                      Salary :{" "}
                      <b>
                        {job.salaryFrom} - {job.salaryTo}
                      </b>
                    </p>
                    <p>
                      Experience : <b>{job.experience} Years</b>
                    </p>

                    <hr />
                    <div className="flex justify-content-between">
                      <Link to={`/jobs/${job._id}`}>
                        <Button>View</Button>
                      </Link>
                      <p>
                        Posted on :{" "}
                        {moment(job.createdAt).format("MMM DD yyyy")}
                      </p>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      </AlumniLayout>
    </div>
  );
}

export default Alumnidashboard;
