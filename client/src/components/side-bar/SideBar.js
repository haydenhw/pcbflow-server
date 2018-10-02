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
    activeModules,
    hoveredModuleDependencies
  ) => {
    switch (iconVisibityMode) {
      case 'ALL':
        return moduleData;
      case 'DEPENDENCY':
      const unmentDependencies = getUnmetDependencies(moduleData, activeModules, hoveredModuleDependencies);
        return unmentDependencies;
      default:
        return moduleList;
    }
};

const maybeClickedModule = (activeModules) => (clickedModuleIndex) => (
  Maybe.fromNull(activeModules[clickedModuleIndex])
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

const getClickedModuleName = (modules) => (
  compose(getModuleName, maybeClickedModule(modules))
);

const getClickedModuleDependencies = (modules) => (
  compose(getModuleDependencies, maybeClickedModule(modules))
);

export default class SideBar extends Component {
  renderDependencyMessage = (visibleIcons) => {
   const
   {
     activeModules,
     iconVisibityData,
     clickedModuleIndex,
     moduleData,
     showAll,
   } = this.props;

    const { mode, dependencies } = iconVisibityData;
    const moduleName = getClickedModuleName(activeModules)(clickedModuleIndex);

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
      activeModules,
      iconVisibityData,
      clickedModuleIndex,
      moduleData,
      activeModulesLength,
      toggleDraggingToBoard,
      toggleIsClicked,
      updateClientPosition,
    } = this.props;

    const getVisibleIcons2 = (clickedModuleIndex, activeModules, moduleData) =>{
      if (!clickedModuleIndex) {
        const nextUnmetDepencency = findNextUnmetDepencency(activeModules);
        // console.log(nextUnmetDepencency)

        if (nextUnmetDepencency.metDependencies.length > 0) {
          return getUnmetDependencies(moduleData, activeModules, nextUnmetDepencency.dependencies);
        }
      }
    }
    const res = getVisibleIcons2(clickedModuleIndex, activeModules, moduleData);
    console.log(res)
    const clickedModuleDependencies = getClickedModuleDependencies(activeModules)(clickedModuleIndex);
    const dependencyData = getNewDependencyData(activeModules);
    // const visibleIcons = getVisibleIcons(iconVisibityData.mode, moduleData, activeModules, clickedModuleDependencies)

    return (
      <div className="sideBar" style={style}>
          {this.renderDependencyMessage([])}
          <div className="module-container">
            <SideBarIconList
              activeModulesLength={activeModulesLength}
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
  activeModulesLength: PropTypes.number,
  showAll: PropTypes.func.isRequired,
  toggleDraggingToBoard: PropTypes.func.isRequired,
  toggleIsClicked: PropTypes.func,
  updateClientPosition: PropTypes.func.isRequired,
};
