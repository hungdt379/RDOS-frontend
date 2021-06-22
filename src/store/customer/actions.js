import * as actionTypes from "./actionTypes";

//all category
export const getAllCategoryRequest = (payload) => ({
    type: actionTypes.GET_ALL_CATEGORY_REQUEST,
    payload: payload,
});
export const getAllCategorySuccess = (response) => {
    return {
        type: actionTypes.GET_ALL_CATEGORY_SUCCESS,
        payload: response,
    };
};
export const getAllCategoryError = (error) => {
    return {
        type: actionTypes.GET_ALL_CATEGORY_ERROR,
        payload: error,
    };
};

//all menu
export const getAllMenuRequest = (payload) => ({
    type: actionTypes.GET_ALL_MENU_REQUEST,
    payload: payload,
});
export const getAllMenuSuccess = (response) => {
    return {
        type: actionTypes.GET_ALL_MENU_SUCCESS,
        payload: response,
    };
};
export const getAllMenuError = (error) => {
    return {
        type: actionTypes.GET_ALL_MENU_ERROR,
        payload: error,
    };
};
