import React, { Component } from 'react';

import Modal from 'components/modal/Modal';
import './design-tool-styles/DesignToolOnboardModal.css'


export default class DesignToolOnboardModal extends Component {
  componentDidMount() {
    if (this.props.handleDidMount) {
      this.props.handleDidMount();
    }
  }
  
  handleCloseButtonClick() {
    this.props.handleCloseButtonClick();
  }
  
  handleNextButtonClick() {
    this.props.handleNextButtonClick();
  }
  
  renderBackButton() {
    if (this.props.shouldRenderBackButton) {
      return (
        <button 
          className="modal-button"
          onClick={() => this.props.handleBackButtonClick()}
        >
          {this.props.backButtonText}
        </button>
      );
    }
    
    return null;
  }
  
  renderImage() {
    if (this.props.image) {
      return (
        <img className={this.props.imageClassName} 
          src={this.props.image} 
          alt="completed tutorial project" 
        />
      );
    }
    
    return null
  } 
  
  render() {
    const nextButtonClass = `modal-button ${this.props.nextButtonClass}`
    
    return (
      <Modal>
        <div className="modal-content">
          <span className="modal-close" onClick={this.handleCloseButtonClick.bind(this)}>&times;</span>
          <div className="modal-header"></div>
          <div className="modal-text">
            {this.props.text.split("\n").map((line, index) => <div key={index}>{line}</div>)}
          </div>
            {this.renderImage()}
          <div className="modal-button-wrapper">
            {this.renderBackButton()}
            <button className={nextButtonClass} 
              onClick={this.handleNextButtonClick.bind(this)}>
              {this.props.nextButtonText}
            </button>
          </div>
        </div>
      </Modal>
    )
  }
}