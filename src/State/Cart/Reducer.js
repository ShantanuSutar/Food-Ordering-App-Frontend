// Reducers.js

import { LOGOUT } from "../Authentication/ActionTypes";
import * as actionTypes from "./ActionTypes";

const initialState = {
    cart: null,
    cartItems: [],
    loading: false,
    error: null,
};

const calculateItemsTotal = (items) => items.reduce((total, item) => {
    const lineTotal = item.totalPrice != null
        ? Number(item.totalPrice)
        : Number(item.food?.price || 0) * Number(item.quantity || 0);
    return total + (Number.isFinite(lineTotal) ? lineTotal : 0);
}, 0);

const synchronizedCart = (cart, items) => cart
    ? { ...cart, items, total: calculateItemsTotal(items) }
    : cart;

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
            {
                const items = action.payload.items || [];
            return {
                ...state,
                loading: false,
                cart: synchronizedCart(action.payload, items),
                cartItems: items,
            };
            }

        // GET ALL CART ITEMS
        case actionTypes.GET_ALL_CART_ITEMS_SUCCESS:
            {
                const items = action.payload;
            return {
                ...state,
                loading: false,
                cart: synchronizedCart(state.cart, items),
                cartItems: items,
            };
            }

        // ADD ITEM
        case actionTypes.ADD_ITEM_TO_CART_SUCCESS:
            {
                const existingItem = state.cartItems.some((item) => item.id === action.payload.id);
                const items = existingItem
                    ? state.cartItems.map((item) => item.id === action.payload.id ? action.payload : item)
                    : [action.payload, ...state.cartItems];
            return {
                ...state,
                loading: false,
                cart: synchronizedCart(state.cart, items),
                cartItems: items,
            };
            }

        // UPDATE ITEM
        case actionTypes.UPDATE_CARTITEM_SUCCESS:
            {
                const items = state.cartItems.map((item) =>
                    item.id === action.payload.id ? action.payload : item
                );
            return {
                ...state,
                loading: false,
                cart: synchronizedCart(state.cart, items),
                cartItems: items,
            };
            }

        // REMOVE ITEM
        case actionTypes.REMOVE_CARTITEM_SUCCESS:
            {
                const items = state.cartItems.filter((item) => item.id !== action.payload);
            return {
                ...state,
                loading: false,
                cart: synchronizedCart(state.cart, items),
                cartItems: items,
            };
            }

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
