import { api } from "../../components/config/api";
import { getApiErrorMessage, notifyError, notifySuccess } from "../../components/util/toast";
import { CREATE_INGREDIENT_CATEGORY_FAILURE, CREATE_INGREDIENT_CATEGORY_REQUEST, CREATE_INGREDIENT_CATEGORY_SUCCESS, CREATE_INGREDIENT_FAILURE, CREATE_INGREDIENT_REQUEST, CREATE_INGREDIENT_SUCCESS, GET_INGREDIENT_CATEGORY_FAILURE, GET_INGREDIENT_CATEGORY_REQUEST, GET_INGREDIENT_CATEGORY_SUCCESS, GET_INGREDIENTS, GET_INGREDIENTS_FAILURE, GET_INGREDIENTS_REQUEST, UPDATE_STOCK, UPDATE_STOCK_FAILURE, UPDATE_STOCK_REQUEST } from "./ActionTypes";

export const getIngredientsOfRestaurant = ({ id, jwt }) => async (dispatch) => {
    dispatch({ type: GET_INGREDIENTS_REQUEST });
    try {
        const response = await api.get(
            `/api/admin/ingredients/restaurant/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
        );
        dispatch({
            type: GET_INGREDIENTS,
            payload: response.data,
            // Assuming the response contains the ingredients data
        });
    } catch (error) {
        dispatch({ type: GET_INGREDIENTS_FAILURE, payload: getApiErrorMessage(error, "Could not load ingredients") });
        notifyError(error, "Could not load ingredients", "ingredients-load");
    }
}

export const createIngredient = ({ data, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_INGREDIENT_REQUEST });
        try {
            const response = await api.post(`/api/admin/ingredients`, data, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            dispatch({
                type: CREATE_INGREDIENT_SUCCESS,
                payload: response.data,
            });
            notifySuccess("Ingredient created", "ingredient-create");
        } catch (error) {
            const message = getApiErrorMessage(error, "Could not create ingredient");
            dispatch({ type: CREATE_INGREDIENT_FAILURE, payload: message });
            notifyError(error, "Could not create ingredient", "ingredient-create");
        }
    };
};

export const createIngredientCategory = ({ data, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_INGREDIENT_CATEGORY_REQUEST });
        try {
            const response = await api.post(`/api/admin/ingredients/category`, data, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            dispatch({
                type: CREATE_INGREDIENT_CATEGORY_SUCCESS,
                payload: response.data,
            });
            notifySuccess("Ingredient category created", "ingredient-category-create");
        } catch (error) {
            const message = getApiErrorMessage(error, "Could not create ingredient category");
            dispatch({ type: CREATE_INGREDIENT_CATEGORY_FAILURE, payload: message });
            notifyError(error, "Could not create ingredient category", "ingredient-category-create");
        }
    };
};

export const getIngredientCategory = ({ id, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: GET_INGREDIENT_CATEGORY_REQUEST });
        try {
            const response = await api.get(
                `/api/admin/ingredients/restaurant/${id}/category`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            dispatch({
                type: GET_INGREDIENT_CATEGORY_SUCCESS,
                payload: response.data,
            });
        } catch (error) {
            dispatch({ type: GET_INGREDIENT_CATEGORY_FAILURE, payload: getApiErrorMessage(error, "Could not load ingredient categories") });
        }
    }
}

export const updateStockOfIngredient = ({ id, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_STOCK_REQUEST });
        try {
            const { data } = await api.put(
                `/api/admin/ingredients/${id}/stoke`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            dispatch({
                type: UPDATE_STOCK,
                payload: data,
            });
            notifySuccess(data?.inStoke ? "Ingredient in stock" : "Ingredient out of stock", `ingredient-stock-${id}`);
        } catch (error) {
            dispatch({ type: UPDATE_STOCK_FAILURE, payload: getApiErrorMessage(error, "Could not update ingredient stock") });
            notifyError(error, "Could not update ingredient stock", `ingredient-stock-${id}`);
        }
    };
};
