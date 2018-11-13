import bindToPerimeter from 'helpers/bindToPerimeter';
import checkExceedsPerimter from './checkExceedsPerimeter';
import checkCollision from './checkCollision';

function adjustForRotation(module) {
  const adjustedAttrs = {};
  const { rotation } = module;

  if (rotation === 90 || rotation === 270) {
    const { x, y, width, height } = module;
    const halfDiff = (height - width) / 2;
    adjustedAttrs.x = x - halfDiff;
    adjustedAttrs.y = y + halfDiff;
    adjustedAttrs.width = height;
    adjustedAttrs.height = width;

    return adjustedAttrs;
  }

  return module;
}

export function adjustDimesionsForRotation(module, board, topLeftAnchor) {
  const boundModuleCoordinates = bindToPerimeter(module, topLeftAnchor, board);
  const boundMoudle = Object.assign({}, module, boundModuleCoordinates);
  const rotatedModule = adjustForRotation(boundMoudle);

  return Object.assign({}, module, rotatedModule);
}

export function getRuleBreakingModules(moduleArray, perimeterNode, topLeftAnchor) {
  const rotationAdjustedNodes = moduleArray.map(module => (
     adjustDimesionsForRotation(module, perimeterNode, topLeftAnchor)
  ));
  const collidingNodes = checkCollision(rotationAdjustedNodes);
  const outOfBoundsNodes = checkExceedsPerimter(rotationAdjustedNodes, perimeterNode);
  const ruleBreakingNodes = [...collidingNodes, ...outOfBoundsNodes];

  return  ruleBreakingNodes;
}

export function getRuleBreakingModuleIds(moduleArray, perimeterNode, topLeftAnchor) {
  return (
    getRuleBreakingModules(moduleArray, perimeterNode, topLeftAnchor)
      .map(module => module.id)
  );
}

export function getOutOfBoundModules(moduleArray, perimeterNode, topLeftAnchor) {
  const rotationAdjustedNodes = moduleArray.map(module => adjustDimesionsForRotation(module, perimeterNode, topLeftAnchor));

  const outOfBoundsNodes = checkExceedsPerimter(
    rotationAdjustedNodes,
    perimeterNode,
    adjustDimesionsForRotation
  );

  return outOfBoundsNodes;
}
