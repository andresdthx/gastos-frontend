import axios from "axios";
import { GET_MONTHS_FAIL, GET_MONTHS_REQUEST, GET_MONTHS_SUCCESS, SET_FILTERS_FAIL, SET_FILTERS_REQUEST, SET_FILTERS_SUCCESS, SET_NOTIFICATIONS_FAIL, SET_NOTIFICATIONS_REQUEST, SET_NOTIFICATIONS_SUCCESS } from "../constants/utilsConstants"

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

export const setFilters = (filters) => async (dispatch) => {
    dispatch({ type: SET_FILTERS_REQUEST });

    try {
        localStorage.setItem('filters', JSON.stringify(filters));
        dispatch({ type: SET_FILTERS_SUCCESS, payload: filters });
    } catch (error) {
        dispatch({
            type: SET_FILTERS_FAIL,
            payload: 
            error.response && error.response.data.response
            ? error.response.data.message
            : error.message
        });
    }
}

export const setNotifications = (data) => (dispatch) => {
    dispatch({ type:SET_NOTIFICATIONS_REQUEST });
    try {
        console.log(data);
        let notification = [{ title: 'ojo con eso', body: data.message, watched: false }];
        localStorage.setItem('notification', JSON.stringify(notification));
        dispatch({ type: SET_NOTIFICATIONS_SUCCESS, payload: notification });
    } catch (error) {
        dispatch({
            type: SET_NOTIFICATIONS_FAIL, payload: 'Error getting notifications'
        });
    }
}
