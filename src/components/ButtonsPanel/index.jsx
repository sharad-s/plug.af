import React, { Component } from 'react';

// Buttons
import like from '../../images/like.svg';
import dislike from '../../images/cancel.svg';
import goback from '../../images/go-back.svg';
import share from '../../images/share.svg';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
	setSnippet,
	nextSong,
	prevSong,
} from '../../features/audioplayer/actions';

const LEFT = "LEFT"
const RIGHT = "RIGHT"


class ButtonsPanel extends Component {
	nextSnippet = async (swipeDirection) => {
		await nextSong(swipeDirection);
		// await setSnippet();
	};

	prevSnippet = async () => {
		await prevSong();
		// await setSnippet();
	};

	handleFireFeedback = async () => {
		// alert('You voted this track a banger!');
		await this.nextSnippet(RIGHT);

	};

	handleDooFeedback = async () => {
		// alert('You voted this track as whack!');
		await this.nextSnippet(LEFT);

	};

	render() {
		const { audio } = this.props;
		const { isPlaying, currentTrack, trackIndex } = audio;

		const prevButtonStyle =
			trackIndex !== 0 ? { visibility: 'visible' } : { visibility: 'hidden' };

		const renderedPrevButton = (
			<img
				src={goback}
				class="button-in button-small"
				onClick={this.prevSnippet}
				style={prevButtonStyle}
			/>
		);

		const renderedShareButton = (
			<img
				src={share}
				class="button-in button-small"
				onClick={this.prevSnippet}
			/>
		);

		const renderedDooDooButton = true ? (
			<img src={dislike} class="button-in" onClick={this.handleDooFeedback} />
		) : null;

		const renderedFireButton = true ? (
			<img src={like} class="button-in sm" onClick={this.handleFireFeedback} />
		) : null;

		return (
			<center>
				<div class="buttons-panel noselect">
					{renderedPrevButton}
					{renderedDooDooButton}
					{renderedFireButton}
					{renderedShareButton}
				</div>
			</center>
		);
	}
}


// PropTypes
// next
// prev
// audio

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
)(ButtonsPanel); // {renderedTrackArtwork} //
