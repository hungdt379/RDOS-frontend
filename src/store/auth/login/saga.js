import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { AUTHORIZATION_USER, LOGIN_USER, LOGOUT_USER } from "./actionTypes";
import { apiError, authorizationUser, loginSuccess } from "./actions";
import { clearState, saveState } from "../../localStorage";
import { apiUrls } from "../../../apis/api";
import Request from "../../../apis/Request";

function* loginUser({ payload: { user } }) {
  try {
    if (user.accessToken) {
      yield saveState(user);
      yield put(authorizationUser(true));
    }
  } catch (error) {
    yield put(apiError(error));
  }
}

function* authorization() {
  try {
    const json = yield call(Request.get, apiUrls.loginWithGoogle, {});
    if (json.status === false) {
      yield put(apiError(json));
    }
    if (json.data.token) {
      yield put(loginSuccess(json.data, false, true));
      saveState(json.data);
    }
  } catch (e) {
    yield put(apiError(e));
  }
}

function* logoutUser() {
  try {
    clearState();
  } catch (error) {
    yield put(apiError(error));
  }
}

export function* watchUserLogin() {
  yield takeEvery(LOGIN_USER, loginUser);
}

export function* watchAuthorizationRedirect() {
  yield takeEvery(AUTHORIZATION_USER, authorization);
}

export function* watchUserLogout() {
  yield takeEvery(LOGOUT_USER, logoutUser);
}

const sagaAuth = [
  watchUserLogin(),
  watchAuthorizationRedirect(),
  watchUserLogout(),
];

export default sagaAuth;
