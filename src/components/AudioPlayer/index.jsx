import React, { Component } from 'react';

import isEmpty from '../../utils/isEmpty';

// subComponents
// import AudioInfo from './AudioInfo';
import CopyURLButton from '../CopyURLButton';
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
    alert('You voted this track a banger!');
  };

  handleDooFeedback = async () => {
    alert('You voted this track as whack!');
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
    await setSnippet();
  };

  render() {
    const { audio } = this.props;
    const { isPlaying, currentTrack } = audio;

    let renderedTrackMetadata, renderedTrackArtwork;

    // Populate Track Data if exists
    if (!isEmpty(currentTrack)) {
      var { title, user, artwork_url } = currentTrack;
      // Use User Avatar if track art empty
      if (isEmpty(artwork_url)) {
        artwork_url = user.avatar_url;
      }

      renderedTrackMetadata = (
        <div>
          <h1> {title} </h1>
          <h2> {user.username} </h2>
        </div>
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

    const renderedPlayButton = audio.playlistName ? (
      <button onClick={this.handleClick}>{renderedPlayButtonText}</button>
    ) : null;

    const renderedNextButton = isPlaying ? (
      <button onClick={this.nextSnippet}>
        <i className="fas fa-forward" />
      </button>
    ) : null;
    // const renderedPrevButton = isPlaying ? (
    //   <button onClick={this.prevSnippet}>Previous Song</button>
    // ) : null;

    const renderedDooDooButton = isPlaying ? (
      <button class="feedback-btn" onClick={this.handleDooFeedback}>
        💩
      </button>
    ) : null;
    const renderedFireButton = isPlaying ? (
      <button class="feedback-btn" onClick={this.handleFireFeedback}>
        🔥
      </button>
    ) : null;
    // const renderedPrevButton = isPlaying ? (
    //   <button onClick={this.prevSnippet}>Previous Song</button>
    // ) : null;
    const renederedSeconds = isPlaying ? (
      <p>0:{Math.floor(audio.currentTime)} / 0:60 </p>
    ) : null;
    const url = `https://plug.af/?playlistURL=${audio.playlistURL}`;
    return (
      <div className="info-album">
        <div className="cover">{renderedTrackArtwork}</div>

        <div className="track-data">
          <a href={audio.currentTrack.permalink_url}>
            <span>
              <i className="fab fa-soundcloud" />
            </span>
            <div className="album album-list">{renderedTrackMetadata}</div>
          </a>
        </div>

        <div className="">{renederedSeconds}</div>
        <div class="toggles">
          {renderedFireButton}
          {renderedPlayButton}
          {renderedNextButton}
          {renderedDooDooButton}
        </div>
        <br />
        <span className=""> Plug This Playlist: </span>
        <ul className="flex-horiz socials">
          <li>
            <a
              target="_blank"
              className="twitter-share-button"
              href={`https://twitter.com/intent/tweet?text=I just discovered fire new music in a matter of seconds on @plugwithus. Can't believe this. ${url}`}
              data-size="large"
            >
              <i className="fab fa-twitter icon-hover" />
            </a>
          </li>
          <li>
            <CopyURLButton url={url} />
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
