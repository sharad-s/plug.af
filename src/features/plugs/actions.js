// Modules
import axios from 'axios';
import SC from 'soundcloud';

// Redux
import * as types from './types';
import store from '../../state/store';

// Utils
import isEmpty from '../../utils/isEmpty';

// Other Actions
import {
  getPlaylistFromShortID,
  getShortURLFromPlaylistURL,
  resolveSoundcloudURL,
} from '../audioplayer/actions';

// Errors
import {
  getPlugErrorsAction,
  getSearchErrorAction,
  clearPlugErrorsAction,
  getSoundcloudErrorsAction,
} from '../errors/actions';

// SoundCloud
const CLIENT_ID = '47159083054685525f6b73d25e2560b9';
SC.initialize({
  client_id: CLIENT_ID,
  redirect_uri: 'http://03d0923f.ngrok.io',
});

// Constants
const DEFAULT_PLUG_URL = 'https://soundcloud.com/99q/sets/xxx';

/*
 *  createPlugWithAPI:
 *  POSTS a new Plug to the API. and registers
 *  Passes Authenticated Token as x-auth-token to API
 */
export const createPlugWithApi = async (url) => {
  const { dispatch } = store;
  try {
    console.log('createPlugWithAPI, URL:', url);
    const newPlug = await parsePlug(url);
    console.log('About to POST plug to API. newPlug:', newPlug);
    const res = await axios.post('api/plugs', newPlug);
    console.log('Posted PLUG TO API. Result:', res.data);
    return res.data;
  } catch (err) {
    dispatch(getSearchErrorAction(err));
    throw err;
  }
};

/*
 *  createPlugWithAPI:
 *  POSTS a new Plug to the API. and registers
 *  Passes Authenticated Token as x-auth-token to API
 */
export const getPlugsFromUser = async userID => {
  const { dispatch } = store;
  try {
    console.log(`GETTING PLUGS FROM USER ${userID}`);
    const res = await axios.get(`api/plugs/user/${userID}`);
    const plugs = res.data;
    dispatch(getPlugsAction(plugs));
    console.log('Result:', plugs);
    return res;
  } catch (err) {
    console.log('getPlugsFromUser: err:', err);
    dispatch(getPlugErrorsAction(err));
  }
};

const parsePlug = async (url) => {
  const { dispatch } = store;
  try {
    console.log('parsePlug: resolving URL:', url);
    const response = await SC.resolve(url);

    // Construct Initial Plug Object
    var newPlug = {
      title: null,
      soundcloudURL: url,
      imageURL: null,
      shortID: await getShortURLFromPlaylistURL(url, true),
      kind: response.kind,
    };

    switch (response.kind) {
      // If URL is that of a playlist
      case 'playlist':
        console.log('Resolved Playlist. response:', response);
        let { tracks, title } = response;

        // Set newPlug properties
        newPlug.imageURL = getTrackArtURL(response);
        newPlug.title = title;
        break;

      // If URL is that of a Profile URL
      case 'user':
        let user = response;
        console.log(`Resolved User Profile: ${user.id}`);

        // Search Latest 100 of User's tracks
        tracks = await SC.get('/tracks', {
          user_id: user.id,
          limit: 100,
        });

        // Set newPlug properties
        newPlug.imageURL = user.avatar_url;
        newPlug.title = user.username;
        break;

      // If URL is that of a Single Track
      case 'track':
        console.log('Resolved Single Track', response);

        // Set new plug properties
        newPlug.imageURL = getTrackArtURL(response);
        newPlug.title = response.title;
        break;
      default:
        break;
    }

    return newPlug;
  } catch (err) {
    dispatch(getSoundcloudErrorsAction(err));
    throw err;
  }
};

/*Image Size Manipulation*/
const getTrackArtURL = trackorPlaylist =>
  isEmpty(trackorPlaylist.artwork_url)
    ? increaseImageResolution(trackorPlaylist.user.avatar_url)
    : increaseImageResolution(trackorPlaylist.artwork_url);

const regex = /large/gi;

const increaseImageResolution = originalURL =>
  originalURL.replace(regex, 't500x500');

// Action Creators
const createPlugAction = () => ({
  type: types.CREATE_NEW_PLUG,
  payload: null,
});

// Action Creators
const getPlugsAction = plugs => ({
  type: types.GET_PLUGS,
  payload: plugs,
});
