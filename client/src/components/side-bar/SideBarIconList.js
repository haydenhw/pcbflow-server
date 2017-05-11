import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';

import SideBarIcon from './SideBarIcon';
import SideBarIconFrame from './SideBarIconFrame';
import { modulesData } from 'components/modules/modulesData';

function getUnmetDependencyIds(modules, selectedModuleDependencies) {
  const onBoardIds = modules.map((module) => module.id);
  const unmetDependencyIds = selectedModuleDependencies.filter((id) => onBoardIds.indexOf(id) === -1);

  return unmetDependencyIds;
}

function getUnmetDependencies(moduleList, onBoardModules, selectedModuleDependencies) {
  const unmetDependencyIds = getUnmetDependencyIds(onBoardModules, selectedModuleDependencies)
  const unmetDependencies = (
    moduleList.filter(module => unmetDependencyIds.indexOf(module.id) !== -1)
  );
  
  return unmetDependencies;
}

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

function SideBarIconList(props) {
  const { moduleBank, onBoardModules, iconVisibityMode, selectedModuleDependencies } = props;
  const visibleIcons = getVisibleIcons(iconVisibityMode, modulesData, onBoardModules, selectedModuleDependencies); 
  
  const iconList = visibleIcons.map((module, index) => (
    <SideBarIconFrame
      key={index}
      moduleName={module.text}
      modulePrice={module.price}
    >
      <SideBarIcon
        moduleData={module}
        toggleDraggingToBoard={props.toggleDraggingToBoard}
        toggleIsClicked={props.toggleIsClicked}
      />
    </SideBarIconFrame>
    ));

  const style = {
    magrin: '10px auto',
  };

  return (
    <div style={style}>
      {iconList}
    </div>
  );
}

const mapStateToProps = (state, props) => ({
  moduleBank: state.moduleBank,
  onBoardModules: state.currentProjectModules.present,
  iconVisibityMode: state.iconVisibity.mode,
  selectedModuleDependencies: state.iconVisibity.dependencies,
});

export default connect(mapStateToProps)(SideBarIconList);
