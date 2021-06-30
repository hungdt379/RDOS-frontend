import * as actionTypes from "./actionTypes";

//all category
export const getAllCategoryRequest = (payload) => ({
    type: actionTypes.GET_ALL_CATEGORY_REQUEST,
    payload: payload,
});
export const getAllCategorySuccess = (response) => {
    return {
        type: actionTypes.GET_ALL_CATEGORY_SUCCESS,
        payload: response,
    };
};
export const getAllCategoryError = (error) => {
    return {
        type: actionTypes.GET_ALL_CATEGORY_ERROR,
        payload: error,
    };
};

//all menu
export const getAllMenuRequest = (payload) => ({
    type: actionTypes.GET_ALL_MENU_REQUEST,
    payload: payload,
});
export const getAllMenuSuccess = (response) => {
    return {
        type: actionTypes.GET_ALL_MENU_SUCCESS,
        payload: response,
    };
};
export const getAllMenuError = (error) => {
    return {
        type: actionTypes.GET_ALL_MENU_ERROR,
        payload: error,
    };
};

//all search
export const getAllSearchRequest = (payload) => ({
    type: actionTypes.GET_ALL_SEARCH_REQUEST,
    payload: payload,
});
export const getAllSearchSuccess = (response) => {
    return {
        type: actionTypes.GET_ALL_SEARCH_SUCCESS,
        payload: response,
    };
};
export const getAllSearchError = (error) => {
    return {
        type: actionTypes.GET_ALL_SEARCH_ERROR,
        payload: error,
    };
};

//call Waiter
export const postCallWaiterRequest = (payload) => {
    return {
        type: actionTypes.POST_CALL_WAITER_REQUEST,
        payload: payload,
    };
};
export const postCallWaiterSuccess = (response) => {
    return {
        type: actionTypes.POST_CALL_WAITER_SUCCESS,
        payload: response,
    };
};
export const postCallWaiterError = (error) => {
    return {
        type: actionTypes.POST_CALL_WAITER_ERROR,
        payload: error,
    };
};

//call Payment
export const postCallPaymentRequest = () => {
    return {
        type: actionTypes.POST_CALL_PAYMENT_REQUEST,
        // payload: payload,
    };
};
export const postCallPaymentSuccess = (response) => {
    return {
        type: actionTypes.POST_CALL_PAYMENT_SUCCESS,
        payload: response,
    };
};
export const postCallPaymentError = (error) => {
    return {
        type: actionTypes.POST_CALL_PAYMENT_ERROR,
        payload: error,
    };
};

//send Feedback
export const sendFeedbackRequest = (payload) => {
    return {
        type: actionTypes.SEND_FEEDBACK_REQUEST,
        payload: payload,
    };
};
export const sendFeedbackSuccess = (response) => {
    return {
        type: actionTypes.SEND_FEEDBACK_SUCCESS,
        payload: response,
    };
};
export const sendFeedbackError = (error) => {
    return {
        type: actionTypes.SEND_FEEDBACK_ERROR,
        payload: error,
    };
};