import {
  ROUTINES_CREATE_FAIL,
  ROUTINES_CREATE_REQUEST,
  ROUTINES_CREATE_SUCCESS,
  ROUTINES_GET_FAIL,
  ROUTINES_GET_REQUEST,
  ROUTINES_GET_SUCCESS,
} from "../constants/routineConstants";

export const getRoutinesByUserReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ROUTINES_GET_REQUEST:
      return { loading: true };
    case ROUTINES_GET_SUCCESS:
      return { loading: false, routines: action.payload };
    case ROUTINES_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const createRoutineReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ROUTINES_CREATE_REQUEST:
      return { loading: true };
    case ROUTINES_CREATE_SUCCESS:
      return { loading: false, routine: action.payload };
    case ROUTINES_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
