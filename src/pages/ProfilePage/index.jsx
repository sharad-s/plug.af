import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import { Redirect, Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import isEmpty from '../../utils/isEmpty';

// Redux
import { connect } from 'react-redux';

// Auth Actions
import { getPlugsFromUser } from '../../features/plugs/actions';

// Mixpanel
// import { track_RegisteredUser, track_CreatePlug } from '../../utils/mixpanel';

class ProfilePage extends Component {
  async componentDidMount() {
    const { auth } = this.props;
    if (auth.isAuthenticated) {
      console.log('Getting Plugs for Logged In User');
      const res = await getPlugsFromUser(auth.user._id);
      console.log('Profile Page: get Plugs', res);
      this.setState({ loaded: true });
    } else {
      console.log('Is Logged Out. Redirect to Login.');
      this.setState({ isLoggedOut: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.plug.plugs) {
      // console.log('REGISTER ERROR', nextProps.errors.authError);
      this.setState({ plugs: nextProps.plug.plugs });
      console.log('nextProps', nextProps.plug);
    }
  }

  state = {
    plugs: [],
    loaded: false,
    isLoggedOut: false,
  };

  render() {
    const myPlugs = this.state.plugs;

    const renderedPlugs = myPlugs.map(plug => {
      return (
        <li>
          <Link to={`/${plug.shortID}`} style={{color:"white"}}>{plug.title}</Link>
        </li>
      );
    });

    const redirectOnLogout = this.state.isLoggedOut ? (
      <Redirect to="/login" />
    ) : (
      <ul>{renderedPlugs}</ul>
    );
    return redirectOnLogout;
  }
}

ProfilePage.propTypes = {
  error: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  plug: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth,
  plug: state.plug,
});

export default withRouter(connect(mapStateToProps)(ProfilePage));
