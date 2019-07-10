import SoundCloudAudio from 'soundcloud-audio';
import SC from 'soundcloud';
import axios from 'axios';

// Redux
import * as types from './types';
import store from '../../state/store';

// Actions
import {
	getSoundcloudErrorsAction,
	getSearchErrorAction,
	clearSearchErrorsAction,
	// getAPIErrorsAction,
} from '../errors/actions';

import {
	createPlugWithApi,
	getRandomPlug,
	incrementSnippetPlayCount,
} from '../plugs/actions';

import { openModal } from '../page';

// Utils
import { setShortURL, getLongURL } from '../../utils/shorturl';
import isEmpty from '../../utils/isEmpty';

// Swiper
import Swiper from '../../utils/swiper';

// Mixpanel
import {
	Mixpanel,
	track_PlaySnippet,
	track_NextSnippet,
	track_PrevSnippet,
} from '../../utils/mixpanel';

const baseURL = 'https://plug.af/';

const CLIENT_ID = 'f911752b0d31492eca3ea086fbc9e8fd';

SC.initialize({
	client_id: CLIENT_ID,
	redirect_uri: 'http://03d0923f.ngrok.io',
});

// Constants
const LEFT = 'left';
const RIGHT = 'right';

/*
******************
Thunks
******************
 */

// Tries downloading and Decrypting the file given payload
export const connectSoundcloud = () => {
	const { dispatch } = store;
	try {
		const scPlayer = new SoundCloudAudio(CLIENT_ID);
		scPlayer.on('loadedmetadata', e => {
			console.log('scPlayer LOADED METADATA', e);
			scPlayer.setTime(45);
		});

		dispatch(connectSoundcloudAction(scPlayer));
	} catch (err) {
		console.log('connectSoundcloud:', err.message);
		dispatch(getSoundcloudErrorsAction(err));
	}
};

export const resolveSoundcloudURL = async url => {
	const { dispatch } = store;
	try {
		const resolved = await SC.resolve(url);
		return resolved;
	} catch (err) {
		console.log('resolveSoundcloudURL:', err);
		dispatch(getSearchErrorAction(err));
	}
};

export const pauseSnippet = async () => {
	const { getState, dispatch } = store;
	const { scPlayer } = getState().audio;
	try {
		console.log('pauseSnippet: Pausing Snippet');
		await scPlayer.pause();
		dispatch(pauseSnippetAction());
		console.log('pauseSnippet: Paused Snippet');
	} catch (err) {
		console.log('pauseSnippet:', err.message);
	}
};

// LOAD THE TRACK INTO CURRENTTRACK
export const getTrack = async index => {
	const { getState, dispatch } = store;
	const { playlist, currentPlug } = getState().audio;

	const newPlaylist = currentPlug.snippets;

	const track = newPlaylist[index];
	console.log('gettrack', track);
	dispatch(getTrackAction(track, index));
};

// PLAY THE SNIPPET USING WEB AUDIO
export const playSnippet = async () => {
	const { getState, dispatch } = store;
	const {
		scPlayer,
		playlist,
		trackIndex,
		shortURL,
		currentTrack,
	} = getState().audio;

	dispatch(trackLoading());

	try {
		// Create Stream URL
		const streamUrl = _createStreamUrl(currentTrack.soundcloudID);
		console.log('Playing Snippet...', streamUrl);

		// console.log('playSnippet:', streamUrl);
		await scPlayer.play({
			streamUrl,
		});

		// Increment Play Count for Snippet
		await incrementSnippetPlayCount(currentTrack._id);

		// Mixpanel Tracker
		track_PlaySnippet({
			shortURL,
			trackIndex,
			trackTitle: currentTrack.title,
			trackArtist: currentTrack.artist,
		});
		// Dispatch Action
		dispatch(playSnippetAction(currentTrack));
	} catch (err) {
		console.log('playSnippet:', err.message);
	}
};

// SNIPPET FUNCTIONALITY
export const setSnippet = async () => {
	const { getState, dispatch } = store;
	const { scPlayer } = getState().audio;

	console.log('Setting Snippet...');

	try {
		scPlayer.setTime(45);
		scPlayer.on('timeupdate', () => {
			let currentTime = scPlayer.audio.currentTime;
			// this.setState({ currentTime });
			dispatch(updateTrackTimeAction(currentTime));

			if (currentTime > 60) {
				console.log('setSnippet: currentTime > 60: calling nextSong()');
				newNextTrack();
			}
		});
		scPlayer.on('ended', () => {
			console.log('Playback Unexpectedly ended. Skipping to Next Song');
			console.log('setSnippet: onEnded: calling nextSong()');
			newNextTrack();
		});
		scPlayer.on('paused', () => {
			console.log('scPlayer.onPaused');
		});
		scPlayer.on('paused', () => {
			console.log('scPlayer.onPaused');
		});
		scPlayer.on('loadstart', e => {
			console.log('scPlayer.loadstart', e);
		});

		dispatch(setSnippetAction());
	} catch (err) {
		console.log('setSnippet:', err.message);
	}
};

/*
******************
Helper Functions
******************
 */

// Helper fn - Create Stream URL
const _createStreamUrl = id => `https://api.soundcloud.com/tracks/${id}/stream`;

const _incrementIndex = async int => {
	const { getState, dispatch } = store;
	const {
		trackIndex,
		plugIndex,
		playlist,
		currentPlug,
		totalTrackCount,
		totalTrackIndex,
	} = getState().audio;
	let newPlaylist = currentPlug.snippets;

	// IF TOTAL TRACK INDEX IS 4 RUN OPENMODAL()
	if (totalTrackIndex + 1 === 4) {
		openModal();
	}

	/* PRELOAD: If trackIndex + int is exactly 2 less than playlist length, get next plug */
	/* TODO: check if that specific track has been played or not yet  */
	if (
		totalTrackIndex + int === totalTrackCount - 2 ||
		totalTrackIndex + int >= totalTrackCount
	) {
		const randomPlug = await getRandomPlug(1);
		console.log('<_incremen></_incremen>tIndex, randomPlug:', randomPlug);
		dispatch(newAppendPlugAction(randomPlug));
	}
	/* END: If trackIndex + int is more than playlist length, increment */
	/* Increment Current Plug index and reset Current Track Index to 0 */
	if (trackIndex + int >= newPlaylist.length) {
		// dispatch(updateCurrentIndexAction(0));
		dispatch(newUpdatePlugIndex(plugIndex + 1));
		dispatch(newUpdateTrackIndex(0));
		// Increment TOTAL Track Index +1
		dispatch(newUpdateTotalTrackIndex(int));
		return 0;
		/* REWIND: If trackIndex + int is more than playlist length, increment */
		/* Increment Current Plug index and reset Current Track Index to 0 */
	} else if (trackIndex + int < 0) {
		// Decrement Plug Index
		dispatch(newUpdatePlugIndex(plugIndex - 1));
		// Set Track Index to last track of the rewinded-to plug.
		const newTrackIndex = getState().audio.currentPlug.snippets.length - 1;
		// Dispatch New Track Index & return
		dispatch(updateCurrentIndexAction(newTrackIndex));
		// Decrement TOTAL Track Index -1
		dispatch(newUpdateTotalTrackIndex(int));
		console.log(
			'REWIND TO PREVIOUS PLUG.',
			`PLUG INDEX: ${plugIndex - 1}, NEW TRACK INDEX: ${newTrackIndex}`,
		);
		return newTrackIndex;
	} else {
		dispatch(updateCurrentIndexAction(trackIndex + int));
		// Increment/Decrement TOTAL Track Index +/= 1
		dispatch(newUpdateTotalTrackIndex(int));
		return trackIndex + int;
	}
};

export const getPlaylistFromShortID = async shortID => {
	try {
		const playlistURL = await getLongURL(shortID);
		return playlistURL;
	} catch (err) {
		console.log('getPlaylistFromURL:', err);
	}
};

export const getShortURLFromPlaylistURL = async (
	playlistURL,
	returnOnlyID = false,
) => {
	try {
		console.log('getShortURLFromPlaylistURL: URL', playlistURL);

		store.dispatch(clearSearchErrorsAction());

		// See if URL Can Resolve to soundcloud first
		const canResolve = await SC.resolve(playlistURL);
		// Construct Short ID and SHORTURL
		const shortID = await setShortURL(playlistURL);
		const shortURL = baseURL + shortID;
		return returnOnlyID ? shortID : shortURL;
	} catch (err) {
		console.log('getShortURLFromPlaylistURL:', err);
		store.dispatch(getSearchErrorAction(err));
		return err;
	}
};

// Swipe The Fucking Card on the screen
const forceSwipeCard = swipeDirection => {
	switch (swipeDirection) {
		case LEFT:
			console.log('ACTIONS: forceSwipeCard: Calling swipeFunction.left()');
			console.log('Swiping LEFT');
			Swiper.swipeLeft();
			console.log('After Swiping LEFT');
			// swipeFunction.left();
			return;
		case RIGHT:
			console.log('ACTIONS: forceSwipeCard: Calling swipeFunction.right()');
			Swiper.swipeRight();
			return;
		default:
			console.log('ACTIONS: forceSwipeCard: Calling swipeFunction.left()');
			Swiper.swipeLeft();
			return;
	}
};

export const clearTrackTime = async () => {
	const { dispatch, getState } = store;
	console.log('ACTIONS: clearTrackTime: About to CLEAR TRACK TIME TO ZERO');
	dispatch(updateTrackTimeAction(0));
	console.log(
		'ACTIONS: clearTrackTime: New TrackTime =',
		getState().audio.currentTime,
	);
};

/* NEW */
export const newUpdatePlaylist = async plug => {
	const { dispatch } = store;
	console.log('newUpdatePlaylist: plug', plug);

	if (isEmpty(plug)) return false;

	console.log('Dispatching Plug', plug);
	await checkPlug(plug);
	const response = await resolveSoundcloudURL(plug.soundcloudURL);
	console.log('SC OBJECT', response);
	dispatch(clearPlaylistAction());
	dispatch(clearAllAction());
	dispatch(newUpdatePlugAction(plug));
};

const checkPlug = async plug => {
	if (isEmpty(plug.snippets)) {
		return _incrementIndex(1);
	}
};

/* NEW */
export const newAppendlaylist = async plug => {
	const { dispatch } = store;
	console.log('newUpdatePlaylist: plug', plug);
	console.log('Dispatching Plug', plug);
	dispatch(clearPlaylistAction());
	dispatch(newUpdatePlugAction(plug));
};

export const newNextTrack = async (
	swipeDirection = LEFT,
	opts = { disableForceSwipe: false, swipeDirection: LEFT },
) => {
	const { getState, dispatch } = store;

	console.log('newNextTrack 0');

	// If Anything other than manual swipe occurs, Force Swipe Card
	if (!opts.disableForceSwipe) {
		console.log('audioplayer Actions: nextSong: Force Swipe called');
		return forceSwipeCard(swipeDirection);
	}

	console.log('newNextTrack 1');

	try {
		// Index ?
		const newTrackIndex = await _incrementIndex(1);
		const nextTrack = getState().audio.playlist[
			getState().audio.totalTrackIndex
		];

		console.log('newNextTrack 2');
		dispatch(nextSnippetAction(newTrackIndex, nextTrack));
		console.log('newNextTrack 3');

		await playSnippet();
		await setSnippet();

		console.log('newNextTrack 4');

		const msg = swipeDirection === RIGHT ? 'LIKE' : 'SKIP';	
		console.log("newNextTrack: swipeDirection: ", msg, swipeDirection);

		// Mixpanel Tracker
		const payload = {
			 newSnippetIndex: newTrackIndex,
			 shortID: getState().audio.currentPlug.shortID,
		  	 trackTitle: nextTrack.title,
  			 trackArtist: nextTrack.artist,
			 action: msg,
			}
		console.log("newNextTrack: payload", payload, nextTrack);
		track_NextSnippet(payload);
	} catch (err) {
		console.log('newNextTrack:', err.message);
	}
};

export const prevSong = async () => {
	const { getState, dispatch } = store;
	const { playlist } = getState().audio;

	try {
		// Index ?
		const newTrackIndex = await _incrementIndex(-1);
		const nextTrack = getState().audio.playlist[
			getState().audio.totalTrackIndex
		];

		console.log(
			'prevSong: new Track Index',
			newTrackIndex,
			'prevTrack',
			nextTrack,
		);
		dispatch(prevSnippetAction(newTrackIndex, nextTrack));

		await getTrack(newTrackIndex);
		await playSnippet();
		await setSnippet();

		// Mixpanel Tracker
		track_PrevSnippet({
			newSnippetIndex: newTrackIndex,
		});
	} catch (err) {
		console.log('prevSong:', err.message);
	}
};

/*
******************
Action Creators
******************
 */

const connectSoundcloudAction = scPlayer => ({
	type: types.CONNECT_SOUNDCLOUD,
	payload: { scPlayer },
});

const pauseSnippetAction = scPlayer => ({
	type: types.PAUSE_SNIPPET,
});

const playSnippetAction = currentTrack => ({
	type: types.PLAY_SNIPPET,
	payload: currentTrack,
});

const setSnippetAction = scPlayer => ({
	type: types.SET_SNIPPET,
	payload: scPlayer,
});

const updatePlaylistAction = (tracks, title, playlistURL, shortURL, kind) => ({
	type: types.UPDATE_PLAYLIST,
	payload: { tracks, title, playlistURL, shortURL, kind },
});

const updateTrackTimeAction = currentTime => ({
	type: types.UPDATE_TRACK_TIME,
	payload: { currentTime },
});

const nextSnippetAction = (trackIndex, currentTrack) => ({
	type: types.NEXT_SNIPPET,
	payload: { trackIndex, currentTrack },
});

const prevSnippetAction = (newTrackIndex, nextTrack) => ({
	type: types.PREV_SNIPPET,
	payload: {
		newTrackIndex,
		nextTrack,
	},
});

const getTrackAction = (nextTrack, nextIndex) => ({
	type: types.GET_TRACK,
	payload: { nextTrack, nextIndex },
});

const clearPlaylistAction = () => ({
	type: types.CLEAR_PLAYLIST,
});

const clearAllAction = () => ({
	type: types.CLEAR_ALL,
});

const updateCurrentIndexAction = trackIndex => ({
	type: types.UPDATE_CURRENT_INDEX,
	payload: trackIndex,
});

//  NEW
const newUpdatePlugAction = plug => ({
	type: types.NEW_UPDATE_PLUG,
	payload: plug,
});

const newAppendPlugAction = plug => ({
	type: types.NEW_APPEND_PLUG,
	payload: plug,
});

const newUpdateTrackIndex = trackIndex => ({
	type: types.NEW_UPDATE_TRACK_INDEX,
	payload: trackIndex,
});

const newUpdatePlugIndex = plugIndex => ({
	type: types.NEW_UPDATE_PLUG_INDEX,
	payload: plugIndex,
});

const newUpdateTotalTrackIndex = int => ({
	type: types.NEW_INCREMENT_TOTAL_TRACK_INDEX,
	payload: int,
});

const trackLoading = () => ({
	type: types.TRACK_LOADING,
});
