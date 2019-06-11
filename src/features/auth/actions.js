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
} from '../errors/actions';

import {
  getPlaylistFromShortID,
  resolveSoundcloudURL,
} from '../audioplayer/actions';

import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

export const registerUser = (userData, history) => dispatch => {
  axios
    .post('api/users', userData)
    .then(token => {
      // const { token  = res.data;
      console.log(token);

      // JWT
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwt_decode(token);

      // Actions
      dispatch(setCurrentUser(decoded));
    })
    .then(res => history.push('/login'))
    .catch(err => {
      console.log('REGISTER ERROR', err.response);
      dispatch(getRegisterErrorsAction(err.response));
    });
};

export const registerUserWithPlug = (
  userData,
  plugID,
  history,
) => async dispatch => {
  try {
    const res = await axios.post('api/users', userData);

    const token = res.data;
    console.log('RES TOKEN:', token);

    // JWT store and decode
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    const decoded = jwt_decode(token);

    // Actions
    dispatch(setCurrentUser(decoded));

    // Axios Config
    let config = {
      headers: {
        'x-auth-token': token,
      },
    };

    // Get and resolve URL from short PlugID
    const longURL = await getPlaylistFromShortID(plugID);
    const resolved = await resolveSoundcloudURL(longURL);
    console.log('longURL, resolved', longURL, resolved);

    // Post New Plug attached to logged in account
    const { username, permalink_url, avatar_url } = resolved;
    const newPlug = {
      title: username,
      soundcloudURL: permalink_url,
      imageURL: avatar_url,
    };

    const postRes = await axios.post('api/plugs', newPlug, config);

    console.log("Post RES", postRes)

    // .then(() => history.push(`/preview/${plugID}`))
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
    return true;
  } catch (err) {
    console.log('PREVALIDATE REGISTER ERROR', err.response);
    dispatch(getRegisterErrorsAction(err.response));
  }
};

export const loginUser = (userData, history, path) => async dispatch => {
  try {
    // API Call
    const res = await axios.post('api/users/login', userData);
    const { token } = res.data;

    // JWT
    localStorage.setItem('jwtToken', token);
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
      payload: err.response.data,
    });
  }
};

export const getCurrentUser = () => dispatch => {
  axios
    .post('api/users/me')
    .then(res => {
      dispatch({
        type: GET_CURRENT_USER,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const getUserRole = () => dispatch => {
  axios
    .get('api/users/me/details')
    .then(res => {
      dispatch({
        type: GET_USER_ROLE,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
