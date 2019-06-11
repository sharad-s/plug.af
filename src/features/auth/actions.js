import {
  CREATE_NEW_USER,
  GET_CURRENT_USER,
  GET_ERRORS,
  SET_CURRENT_USER,
  CLEAR_ERRORS,
  GET_USER_ROLE,
} from "./types";

import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("api/users", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


export const preValidateRegister = (userData) => async dispatch => {
  try {
    await axios.post("api/users/register/validate", userData);
    console.log("validateRegister: ", userData);
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const loginUser = (userData, history, path) => async dispatch => {
  try {
    // API Call
    const res = await axios.post("api/users/login", userData);
    const { token } = res.data;

    // JWT
    localStorage.setItem("jwtToken", token);
    setAuthToken(token);
    const decoded = jwt_decode(token);

    // Actions
    dispatch(setCurrentUser(decoded));
    dispatch(clearErrors());

    // Conditional push history
    if (history && path) {
      history.push(path);
    }

  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const getCurrentUser = () => dispatch => {
  axios
    .post("api/users/me")
    .then(res => {
      dispatch({
        type: GET_CURRENT_USER,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};


export const getUserRole = () => dispatch => {
  axios
    .get("api/users/me/details")
    .then(res => {
      dispatch({
        type: GET_USER_ROLE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};