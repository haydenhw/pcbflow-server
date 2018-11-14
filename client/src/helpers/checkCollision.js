export default function checkCollision(itemArray) {
  const collidingItems = [];

  itemArray.forEach((item) => {
    const { x, y, width, height } = item;
    const itemLeft = x;
    const itemRight = x + width;
    const itemTop = y;
    const itemBottom = y + height;

    itemArray.forEach((otherItem) => {
      if (JSON.stringify(item) !== JSON.stringify(otherItem)) {
        const { x, y, width, height } = otherItem;
        const otherLeft = x;
        const otherRight = x + width;
        const otherTop = y;
        const otherBottom = y + height;

        const collideHoriz = itemLeft < otherRight && itemRight > otherLeft;
        const collideVert = itemTop < otherBottom && itemBottom > otherTop;

        if (collideHoriz && collideVert) {
          collidingItems.push(otherItem);
        }
      }
    });
  });

  return collidingItems.length > 1 ? collidingItems : [];
}
