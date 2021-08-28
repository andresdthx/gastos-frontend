import { EXPENSE_CREATE_FAIL, EXPENSE_CREATE_REQUEST, EXPENSE_CREATE_SUCCESS, EXPENSE_LIST_FAIL, EXPENSE_LIST_REQUEST, EXPENSE_LIST_SUCCESS } from "../constants/expenseConstants";

export const listExpensesReducer = (state = { loading: true }, action) =>{
    switch (action.type) {
        case EXPENSE_LIST_REQUEST:
            return { loading: true };
        case EXPENSE_LIST_SUCCESS:
            return { loading: false, expenses: action.payload };
        case EXPENSE_LIST_FAIL:
            return { loading:false, error: action.payload };
           
        default:
            return state;
    }
}

export const createExpenseReducer = (state = { loading: false }, action) => {
    switch (action.type) {
        case EXPENSE_CREATE_REQUEST:
            return { loading: true };
        case EXPENSE_CREATE_SUCCESS:
            return { loading: false, expense: action.payload };
        case EXPENSE_CREATE_FAIL:
            return { loading: false, error: action.payload };
    
        default:
            return state;
    }
}