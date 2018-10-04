import { compose } from 'helpers/functional';

import { findNextUnsatisfiedModule, getUnmetDependencies } from 'helpers/dependencies';

export const getUnsatisfiedModule = (clickedModuleIndex, activeModules, moduleData) => {
  const clickedModule = activeModules[clickedModuleIndex]
  let nextUnsatisfiedModule;

  if (!clickedModule) {
    nextUnsatisfiedModule = findNextUnsatisfiedModule(activeModules);
  } else {
    const clickedModuleUnmetDependencies = getUnmetDependencies(moduleData, activeModules, clickedModule.dependencies);

    if (clickedModuleUnmetDependencies.length > 0) {
      return clickedModule;
    }

    nextUnsatisfiedModule = findNextUnsatisfiedModule(activeModules);
  }

  if (nextUnsatisfiedModule) {
    return nextUnsatisfiedModule;
  }

  return null;
};
