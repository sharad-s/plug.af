import React, { Component } from 'react';

// Redux
import { connect } from 'react-redux';
import { createPlugWithApi } from '../../features/plugs/actions';

import oldPlugs from '../../utils/oldPlugs.json';
import isEmpty from '../../utils/isEmpty';

class ConvertOldPlugsPage extends Component {
	state = {
		success: false,
		numSaved: 0,
		error: null,
	};

	createPlugAPI = url =>
		createPlugWithApi(url)
			.then(newPlug => {
				console.log('handleSubmit:newPlug', newPlug);
				const { shortID, soundcloudURL } = newPlug;
				this.props.history.push(`/preview/${shortID}`);
			})
			.catch(err => {
				console.log('HandleSubmit: error', err);
				this.setState({
					error: err.message,
				});
			});

	handleSubmit = async e => {
		e.preventDefault();
		// this.clearErrors();
		this.migrateOldPlugs();
		// Post Plug to API
	};

	migrateOldPlugs = () => {
		let i = 0;
		Promise.all(
			Object.keys(oldPlugs).map(async key => {
				const soundcloudURL = oldPlugs[key];
				return this.createPlugAPI(soundcloudURL).then(i++);
				console.log(soundcloudURL);
				i++;
			}),
		)
			.then(() =>
				this.setState({ success: true, numSaved: i }, () => {
					console.log('Saved ' + i + ' Plugs');
				}),
			)
			.catch(err => this.setState(err.message));
	};

	render() {
		const renderedError = isEmpty(this.state.error) ? null : this.state.error;

		const renderedSuccess = this.state.success ? 'Success! '+ this.state.numSaved : null;

		return (
			<center>
				<div className="drop-in">
					<p className="instructions">
						Click to generate old plugs into new db
					</p>
					<form class="pure-form" onSubmit={this.handleSubmit}>
						<p className="error-message">{renderedSuccess} </p>
						<p className="error-message">{renderedError} </p>
						<input
							type="submit"
							value="Start"
							className="pure-button btn-share"
						/>
					</form>
				</div>
			</center>
		);
	}
}

const mapStateToProps = state => ({
	audio: state.audio,
	errors: state.errors,
});

export default connect(mapStateToProps)(ConvertOldPlugsPage); // {renderedTrackArtwork} //
