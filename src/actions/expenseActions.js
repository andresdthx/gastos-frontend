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
  EXP_LIST_REQUEST,
} from "../constants/expenseConstants";

const { REACT_APP_ENDPOINT } = process.env;

export const listExpenses = (months, year) => async (dispatch, getState) => {
  dispatch({ type: EXPENSE_LIST_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.post(
      `${REACT_APP_ENDPOINT}/api/expenses/${userInfo.id}`,
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
    dispatch({ type: EXPENSE_LIST_SUCCESS, payload: data.result });
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
    const { data } = await axios.get(
      `${REACT_APP_ENDPOINT}/api/expenses/byDate/${userInfo.id}`,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: EXPENSE_LIST_BY_DATE_SUCCESS, payload: data.result });
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
  // try {
  //   const { data } = await axios.get(
  //     `https://7otf2uz1q7.execute-api.us-east-1.amazonaws.com/expense/${expenseId}`
  //   );
  //   dispatch({ type: EXP_LIST_SUCCESS, payload: data });
  // } catch (error) {
  //   dispatch({
  //     type: EXP_LIST_FAIL,
  //     payload:
  //       error.response && error.response.data.response
  //         ? error.response.data.message
  //         : error.message,
  //   });
  // }
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

    if (data.errors) {
      throw new Error(data.errors[0].message);
    }
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
