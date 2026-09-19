import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_USERS_ORDERS_FAILURE, GET_USERS_ORDERS_REQUEST, GET_USERS_ORDERS_SUCCESS } from "./ActionTypes";


const initialState = {
    loading: false,
    orders: [],
    createdOrder: null,
    error: null,
};

export const orderReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_USERS_ORDERS_REQUEST:
        case CREATE_ORDER_REQUEST:
            return { ...state, error: null, loading: true };
        case CREATE_ORDER_SUCCESS:
            return { ...state, error: null, loading: false, createdOrder: payload };
        case GET_USERS_ORDERS_SUCCESS:
            return { ...state, error: null, loading: false, orders: payload };
        case GET_USERS_ORDERS_FAILURE:
        case CREATE_ORDER_FAILURE:
            return { ...state, error: payload, loading: false };
        default:
            return state;
    }
};
