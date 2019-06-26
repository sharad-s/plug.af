import React, { Component, Fragment } from 'react';


// SubComponents
import SwipableCards from '../SwipableCards';


// Mixpanel
import { Mixpanel } from '../../utils/mixpanel';

class AudioPage extends Component {

  render() {
    return (
      <Fragment>
        <SwipableCards />
      </Fragment>
    );
  }
}



export default (AudioPage); // {renderedTrackArtwork} //         {renderedTrackMetadata} //         {renederedSeconds} //         {renderedPlaylistName} //         {renderedPlayButton}
