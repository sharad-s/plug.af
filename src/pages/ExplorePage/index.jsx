import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import InfiniteScroll from 'react-infinite-scroller';

import isEmpty from '../../utils/isEmpty';

// Redux
import { connect } from 'react-redux';
// Plug Actions
import { getPlugs } from '../../features/plugs/actions';

class ExplorePage extends Component {
	state = {
		plugs: [],
		pageNum: 0,
		loading: false,
	};

	loadFunc = async () => {
		let { plugs, pageNum } = this.state;

		// get New Plugs from next page
		const nextPage = pageNum + 1;
		const nextPlugs = await getPlugs(nextPage);
		plugs = [...plugs, ...nextPlugs];

		this.setState({ plugs, pageNum: nextPage }, () => {
			console.log('LOADFUNC SET STATE', this.state);
		});
	};

	render() {
		const { plugs } = this.state;

		const renderedPlugs = isEmpty(plugs)
			? null
			: plugs.map((plug, idx) => {
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
			  });

		return (
			<center>
				<div class="drop-in">
					<p class="login-text">
						<h2 class="title recent-plugs">Recent Plugs</h2>
					</p>
				</div>

				<div class="gallery-container">
					<InfiniteScroll
						pageStart={0}
						loadMore={this.loadFunc}
						hasMore={true}
						loader={<div class="loader" />}
					>
						<div class="gallery">{renderedPlugs}</div>
					</InfiniteScroll>
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
