import React, { Component } from 'react';

// Redux
import { connect } from 'react-redux';


class TweetButton extends Component {
	render() {

		const shortURL = this.props.audio.shortURL;

		return (
			<a
				target="_blank"
				rel="noopener noreferrer"
				className="twitter-share-button"
				href={`https://twitter.com/intent/tweet?text=Flip through snippets of all my music in under a minute on @plugwithus. \nCheck me out on Plug: ${shortURL}`}
				data-size="large"
			>
				<i className="fab fa-twitter icon-hover" />
			</a>
		);
	}
}


const mapStateToProps = state => ({
  audio: state.audio,
});

export default connect(
  mapStateToProps,
)(TweetButton); //