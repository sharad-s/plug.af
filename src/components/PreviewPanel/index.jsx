import React, { Component } from 'react';

// Share Buttons
import CopyURLButton from '../ShareButtons/CopyURLButton';
import TweetButton from '../ShareButtons/TweetButton';

class PreviewPanel extends Component {
	render() {

		const shortID = this.props.shortID;

		return (
			<div className="preview-container">
				<p class="voila">Share your Plug</p>
				<form class="preview-form">
					<input
						type="text"
						class="link-input"
						value={`https://plug.af/${shortID}`}
					/>
					<CopyURLButton />
					<TweetButton />
				</form>
			</div>
		);
	}
}


export default PreviewPanel;