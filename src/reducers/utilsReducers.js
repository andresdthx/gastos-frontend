import {
  GET_MONTHS_FAIL,
  GET_MONTHS_REQUEST,
  GET_MONTHS_SUCCESS,
  SET_GROUP_FAIL,
  SET_GROUP_REQUEST,
  SET_GROUP_SUCCESS,
  SET_MONTH_FAIL,
  SET_MONTH_REQUEST,
  SET_MONTH_SUCCESS,
  SET_NOTIFICATIONS_FAIL,
  SET_NOTIFICATIONS_REQUEST,
  SET_NOTIFICATIONS_SUCCESS,
  SET_VIEWER_FAIL,
  SET_VIEWER_REQUEST,
  SET_VIEWER_SUCCESS,
  SET_YEAR_FAIL,
  SET_YEAR_REQUEST,
  SET_YEAR_SUCCESS,
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

export const setMonthReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case SET_MONTH_REQUEST:
      return { loading: true };
    case SET_MONTH_SUCCESS:
      return { loading: false, monthsStorage: action.payload };
    case SET_MONTH_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const setYearReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case SET_YEAR_REQUEST:
      return { loading: true };
    case SET_YEAR_SUCCESS:
      return { loading: false, year: action.payload };
    case SET_YEAR_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const setViewerReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case SET_VIEWER_REQUEST:
      return { loading: true };
    case SET_VIEWER_SUCCESS:
      return { loading: false, view: action.payload };
    case SET_VIEWER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
