import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import * as actions from 'actions/indexActions';
import store from 'store/store';

import Modal from 'components/modal/Modal';
import Projects from './Projects';

export class ProjectContainer extends Component {
  componentWillMount() {
    const { showModal } = this.props;

    if (showModal) {
      store.dispatch(actions.toggleModal());
    }
  }

  routeToHome() {
    hashHistory.push('/');
  }

  renderModal() {
    const { showModal, modalProps } = this.props;

    if (showModal && modalProps) {

      return (
        <Modal
          handleCloseButtonClick={() => store.dispatch(actions.toggleModal())}
          handleLeftButtonClick={() => store.dispatch(actions.toggleModal())}
          handleRightButtonClick={() => store.dispatch(actions.deleteProject(modalProps))}
          leftButtonText="Cancel"
          rightButtonText="Delete"
          showLeftButton
          title="Confirm Delete"
          text={`Are you sure you want to delete project "${modalProps.name}"  ?`}
        />
      );
    }

    return null;
  }

  render() {
    return (
      <div>
        <Projects handleHomeButtonClick={this.routeToHome} />
        {this.renderModal()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  modalProps: state.modal.modalProps,
  showModal: state.modal.showModal,
});

export default connect(mapStateToProps)(ProjectContainer);

ProjectContainer.propTypes = {
  showModal: PropTypes.bool.isRequired,
  modalProps: PropTypes.object,
};
