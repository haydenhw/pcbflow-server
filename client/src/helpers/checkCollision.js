


export default function checkCollision(nodeArray, callback) {
  let collidingNodes = [];
  
  nodeArray.forEach((node) => {
    const nodeBox = node.attrs ? node.attrs : node;
    // console.log(nodeBox.width, nodeBox.height)
    const nodeBoxWidth = callback ? callback(node, nodeBox.width) : nodeBox.width;
    const nodeBoxHeight = callback ? callback(node, nodeBox.height) : nodeBox.height;
    // console.log(nodeBoxWidth, nodeBoxHeight)
    const nodeLeft = nodeBox.x;
    const nodeRight = nodeBox.x + nodeBoxWidth;
    const nodeTop = nodeBox.y;
    const nodeBottom = nodeBox.y + nodeBoxHeight;
    
    nodeArray.forEach((otherNode) => {
       const otherBox = otherNode.attrs ? otherNode.attrs : otherNode;
        if (nodeBox !== otherBox) {
          const otherBoxWidth = callback ? callback(node, nodeBox.width) : otherBox.width;
          const otherBoxHeight = callback ? callback(node, nodeBox.height) : otherBox.height;
          const otherLeft = otherBox.x;
          const otherRight = otherBox.x + otherBoxWidth;
          const otherTop = otherBox.y;
          const otherBottom = otherBox.y + otherBoxHeight;
         
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
  console.log('colliding nodes' , collidingNodes)
  return collidingNodes;
}