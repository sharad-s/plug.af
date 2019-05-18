import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import isEmpty from '../../utils/isEmpty';

// Redux
import { connect } from 'react-redux';
import { updatePlaylist } from '../../features/audioplayer/actions';

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

    return <div class="top-menu">plug</div>;
  }
}

const mapStateToProps = state => ({
  audio: state.audio,
  errors: state.errors,
});

export default connect(mapStateToProps)(Header);
