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
            return { ...state, loading: true, error: null };
        case CREATE_INGREDIENT_FAILURE:
        case CREATE_INGREDIENT_CATEGORY_FAILURE:
        case GET_INGREDIENT_CATEGORY_FAILURE:
        case GET_INGREDIENTS_FAILURE:
        case UPDATE_STOCK_FAILURE:
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
            return {
                ...state,
                loading: false,
                update: action.payload,
                ingredients: state.ingredients.map((item) =>
                    item.id === action.payload.id ? action.payload : item
                ),
            };

        default:
            return state;
    }
}
