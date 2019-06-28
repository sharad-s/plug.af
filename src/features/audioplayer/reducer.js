import * as types from './types';

const initialState = {
  scPlayer: {},
  playlist: {},
  currentTime: 0,
  isPlaying: false,
  plugs: [],
  trackIndex: 0,
  plugIndex: 0,
  currentTrack: {},
  currentPlug: {},
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
      // console.log('PLAY_SNIPPET', action.payload);
      return {
        ...state,
        isPlaying: true,
        // currentTrack: action.payload,
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

    // NEW
    case types.NEW_UPDATE_PLUG:
      return {
        ...state,
        plugs: [...state.plugs, action.payload],
        currentPlug: action.payload,
      };

    case types.NEW_APPEND_PLUG:
      return {
        ...state,
        plugs: [...state.plugs, action.payload],
      };

    // Cannot hardcode +1 =1 in reducer because need to check boundaries of range before setting new Index.
    case types.NEW_SHIFT_CURRENT_PLUG:
      return {
        ...state,
        plugIndex: action.payload.newPlugIndex,
        currentPlug: state.plugs[action.payload.newPlugIndex],
      };

    /* Tracks */
    case types.NEW_SHIFT_CURRENT_TRACK:
      return {
        ...state,
        trackIndex: action.payload.trackIndex,
        currentTrack: action.payload.currentTrack,
        isPlaying: true,
      };

    default:
      return state;
  }
}
