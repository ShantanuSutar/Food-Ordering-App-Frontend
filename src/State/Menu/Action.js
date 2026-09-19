import { api } from "../../components/config/api";


import {
    CLEAR_MENU_SEARCH,
    CREATE_MENU_ITEM_FAILURE,
    CREATE_MENU_ITEM_REQUEST,
    CREATE_MENU_ITEM_SUCCESS,
    DELETE_MENU_ITEM_FAILURE,
    DELETE_MENU_ITEM_REQUEST,
    DELETE_MENU_ITEM_SUCCESS,
    GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE,
    GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST,
    GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS,
    GET_TOP_MEALS_FAILURE,
    GET_TOP_MEALS_REQUEST,
    GET_TOP_MEALS_SUCCESS,
    SEARCH_MENU_ITEM_FAILURE,
    SEARCH_MENU_ITEM_REQUEST,
    SEARCH_MENU_ITEM_SUCCESS,
    UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE,
    UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST,
    UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS
} from "./ActionTypes";

//localhost:5454/api/admin/ingredients/food/16
export const createMenuItem = ({ menu, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_MENU_ITEM_REQUEST });
        try {
            const { data } = await api.post("api/admin/food", menu,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
            console.log("created menu", data);
            dispatch({ type: CREATE_MENU_ITEM_SUCCESS, payload: data });
        } catch (error) {
            console.log("catch error ", error);
            dispatch({ type: CREATE_MENU_ITEM_FAILURE, payload: error });
        }
    }
}

export const getMenuItemsByRestaurantId = (reqData) => {
    return async (dispatch) => {

        dispatch({
            type: GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST
        });

        try {

            let url =
                `/api/food/restaurant/${reqData.restaurantId}` +
                `?vegetarian=${reqData.vegetarian}` +
                `&nonveg=${reqData.nonveg}` +
                `&seasonal=${reqData.seasonal}`;

            if (reqData.foodCategory) {
                url += `&food_category=${reqData.foodCategory}`;
            }

            const { data } = await api.get(url, {
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`,
                },
            });

            console.log("menu item by restaurants", data);

            dispatch({
                type: GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS,
                payload: data
            });

        } catch (error) {

            console.log("catch error", error);

            dispatch({
                type: GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE,
                payload: error
            });
        }
    };
};

export const searchMenuItem = ({ keyword, jwt }) => {
    return async (dispatch) => {
        const normalizedKeyword = keyword.trim();

        if (!normalizedKeyword) {
            dispatch({ type: CLEAR_MENU_SEARCH });
            return;
        }

        dispatch({ type: SEARCH_MENU_ITEM_REQUEST, payload: normalizedKeyword });
        try {
            const config = {
                params: { name: normalizedKeyword },
                ...(jwt && {
                    headers: { Authorization: `Bearer ${jwt}` }
                })
            };
            const { data } = await api.get("/api/food/search", config);
            dispatch({
                type: SEARCH_MENU_ITEM_SUCCESS,
                payload: { keyword: normalizedKeyword, items: data }
            });
        } catch (error) {
            dispatch({
                type: SEARCH_MENU_ITEM_FAILURE,
                payload: {
                    keyword: normalizedKeyword,
                    message: error.response?.data?.message || "Search is unavailable right now."
                }
            });
        }
    };
};

export const clearMenuSearch = () => ({ type: CLEAR_MENU_SEARCH });

export const getTopMeals = () => {
    return async (dispatch) => {
        dispatch({ type: GET_TOP_MEALS_REQUEST });

        try {
            const { data } = await api.get("/api/food/top");
            dispatch({ type: GET_TOP_MEALS_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: GET_TOP_MEALS_FAILURE,
                payload: error.response?.data?.message || error.message
            });
        }
    };
};


// export const getAllIngredientsOfMenuItem = (reqData) => {
//     return async (dispatch) => {
//         dispatch({type: GETALL });
//         try {
//             const { data } = await api.get(
//                 api / food / restaurant / ${ reqData.restaurantId }`,
// {
// headers: {
// Authorization: Bearer ${reqData.jwt}`,
// },
//     }
// );
// console.log("menu item by restaurants ", data);
// dispatch(getMenuItems By RestaurantIdSuccess(data)):


export const updateMenuItemsAvailability = ({ foodId, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST });
        try {
            const { data } = await api.put(
                `/api/admin/food/${foodId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            console.log("update menuItems Availability ", data);
            dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE, payload: error });
            console.log("error", error)
        }
    }
}


export const deleteFoodAction = ({ foodId, jwt }) =>
    async (dispatch) => {
        dispatch({ type: DELETE_MENU_ITEM_REQUEST });
        try {
            const { data } = await api.delete(`/api/admin/food/${foodId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("delete food ", data);
            dispatch({ type: DELETE_MENU_ITEM_SUCCESS, payload: foodId });
        } catch (error) {
            dispatch({ type: DELETE_MENU_ITEM_FAILURE, payload: error });
        }
    }
