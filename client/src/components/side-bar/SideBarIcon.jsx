import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as actions from 'actions/indexActions';
import store from 'store/store';

import './side-bar-styles/_SideBarIcon.scss';

export default class SideBarIcon extends Component {
  constructor() {
    super();
    this.handleMouseDown = this.handleMouseDown.bind(this);
  }

  handleMouseDown(evt) {
    if (evt.nativeEvent.which === 1) {
      const { moduleData } = this.props;
      const { clientX, clientY } = evt;

      this.props.toggleDraggingToBoard();
      store.dispatch(actions.toggleIsMouseDownOnIcon(true));
      store.dispatch(actions.updateDraggingModule(moduleData, clientX, clientY));
    }
  }

  handleMouseOut() {
    store.dispatch(actions.toggleIsMouseDownOnIcon(false));
  }

  render() {
    const { disabled, moduleData } = this.props;
    const cursorDefault = {
      cursor: 'default',
    };
    return (
      <div
        className="module-icon"
        ref={(module) => { this.hoveredModule = module; }}
        onMouseDown={disabled ? null : this.handleMouseDown}
        onMouseOut={disabled ? null : this.handleMouseOut}
        role="button"
      >
        <img
          className="module-icon-image"
          style={disabled ? cursorDefault : {}}
          draggable={false}
          src={moduleData.iconSrc}
          alt="module icon"
        />
      </div>
    );
  }
}

SideBarIcon.propTypes = {
  disabled: PropTypes.bool.isRequired,
  moduleData: PropTypes.object.isRequired,
};
