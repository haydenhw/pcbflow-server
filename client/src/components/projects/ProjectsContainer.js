import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';

import Modal from 'components/modal/Modal';
import Projects from './Projects';

export class ProjectContainer extends Component {
  componentWillMount() {
    const { shouldRenderModal } = this.props;

    if (shouldRenderModal) {
      store.dispatch(actions.toggleShouldRenderModal());
    }
  }
  
  routeToHome() {
    hashHistory.push('/');
  }

  renderModal() {
    const { shouldRenderModal, modalProps } = this.props;

    if (shouldRenderModal && modalProps) {
      const { projectId, projectName } = modalProps;
      return (
        <Modal
          text={`Are you sure you want to delete project "${projectName}"  ?`}
          shouldRenderLeftButton
          rightButtonText="Delete"
          leftButtonText="Cancel"
          handleRightButtonClick={() => store.dispatch(actions.deleteProject(projectId))}
          handleLeftButtonClick={() => store.dispatch(actions.toggleShouldRenderModal())}
          handleCloseButtonClick={() => store.dispatch(actions.toggleShouldRenderModal())}
        />
      );
    }

    return null;
  }

  render() {
    return (
      <div>
        <Projects handleLinkClick={this.routeToHome} />
        {this.renderModal()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  shouldRenderModal: state.modal.shouldRenderModal,
  modalProps: state.modal.modalProps,
});

export default connect(mapStateToProps)(ProjectContainer);
