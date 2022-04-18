import axios from "axios";
import {
  ENTRY_CREATE_FAIL,
  ENTRY_CREATE_REQUEST,
  ENTRY_CREATE_SUCCESS,
  ENTRY_GET_FAIL,
  ENTRY_GET_REQUEST,
  ENTRY_GET_SUCCESS,
} from "../constants/entryConstants";

const { REACT_APP_ENDPOINT_DEV } = process.env;

export const createEntry = (entry) => async (dispatch, getState) => {
  dispatch({ type: ENTRY_CREATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.post(
      `${REACT_APP_ENDPOINT_DEV}/api/entries/`,
      {
        ...entry,
        userUserId: userInfo.id,
      }
    );
    dispatch({ type: ENTRY_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ENTRY_CREATE_FAIL,
      payload:
        error.response && error.response.data.response
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listEntries = () => async (dispatch, getState) => {
  dispatch({ type: ENTRY_GET_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get(
      `${REACT_APP_ENDPOINT_DEV}/api/entries/${userInfo.id}`
    );
    dispatch({ type: ENTRY_GET_SUCCESS, payload: data.result });
  } catch (error) {
    dispatch({
      type: ENTRY_GET_FAIL,
      payload:
        error.response && error.response.data.response
          ? error.response.data.message
          : error.message,
    });
  }
};
