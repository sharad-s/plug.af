import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

// Logos
import share from '../../images/share.svg';

// Redux
import { connect } from 'react-redux';

class ShareButton extends Component {
	state = {
		copied: false,
	};

	handleCopy = async () => {
		this.setState({ copied: true });
		alert(`Copied Plug Link (${this.props.audio.shortURL}) to Clipboard!`);
	};

	render() {
		return (
			<CopyToClipboard
				text={this.props.audio.shortURL}
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
