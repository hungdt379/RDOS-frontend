import {put, call, takeEvery, takeLatest} from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import {apiUrls} from "../../apis/api";
import Request from "../../apis/Request";

//all Category
function* allCategory({payload}) {
    try {
        const response = yield call(Request.getApiCus, apiUrls.getAllCategories, payload);
        if (response) {
            yield put(actions.getAllCategorySuccess(response.data));
        }
        console.log("category: " + response.data)
    } catch (error) {
        yield put(actions.getAllCategoryError(error));
    }
}

export function* watchGetAllCategory() {
    yield takeEvery(actionTypes.GET_ALL_CATEGORY_REQUEST, allCategory);
}

//all Menu
function* allMenu({payload}) {
    try {
        const response = yield call(Request.getApiCus, apiUrls.getAllMenus, payload);
        if (response) {
            yield put(actions.getAllMenuSuccess(response.data));
        }
        console.log("menu: " + response.data)
    } catch (error) {
        yield put(actions.getAllMenuError(error));
    }
}

export function* watchGetAllMenu() {
    yield takeEvery(actionTypes.GET_ALL_MENU_REQUEST, allMenu);
}

//all Search
function* allSearch({payload: a}) {
    try {
        const response = yield call(Request.getApiCus, apiUrls.getAllSearchs, {q: a});
        if (response) {
            yield put(actions.getAllSearchSuccess(response.data));
        }
        console.log("search: " + response.data)
    } catch (error) {
        yield put(actions.getAllSearchError(error));
    }
}

export function* watchGetAllSearch() {
    yield takeEvery(actionTypes.GET_ALL_SEARCH_REQUEST, allSearch);
}

//call waiter
function* postCallWaiter({payload}) {
    try {
        const response = yield call(Request.postApiCus, apiUrls.callWaiter, payload.data);
        yield put(actions.postCallWaiterSuccess(response.data));
        console.log("call waiter: " + response.data)
        // return response;
    } catch (error) {
        yield put(actions.postCallWaiterError(error));
    }
}

export function* watchPostCallWaiter() {
    yield takeEvery(actionTypes.POST_CALL_WAITER_REQUEST, postCallWaiter);
}

//call payment
function* postCallPayment() {
    try {
        const response = yield call(Request.postApiCus, apiUrls.callPayment, {});
        yield put(actions.postCallPaymentSuccess(response.data));
        console.log("call payment: " + response.data)
        // return response;
    } catch (error) {
        yield put(actions.postCallPaymentError(error));
    }
}

export function* watchPostCallPayment() {
    yield takeEvery(actionTypes.POST_CALL_PAYMENT_REQUEST, postCallPayment);
}

const sagaCustomer = [
    watchGetAllCategory(),
    watchGetAllMenu(),
    watchGetAllSearch(),
    watchPostCallWaiter(),
    watchPostCallPayment(),
];

export default sagaCustomer;
