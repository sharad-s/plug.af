import React from 'react';
import { Link } from 'react-router-dom';

import { track_ClickedPlugOnExplore } from '../../utils/mixpanel';

export default ({ plug }) => (
	<div
		class="gallery-item"
		tabindex="0"
		onClick={() => {
			track_ClickedPlugOnExplore(plug.shortID);
		}}
	>
		<Link to={`/${plug.shortID}`}>
			<img src={plug.imageURL} class="gallery-image" alt="" />

			<div class="gallery-item-info">
				<ul>
					<li class="gallery-item-likes">
						<span class="visually-hidden">Plays:</span>
						<i class="fas fa-play" aria-hidden="true" /> {plug.playCount}
					</li>
				</ul>
			</div>
		</Link>
	</div>
);
