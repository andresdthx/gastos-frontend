import { NEXT_EXPENSE_CREATE_FAIL, NEXT_EXPENSE_CREATE_REQUEST, NEXT_EXPENSE_CREATE_SUCCESS, NEXT_EXPENSE_GET_FAIL, NEXT_EXPENSE_GET_REQUEST, NEXT_EXPENSE_GET_SUCCESS, NEXT_EXPENSE_UPDATE_FAIL, NEXT_EXPENSE_UPDATE_REQUEST, NEXT_EXPENSE_UPDATE_SUCCESS } from "../constants/nextExpenseConstants"

export const createNextExpenseReducer = (state = { loading: false }, action) => {
    switch (action.type) {
        case NEXT_EXPENSE_CREATE_REQUEST:
            return { loading: true }
        case NEXT_EXPENSE_CREATE_SUCCESS:
            return { loading: false, nextExpense: action.payload }
        case NEXT_EXPENSE_CREATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const listNextExpensesReducer = (state = { loading: false }, action) => {
    switch (action.type) {
        case NEXT_EXPENSE_GET_REQUEST:
            return { loading: true }
        case NEXT_EXPENSE_GET_SUCCESS:
            return { loading: false, nextExpenses: action.payload }
        case NEXT_EXPENSE_GET_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const updateNextExpenseReducer = (state = { loading: false }, action) => {
    switch (action.type) {
        case NEXT_EXPENSE_UPDATE_REQUEST:
            return { loading: true }
        case NEXT_EXPENSE_UPDATE_SUCCESS:
            return { loading: false, updated: action.payload }
        case NEXT_EXPENSE_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}