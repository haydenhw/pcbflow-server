// fix shouldComponentUpdate function
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Maybe } from 'monet';

import { findNextUnmetDepencency, getNewDependencyData, getUnmetDependencies, getUnmetDependencyIds } from 'helpers/dependencies';
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
};

const getVisibleIcons = (
    iconVisibityMode,
    moduleData,
    onBoardModules,
    hoveredModuleDependencies
  ) => {
    switch (iconVisibityMode) {
      case 'ALL':
        return moduleData;
      case 'DEPENDENCY':
      const unmentDependencies = getUnmetDependencies(moduleData, onBoardModules, hoveredModuleDependencies);
        return unmentDependencies;
      default:
        return moduleList;
    }
};

const maybeGetLastClickedModule = (activeProjectModules) => (lastClickedModuleIndex) => (
  Maybe.fromNull(activeProjectModules[lastClickedModuleIndex])
);

const getModuleName = (module) => (
    module
      .map(module => module.text)
      .orSome('default')
);

const getModuleDependencies= (module) => (
    module
      .map(module => module.dependencies)
      .orSome([])
);

const getLastClickedModuleName = (modules) => (
  compose(getModuleName, maybeGetLastClickedModule(modules))
);

const getLastClickedModuleDependencies = (modules) => (
  compose(getModuleDependencies, maybeGetLastClickedModule(modules))
);

export default class SideBar extends Component {
  renderDependencyMessage = (visibleIcons) => {
   const
   {
     activeProjectModules,
     iconVisibityData,
     lastClickedModuleIndex,
     moduleData,
     showAll,
   } = this.props;

    const { mode, dependencies } = iconVisibityData;
    const moduleName = getLastClickedModuleName(activeProjectModules)(lastClickedModuleIndex);

    if ((mode === 'DEPENDENCY') && (visibleIcons.length > 0)) {
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
      activeProjectModules,
      iconVisibityData,
      lastClickedModuleIndex,
      moduleData,
      onBoardModulesLength,
      toggleDraggingToBoard,
      toggleIsClicked,
      updateClientPosition,
    } = this.props;

    const getVisibleIcons2 = (lastClickedModuleIndex, activeProjectModules, moduleData) =>{
      if (!lastClickedModuleIndex) {
        const nextUnmetDepencency = findNextUnmetDepencency(activeProjectModules);
        // console.log(nextUnmetDepencency)

        if (nextUnmetDepencency.metDependencies.length > 0) {
          return getUnmetDependencies(moduleData, activeProjectModules, nextUnmetDepencency.dependencies);
        }
      }
    }
    const res = getVisibleIcons2(lastClickedModuleIndex, activeProjectModules, moduleData);
    console.log(res)
    const lastClickedModuleDependencies = getLastClickedModuleDependencies(activeProjectModules)(lastClickedModuleIndex);
    const dependencyData = getNewDependencyData(activeProjectModules);
    // const visibleIcons = getVisibleIcons(iconVisibityData.mode, moduleData, activeProjectModules, lastClickedModuleDependencies)

    return (
      <div className="sideBar" style={style}>
          {this.renderDependencyMessage([])}
          <div className="module-container">
            <SideBarIconList
              onBoardModulesLength={onBoardModulesLength}
              toggleDraggingToBoard={toggleDraggingToBoard}
              toggleIsClicked={toggleIsClicked}
              updateClientPosition={updateClientPosition}
              visibleIcons={[]}
            />
          </div>
        <DimensionForm />
      </div>
    );
  }
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
