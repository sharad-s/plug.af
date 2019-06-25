import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import isEmpty from '../../utils/isEmpty';

// Redux
import { connect } from 'react-redux';
// Plug Actions
import { getPlugs, getTrackArtURL } from '../../features/plugs/actions';

class ExplorePage extends Component {
	async componentDidMount() {
		const plugs = await getPlugs();
		// console.log('componentDidMount: plugs', plugs);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.plug.plugs) {
			// console.log('REGISTER ERROR', nextProps.errors.authError);
			this.setState({ plugs: nextProps.plug.plugs });
			console.log('nextProps', nextProps.plug.plugs);
		}
	}

	state = {
		plugs: {},
		loading: false,
	};

	render() {
		const { plugs, loading } = this.state;

		const renderedPlugs = isEmpty(plugs) ? (
			<div class="loader" />
		) : (
			plugs.map(plug => {
				// Check Creator name if exists
				const creatorName =
					plug.creator === null ? 'Anonymous' : plug.creator.name;

				return (
					<div class="gallery-item" tabindex="0">
						<Link to={`/${plug.shortID}`}>
							<img src={plug.imageURL} class="gallery-image" alt="" />

							<div class="gallery-item-info">
								<ul>
									<li class="gallery-item-likes">
										<span class="visually-hidden">Plays:</span>
										<i class="fas fa-play" aria-hidden="true" /> 89
									</li>
								</ul>
							</div>
						</Link>
					</div>
				);
			})
		);

		return (
			<center>
				<div class="drop-in">
					<p class="login-text">
						<h2 class="title recent-plugs">Recent Plugs</h2>
					</p>
				</div>

				<div class="gallery-container">
					<div class="gallery">{renderedPlugs}</div>
				</div>
			</center>
		);
	}
}

ExplorePage.propTypes = {
	error: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	plug: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	errors: state.errors,
	auth: state.auth,
	plug: state.plug,
});

export default connect(mapStateToProps)(ExplorePage);
