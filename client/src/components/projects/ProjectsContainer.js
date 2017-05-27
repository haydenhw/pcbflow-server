import React, { Component } from 'react';
import { connect } from 'react-redux';
import Projects from './Projects';
import Modal from 'componets/modal/Modal';

export class ProjectContainer extends Component {
  render() {
    renderModal() {
      return (
        <Modal 
          text="Are you sure you want to exit the tutorial?"
          rightButtonText="Exit"
          shouldRenderLeftButton={true}
          leftButtonText="Go Back"
          handleRightButtonClick={() => store.dispatch(actions.exitTutorial())}
          handleLeftButtonClick={() => store.dispatch(actions.resumeTutorial())}
          handleCloseButtonClick={() => store.dispatch(actions.exitTutorial())}
        />
    }
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

});

export default connect(mapStateToProps)(ProjectContainer);