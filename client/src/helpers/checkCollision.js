export default function checkCollision(nodeArray, callback) {
  const collidingNodes = [];

  nodeArray.forEach((node) => {
    let nodeBox = node.attrs ? node.attrs : node;
    nodeBox = callback ? callback(node) : nodeBox;

    const nodeLeft = nodeBox.x;
    const nodeRight = nodeBox.x + nodeBox.width;
    const nodeTop = nodeBox.y;
    const nodeBottom = nodeBox.y + nodeBox.height;

    nodeArray.forEach((otherNode) => {
      let otherBox = otherNode.attrs ? otherNode.attrs : otherNode;
      otherBox = callback ? callback(otherNode) : otherBox;

      if (nodeBox !== otherBox) {
        const otherLeft = otherBox.x;
        const otherRight = otherBox.x + otherBox.width;
        const otherTop = otherBox.y;
        const otherBottom = otherBox.y + otherBox.height;

        const collideHoriz = nodeLeft < otherRight && nodeRight > otherLeft;
        const collideVert = nodeTop < otherBottom && nodeBottom > otherTop;

        if (collideHoriz && collideVert) {
          collidingNodes.push(otherNode);

           // prevents duplicates in collidingNodes array but is commented out at the moment to favor performance
         /* const existsInCollidingNodes = collidingNodes.findIndex((node) => node === otherNode );
           if(existsInCollidingNodes === -1)
           collidingNodes.push(otherNode);*/
        }
      }
    });
  });

  return collidingNodes.length > 1 ? collidingNodes : [];
}
