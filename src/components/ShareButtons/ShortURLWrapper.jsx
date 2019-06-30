import React, { Fragment } from 'react';

const ShortURLWrapper = ({ audio, children }) => {
	return (
		<Fragment shortUrl={`https://plug.af/${audio.currentPlug.shortid}`}>
			{children}
		</Fragment>
	);
};
