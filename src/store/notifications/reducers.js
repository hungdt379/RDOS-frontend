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

const allTableReducer = {
  allTables: [],
};

const getAllTable = (state = allTableReducer, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_TABLE_REQUEST:
      return { ...state };
    case actionTypes.GET_ALL_TABLE_SUCCESS:
      state =  { ...state, allTables: action.payload };
    case actionTypes.GET_ALL_TABLE_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const TableReducer = {
  TableByID: [],
};

const getTable = (state = TableReducer, action) => {
  switch (action.type) {
    case actionTypes.GET_TABLE_REQUEST:
      return { ...state };
    case actionTypes.GET_TABLE_SUCCESS:
      state =  { ...state, TableByID: action.payload };
    case actionTypes.GET_TABLE_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};


const TableUpdateReducer = {
  UpdateTableByID: [],
};

const postUpdateTable = (state = TableUpdateReducer, action) => {
  switch (action.type) {
    case actionTypes.POST_UPDATE_TABLE_REQUEST:
      return { ...state };
    case actionTypes.POST_UPDATE_TABLE_SUCCESS:
      state =  { ...state, UpdateTableByID: action.payload };
    case actionTypes.POST_UPDATE_TABLE_ERROR:
      return { ...state,UpdateTableByID: action.payload };
    default:
      return state;
  }
};



export const Notification = combineReducers({
  totalOfNotifications,
  getAllNotifications,
  getAllTable,
  getTable,
  postUpdateTable,
});
