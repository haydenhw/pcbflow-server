import getPerimeterSide from 'helpers/getPerimeterSide';

function buildCoordinateData(selectedModuleProps, anchorPositions, boardSpecs) {
  const {
    x,
    y,
    width,
    height,
  } = selectedModuleProps;
  const { topLeft } = anchorPositions;
  const { boundToSideIndex } = selectedModuleProps;
  if (true/* Number.isInteger(boundToSideIndex)*/) {
    const coordinateData = {
      boundToSide: getPerimeterSide(boundToSideIndex),
      moduleX: x,
      moduleY: y,
      moduleWidth: width,
      moduleHeight: height,
      topLeftAnchorX: topLeft.x,
      topLeftAnchorY: topLeft.y,
      boardWidth: boardSpecs.width,
      boardHeight: boardSpecs.height,
    };
    return coordinateData;
  }
}

export default function bindToPerimeter(selectedModuleProps, anchorPositions, boardSpecs) {
  const cd = buildCoordinateData(selectedModuleProps, anchorPositions, boardSpecs);
  switch (cd.boundToSide) {
    case 'bottom':
      return {
        x: cd.moduleX,
        y: cd.topLeftAnchorY + cd.boardHeight - cd.moduleHeight,
      };
      break;
    case 'left':
      return {
        x: cd.topLeftAnchorX + 0.5 * (cd.moduleHeight - cd.moduleWidth),
        y: cd.moduleY,
      };
      break;
    case 'top':
      return {
        x: cd.moduleX,
        y: cd.topLeftAnchorY,
      };
      break;
    case 'right':
      return {
        x: cd.topLeftAnchorX + cd.boardWidth - 0.5 * (cd.moduleHeight + cd.moduleWidth),
        y: cd.moduleY,
      };
      break;
    default:
      return {
        x: cd.moduleX,
        y: cd.moduleY,
      };
  }
}
