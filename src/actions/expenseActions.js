import axios from "axios";
import {
  EXPENSE_CREATE_FAIL,
  EXPENSE_CREATE_REQUEST,
  EXPENSE_CREATE_SUCCESS,
  EXPENSE_DELETE_FAIL,
  EXPENSE_DELETE_REQUEST,
  EXPENSE_DELETE_SUCCESS,
  EXPENSE_LIST_BY_DATE_FAIL,
  EXPENSE_LIST_BY_DATE_REQUEST,
  EXPENSE_LIST_BY_DATE_SUCCESS,
  EXPENSE_LIST_FAIL,
  EXPENSE_LIST_REQUEST,
  EXPENSE_LIST_SUCCESS,
  EXP_LIST_FAIL,
  EXP_LIST_REQUEST,
  EXP_LIST_SUCCESS,
} from "../constants/expenseConstants";

export const listExpenses = (months, year) => async (dispatch, getState) => {
  dispatch({ type: EXPENSE_LIST_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.post(
      `/api/expenses/${userInfo.id}`,
      {
        months: months,
        year: year,
      },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: EXPENSE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: EXPENSE_LIST_FAIL,
      payload:
        error.response && error.response.data.response
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listExpensesByDate = () => async (dispatch, getState) => {
  dispatch({ type: EXPENSE_LIST_BY_DATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get(`/api/expenses/byDate/${userInfo.id}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: EXPENSE_LIST_BY_DATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: EXPENSE_LIST_BY_DATE_FAIL,
      payload:
        error.response && error.response.data.response
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listExpense = (expenseId) => async (dispatch) => {
  dispatch({ type: EXP_LIST_REQUEST });
  try {
    const { data } = await axios.get(`/api/expenses/${expenseId}`);
    dispatch({ type: EXP_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: EXP_LIST_FAIL,
      payload:
        error.response && error.response.data.response
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createExpense = (objExpense) => async (dispatch, getState) => {
  dispatch({ type: EXPENSE_CREATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const { data } = await axios.post("/api/expenses/", {
      ...objExpense,
      userUserId: userInfo.id,
    });
    dispatch({ type: EXPENSE_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: EXPENSE_CREATE_FAIL,
      payload:
        error.response && error.response.data.response
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteExpense = (expenseId) => async (dispatch) => {
  dispatch({ type: EXPENSE_DELETE_REQUEST });

  try {
    const { data } = await axios.delete(`/api/expenses/${expenseId}`, {
      expenseId: expenseId,
    });

    dispatch({ type: EXPENSE_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: EXPENSE_DELETE_FAIL,
      payload:
        error.response && error.response.data.response
          ? error.response.data.message
          : error.message,
    });
  }
};
