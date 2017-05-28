import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';

import Modal from 'components/modal/Modal';
import Projects from './Projects';

export class ProjectContainer extends Component {
  renderModal() {
    const { shouldRenderModal } = this.props;
    console.log(shouldRenderModal)
    if (shouldRenderModal) {
      return (
        <Modal 
          text="Are you sure you want to exit the tutorial?"
          rightButtonText="Cancel"
          shouldRenderLeftButton={true}
          leftButtonText="Delete"
          handleRightButtonClick={() => store.dispatch(actions.exitTutorial())}
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
  shouldRenderModal: state.modal.shouldRenderModal

});

export default connect(mapStateToProps)(ProjectContainer);