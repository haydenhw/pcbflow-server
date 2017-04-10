export default function checkCollision(nodeArray) {
  let collidingNodes = [];
  
  nodeArray.forEach((node) => {
    const nodeBox = node.attrs ? node.attrs : node;
    const nodeLeft = nodeBox.x;
    const nodeRight = nodeBox.x + nodeBox.width;
    const nodeTop = nodeBox.y;
    const nodeBottom = nodeBox.y + nodeBox.height;
    
    nodeArray.forEach((otherNode) => {
       const otherBox = otherNode.attrs ? otherNode.attrs : otherNode;
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
  //console.log('colliding nodes' , collidingNodes)
  return collidingNodes;
}