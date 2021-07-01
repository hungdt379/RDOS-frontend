import { put, call, takeEvery } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import { apiUrls } from "../../apis/api";
import Request from "../../apis/Request";

//all notifications receptionist
function* allNotificationReceptionist({payload: p}) {
    try {
        const response = yield call(
            Request.getApi,
            apiUrls.getNotificationsReceptionist,
            {page: p, pageSize: 10, receiver: 'receptionist'}
        );
        yield put(actions.getAllNotificationReceptionistSuccess(response));
        console.log("noti Re: "+ response.data)
    } catch (error) {
        yield put(actions.getAllNotificationReceptionistError(error));
    }
}
export function* watchGetNotificationsReceptionist() {
    yield takeEvery(actionTypes.GET_ALL_NOTIFICATION_RECEPTIONIST, allNotificationReceptionist);
}

//all feedback
function* allFeedback({payload: p}) {
    try {
        const response = yield call(
            Request.getApi,
            apiUrls.viewFeedbackApi,
            {page: p, pageSize: 12}
        );
        yield put(actions.getAllFeedbackSuccess(response));
        console.log("view feedback : "+ response.data)
    } catch (error) {
        yield put(actions.getAllFeedbackError(error));
    }
}
export function* watchGetFeedback() {
    yield takeEvery(actionTypes.GET_ALL_FEEDBACK_REQUEST, allFeedback);
}

//mask as read Receptionist
function* maskAsReadRecep({payload}) {
    try {
        const response = yield call(
            Request.getApi,
            apiUrls.maskAsReadReceptionistApi,
            {receiver: "receptionist"}
        );
        yield put(actions.maskAsReadSuccess(response.data));
        console.log("mask as read : "+ response.data)
    } catch (error) {
        yield put(actions.maskAsReadError(error));
    }
}
export function* watchMaskAsReadRecep() {
    yield takeEvery(actionTypes.MASK_AS_READ_REQUEST, maskAsReadRecep);
}

const sagaReceptionist = [
    watchGetNotificationsReceptionist(),
    watchGetFeedback(),
    watchMaskAsReadRecep()
];

export default sagaReceptionist;