import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';
import { getUnmetDependencyIds, getUnmetDependencies } from 'helpers/dependencies';
import { modulesData } from 'components/modules/modulesData';

import SideBarIcon from './SideBarIcon';
import SideBarIconFrame from './SideBarIconFrame';

const  getVisibleIcons = (visibilityMode, moduleList, onBoardModules, selectedModuleDependencies ) => {
  switch(visibilityMode) {
    case 'ALL':
      return moduleList;
    case 'DEPENDENCY':
      return getUnmetDependencies(moduleList, onBoardModules, selectedModuleDependencies);
    default:
      return moduleList; 
  }
}

let SideBarIconList = class extends Component {
  
  displayAllIcons() {
    const { 
      onBoardModules,
      iconVisibityMode,
      selectedModuleDependencies,
    } = this.props;
    const visibleIcons = getVisibleIcons(iconVisibityMode, modulesData, onBoardModules, selectedModuleDependencies); 
    
    if (visibleIcons.length === modulesData.length) {
      //store.dispatch(actions.updateIconVisibity('ALL'));
    }
  }
  
  componentDidMount() {
    this.displayAllIcons();
  }
  
  renderSideBarIcon(module, index, isDisabled) {
    const { 
      toggleDraggingToBoard,
      toggleIsClicked,
      updateClientPosition, 
    } = this.props
    
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
        disabled={isDisabled}
        >
        {this.renderSideBarIcon(module, index, isDisabled)}
      </SideBarIconFrame>
    );
  }

  render() {
    const { onBoardModules, iconVisibityMode, selectedModuleDependencies } = this.props;
    const visibleIcons = getVisibleIcons(iconVisibityMode, modulesData, onBoardModules, selectedModuleDependencies); 
    const iconList = visibleIcons.map((module, index) => this.renderSideBarIconFrame(module, index));
    
    return (
      <div>
        {iconList}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  moduleBank: state.moduleBank,
  onBoardModules: state.currentProjectModules.present,
  iconVisibityMode: state.iconVisibity.mode,
  selectedModuleDependencies: state.iconVisibity.dependencies,
  disabledIconExceptions: state.tutorial.disabledIconExceptions
});

export default connect(mapStateToProps)(SideBarIconList);