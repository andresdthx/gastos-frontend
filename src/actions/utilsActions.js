import axios from "axios";
import {
  GET_MONTHS_FAIL,
  GET_MONTHS_REQUEST,
  GET_MONTHS_SUCCESS,
  SET_GROUP_FAIL,
  SET_GROUP_REQUEST,
  SET_GROUP_SUCCESS,
  SET_MONTH_FAIL,
  SET_MONTH_REQUEST,
  SET_MONTH_SUCCESS,
  SET_NOTIFICATIONS_FAIL,
  SET_NOTIFICATIONS_REQUEST,
  SET_NOTIFICATIONS_SUCCESS,
  SET_VIEWER_FAIL,
  SET_VIEWER_REQUEST,
  SET_VIEWER_SUCCESS,
  SET_YEAR_FAIL,
  SET_YEAR_REQUEST,
  SET_YEAR_SUCCESS,
} from "../constants/utilsConstants";

const { REACT_APP_ENDPOINT_DEV } = process.env;

export const getMonths = () => async (dispatch) => {
  dispatch({ type: GET_MONTHS_REQUEST });

  try {
    const { data } = await axios.get(
      `${REACT_APP_ENDPOINT_DEV}/api/utils/months`
    );
    dispatch({ type: GET_MONTHS_SUCCESS, payload: data.result });
  } catch (error) {
    dispatch({
      type: GET_MONTHS_FAIL,
      payload:
        error.response && error.response.data.response
          ? error.response.data.message
          : error.message,
    });
  }
};

export const setGroup = (filters) => async (dispatch) => {
  dispatch({ type: SET_GROUP_REQUEST });

  try {
    localStorage.setItem("group", JSON.stringify(filters));
    dispatch({ type: SET_GROUP_SUCCESS, payload: filters });
  } catch (error) {
    dispatch({
      type: SET_GROUP_FAIL,
      payload:
        error.response && error.response.data.response
          ? error.response.data.message
          : error.message,
    });
  }
};

export const setMonth = (months) => async (dispatch) => {
  dispatch({ type: SET_MONTH_REQUEST });

  try {
    localStorage.setItem("months", JSON.stringify(months));
    dispatch({ type: SET_MONTH_SUCCESS, payload: months });
  } catch (error) {
    dispatch({
      type: SET_MONTH_FAIL,
      payload:
        error.response && error.response.data.response
          ? error.response.data.message
          : error.message,
    });
  }
};

export const setYear = (year) => async (dispatch) => {
  dispatch({ type: SET_YEAR_REQUEST });

  try {
    localStorage.setItem("year", year);
    dispatch({ type: SET_YEAR_SUCCESS, payload: year });
  } catch (error) {
    dispatch({
      type: SET_YEAR_FAIL,
      payload:
        error.response && error.response.data.response
          ? error.response.data.message
          : error.message,
    });
  }
};

export const setViewer = (type) => async (dispatch) => {
  dispatch({ type: SET_VIEWER_REQUEST });

  try {
    localStorage.setItem("viewer", type);
    dispatch({ type: SET_VIEWER_SUCCESS, payload: type });
  } catch (error) {
    dispatch({
      type: SET_VIEWER_FAIL,
      payload:
        error.response && error.response.data.response
          ? error.response.data.message
          : error.message,
    });
  }
};

export const setNotifications = (data) => (dispatch) => {
  dispatch({ type: SET_NOTIFICATIONS_REQUEST });
  try {
    console.log(data);
    let notification = [
      { title: "ojo con eso", body: data.message, watched: false },
    ];
    localStorage.setItem("notification", JSON.stringify(notification));
    dispatch({ type: SET_NOTIFICATIONS_SUCCESS, payload: notification });
  } catch (error) {
    dispatch({
      type: SET_NOTIFICATIONS_FAIL,
      payload: "Error getting notifications",
    });
  }
};
