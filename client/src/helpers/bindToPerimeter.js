// refactor bindToPerimeter with compose
import getPerimeterSide from 'helpers/getPerimeterSide';

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
  const cd = buildCoordinateData(module, topLeftAnchor, board);
  switch (cd.boundToSide) {
    case 'bottom':
      return {
        x: cd.moduleX,
        y: cd.topLeftAnchorY + cd.boardHeight - cd.moduleHeight,
      };
    case 'left':
      return {
        x: cd.topLeftAnchorX + 0.5 * (cd.moduleHeight - cd.moduleWidth),
        y: cd.moduleY,
      };
    case 'top':
      return {
        x: cd.moduleX,
        y: cd.topLeftAnchorY,
      };
    case 'right':
      return {
        x: cd.topLeftAnchorX + cd.boardWidth - 0.5 * (cd.moduleHeight + cd.moduleWidth),
        y: cd.moduleY,
      };
    default:
      return {
        x: cd.moduleX,
        y: cd.moduleY,
      };
  }
}
