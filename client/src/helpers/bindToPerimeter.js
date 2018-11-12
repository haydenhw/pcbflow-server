// refactor bindToPerimeter with compose
import getPerimeterSide from 'helpers/getPerimeterSide';
// *refactor to not use buildCoordinateData
function buildCoordinateData(module, topLeftAnchor, board) {
  const {
    boundToSideIndex,
    x,
    y,
    width,
    height,
  } = module;

  return {
    boundToSide: getPerimeterSide(boundToSideIndex),
    moduleX: x,
    moduleY: y,
    moduleWidth: width,
    moduleHeight: height,
    topLeftAnchorX: topLeftAnchor.x,
    topLeftAnchorY: topLeftAnchor.y,
    boardWidth: board.width,
    boardHeight: board.height,
  };
}

export default function bindToPerimeter(module, topLeftAnchor, board) {
  const {
    boundToSide,
    boardHeight,
    boardWidth,
    moduleX,
    moduleY,
    moduleHeight,
    moduleWidth,
    topLeftAnchorX,
    topLeftAnchorY,
  } = buildCoordinateData(module, topLeftAnchor, board);

  switch (boundToSide) {
    case 'bottom':
      return {
        x: moduleX,
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
