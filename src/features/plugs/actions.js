// Modules
import axios from 'axios';
import jwt_decode from 'jwt-decode';

// Redux
import * as types from './types';
import store from '../../state/store';

// Other Actions
import {
  getPlaylistFromShortID,
  resolveSoundcloudURL,
} from '../audioplayer/actions';

// Errors
import {
  getRegisterErrorsAction,
  getSearchErrorAction,
  clearRegisterErrorsAction,
} from '../errors/actions';



/*
*  createPlugWithAPI: 
*  POSTS a new Plug to the API. and registers
*  Passes Authenticated Token as x-auth-token to API
*/
export const createPlugWithApi = async (
  newPlug = { title: null, soundcloudURL: null, imageURL: null },
) => {
  const { dispatch } = store;
  try {
    const token = localStorage.jwtToken;

    let config = {
      headers: {
        'x-auth-token': token,
      },
    };

    const res = await axios.post('api/plugs', newPlug, config);
    console.log('Posted PLUG TO API. Result:', res);
    return res;
  } catch (err) {
    dispatch(getSearchErrorAction(err));
  }
};



// Action Creators 
const createPlugAction = () => ({
  type: types.CREATE_NEW_PLUG,
  payload: null
})

// Action Creators 
const getPlugsAction = () => ({
  type: types.CREATE_NEW_PLUG,
  payload: null
})
