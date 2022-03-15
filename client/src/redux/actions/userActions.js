import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/userConstants";
import axios from "axios";
import { message } from "antd";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const register =
  (username, email, password, role) => async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/users/register",
        { username, email, password, role },
        config
      );

      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};

export const updateUser = (values) => async (dispatch, getState) => {
  try {
    const userid = JSON.parse(localStorage.getItem("userInfo"))._id;
    values._id = userid;
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
    const user = await axios.post("/api/users/update", values, config);
    message.success("User updated successfully");
    localStorage.setItem("userInfo", JSON.stringify(user.data));
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    message.error("something went wrong , please try later");
    dispatch({ type: "LOADING", payload: false });
  }
};

export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.get("/api/users/getallusers");
    dispatch({ type: "GET_ALL_USERS", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    dispatch({ type: "LOADING", payload: false });
  }
};
