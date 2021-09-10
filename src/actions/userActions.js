import {
        USER_REGISTER_FAIL,
        USER_REGISTER_REQUEST,
        USER_REGISTER_SUCCESS,
        USER_SIGIN_FAIL,
        USER_SIGIN_REQUEST,
        USER_SIGIN_SUCCESS,
        USER_SIGNOUT_FAIL,
        USER_SUSCRIBE_FAIL,
        USER_SUSCRIBE_REQUEST,
        USER_SUSCRIBE_SUCCESS 
        } from "../constants/userConstants";
import axios from 'axios';

export const signin = (userData) => async (dispatch) => {
    dispatch({ type: USER_SIGIN_REQUEST });

    try {
        const { data } = await axios.post('/api/users/signin', userData);
        dispatch({type: USER_SIGIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_SIGIN_FAIL,
            payload: 
            error.response && error.response.data.response
            ? error.response.data.message
            : error.name
        });
    }
}

export const signout = () => async(dispatch) => {
    localStorage.removeItem('userInfo');;
    dispatch({ type: USER_SIGNOUT_FAIL });
}

export const registerUser = (userData) => async(dispatch) => {
    dispatch({ type:USER_REGISTER_REQUEST, payload: userData });
    try {
       const { data } = await axios.post('/api/users/register', userData);
       dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
       dispatch({ type: USER_SIGIN_SUCCESS, payload: data });
       localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: 
            error.response && error.response.data.response
            ? error.response.data.message
            : error.name
        });
    }
}

export const subscribeUser = (suscription) => async (dispatch, getState) => {
    dispatch({ type: USER_SUSCRIBE_REQUEST });
    try {
        const { userSignin: { userInfo } } = getState();

        const { data } = await axios.post('/api/users/suscription', {
            suscription: suscription,
            userId: userInfo ? userInfo.id  : 1
        });
        dispatch({ type: USER_SUSCRIBE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_SUSCRIBE_FAIL,
            payload: 
            error.response && error.response.data.response
            ? error.response.data.message
            : error.name
        });
    }
}