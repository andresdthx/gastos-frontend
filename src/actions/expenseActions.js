import axios from "axios";
import { EXPENSE_CREATE_FAIL, EXPENSE_CREATE_REQUEST, EXPENSE_CREATE_SUCCESS, EXPENSE_LIST_FAIL, EXPENSE_LIST_REQUEST, EXPENSE_LIST_SUCCESS } from "../constants/expenseConstants"

export const listExpenses = () => async(dispatch, getState) =>{
    dispatch({ type: EXPENSE_LIST_REQUEST });
    const { userSignin : { userInfo }} = getState();
    try {
        const { data } = await axios.get(`/api/expenses/${userInfo.id}`, {
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

export const createExpense = (objExpense) => async (dispatch, getState) => {
    dispatch({ type: EXPENSE_CREATE_REQUEST });
    const {userSignin: { userInfo } } = getState();

    try {
        const { data } = await axios.post('/api/expenses/', {
            ...objExpense,
            userUserId: userInfo.id
        });
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