import React, { Component, Fragment } from 'react';

import Searchbar from "../components/Searchbar"

class HomePage extends Component {
	render() {
		return (
			<Fragment>
				<h1> Share 15 second snippets of your music</h1>
				<Searchbar />

			</Fragment>
		);
	}
}

export default HomePage;