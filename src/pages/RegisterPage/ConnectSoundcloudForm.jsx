import React, { Fragment } from 'react';

const ConnectSoundcloudForm = ({
	soundcloudURLInput,
	onChangeSoundcloudURL,
	handleFinalSubmit,
}) => (
	<Fragment>
		<p className="login-text"> Welcome to the Fam 🔌⚡️</p>
		<p className="instructions">
			Connect with Soundcloud or just drop your Soundcloud Profile URL below!
		</p>
		<form class="pure-form width-70" onSubmit={handleFinalSubmit}>
			<input
				type="text"
				className="sc-input width-100"
				placeholder="Soundcloud Url"
				name="soundcloudURL"
				value={soundcloudURLInput}
				onChange={onChangeSoundcloudURL}
				required
			/>
			<input type="submit" value="Plug it" className="pure-button btn-share" />
		</form>
	</Fragment>
);

export default ConnectSoundcloudForm;
