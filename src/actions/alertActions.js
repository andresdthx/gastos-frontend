import axios from "axios";
import { ALERT_LIST_FAIL, ALERT_LIST_REQUEST, ALERT_LIST_SUCCESS } from '../constants/alertConstants';

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