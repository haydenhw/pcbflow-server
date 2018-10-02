// refactor bindToPerimeter with compose
import getPerimeterSide from 'helpers/getPerimeterSide';

function buildCoordinateData(hoveredModuleProps, topLeftAnchor, boardSpecs) {
  const {
    boundToSideIndex,
    x,
    y,
    width,
    height,
  } = hoveredModuleProps;

  return {
    boundToSide: getPerimeterSide(boundToSideIndex),
    moduleX: x,
    moduleY: y,
    moduleWidth: width,
    moduleHeight: height,
    topLeftAnchorX: topLeftAnchor.x,
    topLeftAnchorY: topLeftAnchor.y,
    boardWidth: boardSpecs.width,
    boardHeight: boardSpecs.height,
  };
}

export default function bindToPerimeter(hoveredModuleProps, topLeftAnchor, boardSpecs) {
  const cd = buildCoordinateData(hoveredModuleProps, topLeftAnchor, boardSpecs);
  // console.log(JSON.stringify(cd, null, 2))
  // console.log( cd.topLeftAnchorY , cd.boardHeight , cd.moduleHeight,)
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
