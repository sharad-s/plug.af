import mixpanel from 'mixpanel-browser';
mixpanel.init('09b58dad5bc10144b8dc9463faefa76c');

let env_check = process.env.NODE_ENV === 'production';

// Mixpanel Action Types
const LOADED_CREATE_PAGE = 'LOADED_CREATE_PAGE';
const LOADED_PLUG_PAGE = 'LOADED_PLUG_PAGE';
const LOADED_PREVIEW_PAGE = 'LOADED_PREVIEW_PAGE';
const LOADED_EXPLORE_PAGE = 'LOADED_EXPLORE_PAGE';

const CLICKED_PLUG_ON_EXPLORE = 'CLICKED_PLUG_ON_EXPLORE';


const PLAY_SNIPPET = 'PLAY_SNIPPET';
const NEXT_SNIPPET = 'NEXT_SNIPPET';
const PREV_SNIPPET = 'PREV_SNIPPET';

const SHARE_PLUG = 'SHARE_PLUG';
const CREATE_PLUG = 'CREATE_PLUG';

const REGISTERED_USER = 'REGISTERED_USER';
const LOGGED_IN_USER = 'LOGGED_IN_USER';

let actions = {
  identify: id => {
    if (env_check) mixpanel.identify(id);
  },
  alias: id => {
    if (env_check) mixpanel.alias(id);
  },
  track: (name, props) => {
    if (env_check) mixpanel.track(name, props);
  },
  people: {
    set: props => {
      if (env_check) mixpanel.people.set(props);
    },
  },
};

export let Mixpanel = actions;

// Mixpanel trackers
const track = {
  plugPage: {
    loaded: (plugID = null) => Mixpanel.track(LOADED_PLUG_PAGE, { plugID }),
    playSnippet: (
      payload = {
        plugID: null,
        trackIndex: null,
        trackTitle: null,
        trackArtist: null,
        soundcloudID: null,
      },
    ) => {},
  },
};

// Pages

// Infinite Swipe
export const track_LoadedPlugPage = (plugID = null) => {
  Mixpanel.track(LOADED_PLUG_PAGE, { plugID });
};

export const track_LoadedHomePage = () => {
  Mixpanel.track(LOADED_CREATE_PAGE);
};

export const track_LoadedPreviewPage = (plugID = null) => {
  Mixpanel.track(LOADED_PREVIEW_PAGE, { plugID });
};

export const track_LoadedExplorePage = () => {
  Mixpanel.track(LOADED_EXPLORE_PAGE);
}

export const track_ClickedPlugOnExplore = (plugID = null) => {
  Mixpanel.track(CLICKED_PLUG_ON_EXPLORE, {plugID});

}

export const track_PlaySnippet = (
  payload = {
    plugURL: null,
    trackIndex: null,
    // track: null
    trackTitle: null,
    trackArtist: null,
    soundcloudID: null,
  },
) => {
  Mixpanel.track(PLAY_SNIPPET, payload);
};

export const track_NextSnippet = (
  payload = {
    newSnippetIndex: null,
    shortID: null,
    trackTitle: null,
    trackArtist: null,
    action: null,
  },
) => {
  // Dispatch Different Paylods for Like / Dislike
  switch (payload.action) {
    case 'LIKE':
      Mixpanel.track(NEXT_SNIPPET, payload);
      break;
    case 'SKIP':
      Mixpanel.track(NEXT_SNIPPET, payload);
      break;
    default:
      payload.action = null;
      Mixpanel.track(NEXT_SNIPPET, payload);
      break;
  }
};

export const track_PrevSnippet = (payload = { newSnippetIndex: null }) => {
  Mixpanel.track(PREV_SNIPPET, payload);
};

export const track_SharePlug = (payload = { plugID: null, method: null }) => {
  Mixpanel.track(SHARE_PLUG, payload);
};

export const track_CreatePlug = (
  payload = { plugID: null, soundcloudURL: null },
) => {
  Mixpanel.track(CREATE_PLUG, payload);
};

export const track_RegisteredUser = (
  payload = { email: null, username: null },
) => {
  Mixpanel.track(REGISTERED_USER, payload);
};

export const track_LoggedInUser = (
  payload = { email: null, username: null },
) => {
  Mixpanel.track(LOGGED_IN_USER, payload);
};
