import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

// Logos
import share from '../../images/share.svg';

// Redux
import { connect } from 'react-redux';

// Mixpanel
import { Mixpanel } from '../../utils/mixpanel';
import { track_SharePlug } from '../../utils/mixpanel';

class ShareButton extends Component {
  state = {
    copied: false,
  };

  handleCopy = async () => {
    const { audio } = this.props;


    console.log('CLICKED COPY', this.props);
    this.setState({ copied: true });
    track_SharePlug({
      plugID: `https://plug.af/${audio.currentPlug.shortID}`,
      method: 'Copy Link',
    });
    alert(
      `Copied Plug link (https://plug.af/${
        audio.currentPlug.shortID
      }) to Clipboard!`,
    );
  };

  handleClick() {}

  render() {
    const { audio } = this.props;

    return (
      <CopyToClipboard
        text={`https://plug.af/${audio.currentPlug.shortID}`}
        onCopy={this.handleCopy}
      >
        <img src={share} class="button-in button-small" />
      </CopyToClipboard>
    );
  }
}

const mapStateToProps = state => ({
  audio: state.audio,
});

export default connect(mapStateToProps)(ShareButton); //
