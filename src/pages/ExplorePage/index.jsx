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

		const renderedPlugs = isEmpty(plugs)
			? null
			: plugs.map(plug => {
					// Check Creator name if exists
					const creatorName =
						plug.creator === null ? 'Anonymous' : plug.creator.name;

					return (
						<li class="event" data-date="5 seconds ago">
							<Link to={`/${plug.shortID}`}>
								<img class="activity-image" src={plug.imageURL} />
							</Link>
							<h3>
								A new Plug has been created by <b>{creatorName}</b>
							</h3>
							<p>
								<Link class="plug-link" to={`/${plug.shortID}`}>
									Click here to listen
								</Link>
							</p>
						</li>
					);
			  });

		return (
			<center>
				<div class="drop-in">
					<p class="login-text">
						<h2 class="title">Recent Plugs</h2>
					</p>
				</div>

				<div>
					<ul class="timeline">{renderedPlugs}</ul>
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
