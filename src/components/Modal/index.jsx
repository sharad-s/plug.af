import React from 'react';
import Modal from 'react-responsive-modal';

// Redux
import { connect } from 'react-redux';
import { openModal, closeModal } from "../../features/page"

class ReusableModal extends React.Component {
  state = {
    open: false,
  };

  onOpenModal = () => {
    openModal()
  };

  onCloseModal = () => {
    closeModal()
  };

  render() {
    const { page } = this.props;

    return (
      <div>
        <Modal open={false} onClose={this.onCloseModal} center>
          <h1>Enjoying Plug?</h1>
          <p>
           Get your email to be notified on all future updates!
          </p>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  page: state.page,
});

export default connect(mapStateToProps)(ReusableModal);
