import checkExceedsPerimter from './checkExceedsPerimeter';
import checkCollision from './checkCollision';

Array.prototype.diff = function (a) {
  return this.filter(i => a.indexOf(i) < 0);
};

function adjustDimesionsForRotation(node) {
  // const rotation = node.get('.innerGroup')[0].attrs.rotation;
  const adjustedObj = {};
  const { rotation } = node;

  if (rotation === 90 || rotation === 270) {
    // const { x, y, width, height } = node.attrs;
    const { x, y, width, height } = node;
    const halfDiff = (height - width) / 2;
    adjustedObj.x = x - halfDiff;
    adjustedObj.y = y + halfDiff;
    adjustedObj.width = height;
    adjustedObj.height = width;
  }

  return Object.assign({}, node, adjustedObj);
}

export default function enforceRules(nodeArray, perimeterNode, ruleBreakingAction, ruleFollowingAction) {
  const adjustedNodes = nodeArray.map(adjustDimesionsForRotation);

  const collidingNodes = checkCollision(adjustedNodes, adjustDimesionsForRotation);
  const outOfBoundsNodes = checkExceedsPerimter(nodeArray, perimeterNode, adjustDimesionsForRotation);
  const ruleBreakingNodes = [...collidingNodes, ...outOfBoundsNodes];
  const ruleFollowingNodes = nodeArray.diff(ruleBreakingNodes);

  console.log(outOfBoundsNodes);

  // // ruleFollowingAction(perimeterNode);
  // // ruleBreakingNodes.forEach(node => ruleBreakingAction(node));
  // // ruleFollowingNodes.forEach(node => ruleFollowingAction(node));
  return {
    breaking: ruleBreakingNodes,
    following: ruleFollowingNodes,
  }
}
