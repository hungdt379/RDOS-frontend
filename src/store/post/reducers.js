import { combineReducers } from "redux";
import * as actionTypes from "./actionTypes";
import {POST_MARK_AS_READ_REQUEST} from "./actionTypes";

const dataPostNumberCustomerReducer = {
  dataPostNumberCustomer: [],
};


const postNumberCustomer= (state = dataPostNumberCustomerReducer, action) => {
  switch (action.type) {
    case actionTypes.POST_NUMBER_CUSTOMER:
      return { ...state };
    case actionTypes.POST_NUMBER_CUSTOMER_SUCCESS:
      return { ...state, dataPostNumberCustomer: action.payload };
    case actionTypes.POST_NUMBER_CUSTOMER_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const dataPostCloseTableReducer = {
  dataPostCloseTable: [],
};

const postCloseTable= (state = dataPostCloseTableReducer, action) => {
  switch (action.type) {
    case actionTypes.POST_CLOSE_TABLE_REQUEST:
      return { ...state };
    case actionTypes.POST_CLOSE_TABLE_SUCCESS:
      return { ...state, dataPostCloseTable: action.payload };
    case actionTypes.POST_CLOSE_TABLE_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};


const dataPostMarkAsReadReducer = {
  dataPostMarkAsRead: [],
};

const postMarkAsRead= (state = dataPostMarkAsReadReducer, action) => {
  switch (action.type) {
    case actionTypes.POST_MARK_AS_READ_REQUEST:
      return { ...state };
    case actionTypes.POST_MARK_AS_READ_SUCCESS:
      return { ...state, dataPostMarkAsRead: action.payload };
    case actionTypes.POST_MARK_AS_READ_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};


const dataGetQueueOrderReducer = {
  dataGetQueueOrder: [],
};

const getQueueOrder= (state = dataGetQueueOrderReducer, action) => {
  switch (action.type) {
    case actionTypes.GET_QUEUE_ORDER_REQUEST:
      return { ...state };
    case actionTypes.GET_QUEUE_ORDER_SUCCESS:
      return { ...state, dataGetQueueOrder: action.payload };
    case actionTypes.GET_QUEUE_ORDER_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};


const dataPostCancelQueueOrderReducer = {
  dataPostCancelQueueOrder: [],
};

const postCancelQueueOrder= (state = dataPostCancelQueueOrderReducer, action) => {
  switch (action.type) {
    case actionTypes.POST_CANCEL_QUEUE_ORDER_REQUEST:
      return { ...state };
    case actionTypes.POST_CANCEL_QUEUE_ORDER_SUCCESS:
      return { ...state, dataPostCancelQueueOrder: action.payload };
    case actionTypes.POST_CANCEL_QUEUE_ORDER_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const dataPostConfirmQueueOrderReducer = {
  dataPostConfirmQueueOrder: [],
};

const postConfirmQueueOrder= (state = dataPostConfirmQueueOrderReducer, action) => {
  switch (action.type) {
    case actionTypes.POST_CONFIRM_QUEUE_ORDER_REQUEST:
      return { ...state };
    case actionTypes.POST_CONFIRM_QUEUE_ORDER_SUCCESS:
      return { ...state, dataPostConfirmQueueOrder: action.payload };
    case actionTypes.POST_CONFIRM_QUEUE_ORDER_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const dataGetConfirmedOrderReducer = {
  dataGetConfirmedOrder: [],
};

const getConfirmedOrder= (state = dataGetConfirmedOrderReducer, action) => {
  switch (action.type) {
    case actionTypes.GET_CONFIRMED_ORDER_REQUEST:
      return { ...state };
    case actionTypes.GET_CONFIRMED_ORDER_SUCCESS:
      return { ...state, dataGetConfirmedOrder: action.payload };
    case actionTypes.GET_CONFIRMED_ORDER_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const dataPostDeleteItemReducer = {
  dataPostDeleteItem: [],
};

const postDeleteItem= (state = dataPostDeleteItemReducer, action) => {
  switch (action.type) {
    case actionTypes.POST_DELETE_ITEM_REQUEST:
      return { ...state };
    case actionTypes.POST_DELETE_ITEM_SUCCESS:
      return { ...state, dataPostDeleteItem: action.payload };
    case actionTypes.POST_DELETE_ITEM_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};


export const Posts = combineReducers({
  postNumberCustomer,
  postCloseTable,
  postMarkAsRead,
  getQueueOrder,
  postCancelQueueOrder,
  postConfirmQueueOrder,
  getConfirmedOrder,
  postDeleteItem,
});
