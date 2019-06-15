import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import isEmpty from '../../utils/isEmpty';

// Redux
import { connect } from 'react-redux';
import {
  registerUser,
  registerUserWithPlug,
  preValidateRegister,
} from '../../features/auth/actions';
import {
  resolveSoundcloudURL,
  getShortURLFromPlaylistURL,
} from '../../features/audioplayer/actions';

// SubComponents
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
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeSoundcloudURL = this.onChangeSoundcloudURL.bind(this);
  }

  handleFinalSubmit = async e => {
    e.preventDefault();

    // Validate Plug can be created
    const { soundcloudURL } = this.state;
    this.setState({ soundcloudError: {} });
    try {
      const resolvedURL = await resolveSoundcloudURL(soundcloudURL);
      const shortID = await getShortURLFromPlaylistURL(soundcloudURL, true);
      console.log('SHORTID', shortID, 'RESOLVED', resolvedURL);

      // If errors exist from pushing soundcloud
      if (!isEmpty(this.props.errors.searchError)) {
        return this.setState({
          soundcloudError: this.props.errors.searchError,
        });
      }
      // const { kind } = resolvedURL;

      // // If not user
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

      track_CreatePlug({ plugID: shortID, soundcloudURL });

      // Get Data from Resolved
      const { permalink_url, avatar_url, username } = resolvedURL;

      // POST to /api/register

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

  async onSubmit(e) {
    e.preventDefault();

    // Create New User
    const newUser = {
      // name: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };

    await this.props.preValidateRegister(newUser, this.props.history);

    // If errors
    if (!isEmpty(this.state.authError)) {
      console.log(this.state.authError);
      return;
    } else {
      this.setState({
        registerValid: true,
      });
    }
  }

  // registration action

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // hanle username on change to prevent space
  onChangeSoundcloudURL(e) {
    this.setState({ [e.target.name]: e.target.value.replace(/\s/g, '') });
  }

  render() {
    const { onSubmit, onChange, onChangeSoundcloudURL } = this;
    const { error, registerValid, soundcloudError } = this.state;

    const renderedAuthError = isEmpty(this.state.authError)
      ? null
      : this.state.authError.data;

    // console.log(soundcloudError);
    const renderedSoundcloudError = isEmpty(this.state.soundcloudError)
      ? null
      : this.state.soundcloudError.message;

    let renderedRegisterSubscriberForm;

    if (registerValid === true) {
      renderedRegisterSubscriberForm = (
        <Fragment>
          <p className="login-text"> Welcome to the Fam 🔌⚡️</p>
          <p className="instructions">
            Make your first Plug! Drop the link to your Soundcloud playlist,
            single or profile. We'll do the rest.
          </p>
          <form class="pure-form width-70" onSubmit={this.handleFinalSubmit}>
            <input
              type="text"
              className="sc-input width-100"
              placeholder="Soundcloud Url"
              name="soundcloudURL"
              value={this.state.soundcloudURL}
              onChange={onChangeSoundcloudURL}
              required
            />
            <p className="error-message">{renderedSoundcloudError} </p>
            <p className="error-message">{renderedAuthError} </p>
            <input
              type="submit"
              value="Plug it"
              className="pure-button btn-share"
            />
          </form>
        </Fragment>
      );
    } else {
      renderedRegisterSubscriberForm = (
        <AccountCreationForm
          emailInput={this.state.email}
          passwordInput={this.state.password}
          onChange={onChange}
          onSubmit={onSubmit}
          renderedAuthError={renderedAuthError}
        />
      );
    }

    return (
      <div className="drop-in centered-vert-flex">
        {renderedRegisterSubscriberForm}
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
    { registerUser, registerUserWithPlug, preValidateRegister },
  )(Register),
);
