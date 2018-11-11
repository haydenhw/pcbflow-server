import checkExceedsPerimter from './checkExceedsPerimeter';
import checkCollision from './checkCollision';

export function adjustDimesionsForRotation(node) {
  // const rotation = node.get('.innerGroup')[0].attrs.rotation;
  const adjustedAttrs = {};
  const { rotation } = node;

  if (rotation === 90 || rotation === 270) {
    // const { x, y, width, height } = node.attrs;
    const { x, y, width, height } = node;
    const halfDiff = (height - width) / 2;
    adjustedAttrs.x = x - halfDiff;
    adjustedAttrs.y = y + halfDiff;
    adjustedAttrs.width = height;
    adjustedAttrs.height = width;
  }

  return Object.assign({}, node, adjustedAttrs);
}

export function getRuleBreakingModules(nodeArray, perimeterNode) {
  const rotationAdjustedNodes = nodeArray.map(adjustDimesionsForRotation);
  const collidingNodes = checkCollision(rotationAdjustedNodes, adjustDimesionsForRotation);
  const outOfBoundsNodes = checkExceedsPerimter(rotationAdjustedNodes, perimeterNode, adjustDimesionsForRotation);
  const ruleBreakingNodes = [...collidingNodes, ...outOfBoundsNodes];

  return  ruleBreakingNodes;
}

export function getRuleBreakingModuleIds(nodeArray, perimeterNode) {
  return getRuleBreakingModules(nodeArray, perimeterNode).map(module => module.id);
}

export function getOutOfBoundModules(nodeArray, perimeterNode) {
  const rotationAdjustedNodes = nodeArray.map(adjustDimesionsForRotation);
  const outOfBoundsNodes = checkExceedsPerimter(
    rotationAdjustedNodes,
    perimeterNode,
    adjustDimesionsForRotation
  );

  return outOfBoundsNodes;
}
