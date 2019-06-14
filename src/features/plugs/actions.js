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

export const createPlugWithApi = async (
  newPlug = { title: null, soundcloudURL: null, imageURL: null },
) => {
  const { dispatch } = store;
  try {
    const token = localStorage.jwtToken;

    // Post New Plug attached to logged in account
    // Pass JWT in header
    let config = {
      headers: {
        'x-auth-token': token,
      },
    };

    const res = await axios.post('api/plugs', newPlug, config);
    console.log('Post PLUG TO API', res);
    return res;
  } catch (err) {
    dispatch(getSearchErrorAction(err));
  }
};
