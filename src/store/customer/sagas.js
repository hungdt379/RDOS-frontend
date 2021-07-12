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

//send Feedback
function* postSendFeedback({ payload }) {
    try {
        const response = yield call(Request.postApiCus, apiUrls.sendFeedbackApi, payload);
        yield put(actions.sendFeedbackSuccess(response.data));
        console.log("send feedback: " + response.data)
        // return response;
    } catch (error) {
        yield put(actions.sendFeedbackError(error));
    }
}

export function* watchPostSendFeedback() {
    yield takeEvery(actionTypes.SEND_FEEDBACK_REQUEST, postSendFeedback);
}

//get food in combo
function* allFoodInCombo({payload}) {
    try {
        const response = yield call(Request.getApiCus, apiUrls.displayFoodInCombo, payload);
        if (response) {
            yield put(actions.getFoodInComboSuccess(response));
        }
        console.log("food in combo: " + response.data)
    } catch (error) {
        yield put(actions.getFoodInComboError(error));
    }
}

export function* watchGetFoodInCombo() {
    yield takeEvery(actionTypes.GET_FOOD_IN_COMBO_REQUEST, allFoodInCombo);
}

//add to cart
function* postAddToCart({ payload }) {
    try {
        const response = yield call(Request.postApiCus, apiUrls.addToCartApi, payload);
        yield put(actions.addToCartSuccess(response.data));
        console.log("add to cart: " + response.data)
        // return response;
    } catch (error) {
        yield put(actions.addToCartError(error));
    }
}

export function* watchPostAddToCart() {
    yield takeEvery(actionTypes.ADD_TO_CART_REQUEST, postAddToCart);
}

//get cart
function* allCart({payload}) {
    try {
        const response = yield call(Request.getApiCus, apiUrls.getCartApi, payload);
        if (response) {
            yield put(actions.getCartSuccess(response));
        }
        console.log("get cart: " + response.data)
    } catch (error) {
        yield put(actions.getCartError(error));
    }
}

export function* watchGetCart() {
    yield takeEvery(actionTypes.GET_CART_REQUEST, allCart);
}

//delete from cart
function* postDeleteFromCart({payload}) {
    try {
        const response = yield call(Request.postApiCus, apiUrls.deleteFromCartApi+'?item_id[]=', payload);
        yield put(actions.deleteFromCartSuccess(response.data));
        console.log("delete from cart: " + response)
        // return response;
    } catch (error) {
        yield put(actions.deleteFromCartError(error));
    }
}

export function* watchPostDeleteFromCart() {
    yield takeEvery(actionTypes.DELETE_FROM_CART_REQUEST, postDeleteFromCart);
}

//delete all from cart
function* postDeleteAllFromCart() {
    try {
        const response = yield call(Request.postApiCus, apiUrls.deleteFromCartApi, {});
        yield put(actions.deleteAllFromCartSuccess(response));
        console.log("delete all from cart: " + response)
        // return response;
    } catch (error) {
        yield put(actions.deleteAllFromCartError(error));
    }
}

export function* watchPostDeleteAllFromCart() {
    yield takeEvery(actionTypes.DELETE_ALL_FROM_CART_REQUEST, postDeleteAllFromCart);
}

//send order
function* postSendOrder() {
    try {
        const response = yield call(Request.postApiCus, apiUrls.sendOrderApi, {});
        yield put(actions.sendOrderSuccess(response.data));
        console.log("call payment: " + response.data)
        // return response;
    } catch (error) {
        yield put(actions.sendOrdertError(error));
    }
}

export function* watchPostSendOrder() {
    yield takeEvery(actionTypes.SEND_ORDER_REQUEST, postSendOrder);
}

//view Order
function* allViewOrder({payload: a}) {
    try {
        const response = yield call(Request.getApiCus, apiUrls.viewOrderApi, {table_id: a});
        if (response) {
            yield put(actions.getViewOrderSuccess(response));
        }
        console.log("view order: " + response.data)
    } catch (error) {
        yield put(actions.getViewOrderError(error));
    }
}

export function* watchGetAllViewOrder() {
    yield takeEvery(actionTypes.GET_VIEW_ORDER_REQUEST, allViewOrder);
}

const sagaCustomer = [
    watchGetAllCategory(),
    watchGetAllMenu(),
    watchGetAllSearch(),
    watchPostCallWaiter(),
    watchPostCallPayment(),
    watchPostSendFeedback(),
    watchGetFoodInCombo(),
    watchPostAddToCart(),
    watchGetCart(),
    watchPostDeleteFromCart(),
    watchPostDeleteAllFromCart(),
    watchPostSendOrder(),
    watchGetAllViewOrder(),
];

export default sagaCustomer;
