import bindToPerimeter from 'helpers/bindToPerimeter';
import rotateAboutCenter from 'helpers/rotateAboutCenter';

export default function rotate(module, topLeftAnchor, board) {
  const {
    index,
    innerGroupX,
    innerGroupY,
    rotation,
    width,
    height,
    boundToSideIndex,
    x,
    y,
  } = module;

  const newParentGroupCoordinates = bindToPerimeter(module, topLeftAnchor, board);
  // console.log(newParentGroupCoordinates);
  const newInnerGroupCoordinates = (
    rotateAboutCenter(boundToSideIndex, rotation, innerGroupX, innerGroupY, width, height)
  );

  return {
    index,
    boundToSideIndex: newInnerGroupCoordinates.boundToSideIndex,
    rotation: newInnerGroupCoordinates.rotation,
    innerGroupX: newInnerGroupCoordinates.x,
    innerGroupY: newInnerGroupCoordinates.y,
    x: newParentGroupCoordinates ? newParentGroupCoordinates.x : x,
    y: newParentGroupCoordinates ? newParentGroupCoordinates.y : y,
  };

}
