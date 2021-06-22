import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";

// Authentication
import Login from "./auth/login/reducer";
import LoginCustomer from "./auth/logincustomer/reducer";
import Account from "./auth/register/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";
import Profile from "./auth/profile/reducer";
import { LOGOUT_USER } from "./auth/login/actionTypes";
import { Posts } from "./post/reducers";
import { User } from "./users/reducers";
import { Statistics } from "./statistics/reducers";
import { Notification } from "./notifications/reducers";
import { Customer } from "./customer/reducers";

const appReducer = combineReducers({
  Layout,
  Login,
  LoginCustomer,
  Account,
  Profile,
  ForgetPassword,

  Customer,

  Posts,

  Statistics,

  User,

  Notification,
});
const rootReducer = (state, action) => {
  if (action.type === LOGOUT_USER) {
    localStorage.removeItem("persist:root");
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};
export default rootReducer;
