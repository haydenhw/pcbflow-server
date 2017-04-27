import React, { Component } from 'react';
import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';
import './side-bar-styles/SideBarIcon.css';


export default class SideBarIcon extends Component {

  handleMouseMovement() {
    this.props.toggleDraggingToBoard();
  }

  handleMouseDown() {
    store.dispatch(actions.mouseDownOnIcon(true));
    store.dispatch(actions.changeDraggingModule(this.props.moduleData));
  }

  render() {
    const style = {
      height: '70px' /* this.props.moduleData.iconHeight*/,
      width: '50px',
      margin: '0 auto',
      marginBottom: '10px',
    };

    return (
      <div
        className="module-icon"
        ref={(module) => { this.selectedModule = module; }}
        onMouseMove={this.handleMouseMovement.bind(this)}
        onMouseDown={this.handleMouseDown.bind(this)}
        onMouseOut={() => store.dispatch(actions.mouseDownOnIcon(false))}
      >
        <img
          className="module-icon-image"
          src={this.props.moduleData.iconSrc}
        />
      </div>
    );
  }
}
