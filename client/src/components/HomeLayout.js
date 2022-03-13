import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  HomeOutlined,
  CheckSquareOutlined,
  PlusOutlined,
  CheckOutlined,
  LoginOutlined,
  CloudUploadOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Image } from "antd";
import Filter from "./Filter";

const { Header, Sider, Content } = Layout;

class DefaultLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  logout = ({ navigate }) => {
    localStorage.removeItem("userInfo");
    navigate = useNavigate();
    navigate("/");
  };
  render() {
    localStorage.removeItem("userInfo");
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          style={{ position: "sticky", overflow: "auto", top: 0 }}
        >
          <div className="logo">
            {this.state.collapsed ? (
              <Image
                width={50}
                src="https://ictkerala.org/wp-content/uploads/2019/01/cropped-ict-ico.png"
              />
            ) : (
              <h1>Alumni Job Portal</h1>
            )}
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[window.location.pathname]}
          >
            <Menu.Item key="/login" icon={<LoginOutlined />}>
              <Link to="/login">Log In</Link>
            </Menu.Item>
            <Menu.Item key="/register" icon={<CloudUploadOutlined />}>
              <Link to="/register">Sign Up</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
              position: "sticky",
              overflow: "auto",
              top: 0,
              zIndex: 9999,
            }}
          >
            {/*filter part design in header */}
            <div className="flex justify-content-between">
              <div>
                {React.createElement(
                  this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                  {
                    className: "trigger",
                    onClick: this.toggle,
                  }
                )}
              </div>
              <div>
                <Filter />
              </div>
              <div
                style={{ display: this.state.collapsed ? "name" : "inline" }}
              >
                <h3 className="mr-2">
                  <b></b>
                </h3>
              </div>
            </div>
            {/* .....*/}
          </Header>
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
        </Layout>
      </Layout>
    );
  }
}

export default DefaultLayout;
