import bindToPerimeter from 'helpers/bindToPerimeter';
import rotateAboutCenter from 'helpers/rotateAboutCenter';
// *refactor so that rotateAboutCenter just takes whole module object as arg
export default function rotate(module, topLeftAnchor, board) {
  const {
    index,
    innerGroupX,
    innerGroupY,
    rotation,
    width,
    height,
    boundToSideIndex,
  } = module;

  const newInnerGroupCoordinates = (
    rotateAboutCenter(boundToSideIndex, rotation, innerGroupX, innerGroupY, width, height)
  );

  return {
    index,
    boundToSideIndex: newInnerGroupCoordinates.boundToSideIndex,
    rotation: newInnerGroupCoordinates.rotation,
    innerGroupX: newInnerGroupCoordinates.x,
    innerGroupY: newInnerGroupCoordinates.y,
  };

}
