import { ADD_TO_FAVOURITE_FAILURE, ADD_TO_FAVOURITE_REQUEST, ADD_TO_FAVOURITE_SUCCESS, ADDRESS_FAILURE, ADDRESS_REQUEST, ADDRESS_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionTypes";

const initialState = {
    user: null,
    isLoading: false,
    error: null,
    jwt: null,
    favourites: [],
    success: null,
    addressLoading: false,
    addressError: null,
};

export const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
        case ADD_TO_FAVOURITE_REQUEST:
            return { ...state, isLoading: true, error: null, success: null }

        case REGISTER_SUCCESS:
            return { ...state, isLoading: false, jwt: action.payload, success: "Account created" }
        case LOGIN_SUCCESS:
            return { ...state, isLoading: false, jwt: action.payload, success: "Welcome back" }
        case GET_USER_SUCCESS:
            return { ...state, isLoading: false, user: action.payload, favourites: action.payload.favourites }
        case ADD_TO_FAVOURITE_SUCCESS: {
            const restaurant = action.payload;

            const isAlreadyFavourite = state.favourites?.some(
                (item) => item.id === restaurant.id
            );

            return {
                ...state,
                isLoading: false,
                error: null,
                favourites: isAlreadyFavourite
                    ? state.favourites.filter(
                        (item) => item.id !== restaurant.id
                    )
                    : [restaurant, ...state.favourites]
            };
        }
        case ADDRESS_REQUEST:
            return { ...state, addressLoading: true, addressError: null };
        case ADDRESS_SUCCESS:
            return {
                ...state,
                addressLoading: false,
                addressError: null,
                user: state.user ? { ...state.user, addresses: action.payload } : state.user,
            };
        case ADDRESS_FAILURE:
            return { ...state, addressLoading: false, addressError: action.payload };
        case LOGOUT:
            return initialState;
        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
        case ADD_TO_FAVOURITE_FAILURE:
            return { ...state, isLoading: false, error: action.payload, success: null }

        default:
            return state;
    }
}
