import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import isEmpty from '../../utils/isEmpty';

// Redux
import { connect } from 'react-redux';

// Auth Actions
import { loginUser } from '../../features/auth/actions';

// SubComponents
import LoginForm from './LoginForm';

// Mixpanel
// import { track_RegisteredUser, track_CreatePlug } from '../../utils/mixpanel';

const loginTextStyle = {
  textDecoration: 'none',
  color: '#f3e576',
  marginTop: '-100px !important;',
};

const titular = {
  fontSize: '30px',
  color: '#f3e576 !important;',
  fontWeight: 'bold',
};

class LoginPage extends Component {
  componentDidMount() {
    // Mixpanel.track("loaded_registerPage");
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors.authError) {
      // console.log('REGISTER ERROR', nextProps.errors.authError);
      this.setState({ authError: nextProps.errors.authError });
      console.log('nextProps', nextProps.errors);
    }
    // if (nextProps.errors.authError) {
    //   // console.log('REGISTER ERROR', nextProps.errors.authError);
    //   this.setState({ authError: nextProps.errors.authError });
    // }
  }
  
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      authError: {},
    };
    this.onChange = this.onChange.bind(this);
  }

  onSubmit = async e => {
    e.preventDefault();

    console.log(this.state);

    // Create Login User object
    const user = {
      email: this.state.email,
      password: this.state.password,
    };

    // Login User with API
    return await this.props.loginUser(user, this.props.history, '/');
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { onChange, onSubmit } = this;

    const { authError, email, password } = this.state;

    // Rendered Errors
    const renderedAuthError = isEmpty(this.state.authError)
      ? null
      : this.state.authError;

    return (
      <div className="drop-in centered-vert-flex">
        <p style={titular} className="login-text-other">
          Login
        </p>
        <p className="login-text">
          or{' '}
          <Link style={loginTextStyle} to="/register">
            Sign Up
          </Link>
        </p>

        <LoginForm
          emailInput={this.state.email}
          passwordInput={this.state.password}
          onChange={onChange}
          onSubmit={onSubmit}
        />
        <p className="error-message">{renderedAuthError} </p>
      </div>
    );
  }
}

LoginPage.propTypes = {
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
    { loginUser },
  )(LoginPage),
);
