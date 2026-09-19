// Reducers.js
import * as actionTypes from "./ActionTypes";

const initialState = {
    menuItems: [],
    loading: false,
    error: null,
    search: [],
    searchQuery: "",
    searchLoading: false,
    searchError: null,
    hasSearched: false,
    topMeals: [],
    topMealsLoading: false,
    topMealsError: null,
    message: null,
};

const menuItemReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_MENU_ITEM_REQUEST:
        case actionTypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST:
        case actionTypes.DELETE_MENU_ITEM_REQUEST:
        case actionTypes.UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                message: null,
            };

        case actionTypes.SEARCH_MENU_ITEM_REQUEST:
            return {
                ...state,
                searchQuery: action.payload,
                searchLoading: true,
                searchError: null,
                hasSearched: true,
            };

        case actionTypes.GET_TOP_MEALS_REQUEST:
            return {
                ...state,
                topMealsLoading: true,
                topMealsError: null,
            };

        case actionTypes.CREATE_MENU_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                menuItems: [...state.menuItems, action.payload],
                message: "Food Created Successfully",
            };

        case actionTypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                menuItems: action.payload,
            };

        case actionTypes.DELETE_MENU_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                menuItems: state.menuItems.filter(
                    (menuItem) => menuItem.id !== action.payload
                ),
            };

        case actionTypes.UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS:
            console.log("updated item id ", action.payload.id);

            return {
                ...state,
                loading: false,
                menuItems: state.menuItems.map(
                    (menuItem) =>
                        menuItem.id === action.payload.id
                            ? action.payload
                            : menuItem
                ),
            };

        case actionTypes.SEARCH_MENU_ITEM_SUCCESS:
            if (action.payload.keyword !== state.searchQuery) return state;
            return {
                ...state,
                searchLoading: false,
                search: action.payload.items,
            };

        case actionTypes.SEARCH_MENU_ITEM_FAILURE:
            if (action.payload.keyword !== state.searchQuery) return state;
            return {
                ...state,
                searchLoading: false,
                searchError: action.payload.message,
                search: [],
            };

        case actionTypes.CLEAR_MENU_SEARCH:
            return {
                ...state,
                search: [],
                searchQuery: "",
                searchLoading: false,
                searchError: null,
                hasSearched: false,
            };

        case actionTypes.GET_TOP_MEALS_SUCCESS:
            return {
                ...state,
                topMealsLoading: false,
                topMeals: action.payload,
            };

        case actionTypes.GET_TOP_MEALS_FAILURE:
            return {
                ...state,
                topMealsLoading: false,
                topMealsError: action.payload,
            };

        case actionTypes.CREATE_MENU_ITEM_FAILURE:
        case actionTypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE:
        case actionTypes.DELETE_MENU_ITEM_FAILURE:
        case actionTypes.UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                message: null,
            };

        default:
            return state;
    }
};

export default menuItemReducer;
