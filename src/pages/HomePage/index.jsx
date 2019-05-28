import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import isEmpty from '../../utils/isEmpty';


// Mixpanel
import { track_LoadedHomePage, track_CreatePlug } from '../../utils/mixpanel';

// Redux
import { connect } from 'react-redux';
import {
	connectSoundcloud,
	updatePlaylist,
	getTrack,
	playSnippet,
	setSnippet,
	getShortURLFromPlaylistURL,
} from '../../features/audioplayer/actions';

class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			input: '',
			error: {},
			loading: false,
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}


	componentDidMount = () => {
		track_LoadedHomePage()
	}

	handleSubmit = async e => {
		e.preventDefault();
		const soundcloudURL = this.state.input;
		this.setState({error: {}})
		try {
			const shortID = await getShortURLFromPlaylistURL(soundcloudURL, true);
			console.log('SHORTID', shortID);

			if (!isEmpty(this.props.errors.searchError)) {
				return this.setState({error: this.props.errors.searchError})
			}

			track_CreatePlug(shortID)

			this.props.history.push(`/preview/${shortID}`);
		} catch (error) {
			alert(error.message);
			this.setState({
				error: error,
			});
		}
	};

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		});
	};

	render() {
		const renderedError = isEmpty(this.state.error)
			? null
			: this.state.error.message;

		return (
			<center>
				<div className="drop-in">
					<p className="instructions">
						Drop the link to your Soundcloud playlist, single or profile.
						We'll do the rest.
					</p>
					<form class="pure-form" onSubmit={this.handleSubmit}>
						<input
							type="text"
							className="sc-input"
							placeholder="Link goes here!"
							value={this.state.input}
							onChange={this.handleChange('input')}
							required
						/>
						<p className="error-message">{renderedError} </p>

						<input type="submit" value="Plug it" className="pure-button btn-share" />
					</form>
				</div>
			</center>
		);
	}
}

const mapStateToProps = state => ({
	audio: state.audio,
	errors: state.errors

});

export default withRouter(connect(mapStateToProps)(HomePage)); // {renderedTrackArtwork} //
