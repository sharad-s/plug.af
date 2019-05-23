/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import Swipeable from 'react-swipy';

// Utils
import isEmpty from '../../utils/isEmpty';

// Sub
import Beatcard from '../Beatcard';
import Card from './Card';

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

const wrapperStyles = {
  position: 'relative',
  width: '100%',
  height: '400px',
  display: 'flex',
  justifyContent: 'center',
};
const actionsStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: 12,
  backgroundColor: 'white',
  zIndex: 100,
};

const cardStyles = {
  cursor: 'pointer',
  userSelect: 'none',
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  top: 0,
};

// const cards = [];
// for (let i = 0; i < audio.playlist.length; i++) {
//   cards.push(<Beatcard />);
// }

class App extends Component {
  state = {
    // cards: ["First", "Second", "Third", "Fourth", "Fifth", "Sixth", "7th", "8th", "9inth", "Tinth"],
    cards: [],
  };

  componentDidUpdate(prevProps, prevState) {
    const cards = [];

    if (prevProps.audio.playlist !== this.props.audio.playlist) {
      console.log(
        'componentDidUpdate:: New Playlist Loaded. Playlist:',
        this.props.audio.playlist,
      );

      if (!isEmpty(this.props.audio.playlist.length)) {
        this.props.audio.playlist.map(track => {
          cards.push(<Beatcard track={track} secondsPassed={5} />);
        });

        this.setState({ cards });
      }
    }

    // console.log(nextProps);
    // const { audio } = nextProps;
    // console.log("AUDIO Playlist",audio.playlist)

    // audio.playlist.map(track => {
    //   cards.push(
    //     <Beatcard renderedPlayButton={null} track={track} secondsPassed={5} />,
    //   );
    // });
    // this.setState({ cards });
  }

  remove = () =>
    this.setState(({ cards }) => ({
      cards: cards.slice(1, cards.length),
    }));

  render() {
    const { cards } = this.state;

    return (
      <Fragment>
        <div class="cards-list">
          <div style={wrapperStyles} id="WRAPPER">
            {cards.length > 0 ? (
              <Fragment>
                <div
                  id="SWIPABLE"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width:"100%",
                    // backgroundColor: 'red',
                    height:"100%",
                    overflowX:"hidden"

                  }}
                >
                  <Swipeable limit={100} onAfterSwipe={this.remove}>
                    <div id="SWIPABLE_CARD_TOP"> {cards[0]}</div>
                  </Swipeable>
                </div>
                {cards.length > 1 && (
                  <div
                    id="NONSWIPABLE_CARD_BOTTOM"
                    style={{ ...cardStyles, zIndex: -1 }}
                  >
                    {cards[1]}
                  </div>
                )}
              </Fragment>
            ) : (
              <div style={{ 'z-index': '-2', color: 'white' }}>
                No more cards
              </div>
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

{
  /*
        <Beatcard
          renderedPlayButton={renderedPlayButton}
          trackArtworkURL={artwork_url}
          audio={audio}
          secondsPassed={secondsPassed}
        />

      */
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
)(App); // {renderedTrackArtwork} //         {renderedTrackMetadata} //         {renederedSeconds} //         {renderedPlaylistName} //         {renderedPlayButton}
