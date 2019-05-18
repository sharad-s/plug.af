import React, { Component, Fragment } from 'react';

import isEmpty from '../../utils/isEmpty';

// subComponents
// import AudioInfo from './AudioInfo';
import CopyURLButton from '../ShareButtons/CopyURLButton';
import TweetButton from '../ShareButtons/TweetButton';

// import SnippetCard from "../SnippetCard";

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import like from '../../images/like.svg';
import dislike from '../../images/cancel.svg';

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
    console.log(currentTrack);
    // Populate Track Data if exists
    if (!isEmpty(currentTrack)) {
      var { title, user, artwork_url } = currentTrack;
      // Use User Avatar if track art empty
      if (isEmpty(artwork_url)) {
        artwork_url = user.avatar_url;
      }

      renderedTrackMetadata = (
        <Fragment>
          <h1> {title} </h1>
          <h2> {user.username} </h2>
        </Fragment>
      );

      renderedTrackArtwork = (
        <img src={artwork_url} alt={title} width="150vh;" />
      );
    }

    const renderedPlayButtonText = isPlaying ? (
      <i className="fas fa-pause" />
    ) : (
      <i className="fas fa-play" />
    );

    const renderedPlayButton = audio.title ? (
      <button onClick={this.handleClick}>{renderedPlayButtonText}</button>
    ) : null;

    // const renderedNextButton = isPlaying ? (
    //   <button onClick={this.nextSnippet}>
    //     <i className="fas fa-forward" />
    //   </button>
    // ) : null;

    const renderedDooDooButton = true ? (
      <img src={dislike} class="button-in" onClick={this.handleDooFeedback} />
    ) : null;
    const renderedFireButton = true ? (
      <img src={like} class="button-in" onClick={this.handleFireFeedback} />
    ) : null;
    const renderedPrevButton =
      trackIndex !== 0 ? (
        <button onClick={this.prevSnippet}>
          <i className="fas fa-backward" />
        </button>
      ) : null;
    const renederedSeconds = isPlaying ? (
      <p>0:{Math.floor(audio.currentTime)} / 0:60 </p>
    ) : null;
    return (
      <Fragment>
        <div class="cards-list">
          <div class="card 1">
            <div class="card_image">
              {' '}
              <img src={artwork_url} />{' '}
            </div>
            <div class="card_title title-white" />
            <center>
              <div class="information-overlay">
                <div class="details">
                  <span>
                    {audio.currentTrack.title ? (
                      audio.currentTrack.title
                    ) : (
                      <div />
                    )}
                  </span>
                  <span>
                    {' '}
                    {audio.currentTrack.user ? (
                      audio.currentTrack.user.username
                    ) : (
                      <div />
                    )}
                  </span>
                </div>
              </div>
            </center>
            <a class="pure-button btn-sc" href="#">
              Listen on Soundcloud <i class="fab fa-soundcloud" />
            </a>
          </div>
        </div>

        <center>
          <br />
          <br />
          <div class="buttons-panel">
            {renderedDooDooButton}
            {renderedFireButton}
          </div>
          <br />
          <div class="container">
            <a class="pure-button btn-share" href="#">
              Share <i class="fas fa-share-square" />
            </a>
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
