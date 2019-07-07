/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import Swipeable from 'react-swipy';

// Utils
import isEmpty from '../../utils/isEmpty';
import Swiper from '../../utils/swiper';

// SubComponents
import Beatcard from '../Beatcard';
import ButtonsPanel from '../ButtonsPanel';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  // setSnippet,
  nextSong,
  newNextTrack,
} from '../../features/audioplayer/actions';


// Styles for Card Underneath
const bottomBottomCardStyles = {
  cursor: 'pointer',
  userSelect: 'none',
  position: 'fixed',
  top: '62px',
  bottom: '0px',
  height: 'inherit',
  zIndex: -1,
  width: '100%',
};

//  Track for End of List
const emptyTrack = {
  imageURL: 'https://i.imgur.com/h7OIJa5.png',
  title: 'Loading..',
  soundcloudPermalinkURL: 'https://plug.af',
  user: {},
};

const createTrackSubset = (track = emptyTrack) => track;

class App extends Component {
  state = {
    tracks: [],
    currentSwipe: null,
  };

  componentDidUpdate(prevProps, prevState) {
    // If New Playlist is Updated
    if (prevProps.audio.playlist !== this.props.audio.playlist) {
      const {
        trackIndex,
        currentPlug,
        totalTrackIndex,
        playlist,
      } = this.props.audio;
      const tracks = [];

      // let newPlaylist = currentPlug.snippets;

      // If New Playlist has tracks, push track objects to local state
      if (!isEmpty(playlist.length)) {
        console.log(
          'componentDidUpdate:: New Snippet Playlist Loaded. Playlist:',
          playlist,
          ' / Tracks being pushed to state:',
          createTrackSubset(playlist[totalTrackIndex]),
          createTrackSubset(playlist[totalTrackIndex + 1]),
        );

        tracks.push(
          createTrackSubset(playlist[totalTrackIndex]),
          createTrackSubset(playlist[totalTrackIndex + 1]),
          createTrackSubset(playlist[totalTrackIndex + 2]),
        );

        this.setState({ tracks }, () => {
          console.log(
            'ComponentDidUpdate: playlist: this.state.tracks:',
            this.state.tracks,
          );

          console.log(
            `Current song should be ${
              this.state.tracks[0].title
            }. Next Song should be ${this.state.tracks[1].title}.
            Third song should be ${this.state.tracks[2].title}.
            `,
          );
        });
      }
    }

    // // If Track Index is Updated
    if (prevProps.audio.totalTrackIndex !== this.props.audio.totalTrackIndex) {
      const {
        trackIndex,
        currentPlug,
        playlist,
        totalTrackIndex,
      } = this.props.audio;
      let newPlaylist = currentPlug.snippets;
      const tracks = [];

      console.log(
        `trackIndex Updated: Prev TrackIndex: ${
          prevProps.audio.trackIndex
        }, New TrackIndex: ${trackIndex}`,
      );

      tracks.push(
        createTrackSubset(playlist[totalTrackIndex]),
        createTrackSubset(playlist[totalTrackIndex + 1]),
        createTrackSubset(playlist[totalTrackIndex + 2]),
      );

      this.setState({ tracks }, () => {
        console.log(
          'ComponentDidUpdate: trackIndex: this.state.tracks:',
          this.state.tracks,
        );

        console.log(
          `Current song should be ${
            this.state.tracks[0].title
          }. Next Song should be ${this.state.tracks[1].title}
            Third song should be ${this.state.tracks[2].title}.
          `,
        );
      });
    }
  }

  // Removes a track object from local state
  remove = () => {
    console.log(
      'SwipableCards: remove: About to remove a track. PrevState:',
      this.state.tracks,
    );
    this.setState(
      ({ tracks }) => ({
        tracks: tracks.slice(1, tracks.length),
      }),
      () => {
        console.log(
          'SwipableCards: remove: removed a track. New State:',
          this.state.tracks,
        );
      },
    );
  };

  handleSwipe = async swipeDirection => {
    this.setState({ currentSwipe: swipeDirection }, () => {
      console.log(
        `SwipableCards: handleSwipe: set state.currentSwipe to ${
          this.state.currentSwipe
        }`,
      );
    });
  };

  onAfterSwipe = () => {
    const swipeDirection = this.state.currentSwipe;

    this.remove();
    console.log(
      `SwipableCards: onAfterSwipe: Actual Swipe ${swipeDirection}: calling newNextTrack()`,
    );
    newNextTrack(swipeDirection, { disableForceSwipe: true, swipeDirection });
    // this.setState({ currentSwipe: null }, () => {
    //   console.log(
    //     `SwipableCards: onAfterSwipe: set state.currentSwipe to ${
    //       this.state.currentSwipe
    //     }`,
    //   );
    // });
  };

  render() {
    const { tracks } = this.state;

    return (
      <Fragment>
          {/* If Tracks are in local state, render Top and Bottom Card */}
          {tracks.length > 0 ? (
            <div className="swipable-container" id="SWIPABLE">
              {/* Top Swipable Card */}

              <Swipeable
                limit={100}
                onAfterSwipe={this.onAfterSwipe}
                onSwipe={swipeDirection => this.handleSwipe(swipeDirection)}
                buttons={({ left, right }) => {
                  // Set Global Var for Swipe Function
                  const swipeFunction = { left, right };
                  return Swiper.initializeSwiper(swipeFunction);
                }}
              >
                <div className="swipable-inner-container">
                  <div id="SWIPABLE_CARD_TOP">
                    <Beatcard track={tracks[0]} />
                  </div>
                </div>
              </Swipeable>

              {/* Bottom, Fixed Non-Swipable Card */}
              {tracks.length > 1 && (
                <div id="NONSWIPABLE_CARD_BOTTOM">
                  <Beatcard track={tracks[1]} />
                </div>
              )}
              
            </div>
          ) : (
            <div style={{ zIndex: '-2' }}>
              {/* If No More Tracks in Local State, load empty card */}
              <Beatcard track={emptyTrack} secondsPassed={0} />
            </div>
          )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  audio: state.audio,
});

export default connect(mapStateToProps)(App); // {renderedTrackArtwork} //         {renderedTrackMetadata} //         {renederedSeconds} //         {renderedPlaylistName} //         {renderedPlayButton}
