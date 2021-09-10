import { ALERT_CREATE_FAIL, ALERT_CREATE_REQUEST, ALERT_CREATE_SUCCESS, ALERT_DELETE_FAIL, ALERT_DELETE_REQUEST, ALERT_DELETE_SUCCESS, ALERT_LIST_FAIL, ALERT_LIST_REQUEST, ALERT_LIST_SUCCESS, ALERT_UPDATE_FAIL, ALERT_UPDATE_REQUEST, ALERT_UPDATE_SUCCESS, TYPE_ALERT_LIST_FAIL, TYPE_ALERT_LIST_REQUEST, TYPE_ALERT_LIST_SUCCESS } from "../constants/alertConstants";

export const listAlertsReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case ALERT_LIST_REQUEST:
            return { loading: true }
        case ALERT_LIST_SUCCESS:
            return { loading: false, alerts: action.payload };
        case ALERT_LIST_FAIL:
            return { loading: false };

        default:
            return state;
    }
}

export const updateAlertReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case ALERT_UPDATE_REQUEST:
            return { loading: true };
        case ALERT_UPDATE_SUCCESS:
            return { loading: false, alert: action.payload };
        case ALERT_UPDATE_FAIL:
            return { loading: false, error: action.payload };
    
        default:
            return state;
    }
} 

export const createAlertReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case ALERT_CREATE_REQUEST:
            return { loading: true };
        case ALERT_CREATE_SUCCESS:
            return { loading: false, alert: action.payload };
        case ALERT_CREATE_FAIL:
            return { loading: false, error: action.payload };
    
        default:
            return state;
    }
}

export const listTypeAlertsReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case TYPE_ALERT_LIST_REQUEST:
            return { loading: true };
        case TYPE_ALERT_LIST_SUCCESS:
            return { loading: false, typeAlerts: action.payload };
        case TYPE_ALERT_LIST_FAIL:
            return { loading: false, error: action.payload };
    
        default:
            return state;
    }
}

export const deleteAlertReducer = ( state = { loading: true }, action) => {
    switch (action.type) {
        case ALERT_DELETE_REQUEST:
            return { loading: true };
        case ALERT_DELETE_SUCCESS:
            return { loading: false, success: action.payload };
        case ALERT_DELETE_FAIL:
            return { loading: false, error: action.payload };
    
        default:
            return state;
    }
}