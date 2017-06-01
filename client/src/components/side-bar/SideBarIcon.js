import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';

import './side-bar-styles/SideBarIcon.css';

export default class SideBarIcon extends Component {
  constructor() {
    super();
    this.handleMouseDown = this.handleMouseDown.bind(this);
  }

  handleMouseDown(evt) {
    if (evt.nativeEvent.which === 1) {
      const { moduleData } = this.props;
      const { id } = moduleData;
      this.props.updateClientPosition(evt);
      this.props.toggleDraggingToBoard();

      store.dispatch(actions.mouseDownOnIcon(true));
      store.dispatch(actions.toggleHasTooltip(id));
      store.dispatch(actions.changeDraggingModule(moduleData));
    }
  }

  handleMouseOut() {
    store.dispatch(actions.mouseDownOnIcon(false));
  }

  render() {
    const { disabled, moduleData } = this.props;
    const cursorDefault = {
      cursor: 'default',
    };
    return (
      <div
        className="module-icon"
        ref={(module) => { this.selectedModule = module; }}
        onMouseDown={disabled ? null : this.handleMouseDown}
        onMouseOut={disabled ? null : this.handleMouseOut}
        role="button"
      >
        <img
          className="module-icon-image"
          style={disabled ? cursorDefault : {}}
          draggable={false}
          src={moduleData.iconSrc}
          alt="module icon image"
        />
      </div>
    );
  }
}

SideBarIcon.propTypes = {
  disabled: PropTypes.bool.isRequired,
  moduleData: PropTypes.object.isRequired,
};
