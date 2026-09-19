import { api } from "../../components/config/api";
import { getApiErrorMessage, notifyError, notifySuccess } from "../../components/util/toast";

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

            dispatch({
                type: FIND_CART_SUCCESS,
                payload: response.data,
            });

            return response.data;

        } catch (error) {
            const message = getApiErrorMessage(error, "Could not load cart");
            dispatch({
                type: FIND_CART_FAILURE,
                payload: message,
            });
            notifyError(error, "Could not load cart", "cart-load");
            return null;
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
            const message = getApiErrorMessage(error, "Could not load cart items");
            dispatch({
                type: GET_ALL_CART_ITEMS_FAILURE,
                payload: message,
            });
            notifyError(error, "Could not load cart items", "cart-items-load");
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

            dispatch({
                type: ADD_ITEM_TO_CART_SUCCESS,
                payload: data,
            });
            notifySuccess("Added to cart", `cart-add-${reqData.cartItem?.foodId || "item"}`);
        } catch (error) {
            const message = getApiErrorMessage(error, "Could not add to cart");
            dispatch({
                type: ADD_ITEM_TO_CART_FAILURE,
                payload: message,
            });
            notifyError(error, "Could not add to cart", `cart-add-${reqData.cartItem?.foodId || "item"}`);
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

            dispatch({
                type: UPDATE_CARTITEM_SUCCESS,
                payload: data,
            });
            notifySuccess("Quantity updated", `cart-update-${reqData.data?.cartItemId || data?.id || "item"}`);
        } catch (error) {
            const message = getApiErrorMessage(error, "Could not update quantity");
            dispatch({
                type: UPDATE_CARTITEM_FAILURE,
                payload: message,
            });
            notifyError(error, "Could not update quantity", `cart-update-${reqData.data?.cartItemId || "item"}`);
        }
    };
};


// Remove Cart Item
export const removeCartItem = ({ cartItemId, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: REMOVE_CARTITEM_REQUEST });

        try {
            await api.delete(
                `/api/cart-item/${cartItemId}/remove`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );

            dispatch({
                type: REMOVE_CARTITEM_SUCCESS,
                payload: cartItemId,
            });
            notifySuccess("Item removed", `cart-remove-${cartItemId}`);
        } catch (error) {
            const message = getApiErrorMessage(error, "Could not remove item");
            dispatch({
                type: REMOVE_CARTITEM_FAILURE,
                payload: message,
            });
            notifyError(error, "Could not remove item", `cart-remove-${cartItemId}`);
        }
    };
};


// Clear Cart
export const clearCartAction = ({ silentSuccess = false } = {}) => {
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

            dispatch({
                type: CLEAR_CART_SUCCESS,
                payload: data,
            });
            if (!silentSuccess) notifySuccess("Cart cleared", "cart-clear");
        } catch (error) {
            const message = getApiErrorMessage(error, "Could not clear cart");
            dispatch({
                type: CLEAR_CART_FAILURE,
                payload: message,
            });
            notifyError(error, "Could not clear cart", "cart-clear");
        }
    };
};
