import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import isEmpty from '../../utils/isEmpty';

// Redux
import { connect } from 'react-redux';
import { updatePlaylist } from '../../features/audioplayer/actions';

// Import Subcomponents
import Sidebar from '../Sidebar';

class Header extends Component {
  state = {
    value: '',
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ value: '' });
    const url = this.state.value;
    await updatePlaylist(url);
  };

  render() {
    const renderedPlaceholder = !isEmpty(this.props.errors.searchError.message)
      ? '404 - Enter a Soundcloud Playlist URL'
      : 'Plug a Soundcloud URL';

    return (
      <Fragment>
        <Sidebar/>
        <div style={{marginBottom: "30px"}}/>
        </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  audio: state.audio,
  errors: state.errors,
});

export default connect(mapStateToProps)(Header);
