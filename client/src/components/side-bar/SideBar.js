// fix shouldComponentUpdate function
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getUnmetDependencies } from 'helpers/dependencies';
import { getUnsatisfiedModule } from 'helpers/moduleHelpers';

import { compose } from 'helpers/functional';

import SideBarIconList from './SideBarIconList';
import DimensionForm from './SideBarDimensionInput';
import SideBarDependencyMessage from './SideBarDependencyMessage';

import './side-bar-styles/_SideBar.scss';

// *move to css file
const style = {
  height: '100% !important',
  width: '200px',
  position: 'fixed',
  zIndex: '1',
  left: '0px',
  verticalAlign: 'top',
}

export default class SideBar extends Component {
  renderDependencyMessage = (unsatisfiedModule) => {
   const
   {
     activeModules,
     showAllIcons,
     clickedModuleIndex,
     moduleData,
     showAll,
   } = this.props;

    const moduleName = unsatisfiedModule && unsatisfiedModule.text;

    if (!showAllIcons && moduleName) {
      return (
        <SideBarDependencyMessage
          moduleName={moduleName}
          showAll={showAll}
        />
      );
    }

    return null;
  };

  render() {
    const {
      activeModules,
      showAllIcons,
      clickedModuleIndex,
      moduleData,
      activeModulesLength,
      toggleDraggingToBoard,
      toggleIsClicked,
      updateClientPosition,
    } = this.props;

    const unsatisfiedModule = getUnsatisfiedModule(clickedModuleIndex, activeModules, moduleData);

    const unsatisfiedModuleDependencies = (unsatisfiedModule &&
       getUnmetDependencies(moduleData, activeModules, unsatisfiedModule.dependencies));

    const visibleIcons = !unsatisfiedModuleDependencies || showAllIcons
      ? moduleData
      : unsatisfiedModuleDependencies;

    return (
      <div className="sideBar" style={style}>
          {this.renderDependencyMessage(unsatisfiedModule)}
          <div className="module-container">
            <SideBarIconList
              activeModulesLength={activeModulesLength}
              toggleDraggingToBoard={toggleDraggingToBoard}
              toggleIsClicked={toggleIsClicked}
              updateClientPosition={updateClientPosition}
              visibleIcons={visibleIcons}
            />
          </div>
        <DimensionForm />
      </div>
    );
  }
}

SideBar.propTypes = {
  disabledIconExceptions: PropTypes.func,
  showAllIcons: PropTypes.bool.isRequired,
  activeModulesLength: PropTypes.number,
  showAll: PropTypes.func.isRequired,
  toggleDraggingToBoard: PropTypes.func.isRequired,
  toggleIsClicked: PropTypes.func,
  updateClientPosition: PropTypes.func.isRequired,
};
