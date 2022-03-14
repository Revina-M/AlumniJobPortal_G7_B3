import React, { useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { Row, Col, Form, Tabs, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/actions/userActions";
import "./css/Profile.css";
const { TextArea } = Input;
const { TabPane } = Tabs;
function Profile() {
  const [personalInfo, setPersonalInfo] = useState({});
  const [activeTab, setActiveTab] = useState("1");
  const dispatch = useDispatch();
  function onPersonInfoSubmit(values) {
    setPersonalInfo(values);
    console.log(values);
    setActiveTab("2");
  }

  function onFinalFinish(values) {
    const finalObj = { ...personalInfo, ...values };
    console.log(finalObj);
    dispatch(updateUser(finalObj));
  }

  const user = JSON.parse(localStorage.getItem("userInfo"));
  return (
    <div>
      <DefaultLayout>
        <div className="outerprofile">
          <div className="prof">
            <Row>
              <Col span={3}>
                <div className="profL"></div>
              </Col>
              <Col span={21}>
                <div className="profR">
                  <Tabs defaultActiveKey="1" activeKey={activeTab}>
                    <TabPane tab="Personal Info" key="1">
                      <Form
                        layout="vertical"
                        onFinish={onPersonInfoSubmit}
                        initialValues={user}
                      >
                        <Row gutter={16}>
                          <Col lg={8} sm={24}>
                            <Form.Item
                              label="First name"
                              name="firstName"
                              required
                              rules={[{ required: true }]}
                            >
                              <Input />
                            </Form.Item>
                          </Col>
                          <Col lg={8} sm={24}>
                            <Form.Item
                              label="Last name"
                              name="lastName"
                              required
                              rules={[{ required: true }]}
                            >
                              <Input />
                            </Form.Item>
                          </Col>
                          <Col lg={8} sm={24}>
                            <Form.Item
                              label="Email"
                              name="email"
                              required
                              rules={[{ required: true }]}
                            >
                              <Input />
                            </Form.Item>
                          </Col>
                          <Col lg={8} sm={24}>
                            <Form.Item
                              label="Mobile Number"
                              name="mobileNumber"
                              required
                              rules={[{ required: true }]}
                            >
                              <Input />
                            </Form.Item>
                          </Col>
                          <Col lg={8} sm={24}>
                            <Form.Item
                              label="Portfolio"
                              name="portfolio"
                              required
                              rules={[{ required: true }]}
                            >
                              <Input />
                            </Form.Item>
                          </Col>
                          <Col lg={24} sm={24}>
                            <Form.Item
                              label="About"
                              name="about"
                              required
                              rules={[{ required: true }]}
                            >
                              <TextArea rows={4} />
                            </Form.Item>
                          </Col>
                          <Col lg={24} sm={24}>
                            <Form.Item
                              label="Address"
                              name="address"
                              required
                              rules={[{ required: true }]}
                            >
                              <TextArea rows={4} />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Button htmlType="submit">Next</Button>
                      </Form>
                    </TabPane>
                    <TabPane tab="Skills and Education" key="2">
                      <Form
                        initialValues={user}
                        layout="vertical"
                        onFinish={onFinalFinish}
                      >
                        <Row>
                          <Col lg={24} sm={24}>
                            <Form.List name="education">
                              {(education, { add, remove }) => (
                                <div>
                                  {education.map((field, index) => (
                                    <div className="flex">
                                      <Form.Item
                                        label="Education"
                                        required
                                        {...field}
                                        style={{ width: "80%" }}
                                        rules={[{ required: true }]}
                                      >
                                        <TextArea rows={4} />
                                      </Form.Item>
                                      <Button
                                        onClick={() => {
                                          add();
                                        }}
                                      >
                                        Add more
                                      </Button>
                                      {index !== 0 && (
                                        <Button
                                          onClick={() => {
                                            remove(index);
                                          }}
                                        >
                                          Delete
                                        </Button>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </Form.List>
                          </Col>

                          <Col lg={24} sm={24}>
                            <Form.List name="skills">
                              {(skills, { add, remove }) => (
                                <div>
                                  {skills.map((field, index) => (
                                    <div className="flex">
                                      <Form.Item
                                        label="Skill"
                                        required
                                        {...field}
                                        style={{ width: "80%" }}
                                        rules={[{ required: true }]}
                                      >
                                        <TextArea rows={4} />
                                      </Form.Item>
                                      <Button
                                        onClick={() => {
                                          add();
                                        }}
                                      >
                                        Add more
                                      </Button>
                                      {index !== 0 && (
                                        <Button
                                          onClick={() => {
                                            remove(index);
                                          }}
                                        >
                                          Delete
                                        </Button>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </Form.List>
                          </Col>

                          <Col lg={24} sm={24}>
                            <Form.List name="projects">
                              {(projects, { add, remove }) => (
                                <div>
                                  {projects.map((field, index) => (
                                    <div className="flex">
                                      <Form.Item
                                        label="Project"
                                        required
                                        {...field}
                                        style={{ width: "80%" }}
                                        rules={[{ required: true }]}
                                      >
                                        <TextArea rows={4} />
                                      </Form.Item>
                                      <Button
                                        onClick={() => {
                                          add();
                                        }}
                                      >
                                        Add more
                                      </Button>
                                      {index !== 0 && (
                                        <Button
                                          onClick={() => {
                                            remove(index);
                                          }}
                                        >
                                          Delete
                                        </Button>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </Form.List>
                          </Col>
                          <Col lg={24} sm={24}>
                            <Form.List name="experience">
                              {(experience, { add, remove }) => (
                                <div>
                                  {experience.map((field, index) => (
                                    <div className="flex">
                                      <Form.Item
                                        label="Experience"
                                        required
                                        {...field}
                                        style={{ width: "80%" }}
                                        rules={[{ required: true }]}
                                      >
                                        <TextArea rows={4} />
                                      </Form.Item>
                                      <Button
                                        onClick={() => {
                                          add();
                                        }}
                                      >
                                        Add more
                                      </Button>
                                      {index !== 0 && (
                                        <Button
                                          onClick={() => {
                                            remove(index);
                                          }}
                                        >
                                          Delete
                                        </Button>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </Form.List>
                          </Col>
                        </Row>
                        <Button
                          onClick={() => {
                            setActiveTab("1");
                          }}
                        >
                          Previous
                        </Button>
                        <Button htmlType="submit">Update</Button>
                      </Form>
                    </TabPane>
                  </Tabs>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </DefaultLayout>
    </div>
  );
}

export default Profile;
