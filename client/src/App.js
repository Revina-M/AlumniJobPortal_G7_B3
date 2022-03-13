import "./App.css";
import "antd/dist/antd.css";
import Home from "./pages/Home";
import JobInfo from "./pages/JobInfo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppliedJobs from "./pages/AppliedJobs";
import PostJob from "./pages/PostJob";
import Profile from "./pages/Profile";
import FadeLoader from "react-spinners/FadeLoader";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobs } from "./redux/actions/jobActions";
import { useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostedJobs from "./pages/PostedJobs";
import EditJob from "./pages/EditJob";
import { getAllUsers } from "./redux/actions/userActions";
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
          <Route path="/appliedjobs" exact element={<AppliedJobs />} />

          <Route path="/postjob" exact element={<PostJob />} />

          <Route path="/profile" exact element={<Profile />} />
          <Route path="/jobs/:id" exact element={<JobInfo />} />
          <Route path="/posted" exact element={<PostedJobs />} />
          <Route path="/editjob/:id" exact element={<EditJob />} />
          <Route path="/users/:id" exact element={<UserInfo />} />
          <Route path="/admindashboard" exact element={<Admindashboard />} />
          <Route path="/alumnidashboard" exact element={<Alumnidashboard />} />
          <Route
            path="/employerdashboard"
            exact
            element={<Employerdashboard />}
          />
          <Route
            path="/facultydashboard"
            exact
            element={<Facultydashboard />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
