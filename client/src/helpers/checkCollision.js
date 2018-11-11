export default function checkCollision(nodeArray, callback) {
  const collidingNodes = [];

  nodeArray.forEach((node) => {
    const { x, y, width, height } = node;
    // console.log(node.text, {
    //   x,
    //   y,
    //   width,
    //   height,
    // });

    const nodeLeft = x;
    const nodeRight = x + width;
    const nodeTop = y;
    const nodeBottom = y + height;

    nodeArray.forEach((otherNode) => {

      if (JSON.stringify(node) !== JSON.stringify(otherNode)) {
        const { x, y, width, height } = otherNode;
        const otherLeft = x;
        const otherRight = x + width;
        const otherTop = y;
        const otherBottom = y + height;

        const collideHoriz = nodeLeft < otherRight && nodeRight > otherLeft;
        const collideVert = nodeTop < otherBottom && nodeBottom > otherTop;

        if (collideHoriz && collideVert) {
          collidingNodes.push(otherNode);
        }
      }
    });
  });

  return collidingNodes.length > 1 ? collidingNodes : [];
}
