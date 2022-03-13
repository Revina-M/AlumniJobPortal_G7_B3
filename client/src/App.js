import logo from "./logo.svg";
import "./App.css";
import "antd/dist/antd.css";
import Home from "./pages/Home";
import { Button } from "antd";
import JobInfo from "./pages/JobInfo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppliedJobs from "./pages/AppliedJobs";
import PostJob from "./pages/PostJob";
import Profile from "./pages/Profile";
import { css } from "@emotion/react";
import FadeLoader from "react-spinners/FadeLoader";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobs } from "./redux/actions/jobActions";
import { useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostedJobs from "./pages/PostedJobs";
import EditJob from "./pages/EditJob";
import { getAllUsers } from "./redux/actions/userActions";
import { Navigate } from "react-router-dom";
import UserInfo from "./pages/UserInfo";
import Admindashboard from "./pages/Admindashboard";
import Alumnidashboard from "./pages/Alumnidashboard";
import Employerdashboard from "./pages/Employerdashboard";
import Facultydashboard from "./pages/Facultydashboard";

function App() {
  const { loader } = useSelector((state) => state.loaderReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllJobs());
    dispatch(getAllUsers());
  }, []);

  return (
    <Router>
      <div className="App">
        {loader && (
          <div className="sweet-loading text-center">
            <FadeLoader color={"#001529"} />
          </div>
        )}

        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route
            path="/appliedjobs"
            exact
            element={<ProtectedRoute element={<AppliedJobs />} />}
          />
          <Route
            path="/postjob"
            exact
            element={<ProtectedRoute element={<PostJob />} />}
          />
          <Route
            path="/profile"
            exact
            element={<ProtectedRoute element={<Profile />} />}
          />

          <Route
            path="/jobs/:id"
            exact
            element={<ProtectedRoute element={<JobInfo />} />}
          />
          <Route
            path="/posted"
            exact
            element={<ProtectedRoute element={<PostedJobs />} />}
          />
          <Route
            path="/editjob/:id"
            exact
            element={<ProtectedRoute element={<EditJob />} />}
          />
          <Route
            path="/users/:id"
            exact
            element={<ProtectedRoute element={<UserInfo />} />}
          />
          <Route
            path="/admindashboard"
            exact
            element={<ProtectedRoute element={<Admindashboard />} />}
          />
          <Route
            path="/alumnidashboard"
            exact
            element={<ProtectedRoute element={<Alumnidashboard />} />}
          />
          <Route
            path="/employerdashboard"
            exact
            element={<ProtectedRoute element={<Employerdashboard />} />}
          />
          <Route
            path="/facultydashboard"
            exact
            element={<ProtectedRoute element={<Facultydashboard />} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

export function ProtectedRoute({ element }) {
  //All the attributes inside <ProtectedRoute> tags such as 'path','exact','element'...
  const user = localStorage.getItem("user");
  if (!user) {
    return <Navigate to="/login" />;
  } else {
    return element;
  }
}
