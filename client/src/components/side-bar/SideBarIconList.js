import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SideBarIcon from './SideBarIcon';
import SideBarIconFrame from './SideBarIconFrame';

const SideBarIconList = class extends Component {
  renderSideBarIcon(module, index, isDisabled) {
    const { toggleDraggingToBoard, toggleIsClicked } = this.props;

    return (
      <SideBarIcon
        disabled={isDisabled}
        moduleData={module}
        toggleDraggingToBoard={toggleDraggingToBoard}
        toggleIsClicked={toggleIsClicked}
      />
    );
  }

  renderSideBarIconFrame(module, index) {
    const { disabledIconExceptions } = this.props;
    const isDisabled = (
      disabledIconExceptions ? (disabledIconExceptions.indexOf(index) === -1) : false
    );

    return (
      <SideBarIconFrame
        key={index}
        moduleName={module.text}
        modulePrice={module.price}
        id={module.dependencyId}
        disabled={isDisabled}
      >
        {this.renderSideBarIcon(module, index, isDisabled)}
      </SideBarIconFrame>
    );
  }

  render() {
    const { visibleIcons } = this.props;

    const iconList = visibleIcons.map((module, index) => (
      this.renderSideBarIconFrame(module, index)
    ));

    return (
      <div>
        {iconList}
      </div>
    );
  }
};

const mapStateToProps = state => ({
  disabledIconExceptions: state.tutorial.disabledIconExceptions,
  showAllIcons: state.sideBar.showAllIcons,
});

export default connect(mapStateToProps)(SideBarIconList);

SideBarIconList.propTypes = {
  disabledIconExceptions: PropTypes.array,
  showAllIcons: PropTypes.bool.isRequired,
  toggleDraggingToBoard: PropTypes.func.isRequired,
  toggleIsClicked: PropTypes.func,
};
