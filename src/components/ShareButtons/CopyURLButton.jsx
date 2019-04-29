import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';


// Redux
import { connect } from 'react-redux';
import {
  getShortURLFromPlaylistURL
} from '../../features/audioplayer/actions';

class ShareButton extends Component {
	state = {
		copied: false,
	};

	handleCopy = async () => {
		this.setState({ copied: true });
		alert('Copied to Clipboard');
	};

	render() {
		return (
			<div>
				<CopyToClipboard text={this.props.audio.shortURL} onCopy={this.handleCopy}>
					<button>
						<i className="fas fa-link icon-hover" />
					</button>
				</CopyToClipboard>
				<br />
			</div>
		);
	}
}

const mapStateToProps = state => ({
  audio: state.audio,
});

export default connect(
  mapStateToProps,
)(ShareButton); //