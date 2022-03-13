import { Ictlogo } from "../assets";
import { Layout, Menu } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";
import "./DefaultLayout.css";
const { Header, Sider, Content } = Layout;

class SignupLayout extends React.Component {
  constructor(props) {
    super(props);
  }
  logout = () => {
    localStorage.removeItem("userInfo");
    window.location.reload();
  };

  render() {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    return (
      <Layout>
        <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
          <div className="flex2">
            <Ictlogo />
            <h2 className="hometitle">ALUMNI JOB PORTAL</h2>
          </div>

          <div className="flex1">
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={[window.location.pathname]}
            >
              <Menu.Item key="/" icon={<HomeOutlined />}>
                <Link to="/">Home</Link>
              </Menu.Item>
            </Menu>
          </div>
        </Header>
        <br></br>
        <br></br>

        <Layout className="site-layout">
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            {this.props.children}
          </Content>

          <div className="footer">
            <h5 id="footername">ictak.</h5>
          </div>
        </Layout>
      </Layout>
    );
  }
}

export default SignupLayout;
