import * as types from './types';

const initialState = {
  scPlayer: {},
  currentTime: 0,
  isPlaying: false,
  plugs: [],
  plugIndex: 0,
  trackIndex: 0,
  playlist: [{}],
  totalTrackCount: 0,
  totalTrackIndex: 0,
  currentTrack: {},
  currentPlug: {
    snippets: [],
  },
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
        // loading: false
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
        playlist: [],
        // plugs: [],
        totalTrackCount: 0,
        totalTrackIndex: 0,
        plugIndex: 0,
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
        currentPlug: action.payload,
        plugs: [...state.plugs, action.payload],
        playlist: [...state.playlist, ...action.payload.snippets],
        totalTrackCount: state.totalTrackCount + action.payload.snippets.length,
      };

    case types.NEW_APPEND_PLUG:
      return {
        ...state,
        plugs: [...state.plugs, action.payload],
        playlist: [...state.playlist, ...action.payload.snippets],
        totalTrackCount: state.totalTrackCount + action.payload.snippets.length,
      };

    // Cannot hardcode +1 =1 in reducer because need to check boundaries of range before setting new Index.
    case types.NEW_UPDATE_PLUG_INDEX:
      return {
        ...state,
        plugIndex: action.payload,
        currentPlug: state.plugs[action.payload],
      };

    /* Tracks */
    case types.NEW_UPDATE_TRACK_INDEX:
      return {
        ...state,
        trackIndex: action.payload,
        currentTrack: state.currentPlug.snippets[action.payload],
        isPlaying: true,
      };

    /* Tracks */
    case types.NEW_INCREMENT_TOTAL_TRACK_INDEX:
      return {
        ...state,
        totalTrackIndex: state.totalTrackIndex + action.payload,
      };

    /* Loading */
    case types.TRACK_LOADING:
      return {
        ...state,
        // loading: true
      };

    default:
      return state;
  }
}
