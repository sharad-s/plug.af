import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

// Logos
import share from '../../images/share.svg';


// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getShortURLFromPlaylistURL } from '../../features/audioplayer/actions';

class ShareButton extends Component {
	state = {
		copied: false,
	};

	handleCopy = async () => {
		this.setState({ copied: true });
		alert('Copied to Clipboard');
	};

	generateShortURL = async () => {
		const shortURL = await getShortURLFromPlaylistURL(
			this.props.audio.playlistURL,
		);
		return shortURL;
	};

	render() {
		// const url = `https://plug.af/?playlistURL=${audio.playlistURL}`;

		return (
			<div>
				<CopyToClipboard
					text={this.generateShortURL()}
					onCopy={this.handleCopy}
				>
					<img src={share} class="button-in button-small" />
				</CopyToClipboard>
				<br />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	audio: state.audio,
});

export default connect(mapStateToProps)(ShareButton); //
