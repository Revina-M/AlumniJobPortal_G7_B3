import SignupLayout from "../components/SignupLayout";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/userActions";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import "./css/Login.css";
function Login({ navigate }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      if (userInfo.role === "Admin") {
        navigate("/admindashboard");
      } else if (userInfo.role === "JobSeeker") {
        navigate("/alumnidashboard");
      } else if (userInfo.role === "Employer") {
        navigate("/employerdashboard");
      } else if (userInfo.role === "Faculty") {
        navigate("/facultydashboard");
      }
    }
  }, [navigate, userInfo]);

  return (
    <div>
      <SignupLayout>
        <br></br>
        <div className="outerlog">
          <div className="log">
            <Row>
              <Col span={6} push={8}>
                <div className="logl">
                  <h2 id="welcome">Welcome</h2>
                  <h3></h3>
                </div>
              </Col>
              <Col span={6} pull={6}>
                <div className="logr">
                  <br></br>
                  <h2 id="logTitle">Login</h2>
                  <div className="loginContainer">
                    {error && (
                      <ErrorMessage variant="danger">{error}</ErrorMessage>
                    )}
                    {loading && <Loading />}
                    <Form onSubmit={submitHandler}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                        <Form.Check type="checkbox" label="Check me out" />
                      </Form.Group>
                      <Button variant="primary" type="submit">
                        Submit
                      </Button>
                    </Form>
                    <Row className="py-3">
                      <Col>
                        New Customer ? <Link to="/register">Register Here</Link>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </SignupLayout>
    </div>
  );
}

export default Login;
