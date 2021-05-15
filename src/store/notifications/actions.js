import * as actionTypes from "./actionTypes";

//total new notifications
export const totalOfNotificationsRequest = (payload) => {
  return {
    type: actionTypes.TOTAL_OF_NOTIFICATIONS_REQUEST,
    payload: payload,
  };
};
export const totalOfNotificationsSuccess = (response) => {
  return {
    type: actionTypes.TOTAL_NOTIFICATIONS_SUCCESS,
    payload: response,
  };
};
export const totalOfNotificationsError = (error) => {
  return {
    type: actionTypes.TOTAL_NOTIFICATIONS_ERROR,
    payload: error,
  };
};

//all notifications
export const getAllNotification = (payload) => ({
  type: actionTypes.GET_ALL_NOTIFICATION,
  payload: payload,
});
export const getAllNotificationSuccess = (response) => {
  return {
    type: actionTypes.GET_ALL_NOTIFICATION_SUCCESS,
    payload: response,
  };
};
export const getAllNotificationError = (error) => {
  return {
    type: actionTypes.GET_ALL_NOTIFICATION_ERROR,
    payload: error,
  };
};
