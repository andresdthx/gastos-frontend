import {
  GET_MONTHS_FAIL,
  GET_MONTHS_REQUEST,
  GET_MONTHS_SUCCESS,
  SET_FILTERS_FAIL,
  SET_FILTERS_REQUEST,
  SET_FILTERS_SUCCESS,
  SET_GROUP_FAIL,
  SET_GROUP_REQUEST,
  SET_GROUP_SUCCESS,
  SET_NOTIFICATIONS_FAIL,
  SET_NOTIFICATIONS_REQUEST,
  SET_NOTIFICATIONS_SUCCESS,
} from "../constants/utilsConstants";

export const getMonthsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case GET_MONTHS_REQUEST:
      return { loading: true };
    case GET_MONTHS_SUCCESS:
      return { loading: false, months: action.payload };
    case GET_MONTHS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const setNotificationReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case SET_NOTIFICATIONS_REQUEST:
      return { loading: true };
    case SET_NOTIFICATIONS_SUCCESS:
      return { loading: false, notification: [action.payload] };
    case SET_NOTIFICATIONS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const setGroupReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case SET_GROUP_REQUEST:
      return { loading: true };
    case SET_GROUP_SUCCESS:
      return { loading: false, group: action.payload };
    case SET_GROUP_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const getMonthsStorageReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case SET_FILTERS_REQUEST:
      return { loading: true };
    case SET_FILTERS_SUCCESS:
      return { loading: false, filters: action.payload };
    case SET_FILTERS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
