import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';

import rotateAboutCenter from 'helpers/rotateAboutCenter';
import bindToPerimeter from 'helpers/bindToPerimeter';

export default function rotate(selectedModuleProps, anchorPositions, boardSpecs) {
  const {
    x,
    y,
    index,
    innerGroupX,
    innerGroupY,
    rotation,
    width,
    height,
    boundToSideIndex
  } = selectedModuleProps;
  const { topLeft } = anchorPositions;
  let newParentGroupCoordinates;
  let newInnerGroupCoordinates;

  newParentGroupCoordinates = bindToPerimeter(selectedModuleProps, anchorPositions, boardSpecs);
  newInnerGroupCoordinates = (
    rotateAboutCenter(boundToSideIndex, rotation, innerGroupX, innerGroupY, width, height)
  );
  
  const rotationData = {
    index,
    boundToSideIndex: newInnerGroupCoordinates.boundToSideIndex,
    rotation: newInnerGroupCoordinates.rotation,
    innerGroupX: newInnerGroupCoordinates.x,
    innerGroupY: newInnerGroupCoordinates.y,
    parentGroupX: newParentGroupCoordinates ? newParentGroupCoordinates.x : x,
    parentGroupY: newParentGroupCoordinates ? newParentGroupCoordinates.y : y,
  };

  store.dispatch(actions.rotateSelectedModule(rotationData));
  this.updateThumbnail();
}
  
  