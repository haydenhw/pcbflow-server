// fix shouldComponentUpdate function
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getUnmetDependencies } from 'helpers/dependencies';
import { getUnsatisfiedModule } from 'helpers/moduleHelpers';

import { moduleDataList } from 'config/moduleDataList';

import SideBarIconList from './SideBarIconList';
import DimensionForm from './SideBarDimensionInput';
import SideBarDependencyMessage from './SideBarDependencyMessage';

import './side-bar-styles/_SideBar.scss';

export default class SideBar extends Component {
  renderDependencyMessage = (unsatisfiedModule) => {
   const
   {
     showAllIcons,
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
      activeModulesLength,
      toggleDraggingToBoard,
      toggleIsClicked,
    } = this.props;

    const unsatisfiedModule = getUnsatisfiedModule(clickedModuleIndex, activeModules, moduleDataList);

    const unsatisfiedModuleDependencies = (unsatisfiedModule &&
       getUnmetDependencies(moduleDataList, activeModules, unsatisfiedModule.dependencies));

    const visibleIcons = !unsatisfiedModuleDependencies || showAllIcons
      ? moduleDataList
      : unsatisfiedModuleDependencies;

    return (
      <div className="sideBar">
          {this.renderDependencyMessage(unsatisfiedModule)}
          <div className="module-container">
            <SideBarIconList
              activeModulesLength={activeModulesLength}
              toggleDraggingToBoard={toggleDraggingToBoard}
              toggleIsClicked={toggleIsClicked}
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
};
