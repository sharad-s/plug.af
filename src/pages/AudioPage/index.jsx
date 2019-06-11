import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
// import isEmpty from '../../utils/isEmpty';

// Subcomponents
import AudioPlayer from '../../components/AudioPlayer';
import ButtonsPanel from '../../components/ButtonsPanel';

// Mixpanel

import { Mixpanel } from '../../utils/mixpanel';
import { track_LoadedPlugPage } from '../../utils/mixpanel';


// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  connectSoundcloud,
  updatePlaylist,
  getTrack,
  playSnippet,
  setSnippet,
  getPlaylistFromShortID,
} from '../../features/audioplayer/actions';

// Playlist
class AudioPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      value: '',
    };
  }

  async componentDidMount() {
    window.scrollTo(0, 1);
    Mixpanel.track('loaded_Plug');

    await connectSoundcloud();

    let playlistURL;
    const { shortID } = this.props.match.params;

    if (shortID) {
      // Get playlistURL from ShortID
      playlistURL = await getPlaylistFromShortID(shortID);
      track_LoadedPlugPage(shortID);
    }

    // Check for any query params (link sharing)
    // let { playlistURL } = queryString.parse(this.props.location.search);
    await updatePlaylist(playlistURL);
    await getTrack(0);
    await playSnippet();
    await setSnippet();
  }

  render() {
    const { audio } = this.props;

    const renderedPlaylistName = audio.playlistName ? (
      <h3>Playlist {audio.playlistName} </h3>
    ) : null;

    return (
      <Fragment>
        <AudioPlayer
          tracks={this.state.tracks}
          playlistName={this.state.playlistName}
          renderedPlaylistName={renderedPlaylistName}
        />

        <ButtonsPanel />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  audio: state.audio,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      connectSoundcloud,
      updatePlaylist,
    },
    dispatch,
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AudioPage),
);
