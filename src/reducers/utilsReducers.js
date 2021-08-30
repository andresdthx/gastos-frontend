import { GET_MONTHS_FAIL, GET_MONTHS_REQUEST, GET_MONTHS_SUCCESS } from "../constants/utilsConstants";

export const getMonthsReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case GET_MONTHS_REQUEST:
            return { loading: true };
        case GET_MONTHS_SUCCESS:
            return { loading: false, months: action.payload };
        case GET_MONTHS_FAIL:
            return { loading: false, error: action.payload };
    
        default:
            return state;
    }
}