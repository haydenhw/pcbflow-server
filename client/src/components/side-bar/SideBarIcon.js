import React, { Component } from 'react';
import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';
export default class SideBarIcon extends Component {
  
  handleMouseMovement() {
    this.props.toggleDraggingToBoard();
  }
  
  
  handleMouseDown() {
    store.dispatch(actions.mouseDownOnIcon(true))
    store.dispatch(actions.changeDraggingModule(this.props.moduleData));
  }

  render() {
    const style = {
      "height": this.props.moduleData.iconHeight,
      "width": "auto",
      "margin": "0 auto",
      "marginLeft": "10px",
      "marginBottom": "10px"
    }
    
    return (
      <div 
        style={style}
        ref={(module) => { this.selectedModule = module; }} 
        onMouseMove={ this.handleMouseMovement.bind(this) } 
        onMouseDown={ this.handleMouseDown.bind(this) }
        onMouseOut={ () => store.dispatch(actions.mouseDownOnIcon(false)) }
      >
        <img
          src={this.props.moduleData.iconSrc}
          style={style}
        />
      </div>
    );
  }
}