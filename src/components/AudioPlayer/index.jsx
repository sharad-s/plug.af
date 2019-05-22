import React, { Component, Fragment } from 'react';

import isEmpty from '../../utils/isEmpty';

// subComponents
// import AudioInfo from './AudioInfo';
import CopyURLButton from '../ShareButtons/CopyURLButton';
import TweetButton from '../ShareButtons/TweetButton';
import Beatcard from '../Beatcard';

// import SnippetCard from "../SnippetCard";

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import like from '../../images/like.svg';
import dislike from '../../images/cancel.svg';
import goback from '../../images/go-back.svg';
import share from '../../images/share.svg';

import {
  connectSoundcloud,
  pauseSnippet,
  playSnippet,
  setSnippet,
  nextSong,
  prevSong,
} from '../../features/audioplayer/actions';

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

  handleFireFeedback = async () => {
    // alert('You voted this track a banger!');
    await this.nextSnippet();
  };

  handleDooFeedback = async () => {
    // alert('You voted this track as whack!');
    await this.nextSnippet();
  };

  async playSong() {
    await playSnippet();
    await setSnippet();
  }

  async pauseSong() {
    await pauseSnippet();
  }

  nextSnippet = async () => {
    await nextSong();
    // await setSnippet();
  };

  prevSnippet = async () => {
    await prevSong();
    // await setSnippet();
  };

  render() {
    const { audio } = this.props;
    const { isPlaying, currentTrack, trackIndex } = audio;

    let renderedTrackMetadata, renderedTrackArtwork;
    // console.log(currentTrack);
    // Populate Track Data if exists
    if (!isEmpty(currentTrack)) {
      var { title, user, artwork_url } = currentTrack;
      // Use User Avatar if track art empty
      if (isEmpty(artwork_url)) {
        artwork_url = user.avatar_url;
      }
    }

    const renderedPlayButtonText = isPlaying ? (
      <i className="fas fa-pause" />
    ) : (
      <i className="fas fa-play" />
    );

    const renderedPlayButton = audio.title ? (
      <button onClick={this.handleClick}>{renderedPlayButtonText}</button>
    ) : null;

    const renderedDooDooButton = true ? (
      <img src={dislike} class="button-in" onClick={this.handleDooFeedback} />
    ) : null;
    const renderedFireButton = true ? (
      <img src={like} class="button-in sm" onClick={this.handleFireFeedback} />
    ) : null;

 

    const prevButtonStyle =  trackIndex !== 0 ? {visibility: "visible"} : {visibility: "hidden"};
   
    const renderedPrevButton = (
        <img
          src={goback}
          class="button-in button-small"
          onClick={this.prevSnippet}
          style={prevButtonStyle}
        />
      );

    const renederedSeconds = isPlaying ? (
      <p>0:{Math.floor(audio.currentTime)} / 0:60 </p>
    ) : null;

    const secondsPassed = audio.currentTime - 45;

    const renderedShareButton = (
      <img
        src={share}
        class="button-in button-small"
        onClick={this.prevSnippet}
      />
    );

    return (
      <Fragment>
        <Beatcard
          renderedPlayButton={renderedPlayButton}
          trackArtworkURL={artwork_url}
          audio={audio}
          secondsPassed={secondsPassed}
        />

        <center>
          <div class="buttons-panel noselect">
            {renderedPrevButton}
            {renderedDooDooButton}
            {renderedFireButton}
            {renderedShareButton}
          </div>
          
        </center>
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
      pauseSnippet,
      playSnippet,
      setSnippet,
      nextSong,
      prevSong,
    },
    dispatch,
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AudioPage); // {renderedTrackArtwork} //         {renderedTrackMetadata} //         {renederedSeconds} //         {renderedPlaylistName} //         {renderedPlayButton}
