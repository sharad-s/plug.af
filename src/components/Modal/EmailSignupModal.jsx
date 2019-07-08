import React from 'react';
import Modal from 'react-responsive-modal';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

// Redux
import { connect } from 'react-redux';
import { openModal, closeModal } from '../../features/page';

import { setEmailCollected } from '../../utils/localstorage';

const url =
	'https://gmail.us3.list-manage.com/subscribe/post?u=9f2549c5e250ac187e370b912&amp;id=aed86d0f51';

const SimpleForm = () => <MailchimpSubscribe url={url} />;

class ReusableModal extends React.Component {
	state = {
		open: true,
	};

	onOpenModal = () => {
		openModal();
	};

	onCloseModal = () => {
		closeModal();
		this.setState({ open: false });
	};

	render() {
		const { page } = this.props;

		return (
			<div>
				<Modal open={false} onClose={this.onCloseModal} center>
					<h1>Join our Community</h1>
					<MailchimpSubscribe
						url={url}
						render={({ subscribe, status, message }) => {
							if (status === 'success') {
								setEmailCollected();
							}

							return (
								<div>
									<SimpleForm onSubmitted={formData => subscribe(formData)} />
									{status === 'sending' && (
										<div style={{ color: 'blue' }}>sending...</div>
									)}
									{status === 'error' && (
										<div
											style={{ color: 'red' }}
											dangerouslySetInnerHTML={{ __html: message }}
										/>
									)}
									{status === 'success' && (
										<div style={{ color: 'green' }}>Subscribed !</div>
									)}
								</div>
							);
						}}
					/>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	page: state.page,
});

export default connect(mapStateToProps)(ReusableModal);
