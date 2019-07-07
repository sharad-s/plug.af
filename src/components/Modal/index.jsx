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
        <button onClick={this.onOpenModal}>Open modal</button>
        <Modal open={page.modalOpen} onClose={this.onCloseModal} center>
          <h2>Simple centered modal</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
            hendrerit risus, sed porttitor quam.
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
