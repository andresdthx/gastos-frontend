import axios from "axios";
import { ALERT_LIST_FAIL, ALERT_LIST_REQUEST, ALERT_LIST_SUCCESS, ALERT_UPDATE_FAIL, ALERT_UPDATE_REQUEST, ALERT_UPDATE_SUCCESS } from '../constants/alertConstants';

export const listAlerts = () => async (dispatch, getState) => {
    dispatch({ type: ALERT_LIST_REQUEST });
    const {userSignin: { userInfo }} = getState(); 
    try {
        const { data } = await axios.get(`/api/alerts/${userInfo.id}`);
        dispatch({ type: ALERT_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ALERT_LIST_FAIL,
            payload: 
            error.response && error.response.data.response
            ? error.response.data.message
            : error.name
        }); 
    }
}

export const updateAlertActive = (active, id) => async (dispatch) => {
    dispatch({ type: ALERT_UPDATE_REQUEST });
    try {
        const { data } = await axios.put(`/api/alerts/${id}`, {
            active: active
        });
        dispatch({ type: ALERT_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ALERT_UPDATE_FAIL,
            payload: 
            error.response && error.response.data.response
            ? error.response.data.message
            : error.name
        });    
    }
}