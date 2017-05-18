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
  
  const renderImage = () => {
    if (props.image) {
      return (
        <img className={props.imageClassName} src={props.image} alt="completed tutorial project"/>
      );
    }
    
    return null
  } 
  
  return (
    <Modal>
      <div className="modal-content">
        <span className="modal-close">&times;</span>
        <div className="modal-header"></div>
        <div className="modal-text">
          {props.text.split("\n").map((line, index) => <div key={index}>{line}</div>)}
        </div>
          {renderImage()}
        <div className="modal-button-wrapper">
          {renderBackButton()}
          <button className="modal-button" onClick={handleClick}>{props.nextButtonText}</button>
        </div>
      </div>
    </Modal>
  )
}