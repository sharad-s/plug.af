import React, { Component } from 'react';

export default class LoginPage extends Component {
	render() {
		return (
			<div class="drop-in centered-vert-flex">
					<p class="login-text">
						Login
					</p>
					<form class="pure-form flexstart-vert-flex" onSubmit={this.handleSubmit}>
						<input
							type="text"
							class="form-input"
							placeholder="Username"
							value=""
							onChange=""
							required
						/>
						<br />
            <input
							type="password"
							class="form-input"
							placeholder="Password"
							value=""
							onChange=""
							required
						/>
						<p class="error-message"></p>

						<input type="submit" value="Login" class="pure-button btn-share" />
					</form>
				</div>
		);
	}
}
