import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
// import isEmpty from '../../utils/isEmpty';

// Subcomponents
import AudioPlayer from '../../components/AudioPlayer';
import ButtonsPanel from '../../components/ButtonsPanel';
import Overlay from '../../components/Overlay';
import { Loader } from '../../components/Loader';

// Mixpanel

import { Mixpanel } from '../../utils/mixpanel';
import { track_LoadedPlugPage } from '../../utils/mixpanel';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  connectSoundcloud,
  newUpdatePlaylist,
  // updatePlaylist,
  getTrack,
  playSnippet,
  setSnippet,
  getPlaylistFromShortID,
} from '../../features/audioplayer/actions';

import { getPlugByShortID, getRandomPlug } from '../../features/plugs/actions';

// Playlist
class AudioPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      value: '',
      showDiv: false,
      playlistURL: '',
    };
  }

  async componentDidMount() {
    window.scrollTo(0, 1);
    Mixpanel.track('loaded_Plug');

    connectSoundcloud();

    let playlistURL, plug;
    const { shortID } = this.props.match.params;

    if (shortID) {
      // Get playlistURL from ShortID
      // playlistURL = await getPlaylistFromShortID(shortID); FIXME:// REMOVING THIS MAKES ALL PREVIOUS PLUGS INCOMPATIBLE
      plug = await getPlugByShortID(shortID);
      track_LoadedPlugPage(shortID);
    } else {
      plug = await getRandomPlug();
    }

    // Check for any query params (link sharing)
    // let { playlistURL } = queryString.parse(this.props.location.search);

    await newUpdatePlaylist(plug);
    console.log('componentDidMount:GETTING TRACK');
    await getTrack(0);

    if (this.state.showDiv === false) {
      await playSnippet();
      await setSnippet();
    }

    console.log('componentDidMount:READY');

    // this.setState({ showDiv: false });
  }

  changeDiv() {
    this.setState({
      showDiv: false,
    });
  }

  render() {
    const { audio, plug } = this.props;

    const renderedPlaylistName = audio.playlistName ? (
      <h3>Playlist {audio.playlistName} </h3>
    ) : null;

    const renderedPage = plug.loading ? (
      <div className="audiopage-loader-container">
        <Loader />
      </div>
    ) : (
      <Fragment>
        <AudioPlayer
          tracks={this.state.tracks}
          playlistName={this.state.playlistName}
          renderedPlaylistName={renderedPlaylistName}
        />

        <ButtonsPanel />
      </Fragment>
    );

    return <Fragment>{renderedPage}</Fragment>;
  }
}

const mapStateToProps = state => ({
  audio: state.audio,
  plug: state.plug,
});

export default withRouter(connect(mapStateToProps)(AudioPage));
