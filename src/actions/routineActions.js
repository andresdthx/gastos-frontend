import axios from "axios";
import {
  ROUTINES_CREATE_FAIL,
  ROUTINES_CREATE_REQUEST,
  ROUTINES_CREATE_SUCCESS,
  ROUTINES_GET_FAIL,
  ROUTINES_GET_REQUEST,
  ROUTINES_GET_SUCCESS,
} from "../constants/routineConstants";

const { REACT_APP_ENDPOINT_2 } = process.env;

export const getRoutinesByUser = () => async (dispatch, getState) => {
  dispatch({ type: ROUTINES_GET_REQUEST });
  try {
    const {
      userSignin: {
        userInfo: { id },
      },
    } = getState();

    const { data } = await axios.get(
      `${REACT_APP_ENDPOINT_2}/api/rutines/${id}`
    );

    dispatch({ type: ROUTINES_GET_SUCCESS, payload: data.result });
  } catch (error) {
    dispatch({
      type: ROUTINES_GET_FAIL,
      payload:
        error.response && error.response.data.response
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createRutine = (objRoutine) => async (dispatch) => {
  dispatch({ type: ROUTINES_CREATE_REQUEST });
  try {
    const { data } = await axios.post(
      `${REACT_APP_ENDPOINT_2}/api/rutines`,
      objRoutine
    );
    dispatch({ type: ROUTINES_CREATE_SUCCESS, payload: data.result });
  } catch (error) {
    dispatch({
      type: ROUTINES_CREATE_FAIL,
      payload:
        error.response && error.response.data.response
          ? error.response.data.message
          : error.message,
    });
  }
};
