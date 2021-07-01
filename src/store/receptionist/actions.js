import * as actionTypes from "./actionTypes";

//all notifications receptionist
export const getAllNotificationReceptionist = (payload) => ({
    type: actionTypes.GET_ALL_NOTIFICATION_RECEPTIONIST,
    payload: payload,
});
export const getAllNotificationReceptionistSuccess = (response) => {
    return {
        type: actionTypes.GET_ALL_NOTIFICATION_SUCCESS_RECEPTIONIST,
        payload: response,
    };
};
export const getAllNotificationReceptionistError = (error) => {
    return {
        type: actionTypes.GET_ALL_NOTIFICATION_ERROR_RECEPTIONIST,
        payload: error,
    };
};

//all feedback
export const getAllFeedbackRequest = (payload) => ({
    type: actionTypes.GET_ALL_FEEDBACK_REQUEST,
    payload: payload,
});
export const getAllFeedbackSuccess = (response) => {
    return {
        type: actionTypes.GET_ALL_FEEDBACK_SUCCESS,
        payload: response,
    };
};
export const getAllFeedbackError = (error) => {
    return {
        type: actionTypes.GET_ALL_FEEDBACK_ERROR,
        payload: error,
    };
};

//mask as read
export const maskAsReadRequest = (payload) => ({
    type: actionTypes.MASK_AS_READ_REQUEST,
    payload: payload,
});
export const maskAsReadSuccess = (response) => {
    return {
        type: actionTypes.MASK_AS_READ_SUCCESS,
        payload: response,
    };
};
export const maskAsReadError = (error) => {
    return {
        type: actionTypes.MASK_AS_READ_ERROR,
        payload: error,
    };
};