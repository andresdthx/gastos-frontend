import axios from "axios";
import {
  NEXT_EXPENSE_CREATE_FAIL,
  NEXT_EXPENSE_CREATE_REQUEST,
  NEXT_EXPENSE_CREATE_SUCCESS,
  NEXT_EXPENSE_GET_FAIL,
  NEXT_EXPENSE_GET_REQUEST,
  NEXT_EXPENSE_GET_SUCCESS,
  NEXT_EXPENSE_UPDATE_FAIL,
  NEXT_EXPENSE_UPDATE_REQUEST,
  NEXT_EXPENSE_UPDATE_SUCCESS,
} from "../constants/nextExpenseConstants";

const { REACT_APP_ENDPOINT } = process.env;

export const createNextExpense = (nextExpense) => async (dispatch) => {
  dispatch({ type: NEXT_EXPENSE_CREATE_REQUEST });
  try {
    const { data } = await axios.post(
      `${REACT_APP_ENDPOINT}/api/nextExpenses/`,
      nextExpense
    );
    dispatch({ type: NEXT_EXPENSE_CREATE_SUCCESS, payload: data.result });
  } catch (error) {
    dispatch({
      type: NEXT_EXPENSE_CREATE_FAIL,
      payload:
        error.response && error.response.data.response
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listnextExpenses = (entryId) => async (dispatch, getState) => {
  dispatch({ type: NEXT_EXPENSE_GET_REQUEST });
  try {
    const { data } = await axios.get(
      `${REACT_APP_ENDPOINT}/api/nextExpenses/${entryId}`
    );
    dispatch({ type: NEXT_EXPENSE_GET_SUCCESS, payload: data.result });
  } catch (error) {
    dispatch({
      type: NEXT_EXPENSE_GET_FAIL,
      payload:
        error.response && error.response.data.response
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateNextExpense = (nextExpenseId, check) => (dispatch) => {
  dispatch({ type: NEXT_EXPENSE_UPDATE_REQUEST });

  try {
    axios.put(`${REACT_APP_ENDPOINT}/api/nextExpenses/${nextExpenseId}`, {
      check: check,
    });
    dispatch({ type: NEXT_EXPENSE_UPDATE_SUCCESS, payload: true });
  } catch (error) {
    dispatch({
      type: NEXT_EXPENSE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.response
          ? error.response.data.message
          : error.message,
    });
  }
};
