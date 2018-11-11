import { getRuleBreakingModuleIds } from 'helpers/getRuleBreakingModules';

import { findNextUnsatisfiedModule, getUnmetDependencies } from 'helpers/dependencies';

export const getStroke = (id, modules, board, defaultStroke) =>  {
  const ruleBreakingModuleIds = getRuleBreakingModuleIds(modules, board);
  const isBreakingRule = ruleBreakingModuleIds.includes(id);
  return isBreakingRule ? 'red' : defaultStroke;
}

export const getFill = (unmetDependencies) => (
  unmetDependencies.length > 0
  ? 'red'
  : 'green'
);

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
