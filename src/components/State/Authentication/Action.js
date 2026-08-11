import axios from "axios"
import { LOGIN_REQUEST, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"
import { API_URL } from "../../config/api"

export const registerUser = (reqData) => async(dispatch) => {
    dispatch({type : REGISTER_REQUEST})
    try {
        const {data} = await axios.post(`${API_URL}/auth/signup`, reqData.userData)
        if(data.jwt) localStorage.setItem("jwt", data.jwt);
        if(data.role === "ROLE_CUSTOMER_OWNER"){
            reqData.navigate("/admin/restaurant")
        }else{
            reqData.navigate("/")
        }
        dispatch({type: REGISTER_SUCCESS, payload: data.jwt})

    } catch (error) {
        console.log("error", error)
    }
}


export const loginUser = (reqData) => async(dispatch) => {
    dispatch({type : LOGIN_REQUEST})
    try {
        const {data} = await axios.post(`${API_URL}/auth/signin`, reqData.userData)
        if(data.jwt) localStorage.setItem("jwt", data.jwt);
        if(data.role === "ROLE_CUSTOMER_OWNER"){
            reqData.navigate("/admin/restaurant")
        }else{
            reqData.navigate("/")
        }
        dispatch({type: LOGIN_REQUEST, payload: data.jwt})

    } catch (error) {
        console.log("error", error)
    }
}

