import SoundCloudAudio from 'soundcloud-audio';
import SC from 'soundcloud';

// Redux
import * as types from './types';
import store from '../../state/store';

import {
	getSoundcloudErrorsAction,
	getSearchErrorAction,
} from '../errors/actions';

// Utils
import { setShortURL, getLongURL } from '../../utils/shorturl';
// Mixpanel
import { Mixpanel } from '../../utils/mixpanel';

const PLUG_PLAYLIST_URL = 'https://soundcloud.com/99q/sets/xxx';

const baseURL = 'https://plug.af/';

const CLIENT_ID = '47159083054685525f6b73d25e2560b9';

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

		dispatch(connectSoundcloudAction(scPlayer));
	} catch (err) {
		console.log('connectSoundcloud:', err.message);
		dispatch(getSoundcloudErrorsAction(err));
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

export const getTrack = async index => {
	const { getState, dispatch } = store;
	const { playlist } = getState().audio;

	const track = playlist[index];
	console.log('gettrack', track);
	dispatch(getTrackAction(track, index));
};

export const playSnippet = async () => {
	Mixpanel.track('play_Plug');
	const { getState, dispatch } = store;
	const { scPlayer, playlist, trackIndex } = getState().audio;

	const track = playlist[trackIndex];

	// Preload Next Snippet
	try {
		const nextTrack = playlist[trackIndex + 1];
		const nextStreamUrl = _createStreamUrl(nextTrack.id);
		// await scPlayer.preload(nextStreamUrl, 'auto');
		// console.log('Preload scPlayer:', scPlayer);
	} catch (err) {
		console.log('playSnippet: preload next snippet', err.message);
	}

	try {
		// Create Stream URL
		const streamUrl = _createStreamUrl(track.id);
		// console.log('playSnippet:', streamUrl);
		await scPlayer.play({
			streamUrl,
		});

		dispatch(playSnippetAction(track));
	} catch (err) {
		console.log('playSnippet:', err.message);
	}
};

export const setSnippet = async () => {
	const { getState, dispatch } = store;
	const { scPlayer } = getState().audio;

	try {
		scPlayer.setTime(45);
		scPlayer.on('timeupdate', () => {
			let currentTime = scPlayer.audio.currentTime;
			// this.setState({ currentTime });
			dispatch(updateTrackTimeAction(currentTime));

			if (currentTime > 60) {
				console.log('setSnippet: currentTime > 60: calling nextSong()');
				nextSong();
			}
		});
		scPlayer.on('ended', () => {
			console.log('Playback Unexpectedly ended. Skipping to Next Song');
			console.log('setSnippet: onEnded: calling nextSong()');
			nextSong();
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
	const { trackIndex, playlist } = getState().audio;
	// If trackIndex+ int is out of range of playlist length, return 0;
	if (trackIndex + int >= playlist.length || trackIndex + int < 0) {
		dispatch(updateCurrentIndexAction(0));
		return 0;
	} else {
		dispatch(updateCurrentIndexAction(trackIndex + int));
		return trackIndex + int;
	}
};

// Swipe with Next Song
export const nextSong = async (
	swipeDirection = 'LEFT',
	opts = { disableForceSwipe: false },
) => {
	const { getState, dispatch } = store;
	const { scPlayer, playlist } = getState().audio;

	console.log('nextSong 0');

	// If Anything other than manual swipe occurs, Force Swipe Card
	if (!opts.disableForceSwipe) {
		console.log('audioplayer Actions: nextSong: Force Swipe called');
		return forceSwipeCard(swipeDirection);
	}

	console.log('nextSong 1');

	try {
		// pauseSnippet();

		// Index ?
		const newTrackIndex = await _incrementIndex(1);
		const nextTrack = playlist[newTrackIndex];

		console.log('nextSong 2');

		dispatch(nextSnippetAction(newTrackIndex, nextTrack));

		console.log('nextSong 3');

		const newCurrentTrackIndex = getState().audio.trackIndex;
		const newCurrentTrack = getState().audio.playlist[newCurrentTrackIndex];

		// console.log("nextTrack MATCHES newCurrentTrack", nextTrack.id === newCurrentTrack.id)

		const streamUrl = _createStreamUrl(newCurrentTrack.id);

		console.log('nextSong 4');

		// Play Snippet
		await scPlayer.play({
			streamUrl,
		});

		console.log('nextSong 5');

		// Set Snippet Interval
		await setSnippet();

		console.log('nextSong 6');
	} catch (err) {
		console.log('nextSong:', err.message);
	}
};

export const prevSong = async () => {
	const { getState, dispatch } = store;
	const { playlist } = getState().audio;

	try {
		const newTrackIndex = await _incrementIndex(-1);
		if (newTrackIndex === 0) {
			await getTrack(0);
			await playSnippet();
			await setSnippet();
			return;
		}
		console.log('prevSong:', newTrackIndex);

		await getTrack(newTrackIndex);
		await playSnippet();
		await setSnippet();
		const nextTrack = playlist[newTrackIndex];
		// const streamUrl = _createStreamUrl(nextTrack.id);
		// await scPlayer.play({
		// 	streamUrl,
		// });
		// await setSnippet();
		dispatch(prevSnippetAction(newTrackIndex, nextTrack));
	} catch (err) {
		console.log('prevSong:', err.message);
	}
};

export const updatePlaylist = async (url = PLUG_PLAYLIST_URL) => {
	const { dispatch } = store;
	try {
		console.log('updatePlaylist: getting playlist:', url);
		const response = await SC.resolve(url);
		console.log(response);

		let shortURL;

		switch (response.kind) {
			case 'playlist':
				console.log('Searched Playlist');
				let { tracks, title } = response;
				// Get ShortID of playlist
				shortURL = await getShortURLFromPlaylistURL(url);
				console.log('SHORTURL', shortURL);
				dispatch(clearPlaylistAction());
				dispatch(
					updatePlaylistAction(tracks, title, url, shortURL, response.kind),
				);
				break;
			case 'user':
				let user = response;
				console.log(`Searched User: ${user.id}`);
				// Search user's tracks
				tracks = await SC.get('/tracks', {
					user_id: user.id,
					limit: 100,
				});
				title = user.permalink;
				shortURL = await getShortURLFromPlaylistURL(url);
				console.log('SHORTURL', shortURL);
				dispatch(clearPlaylistAction());
				dispatch(
					updatePlaylistAction(tracks, title, url, shortURL, response.kind),
				);
				break;
			case 'track':
				console.log('Searched Track', response);
				title = response.title;
				tracks = [response];
				shortURL = await getShortURLFromPlaylistURL(url);
				dispatch(clearPlaylistAction());
				dispatch(
					updatePlaylistAction(tracks, title, url, shortURL, response.kind),
				);
				break;
			default:
				break;
		}

		await getTrack(0);
		await playSnippet();
		await setSnippet();
	} catch (err) {
		console.log('updatePlaylist:', err);
		dispatch(getSearchErrorAction(err));
		// this.setState({ errorMessage: err.message });
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

export const getShortURLFromPlaylistURL = async playlistURL => {
	try {
		const shortID = await setShortURL(playlistURL);
		const shortURL = baseURL + shortID;
		return shortURL;
	} catch (err) {
		console.log('getShortURLFromPlaylistURL:', err);
	}
};

// Swipe The Fucking Card on the screen

const forceSwipeCard = swipeDirection => {
	const { swipeFunction } = window;

	switch (swipeDirection) {
		case LEFT:
			console.log('ACTIONS: forceSwipeCard: Calling swipeFunction.left()');
			swipeFunction.left();
			return;
		case RIGHT:
			console.log('ACTIONS: forceSwipeCard: Calling swipeFunction.right()');
			swipeFunction.right();
			return;
		default:
			console.log('ACTIONS: forceSwipeCard: Calling swipeFunction.left()');
			swipeFunction.left();
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

const clearPlaylistAction = nextTrack => ({
	type: types.CLEAR_PLAYLIST,
});

const updateCurrentIndexAction = trackIndex => ({
	type: types.UPDATE_CURRENT_INDEX,
	payload: trackIndex,
});
