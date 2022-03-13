import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { jobsReducer } from "./reducers/jobsReducer";
import { loaderReducer } from "./reducers/loaderReducer";
import {
  userLoginReducer,
  userRegisterReducer,
  userReducers,
} from "./reducers/userReducers";

const rootReducer = combineReducers({
  jobsReducer: jobsReducer,
  loaderReducer: loaderReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userReducers: userReducers,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
