export default function checkExceedsPerimeter(nodeArray, perimeterNode) {
  const perimeterBox = perimeterNode.attrs || perimeterNode;
  const outOfBoundsNodes = [];

  // console.log('perimeter', {
  //     x: perimeterBox.x,
  //     y: perimeterBox.y,
  //     width: perimeterBox.width,
  //     height: perimeterBox.height,
  //   })

  nodeArray.forEach((moduleNode, index) => {
    const moduleBox = moduleNode.attrs ? moduleNode.attrs : moduleNode;
    const { x, y, width, height } = moduleBox;

      // console.log('node', { x, y, width, height });

    const exceedsLeft = moduleBox.x < 0;
    const exceedsRight = moduleBox.x + moduleBox.width > perimeterBox.width;
    const exceedsTop = moduleBox.y < 0;
    const exceedsBottom = moduleBox.y + moduleBox.height > perimeterBox.height;

    // const exceedsLeft = moduleBox.x < perimeterBox.x;
    // const exceedsRight = moduleBox.x + moduleBox.width > perimeterBox.x + perimeterBox.width;
    // const exceedsTop = moduleBox.y < perimeterBox.y;
    // const exceedsBottom = moduleBox.y + moduleBox.height > perimeterBox.y + perimeterBox.height;

    if (exceedsLeft || exceedsRight || exceedsTop || exceedsBottom) {
      outOfBoundsNodes.push(moduleNode);
    }
  });

  if (outOfBoundsNodes.length > 0) {
    outOfBoundsNodes.push(perimeterNode);
  }

  return outOfBoundsNodes;
}
