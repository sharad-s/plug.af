import React, { Component, Fragment } from 'react';
import isEmpty from '../../utils/isEmpty';

// Redux
import { connect } from 'react-redux';
import {
  pauseSnippet,
  playSnippet,
  setSnippet,
  nextSong,
  prevSong,
} from '../../features/audioplayer/actions';

// Subcomponents
import { SmallLoader as Loader } from '../Loader';

const regex = /large/gi;
const increaseImageResolution = originalURL =>
  originalURL.replace(regex, 't500x500');

class Beatcard extends Component {
  // Update animation based nextProps.audio.secondsPassed
  componentWillReceiveProps(nextProps) {
    const secondsPassed = nextProps.audio.currentTime - 45;
    let duration = 15;

    const elem = document.querySelector('.information-overlay .fill');

    let numnum = ((secondsPassed % duration) / duration - 1) * 100;
    if (secondsPassed > duration) {
      numnum = -100;
    }

    elem.style.transform = `translate3d(${numnum}%, 0, 0)`;

    /* Debug for animation */
    // console.log(
    //   'componentWillReceiveProps',
    //   'Current Second',
    //   secondsPassed,
    //   'Translate3D Percentage:',
    //   numnum,
    //   "isPlaying:",
    //   nextProps.audio.isPlaying
    // );
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
    const { audio, track } = this.props;

    const renderedPlayButtonText = audio.isPlaying ? (
      <i className="fas fa-pause" />
    ) : (
      <i className="fas fa-play" />
    );

    const renderedPlayButton = (
      <button onClick={this.handleClick}>{renderedPlayButtonText}</button>
    );

    const renderedPlayCount = <span> {track.playCount} </span>;

    return (
      <div class="card-container-god">
        {/* Card In Whole */}
        <div class="card-container noselect">
          {/* Card Image + Play BUtton Container */}
          <div class="card-image-container">
            {/* Card Image */}
            <img src={track.imageURL} className="card-image" />

            {/* 25% Image Bottom Overlay with Track Details */}
            <div class="information-overlay" id="OVERLAY">
              <div class="fill" />
              <div class="details-container">
                <div class="icon-on-overlay">
                  {audio.loading ? (
                    <Loader />
                  ) : (
                    <Fragment>
                      {renderedPlayCount} {renderedPlayButton}
                    </Fragment>
                  )}
                </div>
                <div class="details">
                  <p className="title-text noselect">
                    {track.title ? track.title : null}
                  </p>
                  <p className="title-text noselect">
                    {track.artist ? track.artist : null}
                  </p>
                </div>
              </div>
            </div>

            {/* 100% Invisble Image Overlay */}
            <div class="invisible-overlay" id="INVISIBLE-OVERLAY" />
          </div>

          {/* Soundcloud Underbutton */}

          <a class="pure-button btn-sc" href={track.soundcloudPermalinkURL}>
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

export default connect(mapStateToProps)(Beatcard); // {renderedTrackArtwork} //         {renderedTrackMetadata} //         {renederedSeconds} //         {renderedPlaylistName} //         {renderedPlayButton}
