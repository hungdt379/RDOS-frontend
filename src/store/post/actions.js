import * as actionTypes from "./actionTypes";

export const getPostDetailRequest = (id) => {
  return {
    type: actionTypes.GET_POST_DETAIL_REQUEST,
    payload: id,
  };
};
export const getPostDetailSuccess = (response) => {
  return {
    type: actionTypes.GET_POST_DETAIL_SUCCESS,
    payload: response,
  };
};
export const getPostDetailError = (error) => {
  return {
    type: actionTypes.GET_POST_DETAIL_ERROR,
    payload: error,
  };
};

export const postThankRequest = (payload) => {
  return {
    type: actionTypes.POST_THANK_REQUEST,
    payload: payload,
  };
};
export const postThankSuccess = (response) => {
  return {
    type: actionTypes.POST_THANK_SUCCESS,
    payload: response,
  };
};
export const postThankError = (error) => {
  return {
    type: actionTypes.POST_THANK_ERROR,
    payload: error,
  };
};


export const postNumberCustomerRequest = (payload) => {
  return {
    type: actionTypes.POST_NUMBER_CUSTOMER,
    payload: payload,
  };
};
export const postNumberCustomerSuccess = (response) => {
  return {
    type: actionTypes.POST_NUMBER_CUSTOMER_SUCCESS,
    payload: response,
  };
};
export const postNumberCustomerError = (error) => {
  return {
    type: actionTypes.POST_NUMBER_CUSTOMER_ERROR,
    payload: error,
  };
};


export const postCloseTableRequest = (payload) => {
  return {
    type: actionTypes.POST_CLOSE_TABLE_REQUEST,
    payload: payload,
  };
};
export const postCloseTableSuccess = (response) => {
  return {
    type: actionTypes.POST_CLOSE_TABLE_SUCCESS,
    payload: response,
  };
};
export const postCloseTableError = (error) => {
  return {
    type: actionTypes.POST_CLOSE_TABLE_ERROR,
    payload: error,
  };
};


export const getAnnouncementRequest = (payload) => ({
  type: actionTypes.GET_ANNOUNCEMENT,
  payload: payload,
});
export const getAnnouncementSuccess = (response) => {
  return {
    type: actionTypes.GET_ANNOUNCEMENT_SUCCESS,
    payload: response,
  };
};
export const getAnnouncementError = (error) => {
  return {
    type: actionTypes.GET_ANNOUNCEMENT_ERROR,
    payload: error,
  };
};

export const getAllNewsfeed = (payload) => ({
  type: actionTypes.GET_ALL_NEWSFEED,
  payload: payload,
});
export const getAllNewsfeedSuccess = (response) => {
  return {
    type: actionTypes.GET_ALL_NEWSFEED_SUCCESS,
    payload: response,
  };
};
export const getAllNewsfeedError = (error) => {
  return {
    type: actionTypes.GET_ALL_NEWSFEED_ERROR,
    payload: error,
  };
};

export const getDepartment = () => {
  return {
    type: actionTypes.GET_DEPARTMENT_REQUEST,
  };
};
export const getDepartmentSuccess = (response) => {
  return {
    type: actionTypes.GET_DEPARTMENT_SUCCESS,
    payload: response,
  };
};
export const getDepartmentError = (error) => {
  return {
    type: actionTypes.GET_DEPARTMENT_ERROR,
    payload: error,
  };
};

export const postSeenRequest = (payload) => {
  return {
    type: actionTypes.POST_SEEN_REQUEST,
    payload: payload,
  };
};
export const postSeenSuccess = (response) => {
  return {
    type: actionTypes.POST_SEEN_SUCCESS,
    payload: response,
  };
};
export const postSeenError = (error) => {
  return {
    type: actionTypes.POST_SEEN_ERROR,
    payload: error,
  };
};

export const getReactionRequest = (payload) => {
  return {
    type: actionTypes.GET_REACTION_REQUEST,
    payload: payload,
  };
};
export const getReactionSuccess = (response) => {
  return {
    type: actionTypes.GET_REACTION_SUCCESS,
    payload: response,
  };
};
export const getReactionError = (error) => {
  return {
    type: actionTypes.GET_REACTION_ERROR,
    payload: error,
  };
};

export const postReactionRequest = (payload) => {
  return {
    type: actionTypes.POST_REACTION_REQUEST,
    payload: payload,
  };
};
export const postReactionSuccess = (response) => {
  return {
    type: actionTypes.POST_REACTION_SUCCESS,
    payload: response,
  };
};
export const postReactionError = (error) => {
  return {
    type: actionTypes.POST_REACTION_ERROR,
    payload: error,
  };
};

export const deleteReactionRequest = (payload) => {
  return {
    type: actionTypes.DELETE_REACTION_REQUEST,
    payload: payload,
  };
};
export const deleteReactionSuccess = (response) => {
  return {
    type: actionTypes.DELETE_REACTION_SUCCESS,
    payload: response,
  };
};
export const deleteReactionError = (error) => {
  return {
    type: actionTypes.DELETE_REACTION_ERROR,
    payload: error,
  };
};
