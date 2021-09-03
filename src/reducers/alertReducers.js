import { ALERT_LIST_FAIL, ALERT_LIST_REQUEST, ALERT_LIST_SUCCESS, ALERT_UPDATE_FAIL, ALERT_UPDATE_REQUEST, ALERT_UPDATE_SUCCESS } from "../constants/alertConstants";

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