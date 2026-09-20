import { api } from "../../components/config/api";
import { getApiErrorMessage, notifyError, notifyLoading, notifySuccess } from "../../components/util/toast";
import {
    CREATE_ORDER_FAILURE,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CANCEL_ORDER_FAILURE,
    CANCEL_ORDER_REQUEST,
    CANCEL_ORDER_SUCCESS,
    GET_ORDER_DETAILS_FAILURE,
    GET_ORDER_DETAILS_REQUEST,
    GET_ORDER_DETAILS_SUCCESS,
    GET_PAYMENT_HISTORY_FAILURE,
    GET_PAYMENT_HISTORY_REQUEST,
    GET_PAYMENT_HISTORY_SUCCESS,
    GET_USERS_ORDERS_FAILURE,
    GET_USERS_ORDERS_REQUEST,
    GET_USERS_ORDERS_SUCCESS,
} from "./ActionTypes";
import { getAddresses } from "../Authentication/Action";
import { addressKey } from "../../components/util/address";

export const createOrder = (reqData) => {
    return async (dispatch, getState) => {
        dispatch({ type: CREATE_ORDER_REQUEST });
        notifyLoading("Creating order…", "order-create");
        const savedAddresses = getState().auth.user?.addresses || [];
        const addressWasAlreadySaved = savedAddresses.some(
            (address) => addressKey(address) === addressKey(reqData.order.deliveryAddress)
        );
        try {
            const { data } = await api.post('/api/order', reqData.order, {
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`,
                },
            });
            dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
            await dispatch(getAddresses(reqData.jwt));
            if (reqData.isNewAddress && !addressWasAlreadySaved) {
                notifySuccess("Address saved", "address-save");
            }
            if (reqData.isUpdatedAddress) {
                notifySuccess("Address updated", "address-update");
            }
            if (data.payment_url) {
                notifySuccess("Continue to payment", "order-create");
                window.location.href = data.payment_url;
            } else {
                notifyError(null, "Payment could not be started", "order-create");
            }
            return data;
        } catch (error) {
            const message = getApiErrorMessage(error, "Could not create order");
            dispatch({ type: CREATE_ORDER_FAILURE, payload: message });
            notifyError(error, "Could not create order", "order-create");
            return null;
        }
    }
}


export const getUsersOrders = (jwt) => {
    return async (dispatch) => {
        dispatch({ type: GET_USERS_ORDERS_REQUEST });
        try {
            const { data } = await api.get(`/api/order/user`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            dispatch({ type: GET_USERS_ORDERS_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: GET_USERS_ORDERS_FAILURE, payload: getApiErrorMessage(error, "Could not load orders") });
            notifyError(error, "Could not load orders", "orders-load");
        }
    };
}

export const getOrderDetails = ({ orderId, jwt }) => async (dispatch) => {
    dispatch({ type: GET_ORDER_DETAILS_REQUEST });
    try {
        const { data } = await api.get(`/api/order/${orderId}`, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: GET_ORDER_DETAILS_SUCCESS, payload: data });
        return data;
    } catch (error) {
        const message = getApiErrorMessage(error, "Could not load order details");
        dispatch({ type: GET_ORDER_DETAILS_FAILURE, payload: message });
        notifyError(error, "Could not load order details", `order-details-${orderId}`);
        return null;
    }
}

export const cancelOrder = ({ orderId, jwt }) => async (dispatch) => {
    dispatch({ type: CANCEL_ORDER_REQUEST });
    try {
        const { data } = await api.put(`/api/order/${orderId}/cancel`, {}, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: CANCEL_ORDER_SUCCESS, payload: data });
        notifySuccess("Order cancelled", `order-cancel-${orderId}`);
        return data;
    } catch (error) {
        const message = getApiErrorMessage(error, "Could not cancel order");
        dispatch({ type: CANCEL_ORDER_FAILURE, payload: message });
        notifyError(error, "Could not cancel order", `order-cancel-${orderId}`);
        return null;
    }
}

export const getPaymentHistory = (jwt) => {
    return async (dispatch) => {
        dispatch({ type: GET_PAYMENT_HISTORY_REQUEST });
        try {
            const { data } = await api.get('/api/users/payments', {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            dispatch({ type: GET_PAYMENT_HISTORY_SUCCESS, payload: data });
            return data;
        } catch (error) {
            const message = getApiErrorMessage(error, 'Could not load payment history');
            dispatch({ type: GET_PAYMENT_HISTORY_FAILURE, payload: message });
            return null;
        }
    };
}
