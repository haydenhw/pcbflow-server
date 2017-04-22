import checkExceedsPerimter from './checkExceedsPerimeter';
import checkCollision from './checkCollision';

Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};

function adjustDimesionForsRotation(node, dimension){
  //console.log(node.get('.innerGroup')[0].attrs.rotation)
  /*const rotation = node.get('.innerGroup')[0].attrs.rotation
  if (rotation === 90 || rotation === 270) {
    const { width, height } = node.attrs;
    const halfDiff = (height-width)/2;
    return 2 * height -  node.attrs.x; 
  }*/
  return dimension; 
}

export default function enforceRules(nodeArray, perimeterNode, ruleBreakingAction, ruleFollowingAction) {
  const collidingNodes = checkCollision(nodeArray,adjustDimesionForsRotation);
  const outOfBoundsNodes = checkExceedsPerimter(nodeArray, perimeterNode);
  const ruleBreakingNodes = [...collidingNodes, ...outOfBoundsNodes]
  const ruleFollowingNodes = nodeArray.diff(ruleBreakingNodes);
  
  ruleFollowingAction(perimeterNode)
  ruleBreakingNodes.forEach((node) => ruleBreakingAction(node));
  ruleFollowingNodes.forEach((node) => ruleFollowingAction(node));
}  