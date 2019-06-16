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
    console.log("CLICKED COPY", this.props)
    this.setState({ copied: true });
    track_SharePlug({ plugID: this.props.audio.shortURL, method: 'Copy Link' });
    alert(`Copied Plug link (${this.props.audio.shortURL}) to Clipboard!`);
  };

  handleClick() {
  }

  render() {
    return (
      <CopyToClipboard
        text={this.props.audio.shortURL}
        onCopy={this.handleCopy}
      >
        <img
          src={share}
          class="button-in button-small"
        />
      </CopyToClipboard>
    );
  }
}

const mapStateToProps = state => ({
  audio: state.audio,
});

export default connect(mapStateToProps)(ShareButton); //
