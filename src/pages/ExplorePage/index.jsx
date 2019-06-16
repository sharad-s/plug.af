import React, { Component } from 'react';

class ExplorePage extends Component {
	render() {
		return (
			<center>
				<div class="drop-in">
					<p class="login-text">
						<h2 class="title">Recent Plugs</h2>
					</p>
				</div>
				<div>
					<ul class="timeline">
						<li class="event" data-date="5 seconds ago">
							<img
								class="activity-image"
								src="https://pbs.twimg.com/profile_images/1248509273/39198_1571854573776_1157872547_31663366_5779158_n.jpg"
							/>
							<h3>
								A new Plug has been created by <b>Chase</b>
							</h3>
							<p>
								<a class="plug-link" href="#">
									Click here to listen
								</a>
							</p>
						</li>
						<li class="event" data-date="10 seconds ago">
							<img
								class="activity-image"
								src="https://pbs.twimg.com/profile_images/1248509273/39198_1571854573776_1157872547_31663366_5779158_n.jpg"
							/>

							<h3>
								A new Plug has been created by <b>Sharad</b>
							</h3>
							<p>
								<a class="plug-link" href="#">
									Click here to listen
								</a>
							</p>
						</li>
						<li class="event" data-date="40 seconds ago">
							<img
								class="activity-image"
								src="https://pbs.twimg.com/profile_images/1248509273/39198_1571854573776_1157872547_31663366_5779158_n.jpg"
							/>

							<h3>
								A new Plug has been created by <b>Lil B Based God</b>
							</h3>
							<p>
								<a class="plug-link" href="#">
									Click here to listen
								</a>
							</p>
						</li>
						<li class="event" data-date="2 minutes ago">
							<img
								class="activity-image"
								src="https://pbs.twimg.com/profile_images/1248509273/39198_1571854573776_1157872547_31663366_5779158_n.jpg"
							/>

							<h3>
								A new Plug has been created by <b>Bake Boonwall</b>
							</h3>
							<p>
								<a class="plug-link" href="#">
									Click here to listen
								</a>
							</p>
						</li>
					</ul>
				</div>
			</center>
		);
	}
}

export default ExplorePage;
