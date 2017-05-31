import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';

import { getUnmetDependencyIds, getUnmetDependencies } from 'helpers/dependencies';

import SideBarIcon from './SideBarIcon';
import SideBarIconFrame from './SideBarIconFrame';

const getVisibleIcons = (props) => {
  const { iconVisibityMode, moduleData, onBoardModules, selectedModuleDependencies } = props;
  
  switch (iconVisibityMode) {
    case 'ALL':
      return moduleData;
    case 'DEPENDENCY':
      return getUnmetDependencies(moduleData, onBoardModules, selectedModuleDependencies);
    default:
      return moduleList;
  }
};

const SideBarIconList = class extends Component {
  renderSideBarIcon(module, index, isDisabled) {
    const {
      toggleDraggingToBoard,
      toggleIsClicked,
      updateClientPosition,
    } = this.props;

    return (
      <SideBarIcon
        moduleData={module}
        toggleDraggingToBoard={toggleDraggingToBoard}
        toggleIsClicked={toggleIsClicked}
        updateClientPosition={updateClientPosition}
        disabled={isDisabled}
      />
    );
  }

  renderSideBarIconFrame(module, index) {
    const { disabledIconExceptions } = this.props;
    const isDisabled = disabledIconExceptions ? (disabledIconExceptions.indexOf(index) === -1) : false;
    return (
      <SideBarIconFrame
        key={index}
        moduleName={module.text}
        modulePrice={module.price}
        id={module.id}
        hasTooltip={module.hasTooltip}
        disabled={isDisabled}
      >
        {this.renderSideBarIcon(module, index, isDisabled)}
      </SideBarIconFrame>
    );
  }

  render() {
    const visibleIcons = getVisibleIcons(this.props);
    
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
  moduleData: state.moduleData,
  onBoardModules: state.currentProjectModules.present,
  iconVisibityMode: state.iconVisibity.mode,
  selectedModuleDependencies: state.iconVisibity.dependencies,
  disabledIconExceptions: state.tutorial.disabledIconExceptions,
});

export default connect(mapStateToProps)(SideBarIconList);
