import React, { Component } from 'react';

import SideBarIconList from './SideBarIconList';
import SideBarIcon from './SideBarIcon';
import DimensionForm from './SideBarDimensionInput';
import SideBarDependencyMessage from './SideBarDependencyMessage';

import './side-bar-styles/SideBar.css';

export default function SideBar(props) {
  const { showAll } = props
  const { mode, moduleName } = props.iconVisibityData
  
  const style = {
    height: '100% !important',
    width: '200px',
    position: 'fixed',
    zIndex: '1',
    left: '0px',
    verticalAlign: 'top',
  };
  
  const dependencyMessage = (
    <SideBarDependencyMessage 
      moduleName={moduleName}
      showAll={showAll} 
    />
  );
  
  return (
    <div className="sideBar" style={style}>
      {mode === 'DEPENDENCY' && dependencyMessage}
      <div className="module-container">
        <SideBarIconList
          toggleDraggingToBoard={props.toggleDraggingToBoard}
          toggleIsClicked={props.toggleIsClicked}
          onBoardModulesLength={props.onBoardModulesLength}
        />
      </div>
      <DimensionForm />
    </div>
  );
}
