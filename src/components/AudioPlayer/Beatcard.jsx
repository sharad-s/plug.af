import React, { Component } from 'react';

class Beatcard extends Component {

  componentWillReceiveProps(nextProps) {
    const { secondsPassed } = nextProps;
    let duration = 15;

    const elem = document.querySelector('.information-overlay .fill');

    let numnum = ((secondsPassed % duration) / duration - 1) * 100;

      console.log(
        'componentWillReceiveProps',
        'Current Second',
        secondsPassed,
        'Translate3D Percentage:',
        numnum,
      );

    elem.style.transform = `translate3d(${numnum}%, 0, 0)`;
  }

  render() {
    
    const {
      renderedPlayButton,
      audio,
      trackArtworkURL,
      secondsPassed,

    } = this.props;

    return (
      <div class="cards-list">
        {/* Card In Whole */}
        <div class="card-container">
          {/* Card Image + Play BUtton Container */}
          <div class="card-image-container">
            {/* Card Image */}
            <img src={trackArtworkURL} className="card-image" />
            {/* 25% Image Overlay with Track Details */}
            <div class="information-overlay" id="OVERLAY">
              <div class="fill" />
              <div class="details-container">
                <div class="icon-on-overlay">{renderedPlayButton}</div>
                <div class="details">
                  <p className="title-text noselect">
                    {audio.currentTrack.title ? (
                      audio.currentTrack.title
                    ) : (
                      <div />
                    )}
                  </p>
                  <p className="title-text noselect">
                    {audio.currentTrack.user ? (
                      audio.currentTrack.user.username
                    ) : (
                      <div />
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* 100% Invisble Image Overlay */}
            <div class="invisible-overlay" id="INVISIBLE-OVERLAY" />
          </div>

          {/* Soundcloud Underbutton */}
          <a class="pure-button btn-sc" href="#">
            <i class="fab fa-soundcloud" /> Listen on Soundcloud
          </a>
        </div>
      </div>
    );
  }
}

export default Beatcard;
