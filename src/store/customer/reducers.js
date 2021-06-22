import { combineReducers } from "redux";
import * as actionTypes from "./actionTypes";

//all Category
const allCategoryReducer = {
    allCategories: [],
};

const getAllCategory = (state = allCategoryReducer, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_CATEGORY_REQUEST:
            return { ...state };
        case actionTypes.GET_ALL_CATEGORY_SUCCESS:
            state =  { ...state, allCategories: action.payload };
        case actionTypes.GET_ALL_CATEGORY_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

//all Menu
const allMenuReducer = {
    allMenu: [],
};

const getAllMenu = (state = allMenuReducer, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_MENU_REQUEST:
            return { ...state };
        case actionTypes.GET_ALL_MENU_SUCCESS:
            state =  { ...state, allMenu: action.payload };
        case actionTypes.GET_ALL_MENU_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};


export const Customer = combineReducers({
    getAllCategory,
    getAllMenu,
});
