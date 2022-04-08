import axios from "axios";
import {
  SUBCATEGORY_CREATE_FAIL,
  SUBCATEGORY_CREATE_REQUEST,
  SUBCATEGORY_CREATE_SUCCESS,
  SUBCATEGORY_LIST_BY_CATEGORY_FAIL,
  SUBCATEGORY_LIST_BY_CATEGORY_REQUEST,
  SUBCATEGORY_LIST_BY_CATEGORY_SUCCESS,
  SUBCATEGORY_LIST_FAIL,
  SUBCATEGORY_LIST_REQUEST,
  SUBCATEGORY_LIST_SUCCESS,
} from "../constants/subcategoriesConstants";

const { REACT_APP_ENDPOINT_DEV } = process.env;

export const listSubcategories = (categoryId) => async (dispatch) => {
  dispatch({ type: SUBCATEGORY_LIST_REQUEST });
  try {
    const { data } = await axios.get(
      `${REACT_APP_ENDPOINT_DEV}/api/subcategories/${categoryId}`
    );
    dispatch({ type: SUBCATEGORY_LIST_SUCCESS, payload: data.result });
  } catch (error) {
    dispatch({
      type: SUBCATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.response
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listSubcategoriesByCategory = (categoryId) => async (dispatch) => {
  dispatch({ type: SUBCATEGORY_LIST_BY_CATEGORY_REQUEST });
  try {
    const { data } = await axios.get(
      `/api/subcategoriesByCategory/${categoryId}`
    );
    dispatch({ type: SUBCATEGORY_LIST_BY_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SUBCATEGORY_LIST_BY_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.response
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createSubcategory = (name, categoryId) => async (dispatch) => {
  dispatch({ type: SUBCATEGORY_CREATE_REQUEST });

  try {
    const { data } = await axios.post("/api/subcategories", {
      name: name,
      categoryId: categoryId,
    });
    dispatch({ type: SUBCATEGORY_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SUBCATEGORY_CREATE_FAIL,
      payload:
        error.response && error.response.data.response
          ? error.response.data.message
          : error.message,
    });
  }
};
