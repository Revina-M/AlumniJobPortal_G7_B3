import SignupLayout from "../components/SignupLayout";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { register } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import "./css/Register.css";
function Register({ navigate }) {
  const [email, setEmail] = useState("");
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");

  const [message, setMessage] = useState(null);
  const [successmessage, setSuccessmessage] = useState(null);

  const dispatch = useDispatch();
  navigate = useNavigate();

  const userRegister = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userRegister;

  const submitHandler = (e) => {
    e.preventDefault();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmpassword === ""
    ) {
      setMessage("Fields cannot be empty");
    } else if (!regex.test(email)) {
      setMessage("Email is invalid");
    } else if (password.length < 5) {
      setMessage("Password is too short");
    } else if (role === "") {
      setMessage("Select Role");
    } else if (password !== confirmpassword) {
      setMessage("Passwords do not match");
    } else {
      setMessage(null);
      setSuccessmessage("Registered successfully!");
      dispatch(register(username, email, password, role));

      setTimeout(() => {
        localStorage.removeItem("userInfo");
        window.location.href = "/login";
      }, 1000);
    }
  };

  const handleSelect = (e) => {
    console.log(e);
    setRole(e);
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/login");
    }
  }, [navigate, userInfo]);

  return (
    <div>
      <SignupLayout>
        <div className="outerreg">
          <div className="regbox">
            <Row>
              <Col span={8} push={8}>
                <div className="regl">
                  <div className="ad">
                    <h2 id="title1">Welcome</h2>
                    <br></br>
                    <h6 id="regsubt">Please register for </h6>
                    <h6 id="regsubt">better job opportunities.</h6>
                  </div>
                </div>
              </Col>
              <Col span={6} pull={6}>
                <br></br>
                <h3 id="regtitle">Register</h3>

                <div className="loginContainer">
                  {successmessage && (
                    <ErrorMessage variant="success">
                      {successmessage}
                    </ErrorMessage>
                  )}
                  {message && (
                    <ErrorMessage variant="danger">{message}</ErrorMessage>
                  )}

                  {loading && <Loading />}
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="name"
                        value={username}
                        rules={[{ required: true }]}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="confirmPassword">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={confirmpassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </Form.Group>
                    <br></br>
                    <DropdownButton
                      title="Select role"
                      value={role}
                      id="dropdown-menu-align-right"
                      onSelect={handleSelect}
                    >
                      <Dropdown.Item eventKey="JobSeeker">
                        JobSeeker
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Employer">
                        Employer
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Faculty">Faculty</Dropdown.Item>
                    </DropdownButton>
                    <Form.Group controlId="role">
                      <Form.Control type="name" value={role} />
                    </Form.Group>
                    <h5></h5>
                    <br></br>
                    <br></br>
                    <Button variant="primary" type="submit">
                      Register
                    </Button>
                  </Form>
                  <Row className="py-3">
                    <Col>
                      Have an Account ? <Link to="/login">Login</Link>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </SignupLayout>
    </div>
  );
}

export default Register;
