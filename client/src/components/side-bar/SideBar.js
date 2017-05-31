import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SideBarIconList from './SideBarIconList';
import DimensionForm from './SideBarDimensionInput';
import SideBarDependencyMessage from './SideBarDependencyMessage';

import './side-bar-styles/SideBar.css';

export default function SideBar(props) {

  const style = {
    height: '100% !important',
    width: '200px',
    position: 'fixed',
    zIndex: '1',
    left: '0px',
    verticalAlign: 'top',
  };

  const renderDependencyMessage = () => {
    const { showAll, iconVisibityData } = props;
    const { mode, moduleName, dependencies } = iconVisibityData;
    
    if ((mode === 'DEPENDENCY') && (dependencies.length > 0)) {
      return (
        <SideBarDependencyMessage
          moduleName={moduleName}
          showAll={showAll}
        />
      );
    }
    return null;
  };
  
  const { 
    disabledIconExceptions,
    onBoardModulesLength,
    toggleDraggingToBoard,
    toggleIsClicked,
    updateClientPosition,
  } = props;
  
  return (
    <div className="sideBar" style={style}>
      {renderDependencyMessage()}
      <div className="module-container">
        <SideBarIconList
          onBoardModulesLength={onBoardModulesLength}
          toggleDraggingToBoard={toggleDraggingToBoard}
          toggleIsClicked={toggleIsClicked}
          updateClientPosition={updateClientPosition}
        />
      </div>
      <DimensionForm />
    </div>
  );
}

SideBar.propTypes = {
  disabledIconExceptions: PropTypes.func,
  iconVisibityData: PropTypes.object.isRequired,
  onBoardModulesLength: PropTypes.number,
  showAll: PropTypes.func.isRequired,
  toggleDraggingToBoard: PropTypes.func.isRequired,
  toggleIsClicked: PropTypes.func,
  updateClientPosition: PropTypes.func.isRequired,
};
