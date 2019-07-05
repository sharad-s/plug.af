import React, { Component } from 'react';

// Buttons
import like from '../../images/like.svg';
import dislike from '../../images/cancel.svg';
import goback from '../../images/go-back.svg';
import CopyURLButton from '../ShareButtons/CopyURLButton';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
	setSnippet,
	newNextTrack,
	prevSong,
} from '../../features/audioplayer/actions';

const LEFT = 'left';
const RIGHT = 'right';

class ButtonsPanel extends Component {
	nextSnippet = async swipeDirection => {
		console.log(
			`ButtonsPanel: Force swipe ${swipeDirection}: calling nextSong()`,
		);
		await newNextTrack(swipeDirection);
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

		const prevButtonStyle =
			audio.trackIndex === 0 && audio.plugIndex === 0
				? { visibility: 'hidden' }
				: { visibility: 'visible' };

		return (
			<center className="buttons-panel-container">
				<div class="buttons-panel noselect">
					<img
						src={goback}
						class="button-in button-small"
						onClick={this.prevSnippet}
						style={prevButtonStyle}
					/>
					<img
						src={dislike}
						class="button-in"
						onClick={this.handleDooFeedback}
					/>
					<img
						src={like}
						class="button-in sm"
						onClick={this.handleFireFeedback}
					/>
					<CopyURLButton />
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

export default connect(
	mapStateToProps,
)(ButtonsPanel); // {renderedTrackArtwork} //
