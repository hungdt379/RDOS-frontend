import { combineReducers } from "redux";
import * as actionTypes from "./actionTypes";

//all notifications receptionist
const allNotificationsReceptionistReducer = {
    allNotificationsReceptionist: [],
};
const getAllNotificationsReceptionist = (state = allNotificationsReceptionistReducer, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_NOTIFICATION_RECEPTIONIST:
            return { ...state };
        case actionTypes.GET_ALL_NOTIFICATION_SUCCESS_RECEPTIONIST:
            return { ...state, allNotificationsReceptionist: action.payload };
        case actionTypes.GET_ALL_NOTIFICATION_ERROR_RECEPTIONIST:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export const Receptionist = combineReducers({
    getAllNotificationsReceptionist,
});
