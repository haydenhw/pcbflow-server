import getPerimeterSide from 'helpers/getPerimeterSide';
import checkExceedsPerimter from './checkExceedsPerimeter';
import checkCollision from './checkCollision';

function adjustNormal(node) {
  const adjustedAttrs = {};
  const { rotation } = node;

  if (rotation === 90 || rotation === 270) {
    const { x, y, width, height } = node;
    const halfDiff = (height - width) / 2;
    adjustedAttrs.x = x - halfDiff;
    adjustedAttrs.y = y + halfDiff;
    adjustedAttrs.width = height;
    adjustedAttrs.height = width;

    return adjustedAttrs;
  }

  return node;
}

function adjustSideBound(node, board) {
 const {
    boundToSideIndex,
    height: nodeHeight,
    width: nodeWidth,
    x,
    y,
  } = node;

  const boundToSide = getPerimeterSide(boundToSideIndex);
  const halfDiff = (nodeHeight - nodeWidth) / 2;

  switch (boundToSide) {
    case 'bottom':
      return {
        x: halfDiff,
        y: topLeftAnchorY + boardHeight - moduleHeight,
      };
    case 'left':
      return {
        x: topLeftAnchorX + 0.5 * (moduleHeight - moduleWidth),
        y: moduleY,
      };
    case 'top':
      return {
        x: moduleX,
        y: topLeftAnchorY,
      };
    case 'right':
      return {
        x: topLeftAnchorX + boardWidth - 0.5 * (moduleHeight + moduleWidth),
        y: moduleY,
      };
    default:
      return {
        x: moduleX,
        y: moduleY,
      };
  }
}

export function adjustDimesionsForRotation(node) {
  const { boundToSideIndex } = node;
  const isBoundToSide = Number.isInteger(boundToSideIndex);
  const adjustedAttrs = isBoundToSide
      ? {}
      : adjustNormal(node);

  // console.log('node', {
  //   x: node.x,
  //   y: node.y,
  // });
  // console.log('adjusted', adjustedAttrs);

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
