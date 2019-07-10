import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import isEmpty from '../../utils/isEmpty';

// Redux
import { connect } from 'react-redux';

// Import Subcomponents
import Sidebar from '../Sidebar';

class Header extends Component {
  render() {
    const renderedPlaceholder = !isEmpty(this.props.errors.searchError.message)
      ? '404 - Enter a Soundcloud Playlist URL'
      : 'Plug a Soundcloud URL';

    // const Sidebar = <Sidebar />;
    const Header = (
      <div className="header-container">
        <Link to="/create" className="header-item-small" id="MENU_BUTTON">
          create
        </Link>
        <Link to="/" className="header-item" id="CENTER_ICON">
          plug.
        </Link>
        <Link to="/explore" className="header-item-small" id="TOP_RIGHT_BUTTON">
          explore
        </Link>
      </div>
    );

    return (
      <Fragment>
        {Header}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  audio: state.audio,
  errors: state.errors,
});

export default connect(mapStateToProps)(Header);
