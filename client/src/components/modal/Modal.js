import React, { Component } from 'react';

import RootModal from './RootModal';
import './Modal.css'


export default class DesignToolOnboardModal extends Component {

  componentDidUpdate() {
    if (this.props.handleDidUpdate) {
      this.props.handleDidUpdate();
    }
  }
  
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
          className="modal-button-left modal-button"
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
        <img 
          className={`modal-image ${this.props.image.class}`} 
          src={this.props.image.src} 
          alt={this.props.image.alt} 
        />
      );
    }
    
    return null
  } 
  
  renderList() {
    const { list1, list2 } = this.props;
    
    if (list1 && !list2){
      const items = list1.map((item, index) => <li key={index} >{item}</li>);
      
      return (
        <div className="list-wrapper">
          <ul>{items}</ul>
        </div>
      )
    }
    
    if (list1 && list2){
      const items1 = list1.map((item, index) => <li key={index} >{item}</li>);
      const items2 = list2.map((item, index) => <li key={index} >{item}</li>);
      
      return (
        <div className="list-wrapper">
          <ul>{items1}</ul>
          <ul>{items2}</ul>
        </div>
      )
    }
    
    return null;
  }
  
  render() {
    const rightButtonClass = `modal-button ${this.props.rightButtonClass}`
    return (
      <RootModal>
        <div className={`modal-content ${this.props.modalClass}`}>
          <span className="modal-close" onClick={this.handleCloseButtonClick.bind(this)}>&times;</span>
          <div className="modal-title">{this.props.title}</div>
          <div className="modal-text-parent">
            <div className="modal-text-child">
              {this.props.text.split("\n").map((line, index) => <p key={index}>{line}</p>)}
              {this.renderList()}
            </div>
          </div>
            {this.renderImage()}
            <div className="modal-footer">
              <div className="modal-button-wrapper">
                {this.renderLeftButton()}
                <button className={`modal-button-right modal-button ${rightButtonClass}`} 
                  onClick={this.handleRightButtonClick.bind(this)}
                >
                  {this.props.rightButtonText}
                </button>
              </div>
            </div>
        </div>
      </RootModal>
    )
  }
}