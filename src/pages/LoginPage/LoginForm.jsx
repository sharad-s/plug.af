import React, { Fragment } from 'react';

const LoginForm = ({
	emailInput,
	passwordInput,
	onChange,
	onSubmit,
}) => (
	<Fragment>
		<p className="login-text">Login</p>
		<form className="pure-form flexstart-vert-flex" onSubmit={onSubmit}>
			<input
				type="text"
				className="form-input"
				placeholder="Email"
				name="email"
				value={emailInput}
				onChange={onChange}
				required
			/>

			<br />

			<input
				type="password"
				className="form-input"
				placeholder="Password"
				name="password"
				value={passwordInput}
				onChange={onChange}
				required
			/>
			<br />

			<input
				type="submit"
				value="Login"
				className="pure-button btn-share button-enlarge"
			/>
		</form>
	</Fragment>
);

export default LoginForm;