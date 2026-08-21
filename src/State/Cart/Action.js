import { api } from "../../components/config/api";

import {
    FIND_CART_REQUEST,
    FIND_CART_SUCCESS,
    FIND_CART_FAILURE,
    GET_ALL_CART_ITEMS_REQUEST,
    GET_ALL_CART_ITEMS_SUCCESS,
    GET_ALL_CART_ITEMS_FAILURE,
    ADD_ITEM_TO_CART_REQUEST,
    ADD_ITEM_TO_CART_SUCCESS,
    ADD_ITEM_TO_CART_FAILURE,
    UPDATE_CARTITEM_REQUEST,
    UPDATE_CARTITEM_SUCCESS,
    UPDATE_CARTITEM_FAILURE,
    REMOVE_CARTITEM_REQUEST,
    REMOVE_CARTITEM_SUCCESS,
    REMOVE_CARTITEM_FAILURE,
    CLEAR_CART_REQUEST,
    CLEAR_CART_SUCCESS,
    CLEAR_CART_FAILURE,
} from "./ActionTypes";


// Find Cart
export const findCart = (token) => {
    return async (dispatch) => {
        dispatch({ type: FIND_CART_REQUEST });

        try {
            const response = await api.get("/api/cart", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("my cart", response.data)
            dispatch({
                type: FIND_CART_SUCCESS,
                payload: response.data,
            });

        } catch (error) {
            console.log("find cart error ", error);

            dispatch({
                type: FIND_CART_FAILURE,
                payload: error.message,
            });
        }
    };
};


// Get All Cart Items
export const getAllCartItems = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: GET_ALL_CART_ITEMS_REQUEST });

        try {
            const { data } = await api.get(
                `/api/carts/${reqData.cartId}/items`,
                {
                    headers: {
                        Authorization: `Bearer ${reqData.token}`,
                    },
                }
            );

            dispatch({
                type: GET_ALL_CART_ITEMS_SUCCESS,
                payload: data,
            });
        } catch (error) {
            console.log("get all cart items error ", error);

            dispatch({
                type: GET_ALL_CART_ITEMS_FAILURE,
                payload: error.message,
            });
        }
    };
};


// Add Item To Cart
export const addItemToCart = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: ADD_ITEM_TO_CART_REQUEST });

        try {
            const { data } = await api.put(
                "/api/cart/add",
                reqData.cartItem,
                {
                    headers: {
                        Authorization: `Bearer ${reqData.token}`,
                    },
                }
            );

            console.log("add item to cart ", data);

            dispatch({
                type: ADD_ITEM_TO_CART_SUCCESS,
                payload: data,
            });
        } catch (error) {
            console.log("catch error ", error);

            dispatch({
                type: ADD_ITEM_TO_CART_FAILURE,
                payload: error.message,
            });
        }
    };
};


// Update Cart Item
export const updateCartItem = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_CARTITEM_REQUEST });

        try {
            const { data } = await api.put(
                "/api/cart-item/update",
                reqData.data,
                {
                    headers: {
                        Authorization: `Bearer ${reqData.jwt}`,
                    },
                }
            );

            console.log("update cartItem", data);

            dispatch({
                type: UPDATE_CARTITEM_SUCCESS,
                payload: data,
            });
        } catch (error) {
            console.log("catch error ", error);

            dispatch({
                type: UPDATE_CARTITEM_FAILURE,
                payload: error.message,
            });
        }
    };
};


// Remove Cart Item
export const removeCartItem = ({ cartItemId, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: REMOVE_CARTITEM_REQUEST });

        try {
            const { data } = await api.delete(
                `/api/cart-item/${cartItemId}/remove`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );

            console.log("remove cartItem", data);

            dispatch({
                type: REMOVE_CARTITEM_SUCCESS,
                payload: cartItemId,
            });
        } catch (error) {
            console.log("catch error ", error);

            dispatch({
                type: REMOVE_CARTITEM_FAILURE,
                payload: error.message,
            });
        }
    };
};


// Clear Cart
export const clearCartAction = () => {
    return async (dispatch) => {
        dispatch({
            type: CLEAR_CART_REQUEST,
        });

        try {
            const { data } = await api.put(
                "/api/cart/clear",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                    },
                }
            );

            console.log("clear cart ", data);

            dispatch({
                type: CLEAR_CART_SUCCESS,
                payload: data,
            });
        } catch (error) {
            console.log("catch error ", error);

            dispatch({
                type: CLEAR_CART_FAILURE,
                payload: error.message,
            });
        }
    };
};