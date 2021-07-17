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

//all table re
function* allTableReception({payload: p}) {
    try {
        const response = yield call(
            Request.getApi,
            apiUrls.getAllTablesReceptionist,
            {page: p, pageSize: 10}
        );
        yield put(actions.getAllTableReSuccess(response));
        console.log("get all table re : "+ response.data)
    } catch (error) {
        yield put(actions.getAllTableReError(error));
    }
}
export function* watchGetTableReception() {
    yield takeEvery(actionTypes.GET_ALL_TABLE_RECEPTIONIST_REQUEST, allTableReception);
}

//add table re
function* addTableReception({payload}) {
    try {
        const response = yield call(
            Request.postApi,
            apiUrls.postAddTableReceptionistApi,
            payload.data
        );
        yield put(actions.addTableReSuccess(response.data));
        console.log("add table re : "+ response.data)
    } catch (error) {
        yield put(actions.addTableReError(error));
    }
}
export function* watchAddTableReception() {
    yield takeEvery(actionTypes.ADD_TABLE_RECEPTIONIST_REQUEST, addTableReception);
}

//delete table re
function* deleteTableReception({payload: de}) {
    try {
        const response = yield call(
            Request.getApi,
            apiUrls.postDeleteTableReceptionistApi,
            {table_id: de}
        );
        yield put(actions.deleteTableReSuccess(response.data));
        console.log("delete table re : "+ response.data)
    } catch (error) {
        yield put(actions.deleteTableReError(error));
    }
}
export function* watchDeleteTableReception() {
    yield takeEvery(actionTypes.DELETE_TABLE_RECEPTIONIST_REQUEST, deleteTableReception);
}

//generate table re
function* generateTableReception({payload: ge}) {
    try {
        const response = yield call(
            Request.getApi,
            apiUrls.getGenerateQrTableReceptionistApi,
            {table_id: ge}
        );
        yield put(actions.generateTableReSuccess(response.data));
        console.log("generate table re : "+ response.data);
        window.open(response.data)
    } catch (error) {
        yield put(actions.generateTableReError(error));
    }
}
export function* watchGenerateTableReception() {
    yield takeEvery(actionTypes.GENERATE_TABLE_RECEPTIONIST_REQUEST, generateTableReception);
}

//edit table re
function* editTableReception({payload}) {
    try {
        const response = yield call(
            Request.postApi,
            apiUrls.postEditTableReceptionistApi,
            payload.data
        );
        yield put(actions.editTableReSuccess(response.data));
        console.log("edit table re : "+ response.data)
    } catch (error) {
        yield put(actions.editTableReError(error));
    }
}
export function* watchEditTableReception() {
    yield takeEvery(actionTypes.EDIT_TABLE_RECEPTIONIST_REQUEST, editTableReception);
}

//list conrfirm order re
function* listConfirmOrderReception({payload: p}) {
    try {
        const response = yield call(
            Request.getApi,
            apiUrls.viewListConfirmOrderReceptionistApi,
            {page: p, pageSize: 10}
        );
        yield put(actions.getListConfirmOrderReSuccess(response));
        console.log("list confirm order re : "+ response.data)
    } catch (error) {
        yield put(actions.getListConfirmOrderReError(error));
    }
}
export function* watchListConfirmOrderReception() {
    yield takeEvery(actionTypes.GET_LIST_CONFIRM_ORDER_RECEPTIONIST_REQUEST, listConfirmOrderReception);
}

//list detail order re
function* detailConfirmOrderReception({payload: tbi}) {
    try {
        const response = yield call(
            Request.getApi,
            apiUrls.viewDetailConfirmOrderReceptionistApi,
            {table_id: tbi}
        );
        yield put(actions.getDetailConfirmOrderReSuccess(response));
        console.log("detail confirm order re : "+ response.data)
    } catch (error) {
        yield put(actions.getDetailConfirmOrderReError(error));
    }
}
export function* watchDetailConfirmOrderReception() {
    yield takeEvery(actionTypes.GET_DETAIL_CONFIRM_ORDER_RECEPTIONIST_REQUEST, detailConfirmOrderReception);
}

//enter voucher
function* enterVoucherReception({payload}) {
    try {
        const response = yield call(
            Request.postApi,
            apiUrls.enterVoucherApi,
            payload.data
        );
        yield put(actions.postEnterVoucherReSuccess(response.data));
        console.log("enter voucher re : "+ response.data)
    } catch (error) {
        yield put(actions.postEnterVoucherReError(error));
    }
}
export function* watchEnterVoucherReception() {
    yield takeEvery(actionTypes.POST_ENTER_VOUCHER_RECEPTIONIST_REQUEST, enterVoucherReception);
}

//invoice completed order
function* invoiceCompletedReception({payload: tbi}) {
    try {
        const response = yield call(
            Request.getApi,
            apiUrls.invoiceCompletedOrderApi,
            {table_id: tbi}
        );
        yield put(actions.getInvoiceCompletedOrderReSuccess(response));
        console.log("invoice completed order : "+ response.data)
    } catch (error) {
        yield put(actions.getInvoiceCompletedOrderReError(error));
    }
}
export function* watchInvoiceCompletedReception() {
    yield takeEvery(actionTypes.GET_INVOICE_COMPLETED_RECEPTIONIST_REQUEST, invoiceCompletedReception);
}

const sagaReceptionist = [
    watchGetNotificationsReceptionist(),
    watchGetFeedback(),
    watchMaskAsReadRecep(),
    watchGetTableReception(),
    watchAddTableReception(),
    watchDeleteTableReception(),
    watchGenerateTableReception(),
    watchEditTableReception(),
    watchListConfirmOrderReception(),
    watchDetailConfirmOrderReception(),
    watchEnterVoucherReception(),
    watchInvoiceCompletedReception(),
];

export default sagaReceptionist;