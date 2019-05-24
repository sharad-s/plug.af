import React, { Component } from 'react';
import isEmpty from '../../utils/isEmpty';

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

class Beatcard extends Component {
  componentWillReceiveProps(nextProps) {

    const secondsPassed = nextProps.audio.currentTime - 45;
    let duration = 15;

    const elem = document.querySelector('.information-overlay .fill');

    let numnum = ((secondsPassed % duration) / duration - 1) * 100;

    // console.log(
    //   'componentWillReceiveProps',
    //   'Current Second',
    //   secondsPassed,
    //   'Translate3D Percentage:',
    //   numnum,
    // );

    elem.style.transform = `translate3d(${numnum}%, 0, 0)`;
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
    const { audio, secondsPassed, track } = this.props;

    
    const trackArtURL = isEmpty(track.artwork_url)
      ? track.user.avatar_url
      : track.artwork_url;

    const renderedPlayButtonText = audio.isPlaying ? (
      <i className="fas fa-pause" />
    ) : (
      <i className="fas fa-play" />
    );

    const renderedPlayButton = audio.title ? (
      <button onClick={this.handleClick}>{renderedPlayButtonText}</button>
    ) : null;

    return (
      <div class="card-container-god">
        {/* Card In Whole */}
        <div class="card-container noselect">
          {/* Card Image + Play BUtton Container */}
          <div class="card-image-container">
            {/* Card Image */}
            <img src={trackArtURL} className="card-image" />
            {/* 25% Image Overlay with Track Details */}
            <div class="information-overlay" id="OVERLAY">
              <div class="fill" />
              <div class="details-container">
                <div class="icon-on-overlay">{renderedPlayButton}</div>
                <div class="details">
                  <p className="title-text noselect">
                    {track.title ? track.title : null}
                  </p>
                  <p className="title-text noselect">
                    {track.user ? track.user.username : null}
                  </p>
                </div>
              </div>
            </div>

            {/* 100% Invisble Image Overlay */}
            <div class="invisible-overlay" id="INVISIBLE-OVERLAY" />
          </div>

          {/* Soundcloud Underbutton */}

          <a class="pure-button btn-sc" href={track.permalink_url}>
            <i class="fab fa-soundcloud" /> Listen on Soundcloud
          </a>
        </div>
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
)(Beatcard); // {renderedTrackArtwork} //         {renderedTrackMetadata} //         {renederedSeconds} //         {renderedPlaylistName} //         {renderedPlayButton}
