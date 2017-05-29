import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';

import Modal from 'components/modal/Modal';
import Projects from './Projects';

export class ProjectContainer extends Component {
  
  renderModal() {
    const { shouldRenderModal, modalProps } = this.props;
    
    if (shouldRenderModal) {
      const { projectId, projectName } = modalProps;
      return (
        <Modal 
          text={`Are you sure you want to delete project "${projectName}"  ?`}
          shouldRenderLeftButton={true}
          rightButtonText="Delete"
          leftButtonText="Cancel"
          handleRightButtonClick={() => store.dispatch(actions.deleteProject(projectId))}
          handleLeftButtonClick={() => store.dispatch(actions.toggleShouldRenderModal())}
          handleCloseButtonClick={() => store.dispatch(actions.toggleShouldRenderModal())}
        />
      );
    }
  }
    
  render() {
    
    return(
      <div>
        <Projects />
        {this.renderModal()} 
      </div>
    )  
  }
}

const mapStateToProps = state => ({
  shouldRenderModal: state.modal.shouldRenderModal,
  modalProps: state.modal.modalProps
});

export default connect(mapStateToProps)(ProjectContainer);