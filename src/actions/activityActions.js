import axios from "axios";
import { ACTIVITY_CREATE_REQUEST, ACTIVITY_CREATE_SUCCESS, ACTIVITY_CREATE_FAIL, ACTIVITY_LIST_REQUEST, ACTIVITY_LIST_FAIL, ACTIVITY_LIST_SUCCESS } from '../constants/activityConstants';

export const createActivity = (activity, date) => async (dispatch, useState) => {
    dispatch({ type: ACTIVITY_CREATE_REQUEST });
    const { userSignin: { userInfo }} = useState();
    try {
        const { data } = await axios.post('/api/activities', { activity, date, userId: userInfo.id });
        dispatch({ type: ACTIVITY_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ACTIVITY_CREATE_FAIL,
            payload: 
            error.response && error.response.data.response
            ? error.response.data.message
            : error.message
        });  
    }
}

export const listActivities = () => async (dispatch, useState) => {
    dispatch({ type: ACTIVITY_LIST_REQUEST });
    const { userSignin: { userInfo }} = useState();
    try {
        const { data } = await axios.get(`/api/activities/${userInfo.id}`);
        dispatch({ type: ACTIVITY_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ACTIVITY_LIST_FAIL,
            payload: 
            error.response && error.response.data.response
            ? error.response.data.message
            : error.message
        });  
    }
}