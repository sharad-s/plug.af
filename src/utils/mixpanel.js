import mixpanel from 'mixpanel-browser';
mixpanel.init('09b58dad5bc10144b8dc9463faefa76c');

let env_check = process.env.NODE_ENV === 'production';

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
