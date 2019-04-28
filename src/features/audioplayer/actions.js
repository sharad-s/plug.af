import SoundCloudAudio from 'soundcloud-audio';
import SC from 'soundcloud';

import * as types from './types';

import {
	getSoundcloudErrorsAction,
	getSearchErrorAction,
} from '../errors/actions';

import store from '../../state/store';

const PLUG_PLAYLIST_URL = 'https://soundcloud.com/tenasa/sets/delicious';

const CLIENT_ID = '47159083054685525f6b73d25e2560b9';

SC.initialize({
	client_id: CLIENT_ID,
	redirect_uri: 'http://03d0923f.ngrok.io',
});

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
		await scPlayer.pause();
		dispatch(pauseSnippetAction());
	} catch (err) {
		console.log('pauseSnippet:', err.message);
	}
};

export const getTrack = async index => {
	const { getState, dispatch } = store;
	const { playlist } = getState().audio;

	const track = playlist[index];
	console.log('gettrack', track);
	dispatch(getTrackAction(track));
};

export const playSnippet = async () => {
	const { getState, dispatch } = store;
	const { scPlayer, playlist, trackIndex } = getState().audio;

	const track = playlist[trackIndex];

	try {
		// Create Stream URL
		const streamUrl = _createStreamUrl(track.id);
		console.log('playSnippet:', streamUrl);
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
				nextSong();
			}
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
	const { getState } = store;
	const { trackIndex, playlist } = getState().audio;
	if (trackIndex + int >= playlist.length || trackIndex + int < 0) {
		return 0;
	} else {
		return trackIndex + int;
	}
};

export const nextSong = async () => {
	const { getState, dispatch } = store;
	const { scPlayer, playlist } = getState().audio;

	try {
		const newTrackIndex = await _incrementIndex(1);
		console.log(newTrackIndex);
		if (newTrackIndex === 0) {
			await updatePlaylist();
			return;
		}
		const nextTrack = playlist[newTrackIndex];
		const streamUrl = _createStreamUrl(nextTrack.id);
		await scPlayer.play({
			streamUrl,
		});

		await setSnippet();

		dispatch(nextSnippetAction(newTrackIndex, nextTrack));
	} catch (err) {
		console.log('nextSong:', err.message);
	}
};

export const prevSong = async () => {
	const { getState, dispatch } = store;
	const { scPlayer, playlist } = getState().audio;

	try {
		const newTrackIndex = await _incrementIndex(-1);
		console.log('prevSong:', newTrackIndex);
		const nextTrack = playlist[newTrackIndex];
		const streamUrl = _createStreamUrl(nextTrack.id);
		await scPlayer.play({
			streamUrl,
		});

		await setSnippet();

		dispatch(prevSnippetAction(newTrackIndex, nextTrack));
	} catch (err) {
		console.log('prevSong:', err.message);
	}
};

export const updatePlaylist = async (url = PLUG_PLAYLIST_URL) => {
	const { dispatch } = store;
	try {
		console.log('updatePlaylist: getting playlist:', url);
		let playlist = await SC.resolve(url);
		console.log('updatePlaylist:', playlist);
		const { tracks, title } = playlist;

		dispatch(clearPlaylistAction());
		dispatch(updatePlaylistAction(tracks, title, url));
		await getTrack(0);
		await playSnippet();
		await setSnippet();
		// playlist = { tracks, playlistTitle: title, playlistURL: url };
		// // dispatch(appendPlaylistAction(playlist));

		// this.setState({ tracks, playlistName: title, playlistURL: url });
	} catch (err) {
		console.log('updatePlaylist:', err);
		dispatch(getSearchErrorAction(err));
		// this.setState({ errorMessage: err.message });
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

const updatePlaylistAction = (tracks, playlistTitle, playlistURL) => ({
	type: types.UPDATE_PLAYLIST,
	payload: { tracks, playlistTitle, playlistURL },
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

const getTrackAction = nextTrack => ({
	type: types.GET_TRACK,
	payload: nextTrack,
});

const clearPlaylistAction = nextTrack => ({
	type: types.CLEAR_PLAYLIST,
});
