import React, { Component } from 'react';
import { withRouter } from 'react-router';
// import isEmpty from '../../utils/isEmpty';

// Subcomponents
import AudioPlayer from '../AudioPlayer';

// Mixpanel

import { Mixpanel } from '../../utils/mixpanel';

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
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    }

    // Check for any query params (link sharing)
    // let { playlistURL } = queryString.parse(this.props.location.search);
    await updatePlaylist(playlistURL);
    await getTrack(0);
    await playSnippet();
    await setSnippet();
  }

  // Form Change
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  // Form input for custom playlist
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ errorMessage: '' });
    const url = this.state.value;
    updatePlaylist(url);
  }

  render() {
    const { audio } = this.props;

    const renderedPlaylistName = audio.playlistName ? (
      <h3>Playlist {audio.playlistName} </h3>
    ) : null;

    return (
      <AudioPlayer
        tracks={this.state.tracks}
        playlistName={this.state.playlistName}
        renderedPlaylistName={renderedPlaylistName}
      />
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
