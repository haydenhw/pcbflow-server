import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';

import rotateAboutCenter from 'helpers/rotateAboutCenter';
import bindToPerimeter from 'helpers/bindToPerimeter';

export default function rotate(module, anchors, board) {
  const {
    x,
    y,
    index,
    innerGroupX,
    innerGroupY,
    rotation,
    width,
    height,
    boundToSideIndex,
  } = module;

  const { topLeft } = anchors;
  let newParentGroupCoordinates;
  let newInnerGroupCoordinates;

  newParentGroupCoordinates = bindToPerimeter(module, topLeft, board);
  newInnerGroupCoordinates = (
    rotateAboutCenter(boundToSideIndex, rotation, innerGroupX, innerGroupY, width, height)
  );

  return {
    index,
    boundToSideIndex: newInnerGroupCoordinates.boundToSideIndex,
    rotation: newInnerGroupCoordinates.rotation,
    innerGroupX: newInnerGroupCoordinates.x,
    innerGroupY: newInnerGroupCoordinates.y,
    parentGroupX: newParentGroupCoordinates ? newParentGroupCoordinates.x : x,
    parentGroupY: newParentGroupCoordinates ? newParentGroupCoordinates.y : y,
  };

}
