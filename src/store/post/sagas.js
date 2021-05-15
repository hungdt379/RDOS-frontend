import {
  takeEvery,
  fork,
  put,
  all,
  call,
  takeLatest,
} from "redux-saga/effects";

import * as actionTypes from "./actionTypes";
import * as actions from "./actions";

import { getAllNewsfeed } from "./actions";
import { apiUrls } from "../../apis/api";
import Request from "../../apis/Request";
import { getAnnouncementRequest } from "./actions";

function* getPostDetail({ payload }) {
  try {
    const response = yield call(
      Request.getApi,
      apiUrls.getPostDetail(payload.id)
    );
    yield put(actions.getPostDetailSuccess(response));
  } catch (error) {
    yield put(actions.getPostDetailError(error));
  }
}
function* watchGetPostDetail() {
  yield takeEvery(actionTypes.GET_POST_DETAIL_REQUEST, getPostDetail);
}

function* postThanks({ payload }) {
  try {
    const response = yield call(
      Request.postApi,
      apiUrls.postThank,
      payload.data
    );
    if (response.status) {
      yield put(actions.postThankSuccess(response));
      if (payload.paramNewfeed) {
        yield put(getAllNewsfeed(payload.paramNewfeed));
      } else if (payload.paramAnnouncement) {
        yield put(getAnnouncementRequest(payload.paramAnnouncement));
      }
    }
    return response;
  } catch (error) {
    yield put(actions.postThankError(error));
  }
}
export function* watchPostThank() {
  yield takeLatest(actionTypes.POST_THANK_REQUEST, postThanks);
}

function* getAnnouncement({ payload }) {
  try {
    const response = yield call(
      Request.postApi,
      apiUrls.getAnnouncement,
      payload
    );
    yield put(actions.getAnnouncementSuccess(response));
  } catch (error) {
    yield put(actions.getAnnouncementError(error));
  }
}
function* watchGetAnnouncement() {
  yield takeLatest(actionTypes.GET_ANNOUNCEMENT, getAnnouncement);
}

function* getAllPostNewsfeed({ payload }) {
  try {
    const response = yield call(
      Request.getApi,
      apiUrls.getAllNewsfeed,
      payload
    );
    yield put(actions.getAllNewsfeedSuccess(response.data));
  } catch (error) {
    yield put(actions.getAllNewsfeedError(error));
  }
}
export function* watchGetAllNewsfeed() {
  yield takeEvery(actionTypes.GET_ALL_NEWSFEED, getAllPostNewsfeed);
}

function* getDepartment() {
  try {
    const response = yield call(Request.postApi, apiUrls.getDepartment, {});
    yield put(actions.getDepartmentSuccess(response));
  } catch (error) {
    yield put(actions.getDepartmentError(error));
  }
}
function* watchGetDepartmentData() {
  yield takeLatest(actionTypes.GET_DEPARTMENT_REQUEST, getDepartment);
}

function* postSeenUser({ payload }) {
  try {
    const response = yield call(
      Request.getApi,
      apiUrls.postSeenUser(payload.thank_id)
    );
    yield put(actions.postSeenSuccess(response));
  } catch (error) {
    yield put(actions.postSeenError(error));
  }
}
function* watchPostSeenUser() {
  yield takeLatest(actionTypes.POST_SEEN_REQUEST, postSeenUser);
}

function* getReactionUser({ payload }) {
  try {
    const response = yield call(Request.getApi, apiUrls.reactionUser, payload);
    yield put(actions.getReactionSuccess(response));
  } catch (error) {
    yield put(actions.getReactionError(error));
  }
}
function* watchGetReactionUser() {
  yield takeLatest(actionTypes.GET_REACTION_REQUEST, getReactionUser);
}

function* postReactionUser({ payload }) {
  try {
    const response = yield call(
      Request.postApi,
      apiUrls.reactionUser(payload.thank_id),
      {
        type: payload.type,
      }
    );
    yield put(actions.postReactionSuccess(response));
  } catch (error) {
    yield put(actions.postReactionError(error));
  }
}
function* watchPostReactionUser() {
  yield takeLatest(actionTypes.POST_REACTION_REQUEST, postReactionUser);
}

function* deleteReactionUser({ payload }) {
  try {
    const response = yield call(
      Request.deleteApi,
      apiUrls.reactionUser(payload.thank_id)
    );
    yield put(actions.deleteReactionSuccess(response));
  } catch (error) {
    yield put(actions.deleteReactionError(error));
  }
}
function* watchDeleteReactionUser() {
  yield takeLatest(actionTypes.DELETE_REACTION_REQUEST, deleteReactionUser);
}

const sagaPost = [
  watchGetPostDetail(),
  watchPostThank(),
  watchGetAnnouncement(),
  watchGetAllNewsfeed(),
  watchGetDepartmentData(),
  watchPostSeenUser(),
  watchGetReactionUser(),
  watchPostReactionUser(),
  watchDeleteReactionUser(),
];

export default sagaPost;
