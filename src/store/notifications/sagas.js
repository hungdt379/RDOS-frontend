import { put, call, takeEvery } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import { apiUrls } from "../../apis/api";
import Request from "../../apis/Request";
import {postUpdateTableSuccess} from "./actions";

function* totalOfNotification() {
  try {
    const response = yield call(
        Request.getApi,
        apiUrls.totalOfNotifications,
        {}
    );
    yield put(actions.totalOfNotificationsSuccess(response.data));
  } catch (error) {
    yield put(actions.totalOfNotificationsError(error));
  }
}
export function* watchTotalOfNotifications() {
  yield takeEvery(
      actionTypes.TOTAL_OF_NOTIFICATIONS_REQUEST,
      totalOfNotification
  );
}

//all notifications
function* allNotification({ payload }) {
  try {
    const response = yield call(
        Request.getApi,
        apiUrls.getAllNotifications,
        payload
    );
    if(response){
      yield put(actions.getAllNotificationSuccess(response));
      console.log(response)
    }
  } catch (error) {
    yield put(actions.getAllNotificationError(false));
  }
}
export function* watchGetNotifications() {
  yield takeEvery(actionTypes.GET_ALL_NOTIFICATION, allNotification);
}

//all table
function* allTable({ payload }) {
  try {
    const response = yield call(Request.getApi,apiUrls.getAllTables,payload);
    if(response){
      // localStorage.setItem("allTable", JSON.stringify(response));
      yield put(actions.getAllTableSuccess(response.data));
    }
  } catch (error) {
    yield put(actions.getAllTableError(error));
  }
}

export function* watchGetAllTable() {
  yield takeEvery(actionTypes.GET_ALL_TABLE_REQUEST, allTable);
}

//get table by id
function* TableByID({ payload }) {
  try {
    const response = yield call(Request.getApi,apiUrls.getTableByID,payload);
    if(response){
      yield put(actions.getTableSuccess(response.data));
    }
    return response;
  } catch (error) {
    yield put(actions.getTableError(error));
  }
}


export function* watchGetTableByID() {
  yield takeEvery(actionTypes.GET_TABLE_REQUEST, TableByID);
}


//get Log Out
function* LogOut({ payload }) {
  try {
    const response = yield call(Request.getApi,apiUrls.getLogOutApi,payload);
    if(response){
      yield put(actions.getLogOutSuccess(response.message));
      localStorage.removeItem('authUser')
      console.log(response.message);
    }
  } catch (error) {
    yield put(actions.getLogOutError(error));
  }
}


export function* watchGetLogOut() {
  yield takeEvery(actionTypes.GET_LOG_OUT_REQUEST, LogOut);
}

//update table by id
function* UpdateTableByID({ payload }) {
  try {
    const response = yield call(Request.postApi,apiUrls.postUpdateTableApi,payload);
    if(response){
      yield put(actions.postUpdateTableSuccess(response));
    }
  } catch (error) {
    yield put(actions.getTableError(error));
  }
}

export function* watchPostUpdateTableByID() {
  yield takeEvery(actionTypes.POST_UPDATE_TABLE_REQUEST, UpdateTableByID);
}


const sagaNotificatons = [
  watchTotalOfNotifications(),
  watchGetNotifications(),
  watchPostUpdateTableByID(),
  watchGetAllTable(),
  watchGetTableByID(),
  watchGetLogOut()
];

export default sagaNotificatons;
