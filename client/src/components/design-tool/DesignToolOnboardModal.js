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
  
  handleRightButtonClick() {
    this.props.handleRightButtonClick();
  }
  
  renderLeftButton() {
    if (this.props.shouldRenderLeftButton) {
      return (
        <button 
          className="modal-button"
          onClick={() => this.props.handleLeftButtonClick()}
        >
          {this.props.leftButtonText}
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
  
  renderList() {
    const { list } = this.props;
    
    if (list){
      const items = list.map((item, index) => <li key={index} >{item}</li>);
      
      return <ul style={{textAlign: "left" }}>{items}</ul>
    }
    
    return null;
  }
  
  render() {
    const rightButtonClass = `modal-button ${this.props.rightButtonClass}`
    
    return (
      <Modal>
        <div className="modal-content">
          <span className="modal-close" onClick={this.handleCloseButtonClick.bind(this)}>&times;</span>
          <div className="modal-header"></div>
          <div className="modal-text">
            {this.props.text.split("\n").map((line, index) => <p key={index}>{line}</p>)}
            {this.renderList()}
          </div>
            {this.renderImage()}
          <div className="modal-button-wrapper">
            {this.renderLeftButton()}
            <button className={rightButtonClass} 
              onClick={this.handleRightButtonClick.bind(this)}>
              {this.props.rightButtonText}
            </button>
          </div>
        </div>
      </Modal>
    )
  }
}