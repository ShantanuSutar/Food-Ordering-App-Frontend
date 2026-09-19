import { api } from "../../components/config/api";
import { getApiErrorMessage, notifyError, notifySuccess } from "../../components/util/toast";
import { GET_RESTAURANTS_ORDER_FAILURE, GET_RESTAURANTS_ORDER_REQUEST, GET_RESTAURANTS_ORDER_SUCCESS, UPDATE_ORDER_STATUS_FAILURE, UPDATE_ORDER_STATUS_REQUEST, UPDATE_ORDER_STATUS_SUCCESS } from "./ActionTypes";

export const updateOrderStatus = ({ orderId, orderStatus, jwt }) => {
    return async (dispatch) => {
        try {
            dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });

            const response = await api.put(
                `/api/admin/order/${orderId}/${orderStatus}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );

            const updatedOrder = response.data;

            dispatch({
                type: UPDATE_ORDER_STATUS_SUCCESS,
                payload: updatedOrder,
            });
            notifySuccess("Order status updated", `order-status-${orderId}`);

        } catch (error) {
            const message = getApiErrorMessage(error, "Could not update order status");
            dispatch({
                type: UPDATE_ORDER_STATUS_FAILURE,
                payload: message,
            });
            notifyError(error, "Could not update order status", `order-status-${orderId}`);
        }
    };
}; 


export const fetchRestaurantsOrder = ({
    restaurantId,
    orderStatus,
    jwt
}) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: GET_RESTAURANTS_ORDER_REQUEST
            });

            const { data } = await api.get(
                `/api/admin/order/restaurant/${restaurantId}`,
                {
                    params: {
                        order_status: orderStatus
                    },
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );

            dispatch({
                type: GET_RESTAURANTS_ORDER_SUCCESS,
                payload: data,
            });

        } catch (error) {
            dispatch({
                type: GET_RESTAURANTS_ORDER_FAILURE,
                payload: getApiErrorMessage(error, "Could not load restaurant orders"),
            });
            notifyError(error, "Could not load restaurant orders", "restaurant-orders-load");
        }
    };
};
