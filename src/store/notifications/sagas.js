import { put, call, takeEvery } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import { apiUrls } from "../../apis/api";
import Request from "../../apis/Request";

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
      apiUrls.getNotificationOfUser,
      payload
    );
    yield put(actions.getAllNotificationSuccess(response));
  } catch (error) {
    yield put(actions.getAllNotificationError(error));
  }
}
export function* watchGetNotifications() {
  yield takeEvery(actionTypes.GET_ALL_NOTIFICATION, allNotification);
}

const sagaNotificatons = [watchTotalOfNotifications(), watchGetNotifications()];

export default sagaNotificatons;
