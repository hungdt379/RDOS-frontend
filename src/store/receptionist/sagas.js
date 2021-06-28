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

const sagaReceptionist = [
    watchGetNotificationsReceptionist()
];

export default sagaReceptionist;