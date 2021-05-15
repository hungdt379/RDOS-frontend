import { combineReducers } from "redux";
import * as actionTypes from "./actionTypes";

const totalNotificationsReducer = {
  totalNotifications: [],
};
const totalOfNotifications = (state = totalNotificationsReducer, action) => {
  switch (action.type) {
    case actionTypes.TOTAL_OF_NOTIFICATIONS_REQUEST:
      return { ...state };
    case actionTypes.TOTAL_NOTIFICATIONS_SUCCESS:
      return { ...state, totalNotifications: action.payload };
    case actionTypes.TOTAL_NOTIFICATIONS_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

//all notifications
const allNotificationsReducer = {
  allNotifications: [],
};
const getAllNotifications = (state = allNotificationsReducer, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_NOTIFICATION:
      return { ...state };
    case actionTypes.GET_ALL_NOTIFICATION_SUCCESS:
      return { ...state, allNotifications: action.payload };
    case actionTypes.GET_ALL_NOTIFICATION_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const Notification = combineReducers({
  totalOfNotifications,
  getAllNotifications,
});
