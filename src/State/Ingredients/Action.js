import { api } from "../../components/config/api";
import { getApiErrorMessage, notifyError, notifySuccess } from "../../components/util/toast";
import { CREATE_INGREDIENT_CATEGORY_FAILURE, CREATE_INGREDIENT_CATEGORY_REQUEST, CREATE_INGREDIENT_CATEGORY_SUCCESS, CREATE_INGREDIENT_FAILURE, CREATE_INGREDIENT_REQUEST, CREATE_INGREDIENT_SUCCESS, DELETE_INGREDIENT_CATEGORY_FAILURE, DELETE_INGREDIENT_CATEGORY_REQUEST, DELETE_INGREDIENT_CATEGORY_SUCCESS, DELETE_INGREDIENT_FAILURE, DELETE_INGREDIENT_REQUEST, DELETE_INGREDIENT_SUCCESS, GET_INGREDIENT_CATEGORY_FAILURE, GET_INGREDIENT_CATEGORY_REQUEST, GET_INGREDIENT_CATEGORY_SUCCESS, GET_INGREDIENTS, GET_INGREDIENTS_FAILURE, GET_INGREDIENTS_REQUEST, UPDATE_INGREDIENT_CATEGORY_FAILURE, UPDATE_INGREDIENT_CATEGORY_REQUEST, UPDATE_INGREDIENT_CATEGORY_SUCCESS, UPDATE_INGREDIENT_FAILURE, UPDATE_INGREDIENT_REQUEST, UPDATE_INGREDIENT_SUCCESS, UPDATE_STOCK, UPDATE_STOCK_FAILURE, UPDATE_STOCK_REQUEST } from "./ActionTypes";

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
            return response.data;
        } catch (error) {
            const message = getApiErrorMessage(error, "Could not create ingredient");
            dispatch({ type: CREATE_INGREDIENT_FAILURE, payload: message });
            notifyError(error, "Could not create ingredient", "ingredient-create");
            return null;
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
            return response.data;
        } catch (error) {
            const message = getApiErrorMessage(error, "Could not create ingredient category");
            dispatch({ type: CREATE_INGREDIENT_CATEGORY_FAILURE, payload: message });
            notifyError(error, "Could not create ingredient category", "ingredient-category-create");
            return null;
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
                `/api/admin/ingredients/${id}/stock`,
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
            notifySuccess(data?.inStock ? "Ingredient in stock" : "Ingredient out of stock", `ingredient-stock-${id}`);
        } catch (error) {
            dispatch({ type: UPDATE_STOCK_FAILURE, payload: getApiErrorMessage(error, "Could not update ingredient stock") });
            notifyError(error, "Could not update ingredient stock", `ingredient-stock-${id}`);
        }
    };
};

export const updateIngredient = ({ id, data, jwt }) => async (dispatch) => {
    dispatch({ type: UPDATE_INGREDIENT_REQUEST });
    try {
        const response = await api.put(`/api/admin/ingredients/${id}`, data, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: UPDATE_INGREDIENT_SUCCESS, payload: response.data });
        notifySuccess("Ingredient updated", `ingredient-update-${id}`);
        return response.data;
    } catch (error) {
        const message = getApiErrorMessage(error, "Could not update ingredient");
        dispatch({ type: UPDATE_INGREDIENT_FAILURE, payload: message });
        notifyError(error, "Could not update ingredient", `ingredient-update-${id}`);
        return null;
    }
}

export const deleteIngredient = ({ id, jwt }) => async (dispatch) => {
    dispatch({ type: DELETE_INGREDIENT_REQUEST });
    try {
        await api.delete(`/api/admin/ingredients/${id}`, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: DELETE_INGREDIENT_SUCCESS, payload: id });
        notifySuccess("Ingredient deleted", `ingredient-delete-${id}`);
        return true;
    } catch (error) {
        const message = getApiErrorMessage(error, "Could not delete ingredient");
        dispatch({ type: DELETE_INGREDIENT_FAILURE, payload: message });
        notifyError(error, "Could not delete ingredient", `ingredient-delete-${id}`);
        return false;
    }
}

export const updateIngredientCategory = ({ id, name, jwt }) => async (dispatch) => {
    dispatch({ type: UPDATE_INGREDIENT_CATEGORY_REQUEST });
    try {
        const response = await api.put(`/api/admin/ingredients/category/${id}`, { name }, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: UPDATE_INGREDIENT_CATEGORY_SUCCESS, payload: response.data });
        notifySuccess("Ingredient category updated", `ingredient-category-update-${id}`);
        return response.data;
    } catch (error) {
        const message = getApiErrorMessage(error, "Could not update ingredient category");
        dispatch({ type: UPDATE_INGREDIENT_CATEGORY_FAILURE, payload: message });
        notifyError(error, "Could not update ingredient category", `ingredient-category-update-${id}`);
        return null;
    }
}

export const deleteIngredientCategory = ({ id, jwt }) => async (dispatch) => {
    dispatch({ type: DELETE_INGREDIENT_CATEGORY_REQUEST });
    try {
        await api.delete(`/api/admin/ingredients/category/${id}`, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: DELETE_INGREDIENT_CATEGORY_SUCCESS, payload: id });
        notifySuccess("Ingredient category deleted", `ingredient-category-delete-${id}`);
        return true;
    } catch (error) {
        const message = getApiErrorMessage(error, "Could not delete ingredient category");
        dispatch({ type: DELETE_INGREDIENT_CATEGORY_FAILURE, payload: message });
        notifyError(error, "Could not delete ingredient category", `ingredient-category-delete-${id}`);
        return false;
    }
}
