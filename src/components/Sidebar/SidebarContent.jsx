import React from 'react';
import { Link } from 'react-router-dom';

const SidebarContent = ({ closeDrawer, auth }) => {
	const { isAuthenticated } = auth;
	let menuItems, authHeader;

	if (isAuthenticated) {
		menuItems = [
			{
				content: 'Explore',
				to: '/explore',
			},
			{
				content: 'Create a Plug',
				to: '/create',
			},
			{
				content: `My Profile`,
				to: '/me',
			},
			{
				content: `Logout`,
				to: '/logout',
			},
		];
		authHeader = (
			<p className="sidebar-menu-item sidebar-smaller">
				Logged in as {auth.user.name}
			</p>
		);
	} else {
		menuItems = [
			{
				content: 'Register',
				to: '/register',
			},
			{
				content: 'Login',
				to: '/login',
			},
			{
				content: 'Explore',
				to: '/explore',
			},
			{
				content: 'Create a Plug',
				to: '/create',
			},
		];
		// authHeader = (
		// 	<Link
		// 		to="/login"
		// 		onClick={closeDrawer}
		// 		className="sidebar-menu-item sidebar-smaller"
		// 	>
		// 		login
		// 	</Link>
		// );
	}

	const menu = menuItems.map(menuItem => (
		<li>
			<Link
				to={menuItem.to}
				onClick={closeDrawer}
				className="sidebar-menu-item sidebar-smaller"
			>
				> {menuItem.content}
			</Link>
		</li>
	));

	return (
		<div className="sidebar-container">
			<div className="sidebar-header">
				<h1 className="sidebar-menu-item">Plug</h1>
				<button onClick={closeDrawer} className="sidebar-menu-item">
					{'<'}
				</button>
			</div>
			{authHeader}
			<br />
			<div className="sidebar-menu">
				<ul>{menu}</ul>
			</div>
		</div>
	);
};

export default SidebarContent;
