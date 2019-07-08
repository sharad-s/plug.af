import React from 'react';
import Modal from 'react-responsive-modal';
import MailchimpSubscribe from "react-mailchimp-subscribe"

// Redux
import { connect } from 'react-redux';
import { openModal, closeModal } from '../../features/page';

const url = "https://gmail.us3.list-manage.com/subscribe/post?u=9f2549c5e250ac187e370b912&amp;id=aed86d0f51"

class ReusableModal extends React.Component {
	state = {
		open: true,
	};

	onOpenModal = () => {
		openModal();
	};

	onCloseModal = () => {
		closeModal();
		this.setState({open:false})
	};

	render() {
		const { page } = this.props;

		return (
			<div>
				<Modal open={this.state.open} onClose={this.onCloseModal} center>
					<h1>Join our Community</h1>
					<MailchimpSubscribe url={url}/>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	page: state.page,
});

export default connect(mapStateToProps)(ReusableModal);
