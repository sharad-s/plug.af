import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import isEmpty from '../../utils/isEmpty';

// Redux
import { connect } from 'react-redux';

// Auth Actions
import {
	registerUserWithPlug,
	preValidateRegister,
} from '../../features/auth/actions';


// Audioplayer Actions
import {
	resolveSoundcloudURL,
	getShortURLFromPlaylistURL,
} from '../../features/audioplayer/actions';

// SubComponents
import AccountCreationForm from './AccountCreationForm';
import ConnectSoundcloudForm from './ConnectSoundcloudForm';
import InputGroup from '../../components/Common/InputGroup';

// Mixpanel
import { track_RegisteredUser, track_CreatePlug } from '../../utils/mixpanel';

class Register extends Component {
	componentDidMount() {
		// Mixpanel.track("loaded_registerPage");
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.errors.authError) {
			// console.log('REGISTER ERROR', nextProps.errors.authError);
			this.setState({ authError: nextProps.errors.authError });
		}
		// if (nextProps.errors.authError) {
		// 	// console.log('REGISTER ERROR', nextProps.errors.authError);
		// 	this.setState({ authError: nextProps.errors.authError });
		// }
	}
	constructor(props) {
		super(props);
		this.state = {
			soundcloudURL: '',
			email: '',
			password: '',
			authError: {},
			soundcloudError: {},
			registerValid: false,
		};
		this.onSubmitStep1 = this.onSubmitStep1.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onChangeSoundcloudURL = this.onChangeSoundcloudURL.bind(this);
	}


	// Registers a user with API using account details & Soundcloud Link.
	handleFinalSubmit = async e => {
		e.preventDefault();

		// Validate Plug can be created
		const { soundcloudURL } = this.state;

		// Empty Form Errors
		this.setState({ soundcloudError: {} });

		try {

			// Attempt to Resolve Input URL into data from Soundcloud.
			const resolvedURL = await resolveSoundcloudURL(soundcloudURL);

			// Create shortID for Playlist URL
			const shortID = await getShortURLFromPlaylistURL(soundcloudURL, true);
			console.log('SHORTID', shortID, 'RESOLVED', resolvedURL);

			// If errors exist from pushing soundcloud
			if (!isEmpty(this.props.errors.searchError)) {
				return this.setState({
					soundcloudError: this.props.errors.searchError,
				});
			}
			// const { kind } = resolvedURL;

			// Check that Soundcloud URL is that of a profile. 
			// console.log('KIND', kind);
			// if (kind !== 'user') {
			//   this.setState(
			//     { soundcloudError: 'Input your soundcloud Profile URL' },
			//     () => {
			//       console.log('set State');
			//       return;
			//     },
			//   );
			// }

			// Mixpanel Track
			track_CreatePlug({ plugID: shortID, soundcloudURL });

			// Get Profile Data from Resolved Soundcloud Profile URL
			const { permalink_url, avatar_url, username } = resolvedURL;
			

			/* POST to /api/register */

			// Create New User
			const newFinalUser = {
				name: username,
				email: this.state.email,
				password: this.state.password,
				soundcloudURL: permalink_url,
				imageURL: avatar_url,
			};

			await this.props.registerUserWithPlug(
				newFinalUser,
				shortID,
				this.props.history,
			);

			console.log('Registered User!');

			// Track Register
			track_RegisteredUser({
				email: this.state.email,
				username: this.state.username,
			});

			this.props.history.push(`/preview/${shortID}`);
		} catch (error) {
			alert(error.message);
			this.setState({
				error: error,
			});
		}
	};

	async onSubmitStep1(e) {
		e.preventDefault();

		// Create New User object
		const newUser = {
			// name: this.state.username,
			email: this.state.email,
			password: this.state.password,
		};

		// Call API to Prevalidate the account details
		await this.props.preValidateRegister(newUser, this.props.history);

		// If errors are returned, display them. If valid, move to Step 2.
		if (!isEmpty(this.state.authError)) {
			console.log('RegisterPage: onSubmitStep1:', this.state.authError);
			return;
		} else {
			this.setState({
				registerValid: true,
			});
		}
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	//handle username on change to prevent space
	onChangeSoundcloudURL(e) {
		this.setState({ [e.target.name]: e.target.value.replace(/\s/g, '') });
	}

	render() {
		const {
			onSubmitStep1,
			onChange,
			onChangeSoundcloudURL,
			handleFinalSubmit,
		} = this;
		const { error, registerValid, soundcloudError, soundcloudURL } = this.state;

		// Rendered Errors
		const renderedAuthError = isEmpty(this.state.authError)
			? null
			: this.state.authError.data;

		const renderedSoundcloudError = isEmpty(this.state.soundcloudError)
			? null
			: this.state.soundcloudError.message;

		let renderedRegisterSubscriberForm;

		//Based on Step of Signup, Render Different Forms
		if (registerValid === true) {
			renderedRegisterSubscriberForm = (
				<ConnectSoundcloudForm
					soundcloudURLInput={soundcloudURL}
					onChangeSoundcloudURL={onChangeSoundcloudURL}
					handleFinalSubmit={handleFinalSubmit}
				/>
			);
		} else {
			renderedRegisterSubscriberForm = (
				<AccountCreationForm
					emailInput={this.state.email}
					passwordInput={this.state.password}
					onChange={onChange}
					onSubmit={onSubmitStep1}
				/>
			);
		}

		return (
			<div className="drop-in centered-vert-flex">
				{renderedRegisterSubscriberForm}
				<p className="error-message">{renderedAuthError} </p>
				<p className="error-message">{renderedSoundcloudError} </p>
			</div>
		);
	}
}

Register.propTypes = {
	// error: PropTypes.object.isRequired,
	// auth: PropTypes.object.isRequired,
	// registerUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	errors: state.errors,
	auth: state.auth,
});

export default withRouter(
	connect(
		mapStateToProps,
		{ registerUserWithPlug, preValidateRegister },
	)(Register),
);
