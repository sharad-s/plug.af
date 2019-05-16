import React, { Component } from 'react';
import isEmpty from '../../utils/isEmpty';

// Redux
import { connect } from 'react-redux';
import { updatePlaylist } from '../../features/audioplayer/actions';

class Searchbar extends Component {
  state = ({
    value: '',
  });

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
      <form onSubmit={this.handleSubmit}>
        <label>
          <input
            type="text"
            name="name"
            className="searchform"
            placeholder={renderedPlaceholder}
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>

        <button type="submit" className="go" value="go">
          <i className="fab fa-soundcloud icon-hover" />
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  audio: state.audio,
  errors: state.errors,
});

export default connect(mapStateToProps)(Searchbar);
