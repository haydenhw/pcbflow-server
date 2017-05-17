import React from 'react';

import Modal from 'components/modal/Modal';
import './design-tool-styles/DesignToolOnboardModal.css'

export default function DesignToolOnboardModal(props) {
  const handleClick = () => {
    props.handleNextButtonClick();
  }
  
  const renderBackButton = () => {
    if (props.shouldRenderBackButton) {
      return (
        <button 
          className="modal-button"
          onClick={() => props.handleBackButtonClick()}
        >
          {props.backButtonText}
        </button>
      );
    }
    
    return null;
  }
  
  return (
    <Modal>
      <div className="modal-content">
        <span className="modal-close">&times;</span>
        <div className="modal-header"></div>
        
         <p className="modal-text">{props.text}</p>
         <div className="modal-button-wrapper">
           {renderBackButton()}
           <button className="modal-button" onClick={handleClick}>{props.nextButtonText}</button>
         </div>
      </div>
    </Modal>
  )
}