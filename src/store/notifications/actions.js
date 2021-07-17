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


//Log out
export const getLogOutRequest = (payload) => ({
  type: actionTypes.GET_LOG_OUT_REQUEST,
  payload: payload,
});
export const getLogOutSuccess = (response) => {
  return {
    type: actionTypes.GET_LOG_OUT_SUCCESS,
    payload: response,
  };
};
export const getLogOutError = (error) => {
  return {
    type: actionTypes.GET_LOG_OUT_ERROR,
    payload: error,
  };
};


//all table
export const getAllTableRequest = (payload) => ({
  type: actionTypes.GET_ALL_TABLE_REQUEST,
  payload: payload,
});
export const getAllTableSuccess = (response) => {
  return {
    type: actionTypes.GET_ALL_TABLE_SUCCESS,
    payload: response,
  };
};
export const getAllTableError = (error) => {
  return {
    type: actionTypes.GET_ALL_TABLE_ERROR,
    payload: error,
  };
};


// get table by id
export const getTableRequest = (payload) => ({
  type: actionTypes.GET_TABLE_REQUEST,
  payload: payload,
});
export const getTableSuccess = (response) => {
  return {
    type: actionTypes.GET_TABLE_SUCCESS,
    payload: response,
  };
};
export const getTableError = (error) => {
  return {
    type: actionTypes.GET_TABLE_ERROR,
    payload: error,
  };
};

// post update table by id
export const postUpdateTableRequest = (payload) => ({
  type: actionTypes.POST_UPDATE_TABLE_REQUEST,
  payload: payload,
});
export const postUpdateTableSuccess = (response) => {
  return {
    type: actionTypes.POST_UPDATE_TABLE_SUCCESS,
    payload: response,
  };
};
export const postUpdateTableError = (error) => {
  return {
    type: actionTypes.POST_UPDATE_TABLE_ERROR,
    payload: error,
  };
};


// get check list
export const getCheckListRequest = (payload) => ({
  type: actionTypes.GET_CHECK_LIST_REQUEST,
  payload: payload,
});
export const getCheckListSuccess = (response) => {
  return {
    type: actionTypes.GET_CHECK_LIST_SUCCESS,
    payload: response,
  };
};
export const getCheckListError = (error) => {
  return {
    type: actionTypes.GET_CHECK_LIST_ERROR,
    payload: error,
  };
};

// post check list
export const postDeleteItemRequest = (payload) => ({
  type: actionTypes.POST_DELETE_ITEM_REQUEST,
  payload: payload,
});
export const postDeleteItemSuccess = (response) => {
  return {
    type: actionTypes.POST_DELETE_ITEM_SUCCESS,
    payload: response,
  };
};
export const postDeleteItemError = (error) => {
  return {
    type: actionTypes.POST_DELETE_ITEM_ERROR,
    payload: error,
  };
};
