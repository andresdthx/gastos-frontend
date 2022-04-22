import axios from "axios";
import {
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
} from "../constants/categoryConstants";

const { REACT_APP_ENDPOINT } = process.env;

export const listCategories = () => async (dispatch, useState) => {
  dispatch({ type: CATEGORY_LIST_REQUEST });
  const {
    userSignin: { userInfo },
  } = useState();
  try {
    const { data } = await axios.get(
      `${REACT_APP_ENDPOINT}/api/categories/${userInfo.id}`
    );
    dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data.result });
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.response
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createCategory = (name) => async (dispatch, useState) => {
  dispatch({ type: CATEGORY_CREATE_REQUEST, payload: name });
  const {
    userSignin: { userInfo },
  } = useState();
  try {
    const { data } = await axios.post("/api/categories/", {
      name: name,
      userId: userInfo.id,
    });
    dispatch({ type: CATEGORY_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CATEGORY_CREATE_FAIL,
      payload:
        error.response && error.response.data.response
          ? error.response.data.message
          : error.message,
    });
  }
};
