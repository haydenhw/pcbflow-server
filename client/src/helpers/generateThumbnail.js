import Konva from 'konva';

export function getCroppedStage(boardLayer) {
  const boardClone = boardLayer.clone();
  const boardCloneAttrs = boardClone.get('.boardGroup')[0].attrs;
  const currentStageAttrs = boardLayer.getParent().attrs;
  const croppedStage = new Konva.Stage({
    width: boardCloneAttrs.width + 20,
    height: boardCloneAttrs.height + 20,
  });

  boardCloneAttrs.x = 10;
  boardCloneAttrs.y = 10;
  
  return croppedStage.add(boardClone);
}

export function getScaledStage(boardLayer) {
  const boardClone = boardLayer.clone();
  const boardCloneAttrs = boardClone.get('.boardGroup')[0].attrs;
  const currentStageAttrs = boardLayer.getParent().attrs;
  const croppedStage = new Konva.Stage({
    width: boardCloneAttrs.width + 20,
    height: boardCloneAttrs.height + 20,
  });

  boardCloneAttrs.x = 10;
  boardCloneAttrs.y = 10;
  
  return croppedStage.add(boardClone);
}


export default function generateThumbnail(boardLayer) {
  return getCroppedStage(boardLayer).toJSON();
}
