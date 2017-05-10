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

function SideBarIconList(props) {
  const { moduleBank, onBoardModules } = props;
  
  const dependencies = getUnmetDependencies(modulesData, onBoardModules, [101,102])
  
  console.log(dependencies);


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
});

export default connect(mapStateToProps)(SideBarIconList);
