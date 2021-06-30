import { combineReducers } from "redux";
import * as actionTypes from "./actionTypes";

//all Category
const allCategoryReducer = {
    allCategories: [],
};

const getAllCategory = (state = allCategoryReducer, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_CATEGORY_REQUEST:
            return { ...state };
        case actionTypes.GET_ALL_CATEGORY_SUCCESS:
            state =  { ...state, allCategories: action.payload };
        case actionTypes.GET_ALL_CATEGORY_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

//all Menu
const allMenuReducer = {
    allMenu: [],
};

const getAllMenu = (state = allMenuReducer, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_MENU_REQUEST:
            return { ...state };
        case actionTypes.GET_ALL_MENU_SUCCESS:
            state =  { ...state, allMenu: action.payload };
        case actionTypes.GET_ALL_MENU_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

//all Search
const allSearchReducer = {
    allSearch: [],
};

const getAllSearch = (state = allSearchReducer, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_SEARCH_REQUEST:
            return { ...state };
        case actionTypes.GET_ALL_SEARCH_SUCCESS:
            state =  { ...state, allSearch: action.payload };
        case actionTypes.GET_ALL_SEARCH_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

//call waiter
const dataPostCallWaiterReducer = {
    dataPostCallWaiter: [],
};

const postCallWaiter = (state = dataPostCallWaiterReducer, action) => {
    switch (action.type) {
        case actionTypes.POST_CALL_WAITER_REQUEST:
            return { ...state };
        case actionTypes.POST_CALL_WAITER_SUCCESS:
            return { ...state, dataPostCallWaiter: action.payload };
        case actionTypes.POST_CALL_WAITER_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

//call payment
const dataPostCallPaymentReducer = {
    dataPostCallPayment: [],
};

const postCallPayment = (state = dataPostCallPaymentReducer, action) => {
    switch (action.type) {
        case actionTypes.POST_CALL_PAYMENT_REQUEST:
            return { ...state };
        case actionTypes.POST_CALL_PAYMENT_SUCCESS:
            return { ...state, dataPostCallPayment: action.payload };
        case actionTypes.POST_CALL_PAYMENT_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

//send Feedback
const sendFeedbackReducer = {
    dataSendFeedback: [],
};

const sendFeedback = (state = sendFeedbackReducer, action) => {
    switch (action.type) {
        case actionTypes.SEND_FEEDBACK_REQUEST:
            return { ...state };
        case actionTypes.SEND_FEEDBACK_SUCCESS:
            return { ...state, dataSendFeedback: action.payload };
        case actionTypes.SEND_FEEDBACK_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export const Customer = combineReducers({
    getAllCategory,
    getAllMenu,
    getAllSearch,
    postCallWaiter,
    postCallPayment,
    sendFeedback,
});
