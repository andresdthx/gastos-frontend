import axios from "axios";
import { EXPENSE_CREATE_FAIL, EXPENSE_CREATE_REQUEST, EXPENSE_CREATE_SUCCESS, EXPENSE_LIST_FAIL, EXPENSE_LIST_REQUEST, EXPENSE_LIST_SUCCESS, EXP_LIST_FAIL, EXP_LIST_REQUEST, EXP_LIST_SUCCESS } from "../constants/expenseConstants"

export const listExpenses = (months, groupers) => async(dispatch, getState) =>{
    dispatch({ type: EXPENSE_LIST_REQUEST });
    const { userSignin : { userInfo }} = getState();
    try {
        const { data } = await axios.post(`/api/expenses/${userInfo.id}`,{
            months: months,
            groupers: groupers,
        }, {
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({ type: EXPENSE_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: EXPENSE_LIST_FAIL,
            payload: 
            error.response && error.response.data.response
            ? error.response.data.message
            : error.message
        });
    }
}

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
            : error.message
        });
    }
}

export const createExpense = (objExpense) => async (dispatch, getState) => {
    dispatch({ type: EXPENSE_CREATE_REQUEST });
    const {userSignin: { userInfo } } = getState();

    try {
        const { data } = await axios.post('/api/expenses/', {
            ...objExpense,
            userUserId: userInfo.id
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
            : error.message
        });  
    }
}