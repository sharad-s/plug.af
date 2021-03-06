import React, { Component, Fragment } from 'react';

import isEmpty from '../../utils/isEmpty';

// subComponents
// import AudioInfo from './AudioInfo';
import CopyURLButton from '../ShareButtons/CopyURLButton';
import TweetButton from '../ShareButtons/TweetButton';
import {Card} from "../BeatCard"

// import SnippetCard from "../SnippetCard";

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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

    let trackTitle, trackArtist = "";

    // Populate Track Data if exists
    if (!isEmpty(currentTrack)) {
      var { title, user, artwork_url } = currentTrack;
      // Use User Avatar if track art empty
      if (isEmpty(artwork_url)) {
        artwork_url = user.avatar_url;
      }

      trackTitle= title; 
      trackArtist = user.username;
      renderedTrackMetadata = (
        <Fragment>
          <h1> {title} </h1>
          <h2> {user.username} </h2>
        </Fragment>
      );

      renderedTrackArtwork = (
        <img src={artwork_url} alt={title} width="150vw" />
      );
    }

    const renderedPlayButtonText = isPlaying ? (
      <i className="fas fa-pause" />
    ) : (
      <i className="fas fa-play" />
    );

    const renderedPlayButton = audio.title ? (
      <button style={{color: "white"}}onClick={this.handleClick}>{renderedPlayButtonText}</button>
    ) : null;

    // const renderedNextButton = isPlaying ? (
    //   <button onClick={this.nextSnippet}>
    //     <i className="fas fa-forward" />
    //   </button>
    // ) : null;

    const renderedDooDooButton = true ? (
      <button className="feedback-btn" onClick={this.handleDooFeedback}>
        <span role="img" aria-label="DooDoo">
          💩
        </span>
        <br />
      </button>
    ) : null;

    const renderedFireButton = true ? (
      <button className="feedback-btn" onClick={this.handleFireFeedback}>
        <span role="img" aria-label="Fire">
          🔥
        </span>
        <br />
      </button>
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
      <div className="info-album">

        <div className="flex-col flex-centered">
          <span className="playing-from-text"> Playing from {audio.kind}:</span>
          <p className="playing-from-text">
            <a className="hover-red" href={audio.playlistURL}>{audio.title}</a>
          </p>
        </div>

        <div className="flex-horiz flex-centered">
          <div className="emoji grow">
            {renderedDooDooButton}
            <br />
          </div>
        <Card imageSrc={artwork_url} trackTitle={trackTitle} trackArtist={trackArtist} renderedPlayButton={renderedPlayButton} />
          
          <div className="emoji grow">{renderedFireButton}</div>
        </div>

        <div className="" style={{marginTop:"5vh;"}}>{renederedSeconds}</div>

        <div className="toggles flex-horiz flex-centered">
          {renderedPrevButton}
          {renderedPlayButton}
        </div>
        <br />

        <span className="">Share This Plug: </span>
        <ul className="flex-horiz socials">
          <li>
            <TweetButton />
          </li>
          <li>
            <CopyURLButton />
          </li>
        </ul>
      </div>
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
