import axios from "axios";
import { GET_MONTHS_FAIL, GET_MONTHS_REQUEST, GET_MONTHS_SUCCESS } from "../constants/utilsConstants"

export const getMonths = () => async (dispatch) => {
    dispatch({ type: GET_MONTHS_REQUEST });

    try {
        const { data } = await axios.get('/api/utils/months');
        dispatch({ type: GET_MONTHS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GET_MONTHS_FAIL,
            payload: 
            error.response && error.response.data.response
            ? error.response.data.message
            : error.message
        });
    }
}