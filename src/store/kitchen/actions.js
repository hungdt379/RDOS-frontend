import * as actionTypes from "./actionTypes";

//all notifications kitchen
export const getAllNotificationKitchen = (payload) => ({
    type: actionTypes.GET_ALL_NOTIFICATION_KITCHEN,
    payload: payload,
});
export const getAllNotificationKitchenSuccess = (response) => {
    return {
        type: actionTypes.GET_ALL_NOTIFICATION_SUCCESS_KITCHEN,
        payload: response,
    };
};
export const getAllNotificationKitchenError = (error) => {
    return {
        type: actionTypes.GET_ALL_NOTIFICATION_ERROR_KITCHEN,
        payload: error,
    };
};

//mask as read
export const maskAsReadKitchenRequest = (payload) => ({
    type: actionTypes.MASK_AS_READ_KITCHEN_REQUEST,
    payload: payload,
});
export const maskAsReadKitchenSuccess = (response) => {
    return {
        type: actionTypes.MASK_AS_READ_KITCHEN_SUCCESS,
        payload: response,
    };
};
export const maskAsReadKitchenError = (error) => {
    return {
        type: actionTypes.MASK_AS_READ_KITCHEN_ERROR,
        payload: error,
    };
};

//all dish in confirm order
export const getAllDishInConfirmRequest = (payload) => ({
    type: actionTypes.GET_ALL_DISH_IN_CONFIRM_REQUEST,
    payload: payload,
});
export const getAllDishInConfirmSuccess = (response) => {
    return {
        type: actionTypes.GET_ALL_DISH_IN_CONFIRM_SUCCESS,
        payload: response,
    };
};
export const getAllDishInConfirmError = (error) => {
    return {
        type: actionTypes.GET_ALL_DISH_IN_CONFIRM_ERROR,
        payload: error,
    };
};

//update status of dish
export const updateStatusOfDishRequest = (payload) => ({
    type: actionTypes.UPDATE_STATUS_OF_DISH_REQUEST,
    payload: payload,
});
export const updateStatusOfDishSuccess = (response) => {
    return {
        type: actionTypes.UPDATE_STATUS_OF_DISH_SUCCESS,
        payload: response,
    };
};
export const updateStatusOfDishError = (error) => {
    return {
        type: actionTypes.UPDATE_STATUS_OF_DISH_ERROR,
        payload: error,
    };
};