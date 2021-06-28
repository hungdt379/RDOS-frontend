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