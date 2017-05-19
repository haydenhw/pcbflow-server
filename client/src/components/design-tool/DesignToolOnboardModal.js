import React from 'react';

import Modal from 'components/modal/Modal';
import './design-tool-styles/DesignToolOnboardModal.css'


export default function DesignToolOnboardModal(props) {
  const handleCloseButtonClick = () => {
    props.handleCloseButtonClick();
  }
  
  const handleNextButtonClick = () => {
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
  
  const nextButtonClass = `modal-button ${props.nextButtonClass}`
  
  return (
    <Modal>
      <div className="modal-content">
        <span className="modal-close" onClick={handleCloseButtonClick}>&times;</span>
        <div className="modal-header"></div>
        <div className="modal-text">
          {props.text.split("\n").map((line, index) => <div key={index}>{line}</div>)}
        </div>
          {renderImage()}
        <div className="modal-button-wrapper">
          {renderBackButton()}
          <button className={nextButtonClass} onClick={handleNextButtonClick}>{props.nextButtonText}</button>
        </div>
      </div>
    </Modal>
  )
}