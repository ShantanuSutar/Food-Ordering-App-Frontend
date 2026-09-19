import { api } from "../../components/config/api";
import { getApiErrorMessage, notifyError, notifyLoading, notifySuccess } from "../../components/util/toast";
import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_USERS_ORDERS_FAILURE, GET_USERS_ORDERS_REQUEST, GET_USERS_ORDERS_SUCCESS } from "./ActionTypes";
import { UPSERT_SAVED_ADDRESS } from "../Authentication/ActionTypes";
import { addressKey } from "../../components/util/address";
// import {
//     CREATE_ORDER_REQUEST, GET_USERS_NOTIFICATION_FAILURE, GET_USERS_NOTIFIC
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
            if (data.deliveryAddress) {
                dispatch({ type: UPSERT_SAVED_ADDRESS, payload: data.deliveryAddress });
            }
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
