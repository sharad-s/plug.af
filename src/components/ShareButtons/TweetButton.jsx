import React, { Component } from 'react';

import { track_SharePlug } from '../../utils/mixpanel';

// Redux
import { connect } from 'react-redux';

class TweetButton extends Component {
	handleClick(e) {
		track_SharePlug({ plugID: this.props.audio.shortURL, method: 'Twitter' });
	}

	render() {
		const { audio } = this.props;
		const shortURL = `https://plug.af/${audio.currentPlug.shortid}`;

		return (
			<a
				target="_blank"
				rel="noopener noreferrer"
				className="twitter-share-button"
				href={`https://twitter.com/intent/tweet?text=Swipe through snippets of my music in under a minute on @plugwithus. Check me out on Plug: ${shortURL}`}
				data-size="large"
				onClick={() => this.handleClick}
			>
				<i className="fab fa-twitter icon-hover" />
			</a>
		);
	}
}

const mapStateToProps = state => ({
	audio: state.audio,
});

export default connect(mapStateToProps)(TweetButton); //
