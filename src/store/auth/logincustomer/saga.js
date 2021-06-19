import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  AUTHORIZATION_USER,
  CUSTOMER_LOGIN_USER,
  CUSTOMER_LOGOUT_USER,
} from "./actionTypes";
import {apiError, apiErrorCus, customerLoginSuccess} from "./actions";
import {clearState, clearStateCustomer, saveState} from "../../localStorage";
import { apiUrls } from "../../../apis/api";
import Request from "../../../apis/Request";

function* customerLoginUser({ payload: { user, history } }) {
  try {
    const response = yield call(Request.postCus, apiUrls.loginCustomer, {username: user.username, password: user.password});
    if (response.status === false) {
      yield put(apiErrorCus(response));
    }
    if (response.data.token) {
      localStorage.setItem("authCustomer", JSON.stringify(response));
      yield put(customerLoginSuccess(response, false, true));
      console.log("authCustomer: "+response.data.user.role);
      history.push('/customer-home');
    }
    // yield saveState(user);
    // yield put(authorizationUser(user, history));
  } catch (error) {
    yield put(apiErrorCus(error));
  }
}

function* customerLogoutUser() {
  try {
    clearStateCustomer();
  } catch (error) {
    yield put(apiErrorCus(error));
  }
}

export function* watchCustomerLogin() {
  yield takeEvery(CUSTOMER_LOGIN_USER, customerLoginUser);
}

// export function* watchAuthorizationRedirect() {
//   yield takeEvery(AUTHORIZATION_USER, authorization);
// }

export function* watchCustomerLogout() {
  yield takeEvery(CUSTOMER_LOGOUT_USER, customerLogoutUser);
}

const sagaAuthCustomer = [
  watchCustomerLogin(),
  // watchAuthorizationRedirect(),
  watchCustomerLogout(),
];

export default sagaAuthCustomer;
