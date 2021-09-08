import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGIN_FAIL, USER_SIGIN_REQUEST, USER_SIGIN_SUCCESS, USER_SUSCRIBE_FAIL, USER_SUSCRIBE_REQUEST, USER_SUSCRIBE_SUCCESS } from "../constants/userConstants";

export const signinReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case USER_SIGIN_REQUEST:
            return { loading: true };
        case USER_SIGIN_SUCCESS:
            return { loading: false, userInfo: action.payload, success:true };
        case USER_SIGIN_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
}

export const registerReducer = (state = { loading:true }, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true };
        case USER_REGISTER_SUCCESS:
            return { loading: false, user: action.payload };
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload };
    
        default:
            return state;
    }
}

export const suscribeUserReducer = (state = { loading: true }, action) => {
    switch (action.type){
        case USER_SUSCRIBE_REQUEST:
            return {loading: true };
        case USER_SUSCRIBE_SUCCESS:
            return { loading: false, suscribe: action.payload };
        case USER_SUSCRIBE_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
}