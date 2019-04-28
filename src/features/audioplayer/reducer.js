import * as types from './types';

const initialState = {
  scPlayer: {},
  playlist: {},
  playlists: [],
  playlistName: '',
  playlistURL: '',
  currentTrack: {},
  trackIndex: 0,
  currentTime: 0,
  errorMessage: '',
  isPlaying: false,
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
        playlistName: action.payload.playlistTitle,
        playlistURL: action.payload.playlistURL,
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
        trackIndex: action.payload.trackIndex,
        currentTrack: action.payload.currentTrack,
        isPlaying: true,
      };

    case types.SET_SNIPPET:
      return {
        ...state,
      };

    case types.GET_TRACK:
      return {
        ...state,
        currentTrack: action.payload,
      };

      case types.CLEAR_PLAYLIST:
      return {
        ...state, 
        playlist: {}
      }

    default:
      return state;
  }
}
