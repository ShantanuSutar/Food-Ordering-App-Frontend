import axios from "axios"
import { ADD_TO_FAVOURITE_FAILURE, ADD_TO_FAVOURITE_REQUEST, ADD_TO_FAVOURITE_SUCCESS, ADDRESS_FAILURE, ADDRESS_REQUEST, ADDRESS_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionTypes"
import { api, API_URL } from "../../components/config/api";
import { getApiErrorMessage, notifyError, notifySuccess } from "../../components/util/toast";
import { safeAuthReturnPath } from "../../components/Auth/authNavigation";

export const registerUser = (reqData) => async(dispatch) => {
    dispatch({type : REGISTER_REQUEST})
    try {
        const {data} = await axios.post(`${API_URL}/auth/signup`, reqData.userData)
        if(data.jwt) localStorage.setItem("jwt", data.jwt);
        if(data.role === "ROLE_RESTAURANT_OWNER"){
            reqData.navigate("/admin/restaurant")
        }else{
            reqData.navigate(safeAuthReturnPath(reqData.returnTo))
        }
        dispatch({type: REGISTER_SUCCESS, payload: data.jwt})
        notifySuccess("Account created", "auth-register");

    } catch (error) {
        const message = getApiErrorMessage(error, "Could not create account");
        dispatch({type: REGISTER_FAILURE, payload: message})
        notifyError(error, "Could not create account", "auth-register");
    }
}


export const loginUser = (reqData) => async(dispatch) => {
    dispatch({type : LOGIN_REQUEST})
    try {
        const {data} = await axios.post(`${API_URL}/auth/signin`, reqData.userData)
        if(data.jwt) localStorage.setItem("jwt", data.jwt);
        if(data.role === "ROLE_RESTAURANT_OWNER"){
            reqData.navigate("/admin/restaurant")
        }else{
            reqData.navigate(safeAuthReturnPath(reqData.returnTo))
        }
        dispatch({type: LOGIN_SUCCESS, payload: data.jwt})
        notifySuccess("Welcome back", "auth-login");
    } catch (error) {
        const message = getApiErrorMessage(error, "Could not sign in");
        dispatch({type: LOGIN_FAILURE, payload: message})
        notifyError(error, "Could not sign in", "auth-login");
    }
}


export const getUser = (jwt) => async(dispatch) => {
    dispatch({type : GET_USER_REQUEST})
    try {
        const {data} = await api.get(`/api/users/profile`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        dispatch({type: GET_USER_SUCCESS, payload: data})
        return data
    } catch (error) {
        dispatch({type: GET_USER_FAILURE, payload: getApiErrorMessage(error, "Could not load profile")})
        notifyError(error, "Could not load profile", "profile-load");
        return null
    }
}

const addressHeaders = (jwt) => ({ Authorization: `Bearer ${jwt}` })

const refreshAddresses = async (dispatch, jwt) => {
    const { data } = await api.get('/api/users/addresses', { headers: addressHeaders(jwt) })
    dispatch({ type: ADDRESS_SUCCESS, payload: data })
    return data
}

export const getAddresses = (jwt) => async (dispatch) => {
    dispatch({ type: ADDRESS_REQUEST })
    try {
        return await refreshAddresses(dispatch, jwt)
    } catch (error) {
        const message = getApiErrorMessage(error, 'Could not load addresses')
        dispatch({ type: ADDRESS_FAILURE, payload: message })
        return null
    }
}

export const createAddress = ({ address, jwt }) => async (dispatch) => {
    dispatch({ type: ADDRESS_REQUEST })
    try {
        const { data } = await api.post('/api/users/addresses', address, { headers: addressHeaders(jwt) })
        await refreshAddresses(dispatch, jwt)
        notifySuccess('Address saved', 'address-save')
        return data
    } catch (error) {
        const message = getApiErrorMessage(error, 'Could not save address')
        dispatch({ type: ADDRESS_FAILURE, payload: message })
        notifyError(error, 'Could not save address', 'address-save')
        return null
    }
}

export const updateAddress = ({ addressId, address, jwt }) => async (dispatch) => {
    dispatch({ type: ADDRESS_REQUEST })
    try {
        const { data } = await api.put(`/api/users/addresses/${addressId}`, address, { headers: addressHeaders(jwt) })
        await refreshAddresses(dispatch, jwt)
        notifySuccess('Address updated', `address-update-${addressId}`)
        return data
    } catch (error) {
        const message = getApiErrorMessage(error, 'Could not update address')
        dispatch({ type: ADDRESS_FAILURE, payload: message })
        notifyError(error, 'Could not update address', `address-update-${addressId}`)
        return null
    }
}

export const deleteAddress = ({ addressId, jwt }) => async (dispatch) => {
    dispatch({ type: ADDRESS_REQUEST })
    try {
        await api.delete(`/api/users/addresses/${addressId}`, { headers: addressHeaders(jwt) })
        await refreshAddresses(dispatch, jwt)
        notifySuccess('Address deleted', `address-delete-${addressId}`)
        return true
    } catch (error) {
        const message = getApiErrorMessage(error, 'Could not delete address')
        dispatch({ type: ADDRESS_FAILURE, payload: message })
        notifyError(error, 'Could not delete address', `address-delete-${addressId}`)
        return false
    }
}



export const addToFavourites = ({restaurantId, jwt}) => async(dispatch, getState) => {
    dispatch({type : ADD_TO_FAVOURITE_REQUEST})
    const wasFavourite = getState().auth.favourites?.some((item) => item.id === restaurantId);
    try {
        const {data} = await api.put(`/api/restaurants/${restaurantId}/add-favourites`, {}, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        dispatch({type: ADD_TO_FAVOURITE_SUCCESS, payload: data})
        notifySuccess(wasFavourite ? "Removed from favourites" : "Added to favourites", `favourite-${restaurantId}`);
    } catch (error) {
        const message = getApiErrorMessage(error, "Could not update favourites");
        dispatch({type: ADD_TO_FAVOURITE_FAILURE, payload: message})
        notifyError(error, "Could not update favourites", `favourite-${restaurantId}`);
    }
}

export const logout = () => async(dispatch) => {
    try {
        localStorage.clear();
        dispatch({type: LOGOUT})
        notifySuccess("Logged out", "auth-logout");
    } catch (error) {
        notifyError(error, "Could not log out", "auth-logout");
    }
}


