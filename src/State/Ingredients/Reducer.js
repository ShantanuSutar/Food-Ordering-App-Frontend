import {
    CREATE_INGREDIENT_CATEGORY_SUCCESS,
    CREATE_INGREDIENT_SUCCESS,
    GET_INGREDIENTS,
    GET_INGREDIENT_CATEGORY_SUCCESS,
    UPDATE_STOCK,
    CREATE_INGREDIENT_REQUEST,
    CREATE_INGREDIENT_FAILURE,
    CREATE_INGREDIENT_CATEGORY_REQUEST,
    CREATE_INGREDIENT_CATEGORY_FAILURE,
    GET_INGREDIENT_CATEGORY_REQUEST,
    GET_INGREDIENT_CATEGORY_FAILURE,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_FAILURE,
    UPDATE_STOCK_REQUEST,
    UPDATE_STOCK_FAILURE,
    UPDATE_INGREDIENT_REQUEST,
    UPDATE_INGREDIENT_SUCCESS,
    UPDATE_INGREDIENT_FAILURE,
    DELETE_INGREDIENT_REQUEST,
    DELETE_INGREDIENT_SUCCESS,
    DELETE_INGREDIENT_FAILURE,
    UPDATE_INGREDIENT_CATEGORY_REQUEST,
    UPDATE_INGREDIENT_CATEGORY_SUCCESS,
    UPDATE_INGREDIENT_CATEGORY_FAILURE,
    DELETE_INGREDIENT_CATEGORY_REQUEST,
    DELETE_INGREDIENT_CATEGORY_SUCCESS,
    DELETE_INGREDIENT_CATEGORY_FAILURE,
} from "./ActionTypes";

const initialState = {
    ingredients: [],
    update: null,
    category: [],
    loading: false,
    error: null,
};

export const ingredientReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_INGREDIENT_REQUEST:
        case CREATE_INGREDIENT_CATEGORY_REQUEST:
        case GET_INGREDIENT_CATEGORY_REQUEST:
        case GET_INGREDIENTS_REQUEST:
        case UPDATE_STOCK_REQUEST:
        case UPDATE_INGREDIENT_REQUEST:
        case DELETE_INGREDIENT_REQUEST:
        case UPDATE_INGREDIENT_CATEGORY_REQUEST:
        case DELETE_INGREDIENT_CATEGORY_REQUEST:
            return { ...state, loading: true, error: null };
        case CREATE_INGREDIENT_FAILURE:
        case CREATE_INGREDIENT_CATEGORY_FAILURE:
        case GET_INGREDIENT_CATEGORY_FAILURE:
        case GET_INGREDIENTS_FAILURE:
        case UPDATE_STOCK_FAILURE:
        case UPDATE_INGREDIENT_FAILURE:
        case DELETE_INGREDIENT_FAILURE:
        case UPDATE_INGREDIENT_CATEGORY_FAILURE:
        case DELETE_INGREDIENT_CATEGORY_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case GET_INGREDIENTS:
            return {
                ...state,
                loading: false,
                ingredients: action.payload,
            };
        case GET_INGREDIENT_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                category: action.payload,
            };
        case CREATE_INGREDIENT_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                category: [...state.category, action.payload],
            };
        case CREATE_INGREDIENT_SUCCESS:
            return {
                ...state,
                loading: false,
                ingredients: [...state.ingredients, action.payload],
            };
        case UPDATE_STOCK:
        case UPDATE_INGREDIENT_SUCCESS:
            return {
                ...state,
                loading: false,
                update: action.payload,
                ingredients: state.ingredients.map((item) =>
                    item.id === action.payload.id ? action.payload : item
                ),
            };
        case DELETE_INGREDIENT_SUCCESS:
            return {
                ...state,
                loading: false,
                ingredients: state.ingredients.filter((item) => item.id !== action.payload),
            };
        case UPDATE_INGREDIENT_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                category: state.category.map((item) =>
                    item.id === action.payload.id ? action.payload : item
                ),
                ingredients: state.ingredients.map((item) =>
                    item.category?.id === action.payload.id
                        ? { ...item, category: action.payload }
                        : item
                ),
            };
        case DELETE_INGREDIENT_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                category: state.category.filter((item) => item.id !== action.payload),
            };

        case "LOGOUT":
            return initialState;

        default:
            return state;
    }
}
