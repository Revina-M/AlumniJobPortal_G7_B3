import React, { useEffect } from "react";
import HomeLayout from "../components/HomeLayout";
import { useSelector, useDispatch } from "react-redux";
import { getAllJobs } from "../redux/actions/jobActions";
import { Row, Col, Button } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";
import "./css/Home.css";
import banr1 from "../assets/19873.jpg";
function Home() {
  const { jobs } = useSelector((state) => state.jobsReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllJobs());
  }, []);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <div>
      <HomeLayout>
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
                      <Link to="/login">
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
      </HomeLayout>
    </div>
  );
}

export default Home;
