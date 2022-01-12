import { ACTIVITY_CREATE_FAIL, ACTIVITY_CREATE_REQUEST, ACTIVITY_CREATE_SUCCESS, ACTIVITY_LIST_FAIL, ACTIVITY_LIST_REQUEST, ACTIVITY_LIST_SUCCESS } from "../constants/activityConstants";

export const createActivityReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case ACTIVITY_CREATE_REQUEST:
            return { loading: true };
        case ACTIVITY_CREATE_SUCCESS:
            return { loading: false, activity: action.payload };
        case ACTIVITY_CREATE_FAIL:
            return { loading: false, error: action.payload };
    
        default:
            return state;
    }
}

export const listActivityReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case ACTIVITY_LIST_REQUEST:
            return { loading: true };
        case ACTIVITY_LIST_SUCCESS:
            return { loading: false, activities: action.payload };
        case ACTIVITY_LIST_FAIL:
            return { loading: false, error: action.payload };
    
        default:
            return state;
    }
}