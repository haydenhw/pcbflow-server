export default function checkCollision(nodeArray, callback) {
  let collidingNodes = [];
  console.log(nodeArray)
  nodeArray.forEach((node) => {
    const nodeBox = node.attrs ? node.attrs : node;
    // console.log(nodeBox.width, nodeBox.height)
    //console.log(nodeBox.x, nodeBox.y, nodeBox.width, nodeBox.height)
    const nodeBoxWidth = callback ? callback(node, nodeBox.width) : nodeBox.width;
    const nodeBoxHeight = false ? callback(node, nodeBox.height) : nodeBox.height;
    // console.log(nodeBoxWidth, nodeBoxHeight)
  /*  const halfDiff = (nodeBox.height-nodeBox.width)/2;
    const nodeLeft = nodeBox.x - halfDiff;
    const nodeRight = nodeLeft + nodeBox.height;
    const nodeTop = nodeBox.y - halfDiff;
    const nodeBottom = nodeTop + nodeBox.width;*/
    const nodeLeft = nodeBox.x;
    const nodeRight = nodeBox.x + nodeBoxWidth;
    const nodeTop = nodeBox.y;
    const nodeBottom = nodeBox.y + nodeBoxHeight;
    
    nodeArray.forEach((otherNode) => {
       const otherBox = otherNode.attrs ? otherNode.attrs : otherNode;
        if (nodeBox !== otherBox) {
          const otherBoxWidth = callback ? callback(node, otherBox.width) : otherBox.width;
          const otherBoxHeight = false ? callback(node, otherBox.height) : otherBox.height;
          
          const halfDiff = (otherBox.height-otherBox.width)/2;
          const otherLeft = otherBox.x - halfDiff;
          const otherRight = otherLeft + otherBox.height;
          const otherTop = otherBox.y - halfDiff;
          const otherBottom = otherTop + otherBox.width;
          
          console.log(//nodeLeft,
                      //nodeRight,
                    //  "node top",
                    //nodeTop,
                      //nodeBottom
                    )
          console.log(//otherLeft,
                      //otherRight,
                      //"other bottom",
                      //otherTop,
                      //otherBottom)
        /*const otherLeft = otherBox.x;
          const otherRight = otherBox.x + otherBoxWidth;
          const otherTop = otherBox.y;
          const otherBottom = otherBox.y + otherBoxHeight;*/
        )
         
         
          const collideHoriz = nodeLeft < otherRight && nodeRight > otherLeft;
          const collideVert = nodeTop < otherBottom && nodeBottom > otherTop;
          console.log(nodeTop, otherBottom, node, otherNode)
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
//  console.log('colliding nodes' , collidingNodes)
  return collidingNodes;
}