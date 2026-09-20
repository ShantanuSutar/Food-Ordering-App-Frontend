import { api } from "../../components/config/api";
import { getApiErrorMessage, notifyError, notifySuccess } from "../../components/util/toast";

import { CREATE_CATEGORY_FAILURE, CREATE_CATEGORY_REQUEST, CREATE_CATEGORY_SUCCESS, CREATE_EVENTS_FAILURE, CREATE_EVENTS_REQUEST, CREATE_EVENTS_SUCCESS, CREATE_RESTAURANT_FAILURE, CREATE_RESTAURANT_REQUEST, CREATE_RESTAURANT_SUCCESS, DELETE_CATEGORY_FAILURE, DELETE_CATEGORY_REQUEST, DELETE_CATEGORY_SUCCESS, DELETE_EVENTS_FAILURE, DELETE_EVENTS_REQUEST, DELETE_EVENTS_SUCCESS, DELETE_RESTAURANT_FAILURE, DELETE_RESTAURANT_REQUEST, DELETE_RESTAURANT_SUCCESS, GET_ALL_EVENTS_FAILURE, GET_ALL_EVENTS_REQUEST, GET_ALL_EVENTS_SUCCESS, GET_ALL_RESTAURANTS_FAILURE, GET_ALL_RESTAURANTS_REQUEST, GET_ALL_RESTAURANTS_SUCCESS, GET_RESTAURANTS_EVENTS_FAILURE, GET_RESTAURANTS_EVENTS_REQUEST, GET_RESTAURANTS_EVENTS_SUCCESS, GET_RESTAURANT_BY_ID_FAILURE, GET_RESTAURANT_BY_ID_REQUEST, GET_RESTAURANT_BY_ID_SUCCESS, GET_RESTAURANT_BY_USER_ID_FAILURE, GET_RESTAURANT_BY_USER_ID_REQUEST, GET_RESTAURANT_BY_USER_ID_SUCCESS, GET_RESTAURANTS_CATEGORY_FAILURE, GET_RESTAURANTS_CATEGORY_REQUEST, GET_RESTAURANTS_CATEGORY_SUCCESS, UPDATE_CATEGORY_FAILURE, UPDATE_CATEGORY_REQUEST, UPDATE_CATEGORY_SUCCESS, UPDATE_RESTAURANT_FAILURE, UPDATE_RESTAURANT_REQUEST, UPDATE_RESTAURANT_STATUS_FAILURE, UPDATE_RESTAURANT_STATUS_REQUEST, UPDATE_RESTAURANT_STATUS_SUCCESS, UPDATE_RESTAURANT_SUCCESS } from "./ActionTypes";

export const getAllRestaurantsAction = (token) => {
    return async (dispatch) => {
        dispatch({ type: GET_ALL_RESTAURANTS_REQUEST });
        try {
            const config = token
                ? { headers: { Authorization: `Bearer ${token}` } }
                : {};
            const { data } = await api.get("/api/restaurants", config);
            dispatch({type: GET_ALL_RESTAURANTS_SUCCESS, payload: data});
        } catch (error) {
            const message = getApiErrorMessage(error, "Could not load restaurants");
            dispatch({type: GET_ALL_RESTAURANTS_FAILURE, payload: message})
            notifyError(error, "Could not load restaurants", "restaurants-load");
        };
    }
}

export const getRestaurantById = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: GET_RESTAURANT_BY_ID_REQUEST });
        try {
            const config = reqData.jwt
                ? { headers: { Authorization: `Bearer ${reqData.jwt}` } }
                : {};
            const { data } = await api.get(`/api/restaurants/${reqData.restaurantId}`, config);
            dispatch({type: GET_RESTAURANT_BY_ID_SUCCESS, payload: data});
        } catch (error) {
            const message = getApiErrorMessage(error, "Could not load restaurant");
            dispatch({type: GET_RESTAURANT_BY_ID_FAILURE, payload: message})
            notifyError(error, "Could not load restaurant", `restaurant-load-${reqData.restaurantId}`);
        };
    }
}


export const getRestaurantByUserId = (jwt) => {
    return async (dispatch) => {
        dispatch({ type: GET_RESTAURANT_BY_USER_ID_REQUEST });
        try {
            const { data } = await api.get(`/api/admin/restaurants/user`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            dispatch({type: GET_RESTAURANT_BY_USER_ID_SUCCESS, payload: data});
            return data;
        } catch (error) {
            const message = getApiErrorMessage(error, "Could not load your restaurant");
            const status = error?.response?.status;
            dispatch({type: GET_RESTAURANT_BY_USER_ID_FAILURE, payload: { message, status }})
            if (status !== 404) {
                notifyError(error, "Could not load your restaurant", "owner-restaurant-load");
            }
            return null;
        };
    }
}


export const createRestaurant = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_RESTAURANT_REQUEST });
        try {
            const { data } = await api.post(`/api/admin/restaurants`,reqData.data, {
                headers: {
                    Authorization: `Bearer ${reqData.token}`,
                },
            });
            dispatch({type: CREATE_RESTAURANT_SUCCESS, payload: data});
            notifySuccess("Restaurant created", "restaurant-create");
            return data;
        } catch (error) {
            const message = getApiErrorMessage(error, "Could not create restaurant");
            dispatch({type: CREATE_RESTAURANT_FAILURE, payload: message})
            notifyError(error, "Could not create restaurant", "restaurant-create");
            return null;
        };
    }
}



export const updateRestaurant = ({ restaurantId, restaurantData, jwt}) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_RESTAURANT_REQUEST });
        try {
            const { data } = await api.put(`/api/admin/restaurants/${restaurantId}`, restaurantData, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            dispatch({type: UPDATE_RESTAURANT_SUCCESS, payload: data});
            notifySuccess("Restaurant updated", `restaurant-update-${restaurantId}`);
            return data;
        } catch (error) {
            const message = getApiErrorMessage(error, "Could not update restaurant");
            dispatch({type: UPDATE_RESTAURANT_FAILURE, payload: message})
            notifyError(error, "Could not update restaurant", `restaurant-update-${restaurantId}`);
            return null;
        };
    }
}

export const deleteRestaurant = ({ restaurantId, jwt}) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_RESTAURANT_REQUEST });
        try {
            await api.delete(`/api/admin/restaurants/${restaurantId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            dispatch({type: DELETE_RESTAURANT_SUCCESS, payload: restaurantId});
            notifySuccess("Restaurant deleted", `restaurant-delete-${restaurantId}`);
        } catch (error) {
            const message = getApiErrorMessage(error, "Could not delete restaurant");
            dispatch({type: DELETE_RESTAURANT_FAILURE, payload: message})
            notifyError(error, "Could not delete restaurant", `restaurant-delete-${restaurantId}`);
        };
    }
}


export const updateRestaurantStatus = ({ restaurantId, jwt}) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST });
        try {
            const { data } = await api.put(`/api/admin/restaurants/${restaurantId}/status`, {}, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            dispatch({type: UPDATE_RESTAURANT_STATUS_SUCCESS, payload: data});
            notifySuccess(data?.open ? "Restaurant opened" : "Restaurant closed", `restaurant-status-${restaurantId}`);
        } catch (error) {
            const message = getApiErrorMessage(error, "Could not update restaurant status");
            dispatch({type: UPDATE_RESTAURANT_STATUS_FAILURE, payload: message})
            notifyError(error, "Could not update restaurant status", `restaurant-status-${restaurantId}`);
        };
    }
}


export const createEventAction = ({ reqData, jwt, restaurantId}) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_EVENTS_REQUEST });
        try {
            const { data } = await api.post(`/api/admin/events/restaurant/${restaurantId}`, reqData, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            dispatch({type: CREATE_EVENTS_SUCCESS, payload: data});
            notifySuccess("Event created", "event-create");
        } catch (error) {
            const message = getApiErrorMessage(error, "Could not create event");
            dispatch({type: CREATE_EVENTS_FAILURE, payload: message})
            notifyError(error, "Could not create event", "event-create");
        };
    }
}

export const getAllEvents = ({ jwt}) => {
    return async (dispatch) => {
        dispatch({ type: GET_ALL_EVENTS_REQUEST });
        try {
            const { data } = await api.get(`/api/events`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            dispatch({type: GET_ALL_EVENTS_SUCCESS, payload: data});
        } catch (error) {
            dispatch({type: GET_ALL_EVENTS_FAILURE, payload: getApiErrorMessage(error, "Could not load events")})
        };
    }
}


export const deleteEventAction = ({ eventId, jwt}) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_EVENTS_REQUEST });
        try {
            await api.delete(`/api/admin/events/${eventId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            dispatch({type: DELETE_EVENTS_SUCCESS, payload: eventId});
            notifySuccess("Event deleted", `event-delete-${eventId}`);
        } catch (error) {
            const message = getApiErrorMessage(error, "Could not delete event");
            dispatch({type: DELETE_EVENTS_FAILURE, payload: message})
            notifyError(error, "Could not delete event", `event-delete-${eventId}`);
        };
    }
}


export const getRestaurantsEvents = ({ restaurantId, jwt}) => {
    return async (dispatch) => {
        dispatch({ type: GET_RESTAURANTS_EVENTS_REQUEST });
        try {
            const { data } = await api.get(`/api/admin/events/restaurant/${restaurantId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            dispatch({type: GET_RESTAURANTS_EVENTS_SUCCESS, payload: data});
        } catch (error) {
            dispatch({type: GET_RESTAURANTS_EVENTS_FAILURE, payload: getApiErrorMessage(error, "Could not load events")})
        };
    }
}


export const createCategoryAction = ({ reqData, jwt}) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_CATEGORY_REQUEST });
        try {
            const { data } = await api.post(`/api/admin/category`, reqData, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            dispatch({type: CREATE_CATEGORY_SUCCESS, payload: data});
            notifySuccess("Category created", "category-create");
            return data;
        } catch (error) {
            const message = getApiErrorMessage(error, "Could not create category");
            dispatch({type: CREATE_CATEGORY_FAILURE, payload: message})
            notifyError(error, "Could not create category", "category-create");
            return null;
        };
    }
}

export const updateCategoryAction = ({ categoryId, name, jwt }) => async (dispatch) => {
    dispatch({ type: UPDATE_CATEGORY_REQUEST });
    try {
        const { data } = await api.put(`/api/admin/category/${categoryId}`, { name }, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: UPDATE_CATEGORY_SUCCESS, payload: data });
        notifySuccess("Category updated", `category-update-${categoryId}`);
        return data;
    } catch (error) {
        const message = getApiErrorMessage(error, "Could not update category");
        dispatch({ type: UPDATE_CATEGORY_FAILURE, payload: message });
        notifyError(error, "Could not update category", `category-update-${categoryId}`);
        return null;
    }
}

export const deleteCategoryAction = ({ categoryId, jwt }) => async (dispatch) => {
    dispatch({ type: DELETE_CATEGORY_REQUEST });
    try {
        await api.delete(`/api/admin/category/${categoryId}`, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: categoryId });
        notifySuccess("Category deleted", `category-delete-${categoryId}`);
        return true;
    } catch (error) {
        const message = getApiErrorMessage(error, "Could not delete category");
        dispatch({ type: DELETE_CATEGORY_FAILURE, payload: message });
        notifyError(error, "Could not delete category", `category-delete-${categoryId}`);
        return false;
    }
}


export const getRestaurantsCategory = ({ jwt, restaurantId}) => {
    return async (dispatch) => {
        dispatch({ type: GET_RESTAURANTS_CATEGORY_REQUEST });
        try {
            const config = jwt
                ? { headers: { Authorization: `Bearer ${jwt}` } }
                : {};
            const { data } = await api.get(`/api/category/restaurant/${restaurantId}`, config);
            dispatch({type: GET_RESTAURANTS_CATEGORY_SUCCESS, payload: data});
        } catch (error) {
            dispatch({type: GET_RESTAURANTS_CATEGORY_FAILURE, payload: getApiErrorMessage(error, "Could not load categories")})
            notifyError(error, "Could not load categories", `categories-load-${restaurantId}`);
        };
    }
}

