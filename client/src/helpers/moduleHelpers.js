import { getRuleBreakingModuleIds } from 'helpers/getRuleBreakingModules';
import bindToPerimeter from 'helpers/bindToPerimeter';
import { findNextUnsatisfiedModule, getUnmetDependencies } from 'helpers/dependencies';

export const getX = (props, topLeftAnchor) => {
  const { board, x } = props;
  return (
    topLeftAnchor
      ? bindToPerimeter(props, topLeftAnchor.attrs, board).x
      // ? 0
      : x
  );
}

export const getY = (props, topLeftAnchor) => {
  const { board, y } = props;
  return (
    topLeftAnchor
      ? bindToPerimeter(props, topLeftAnchor.attrs, board).y
      : y
  );
}

export const getStroke = (id, defaultStroke, modules, board, topLeftAnchor, ) =>  {
  const ruleBreakingModuleIds = getRuleBreakingModuleIds(modules, board, topLeftAnchor);
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
