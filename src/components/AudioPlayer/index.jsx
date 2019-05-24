import React, { Component, Fragment } from 'react';

// Utils
import isEmpty from '../../utils/isEmpty';

// SubComponents
import SwipableCards from "../SwipableCards"
import ButtonsPanel from "../ButtonsPanel"

// Redux
import { connect } from 'react-redux';
import {
  pauseSnippet,
  playSnippet,
  setSnippet,
} from '../../features/audioplayer/actions';

// Buttons
import like from '../../images/like.svg';
import dislike from '../../images/cancel.svg';
import goback from '../../images/go-back.svg';
import share from '../../images/share.svg';

class AudioPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      tracks: {},
      trackIndex: 0,
      currentTrack: {},
      scPlayer: {},
      currentTime: 0,
    };
  }

  handleClick = async e => {
    const { isPlaying } = this.props.audio;
    e.preventDefault();
    console.log('Clicked');
    if (isPlaying) {
      this.pauseSong();
    } else {
      this.playSong();
    }
  };

  async playSong() {
    await playSnippet();
    await setSnippet();
  }

  async pauseSong() {
    await pauseSnippet();
  }


  render() {
    const { audio } = this.props;

    const renderedPlayButtonText = audio.isPlaying ? (
      <i className="fas fa-pause" />
    ) : (
      <i className="fas fa-play" />
    );

    const renderedPlayButton = audio.title ? (
      <button onClick={this.handleClick}>{renderedPlayButtonText}</button>
    ) : null;

    return (
      <Fragment>
        <SwipableCards renderedPlayButton={renderedPlayButton} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  audio: state.audio,
});

export default connect(
  mapStateToProps,
)(AudioPage); // {renderedTrackArtwork} //         {renderedTrackMetadata} //         {renederedSeconds} //         {renderedPlaylistName} //         {renderedPlayButton}
