import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from 'react-sidebar';

// Import Subcomponents
import SidebarContent from "./SidebarContent"
import MenuIcon from "../../images/menu.svg"

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
        <div className="header-container">
          <button onClick={() => this.onSetSidebarOpen(true)}>
            <img src={MenuIcon} className="header-item" id="MENU_BUTTON"/>
          </button>  
          <Link to="/" className="header-item" id="CENTER_ICON">
            plug
          </Link>
          <Link to="/explore" className="header-item" id="TOP_RIGHT_BUTTON">
            explore
          </Link>
        </div>
      </Sidebar>
    );
  }
}

export default LeftSidebar;
