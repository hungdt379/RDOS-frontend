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

//all table re
export const getAllTableReRequest = (payload) => ({
    type: actionTypes.GET_ALL_TABLE_RECEPTIONIST_REQUEST,
    payload: payload,
});
export const getAllTableReSuccess = (response) => {
    return {
        type: actionTypes.GET_ALL_TABLE_RECEPTIONIST_SUCCESS,
        payload: response,
    };
};
export const getAllTableReError = (error) => {
    return {
        type: actionTypes.GET_ALL_TABLE_RECEPTIONIST_ERROR,
        payload: error,
    };
};

//add table re
export const addTableReRequest = (payload) => ({
    type: actionTypes.ADD_TABLE_RECEPTIONIST_REQUEST,
    payload: payload,
});
export const addTableReSuccess = (response) => {
    return {
        type: actionTypes.ADD_TABLE_RECEPTIONIST_SUCCESS,
        payload: response,
    };
};
export const addTableReError = (error) => {
    return {
        type: actionTypes.ADD_TABLE_RECEPTIONIST_ERROR,
        payload: error,
    };
};

//delete table re
export const deleteTableReRequest = (payload) => ({
    type: actionTypes.DELETE_TABLE_RECEPTIONIST_REQUEST,
    payload: payload,
});
export const deleteTableReSuccess = (response) => {
    return {
        type: actionTypes.DELETE_TABLE_RECEPTIONIST_SUCCESS,
        payload: response,
    };
};
export const deleteTableReError = (error) => {
    return {
        type: actionTypes.DELETE_TABLE_RECEPTIONIST_ERROR,
        payload: error,
    };
};

//generate table re
export const generateTableReRequest = (payload) => ({
    type: actionTypes.GENERATE_TABLE_RECEPTIONIST_REQUEST,
    payload: payload,
});
export const generateTableReSuccess = (response) => {
    return {
        type: actionTypes.GENERATE_TABLE_RECEPTIONIST_SUCCESS,
        payload: response,
    };
};
export const generateTableReError = (error) => {
    return {
        type: actionTypes.GENERATE_TABLE_RECEPTIONIST_ERROR,
        payload: error,
    };
};

//edit table re
export const editTableReRequest = (payload) => ({
    type: actionTypes.EDIT_TABLE_RECEPTIONIST_REQUEST,
    payload: payload,
});
export const editTableReSuccess = (response) => {
    return {
        type: actionTypes.EDIT_TABLE_RECEPTIONIST_SUCCESS,
        payload: response,
    };
};
export const editTableReError = (error) => {
    return {
        type: actionTypes.EDIT_TABLE_RECEPTIONIST_ERROR,
        payload: error,
    };
};