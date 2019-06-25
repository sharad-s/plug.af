import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import { track_LoadedPreviewPage } from '../../utils/mixpanel';

// import isEmpty from '../../utils/isEmpty';

// Subcomponents
import AudioPlayer from '../../components/AudioPlayer';
import ButtonsPanel from '../../components/ButtonsPanel';

// Share Buttons
import CopyURLButton from '../../components/ShareButtons/CopyURLButton';
import TweetButton from '../../components/ShareButtons/TweetButton';

// Mixpanel

import { Mixpanel } from '../../utils/mixpanel';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
	connectSoundcloud,
	newUpdatePlaylist,
	getTrack,
	playSnippet,
	setSnippet,
	getPlaylistFromShortID,
} from '../../features/audioplayer/actions';

import { getPlugByShortID, getRandomPlug } from '../../features/plugs/actions';

// Playlist
class AudioPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			errorMessage: '',
			value: '',
		};
	}

	async componentDidMount() {
		await connectSoundcloud();

		let playlistURL, plug;
		const { shortID } = this.props.match.params;

		if (shortID) {
			// Get playlistURL from ShortID
			// playlistURL = await getPlaylistFromShortID(shortID); FIXME:// REMOVING THIS MAKES ALL PREVIOUS PLUGS INCOMPATIBLE
			plug = await getPlugByShortID(shortID);
		} else {
			plug = await getRandomPlug();
		}

		console.log('componentDidMount:GOT PLUG', plug);

		// Check for any query params (link sharing)
		// let { playlistURL } = queryString.parse(this.props.location.search);

		await newUpdatePlaylist(plug);
		console.log('componentDidMount:GETTING TRACK');
		await getTrack(0);

		if (this.state.showDiv === false) {
			await playSnippet();
			await setSnippet();
		}

		console.log('PreviewPage: componentDidMount:READY');
	}

	render() {
		const { audio } = this.props;

		const renderedPlaylistName = audio.playlistName ? (
			<h3>Playlist {audio.playlistName} </h3>
		) : null;

		return (
			<Fragment>
				<AudioPlayer
					tracks={this.state.tracks}
					playlistName={this.state.playlistName}
					renderedPlaylistName={renderedPlaylistName}
				/>
				<div className="preview-container">
					<p class="voila">Share your Plug</p>
					<form class="preview-form">
						<input type="text" class="link-input" value={audio.shortURL} />
						<CopyURLButton />
						<TweetButton />
					</form>
				</div>
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	audio: state.audio,
});

export default withRouter(connect(mapStateToProps)(AudioPage));
