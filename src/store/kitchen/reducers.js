import { combineReducers } from "redux";
import * as actionTypes from "./actionTypes";

//all notifications kitchen
const allNotificationsKitchenReducer = {
    allNotificationsKitchen: [],
};
const getAllNotificationsKitchen = (state = allNotificationsKitchenReducer, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_NOTIFICATION_KITCHEN:
            return { ...state };
        case actionTypes.GET_ALL_NOTIFICATION_SUCCESS_KITCHEN:
            return { ...state, allNotificationsKitchen: action.payload };
        case actionTypes.GET_ALL_NOTIFICATION_ERROR_KITCHEN:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

//maskAsReadRe
const maskAsReadKitReducer = {
    maskAsReadKit: [],
};
const maskAsReadKitchen = (state = maskAsReadKitReducer, action) => {
    switch (action.type) {
        case actionTypes.MASK_AS_READ_KITCHEN_REQUEST:
            return { ...state };
        case actionTypes.MASK_AS_READ_KITCHEN_SUCCESS:
            return { ...state, maskAsReadKit: action.payload };
        case actionTypes.MASK_AS_READ_KITCHEN_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

//maskAsReadRe
const allDishInConfirmReducer = {
    allDishInConfirm: [],
};
const allDishInConfirmKitchen = (state = allDishInConfirmReducer, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_DISH_IN_CONFIRM_REQUEST:
            return { ...state };
        case actionTypes.GET_ALL_DISH_IN_CONFIRM_SUCCESS:
            return { ...state, allDishInConfirm: action.payload };
        case actionTypes.GET_ALL_DISH_IN_CONFIRM_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

//update status of dish
const updateStatusOfDishReducer = {
    allUpdateStatusOfDish: [],
};
const updateStatusOfDishKitchen = (state = updateStatusOfDishReducer, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_STATUS_OF_DISH_REQUEST:
            return { ...state };
        case actionTypes.UPDATE_STATUS_OF_DISH_SUCCESS:
            return { ...state, allUpdateStatusOfDish: action.payload };
        case actionTypes.UPDATE_STATUS_OF_DISH_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export const Kitchen = combineReducers({
    getAllNotificationsKitchen,
    maskAsReadKitchen,
    allDishInConfirmKitchen,
    updateStatusOfDishKitchen,
});