import React, { Component } from 'react';

import SideBarIconList from './SideBarIconList';
import SideBarIcon from './SideBarIcon';
import DimensionForm from './SideBarDimensionInput';
import SideBarDependencyMessage from './SideBarDependencyMessage';

import './side-bar-styles/SideBar.css';

export default function SideBar(props) {
  const { showAll, updateClientPosition } = props
  const { mode, moduleName, dependencies } = props.iconVisibityData
  
  const style = {
    height: '100% !important',
    width: '200px',
    position: 'fixed',
    zIndex: '1',
    left: '0px',
    verticalAlign: 'top',
  };
  
  const renderDependencyMessage = () => {
    if ((mode === 'DEPENDENCY') && (dependencies.length > 0)) {
      return (
        <SideBarDependencyMessage 
          moduleName={moduleName}
          showAll={showAll} 
        />
      );
    }
    return null;
  }
  
  return (
    <div className="sideBar" style={style}>
      {renderDependencyMessage()}
      <div className="module-container">
        <SideBarIconList
          toggleDraggingToBoard={props.toggleDraggingToBoard}
          toggleIsClicked={props.toggleIsClicked}
          onBoardModulesLength={props.onBoardModulesLength}
          updateClientPosition={updateClientPosition}
        />
      </div>
      <DimensionForm />
    </div>
  );
}
