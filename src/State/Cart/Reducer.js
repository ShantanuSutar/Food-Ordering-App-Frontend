// Reducers.js

import { LOGOUT } from "../../Authentication/ActionType";
import * as actionTypes from "./ActionTypes";

const initialState = {
    cart: null,
    cartItems: [],
    loading: false,
    error: null,
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {

        // REQUEST
        case actionTypes.FIND_CART_REQUEST:
        case actionTypes.GET_ALL_CART_ITEMS_REQUEST:
        case actionTypes.ADD_ITEM_TO_CART_REQUEST:
        case actionTypes.UPDATE_CARTITEM_REQUEST:
        case actionTypes.REMOVE_CARTITEM_REQUEST:
        case actionTypes.CLEAR_CART_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        // FIND CART / CLEAR CART
        case actionTypes.FIND_CART_SUCCESS:
        case actionTypes.CLEAR_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                cart: action.payload,
                cartItems: action.payload.items || [],
            };

        // GET ALL CART ITEMS
        case actionTypes.GET_ALL_CART_ITEMS_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: action.payload,
            };

        // ADD ITEM
        case actionTypes.ADD_ITEM_TO_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: [
                    action.payload,
                    ...state.cartItems,
                ],
            };

        // UPDATE ITEM
        case actionTypes.UPDATE_CARTITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: state.cartItems.map((item) =>
                    item.id === action.payload.id
                        ? action.payload
                        : item
                ),
            };

        // REMOVE ITEM
        case actionTypes.REMOVE_CARTITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: state.cartItems.filter(
                    (item) => item.id !== action.payload
                ),
            };

        // FAILURES
        case actionTypes.FIND_CART_FAILURE:
        case actionTypes.GET_ALL_CART_ITEMS_FAILURE:
        case actionTypes.ADD_ITEM_TO_CART_FAILURE:
        case actionTypes.UPDATE_CARTITEM_FAILURE:
        case actionTypes.REMOVE_CARTITEM_FAILURE:
        case actionTypes.CLEAR_CART_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        // LOGOUT
        case LOGOUT:
            localStorage.removeItem("jwt");

            return {
                ...state,
                cartItems: [],
                cart: null,
                loading: false,
                error: null,
                success: "logout success"
            };

        default:
            return state;
    }
};

export default cartReducer;