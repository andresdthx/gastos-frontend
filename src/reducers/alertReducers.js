import { ALERT_LIST_FAIL, ALERT_LIST_REQUEST, ALERT_LIST_SUCCESS } from "../constants/alertConstants";

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