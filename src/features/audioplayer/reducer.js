import * as types from './types';

const initialState = {
  scPlayer: {},
  playlist: {},
  playlists: [],
  playlistName: '',
  playlistURL: '',
  shortURL: '',
  currentTrack: {},
  trackIndex: 0,
  currentTime: 0,
  errorMessage: '',
  isPlaying: false,
  kind: '',
  title: '',
  currentIndex: 0,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.CONNECT_SOUNDCLOUD:
      return {
        ...state,
        scPlayer: action.payload.scPlayer,
      };

    case types.UPDATE_PLAYLIST:
      return {
        ...state,
        playlist: action.payload.tracks,
        title: action.payload.title,
        kind: action.payload.kind,
        playlistURL: action.payload.playlistURL,
        shortURL: action.payload.shortURL,
      };

    case types.APPEND_PLAYLIST:
      return {
        ...state,
        playlists: [...state.playlists, action.payload],
      };

    case types.UPDATE_TRACK_TIME:
      return {
        ...state,
        currentTime: action.payload.currentTime,
      };

    case types.PLAY_SNIPPET:
      console.log('PLAY_SNIPPET', action.payload);
      return {
        ...state,
        isPlaying: true,
        currentTrack: action.payload,
      };

    case types.PAUSE_SNIPPET:
      return {
        ...state,
        isPlaying: false,
      };

    case types.NEXT_SNIPPET:
      return {
        ...state,
        trackIndex: action.payload.trackIndex,
        currentTrack: action.payload.currentTrack,
        isPlaying: true,
      };

    case types.PREV_SNIPPET:
      return {
        ...state,
        trackIndex: action.payload.newTrackIndex,
        currentTrack: action.payload.nextTrack,
        isPlaying: true,
      };

    case types.SET_SNIPPET:
      return {
        ...state,
      };

    case types.GET_TRACK:
      return {
        ...state,
        currentTrack: action.payload.nextTrack,
        trackIndex: action.payload.nextIndex,
      };

    case types.CLEAR_PLAYLIST:
      return {
        ...state,
        playlist: {},
      };
    case types.SET_SHORT_ID:
      return {
        ...state,
        shortID: action.payload,
      };

    case types.UPDATE_CURRENT_INDEX:
      return {
        ...state,
        currentIndex: action.trackIndex,
      };

    default:
      return state;
  }
}
