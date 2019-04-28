import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default class ShareButton extends Component {
	state = {
		copied: false,
	};

	handleCopy = async () => {
		this.setState({ copied: true });
		alert("Copied to Clipboard")
	};

	render() {
		const url = this.props.url;
		return (
			<div>
				<CopyToClipboard text={url} onCopy={this.handleCopy}>
					<button>
						<i className="fas fa-link icon-hover" />
					</button>
				</CopyToClipboard>
				<br />
				
			</div>
		);
	}
}
