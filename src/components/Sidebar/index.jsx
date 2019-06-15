import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from 'react-sidebar';

// Import Subcomponents
import SidebarContent from "./SidebarContent"

class LeftSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
      docked: false,
      open: false,
      transitions: true,
      touch: true,  
      shadow: true,
      pullRight: false,
      touchHandleWidth: 20,
      dragToggleDistance: 30
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);

  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  closeDrawer() {
    this.setState({sidebarOpen: false});
  }

  render() {
    return (
      <Sidebar
        sidebar={<SidebarContent closeDrawer={this.closeDrawer}/>}
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        styles={{ sidebar: { background: 'black', width: '250px' } }}
      >
        <div className="top-menu">
          <button onClick={() => this.onSetSidebarOpen(true)}>
            <span className="top-menu-item top-small">Menu</span>
          </button>
          <Link to="/" className="top-menu-item">
            plug
          </Link>
          <Link to="/explore" className="top-menu-item top-small btn-explore">
            explore
          </Link>
        </div>
      </Sidebar>
    );
  }
}

export default LeftSidebar;
