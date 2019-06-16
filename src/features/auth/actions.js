import {
  CREATE_NEW_USER,
  GET_CURRENT_USER,
  GET_ERRORS,
  SET_CURRENT_USER,
  CLEAR_ERRORS,
  GET_USER_ROLE,
} from './types';

// Register and Login Errors
import {
  getRegisterErrorsAction,
  clearRegisterErrorsAction,
  getLoginErrorsAction,
  clearLoginErrorsAction,
} from '../errors/actions';

import {
  getPlaylistFromShortID,
  resolveSoundcloudURL,
} from '../audioplayer/actions';

import { createPlugWithApi } from '../plugs/actions';

import axios from 'axios';
import { addToken, removeToken } from '../../utils/setAuthToken';

export const registerUserWithPlug = (
  userData,
  plugID,
  history,
) => async dispatch => {
  try {
    const res = await axios.post('api/users', userData);

    const token = res.headers['x-auth-token'];
    console.log('RES TOKEN:', token);

    // Add Token to Localstorage and Redux
    addToken(token);

    // Get and resolve URL from short PlugID
    const longURL = await getPlaylistFromShortID(plugID);
    const resolved = await resolveSoundcloudURL(longURL);
    console.log('longURL, resolved', longURL, resolved);

    // Create Plug Object to send to API
    // TODO: clean up POST data
    const { username, permalink_url, avatar_url } = resolved;
    const newPlug = {
      title: username,
      soundcloudURL: permalink_url,
      imageURL: avatar_url,
    };

    // POST New Plug
    const postRes = await createPlugWithApi(newPlug);
    console.log('Post RES', postRes);
  } catch (err) {
    console.log('REGISTER ERROR', err.response);
    dispatch(getRegisterErrorsAction(err.response));
  }
};

export const preValidateRegister = userData => async dispatch => {
  dispatch(clearRegisterErrorsAction());
  try {
    await axios.post('api/users/prevalidate', userData);
    console.log('validateRegister: ', userData);
  } catch (err) {
    console.log('PREVALIDATE REGISTER ERROR', err.response);
    dispatch(getRegisterErrorsAction(err.response));
  }
};

export const loginUser = (userData, history, path) => async dispatch => {
  dispatch(clearLoginErrorsAction());

  try {
    // API Call
    const res = await axios.post('api/auth', userData);
    const token = res.headers['x-auth-token'];

    console.log("loginUser: token", token, typeof token)
    // JWT
    addToken(token);

    // // Conditional push history
    // if (history && path) {
    //   history.push(path);
    // }
    // alert("Logged In!")
    history.push("/")
  } catch (err) {
    console.log(err.response.data)
    dispatch(getLoginErrorsAction(err.response.data));
  }
};

export const getCurrentUser = () => async dispatch => {
  try {
    const res = await axios.post('api/users/me');
    dispatch({
      type: GET_CURRENT_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const logoutUser = () => dispatch => {
  removeToken();
  dispatch(setCurrentUser({}));
};


/*
******************
Action Creators
******************
 */

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
