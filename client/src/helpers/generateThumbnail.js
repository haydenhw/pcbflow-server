import Konva from 'konva';

export default function generateThumbnail(boardLayer) {
  const boardClone = boardLayer.clone()
  const boardCloneAttrs = boardClone.get(".boardGroup")[0].attrs;
  const currentStageAttrs = boardLayer.getParent().attrs;
  const croppedStage = new Konva.Stage({
    width: boardCloneAttrs.width + 20,
    height: boardCloneAttrs.height + 20
  });
  
  boardCloneAttrs.x = 10;
  boardCloneAttrs.y = 10;
  croppedStage.add(boardClone);
  
  return croppedStage.toJSON();
}