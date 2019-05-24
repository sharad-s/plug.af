/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import Swipeable from 'react-swipy';

// Utils
import isEmpty from '../../utils/isEmpty';

// SubComponents
import Beatcard from '../Beatcard';
import ButtonsPanel from '../ButtonsPanel';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  setSnippet,
  nextSong,
  prevSong,
} from '../../features/audioplayer/actions';

const swipeWrapperStyles = {
  position: 'relative',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
};

const swipableStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  overflowX: 'hidden',
};

// Styles for Card Underneath
const cardStyles = {
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
  artwork_url: 'https://source.unsplash.com/random/300x300',
  title: 'END OF LIST',
  permalink_url: 'https://plug.af',
};




class App extends Component {
  state = {
    tracks: [],
  };

  componentDidUpdate(prevProps, prevState) {
    const tracks = [];

    // If New Playlist is Updated
    if (prevProps.audio.playlist !== this.props.audio.playlist) {
      console.log(
        'componentDidUpdate:: New Playlist Loaded. Playlist:',
        this.props.audio.playlist,
      );

      // If Playlist has tracks, push track objects to local state
      if (!isEmpty(this.props.audio.playlist.length)) {
        // Use a subset of track object needed for Beatcard
        this.props.audio.playlist.map(track => {
          const trackSubset = {
            artwork_url: track.artwork_url,
            title: track.title,
            user: track.user,
            permalink_url: track.permalink_url,
          };

          tracks.push(trackSubset);
        });

        this.setState({ tracks });
      }
    }
  }

  // Removes a track object from local state
  remove = () =>
    this.setState(({ tracks }) => ({
      tracks: tracks.slice(1, tracks.length),
    }));

  render() {
    const { tracks } = this.state;

    return (
      <Fragment>
        <div style={swipeWrapperStyles} id="WRAPPER">
          {/* If Tracks are in local state, render Top and Bottom Card */}
          {tracks.length > 0 ? (
            <div id="SWIPABLE" style={swipableStyles}>
              {/* Top Swipable Card */}

              <Swipeable
                limit={100}
                onAfterSwipe={this.remove}
                buttons={({ left, right }) => {
                  // Set Global Var for Swipe Function
                  window.swipeFunction = { left, right };
                  return <ButtonsPanel/>;
                }}
              >
                <div id="SWIPABLE_CARD_TOP">
                  {' '}
                  <Beatcard track={tracks[0]} />
                </div>
              </Swipeable>

              {/* Bottom, Fixed Non-Swipable Card */}
              {tracks.length > 1 && (
                <div id="NONSWIPABLE_CARD_BOTTOM" style={cardStyles}>
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
        </div>
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
      setSnippet,
      nextSong,
      prevSong,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App); // {renderedTrackArtwork} //         {renderedTrackMetadata} //         {renederedSeconds} //         {renderedPlaylistName} //         {renderedPlayButton}
