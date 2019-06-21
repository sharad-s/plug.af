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
      showDiv: true,
    };

    this.clickDiv = this.clickDiv.bind(this);
  }

  async componentDidMount() {}

  clickDiv() {
    console.log('clicked');
    window.scrollTo(0, 1);
    Mixpanel.track('loaded_Plug');

    connectSoundcloud();

    let playlistURL;
    const { shortID } = this.props.match.params;

    if (shortID) {
      // Get playlistURL from ShortID
      playlistURL = getPlaylistFromShortID(shortID);
      track_LoadedPlugPage(shortID);
    }

    // Check for any query params (link sharing)
    // let { playlistURL } = queryString.parse(this.props.location.search);
    updatePlaylist(playlistURL);
    getTrack(0);
    playSnippet();
    setSnippet();

    this.setState({ showDiv: false });
  }

  render() {
    const { audio } = this.props;

    const renderedPlaylistName = audio.playlistName ? (
      <h3>Playlist {audio.playlistName} </h3>
    ) : null;

    return (
      <Fragment>
        {this.state.showDiv && (
          <div class="start-overlay" onClick={this.clickDiv}>
            <center>
              <h1 class="overlay-text">15</h1>
              <h1 class="overlay-text">Second</h1>
              <h1 class="overlay-text">Songs</h1>
              <br />
              <br />
              <br />
              <h1 class="overlay-text">Tap</h1>
              <br />
              <h1 class="overlay-text">Anywhere</h1>
            </center>
          </div>
        )}

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
