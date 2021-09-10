import axios from "axios";
import { ALERT_CREATE_FAIL, ALERT_CREATE_REQUEST, ALERT_CREATE_SUCCESS, ALERT_DELETE_FAIL, ALERT_DELETE_REQUEST, ALERT_DELETE_SUCCESS, ALERT_LIST_FAIL, ALERT_LIST_REQUEST, ALERT_LIST_SUCCESS, ALERT_UPDATE_FAIL, ALERT_UPDATE_REQUEST, ALERT_UPDATE_SUCCESS, TYPE_ALERT_LIST_FAIL, TYPE_ALERT_LIST_REQUEST, TYPE_ALERT_LIST_SUCCESS } from '../constants/alertConstants';

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

export const updateAlertActive = (alert) => async (dispatch) => {
    dispatch({ type: ALERT_UPDATE_REQUEST });
    try {
        const { data } = await axios.put(`/api/alerts`, alert);
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

export const createAlert = (alert) => async (dispatch, getState) => {
    dispatch({ type: ALERT_CREATE_REQUEST });
    const { userSignin: { userInfo } } = getState();
    try {
        const { data } = await axios.post('/api/alerts', {
            alert: alert,
            userId: userInfo.id
        });
        dispatch({ type: ALERT_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ALERT_CREATE_FAIL,
            payload: 
            error.response && error.response.data.response
            ? error.response.data.message
            : error.name
        }); 
    }
}

export const listTypeAlerts = () => async (dispatch) => {
    dispatch({ type: TYPE_ALERT_LIST_REQUEST });

    try {
        const { data } = await axios.post('/api/alerts/types');
        dispatch({ type: TYPE_ALERT_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: TYPE_ALERT_LIST_FAIL,
            payload: 
            error.response && error.response.data.response
            ? error.response.data.message
            : error.name
        }); 
    }
}

export const deleteAlert = (alertId) => async (dispatch) => {
    dispatch({ type: ALERT_DELETE_REQUEST });

    try {
        const { data } = await axios.delete(`/api/alerts/${alertId}`);
        dispatch({ type: ALERT_DELETE_SUCCESS, payload: data.deleted });
    } catch (error) {
        dispatch({
            type: ALERT_DELETE_FAIL,
            payload: 
            error.response && error.response.data.response
            ? error.response.data.message
            : error.name
        });   
    }
}
