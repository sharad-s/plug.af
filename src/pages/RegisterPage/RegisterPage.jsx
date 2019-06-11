import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { registerUser } from '../../features/auth/actions';

// SubComponents
import InputGroup from '../../components/Common/InputGroup';

// Mixpanel
import { track_RegisteredUser } from '../../utils/mixpanel';

class Register extends Component {
  componentDidMount() {
    // Mixpanel.track("loaded_registerPage");
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.error.errors) {
      this.setState({ errors: nextProps.error.errors });
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      errors: {},
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
  }

  async onSubmit(e) {
    e.preventDefault();

    // Create New User
    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };

    await this.props.registerUser(newUser, this.props.history);

    track_RegisteredUser({
      email: this.state.email,
      username: this.state.username,
    });

    if (this.state.errors) {
      console.log(this.state.errors);
    } else {
      // this.props.registerUser(newUser);

      this.setState({
        username: '',
        email: '',
        password: '',
        role: '',
      });
    }
  }

  // registration action

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // hanle username on change to prevent space
  onChangeUsername(e) {
    this.setState({ [e.target.name]: e.target.value.replace(/\s/g, '') });
  }

  render() {
    const { onSubmit, onChange, onChangeUsername } = this;
    const { errors } = this.state;

    return (
      <div className="drop-in centered-vert-flex">
        <p className="login-text">Register</p>
        <form className="pure-form flexstart-vert-flex" onSubmit={onSubmit}>
          {this.state.errors.email && (
            <div className="text-danger">
              <small>{this.state.errors.email}</small>
            </div>
          )}
          <input
            type="text"
            className="form-input"
            placeholder="Email"
            name="email"
            value={this.state.email}
            onChange={onChange}
            required
          />
          <br />
          {this.state.errors.username && (
            <div className="text-danger">
              <small>{this.state.errors.username}</small>
            </div>
          )}
          <input
            type="text"
            className="form-input"
            placeholder="Username"
            name="username"
            value={this.state.username}
            onChange={onChangeUsername}
            required
          />
          <br />
          {this.state.errors.password && (
            <div className="text-danger">
              <small>{this.state.errors.password}</small>
            </div>
          )}
          <input
            type="password"
            className="form-input"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={onChange}
            required
          />
          <p className="error-message" />

          <input type="submit" value="Register" className="pure-button btn-share button-enlarge" />
        </form>
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
  error: state.error,
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { registerUser },
)(Register);
