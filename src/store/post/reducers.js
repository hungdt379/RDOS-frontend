import { combineReducers } from "redux";
import * as actionTypes from "./actionTypes";

const dataPostDetailReducer = {
  dataPostDetail: [],
};

const getPostDetail = (state = dataPostDetailReducer, action) => {
  switch (action.type) {
    case actionTypes.GET_POST_DETAIL_REQUEST:
      return { ...state };
    case actionTypes.GET_POST_DETAIL_SUCCESS:
      return { ...state, dataPostDetail: action.payload };
    case actionTypes.GET_POST_DETAIL_ERROR:
      return { ...state, error: action.payload };
    default:
      state = { ...state };
      break;
  }
  return state;
};

const dataPostThankReducer = {
  dataPostThank: [],
};

const postThank = (state = dataPostThankReducer, action) => {
  switch (action.type) {
    case actionTypes.POST_THANK_REQUEST:
      return { ...state };
    case actionTypes.POST_THANK_SUCCESS:
      return { ...state, dataPostThank: action.payload };
    case actionTypes.POST_THANK_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};


const dataPostNumberCustomerReducer = {
  dataPostNumberCustomer: [],
};


const postNumberCustomer= (state = dataPostThankReducer, action) => {
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

const dataAnnouncementReducer = {
  dataAnnouncement: [],
};
const getAnnouncement = (state = dataAnnouncementReducer, action) => {
  switch (action.type) {
    case actionTypes.GET_ANNOUNCEMENT:
      return { ...state };
    case actionTypes.GET_ANNOUNCEMENT_SUCCESS:
      return { ...state, dataAnnouncement: action.payload };
    case actionTypes.GET_ANNOUNCEMENT_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const dataNewsfeedReducer = {
  dataNewsfeed: [],
};
const Newsfeed = (state = dataNewsfeedReducer, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_NEWSFEED:
      state = { ...state };
      break;
    case actionTypes.GET_ALL_NEWSFEED_SUCCESS:
      state = { ...state, dataNewsfeed: action.payload };
      break;
      state = { ...state, error: action.payload };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

const dataDepartmentReducer = {
  dataDepartment: [],
};
const Department = (state = dataDepartmentReducer, action) => {
  switch (action.type) {
    case actionTypes.GET_DEPARTMENT_REQUEST:
      return { ...state };
    case actionTypes.GET_DEPARTMENT_SUCCESS: {
      return { ...state, dataDepartment: action.payload?.data };
    }
    case actionTypes.GET_DEPARTMENT_ERROR:
      return { ...state, error: action.payload };
    default:
      state = { ...state };
      break;
  }
  return state;
};

const reactionsPostThank = {
  dataReactionsPost: [],
};
const getReactionPost = (state = reactionsPostThank, action) => {
  switch (action.type) {
    case actionTypes.GET_REACTION_REQUEST:
      return { ...state };
    case actionTypes.GET_REACTION_SUCCESS: {
      return { ...state, dataReactionsPost: action.payload?.data };
    }
    case actionTypes.GET_REACTION_ERROR:
      return { ...state, error: action.payload };
    default:
      state = { ...state };
      break;
  }
  return state;
};

export const Posts = combineReducers({
  getPostDetail,
  postThank,
  getAnnouncement,
  Newsfeed,
  Department,
  getReactionPost,
  postNumberCustomer,
});
