import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const DrawerLink = ({ to, children }) => {
	return (
		<NavLink
			to={to}
			className="sidebar-menu-item sidebar-smaller"
		>
			{children}
		</NavLink>
	);
};

const SidebarContent = ({ closeDrawer }) => (
	<div className="sidebar-container">
		<div className="sidebar-header">
			<h1 className="sidebar-menu-item">Plug</h1>
		</div>
		<hr />
		<div className="sidebar-menu">
			<ul>
				<li>
					<Link to="/login" onClick={closeDrawer} className="sidebar-menu-item sidebar-smaller">
						> Login
					</Link>
				</li>
				<li>
					<Link to="/register" onClick={closeDrawer} className="sidebar-menu-item sidebar-smaller">
						> Sign Up
					</Link>
				</li>
				<li>
					<Link to="/" onClick={closeDrawer} className="sidebar-menu-item sidebar-smaller">
						> Create a Plug
					</Link>
				</li>
			</ul>
		</div>
	</div>
);

export default SidebarContent;
