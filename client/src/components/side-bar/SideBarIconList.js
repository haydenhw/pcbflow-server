import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';

import SideBarIcon from './SideBarIcon';
import SideBarIconFrame from './SideBarIconFrame';
import { modulesData } from 'components/modules/modulesData';

function getUnmetDependencyIds(modules, dependencies) {
  const onBoardIds = modules.map((module) => module.id);
  const unmetDependencyIds = dependencies.filter((id) => onBoardIds.indexOf(id) === -1);

  return unmetDependencyIds;
}

function getUnmetDependencies(moduleList, onBoardModules, dependencies) {
  const unmetDependencyIds = getUnmetDependencyIds(onBoardModules, dependencies)
  const unmetDependencies = (
    moduleList.filter(module => unmetDependencyIds.indexOf(module.id) !== -1)
  );
  
  return unmetDependencies;
}

const  getVisibleIcons = (visibilityMode, moduleList, onBoardModules, dependencies ) => {
  switch(visibilityMode) {
    case 'ALL':
      return moduleList;
    case 'DEPENDENCY':
      return getUnmetDependencies(moduleList, onBoardModules, dependencies);
    default:
      return moduleList;
  }
}

function SideBarIconList(props) {
  const { moduleBank, onBoardModules, } = props;
  
  const dependencies = getUnmetDependencies(modulesData, onBoardModules, [101,102])
  
  // store.dispatch(actions.updateIconVisibity('DEPENDENCY'))
  //store.dispatch(actions.updateCurrentDependencies([123, 101]))
  const visibleIcons = getVisibleIcons('DEPENDENCY', modulesData, onBoardModules, [101,102]); 
  console.log(visibleIcons);
  const iconList = modulesData.map((module, index) => (
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
  dependencies: state.iconVisibity.dependencies,
});

export default connect(mapStateToProps)(SideBarIconList);
