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

function SideBarIconList(props) {
  const { onBoardModules, iconVisibityMode, selectedModuleDependencies } = props;
  const visibleIcons = getVisibleIcons(iconVisibityMode, modulesData, onBoardModules, selectedModuleDependencies); 
    console.log(visibleIcons.length, modulesData.length)
    
  if (visibleIcons.length === modulesData.length) {
    store.dispatch(actions.updateIconVisibity('ALL'));
  }
  
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
    magrin: '10px auto'
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