import { put, call, takeEvery } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import { apiUrls } from "../../apis/api";
import Request from "../../apis/Request";

//all notifications receptionist
function* allNotificationKitchen({payload: p}) {
    try {
        const response = yield call(
            Request.getApi,
            apiUrls.getNotificationsKitchen,
            {page: p, pageSize: 10, receiver: 'kitchen manager'}
        );
        yield put(actions.getAllNotificationKitchenSuccess(response));
        console.log("noti Kitchen: "+ response.data)
    } catch (error) {
        yield put(actions.getAllNotificationKitchenError(error));
    }
}
export function* watchGetNotificationsKitchen() {
    yield takeEvery(actionTypes.GET_ALL_NOTIFICATION_KITCHEN, allNotificationKitchen);
}

//mask as read Kitchen
function* maskAsReadKit({payload}) {
    try {
        const response = yield call(
            Request.getApi,
            apiUrls.maskAsReadKitchenApi,
            {receiver: "kitchen manager"}
        );
        yield put(actions.maskAsReadKitchenSuccess(response.data));
        console.log("mask as read kitchen: "+ response.data)
    } catch (error) {
        yield put(actions.maskAsReadKitchenError(error));
    }
}
export function* watchMaskAsReadKit() {
    yield takeEvery(actionTypes.MASK_AS_READ_KITCHEN_REQUEST, maskAsReadKit);
}

//all dish in confirm
function* allDishInConfirmKit({payload: p}) {
    try {
        const response = yield call(
            Request.getApi,
            apiUrls.viewAllDishOfConfirmOrderApi,
            {page: p, pageSize: 10}
        );
        yield put(actions.getAllDishInConfirmSuccess(response));
        console.log("all dish in confirm: "+ response.data)
    } catch (error) {
        yield put(actions.getAllDishInConfirmError(error));
    }
}
export function* watchAllDishInConfirmKit() {
    yield takeEvery(actionTypes.GET_ALL_DISH_IN_CONFIRM_REQUEST, allDishInConfirmKit);
}

//update status of dish
function* updateStatusOfDishKit({payload: ge}) {
    try {
        const response = yield call(
            Request.postApi,
            apiUrls.updateStatusOfDishApi,
            {_id: ge}
        );
        yield put(actions.updateStatusOfDishSuccess(response.data));
        console.log("update status of dish : "+ response.data);
        window.open(response.data)
    } catch (error) {
        yield put(actions.updateStatusOfDishError(error));
    }
}
export function* watchUpdateStatusOfDishKit() {
    yield takeEvery(actionTypes.UPDATE_STATUS_OF_DISH_REQUEST, updateStatusOfDishKit);
}

const sagaKitchen = [
    watchGetNotificationsKitchen(),
    watchMaskAsReadKit(),
    watchAllDishInConfirmKit(),
    watchUpdateStatusOfDishKit(),
];

export default sagaKitchen;