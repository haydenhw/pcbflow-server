import Konva from 'konva';

function createTempElement(elementId) {
  return () => {
    const tempElement = document.createElement('div');
    tempElement.id = elementId;

    document.body.appendChild(tempElement);

    return tempElement;
  };
}

export const createTempContainer = createTempElement('container');

export function getCroppedStage(boardLayer) {
  const boardClone = boardLayer.clone();
  const topLeftAnchorX = boardClone.get('.topLeft')[0].attrs.x;
  const topLeftAnchorY = boardClone.get('.topLeft')[0].attrs.y;
  const boardCloneAttrs = boardClone.get('.boardGroup')[0].attrs;
  const tempContainer = createTempContainer();
  const croppedStage = new Konva.Stage({
    width: boardCloneAttrs.width + 20,
    height: boardCloneAttrs.height + 20,
    container: 'container'
  });

  document.body.removeChild(tempContainer);

  boardCloneAttrs.x = 10 - topLeftAnchorX;
  boardCloneAttrs.y = 10 - topLeftAnchorY;

  return {
    width: croppedStage.getStage().attrs.width,
    height: croppedStage.getStage().attrs.height,
    node: croppedStage.add(boardClone),
  };
}

export default function generateThumbnail(boardLayer) {
  const croppedStage = getCroppedStage(boardLayer);
  return croppedStage.node.toJSON();
}
