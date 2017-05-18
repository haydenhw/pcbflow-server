import React, { Component } from 'react';
import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';
import './side-bar-styles/SideBarIcon.css';


export default class SideBarIcon extends Component {

  handleMouseDown(evt) {
    this.props.updateClientPosition(evt);
    this.props.toggleDraggingToBoard();
    store.dispatch(actions.mouseDownOnIcon(true));
    store.dispatch(actions.changeDraggingModule(this.props.moduleData));
  }

  render() {
    const { disabled, moduleData } = this.props;
    const cursorDefault = {
      cursor: 'default'
    }
    return (
      <div
        className="module-icon"
        ref={module => { this.selectedModule = module; }}
        onMouseDown={disabled ? null : this.handleMouseDown.bind(this)}
        onMouseOut={disabled ? null : () => store.dispatch(actions.mouseDownOnIcon(false))}
      >
        <img
          className="module-icon-image"
          style={disabled ? cursorDefault: {}}
          draggable={false}
          src={moduleData.iconSrc}
        />
      </div>
    );
  }
}
