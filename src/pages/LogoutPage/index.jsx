import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';

import PropTypes from 'prop-types';
import isEmpty from '../../utils/isEmpty';

// Redux
import { connect } from 'react-redux';

// Auth Actions
import { logoutUser } from '../../features/auth/actions';


// Mixpanel
// import { track_RegisteredUser, track_CreatePlug } from '../../utils/mixpanel';

class LogoutPage extends Component {
  async componentDidMount() {
    // Mixpanel.track("loaded_registerPage");
    const { auth } = this.props;
    if (auth.isAuthenticated) {
      console.log("Logging Out")
      await this.props.logoutUser();
      this.setState({isLoggedOut: true});
    } else {
      console.log("no need to log out")
      this.setState({isLoggedOut: true});
    };
  }

  state = {
    isLoggedOut: false
  }


  render() {
    const redirectOnLogout = this.state.isLoggedOut ? (<Redirect to="/"/>) : <p> Logging Out... </p>;
    return (
      redirectOnLogout
    );
  }
}

LogoutPage.propTypes = {
  // error: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth,
});

export default withRouter(
  connect(
    mapStateToProps,
    { logoutUser },
  )(LogoutPage),
);
