import React, { Component, Fragment } from 'react';

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

class Overlay extends Component {



  clickDiv = async () => {
    this.props.changeDiv();
    await playSnippet();
    await setSnippet();
  }


  render() {
    const renderedOverlay = this.props.showDiv ? (
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
    ) : null;

    return <Fragment>{renderedOverlay}</Fragment>;
  }
}

export default Overlay;
