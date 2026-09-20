import * as actionTypes from "./ActionTypes";
const initialState = {
    restaurants: [],
    usersRestaurant: null,
    restaurant: null,
    loading: false,
    error: null,
    events: [],
    restaurantsEvents: [],
    categories: [],
    ownerRestaurantLoaded: false,
};


const restaurantReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_RESTAURANT_REQUEST:
        case actionTypes.GET_ALL_RESTAURANTS_REQUEST:
        case actionTypes.DELETE_RESTAURANT_REQUEST:
        case actionTypes.UPDATE_RESTAURANT_REQUEST:
        case actionTypes.GET_RESTAURANT_BY_ID_REQUEST:
        case actionTypes.GET_RESTAURANT_BY_USER_ID_REQUEST:
        case actionTypes.UPDATE_RESTAURANT_STATUS_REQUEST:
        case actionTypes.CREATE_CATEGORY_REQUEST:
        case actionTypes.UPDATE_CATEGORY_REQUEST:
        case actionTypes.DELETE_CATEGORY_REQUEST:
        case actionTypes.GET_RESTAURANTS_CATEGORY_REQUEST:
        case actionTypes.CREATE_EVENTS_REQUEST:
        case actionTypes.DELETE_EVENTS_REQUEST:
        case actionTypes.GET_ALL_EVENTS_REQUEST:
        case actionTypes.GET_RESTAURANTS_EVENTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                ...(action.type === actionTypes.GET_RESTAURANT_BY_USER_ID_REQUEST && {
                    ownerRestaurantLoaded: false,
                }),
            };
        case actionTypes.CREATE_RESTAURANT_SUCCESS:
            return {
                ...state,
                loading: false,
                usersRestaurant: action.payload,
                ownerRestaurantLoaded: true,
            };
        case actionTypes.GET_ALL_RESTAURANTS_SUCCESS:
            return {
                ...state,
                loading: false,
                restaurants: action.payload,
            };
        case actionTypes.GET_RESTAURANT_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                restaurant: action.payload,
            };
        case actionTypes.GET_RESTAURANT_BY_USER_ID_SUCCESS:
        case actionTypes.UPDATE_RESTAURANT_STATUS_SUCCESS:
        case actionTypes.UPDATE_RESTAURANT_SUCCESS:
            return {
                ...state,
                loading: false,
                usersRestaurant: action.payload,
                ...(action.type === actionTypes.GET_RESTAURANT_BY_USER_ID_SUCCESS && {
                    ownerRestaurantLoaded: true,
                }),
            };
        case actionTypes.DELETE_RESTAURANT_SUCCESS:
            return {
                ...state,
                error: null,
                loading: false,
                restaurants: state.restaurants.filter(
                    (item) => item.id !== action.payload
                ),
                usersRestaurant: state.usersRestaurant?.id === action.payload
                    ? null
                    : state.usersRestaurant,
            };

        case actionTypes.CREATE_EVENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                events: [...state.events, action.payload],
                restaurantsEvents: [...state.restaurantsEvents, action.payload],
            };
        case actionTypes.GET_ALL_EVENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                events: action.payload,
            };
        case actionTypes.GET_RESTAURANTS_EVENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                restaurantsEvents: action.payload,
            };
        case actionTypes.DELETE_EVENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                events: state.events.filter((item) => item.id !== action.payload),
                restaurantsEvents: state.restaurantsEvents.filter(
                    (item) => item.id !== action.payload
                ),
            };
        case actionTypes.CREATE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: [...state.categories, action.payload],
            };
        case actionTypes.UPDATE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: state.categories.map((category) =>
                    category.id === action.payload.id ? action.payload : category
                ),
            };
        case actionTypes.DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: state.categories.filter((category) => category.id !== action.payload),
            };
        case actionTypes.GET_RESTAURANTS_CATEGORY_SUCCESS:
            
            return {
                ...state,
                loading: false,
                categories: action.payload,
            };
        case actionTypes.CREATE_RESTAURANT_FAILURE:
        case actionTypes.GET_ALL_RESTAURANTS_FAILURE:
        case actionTypes.DELETE_RESTAURANT_FAILURE:
        case actionTypes.UPDATE_RESTAURANT_FAILURE:
        case actionTypes.GET_RESTAURANT_BY_ID_FAILURE:
        case actionTypes.GET_RESTAURANT_BY_USER_ID_FAILURE:
        case actionTypes.UPDATE_RESTAURANT_STATUS_FAILURE:
        case actionTypes.CREATE_EVENTS_FAILURE:
        case actionTypes.DELETE_EVENTS_FAILURE:
        case actionTypes.GET_ALL_EVENTS_FAILURE:
        case actionTypes.GET_RESTAURANTS_EVENTS_FAILURE:
        case actionTypes.CREATE_CATEGORY_FAILURE:
        case actionTypes.UPDATE_CATEGORY_FAILURE:
        case actionTypes.DELETE_CATEGORY_FAILURE:
        case actionTypes.GET_RESTAURANTS_CATEGORY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                ...(action.type === actionTypes.GET_RESTAURANT_BY_USER_ID_FAILURE && {
                    ownerRestaurantLoaded: true,
                    usersRestaurant: null,
                }),
            };
        case "LOGOUT":
            return initialState;
        default:
            return state;
    }
};

export default restaurantReducer;
