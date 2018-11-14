import { getRuleBreakingModuleIds } from 'helpers/getRuleBreakingModules';
import bindToPerimeter from 'helpers/bindToPerimeter';
import { findNextUnsatisfiedModule, getUnmetDependencies } from 'helpers/dependencies';

const getCenterCoordinate = (moduleDimension, boardDimension) => (
   0.5 * (boardDimension - moduleDimension)
);

export const centerBoundModule = (rotated, module, board) =>  {
  const { boundToSideIndex } = rotated
  const { height: moduleHeight, width: moduleWidth } = module;
  const { height: boardHeight, width: boardWidth } = board;
  const notBound = boundToSideIndex === null;
  const isLeftRight = boundToSideIndex % 2 === 0;

  if (notBound) {
    return rotated;
  }

  const newCoordinates = isLeftRight
    ? { x: getCenterCoordinate(moduleWidth, boardWidth) }
    : { y: getCenterCoordinate(moduleHeight, boardHeight) };

  return Object.assign({}, rotated , newCoordinates);
}

export const getX = (props, topLeftAnchor) => {
  const { board, x } = props;
  return (
    topLeftAnchor
      ? bindToPerimeter(props, topLeftAnchor.attrs, board).x
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
